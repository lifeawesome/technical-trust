# Technical Trust Transition Plan

Internal working spec. Do not route to this file, link it from public pages, or quote it as a citable document. Its decisions ship as site IA, copy, and data models. The canon remains the intellectual constitution; this document is the product and IA plan.

**Status:** Phase 1 implemented on the site. Phase 2 (three Lab projects and edition link fields) is next.
**Direction:** [TECHNICAL-TRUST-DIRECTION.md](./TECHNICAL-TRUST-DIRECTION.md)
**Canon:** [CANON.md](./CANON.md) v1.4

---

## Purpose

Move TechnicalTrust.org from a newsletter-centered publication plus a separate resume `/about` into one parent brand with three public branches: Learn, Lab, and Studio.

The operating rule is the flywheel:

```text
Newsletter idea
  -> Sales Engineering skill to practice
  -> Demo, evaluation, or POC
  -> Client-facing technical content
  -> Measured result and case study
  -> Stronger portfolio and interview evidence
  -> Better clients and Sales Engineering opportunities
```

Every new feature, article, and project should strengthen at least one part of this flywheel.

## Non-goals

- Do not retire the map, Patterns, Trust Map Diagnostic, essays, manifesto, or Friday cadence.
- Do not rename Pattern or Practice names.
- Do not blur the Trust Map Diagnostic with Studio, or with the future Trust Audit.
- Do not treat About as a hire-me resume site.
- Do not invent Lab case studies, testimonials, or Studio results.
- Do not import or cite this document (or the canon) on public pages.
- Do not turn map columns (Discovery, Demo, Docs, Support) into a sequence, funnel, or timeline.

## Current vs target IA

### Current

Two public experiences:

| Experience | Chrome | Routes |
|---|---|---|
| Publication | `PublicationShell` | `/`, `/framework`, `/patterns`, `/diagnostic`, `/essays`, `/manifesto`, `/newsletter` |
| Resume | legacy `Nav` | `/about` |

Top nav today: Framework (Map, Patterns, Diagnostic) · Writing (Essays, Manifesto, Newsletter) · About Dan.

### Target

One chrome. Top nav:

- **Learn** → `/learn`
  - Newsletter → `/newsletter`
  - Framework → `/framework` (Patterns and Diagnostic remain linked from this page)
  - Essays → `/essays`
- **Lab** → `/lab`
- **Studio** → `/studio`
- **About** → `/about`

Manifesto stays in the footer. `/patterns` and `/diagnostic` stay live URLs.

```text
Technical Trust
├── Learn     newsletter, map, Patterns, Diagnostic, essays, manifesto
├── Lab       public practice environment and labeled projects
└── Studio    paid technical product storytelling (Demo Sprint)
```

## Keep, rehome, new

| Asset | Verdict |
|---|---|
| Map, Patterns, Diagnostic | Keep. Rehome under Learn. |
| Essays | Keep. Rehome under Learn. |
| Newsletter / Kit hydration | Keep. Rewrite practitioner Weekly lede. |
| Manifesto | Keep. Footer, not top nav. |
| Homepage | Redesign. Lab + Studio CTAs. Four C's mark moves to `/learn`. |
| `/about` | Rehome into `PublicationShell`. Practice-lead, not resume-primary. |
| `/learn`, `/lab`, `/studio` | New. |
| Demo Sprint offer | New, on `/studio` and homepage. |
| Trust Audit | Future. Still not Diagnostic. Still not Demo Sprint. |

## Honest empty states

Phase 1 ships **before** Lab projects and Studio results exist. Empty states must say so.

- **Lab with no projects:** explain what a Lab project contains; name the first three planned domains (workflow automation, API/integration, AI-agent) without fake cards.
- **Evidence with no results:** do not fabricate metrics, testimonials, or “client wins.” Say evidence will appear as work publishes.
- **Labels when work exists:** `client` (paid or authorized), `portfolio` (self-directed), `simulated` (fictional or reconstructed). Never claim RFP ownership, enterprise discovery calls, or sales POC experience the work did not include.

## Owners of record

| Kind of work | Owner |
|---|---|
| Site IA, data modules, copy on branch pages, nav | Site (this repo) |
| Newsletter editions, Pattern names, essays | Learn / canon (`patterns.ts`, Kit, MDX) |
| Lab project substance (persona, demo, POC) | Content — not invented in Phase 1 |
| Studio paid work and results | Content — not invented in Phase 1 |

## Phase 1 — Clarify (this change)

Site work:

- Canon amendment v1.4 and this document
- Nav: Learn / Lab / Studio / About
- `/learn`, `/lab`, `/studio` landings
- Homepage rebuilt to direction sections
- Demo Sprint offer published on Studio
- Newsletter signup remains on homepage
- About unified into publication chrome
- Newsletter archive lede rewritten practitioner-first

**Exit criteria:**

- A visitor can tell the three branches apart from the homepage and the nav
- Lab and Studio CTAs land on real pages
- Learn still reaches the map, Diagnostic, essays, and subscribe
- `/about` does not look like a second site
- Empty Lab and empty evidence states are readable, not broken
- Existing `/framework`, `/patterns`, `/diagnostic`, `/essays`, `/newsletter` still work

## Phase 2 — Prove

Content + light site:

- Publish three Lab projects: workflow automation, API/integration, AI-agent use case
- Case-study template and evidence block on project pages
- Optional edition link fields: Sales Engineering competency, practical artifact, related Lab project, related Studio service, CTA
- These fields **link** Pattern / Field Guide / Chapter / Essay. They do not rename them.

**Exit criteria:** three labeled Lab projects live; at least some editions point at a competency and an artifact.

## Phase 3 — Convert

- Studio inquiry form (email CTA is enough until then)
- Client-friendly sample deliverables
- Testimonials or results when they exist
- Services FAQ and project-fit criteria
- Optional later nav: Resources, Case Studies, Contact

**Exit criteria:** a qualified Studio conversation can start from the site without a raw mailto being the only path.

## Data laws for the transition

- `lib/patterns.ts` remains the SSOT for Pattern/Practice data.
- `lib/framework.ts` remains the SSOT for grid structure.
- `lib/branches.ts`, `lib/studio.ts`, `lib/lab.ts` are the SSOT for branch, offer, and Lab project data.
- Pages render from those modules. Do not hand-write content lists on the homepage.
- Kit hydration still matches edition titles to existing Pattern names and never invents cells.
- Competency/artifact fields wait for Phase 2. Do not add them to `patterns.ts` in Phase 1.

## Copy guardrails

- Practitioner-first homepage; exactly one buyer mirror line.
- Studio primary language: “technical product storytelling” or “technical demo content.” “Technical UGC” is supporting only.
- “Discovery” (capitalized, standalone) = map surface. “The discovery stage” = lifecycle period.
- Voice: manifesto cadence on framing lines. Teach before persuading. Brand compression: “Flip it.”
- Newsletter may keep Pattern names (“The Feature Dump”). Each issue should eventually connect to one competency and one artifact (Phase 2).

## Success metrics (track separately)

| Branch | Near-term |
|---|---|
| Learn | Subscribers, open/click, replies, returning readers |
| Lab | Published projects, demos, POCs, portfolio inquiries |
| Studio | Qualified conversations, paid pilots, revenue, repeat clients |

The near-term goal is not maximum audience size. It is a compounding body of credible work.
