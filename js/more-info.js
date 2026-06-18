// "Meer info" opens a dimmed modal with details about the clicked solution.
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalClose = document.getElementById('modalClose');

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modalOverlay.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.more-info-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    openModal(btn.dataset.title, btn.dataset.text);
  });
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
