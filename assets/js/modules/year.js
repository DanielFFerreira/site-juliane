export function setCurrentYear() {
    const year = document.querySelector(".js-current-year");

    if (!year) {
        return;
    }

    year.textContent = new Date().getFullYear();
}
