import Swiper from "https://cdn.jsdelivr.net/npm/swiper@14.1.0/swiper-bundle.min.mjs";

function formatIndex(index) {
    return String(index + 1).padStart(2, "0");
}

export function initBrideCarousel() {
    const carousel = document.querySelector(".js-bride-swiper");

    if (!carousel) {
        return null;
    }

    const section = carousel.closest(".bride-section");
    const current = section?.querySelector(".js-bride-current");

    return new Swiper(carousel, {
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
            el: carousel.querySelector(".bride-progress"),
            type: "progressbar",
        },
        navigation: {
            prevEl: section?.querySelector(".js-bride-prev"),
            nextEl: section?.querySelector(".js-bride-next"),
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
                slidesPerView: 2.35,
                spaceBetween: 20,
            },
            1120: {
                slidesPerView: 3.15,
                spaceBetween: 22,
            },
        },
    });
}
