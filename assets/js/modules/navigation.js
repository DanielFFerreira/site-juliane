const OPEN_CLASS = "is-open";
const BODY_OPEN_CLASS = "is-menu-open";

function updateToggleIcon(toggle, isOpen) {
    const icon = toggle.querySelector("i");

    if (!icon) {
        return;
    }

    icon.className = isOpen ? "ri-close-line" : "ri-menu-3-line";
}

export function initNavigation() {
    const toggle = document.querySelector(".js-nav-toggle");
    const navigation = document.querySelector(".js-site-nav");

    if (!toggle || !navigation) {
        return;
    }

    const closeNavigation = () => {
        navigation.classList.remove(OPEN_CLASS);
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        document.body.classList.remove(BODY_OPEN_CLASS);
        updateToggleIcon(toggle, false);
    };

    const openNavigation = () => {
        navigation.classList.add(OPEN_CLASS);
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Fechar menu");
        document.body.classList.add(BODY_OPEN_CLASS);
        updateToggleIcon(toggle, true);
    };

    toggle.addEventListener("click", () => {
        const isOpen = navigation.classList.contains(OPEN_CLASS);
        isOpen ? closeNavigation() : openNavigation();
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
        }
    });
}
