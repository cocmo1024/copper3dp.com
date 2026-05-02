import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

const rfqEmailHref = 'mailto:info@szcomo.com';
const currentYear = new Date().getFullYear();

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
          text: 'Materials',
          href: getPermalink('/materials'),
        },
        {
          text: 'Process selection',
          href: getPermalink('/posts/EngineeringGuide/copper-am-process-selection-lpbf-cnc-brazing'),
        },
      ],
    },
    {
      text: 'RFQ',
      href: getPermalink('/rfq'),
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
    {
      title: 'Related sites',
      links: [
        { text: 'Como Precision', href: 'https://szcomo.com/' },
        { text: 'Titanium Alloy AM', href: 'https://titanium3dp.com/' },
        { text: 'Precision Ceramics', href: 'https://ceramiccnc.com/' },
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
    © ${currentYear} COPPER 3DP - Suzhou Como Precision Materials Co., Ltd. - All rights reserved.
  `,
};
