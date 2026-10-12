(() => {
  const search = document.getElementById('media-search');
  const year = document.getElementById('media-year');
  const category = document.getElementById('media-category');
  const cards = [...document.querySelectorAll('.media-card')];
  const count = document.getElementById('media-count');
  const empty = document.getElementById('media-empty');
  const pagination = document.getElementById('media-pagination');
  const pageSelect = document.getElementById('media-page');
  const previous = document.getElementById('media-previous');
  const next = document.getElementById('media-next');
  if (!search || !year || !category || !cards.length) return;

  let page = 1;
  const pageSize = 12;
  const normalize = value => value.toLocaleLowerCase('en').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const parameters = new URLSearchParams(location.search);
  search.value = parameters.get('search') || '';
  if ([...year.options].some(option => option.value === parameters.get('year'))) year.value = parameters.get('year');
  if ([...category.options].some(option => option.value === parameters.get('category'))) category.value = parameters.get('category');

  function filter() {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    const matches = cards.filter(card => (year.value === 'all' || card.dataset.year === year.value)
      && (category.value === 'all' || card.dataset.category === category.value)
      && words.every(word => normalize(card.dataset.search).includes(word)));
    const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
    page = Math.max(1, Math.min(page, totalPages));
    const start = (page - 1) * pageSize;
    const visible = new Set(matches.slice(start, start + pageSize));
    cards.forEach(card => { card.hidden = !visible.has(card); });
    count.textContent = matches.length
      ? `Showing ${start + 1}–${Math.min(start + pageSize, matches.length)} of ${matches.length} ${matches.length === 1 ? 'resource' : 'resources'}`
      : '0 resources found';
    empty.hidden = matches.length !== 0;
    pagination.hidden = totalPages === 1;
    previous.disabled = page === 1;
    next.disabled = page === totalPages;
    pageSelect.replaceChildren(...Array.from({ length: totalPages }, (_, index) => {
      const option = document.createElement('option');
      option.value = String(index + 1);
      option.textContent = `${index + 1} of ${totalPages}`;
      return option;
    }));
    pageSelect.value = String(page);
  }

  [search, year, category].forEach(control => control.addEventListener(control === search ? 'input' : 'change', () => {
    page = 1;
    filter();
  }));
  document.getElementById('media-reset').addEventListener('click', () => {
    search.value = '';
    year.value = 'all';
    category.value = 'all';
    page = 1;
    filter();
    search.focus({ preventScroll: true });
  });
  const changePage = value => {
    page = value;
    filter();
    count.focus({ preventScroll: true });
    document.getElementById('media-archive').scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };
  previous.addEventListener('click', () => changePage(page - 1));
  next.addEventListener('click', () => changePage(page + 1));
  pageSelect.addEventListener('change', () => changePage(Number(pageSelect.value)));
  document.getElementById('media-toolbar').hidden = false;
  filter();
})();
