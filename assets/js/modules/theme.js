const STORAGE_KEY = "juliane-theme";

const THEMES = {
    LIGHT: "light",
    DARK: "dark",
};

function getStoredTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // O tema continua funcionando mesmo sem acesso ao localStorage.
    }
}

function getPreferredTheme() {
    const storedTheme = getStoredTheme();

    if (storedTheme === THEMES.DARK || storedTheme === THEMES.LIGHT) {
        return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEMES.DARK
        : THEMES.LIGHT;
}

function getCurrentTheme() {
    return document.documentElement.dataset.theme || THEMES.LIGHT;
}

function updateThemeControl(button, theme) {
    const isDark = theme === THEMES.DARK;
    const icon = button.querySelector("i");
    const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";

    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
    button.setAttribute("aria-pressed", String(isDark));

    if (icon) {
        icon.className = isDark ? "ri-sun-line" : "ri-moon-line";
    }
}

function updateBrowserThemeColor(theme) {
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    if (!metaTheme) {
        return;
    }

    metaTheme.setAttribute(
        "content",
        theme === THEMES.DARK ? "#191416" : "#fbf7f8",
    );
}

function applyTheme(button, theme, persist = false) {
    document.documentElement.dataset.theme = theme;

    updateThemeControl(button, theme);
    updateBrowserThemeColor(theme);

    if (persist) {
        saveTheme(theme);
    }
}

export function initTheme() {
    const button = document.querySelector(".js-theme-toggle");

    if (!button) {
        return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme = getPreferredTheme();

    applyTheme(button, initialTheme);

    button.addEventListener("click", () => {
        const currentTheme = getCurrentTheme();
        const nextTheme = currentTheme === THEMES.DARK
            ? THEMES.LIGHT
            : THEMES.DARK;

        applyTheme(button, nextTheme, true);
    });

    mediaQuery.addEventListener("change", (event) => {
        if (getStoredTheme()) {
            return;
        }

        applyTheme(
            button,
            event.matches ? THEMES.DARK : THEMES.LIGHT,
        );
    });
}
