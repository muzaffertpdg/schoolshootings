const rootStyle = getComputedStyle(document.documentElement);
function cssVar(name) { return rootStyle.getPropertyValue(name).trim(); }

// ---- Hero stat counter (just the one animated %) ----
function animateCount(el, target) {
  const dur = 900;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
animateCount(document.getElementById('decadeIncreasePct'), DECADE_INCREASE_PCT);

// ---- Ethics / contagion box ----
document.getElementById('ethicsTitle').textContent = CONTAGION_NOTE.title;
document.getElementById('ethicsBody').textContent = CONTAGION_NOTE.body;
document.getElementById('ethicsCitation').textContent = CONTAGION_NOTE.citation;
document.getElementById('ethicsCounterpoint').textContent = CONTAGION_NOTE.counterpoint;

// ---- Human toll box ----
document.getElementById('tollTitle').textContent = HUMAN_TOLL_NOTE.title;
document.getElementById('tollBody').textContent = HUMAN_TOLL_NOTE.body;

// ---- Methodology box ----
document.getElementById('methodTitle').textContent = METHODOLOGY_NOTE.title;
document.getElementById('methodBody').textContent = METHODOLOGY_NOTE.body;
document.getElementById('methodSource').textContent = 'Source: ' + METHODOLOGY_NOTE.source;

// ---- Definition pair cards ----
const defPair = document.getElementById('definitionPair');
defPair.innerHTML = `
  <div class="definition-card">
    <span class="def-label">Broad definition</span>
    <div class="def-count">${OVERVIEW.totalIncidentsSince1970.toLocaleString()}</div>
    <p>Any incident where a gun was fired, brandished, or a bullet hit school property, since 1970 &mdash; regardless of injury.</p>
  </div>
  <div class="definition-card">
    <span class="def-label">Narrow "active shooter" definition</span>
    <div class="def-count">${OVERVIEW.activeShooterIncidentsSince1999}</div>
    <p>A perpetrator killing or wounding targeted or random victims during a continuous episode of violence, since 1999. Averages ${OVERVIEW.activeShooterAvgPerYear}/year; ${OVERVIEW.activeShooterPctHighSchool}% occurred in high schools.</p>
  </div>
`;

// ---- Decade comparison bar chart (D3) ----
const svg = d3.select('#decadeChart');
const margin = { top: 30, right: 40, bottom: 50, left: 70 };
const W = 700, H = 320;
const innerW = W - margin.left - margin.right;
const innerH = H - margin.top - margin.bottom;
const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand().domain(DECADE_COMPARISON.map(d => d.period)).range([0, innerW]).padding(0.45);
const y = d3.scaleLinear().domain([0, d3.max(DECADE_COMPARISON, d => d.incidents)]).nice().range([innerH, 0]);

g.append('g')
  .attr('transform', `translate(0,${innerH})`)
  .call(d3.axisBottom(x))
  .call(sel => sel.selectAll('text').attr('fill', 'var(--color-text-muted)').attr('font-family', 'var(--font-mono)').attr('font-size', '13px'))
  .call(sel => sel.selectAll('line,path').attr('stroke', 'var(--color-border)'));

g.append('g')
  .call(d3.axisLeft(y).ticks(5))
  .call(sel => sel.selectAll('text').attr('fill', 'var(--color-text-muted)').attr('font-family', 'var(--font-mono)').attr('font-size', '11px'))
  .call(sel => sel.selectAll('line,path').attr('stroke', 'var(--color-border)'));

g.append('g').attr('class', 'grid')
  .call(d3.axisLeft(y).ticks(5).tickSize(-innerW).tickFormat(''))
  .call(sel => sel.selectAll('line').attr('stroke', 'var(--color-divider)').attr('stroke-dasharray', '2,3'))
  .call(sel => sel.select('.domain').remove());

g.selectAll('.bar').data(DECADE_COMPARISON).join('rect')
  .attr('x', d => x(d.period))
  .attr('y', innerH)
  .attr('width', x.bandwidth())
  .attr('height', 0)
  .attr('fill', (d, i) => i === 0 ? cssVar('--color-text-faint') : cssVar('--color-danger'))
  .attr('rx', 4)
  .transition().duration(900).ease(d3.easeCubicOut)
  .attr('y', d => y(d.incidents))
  .attr('height', d => innerH - y(d.incidents));

g.selectAll('.bar-label').data(DECADE_COMPARISON).join('text')
  .attr('x', d => x(d.period) + x.bandwidth() / 2)
  .attr('y', d => y(d.incidents) - 10)
  .attr('text-anchor', 'middle')
  .attr('fill', 'var(--color-text)')
  .attr('font-family', 'var(--font-mono)')
  .attr('font-size', '18px')
  .attr('font-weight', '600')
  .attr('opacity', 0)
  .text(d => d.incidents.toLocaleString())
  .transition().delay(700).duration(400)
  .attr('opacity', 1);

g.append('text')
  .attr('x', -innerH / 2).attr('y', -50).attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle').attr('fill', 'var(--color-text-faint)')
  .attr('font-family', 'var(--font-mono)').attr('font-size', '11px')
  .text('Recorded incidents');

// ---- Annual reference point cards ----
const refsGrid = document.getElementById('annualRefsGrid');
ANNUAL_REFERENCE_POINTS.forEach(ref => {
  const card = document.createElement('div');
  card.className = 'annual-ref-card';
  card.innerHTML = `
    <div class="arc-year">${ref.year}</div>
    <div class="arc-value">${ref.value.toLocaleString()}</div>
    <p>${ref.label}</p>
    <div class="arc-source">Source: ${ref.source}</div>
  `;
  refsGrid.appendChild(card);
});

// ---- Analysis cards ----
const analysisGrid = document.getElementById('analysisGrid');
ANALYSIS_CARDS.forEach(card => {
  const el = document.createElement('article');
  el.className = 'analysis-card';
  el.setAttribute('data-severity', card.severity);
  el.innerHTML = `
    <div class="card-header">
      <span class="severity-badge ${card.severity}">${card.label}</span>
      <h3>${card.title}</h3>
    </div>
    <div class="card-body">
      <p>${card.body}</p>
      ${card.source ? `<p class="card-source">Source: ${card.source}</p>` : ''}
    </div>
  `;
  analysisGrid.appendChild(el);
});

// ---- Smooth anchor scroll ----
document.querySelectorAll('[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
