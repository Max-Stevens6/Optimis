import site from './site.json';

export interface NavItem { href: string; label: string; short?: string }

// Alles komt uit src/data/site.json (bewerkbaar via PagesCMS).
// `short` wordt op desktop gebruikt zodat de balk past; mobiel toont altijd `label`.
export const nav: NavItem[] = site.nav.map((n) => ({ href: n.href, label: n.label, short: n.short || undefined }));

export const CONTACT = {
  info: site.contact.info,
  activiteiten: site.contact.activiteiten,
  adres: site.contact.address.split('\n').map((l) => l.trim()).filter(Boolean),
};
