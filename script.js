document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const nightModeToggle = document.querySelector('#nightModeToggle');
    const body = document.body;

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

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('shrink', window.scrollY > 50);
    });

    const dropdownToggle = document.querySelector('#languageDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isVisible = dropdownMenu.style.display === 'block';

        gsap.to(dropdownMenu, {
            duration: 0.5,
            opacity: isVisible ? 0 : 1,
            y: isVisible ? -10 : 0,
            onComplete: () => {
                dropdownMenu.style.display = isVisible ? 'none' : 'block';
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            gsap.to(dropdownMenu, {
                duration: 0.5,
                opacity: 0,
                y: -10,
                onComplete: () => {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    });

    // Toggle night mode
    nightModeToggle.addEventListener('change', () => {
        gsap.to(body, {
            duration: 0.5,
            backgroundColor: nightModeToggle.checked ? '#2c2c2c' : '#fff',
            color: nightModeToggle.checked ? '#f0f0f0' : '#000',
            onComplete: () => {
                body.classList.toggle('night-mode', nightModeToggle.checked);
            }
        });
    });

    // Modern text rotation
    class TxtRotate {
        constructor(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.isDeleting = false;
            this.tick();
        }

        tick() {
            const i = this.loopNum % this.toRotate.length;
            const fullTxt = this.toRotate[i];

            this.txt = this.isDeleting
                ? fullTxt.substring(0, this.txt.length - 1)
                : fullTxt.substring(0, this.txt.length + 1);

            this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

            let delta = 300 - Math.random() * 100;
            if (this.isDeleting) delta /= 2;

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(() => this.tick(), delta);
        }
    }

    window.onload = () => {
        const elements = document.querySelectorAll('.txt-rotate');
        elements.forEach(el => {
            const toRotate = el.getAttribute('data-rotate');
            const period = el.getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(el, JSON.parse(toRotate), period);
            }
        });

        const css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    };

    // Image animation using GSAP
    const image = document.querySelector('.main-section img');
    let isPhaseThree = false;
    gsap.from(image, {
        scrollTrigger: {
            trigger: image,
            start: "top 80%",  // Starts animation when the top of the image hits 80% of the viewport height
            toggleActions: "play none none none"
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power2.out'
    });

    function getClipPath() {
        if (window.matchMedia("(max-width: 992px)").matches) {
            return {
                phase1: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                phase2: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                phase3: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            };
        } else {
            return {
                phase1: 'polygon(25% 0%, 99% 0%, 75% 100%, 1% 100%)',
                phase2: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                phase3: 'polygon(0% 0%, 75% 0%, 99% 100%, 25% 100%)'
            };
        }
    }

    image.addEventListener('mouseenter', () => {
        gsap.to(image, {
            duration: 0.5,
            clipPath: getClipPath().phase2,
            ease: 'power2.out'
        });
    });

    image.addEventListener('mouseleave', () => {
        gsap.to(image, {
            duration: 0.5,
            clipPath: isPhaseThree ? getClipPath().phase1 : getClipPath().phase3,
            ease: 'power2.out',
            onComplete: () => {
                isPhaseThree = !isPhaseThree;
            }
        });
    });

    window.addEventListener('resize', () => {
        gsap.set(image, { clipPath: getClipPath().phase1 });
        isPhaseThree = false;
    });

});
