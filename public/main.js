const EXTERNAL_LINK_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

const CONTACT_ICONS = {
  email:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`,
  github:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
};

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
    `<a href="${c.href}" class="contact-link"${c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${CONTACT_ICONS[c.icon] || ''}${c.label}</a>`
  ).join('');
}

render();
