// Content-datums zijn "wandkloktijd" in Nederland. PagesCMS en YAML slaan vaak geen
// tijdzone op, dus we interpreteren de invoer expliciet als Europe/Amsterdam.
const TZ = 'Europe/Amsterdam';

function tzOffsetMinutes(ms: number): number {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, hourCycle: 'h23',
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
    }).formatToParts(new Date(ms)).map((x) => [x.type, Number(x.value)]),
  );
  return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute) - ms) / 60000);
}

export function amsterdamWallTime(input: string | Date): Date {
  let y: number, mo: number, d: number, h = 0, mi = 0;
  if (input instanceof Date) {
    // js-yaml parseert tijdzone-loze timestamps als UTC; gebruik die velden als wandklok.
    [y, mo, d, h, mi] = [input.getUTCFullYear(), input.getUTCMonth() + 1, input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes()];
  } else {
    const m = input.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?$/);
    if (!m) return new Date(input); // bevat al een tijdzone (Z / +01:00)
    [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
    h = Number(m[4] ?? 0); mi = Number(m[5] ?? 0);
  }
  const asUTC = Date.UTC(y, mo - 1, d, h, mi);
  let t = asUTC - tzOffsetMinutes(asUTC) * 60000;
  t = asUTC - tzOffsetMinutes(t) * 60000; // tweede pas voor DST-grenzen
  return new Date(t);
}

const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('nl-NL', { timeZone: TZ, ...o });
export const formatLong = (d: Date) => fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);
export const formatTime = (d: Date) => fmt({ hour: '2-digit', minute: '2-digit' }).format(d);
export const formatDay = (d: Date) => fmt({ day: 'numeric' }).format(d);
export const formatMonthShort = (d: Date) => fmt({ month: 'short' }).format(d).replace('.', '');
export const formatShort = (d: Date) => fmt({ day: 'numeric', month: 'long' }).format(d);
