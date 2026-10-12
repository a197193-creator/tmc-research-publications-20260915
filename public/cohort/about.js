(() => {
  const search = document.getElementById('staff-search');
  const division = document.getElementById('staff-division');
  const cards = Array.from(document.querySelectorAll('.staff-card'));
  const count = document.getElementById('staff-count');
  const empty = document.getElementById('staff-empty');
  const showAll = document.getElementById('staff-show-all');
  if (!search || !division || !cards.length) return;

  let expanded = false;
  const initialLimit = 9;
  const normalize = value => value.toLocaleLowerCase('en').replace(/\s+/g, ' ').trim();

  function filterDirectory() {
    const query = normalize(search.value);
    const words = query.split(' ').filter(Boolean);
    const filtering = Boolean(query || division.value !== 'all');
    const matches = cards.filter(card => {
      const text = normalize(card.dataset.search);
      return (division.value === 'all' || card.dataset.division === division.value)
        && words.every(word => text.includes(word));
    });
    const visible = new Set(filtering || expanded ? matches : matches.slice(0, initialLimit));
    cards.forEach(card => { card.hidden = !visible.has(card); });
    empty.hidden = matches.length > 0;
    showAll.hidden = filtering || expanded || matches.length <= initialLimit;
    showAll.firstChild.textContent = `Show all ${cards.length} people `;
    count.textContent = filtering
      ? `${matches.length} ${matches.length === 1 ? 'person' : 'people'} found`
      : `Showing ${visible.size} of ${cards.length} people`;
  }

  search.addEventListener('input', filterDirectory);
  division.addEventListener('change', filterDirectory);
  document.getElementById('directory-reset').addEventListener('click', () => {
    search.value = '';
    division.value = 'all';
    expanded = false;
    filterDirectory();
    search.focus();
  });
  showAll.addEventListener('click', () => {
    expanded = true;
    filterDirectory();
    const firstNewContact = cards[initialLimit]?.querySelector('a');
    firstNewContact?.focus({ preventScroll: true });
  });
  document.querySelectorAll('[data-select-division]').forEach(button => {
    button.addEventListener('click', () => {
      search.value = '';
      division.value = button.dataset.selectDivision;
      expanded = true;
      filterDirectory();
      document.getElementById('directory').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
      division.focus({ preventScroll: true });
    });
  });
  filterDirectory();
})();
