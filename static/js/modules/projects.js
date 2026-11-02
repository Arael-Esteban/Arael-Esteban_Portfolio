export function initProjectsCarousel() {
    const track = document.querySelector('.projects-track');
    const dots = document.querySelectorAll('.projects-dot');
    const viewport = document.querySelector('.projects-viewport');

    if (!track || !viewport || track.children.length === 0) return;

    const originalChildren = Array.from(track.children);
    const totalOriginal = originalChildren.length;

    const cardsVisible = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cards-visible')) || 3;

    originalChildren.forEach(child => track.appendChild(child.cloneNode(true)));
    originalChildren.map(child => child.cloneNode(true)).reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

    let currentIndex = totalOriginal;
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let autoPlayInterval;
    const delay = 4000;

    function getMetrics() {
        const cardWidth = track.children[0].getBoundingClientRect().width;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        return cardWidth + gap;
    }

    function setTransform(position, animate = true) {
        track.style.transition = animate ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(${-position}px)`;
        currentTranslate = position;
    }

    function updateCarousel(animate = true) {
        const step = getMetrics();
        setTransform(currentIndex * step, animate);

        if (dots.length) {
            const activeDotIndex = (currentIndex - totalOriginal + totalOriginal) % totalOriginal;
            dots.forEach((dot, index) => dot.classList.toggle('is-active', index === activeDotIndex));
        }
    }

    function handleTransitionEnd() {
        if (currentIndex >= totalOriginal * 2) {
            currentIndex = totalOriginal;
            updateCarousel(false);
        } else if (currentIndex < totalOriginal) {
            currentIndex = totalOriginal * 2 - 1;
            updateCarousel(false);
        }
    }

    function getPageX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    }

    function handleDragStart(e) {
        isDragging = true;
        startX = getPageX(e);
        stopAutoPlay();
        track.style.transition = 'none';

        if (e.type.includes('mouse')) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
        } else {
            window.addEventListener('touchmove', handleDragMove, { passive: false });
            window.addEventListener('touchend', handleDragEnd);
        }
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        if (e.cancelable) e.preventDefault();

        const currentX = getPageX(e);
        const diff = currentX - startX;
        const step = getMetrics();
        const baseTranslate = currentIndex * step;

        track.style.transform = `translateX(${-baseTranslate + diff}px)`;
    }

    function handleDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);

        let endX = startX;
        if (e.type.includes('mouse')) {
            endX = e.pageX;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            endX = e.changedTouches[0].pageX;
        }

        const diff = endX - startX;
        const step = getMetrics();

        if (diff < -50) {
            currentIndex++;
        } else if (diff > 50) {
            currentIndex--;
        }

        updateCarousel(true);
        startAutoPlay();
    }

    viewport.addEventListener('mousedown', handleDragStart);
    viewport.addEventListener('touchstart', handleDragStart, { passive: false });
    track.addEventListener('transitionend', handleTransitionEnd);

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            updateCarousel(true);
        }, delay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = totalOriginal + index;
                updateCarousel(true);
                startAutoPlay();
            });
        });
    }

    viewport.addEventListener('mouseenter', stopAutoPlay);
    viewport.addEventListener('mouseleave', startAutoPlay);

    window.addEventListener('resize', () => {
        updateCarousel(false);
    });

    updateCarousel(false);
    startAutoPlay();
}
