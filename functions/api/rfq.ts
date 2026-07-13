type RfqEnv = {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  RFQ_EMAIL?: {
    send(message: RfqEmailMessage): Promise<{ messageId?: string }>;
  };
  RFQ_RATE_LIMITER?: {
    limit(options: { key: string }): Promise<{ success: boolean }>;
  };
  TURNSTILE_SECRET_KEY?: string;
};

type RfqEmailAttachment = {
  filename: string;
  content: ArrayBuffer;
  type: string;
  disposition: 'attachment';
};

type RfqEmailMessage = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  attachments: RfqEmailAttachment[];
  headers: Record<string, string>;
};

type WorkerContext = {
  request: Request;
  env: RfqEnv;
};

type WorkerHandler = (context: WorkerContext) => Response | Promise<Response>;

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_FILE_SIZE = 8 * 1024 * 1024;
const MIN_SUBMIT_TIME_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;
const DEFAULT_TO_EMAIL = 'info@szcomo.com';
const DEFAULT_FROM_EMAIL = 'rfq@copper3dprint.com';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

const allowedFileExtensions = new Set([
  '.pdf',
  '.step',
  '.stp',
  '.stl',
  '.iges',
  '.igs',
  '.x_t',
  '.x_b',
  '.jpg',
  '.jpeg',
  '.png',
]);

const fileContentTypes = new Map([
  ['.pdf', 'application/pdf'],
  ['.step', 'model/step'],
  ['.stp', 'model/step'],
  ['.stl', 'model/stl'],
  ['.iges', 'model/iges'],
  ['.igs', 'model/iges'],
  ['.x_t', 'application/octet-stream'],
  ['.x_b', 'application/octet-stream'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
]);

const allowedApplications = new Set([
  'Cold plate or liquid cooling',
  'Heat sink or heat exchanger',
  'Busbar or electrical conductor',
  'Induction coil',
  'RF, waveguide, or vacuum component',
  'Conformal cooling insert',
  'Other copper AM part',
]);

const allowedMaterials = new Set(['Not decided', 'Pure copper', 'CuCrZr / CuCr1Zr', 'GRCop-42', 'Other']);

const allowedTimings = new Set([
  'Exploring feasibility',
  'Quote needed within 2 weeks',
  'Prototype needed within 1–2 months',
  'Production planning',
]);

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

const cleanText = (value: FormDataEntryValue | null, maxLength: number) =>
  typeof value === 'string' ? value.replace(/\0/g, '').trim().slice(0, maxLength) : '';

const isValidEmail = (value: string) =>
  value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value) && !/[\r\n]/u.test(value);

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });

const safeFileName = (name: string) => {
  const baseName = name.split(/[\\/]/u).pop() || 'attachment';
  return baseName.replace(/[^a-zA-Z0-9._() -]/gu, '_').slice(0, 120);
};

const getExtension = (name: string) => {
  const normalizedName = name.toLowerCase();
  const specialExtension = ['.step', '.iges'].find((extension) => normalizedName.endsWith(extension));
  if (specialExtension) return specialExtension;
  const lastDot = normalizedName.lastIndexOf('.');
  return lastDot >= 0 ? normalizedName.slice(lastDot) : '';
};

const parseAttribution = (rawValue: string): Record<string, string> => {
  if (!rawValue) return {};

  try {
    const parsed = JSON.parse(rawValue) as Record<string, unknown>;
    const allowedKeys = [
      'gclid',
      'gbraid',
      'wbraid',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'first_landing_page',
      'last_landing_page',
      'captured_at',
      'updated_at',
    ];

    return Object.fromEntries(
      allowedKeys
        .map((key) => [key, typeof parsed[key] === 'string' ? String(parsed[key]).slice(0, 1_000) : ''])
        .filter(([, value]) => Boolean(value))
    ) as Record<string, string>;
  } catch {
    return {};
  }
};

const verifyTurnstile = async (secret: string, token: string, remoteIp: string, expectedHostname: string) => {
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  let response: Response;
  try {
    response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    return false;
  }

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean; action?: string; hostname?: string };
  return result.success === true && result.action === 'rfq_submit' && result.hostname === expectedHostname;
};

