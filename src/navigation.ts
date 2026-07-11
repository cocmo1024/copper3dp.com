import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

const rfqEmailHref = 'mailto:info@szcomo.com';
const whatsappHref =
  'https://wa.me/8615301541312?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20copper%203D%20printing%20project.';
const currentYear = new Date().getFullYear();

export const headerData = {
  links: [
    {
      text: 'Applications',
      href: getPermalink('/applications'),
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
      text: 'Engineering Library',
      href: getBlogPermalink(),
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
      title: 'Project review',
      links: [
        { text: 'Copper AM capabilities', href: getPermalink('/capabilities') },
        { text: 'Applications overview', href: getPermalink('/applications') },
        { text: 'Copper AM materials', href: getPermalink('/materials') },
        { text: 'Prepare an RFQ', href: getPermalink('/rfq') },
      ],
    },
    {
      title: 'Applications',
      links: [
        { text: 'Copper cold plates', href: getPermalink('/copper-cold-plates') },
        { text: 'Copper heat sinks', href: getPermalink('/copper-heat-sinks') },
        { text: 'Engineering Library', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About COPPER 3DP', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Como Precision', href: 'https://www.szcomo.com/' },
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
