# Happyranks Design Prompt

Cloudflare-grade marketing infrastructure. Dark canvas, Happyranks red accent, premium PULSE copy.

## Brand positioning

- Happyranks is a **revenue measurement + marketing systems** company, not a generic agency.
- Tone: precise, technical, confident. Infrastructure docs, not ad fluff.
- Primary conversion: **Free PULSE breakdown**. Secondary: **Book a strategy call**.

## PULSE audit copy (premium, not AI slop)

Avoid speed/inbox language. Signal human review, specificity, revenue relevance.

| Avoid | Use instead |
|-------|-------------|
| "Score your site in 90 seconds" | "See where your revenue stack is leaking" |
| "PDF in 2 minutes" / "lands in your inbox" | "A senior strategist reviews your site and sends a scored breakdown" |
| "50+ checks" as headline hook | Lead with **5 PULSE dimensions** and revenue meaning |
| "Run my free audit" | "Request my PULSE breakdown" / "Get my site scored" |
| Speed stats (90s, 2 min PDF) | Dimensions scored / revenue signals / strategist-reviewed / no contract |

### Voice

- **Personalised:** "We score *your* site across five revenue dimensions"
- **Premium:** Human review, prioritisation, context
- **Specific:** Dimension scores, top leaks by revenue impact, 90-day fix sequence — not "10-page PDF"
- **No countdown language** in hero, CTAs, sticky bar, meta, FAQ schema

### Canonical copy

- Eyebrow: `Free PULSE breakdown · Strategist-reviewed`
- Headline: `Find out what your marketing is actually worth.`
- Sub: `Five dimensions. Measurable checks. A scored breakdown with the fixes ranked by revenue impact — reviewed before it reaches you.`
- Form microcopy: `We read every submission. No automated spam. Unsubscribe anytime.`
- Success: `Your breakdown is being prepared. You'll hear from us shortly with your PULSE scores.`

## Visual system

### Tokens

- Canvas: `#0b0b0f`, `#101014`, `#16161c`
- Accent: `#F04040`, soft `#FF6B6B`, dim `#D93636`
- Ink: `#FFFFFF`, `#C9C9C9`, `#888888`, `#555555`
- Line: `rgba(255,255,255,0.08)` / strong `0.14`
- Success: `#3DD68C`

### Typography

- Body/UI: Inter
- Metrics: JetBrains Mono
- No decorative display fonts

### Atmosphere

- 64px grid mask in hero
- Radial red glow top-right
- 1px borders, 12px radius surfaces
- Solid red primary buttons, ghost secondary

### PULSE scorecard

Live dashboard panel: topbar, total score, dimension rows with progress bars.

## Layout skeleton

| Section | Pattern |
|---------|---------|
| Header | Fixed blur, logo + 4 links + dual CTA |
| Hero | Copy left + PulseScore right |
| Proof strip | 5 dimensions / revenue signals / strategist-reviewed / no contract |
| Audit | Inline form band |
| PULSE | 5 cards with top accent |
| Features | 6-card grid |
| Process | Audit → Plan → Build |
| Case study | Tutti Rouge metrics |
| FAQ | Bordered accordion + schema |
| CTA | Full-width glow band |

## Anti-patterns

- No DaisyUI component classes
- No Fulldev generic blocks
- No gradient text as primary hook
- No legacy compatibility alias layer
- No Netlify deploy without explicit approval

## Mautic / Hermes forms

Contact forms submit to Mautic (Hermes agent handles CRM logic).

```
Site form → Mautic endpoint → Hermes agent → segments / campaigns
```

### Env vars (site)

- `PUBLIC_MAUTIC_BASE_URL` — e.g. `https://mautic.happyranks.com`
- `PUBLIC_MAUTIC_FORM_CONTACT` — form ID for strategy call
- `PUBLIC_MAUTIC_FORM_AUDIT` — optional audit lead form ID

### Field mapping (contact)

| Site field | Mautic alias |
|------------|--------------|
| name | firstname (or full name split) |
| email | email |
| company | company |
| website | website |
| budget | budget_range |
| message | message |
| plan | plan_tier (hidden, from `?plan=`) |

Site repo: embed or POST to public Mautic form endpoint only. No Mautic credentials in repo.

## Preserve

- `/api/pulse/scan` proxy for PULSE audit API
- SEO: canonical, OG, sitemap, JSON-LD
- Plausible analytics
- `netlify.toml` redirects (no deploy until approved)
