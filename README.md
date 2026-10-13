# S.V. Optimis website

Astro 5 + Tailwind CSS 4 + PagesCMS. Huisstijl: donkerblauw #0B1141, middenblauw #1A3275, goud #DAA520, titels in Lilita One (zie `src/styles/global.css`). Volledig Nederlandstalig, statisch gebouwd.

## Starten
```bash
npm install
cp .env.example .env   # vul PUBLIC_WEB3FORMS_KEY in
npm run dev            # http://localhost:4321
npm run build          # output in dist/
```

## Content beheren (PagesCMS)
`.pages.yml` bevat drie onderdelen: **Activiteiten** (`src/content/activities/*.md`), **Stages & vacatures** (`src/content/vacancies/*.md`) en **Website-instellingen** (`src/data/site.json`: ledenaantal, sponsoren, socials).

- De *beschrijving* van een activiteit is de markdown-body van het bestand (PagesCMS-veld `body`, getoond als "Beschrijving").
- Datum/tijd wordt als Nederlandse tijd (Europe/Amsterdam) geïnterpreteerd, zie `src/lib/dates.ts`.
- "Eerstvolgende activiteit" wordt tijdens de build bepaald. Laat je host dagelijks rebuilden (bijv. GitHub Actions `cron` of een deploy hook), anders blijft een verlopen activiteit staan tot de volgende commit.

## Formulier
`src/components/ContactForm.astro` post naar Web3Forms (standaard). Voor Formspree zet je `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/<id>`.

## Placeholders om te vervangen
Voorbeeldactiviteiten, voorbeeldvacatures (`Voorbeeld ... B.V.`), ledenaantal, sponsorlogo's en de teksten op `/over-tbk` (controleer die inhoudelijk).

## Alles bewerken via PagesCMS
Alle teksten staan in JSON/Markdown en zijn bewerkbaar in PagesCMS (`.pages.yml` wordt gegenereerd uit dezelfde structuur):

| Onderdeel | Bestand | CMS-naam |
|---|---|---|
| Activiteiten | `src/content/activities/*.md` | Activiteiten |
| Bestuursleden | `src/content/board/*.md` (`active: false` verbergt een lid) | Bestuursleden |
| Stages & vacatures | `src/content/vacancies/*.md` | Stages & vacatures |
| Paginateksten | `src/data/pages/*.json` | Pagina: Home, Over ons, ... |
| Menu, contact, sponsoren, footer | `src/data/site.json` | Algemeen |

Foto's: `public/images/bestuur`, `public/images/paginas`, `public/images/activiteiten`, `public/images/sponsors`.
Stage en Afstudeerstage verschijnen onder "Stages", Bijbaan/Traineeship/Vaste baan onder "Vacatures".
