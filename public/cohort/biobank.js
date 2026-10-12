(() => {
  const page = document.querySelector('.biobank-page');
  const header = document.querySelector('.portal-header');
  const navigation = document.querySelector('.bio-quicknav');
  if (!page) return;
  const desktop = window.matchMedia('(min-width: 768px)');
  function setAnchorOffset() {
    const headerHeight = desktop.matches && header ? Math.ceil(header.getBoundingClientRect().height) : 0;
    const navHeight = navigation ? Math.ceil(navigation.getBoundingClientRect().height) : 0;
    page.style.setProperty('--biobank-header-offset', `${headerHeight}px`);
    page.style.setProperty('--biobank-anchor-offset', `${headerHeight + navHeight + 16}px`);
  }
  setAnchorOffset();
  desktop.addEventListener('change', setAnchorOffset);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(setAnchorOffset);
    if (header) observer.observe(header);
    if (navigation) observer.observe(navigation);
  } else {
    window.addEventListener('resize', setAnchorOffset);
  }

  const videoButton = document.getElementById('biobank-video-play');
  const videoStage = document.getElementById('biobank-video-stage');
  if (videoButton && videoStage) {
    videoButton.hidden = false;
    videoButton.addEventListener('click', () => {
      const url = new URL(videoButton.dataset.videoUrl);
      if (url.origin !== 'https://www.youtube.com' || url.pathname !== '/embed/B0-j-QvXvPM') return;
      url.searchParams.set('autoplay', '1');
      const iframe = document.createElement('iframe');
      iframe.src = url.toString();
      iframe.title = 'Biobank video published by UKM MyCohort';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      videoStage.classList.add('is-playing');
      videoStage.replaceChildren(iframe);
    });
  }

  const rows = [...document.querySelectorAll('[data-publication-row]')];
  const search = document.getElementById('publication-search');
  const year = document.getElementById('publication-year');
  const status = document.getElementById('publication-status');
  const count = document.getElementById('publication-count');
  const empty = document.getElementById('publication-empty');
  const previous = document.getElementById('publication-previous');
  const next = document.getElementById('publication-next');
  const pageLabel = document.getElementById('publication-page-label');
  if (!rows.length || !search || !year || !status || !count || !empty || !previous || !next || !pageLabel) return;

  document.getElementById('publication-filters').hidden = false;
  document.getElementById('publication-pagination').hidden = false;
  const pageSize = 6;
  let currentPage = 0;
  let filtered = rows;
  function render() {
    const pageCount = Math.ceil(filtered.length / pageSize);
    currentPage = Math.min(currentPage, Math.max(0, pageCount - 1));
    const start = currentPage * pageSize;
    const visible = new Set(filtered.slice(start, start + pageSize));
    rows.forEach(row => { row.hidden = !visible.has(row); });
    count.textContent = filtered.length ? `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length} records` : '0 matching records';
    empty.hidden = filtered.length !== 0;
    pageLabel.textContent = filtered.length ? `Page ${currentPage + 1} of ${pageCount}` : 'No matching records';
    previous.disabled = currentPage === 0;
    next.disabled = !filtered.length || currentPage >= pageCount - 1;
  }
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    filtered = rows.filter(row =>
      row.dataset.search.includes(query) &&
      (year.value === 'all' || row.dataset.year === year.value) &&
      (status.value === 'all' || row.dataset.status === status.value)
    );
    currentPage = 0;
    render();
  }
  search.addEventListener('input', filter);
  year.addEventListener('change', filter);
  status.addEventListener('change', filter);
  document.getElementById('publication-filters').addEventListener('submit', event => event.preventDefault());
  document.getElementById('publication-reset').addEventListener('click', () => {
    search.value = '';
    year.value = 'all';
    status.value = 'all';
    filter();
    search.focus();
  });
  previous.addEventListener('click', () => { currentPage -= 1; render(); });
  next.addEventListener('click', () => { currentPage += 1; render(); });
  render();
})();