const isSameOriginRequest = (request: Request) => {
  const origin = request.headers.get('Origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
};

export const onRequestPost: WorkerHandler = async ({ request, env }) => {
  if (!isSameOriginRequest(request)) {
    return jsonResponse(403, { ok: false, message: 'This submission could not be verified.' });
  }

  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().startsWith('multipart/form-data')) {
    return jsonResponse(415, { ok: false, message: 'Unsupported form submission.' });
  }

  const turnstileSecret = env.TURNSTILE_SECRET_KEY?.trim();

  if (!env.RFQ_EMAIL || !turnstileSecret) {
    return jsonResponse(503, {
      ok: false,
      message: 'Secure online RFQ submission is temporarily unavailable. Please email info@szcomo.com.',
    });
  }

  if (env.RFQ_RATE_LIMITER) {
    const actorKey = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimit = await env.RFQ_RATE_LIMITER.limit({ key: `rfq:${actorKey}` });
    if (!rateLimit.success) {
      return jsonResponse(429, {
        ok: false,
        message: 'Too many submissions were attempted. Please wait one minute or email info@szcomo.com.',
      });
    }
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse(400, { ok: false, message: 'The submitted form could not be read.' });
  }

  if (cleanText(formData.get('website'), 200)) {
    return jsonResponse(200, { ok: true, accepted: false });
  }

  const startedAt = Number(cleanText(formData.get('started_at'), 30));
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_SUBMIT_TIME_MS || elapsed > MAX_FORM_AGE_MS) {
    return jsonResponse(400, { ok: false, message: 'Please refresh the page and try again.' });
  }

  const turnstileToken = cleanText(formData.get('cf-turnstile-response'), 2_048);
  const remoteIp = request.headers.get('CF-Connecting-IP') || '';
  const requestHostname = new URL(request.url).hostname;
  if (!turnstileToken || !(await verifyTurnstile(turnstileSecret, turnstileToken, remoteIp, requestHostname))) {
    return jsonResponse(400, { ok: false, message: 'Please complete the security check and submit again.' });
  }

  const name = cleanText(formData.get('name'), 80);
  const email = cleanText(formData.get('email'), 254).toLowerCase();
  const company = cleanText(formData.get('company'), 120);
  const country = cleanText(formData.get('country'), 80);
  const application = cleanText(formData.get('application'), 80);
  const material = cleanText(formData.get('material'), 60);
  const quantity = cleanText(formData.get('quantity'), 80);
  const timing = cleanText(formData.get('timing'), 80);
  const requirements = cleanText(formData.get('requirements'), 4_000);
  const sourcePage = cleanText(formData.get('source_page'), 1_000);
  const consent = cleanText(formData.get('consent'), 20);
  const submissionId = cleanText(formData.get('submission_id'), 64).toLowerCase();
  const attribution = parseAttribution(cleanText(formData.get('attribution'), 8_000));

  if (!UUID_PATTERN.test(submissionId)) {
    return jsonResponse(400, { ok: false, message: 'Please refresh the page and try again.' });
  }

  if (!name || !isValidEmail(email) || !company || !allowedApplications.has(application)) {
    return jsonResponse(400, {
      ok: false,
      message: 'Please complete your name, work email, company, and application.',
    });
  }

  if (!allowedMaterials.has(material) || !allowedTimings.has(timing) || !quantity || requirements.length < 30) {
    return jsonResponse(400, {
      ok: false,
      message: 'Please provide material status, quantity, timing, and at least 30 characters of project detail.',
    });
  }

  if (consent !== 'accepted') {
    return jsonResponse(400, { ok: false, message: 'Please confirm that we may use the details to review your RFQ.' });
  }

  const files = formData
    .getAll('attachments')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length > MAX_FILES) {
    return jsonResponse(400, { ok: false, message: `Attach no more than ${MAX_FILES} files.` });
  }

  let totalFileSize = 0;
  for (const file of files) {
    totalFileSize += file.size;
    if (file.size > MAX_FILE_SIZE) {
      return jsonResponse(400, { ok: false, message: `${safeFileName(file.name)} is larger than 5 MB.` });
    }
    if (!allowedFileExtensions.has(getExtension(file.name))) {
      return jsonResponse(400, { ok: false, message: `${safeFileName(file.name)} uses an unsupported file type.` });
    }
  }

  if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
    return jsonResponse(400, { ok: false, message: 'Attachments must be 8 MB or less in total.' });
  }

  const attachments = await Promise.all(
    files.map(async (file) => {
      const extension = getExtension(file.name);
      return {
        filename: safeFileName(file.name),
        content: await file.arrayBuffer(),
        type: fileContentTypes.get(extension) || 'application/octet-stream',
        disposition: 'attachment' as const,
      };
    })
  );

  const receivedAt = new Date().toISOString();
  const safeSubjectCompany = company.replace(/[\r\n]/gu, ' ').slice(0, 60);
  const safeSubjectApplication = application.replace(/[\r\n]/gu, ' ').slice(0, 60);
  const subject = `[Copper RFQ] ${safeSubjectCompany} — ${safeSubjectApplication}`;
  const attributionRows = Object.entries(attribution);
  const detailRows: Array<[string, string]> = [
    ['Submission ID', submissionId],
    ['Received', receivedAt],
    ['Name', name],
    ['Work email', email],
    ['Company', company],
    ['Country / region', country || 'Not provided'],
    ['Application', application],
    ['Material', material],
    ['Quantity', quantity],
    ['Timing', timing],
    ['Source page', sourcePage || 'Not provided'],
    ...attributionRows,
  ];
  const textDetails = detailRows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const htmlDetails = detailRows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  let emailResult: { messageId?: string };
  try {
    emailResult = await env.RFQ_EMAIL.send({
      from: DEFAULT_FROM_EMAIL,
      to: DEFAULT_TO_EMAIL,
      replyTo: email,
      subject,
      text: `${textDetails}\n\nProject requirements:\n${requirements}`,
      html: `<h1 style="font-size:20px">New copper 3D printing RFQ</h1><table>${htmlDetails}</table><h2 style="font-size:16px;margin-top:24px">Project requirements</h2><p style="white-space:pre-wrap">${escapeHtml(requirements)}</p>`,
      attachments,
      headers: {
        'X-Copper3DP-Submission-ID': submissionId,
      },
    });
  } catch (error) {
    console.error('RFQ email submission failed', error);
    return jsonResponse(502, {
      ok: false,
      message: 'Your RFQ could not be accepted. Please email info@szcomo.com instead.',
    });
  }

  if (!emailResult?.messageId) {
    console.error('RFQ email submission did not return a message ID');
    return jsonResponse(502, {
      ok: false,
      message: 'Your RFQ could not be accepted. Please email info@szcomo.com instead.',
    });
  }

  return jsonResponse(200, { ok: true, accepted: true, submissionId });
};

export default {
  async fetch(request: Request, env: RfqEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/rfq') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { Allow: 'POST', 'Cache-Control': 'no-store' },
        });
      }

      return onRequestPost({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
