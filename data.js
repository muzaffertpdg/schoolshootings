// K-12 SCHOOL SHOOTINGS IN THE US — DATA
// Primary source: K-12 School Shooting Database (Riedman, D.), maintained by the
// Center for Homeland Defense and Security (CHDS), Naval Postgraduate School,
// in conjunction with FEMA. Secondary citations noted inline.
//
// DESIGN COMMITMENT (also stated on the page itself):
// This site shows aggregate trends only. It contains NO perpetrator names, NO
// photos, and NO incident-level "deadliest attacks" ranking. A ranked list of
// attacks by casualty count, or anything that could function as notoriety-
// tracking, is a real and documented contagion risk in this specific research
// literature (Towers et al., 2015, PLOS ONE). We are deliberately not building
// that here.

const OVERVIEW = {
  totalIncidentsSince1970: 2069,
  totalIncidentsSince1970Note: 'K-12 SSDB, cited via Campus Safety Magazine, updated Oct. 2023. An earlier 2022 citation of the same running database reported 2,057 — the ~12-incident difference across citation dates is itself illustrative of how a continuously-updated, open-source database changes between the moment it is queried and the moment it is cited.',
  fatalitiesSince1970: 684,
  injuriesSince1970: 1937,

  activeShooterIncidentsSince1999: 154,
  activeShooterAvgPerYear: 6,
  activeShooterPctHighSchool: 55,
  activeShooterPctMiddleSchool: 22,
  activeShooterNote: 'The K-12 SSDB tracks a broader category ("any incident where a gun was fired, brandished, or a bullet hit school property") alongside a narrower "active shooter" subcategory (a perpetrator killing or wounding targeted or random victims during a continuous episode of violence). These are genuinely different things, and conflating them is one of the most common sources of confusion in public reporting on this topic.',
};

// Real decade-over-decade comparison — the clearest, most directly citable trend
// in the data. Two real numbers, not a fabricated smooth year-by-year line.
const DECADE_COMPARISON = [
  { period: '2004–2013', incidents: 346 },
  { period: '2014–2023', incidents: 1468 },
];
const DECADE_INCREASE_PCT = Math.round(((1468 - 346) / 346) * 100);

// Specific, individually-cited annual reference points. Presented as labeled
// callouts, NOT connected into a continuous line — we do not have a verified
// complete year-by-year series, so we are not implying one.
const ANNUAL_REFERENCE_POINTS = [
  { year: 2018, value: 11, label: 'Highest year on record for "active shooter" incidents specifically', source: 'K-12 SSDB, via Campus Safety Magazine' },
  { year: 2023, value: 352, label: 'Highest year on record for total incidents (broad definition)', source: 'K-12 SSDB, via Security.org' },
  { year: 2025, value: 233, label: 'Incidents recorded, partial-year figure', source: 'K-12 SSDB, via Security.org' },
];

// The definitional/methodological reality — described in text per design
// decision, not forced into a misleading cross-tracker comparison chart.
const METHODOLOGY_NOTE = {
  title: 'There is no single, agreed-upon definition of "a school shooting"',
  body: "Different trackers count different things. The K-12 School Shooting Database uses a broad definition — any time a gun is fired or brandished, or a bullet hits school property, regardless of injuries. Its own narrower \"active shooter\" subcategory requires a perpetrator actively killing or wounding victims. The Washington Post's database uses its own separate methodology. NBC News maintains a third, independently-defined tracker. None of these trackers is wrong — they are answering different questions. But it means the same underlying reality can be reported as meaningfully different numbers depending on which definition a given headline is using, and readers rarely see the definition, only the number.",
  source: "K-12 SSDB methodology documentation (k12ssdb.org); Association of Health Care Journalists (2024)"
};

const CONTAGION_NOTE = {
  title: 'On why this site doesn\u2019t rank or name incidents',
  body: "A ranked list of attacks by casualty count, or anything that could function as notoriety-tracking, is a real and documented contagion risk in this specific research literature (there's actual criminology work on copycat/media-contagion effects). This site would show aggregate trends only \u2014 counts per year, definitional variance across trackers, geographic/policy-context research findings \u2014 never incident-level \"rankings.\"",
  citation: "Towers, S., G\u00f3mez-Li\u00e9vano, A., Khan, M., Mubayi, A., & Castillo-Ch\u00e1vez, C. (2015). Contagion in Mass Killings and School Shootings. PLOS ONE, 10(7), e0117259.",
  counterpoint: "This finding is not uncontested: Lankford & Tomek (2017), in Suicide and Life-Threatening Behavior, argued the same clustering pattern could plausibly arise from randomness rather than true contagion. We cite both rather than presenting the contagion hypothesis as scientific consensus.",
};

const HUMAN_TOLL_NOTE = {
  title: 'What the numbers represent',
  body: "684 is not a statistic before it is a number of people \u2014 children, teachers, staff \u2014 who did not come home. Every figure on this page is real and aggregate by design, but aggregation is not the same as distance. If any part of this topic affects you personally, the Sources section includes where to find support, not just data."
};

const ANALYSIS_CARDS = [
  {
    severity: 'critical',
    label: 'Observed',
    title: 'The most recent decade saw incidents quadruple',
    body: `Incidents rose from 346 in the 2004\u20132013 decade to 1,468 in 2014\u20132023 \u2014 a ${DECADE_INCREASE_PCT}% increase. This is not a projection or a model; both numbers are drawn from the same database using the same methodology across both periods, which is what makes the comparison meaningful.`
  },
  {
    severity: 'moderate',
    label: 'Observed',
    title: '"School shooting" and "active shooter" are different categories',
    body: 'Of roughly 2,069 recorded incidents since 1970 under the broad definition, only 154 meet the narrower "active shooter" criteria since 1999. Public conversation frequently collapses these into one number, which distorts both the scale of the broader problem and the severity of the narrower one.'
  },
  {
    severity: 'moderate',
    label: 'Observed',
    title: 'The characteristics research is thinner than the discourse suggests',
    body: 'A 2026 systematic review in Frontiers in Psychiatry searching peer-reviewed literature from 1900\u20132024 found that roughly 75% of commonly-cited sociodemographic and psychological characteristics of school shooters are not actually well-supported by primary empirical research \u2014 much of the popular narrative around "who does this and why" outpaces the evidence base.',
    source: 'Minelli, Zappal\u00e0, Vayr & Santtila (2026), Frontiers in Psychiatry'
  },
  {
    severity: 'severe',
    label: 'Unresolved',
    title: 'Whether contagion is real or apparent is a live statistical dispute',
    body: 'Towers et al. (2015) found statistical evidence that mass killings involving firearms are associated with similar events in the immediately preceding weeks. Lankford & Tomek (2017) argued the same pattern is also consistent with random clustering. Subsequent methodological work (Towers, Mubayi & Castillo-Ch\u00e1vez, 2018) revisited the statistical methods themselves. The dispute has not fully resolved \u2014 which is itself the reason this site treats incident-level notoriety-tracking as a risk worth avoiding regardless of which side is ultimately correct.'
  },
];
