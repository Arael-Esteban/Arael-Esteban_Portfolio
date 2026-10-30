(function () {
    'use strict';

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const typedEl = document.querySelector('.typed-text');
    const phrases = [
        'Desarrollador Full-Stack Junior',
        'Backend con Python y Flask',
        'Frontend con HTML, CSS y JS',
        'Apasionado por el código limpio'
    ];

    if (typedEl) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            typedEl.textContent = phrases[0];
        } else {
            const type = () => {
                const current = phrases[phraseIndex];
                const speed = isDeleting ? 40 : 80;
                typedEl.textContent = current.substring(0, charIndex);

                if (!isDeleting && charIndex < current.length) {
                    charIndex++;
                    setTimeout(type, speed);
                } else if (isDeleting && charIndex > 0) {
                    charIndex--;
                    setTimeout(type, speed);
                } else if (!isDeleting && charIndex === current.length) {
                    isDeleting = true;
                    setTimeout(type, 1800);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 400);
                }
            };
            setTimeout(type, 600);
        }
    }

    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        const toggleScrollTop = () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', toggleScrollTop, { passive: true });
        toggleScrollTop();
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
            );
            revealEls.forEach((el) => observer.observe(el));
        } else {
            revealEls.forEach((el) => el.classList.add('active'));
        }
    }
})();