document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const nightModeToggle = document.querySelector('#nightModeToggle');
    const body = document.body;

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                duration: 0.3,
                scale: 1.1,
                color: '#B5C18E',
                ease: 'power2.out'
            });
            link.classList.add('hovered');
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                duration: 0.3,
                scale: 1,
                color: '#78866B',
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
    const images = document.querySelectorAll('.main-section img');

    images.forEach(image => {
        let isPhaseThree = false;

        // Initial animation on scroll into view
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


    // Smooth scroll to the calculator
    const calculatorBtn = document.querySelector('.cta-container .btn-secondary');
    calculatorBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#calculator').scrollIntoView({
            behavior: 'smooth'
        });
    });


    //CALCULATOR FOR NOW
    let resultsChart;

    function createChart(labels, pessimistic, realistic, optimistic) {
        const ctx = document.getElementById('resultsChart').getContext('2d');

        if (resultsChart) {
            resultsChart.destroy();
        }

        resultsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, // Use dynamically generated labels
                datasets: [
                    {
                        label: 'Pessimistic',
                        data: pessimistic,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false
                    },
                    {
                        label: 'Realistic',
                        data: realistic,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: false
                    },
                    {
                        label: 'Optimistic',
                        data: optimistic,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false
                    }
                ]
            },
            options: {
                animation: {
                    duration: 1250, // 2 seconds
                    easing: 'easeInOutQuint'
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Outcome'
                        }
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
        });
    }

    window.calculate = function() {
        const goal = document.getElementById('goal').value;
        const time = parseInt(document.getElementById('time').value, 10);
        const cost = document.getElementById('cost').value;
        const periodicity = document.getElementById('periodicity').value;
        const strategy = document.getElementById('strategy').value;

        // Generate years based on selected time range
        const startYear = new Date().getFullYear();
        const years = Array.from({length: time}, (v, i) => startYear + i);

        // Mock calculation logic (replace with actual logic)
        const pessimistic = years.map(() => Math.random() * 100);
        const realistic = years.map(() => Math.random() * 100 + 50);
        const optimistic = years.map(() => Math.random() * 100 + 100);

        // Create or update the chart
        createChart(years, pessimistic, realistic, optimistic);

        // Feedback text based on selection (customize as needed)
        const feedback = `Based on your selected goal of ${goal}, with a ${time} year timeline, ${cost} cost, and ${strategy} strategy, the estimated outcomes are displayed in the graph above.`;
        document.getElementById('feedback').innerText = feedback;

    };

    //CUSTOMER CARDS
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const customerCardsWrapper = document.querySelector('.customer-cards-wrapper');

    const scrollAmount = 300; // Adjust this value based on the desired scroll distance

    leftArrow.addEventListener('click', () => {
        customerCardsWrapper.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        customerCardsWrapper.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // GSAP animations for hover effects
    const customerCards = document.querySelectorAll('.customer-card');

    customerCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            gsap.to(card, { scale: 1.1, duration: 0.3 });
        });

        card.addEventListener('mouseout', () => {
            gsap.to(card, { scale: 1, duration: 0.3 });
        });
    });

    // CTA button click event
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        window.location.href = '#'; // Replace with your actual meeting setup link
    });

    // GSAP animations for the benefits section
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('#benefits', {
        opacity: 0,
        duration: 1,
        y: 50,
        scrollTrigger: {
            trigger: '#benefits',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('#benefits h2', {
        opacity: 0,
        duration: 1,
        y: -30,
        delay: 0.2,
        scrollTrigger: {
            trigger: '#benefits',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('#benefits p', {
        opacity: 0,
        duration: 1,
        y: 30,
        delay: 0.4,
        scrollTrigger: {
            trigger: '#benefits',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('.cta-section', {
        opacity: 0,
        duration: 1,
        scale: 0.8,
        delay: 0.6,
        scrollTrigger: {
            trigger: '#benefits',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.to('.cta-button', {
        scale: 1.05,
        duration: 0.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
            trigger: '.cta-button',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    const icons = document.querySelectorAll('.icon img');
    icons.forEach(icon => {
        gsap.from(icon, {
            opacity: 0,
            duration: 1,
            y: -20,
            ease: 'bounce.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: icon,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });


    //SERVICES

    // Title hover animation using GSAP
    const titles = document.querySelectorAll('.services-section h2, .services-section h1');

    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            gsap.to(title, {
                duration: 0.3,
                color: '#78866B',
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        title.addEventListener('mouseleave', () => {
            gsap.to(title, {
                duration: 0.3,
                color: '#333',
                scale: 1,
                ease: 'power2.out'
            });
        });
    });



});
