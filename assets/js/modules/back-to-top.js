export function initBackToTop() {
    const button = document.querySelector(".js-back-to-top");

    if (!button) {
        return;
    }

    button.addEventListener("click", (event) => {
        event.preventDefault();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });

        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    });
}
