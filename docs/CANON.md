# The Technical Trust Canon

**v1.0 — July 20, 2026**

This document is the source of truth for Technical Trust: the theorem, the models, the names, the voice, and the standing decisions. Every essay, Pattern, Practice, Field Guide, Chapter, page, and post is checked against this document. When the canon changes, the change is recorded in the amendment log at the bottom — in public terms, on the framework changelog. Nothing here is beyond revision; nothing here is revised silently.

---

## 1. The Theorem

> In a world where anyone can generate information, the greatest competitive advantage is becoming someone others trust to interpret it.

Technical trust is the confidence a person needs to make a high-stakes decision about a system they don't fully understand.

**Trust has two sides of the table.** Buyers *check* for it. Practitioners *build* it. Technical Trust models both sides, and the bridge between them is one sentence:

> Buyers are checking for competence, comprehension, candor, and consistency. The map is where the checks happen.

---

## 2. Side One — The Perception Model (The Four C's)

What a buyer is checking for, consciously or not, across the whole relationship:

| C | The buyer's question |
|---|---|
| **Competence** | Can they actually do it? |
| **Comprehension** | Do they understand *my* situation? |
| **Candor** | Are they telling me the truth — including the incomplete truth? |
| **Consistency** | Do they show up the same way every time? |

Two C's carry special structural roles:

- **Competence is the precondition.** The map assumes it. Almost no Pattern is a competence failure — The Confidence Bluff is a candor failure committed by a competent person. Canonical teaching point: *you don't lose deals because you don't know enough; you lose them on the map.*
- **Consistency is the accumulation law.** Trust is never built all at once; it is accumulated one interaction at a time. Consistency is why the framework is a grid filled over years, not a checklist completed once — and why the map has a changelog.

**Canonical home:** the buyer-facing essays (beginning with *What Is Technical Trust?*). **Future product:** The Trust Audit — the Four C's operationalized as a diagnostic rubric.

---

## 3. Side Two — The Production Model (The Map)

What a practitioner does, in specific moments, to build the trust buyers are checking for.

**Components (rows) — the behaviors:**

| Component | Line |
|---|---|
| **Honesty** | Credibility begins where pretending ends. |
| **Understanding** | Their problem before your product. |
| **Clarity** | Complexity translated, not performed. |
| **Judgment** | Knowing when to simplify and when to go deep. |

**Moments (columns):** Discovery · Demo · Docs · Support

**The 16 pairs.** Every cell holds a Pattern (the failure) and its mirror Practice (the move):

| Cell | Pattern | Practice | The move |
|---|---|---|---|
| Honesty × Discovery | The Eager Yes | The Qualified Yes | "Probably — let me verify before I commit." |
| Honesty × Demo | The Confidence Bluff | The Find-Out | "I don't know, I'll find out, here's what we do know." |
| Honesty × Docs | The Happy Path | The Sharp Edges | Document the failure modes honestly. |
| Honesty × Support | The Reassurance Loop | The Bad News First | Lead with the specific status, especially when it's bad. |
| Understanding × Discovery | The Script Read | The Second Question | Ask the follow-up their answer earned. |
| Understanding × Demo | The Feature Dump | The One Thing | Demo the one thing they came for. |
| Understanding × Docs | The Insider Manual | The First-Day Test | Write for the reader's first day, not your thousandth. |
| Understanding × Support | The Literal Answer | The Question Behind the Question | Answer the problem, not just the ticket. |
| Clarity × Discovery | The Vocabulary Test † | The Echo | Use their words for their problem. |
| Clarity × Demo | The Whiteboard Flood | The Napkin Sketch | The simplest drawing that's still true. |
| Clarity × Docs | The Wall of Text | The Skim Test † | Docs that survive being skimmed. |
| Clarity × Support | The Template Reply | The First Line | Open with proof you read their situation. |
| Judgment × Discovery | The Premature Pitch | The Earned Pitch | Hold the solution until the problem is confirmed. |
| Judgment × Demo | The Engineer's Detour | The Depth Check | Ask "want me to go deeper?" before diving. |
| Judgment × Docs | The Flat Map | The Marked Trail | Show the recommended path through the terrain. |
| Judgment × Support | The Hero Complex | The Warm Handoff | Escalate with context instead of over-owning. |

