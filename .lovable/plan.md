# Buddyguard — interaktiv patientassistent-demo

Bygger hele prototypen fra masterprompten, men med navnet **Buddyguard** overalt hvor der stod Hearo (produktnavn, "Fortæl Buddyguard", "Buddyguard Summary", "Spørg Buddyguard", lægesamtaler osv.).

## Oplevelsen

En mobil-first demo af Annas forløb (brystkræft, kemo, 1. sep – 26. okt) med bottom-navigation:

- **I dag** — rolig forside: "Godmorgen Anna", stor mikrofon-CTA "Fortæl Buddyguard", hurtigt overblik (energi, fatigue, stress, søvn, motion) og et "Buddyguard har lagt mærke til…"-kort med CTA til mønstret.
- **Mit forløb** — scrollbar visuel tidslinje (september/oktober) med behandlinger, samtaler, fatigue, motion-start, CT-scanning, kommunemøder, magnesium. Klik på event giver detaljevisning.
- **Spørg Buddyguard** — chat med mikrofon, tekstfelt og 7 foreslåede spørgsmål, der udløser AI-svar med grafer.
- **Mig** — profil (Anna, 56, brystkræft), privatliv, samtykke, indstillinger.

## Nøgleflows

1. **Voice-logging**: tryk mikrofon, "Jeg lytter…" (simuleret optagelse), Buddyguard viser struktureret resultat (kommunemøde, 30 min gåtur, stress ikke angivet), Gem, ét opfølgende spørgsmål med 0–10 slider, "Tak. Jeg har gemt det." Altid "Spring over" / "Ikke relevant".
2. **Lægesamtale**: klik på fx Kemoterapi #2 giver Buddyguard Summary med "Det vigtigste", "Næste skridt" og "Fra samtalen til Mit forløb" (motion, fatigue, behandling) samt CTA "Gem relevante oplysninger". 4 mock-samtaler (1/9, 22/9, 13/10, 23/10).
3. **Scan dokument**: "Gem i mit forløb" med mock CT-scanning 18. september — originaldokument vist tydeligt adskilt fra "Kort fortalt" med disclaimer om AI-genereret forklaring.
4. **AI-insights** (mock, beregnet på datasættet): motion vs. energi (6,2 vs 3,9), kemo vs. energi (før/laveste for #1–#3), kommunemøder vs. stress, og wow-momentet "Hvad går igen på mine bedste dage?" (søvn over 7 timer, motion 30+ min, stress 3 eller lavere) med CTA "Se dagene".
5. **Demo mode**: fremhævet guidet 6-trins flow i præcis den rækkefølge fra prompten, så det kan vises hurtigt på hackathonet.

## Data

Alle 56 dagsrækker (energi, fatigue, smerter, stress, søvn, motion) og alle events lægges ind præcis som angivet, som typede konstanter. Kategorier: Sundhed / Livsstil / Livet omkring sygdommen.

## Design

Premium, roligt health-tech: forest green som bærende farve med sage, ivory, sand og mint. Serif til overskrifter, sans-serif til brødtekst, diskrete ikoner, bløde kort, ingen klinisk blå hospitalsæstetik. Alle farver som semantiske tokens i design-systemet.

## Teknisk

- Ren frontend-prototype — ingen backend, ingen rigtig AI. Alle "AI-svar" er beregnet ud fra demo-datasættet.
- Ruter: `/` (I dag), `/forloeb`, `/spoerg`, `/mig` med delt layout og bottom-nav. Voice-flow, event-detaljer og dokumentvisning som overlays.
- Mikrofonen simulerer optagelse (ingen mikrofonadgang kræves) med scripted transskription, så demoen altid virker.
- Al AI-tekst formuleres som mulige mønstre, aldrig kausalitet eller medicinske råd.

## Ikke med i denne omgang

Ægte lydoptagelse/transskription, rigtig OCR af uploadede dokumenter og persistens på tværs af sessioner — kan tilføjes bagefter med Lovable Cloud.