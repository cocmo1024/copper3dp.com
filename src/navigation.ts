import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

const rfqEmailHref = 'mailto:info@szcomo.com';

export const headerData = {
  links: [
    {
      text: 'Applications',
      links: [
        {
          text: 'Applications overview',
          href: getPermalink('/applications'),
        },
        {
          text: 'Copper cold plates',
          href: getPermalink('/copper-cold-plates'),
        },
        {
          text: 'Copper heat sinks',
          href: getPermalink('/copper-heat-sinks'),
        },
        {
          text: 'Induction coils & busbars',
          href: getPermalink('/applications#electrical'),
        },
        {
          text: 'RF / waveguide copper parts',
          href: getPermalink('/applications#rf'),
        },
      ],
    },
    {
      text: 'Engineering',
      links: [
        {
          text: 'Capabilities',
          href: getPermalink('/capabilities'),
        },
        {
          text: 'Materials',
          href: getPermalink('/materials'),
        },
        {
          text: 'Inspection planning',
          href: getPermalink('/capabilities#inspection'),
        },
        {
          text: 'RFQ checklist',
          href: getPermalink('/rfq'),
        },
        {
          text: 'Process selection',
          href: getPermalink('/posts/EngineeringGuide/copper-am-process-selection-lpbf-cnc-brazing'),
        },
        {
          text: 'Engineering guide',
          href: getBlogPermalink(),
        },
      ],
    },
    {
      text: 'RFQ',
      links: [
        {
          text: 'Email info@szcomo.com',
          href: rfqEmailHref,
        },
        {
          text: 'What to send',
          href: getPermalink('/rfq'),
        },
        {
          text: 'Inspection planning',
          href: getPermalink('/capabilities#inspection'),
        },
        {
          text: 'Material selection',
          href: getPermalink('/materials'),
        },
        {
          text: 'RFQ checklist article',
          href: getPermalink('/posts/EngineeringGuide/rfq-checklist-custom-3d-printed-copper-cold-plates'),
        },
      ],
    },
    {
      text: 'Resources',
      links: [
        {
          text: 'Engineering Guide',
          href: getBlogPermalink(),
        },
        {
          text: 'Copper service RFQ guide',
          href: getPermalink('/posts/EngineeringGuide/copper-3d-printing-service-rfq-guide'),
        },
        {
          text: 'RFQ checklist',
          href: getPermalink('/posts/EngineeringGuide/rfq-checklist-custom-3d-printed-copper-cold-plates'),
        },
        {
          text: 'Busbars & coils RFQ',
          href: getPermalink('/posts/EngineeringGuide/3d-printed-copper-busbars-induction-coils-rfq'),
        },
        {
          text: 'CT and leak acceptance',
          href: getPermalink('/posts/EngineeringGuide/ct-scan-leak-test-acceptance-criteria-copper-cold-plates'),
        },
        {
          text: 'Cold plate articles',
          href: getPermalink('copper-cold-plates', 'tag'),
        },
        {
          text: 'Heat sink articles',
          href: getPermalink('copper-heat-sinks', 'tag'),
        },
      ],
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Email RFQ', href: rfqEmailHref, title: 'Email info@szcomo.com' }],
};

export const footerData = {
  links: [
    {
      title: 'Applications',
      links: [
        { text: 'Cold plates', href: getPermalink('/copper-cold-plates') },
        { text: 'Heat sinks', href: getPermalink('/copper-heat-sinks') },
        { text: 'Busbars & coils', href: getPermalink('/applications#electrical') },
        { text: 'RF / waveguide parts', href: getPermalink('/applications#rf') },
      ],
    },
    {
      title: 'Engineering',
      links: [
        { text: 'Capabilities', href: getPermalink('/capabilities') },
        { text: 'Materials', href: getPermalink('/materials') },
        { text: 'RFQ inputs', href: getPermalink('/rfq') },
        {
          text: 'Process selection',
          href: getPermalink('/posts/EngineeringGuide/copper-am-process-selection-lpbf-cnc-brazing'),
        },
        { text: 'Inspection planning', href: getPermalink('/capabilities#inspection') },
        { text: 'Engineering guide', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Send RFQ', href: rfqEmailHref },
        { text: 'Email engineering', href: 'mailto:info@szcomo.com' },
        { text: 'Material questions', href: getPermalink('/materials') },
        { text: 'Acceptance criteria', href: getPermalink('/capabilities#inspection') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Privacy', href: getPermalink('/privacy') },
        { text: 'Terms', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:info@szcomo.com' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    (c) COPPER 3DP - Suzhou Como Precision Materials Co., Ltd. - All rights reserved.
  `,
};
