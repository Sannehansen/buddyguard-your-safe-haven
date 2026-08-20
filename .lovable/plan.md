# Buddyguard — patient companion demo (6 screens)


A phone-shaped (390 × 844) interactive prototype in **English**, for Anna, 58, eight weeks into breast cancer treatment. Built from the design brief. No login, signup, onboarding, settings or profile page. No gamification anywhere — no streaks, progress bars, badges, completion percentages, or missed-day messaging. Dates always dd-mm-yyyy.

## Design language

Calm, warm, tired-person-friendly: big type, generous white space, softly rounded cards, short sentences, no decorative icons. Two quiet folder colours carried by anything belonging to a folder: **Oncology = teal**, **GP = amber**. Serif headlines, sans body. All colours as semantic tokens.

## Screens

**1. Home** — quiet check-in, not a dashboard. Today's appointment card ("Oncology follow-up · Dr. Chen · 14:00") with a Record button; one line of context from the last consultation (statement, not a task); a large, obvious microphone as the primary action; the last few log entries, small; small avatar top-right opening the sheet.

**2. Record** — timer, animated audio level meter, live transcript arriving in blocks after pauses with a "listening…" state between them, one Stop button, and the line "Your recording is safe." Nothing else.

**3. Consultation** — Summary · What it means · Next steps, plus "Three things to watch" (fatigue, new medication, follow-up date). A toggle reveals the full transcript, always available and never replaced by the AI version. Medical terms in the transcript carry a dotted underline; tapping one opens an inline footnote card directly beneath that line with the word, one plain sentence, the doctor's quote with a timestamp, and a small `Ask more →` link.

**4. Log** — fifteen seconds to use. Text box with the microphone as primary action. After speaking, a confirm card: "I noted three things. Right?" listing what was understood, numbers shown as pre-filled sliders she can nudge, then [✓ Yes] and [Edit]. Sometimes one gentle follow-up ("You didn't mention the nausea — anything there?") with [Answer] and [Not today], where "Not today" reads as completely normal. A quick-log option with three sliders (energy, stress, pain) plus sleep hours. Entries below grouped by day with folder colour. No category chips, symptom tags or forms.

**5. Timeline & patterns** — a graph over eight weeks (energy plus a couple of other measures) with markers for treatments, the new medication, the start of walking, and caseworker meetings. A "What can you see?" button triggers a visible "investigating…" moment, then pattern cards: headline ("Walking ↔ energy"), the finding in plain words with real numbers ("On days you logged a walk, your energy averaged 6.2 out of 10, compared with 3.5 on days you didn't"), a prominent, readable disclaimer — "This is a possible pattern in your own records. It can't show what caused the change." — and a way to see the entries behind it.

**6. Prep for the next visit** — clean, printable, slightly more formal. Period with dates and entry count; How it's been; What the doctor asked me to watch (fatigue, nausea, dizziness, each with what actually happened) as the heart of the report; Medication & changes; Possible patterns; Questions I could ask; the raw entries collapsed but visibly present. Small, muted medical codes (e.g. R53.83) beside some symptom lines. An unobtrusive "Copy as structured data" button. A folder switcher (Oncology / GP) that visibly regenerates the report from the same log.

**7. Avatar sheet** — a small sheet, not a screen: Anna's name, age, condition, "8 weeks with Buddyguard", her two care folders, Reset demo, Delete all my data.

## Demo data

Eight weeks of daily entries (energy, stress, pain, sleep hours, walking minutes) shaped so the stated findings hold: walk days average 6.2 energy vs 3.5 on non-walk days. Events for treatments, the new medication start, walking becoming a habit, and caseworker meetings. One full consultation with transcript, term explanations and timestamps.

## Technical

- Frontend-only prototype: no backend, no real AI, no real microphone access. Recording, transcription and analysis are scripted against the demo dataset so the demo never fails on stage.
- Routes: `/` (Home), `/record`, `/consultation`, `/log`, `/timeline`, `/prep`, inside a shared phone-frame layout with bottom navigation. The avatar sheet is an overlay.
- Reset demo restores the seeded state; Delete all my data clears it in-session.
- All analysis copy is phrased as possible patterns, never causation or medical advice.

## Not included

Real audio capture and transcription, real document OCR, and persistence across devices.