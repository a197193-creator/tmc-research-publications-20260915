(() => {
  const toggle = document.getElementById('participant-topics-toggle');
  const topics = document.getElementById('participant-topic-links');
  if (!toggle || !topics) return;
  const mobile = window.matchMedia('(max-width: 899px)');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    topics.classList.toggle('topics-collapsed', !open);
  }
  setOpen(!mobile.matches);
  mobile.addEventListener('change', () => setOpen(!mobile.matches));
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  topics.addEventListener('click', event => {
    if (event.target.closest('a') && mobile.matches) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  const links = Array.from(topics.querySelectorAll('a'));
  const sections = Array.from(document.querySelectorAll('.participant-section'));
  function markActive(id) {
    links.forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  topics.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link) markActive(link.hash.slice(1));
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) markActive(visible[0].target.id);
    }, { rootMargin: '-25% 0px -45% 0px' });
    sections.forEach(section => observer.observe(section));
  }
  markActive(location.hash.slice(1) || 'recruitment');
})();
