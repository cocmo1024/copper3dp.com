import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

const rfqEmailHref = 'mailto:info@szcomo.com';

export const headerData = {
  links: [
    {
      text: 'Applications',
      href: getPermalink('/#applications'),
    },
    {
      text: 'Engineering',
      links: [
        {
          text: 'RFQ checklist',
          href: getPermalink('/rfq'),
        },
        {
          text: 'Materials',
          href: getPermalink('/materials'),
        },
        {
          text: 'Process selection',
          href: getPermalink('/posts/EngineeringGuide/copper-am-process-selection-lpbf-cnc-brazing'),
        },
        {
          text: 'CT and leak criteria',
          href: getPermalink('/posts/EngineeringGuide/ct-scan-leak-test-acceptance-criteria-copper-cold-plates'),
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
          text: 'RFQ checklist article',
          href: getPermalink('/posts/EngineeringGuide/rfq-checklist-custom-3d-printed-copper-cold-plates'),
        },
      ],
    },
    {
      text: 'Resources',
      href: getBlogPermalink(),
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
      title: 'Start',
      links: [
        { text: 'Applications', href: getPermalink('/#applications') },
        { text: 'RFQ inputs', href: getPermalink('/rfq') },
        { text: 'Engineering resources', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Engineering notes',
      links: [
        {
          text: 'Copper service RFQ guide',
          href: getPermalink('/posts/EngineeringGuide/copper-3d-printing-service-rfq-guide'),
        },
        {
          text: 'Process selection',
          href: getPermalink('/posts/EngineeringGuide/copper-am-process-selection-lpbf-cnc-brazing'),
        },
        {
          text: 'CT and leak criteria',
          href: getPermalink('/posts/EngineeringGuide/ct-scan-leak-test-acceptance-criteria-copper-cold-plates'),
        },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
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
    © COPPER 3DP - Suzhou Como Precision Materials Co., Ltd. - All rights reserved.
  `,
};
