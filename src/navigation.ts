import { getPermalink, getBlogPermalink } from './utils/permalinks';

const rfqFormHref = '/rfq/#rfq-form';
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
      links: [
        { text: 'Copper AM capabilities', href: getPermalink('/capabilities') },
        { text: 'Copper AM materials', href: getPermalink('/materials') },
        { text: 'Quotation checklist', href: getPermalink('/rfq') },
      ],
    },
    {
      text: 'Engineering Guides',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'Submit RFQ', href: rfqFormHref, title: 'Submit CAD files and quotation requirements' }],
};

export const footerData = {
  links: [
    {
      title: 'Plan a project',
      links: [
        { text: 'Application guide', href: getPermalink('/applications') },
        { text: 'Copper AM capabilities', href: getPermalink('/capabilities') },
        { text: 'Copper AM materials', href: getPermalink('/materials') },
        { text: 'Quotation checklist', href: getPermalink('/rfq') },
      ],
    },
    {
      title: 'Applications',
      links: [
        { text: 'Copper cold plates', href: getPermalink('/copper-cold-plates') },
        { text: 'Copper heat exchangers', href: getPermalink('/copper-heat-exchangers') },
        { text: 'Copper heat sinks', href: getPermalink('/copper-heat-sinks') },
        { text: 'Copper induction coils', href: getPermalink('/copper-induction-coils') },
        { text: 'Copper busbars', href: getPermalink('/copper-busbars') },
        { text: 'Copper RF waveguides', href: getPermalink('/copper-rf-waveguides') },
        { text: 'Semiconductor cooling', href: getPermalink('/copper-semiconductor-cooling') },
        { text: 'Conformal cooling inserts', href: getPermalink('/copper-conformal-cooling-inserts') },
      ],
    },
    {
      title: 'Company & resources',
      links: [
        { text: 'Engineering Guides', href: getBlogPermalink() },
        { text: 'About COPPER 3DP', href: getPermalink('/about') },
        { text: 'Editorial policy', href: getPermalink('/editorial-policy') },
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
  ],
  footNote: `
    &copy; ${currentYear} COPPER 3DP, a service of Suzhou Como Precision Materials Co., Ltd. All rights reserved.
  `,
};
