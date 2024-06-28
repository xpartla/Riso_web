document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                duration: 0.3,
                scale: 1.1,
                color: '#007bff',
                ease: 'power2.out'
            });
            link.classList.add('hovered');
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                duration: 0.3,
                scale: 1,
                color: '#000',
                ease: 'power2.out'
            });
            link.classList.remove('hovered');
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });

    document.getElementById('nightModeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});
