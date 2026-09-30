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

/* ===== SITE CONFIG ===== */

function applySiteConfig() {
    if (typeof SITE_CONFIG === "undefined") return;

    /* Название */

    document.querySelectorAll(".logo, .footer-logo").forEach((element) => {
        element.innerHTML = SITE_CONFIG.businessName.replace(
            " ",
            "<span>"
        ) + "</span>";
    });

    document.title = SITE_CONFIG.businessName;


    /* Телефон */

    const phoneLink = document.querySelector(
        '.contact-row[href^="tel:"]'
    );

    if (phoneLink) {
        phoneLink.href = "tel:" + SITE_CONFIG.phoneLink;

        const strong = phoneLink.querySelector("strong");

        if (strong) {
            strong.textContent = SITE_CONFIG.phone;
        }
    }


    /* Telegram */

    const telegramLink = document.querySelector(
        '.contact-row[href^="https://t.me/"]'
    );

    if (telegramLink) {
        telegramLink.href = SITE_CONFIG.telegramLink;

        const strong = telegramLink.querySelector("strong");

        if (strong) {
            strong.textContent = SITE_CONFIG.telegram;
        }
    }


    /* Адрес */

    const contactRows = document.querySelectorAll(".contact-row");

    if (contactRows[2]) {
        const strong = contactRows[2].querySelector("strong");

        if (strong) {
            strong.textContent = SITE_CONFIG.address;
        }
    }


    /* График */

    if (contactRows[3]) {
        const strong = contactRows[3].querySelector("strong");

        if (strong) {
            strong.textContent = SITE_CONFIG.schedule;
        }
    }


    /* Главный текст */

    const heroTitle = document.querySelector(".hero h1");

    if (heroTitle) {
        heroTitle.innerHTML = SITE_CONFIG.heroTitle;
    }

    const heroText = document.querySelector(".hero-text");

    if (heroText) {
        heroText.textContent = SITE_CONFIG.heroDescription;
    }


    /* О студии */

    const aboutTitle = document.querySelector(".about-intro h2");

    if (aboutTitle) {
        aboutTitle.innerHTML = SITE_CONFIG.aboutTitle;
    }


    /* Услуги */

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {
        const service = SITE_CONFIG.services[index];

        if (!service) return;

        const title = card.querySelector("h3");
        const description = card.querySelector("p");
        const price = card.querySelector(".service-bottom strong");

        if (title) {
            title.textContent = service.name;
        }

        if (description) {
            description.textContent = service.description;
        }

        if (price) {
            price.textContent = service.price;
        }
    });


    /* Услуги в форме записи */

    const serviceSelect = document.querySelector(
        '.booking-form select[name="service"]'
    );

    if (serviceSelect) {
        serviceSelect.innerHTML =
            '<option value="">Выберите услугу</option>';

        SITE_CONFIG.services.forEach((service) => {
            const option = document.createElement("option");

            option.value = service.name;
            option.textContent = service.name;

            serviceSelect.appendChild(option);
        });
    }


    /* Статистика */

    const stats = document.querySelectorAll(".about-stat strong");

    if (stats[0]) {
        stats[0].textContent = SITE_CONFIG.stats.experience;
    }

    if (stats[1]) {
        stats[1].textContent = SITE_CONFIG.stats.clients;
    }

    if (stats[2]) {
        stats[2].textContent = SITE_CONFIG.stats.attention;
    }

    if (stats[3]) {
        stats[3].textContent = SITE_CONFIG.stats.online;
    }
}


applySiteConfig();

