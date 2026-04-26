import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Applications',
      links: [
        {
          text: 'Copper cold plates',
          href: getPermalink('/applications'),
        },
        {
          text: 'Copper heat sinks',
          href: getPermalink('/applications#heat-sinks'),
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
          text: 'Feasibility review',
          href: getPermalink('/#features'),
        },
        {
          text: 'Capabilities',
          href: getPermalink('/capabilities'),
        },
        {
          text: 'Materials',
          href: getPermalink('/materials'),
        },
        {
          text: 'RFQ inputs',
          href: getPermalink('/rfq'),
        },
        {
          text: 'Engineering guide',
          href: getBlogPermalink(),
        },
        {
          text: 'Contact',
          href: getPermalink('/contact'),
        },
        {
          text: 'Terms',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy policy',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'RFQ',
      links: [
        {
          text: 'Send project details',
          href: getPermalink('/contact#form'),
        },
        {
          text: 'Quote pathways',
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
          text: 'RFQ checklist',
          href: getPermalink('/posts/EngineeringGuide/rfq-checklist-custom-3d-printed-copper-cold-plates'),
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
  actions: [{ text: 'Send CAD for RFQ', href: getPermalink('/contact#form') }],
};

export const footerData = {
  links: [
    {
      title: 'Applications',
      links: [
        { text: 'Cold plates', href: getPermalink('/applications') },
        { text: 'Heat sinks', href: getPermalink('/applications#heat-sinks') },
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
        { text: 'Inspection planning', href: getPermalink('/capabilities#inspection') },
        { text: 'Engineering guide', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Send RFQ', href: getPermalink('/contact#form') },
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
