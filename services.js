document.querySelectorAll('.service-box').forEach(serviceBox => {
    const imageWrapper = serviceBox.querySelector('.service-image-wrapper');
    const description = serviceBox.querySelector('.service-description');

    imageWrapper.addEventListener('mouseenter', () => {
        gsap.to(imageWrapper, {
            rotationY: 180,
            duration: 0.8,
            ease: 'power2.out'
        });
        gsap.to(description, {
            opacity: 1,
            duration: 0.5,
            delay: 0.3,
            ease: 'power2.out'
        });
    });

    imageWrapper.addEventListener('mouseleave', () => {
        gsap.to(imageWrapper, {
            rotationY: 0,
            duration: 0.8,
            ease: 'power2.in'
        });
        gsap.to(description, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        });
    });
});
