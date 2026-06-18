// 3D tilt effect for solution cards — follows the cursor, disabled on touch devices.
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
const tiltCards = document.querySelectorAll('.card');

if (isFinePointer) {
  tiltCards.forEach((card) => {
    card.classList.add('tilt');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateX = (py - 0.5) * -14;
      const rotateY = (px - 0.5) * 14;

      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}
