import Swiper from "https://cdn.jsdelivr.net/npm/swiper@14.1.0/swiper-bundle.min.mjs";

function formatIndex(index) {
    return String(index + 1).padStart(2, "0");
}

function initLightbox() {
    const dialog = document.querySelector(".js-gallery-lightbox");
    const allTriggers = [...document.querySelectorAll(".js-gallery-open")];

    if (!dialog || allTriggers.length === 0) {
        return;
    }

    const image = dialog.querySelector(".js-lightbox-image");
    const caption = dialog.querySelector(".js-lightbox-caption");
    const closeButton = dialog.querySelector(".js-gallery-close");
    const previousButton = dialog.querySelector(".js-lightbox-prev");
    const nextButton = dialog.querySelector(".js-lightbox-next");

    let activeTriggers = [];
    let currentIndex = 0;
    let lastTrigger = null;

    function getTriggerGroup(trigger) {
        const group = trigger.dataset.lightboxGroup || "gallery";

        return allTriggers.filter((item) => {
            return (item.dataset.lightboxGroup || "gallery") === group;
        });
    }

    function normalizeIndex(index) {
        return (index + activeTriggers.length) % activeTriggers.length;
    }

    function render(index) {
        if (activeTriggers.length === 0) {
            return;
        }

        currentIndex = normalizeIndex(index);

        const trigger = activeTriggers[currentIndex];
        const source = trigger.dataset.galleryImage;
        const title = trigger.dataset.galleryCaption || "Foto de Juliane";
        const thumbnail = trigger.querySelector("img");

        image.src = source;
        image.alt = thumbnail?.alt || title;
        caption.textContent = `${formatIndex(currentIndex)} / ${formatIndex(activeTriggers.length)} · ${title}`;
    }

    function open(trigger) {
        lastTrigger = trigger;
        activeTriggers = getTriggerGroup(trigger);
        currentIndex = activeTriggers.indexOf(trigger);
        render(currentIndex);
        dialog.showModal();
        document.body.classList.add("is-lightbox-open");
    }

    function close() {
        dialog.close();
        document.body.classList.remove("is-lightbox-open");
        lastTrigger?.focus();
    }

    allTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => open(trigger));
    });

    closeButton?.addEventListener("click", close);
    previousButton?.addEventListener("click", () => render(currentIndex - 1));
    nextButton?.addEventListener("click", () => render(currentIndex + 1));

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            close();
        }
    });

    dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        close();
    });

    dialog.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            render(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            render(currentIndex + 1);
        }
    });
}

export function initJulianeGallery() {
    const carousel = document.querySelector(".js-juliane-gallery");

    if (!carousel) {
        return null;
    }

    const current = document.querySelector(".js-gallery-current");

    const swiper = new Swiper(carousel, {
        speed: 760,
        spaceBetween: 16,
        slidesPerView: 1.08,
        grabCursor: true,
        watchOverflow: true,
        keyboard: {
            enabled: true,
        },
        a11y: {
            enabled: true,
        },
        pagination: {
            el: carousel.querySelector(".gallery-progress"),
            type: "progressbar",
        },
        navigation: {
            prevEl: carousel.querySelector(".js-gallery-prev"),
            nextEl: carousel.querySelector(".js-gallery-next"),
        },
        on: {
            init(instance) {
                if (current) {
                    current.textContent = formatIndex(instance.realIndex);
                }
            },
            slideChange(instance) {
                if (current) {
                    current.textContent = formatIndex(instance.realIndex);
                }
            },
        },
        breakpoints: {
            560: {
                slidesPerView: 1.45,
                spaceBetween: 18,
            },
            820: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            1120: {
                slidesPerView: 3.05,
                spaceBetween: 22,
            },
        },
    });

    initLightbox();

    return swiper;
}
