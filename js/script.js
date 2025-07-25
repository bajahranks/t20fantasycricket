document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.hero-logo', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });
    gsap.from('.hero h1', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.2 });
    gsap.from('.hero p', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.4 });
    gsap.from('.hero-screenshot', { duration: 1, scale: 0.9, opacity: 0, ease: 'power3.out', delay: 0.6 });

    // Scroll-triggered Animations
    const sections = gsap.utils.toArray('section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Slideshow Animation
    const screenshots = gsap.utils.toArray('.slideshow-container .screenshot');
    const numScreenshots = screenshots.length;
    let currentIndex = 0;

    // Set initial positions and classes
    gsap.set(screenshots, {
        xPercent: (i) => (i - currentIndex) * 100 + 50, // Position slides horizontally
        x: '-50%', // Center the slide itself
        scale: 0.8,
        filter: 'blur(5px)'
    });

    gsap.set(screenshots[currentIndex], { 
        scale: 1, 
        filter: 'blur(0px)',
        zIndex: 10
    });

    function showSlide(index) {
        const lastIndex = currentIndex;
        currentIndex = (index + numScreenshots) % numScreenshots;

        const distance = currentIndex - lastIndex;

        // Animate all slides to their new positions
        gsap.to(screenshots, {
            xPercent: `+=${-distance * 100}`,
            duration: 1,
            ease: 'power3.inOut'
        });

        // Animate active/inactive states
        gsap.to(screenshots[currentIndex], {
            scale: 1,
            filter: 'blur(0px)',
            zIndex: 10,
            duration: 0.7,
            ease: 'power3.inOut'
        });

        gsap.to(screenshots[lastIndex], {
            scale: 0.8,
            filter: 'blur(5px)',
            zIndex: 1,
            duration: 0.7,
            ease: 'power3.inOut'
        });
    }

    // Auto-play the slideshow
    gsap.delayedCall(3, () => {
        gsap.ticker.add(autoPlay);
    });

    let lastTime = 0;
    function autoPlay(time) {
        if (time - lastTime > 3) { // Change slide every 3 seconds
            showSlide(currentIndex + 1);
            lastTime = time;
        }
    }
});
