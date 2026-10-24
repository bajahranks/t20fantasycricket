document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-current-year]').forEach((element) => {
        element.textContent = new Date().getFullYear().toString();
    });

    const header = document.querySelector('[data-header]');
    const menuButton = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');

    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const closeMenu = () => {
        menuButton?.setAttribute('aria-expanded', 'false');
        menuButton?.setAttribute('aria-label', 'Open menu');
        nav?.classList.remove('open');
        document.body.classList.remove('menu-open');
    };

    menuButton?.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
        nav?.classList.toggle('open', !isOpen);
        document.body.classList.toggle('menu-open', !isOpen);
    });

    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    const revealItems = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
});
