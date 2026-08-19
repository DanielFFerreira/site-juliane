export function initCookingAccordion() {
    const accordion = document.querySelector("[data-cooking-accordion]");

    if (!accordion) {
        return;
    }

    const items = accordion.querySelectorAll(".cooking__photo");

    items.forEach((item) => {
        item.addEventListener("click", () => {
            items.forEach((candidate) => {
                const isActive = candidate === item;

                candidate.classList.toggle("is-active", isActive);
                candidate.setAttribute("aria-pressed", String(isActive));
            });
        });
    });
}
