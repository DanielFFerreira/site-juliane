const OPEN_CLASS = "is-open";
const BODY_OPEN_CLASS = "is-menu-open";
const MOBILE_BREAKPOINT = 780;

function updateToggleIcon(toggle, isOpen) {
    const icon = toggle.querySelector("i");

    if (icon) {
        icon.className = isOpen ? "ri-close-line" : "ri-menu-3-line";
    }
}

export function initNavigation() {
    const toggle = document.querySelector(".js-nav-toggle");
    const navigation = document.querySelector(".js-site-nav");

    if (!toggle || !navigation) return;

    const links = [...navigation.querySelectorAll("a")];

    const closeNavigation = ({ restoreFocus = false } = {}) => {
        const wasOpen = navigation.classList.contains(OPEN_CLASS);

        navigation.classList.remove(OPEN_CLASS);
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        document.body.classList.remove(BODY_OPEN_CLASS);
        updateToggleIcon(toggle, false);

        if (wasOpen && restoreFocus) toggle.focus();
    };

    const openNavigation = () => {
        navigation.classList.add(OPEN_CLASS);
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Fechar menu");
        document.body.classList.add(BODY_OPEN_CLASS);
        updateToggleIcon(toggle, true);
        links[0]?.focus({ preventScroll: true });
    };

    toggle.addEventListener("click", () => {
        navigation.classList.contains(OPEN_CLASS)
            ? closeNavigation({ restoreFocus: true })
            : openNavigation();
    });

    links.forEach((link) => {
        link.addEventListener("click", () => closeNavigation());
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation.classList.contains(OPEN_CLASS)) {
            closeNavigation({ restoreFocus: true });
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > MOBILE_BREAKPOINT) closeNavigation();
    });
}