export function initLetterChapters() {
    const root = document.querySelector("[data-letter-chapters]");
    if (!root) return;
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    const previous = root.querySelector("[data-letter-previous]");
    const next = root.querySelector("[data-letter-next]");
    const current = root.querySelector("[data-letter-current]");
    let activeIndex = 0;

    const select = (index, focus = false) => {
        if (index < 0 || index >= tabs.length) return;
        activeIndex = index;
        tabs.forEach((tab, i) => {
            const active = i === index;
            tab.classList.toggle("is-active", active);
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
        });
        panels.forEach((panel, i) => {
            panel.hidden = i !== index;
            panel.classList.toggle("is-active", i === index);
        });
        current.textContent = String(index + 1).padStart(2, "0");
        previous.disabled = index === 0;
        next.disabled = index === tabs.length - 1;
        if (focus) tabs[index].focus();
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => select(index));
        tab.addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            if (event.key === "Home") return select(0, true);
            if (event.key === "End") return select(tabs.length - 1, true);
            const step = event.key === "ArrowRight" ? 1 : -1;
            select((activeIndex + step + tabs.length) % tabs.length, true);
        });
    });
    previous.addEventListener("click", () => select(activeIndex - 1));
    next.addEventListener("click", () => select(activeIndex + 1));
}
