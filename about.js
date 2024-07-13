document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-question i');
            const isVisible = answer.style.display === 'block';

            gsap.to(answer, {
                height: isVisible ? 0 : 'auto',
                display: isVisible ? 'none' : 'block',
                duration: 0.3
            });

            gsap.to(icon, {
                rotate: isVisible ? 0 : 180,
                duration: 0.3
            });
        });
    });

    const image = document.querySelector('.about-section img');
    const hoverContent = document.querySelector('.hover-content');
    const hoverHint = document.querySelector('.hover-hint');

    gsap.from(image, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });

    image.addEventListener('mouseenter', () => {
        gsap.to(image, {
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.out'
        });
        gsap.to(hoverContent, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        gsap.to(hoverHint, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    image.addEventListener('mouseleave', () => {
        gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
        gsap.to(hoverContent, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.out'
        });
        gsap.to(hoverHint, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});
