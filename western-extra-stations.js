/* TEST ONLY — western desktop last-card centering. No extra stations are added. */
(() => {
  const grid = document.getElementById('radio-grid');
  if (!grid) return;

  const centerLastCard = () => {
    const cards = Array.from(grid.children).filter(el => el.classList.contains('card-radio'));

    cards.forEach(card => card.style.removeProperty('grid-column'));

    if (!window.matchMedia('(min-width: 901px)').matches || cards.length === 0) return;

    const columns = getComputedStyle(grid).gridTemplateColumns
      .split(/\s+/)
      .filter(Boolean).length;

    if (columns === 3 && cards.length % 3 === 1) {
      cards[cards.length - 1].style.setProperty('grid-column', '2', 'important');
    }
  };

  const observer = new MutationObserver(centerLastCard);
  observer.observe(grid, { childList: true });

  window.addEventListener('resize', centerLastCard);
  requestAnimationFrame(centerLastCard);
})();
