export function initHeader() {
    const header = document.querySelector(".js-site-header");

    if (!header) {
        return;
    }

    const updateHeaderState = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
}
