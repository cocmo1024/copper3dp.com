import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

const rfqEmailHref = 'mailto:info@szcomo.com';
const whatsappHref =
  'https://wa.me/8615301541312?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20copper%203D%20printing%20project.';
const currentYear = new Date().getFullYear();

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
          text: 'RF and semiconductor parts',
          href: getPermalink('/posts/EngineeringGuide/copper-am-semiconductor-equipment-rfq'),
        },
      ],
    },
    {
      text: 'Capabilities',
      href: getPermalink('/capabilities'),
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
        {
          text: 'Engineering Guide',
          href: getBlogPermalink(),
        },
      ],
    },
    {
      text: 'RFQ',
      href: getPermalink('/rfq'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Email RFQ', href: rfqEmailHref, title: 'Email CAD and RFQ files to info@szcomo.com' }],
};

export const footerData = {
  links: [
    {
      title: 'Start a project',
      links: [
        { text: 'Copper AM capabilities', href: getPermalink('/capabilities') },
        { text: 'Applications overview', href: getPermalink('/applications') },
        { text: 'Copper cold plates', href: getPermalink('/copper-cold-plates') },
        { text: 'Copper heat sinks', href: getPermalink('/copper-heat-sinks') },
        { text: 'Prepare an RFQ', href: getPermalink('/rfq') },
      ],
    },
    {
      title: 'Engineering',
      links: [
        { text: 'Copper AM materials', href: getPermalink('/materials') },
        {
          text: 'Copper LPBF design rules',
          href: getPermalink('/posts/EngineeringGuide/design-rules-copper-laser-powder-bed-fusion-parts'),
        },
        {
          text: 'Process selection',
          href: getPermalink('/posts/EngineeringGuide/copper-am-process-selection-lpbf-cnc-brazing'),
        },
        { text: 'Engineering Guide', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About COPPER 3DP', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Como Precision', href: 'https://www.szcomo.com/' },
        { text: 'Privacy', href: getPermalink('/privacy') },
        { text: 'Terms', href: getPermalink('/terms') },
      ],
    },
    {
      title: 'Related platforms',
      links: [
        { text: 'Metal AM powders', href: 'https://metal3dpowder.com/' },
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
    { ariaLabel: 'Email', icon: 'tabler:mail', href: rfqEmailHref },
    {
      ariaLabel: 'WhatsApp',
      icon: 'tabler:brand-whatsapp',
      href: whatsappHref,
    },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    &copy; ${currentYear} COPPER 3DP - Suzhou Como Precision Materials Co., Ltd. - All rights reserved.
  `,
};
