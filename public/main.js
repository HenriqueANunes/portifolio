const EXTERNAL_LINK_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

let currentLang = 'pt';

function setLang(lang) {
  currentLang = lang;
  render();
  document.getElementById('btnPt').classList.toggle('active', lang === 'pt');
  document.getElementById('btnEn').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

function render() {
  const t = TRANSLATIONS[currentLang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  document.getElementById('navLinks').innerHTML = t.navLinks.map(link =>
    `<li><a href="${link.href}">${link.label}</a></li>`
  ).join('');

  document.getElementById('expList').innerHTML = t.experience.map(job => `
    <div class="exp-item">
      <div class="exp-header">
        <div>
          <div class="exp-role">${job.role}</div>
          <a href="${job.companyUrl}" class="exp-company" target="_blank" rel="noopener">
            ${job.company} ${EXTERNAL_LINK_ICON}
          </a>
        </div>
        <div class="exp-meta">
          <div class="exp-period">${job.period}</div>
          ${job.current ? `<span class="exp-badge">${currentLang === 'pt' ? 'atual' : 'current'}</span>` : ''}
        </div>
      </div>
      <p class="exp-desc">${job.description}</p>
    </div>
  `).join('');

  document.getElementById('skillsList').innerHTML = t.skillGroups.map(group => `
    <div class="skill-group">
      <div class="skill-group-title">${group.title}</div>
      <div class="skill-items">
        ${group.items.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');

  document.getElementById('eduList').innerHTML = t.education.map(edu => `
    <div class="edu-item">
      <div>
        <div class="edu-title">${edu.title}</div>
        <div class="edu-institution">${edu.institution}</div>
      </div>
      <div class="edu-period">${edu.period}</div>
    </div>
  `).join('');

  document.getElementById('certsList').innerHTML = t.certs.map(cert => {
    const badge = cert.img
      ? `<img src="${cert.img}" alt="${cert.name}" class="cert-badge-img">`
      : `<div class="cert-badge-text">${cert.badge}</div>`;

    if (cert.url) {
      return `
        <a class="cert-card" href="${cert.url}" target="_blank" rel="noopener">
          ${badge}
          <div class="cert-info">
            <div class="cert-issuer">${cert.issuer}</div>
            <div class="cert-name">${cert.name}</div>
            <div class="cert-cta">${cert.ctaLabel} ${EXTERNAL_LINK_ICON}</div>
          </div>
        </a>`;
    }
    return `
      <div class="cert-card cert-card--plain">
        ${badge}
        <div class="cert-info">
          <div class="cert-issuer">${cert.issuer}</div>
          <div class="cert-name">${cert.name}</div>
          <div class="cert-level">${cert.levelLabel}</div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('homelabContent').innerHTML = `
    <div class="homelab-diagram">
      ${t.homelabDiagram.map((step, i) => `
        <span class="diagram-step">
          <span class="diagram-node">${step}</span>
          ${i < t.homelabDiagram.length - 1 ? '<span class="diagram-arrow">→</span>' : ''}
        </span>`).join('')}
    </div>
    <div class="homelab-card">
      <div class="card-title">${t.homelabSpecsTitle}</div>
      <div class="specs-grid">
        ${t.homelabSpecs.map(s => `
          <div class="spec-row">
            <span class="spec-label">${s.label}</span>
            <span class="spec-value">${s.value}</span>
          </div>`).join('')}
      </div>
    </div>
    <div>
      <div class="card-title">${t.homelabServicesTitle}</div>
      <div class="services-grid">
        ${t.homelabServices.map(svc => `
          <div class="service-card">
            <span class="service-dot"></span>
            <div class="service-info">
              <span class="service-name">${svc.name}</span>
              <span class="service-desc">${svc.desc}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  document.getElementById('contactLinks').innerHTML = t.contactLinks.map(c =>
    `<a href="${c.href}" class="contact-link"${c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${c.label}</a>`
  ).join('');
}

render();