/* =========================================
   SERVICES CAROUSEL — JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector(".services-carousel");

    if (!carousel) {
        return;
    }

    const cards = Array.from(
        carousel.querySelectorAll(".service-carousel-card")
    );

    const prevButton = carousel.querySelector(
        ".services-carousel-prev"
    );

    const nextButton = carousel.querySelector(
        ".services-carousel-next"
    );

    const dotsContainer = document.querySelector(
        ".services-carousel-dots"
    );

    if (!cards.length || !prevButton || !nextButton) {
        return;
    }

    let currentIndex = 0;

    /*
     * Создаём точки навигации
     */

    cards.forEach(function (_, index) {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "services-carousel-dot";

        dot.setAttribute(
            "aria-label",
            "Выбрать услугу " + (index + 1)
        );

        dot.addEventListener("click", function () {
            currentIndex = index;
            updateCarousel();
        });

        dotsContainer.appendChild(dot);

    });

    const dots = Array.from(
        dotsContainer.querySelectorAll(
            ".services-carousel-dot"
        )
    );

    /*
     * Обновление положения карточек
     */

    function updateCarousel() {

        const total = cards.length;

        cards.forEach(function (card, index) {

            let difference =
                (index - currentIndex + total) % total;

            if (difference > total / 2) {
                difference -= total;
            }

            card.classList.remove(
                "is-center",
                "is-left",
                "is-right",
                "is-far-left",
                "is-far-right"
            );

            if (difference === 0) {

                card.classList.add("is-center");

            } else if (difference === -1) {

                card.classList.add("is-left");

            } else if (difference === 1) {

                card.classList.add("is-right");

            } else if (difference === -2) {

                card.classList.add("is-far-left");

            } else {

                card.classList.add("is-far-right");

            }

        });

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }

    /*
     * Следующая услуга
     */

    nextButton.addEventListener("click", function () {

        currentIndex =
            (currentIndex + 1) % cards.length;

        updateCarousel();

    });

    /*
     * Предыдущая услуга
     */

    prevButton.addEventListener("click", function () {

        currentIndex =
            (currentIndex - 1 + cards.length) %
            cards.length;

        updateCarousel();

    });

    /*
     * Управление стрелками клавиатуры
     */

    document.addEventListener("keydown", function (event) {

        if (event.key === "ArrowLeft") {

            currentIndex =
                (currentIndex - 1 + cards.length) %
                cards.length;

            updateCarousel();

        }

        if (event.key === "ArrowRight") {

            currentIndex =
                (currentIndex + 1) % cards.length;

            updateCarousel();

        }

    });

    /*
     * Первый запуск
     */

    updateCarousel();

});

/* =========================================
   WORKS — GALLERY SLIDER LOGIC
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".works-slider");

    if (!slider) {
        return;
    }

    const slides = Array.from(
        slider.querySelectorAll(".works-slide")
    );

    const prevButton = slider.querySelector(
        ".works-slider-prev"
    );

    const nextButton = slider.querySelector(
        ".works-slider-next"
    );

    const dotsContainer = document.querySelector(
        ".works-slider-dots"
    );

    const currentCounter = document.querySelector(
        ".works-current"
    );

    const totalCounter = document.querySelector(
        ".works-total"
    );

    if (
        !slides.length ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }

    let currentIndex = 0;

    /* Точки */

    slides.forEach(function (_, index) {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.className = "works-slider-dot";

        dot.setAttribute(
            "aria-label",
            "Открыть работу " + (index + 1)
        );

        dot.addEventListener("click", function () {

            currentIndex = index;

            updateWorksSlider();

        });

        dotsContainer.appendChild(dot);

    });

    const dots = Array.from(
        dotsContainer.querySelectorAll(
            ".works-slider-dot"
        )
    );

    if (totalCounter) {
        totalCounter.textContent =
            String(slides.length).padStart(2, "0");
    }

    /* Обновление */

    function updateWorksSlider() {

        const total = slides.length;

        slides.forEach(function (slide, index) {

            let difference =
                (index - currentIndex + total) % total;

            if (difference > total / 2) {
                difference -= total;
            }

            slide.classList.remove(
                "is-center",
                "is-left",
                "is-right",
                "is-far-left",
                "is-far-right"
            );

            if (difference === 0) {

                slide.classList.add("is-center");

            } else if (difference === -1) {

                slide.classList.add("is-left");

            } else if (difference === 1) {

                slide.classList.add("is-right");

            } else if (difference === -2) {

                slide.classList.add("is-far-left");

            } else {

                slide.classList.add("is-far-right");

            }

        });

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

        if (currentCounter) {

            currentCounter.textContent =
                String(currentIndex + 1).padStart(2, "0");

        }

    }

    /* Назад */

    prevButton.addEventListener("click", function () {

        currentIndex =
            (currentIndex - 1 + slides.length) %
            slides.length;

        updateWorksSlider();

    });

    /* Вперёд */

    nextButton.addEventListener("click", function () {

        currentIndex =
            (currentIndex + 1) % slides.length;

        updateWorksSlider();

    });

    /* Клавиатура */

    document.addEventListener("keydown", function (event) {

        if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLTextAreaElement
        ) {
            return;
        }

        if (event.key === "ArrowLeft") {

            currentIndex =
                (currentIndex - 1 + slides.length) %
                slides.length;

            updateWorksSlider();

        }

        if (event.key === "ArrowRight") {

            currentIndex =
                (currentIndex + 1) % slides.length;

            updateWorksSlider();

        }

    });

    /* Первый запуск */

    updateWorksSlider();

});
