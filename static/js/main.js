import { initTheme } from './modules/theme.js';
import { initMenu } from './modules/menu.js';
import { initProjectsCarousel } from './modules/projects.js';
import { initReveal } from './modules/effects.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMenu();
    initProjectsCarousel();
    initReveal();
});