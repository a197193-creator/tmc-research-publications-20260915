(() => {
  // Preserve earlier shared links after moving these sections to dedicated pages.
  const oldPage = location.pathname.split('/').pop() || 'index.html';
  const oldRoutes = {
    'index.html#news': 'news.html',
    'index.html#recognition': 'news.html?search=BMCC',
    'index.html#contact': 'contact.html',
    'about.html#contact-us': 'contact.html',
    'about.html#location-map': 'contact.html'
  };
  const destination = oldRoutes[oldPage + location.hash];
  if (destination) {
    location.replace(destination);
    return;
  }
  const portalHeader = document.querySelector('.portal-header');
  if (portalHeader) {
    const desktopHeader = window.matchMedia('(min-width: 768px)');
    const updateAnchorOffset = () => {
      const offset = desktopHeader.matches ? Math.ceil(portalHeader.getBoundingClientRect().height) + 16 : 16;
      document.documentElement.style.setProperty('--portal-anchor-offset', `${offset}px`);
    };
    updateAnchorOffset();
    desktopHeader.addEventListener('change', updateAnchorOffset);
    if ('ResizeObserver' in window) new ResizeObserver(updateAnchorOffset).observe(portalHeader);
    else window.addEventListener('resize', updateAnchorOffset);
  }
  const portalToggle = document.querySelector('.portal-nav-toggle');
  const portalNav = document.querySelector('.portal-nav');
  if (portalToggle && portalNav) {
    const closePortalNav = () => {
      portalToggle.setAttribute('aria-expanded', 'false');
      portalNav.classList.remove('is-open');
    };
    portalToggle.addEventListener('click', () => {
      const open = portalToggle.getAttribute('aria-expanded') !== 'true';
      portalToggle.setAttribute('aria-expanded', String(open));
      portalNav.classList.toggle('is-open', open);
    });
    portalNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closePortalNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePortalNav();
    });
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('open', open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }

  const grid = document.querySelector('#resource-grid');
  const input = document.querySelector('#resource-search');
  const count = document.querySelector('#resource-count');
  const empty = document.querySelector('#resource-empty');
  if (!grid || !input || !count || !empty) return;

  const filter = () => {
    const query = input.value.trim().toLocaleLowerCase();
    const cards = [...grid.querySelectorAll('.resource-card')];
    let visible = 0;
    for (const card of cards) {
      const match = (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? 'resource' : 'resources'}`;
    empty.hidden = visible !== 0;
  };
  input.addEventListener('input', filter);

  // The HTML links remain available if the PHP function is unavailable offline.
  fetch('/data/resource-directory.json', { headers: { Accept: 'application/json' } })
    .then((response) => {
      if (!response.ok) throw new Error('Resource endpoint unavailable');
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.resources) || data.resources.length === 0) return;
      const cards = data.resources.map((item, index) => {
        if (!item || typeof item.url !== 'string') return null;
        const internal = /^(?:index|about|participants|research|news|contact|resources)\.html(?:#[a-z0-9-]+)?$/.test(item.url);
        const external = /^https:\/\/www\.ukm\.my\/mycohort\//.test(item.url);
        if (!internal && !external) return null;
        const card = document.createElement('a');
        card.className = 'resource-card';
        card.href = item.url;
        if (external) {
          card.target = '_blank';
          card.rel = 'noopener noreferrer';
        }
        card.dataset.search = item.search || '';
        const category = document.createElement('span');
        category.textContent = `${String(index + 1).padStart(2, '0')} / ${item.category}`;
        const title = document.createElement('strong');
        title.textContent = item.title;
        const description = document.createElement('small');
        description.textContent = item.description;
        const arrow = document.createElement('b');
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = internal ? '→' : '↗';
        card.append(category, title, description, arrow);
        return card;
      }).filter(Boolean);
      if (cards.length > 0) {
        grid.replaceChildren(...cards);
        filter();
      }
    })
    .catch(() => {});
})();

(() => {
  const value = new URLSearchParams(location.search).get('return');
  if (!value) return;
  let target;
  try { target = new URL(value, location.href); } catch { return; }
  if (target.origin !== location.origin) return;
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '../#home') a.href = target.href;
    else if (/^[a-z-]+\.html(?:#.*)?$/.test(href)) {
      const url = new URL(href, location.href);
      url.searchParams.set('return', target.href);
      a.href = url.href;
    }
  });
})();
