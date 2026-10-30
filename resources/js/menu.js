(function () {
    'use strict';

    const header = document.getElementById('header');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    const closeMenu = () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
        menu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    };

    const openMenu = () => {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Cerrar menú');
        menu.classList.add('is-open');
        document.body.classList.add('no-scroll');
    };

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    });

    links.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (e) => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        if (!isOpen) return;
        if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });

    const onScroll = () => {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();