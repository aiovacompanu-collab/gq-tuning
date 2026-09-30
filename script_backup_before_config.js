const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("is-open");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
        });
    });
}


/* ===== BOOKING PANEL ===== */

const bookingPanel = document.querySelector(".booking-panel");
const bookingClose = document.querySelector(".booking-close");
const bookingTriggers = document.querySelectorAll(".booking-trigger");
const bookingForm = document.querySelector(".booking-form");

function openBooking() {
    if (!bookingPanel) return;

    bookingPanel.classList.add("is-open");
    bookingPanel.setAttribute("aria-hidden", "false");
}

function closeBooking() {
    if (!bookingPanel) return;

    bookingPanel.classList.remove("is-open");
    bookingPanel.setAttribute("aria-hidden", "true");
}


/* Кнопки "Записаться" */

bookingTriggers.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        openBooking();
    });
});


/* Кнопка закрытия */

if (bookingClose) {
    bookingClose.addEventListener("click", closeBooking);
}


/* ПК: отслеживаем правый край экрана */

document.addEventListener("mousemove", (event) => {
    if (event.clientX >= window.innerWidth - 20) {
        openBooking();
    }
});


/* Escape */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeBooking();
    }
});


/* ===== СВАЙП НА ТЕЛЕФОНЕ ===== */

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];

    if (!touch) return;

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];

    if (!touch) return;

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
    }

    if (
        touchStartX > window.innerWidth - 70 &&
        deltaX < -60
    ) {
        openBooking();
    }

    if (
        bookingPanel &&
        bookingPanel.classList.contains("is-open") &&
        deltaX > 60
    ) {
        closeBooking();
    }
});


/* ===== ФОРМА ===== */

if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        alert("Заявка отправлена! Пока это тестовая версия.");

        bookingForm.reset();
        closeBooking();
    });
}
