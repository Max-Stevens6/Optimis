export const CATEGORIES = ['Borrel', 'Gala', 'Gastcollege', 'Stagemarkt'] as const;
export type Category = (typeof CATEGORIES)[number];

// Alleen huisstijlkleuren. Volledige klassenamen zodat Tailwind ze detecteert.
export const categoryStyles: Record<Category, string> = {
  Borrel: 'bg-active text-night',
  Gala: 'bg-navy text-gold',
  Gastcollege: 'bg-info text-white',
  Stagemarkt: 'bg-ok text-white',
};

export const categoryGradients: Record<Category, string> = {
  Borrel: 'from-active/80 via-royal to-navy',
  Gala: 'from-gold/70 via-royal to-navy',
  Gastcollege: 'from-info via-royal to-navy',
  Stagemarkt: 'from-ok via-royal to-navy',
};

export const tierStyles = {
  Goud: { bar: 'bg-tier-gold', label: 'Goud' },
  Zilver: { bar: 'bg-tier-silver', label: 'Zilver' },
  Brons: { bar: 'bg-tier-bronze', label: 'Brons' },
} as const;

/** Platte tekst-samenvatting uit markdown. */
export function excerpt(md = '', max = 150): string {
  const plain = md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > max ? plain.slice(0, max).replace(/\s+\S*$/, '') + '…' : plain;
}

/** Splitst tekst uit het CMS op lege regels in alinea's. */
export const paragraphs = (t = ''): string[] => t.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
