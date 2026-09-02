const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const closeSameLevelDropdowns = (currentDropdown) => {
  const currentParentMenu = currentDropdown.parentElement;

  dropdowns.forEach((dropdown) => {
    if (dropdown === currentDropdown) return;

    if (dropdown.parentElement === currentParentMenu) {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('.drop-btn');
      if (button) button.setAttribute('aria-expanded', 'false');
    }
  });
};

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector('.drop-btn');

  if (!button) return;

  button.addEventListener('click', (event) => {
    event.stopPropagation();

    const shouldOpen = !dropdown.classList.contains('open');
    closeSameLevelDropdowns(dropdown);

    if (shouldOpen) {
      dropdown.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
});

document.addEventListener('click', (event) => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  if (navToggle && navMenu && !navToggle.contains(target) && !navMenu.contains(target)) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (!target.closest('.dropdown')) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('.drop-btn');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  }
});
