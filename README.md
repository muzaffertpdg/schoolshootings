# K-12 School Shootings in the US — Aggregate Trends, Not Rankings

Real, cited aggregate data on K-12 school shootings in the United States since
1970. Built with explicit design constraints grounded in the research
literature itself, not just editorial caution.

## Structure

Same file split and design system as OceanShift / Radshift / Vanishing Voices / Tunguska:

- `index.html` — page structure
- `styles.css` — shared design tokens, byte-identical across all five sites
- `ss-styles.css` — this site's specific components (decade chart, ethics box, methodology box)
- `data.js` — all figures, cited inline
- `app.js` — D3 chart rendering and card population

## Design commitments (stated on the page itself, not just here)

1. **No perpetrator names, photos, or incident-level "deadliest attacks" ranking.**
   Grounded in Towers et al. (2015, PLOS ONE), which found statistical evidence
   of contagion/copycat clustering in mass killings and school shootings. The
   counter-finding (Lankford & Tomek, 2017) is also cited — this dispute is not
   fully resolved in the literature, which is part of why the site avoids the
   risk regardless of which side is correct.
2. **No speculative/simulation layer.** Unlike Radshift or Crossfire, this site
   is pure Observed data. The one area of real uncertainty — differing
   definitions across trackers — is described in text, not forced into a
   comparison chart that could misleadingly imply precision the underlying
   data doesn't support.
3. **The decade-over-decade chart (346 → 1,468 incidents) uses only two real,
   directly-cited numbers** from the same database using the same methodology
   across both periods. Individual annual reference points (2018, 2023, 2025)
   are shown as separate labeled callouts, not connected into a fabricated
   continuous year-by-year line, because a complete verified series wasn't
   available to us.
4. **A visible acknowledgment of human cost**, plus a crisis-line resource,
   so the aggregate format doesn't fully flatten what the numbers represent.

## Sources

- Riedman, D. *K-12 School Shooting Database.* Center for Homeland Defense and Security (CHDS), Naval Postgraduate School, with FEMA. https://k12ssdb.org/
- Towers, S., Gómez-Liévano, A., Khan, M., Mubayi, A., & Castillo-Chávez, C. (2015). *Contagion in Mass Killings and School Shootings.* PLOS ONE, 10(7), e0117259.
- Lankford, A., & Tomek, S. (2017). *Mass killings in the United States from 2006 to 2013: social contagion or random clusters?* Suicide and Life-Threatening Behavior.
- Minelli, M., Zappalà, A., Vayr, S., & Santtila, P. (2026). *Sociodemographic and psychological characteristics of school shooters in the United States: a systematic review.* Frontiers in Psychiatry.
- Decade comparison figures (346 / 1,468) reported via Axios, citing K-12 SSDB.
- Annual reference figures reported via Security.org and Campus Safety Magazine, both citing K-12 SSDB.

## Deploy

Static site, no build step. Push to a public GitHub repo and enable GitHub
Pages (Settings → Pages → deploy from `main`, root) — same workflow as the
rest of the OceanShift family.

## A note on scope

This site deliberately does not cover college/university shootings (a
separate research literature — see Silva, 2025) and does not attempt a
cross-tracker numerical comparison (Washington Post vs. K-12 SSDB vs. others)
— that disagreement is described in text in the Methodology box rather than
charted, since we don't have fully verified, directly comparable series from
each tracker.
