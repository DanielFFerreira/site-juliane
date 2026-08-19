import { initHeader } from "./modules/header.js";
import { initNavigation } from "./modules/navigation.js";
import { initReveal } from "./modules/reveal.js";
import { initMomentsCarousel } from "./modules/carousel.js";
import { setCurrentYear } from "./modules/year.js";
import { initTheme } from "./modules/theme.js";
import { initJulianeGallery } from "./modules/gallery.js";
import { initCookingAccordion } from "./modules/cooking-accordion.js";

function initPage() {
    initTheme();
    initHeader();
    initNavigation();
    initReveal();
    initMomentsCarousel();
    initJulianeGallery();
    initCookingAccordion();
    setCurrentYear();
}

initPage();
