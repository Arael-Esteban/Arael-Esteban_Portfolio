export function initTheme() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const icon = button.querySelector('i');
    const root = document.documentElement;

    function apply(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
        icon.className = theme === 'light' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        try {
            localStorage.setItem('theme', theme);
        } catch (e) { }
    }

    apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    button.addEventListener('click', () => {
        apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
}
