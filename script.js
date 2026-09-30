const pages = [...document.querySelectorAll('.page')];
const dots = [...document.querySelectorAll('.dot')];
const pageLinks = [...document.querySelectorAll('[data-page]')];

let current = 'home';

function showPage(id, push = true) {
  const target = pages.find(p => p.dataset.pageId === id) || pages[0];

  current = target.dataset.pageId;

  pages.forEach(p => {
    p.classList.toggle('active', p === target);
  });

  dots.forEach(d => {
    d.classList.toggle('active', d.dataset.page === current);
  });

  document.querySelectorAll('.nav a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === current);
  });

  if (push) {
    history.pushState(null, '', '#' + current);
  } else if (location.hash !== '#' + current) {
    history.replaceState(null, '', '#' + current);
  }
}


/* НАВИГАЦИЯ ТОЛЬКО КНОПКАМИ */

pageLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const id = this.dataset.page;

    if (id) {
      showPage(id);
    }
  });
});


/* БРАУЗЕР НАЗАД / ВПЕРЁД */

window.addEventListener('popstate', () => {
  showPage(location.hash.slice(1) || 'home', false);
});

window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);

  if (pages.some(p => p.dataset.pageId === id)) {
    showPage(id, false);
  }
});


/* СТРЕЛКИ КЛАВИАТУРЫ */

function movePage(dir) {
  const i = pages.findIndex(p => p.dataset.pageId === current);
  const next = pages[(i + dir + pages.length) % pages.length];

  showPage(next.dataset.pageId);
}

window.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    return;
  }

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    movePage(1);
  }

  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    movePage(-1);
  }

  if (e.key === 'Escape') {
    closeModal();
  }
});


/*
==================================================
ПОЛНОСТЬЮ ОТКЛЮЧАЕМ ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ СВАЙПОМ
==================================================
*/

window.addEventListener('touchstart', e => {
  // Ничего не делаем.
  // Свайп больше НЕ управляет страницами.
}, { passive: true });

window.addEventListener('touchmove', e => {
  // Ничего не делаем.
}, { passive: true });

window.addEventListener('touchend', e => {
  // Ничего не делаем.
}, { passive: true });


/* РАБОТЫ */

const works = [
  [
    'images/works-1.jpg',
    'MERCEDES GLE',
    'Внешний стайлинг',
    'Акценты кузова и собранный визуальный образ.'
  ],
  [
    'images/works-2.jpg',
    'BMW X5',
    'Индивидуальный проект',
    'Баланс деталей, цвета и характера автомобиля.'
  ],
  [
    'images/works-3.jpg',
    'VOYAH FREE',
    'Комплексный тюнинг',
    'Работа с внешним образом и финальным финишем.'
  ]
];

let workIndex = 0;

function renderWork() {
  const [img, label, title, desc] = works[workIndex];

  const image = document.querySelector('#workImage');

  if (image) {
    image.style.opacity = '.25';

    setTimeout(() => {
      image.src = img;

      image.onload = () => {
        image.style.opacity = '1';
      };
    }, 120);
  }

  const workLabel = document.querySelector('#workLabel');
  const workTitle = document.querySelector('#workTitle');
  const workDesc = document.querySelector('#workDesc');
  const workNum = document.querySelector('#workNum');
  const workProgress = document.querySelector('#workProgress');

  if (workLabel) workLabel.textContent = label;
  if (workTitle) workTitle.textContent = title;
  if (workDesc) workDesc.textContent = desc;
  if (workNum) {
    workNum.textContent = String(workIndex + 1).padStart(2, '0');
  }

  if (workProgress) {
    workProgress.style.height =
      ((workIndex + 1) / works.length * 100) + '%';
  }
}

document.querySelector('#prevWork')?.addEventListener('click', () => {
  workIndex = (workIndex + works.length - 1) % works.length;
  renderWork();
});

document.querySelector('#nextWork')?.addEventListener('click', () => {
  workIndex = (workIndex + 1) % works.length;
  renderWork();
});


/* УСЛУГИ */

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.service-card').forEach(c => {
      c.classList.remove('active');
    });

    card.classList.add('active');
  });
});


/* ОСНОВНАЯ ФОРМА */

const modal = document.querySelector('#bookingModal');

function openModal() {
  if (!modal) return;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    modal.querySelector('input')?.focus();
  }, 50);
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelector('#openBooking')?.addEventListener('click', openModal);

document.querySelector('#openBooking2')?.addEventListener('click', openModal);

document.querySelectorAll('[data-close-modal]').forEach(x => {
  x.addEventListener('click', closeModal);
});

document.querySelector('#bookingForm')?.addEventListener('submit', e => {
  e.preventDefault();

  e.currentTarget.reset();

  document.querySelector('#formSuccess')?.classList.add('show');
});


/* НАЧАЛЬНАЯ СТРАНИЦА */

showPage(location.hash.slice(1) || 'home', false);

renderWork();


/* ПРАВАЯ ПАНЕЛЬ ЗАЯВКИ */

const quickBooking = document.querySelector('#quickBooking');
const edgeZone = document.querySelector('.edge-zone');
const quickClose = document.querySelector('#quickClose');
const quickForm = document.querySelector('#quickBookingForm');
const quickSuccess = document.querySelector('#quickSuccess');

let quickCloseTimer;

function openQuickBooking() {
  if (!quickBooking) return;

  clearTimeout(quickCloseTimer);

  quickBooking.classList.add('open');
  quickBooking.setAttribute('aria-hidden', 'false');
}

function scheduleQuickClose() {
  if (!quickBooking || !edgeZone) return;

  clearTimeout(quickCloseTimer);

  quickCloseTimer = setTimeout(() => {
    if (
      !quickBooking.matches(':hover') &&
      !edgeZone.matches(':hover')
    ) {
      quickBooking.classList.remove('open');
      quickBooking.setAttribute('aria-hidden', 'true');
    }
  }, 220);
}

edgeZone?.addEventListener('mouseenter', openQuickBooking);

edgeZone?.addEventListener('mouseleave', scheduleQuickClose);

quickBooking?.addEventListener('mouseenter', () => {
  clearTimeout(quickCloseTimer);
});

quickBooking?.addEventListener('mouseleave', scheduleQuickClose);

quickClose?.addEventListener('click', () => {
  if (!quickBooking) return;

  quickBooking.classList.remove('open');
  quickBooking.setAttribute('aria-hidden', 'true');
});

quickForm?.addEventListener('submit', e => {
  e.preventDefault();

  quickForm.reset();

  quickSuccess?.classList.add('show');
});