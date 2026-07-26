import fs from 'node:fs';
import path from 'node:path';

const homepagePath = path.resolve('dist/index.html');

if (!fs.existsSync(homepagePath)) {
  throw new Error('Missing dist/index.html. Run npm run build before npm run check:deployment-config.');
}

const html = fs.readFileSync(homepagePath, 'utf8');
const getAttribute = (name) => html.match(new RegExp(`${name}="([^"]*)"`))?.[1] || '';
const turnstileSiteKey = getAttribute('data-turnstile-site-key');
const rfqSubmitSendTo = getAttribute('data-google-ads-rfq-submit-send-to');
const errors = [];

if (!turnstileSiteKey.startsWith('0x')) {
  errors.push('Turnstile site key is missing from the production build.');
}

if (!/^AW-\d+\/[A-Za-z0-9_-]+$/u.test(rfqSubmitSendTo)) {
  errors.push('Google Ads RFQ Submitted conversion destination is missing from the production build.');
}

if (errors.length) {
  throw new Error(errors.join('\n'));
}

console.log(
  JSON.stringify(
    {
      turnstileConfigured: true,
      rfqSubmitConversionConfigured: true,
      rfqSubmitSendTo,
    },
    null,
    2
  )
);
