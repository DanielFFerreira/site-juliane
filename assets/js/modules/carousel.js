import Swiper from "https://cdn.jsdelivr.net/npm/swiper@14.1.0/swiper-bundle.min.mjs";

export function initMomentsCarousel() {
    const carousel = document.querySelector(".js-moments-swiper");

    if (!carousel) {
        return null;
    }

    return new Swiper(carousel, {
        speed: 720,
        spaceBetween: 16,
        slidesPerView: 1.06,
        grabCursor: true,
        watchOverflow: true,
        keyboard: {
            enabled: true,
        },
        a11y: {
            enabled: true,
        },
        pagination: {
            el: carousel.querySelector(".swiper-pagination"),
            clickable: true,
        },
        navigation: {
            prevEl: carousel.querySelector(".js-carousel-prev"),
            nextEl: carousel.querySelector(".js-carousel-next"),
        },
        breakpoints: {
            600: {
                slidesPerView: 1.55,
                spaceBetween: 18,
            },
            860: {
                slidesPerView: 2.25,
                spaceBetween: 20,
            },
            1160: {
                slidesPerView: 3,
                spaceBetween: 22,
            },
        },
    });
}