† Flagged weak; revision expected. Renames are amendments, not failures.

**The mirror law:** every failure on the map has an equal and opposite move. Brand compression: **"Flip it."**

---

## 4. Content Taxonomy & Lifecycle

| Format | Tag | Length | Role |
|---|---|---|---|
| Pattern | [P] | ~600 words | Names and diagnoses one failure; contains the anatomy of its fix |
| Field Guide | [FG] | ~1,200 words | Deep dive on one Practice; SEO-oriented |
| Chapter | [C] | varies | Accumulates into *The Guide to Technical Trust* |
| Essay | — | long-form | Buyer-side perspective; home of the Four C's |

**Lifecycle:** predicted (ghost on map) → announced (max 2–3 at a time; on `/patterns` as "Named, not yet written") → published. **A Practice lags its Pattern by one step:** ghosted until the Pattern publishes; revealed (linking to the Pattern's anatomy-of-the-fix) on publish; amber with its own link when its Field Guide publishes. Every Friday changes both faces of the map.

---

## 5. Naming Laws

1. Patterns are "The ___" — concrete, a little painful, instantly recognizable from the inside.
2. Practices are **moves, never virtues.** If it can't be executed tomorrow, it isn't a Practice.
3. Pairs must read as mirrors.
4. Renames are permitted and expected; every rename gets a changelog entry and, when interesting, a post. Public predictions carry the standing caveat "names subject to revision."
5. Never more than 2–3 announced Patterns at once. Anticipation, not a syllabus.

---

## 6. Audience & Positioning

**Primary:** practitioners — Sales Engineers, Solutions Architects, Developer Advocates, support engineers; anyone who sits between complex systems and the humans betting on them. **Secondary (the mirror reader):** buyers and decision-makers. The homepage leads practitioner-first and acknowledges buyers in exactly one mirror line. The essays may speak buyer-first; they must reference the Four C's, not restate the map rows as if they were the perception model.

**The models never blur.** The Four C's are what is *perceived across a relationship*. The map rows are what is *performed in a moment*. Content that confuses the two is off-canon.

---

## 7. Voice

- Manifesto cadence for framing copy: short declarative lines, one idea per line.
- Honesty as competitive advantage. "I don't know. I'll find out. Here's what we do know."
- Never motivational-poster. Never jargon-as-authority. Teach before persuading.
- Weekly cadence: Technical Trust Weekly, every Friday. One named failure and its counter-move.
- Not "the AI Sales Engineer guy." AI is one instrument; trust is the music.

---

## 8. Infrastructure Canon

- `patterns.ts` is the single source of truth for all Pattern/Practice data; `framework.ts` for grid structure. No duplication, no CMS until there is a second contributor.
- The homepage renders from data, never hand-written content lists.
- Shareable state lives in URLs (`?view=practices`), never local storage.
- The framework is versioned; every structural change gets a changelog entry.
- Canonical edition domain: `newsletter.technicaltrust.org`.
- Site: Next.js (App Router) + TypeScript + Tailwind + Framer Motion on Vercel. Design system: navy `#1B2A4A`, gold `#E0A030`, off-white `#F5F7FA`; Instrument Sans + Geist Mono; "woven certainty."

---

## 9. What Technical Trust Is NOT

- Not finished. The map ships incomplete on purpose; the version number is a feature.
- Not a resume site. The work is the evidence.
- Not about winning arguments or sounding smart.
- Not a checklist. Consistency is the law: trust accumulates.

---

## 10. Amendment Log

| Version | Date | Amendment |
|---|---|---|
| v1.0 | 2026-07-20 | Canon established. Two-sided theorem adopted: the Four C's canonized as the perception model; the map as the production model. Competence designated precondition; Consistency designated accumulation law. |
