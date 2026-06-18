// Combined scroll + mouse parallax for background depth layers across the site.
const layers = Array.from(document.querySelectorAll('[data-scroll-speed]'));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

if (layers.length && !reducedMotion) {
  let mouseX = 0;
  let mouseY = 0;

  if (isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  function update() {
    const viewportCenter = window.innerHeight / 2;

    layers.forEach((layer) => {
      const scrollSpeed = parseFloat(layer.dataset.scrollSpeed) || 0;
      const mouseSpeed = parseFloat(layer.dataset.mouseSpeed) || 0;

      const rect = layer.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const progress = (viewportCenter - elementCenter) / window.innerHeight;

      const scrollOffsetY = progress * scrollSpeed;
      const mouseOffsetX = mouseX * mouseSpeed;
      const mouseOffsetY = mouseY * mouseSpeed;

      layer.style.transform = `translate3d(${mouseOffsetX}px, ${scrollOffsetY + mouseOffsetY}px, 0)`;
    });

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
