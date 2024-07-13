document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Animations for contact info
    gsap.from(".contact-info", {
        scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%", // start the animation when .contact-info is 80% from the top of the viewport
            end: "bottom 20%", // end the animation when .contact-info is 20% from the bottom of the viewport
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1.out"
    });

    // Animations for contact form
    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1.out"
    });

    // Animations for Calendly widget
    gsap.from(".calendly-inline-widget", {
        scrollTrigger: {
            trigger: ".calendly-inline-widget",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1.out"
    });

    // Animations for consultation text
    gsap.from(".calendly-inline-widget + div", {
        scrollTrigger: {
            trigger: ".calendly-inline-widget + div",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1.out"
    });

    // GSAP hover animations
    const contactText = document.querySelectorAll('.contact-info p, .contact-info p a');

    contactText.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.1,
                color: "var(--main-color)",
                duration: 0.3,
                ease: "power1.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                color: "var(--dark-text-color)",
                duration: 0.3,
                ease: "power1.out"
            });
        });
    });
});
