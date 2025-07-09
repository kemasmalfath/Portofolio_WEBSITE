document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar & Burger Menu ---
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links li');
        const navbar = document.querySelector('.navbar');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            // Burger Animation
            burger.classList.toggle('toggle');

            // Animate Links
            navItems.forEach((item, index) => {
                if (item.style.animation) {
                    item.style.animation = '';
                } else {
                    item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close nav when a link is clicked
        navItems.forEach(item => {
            item.querySelector('a').addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navItems.forEach(link => link.style.animation = '');
            });
        });

        // Change navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Adjust scroll threshold as needed
                navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.98)';
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    };

    // --- Active Nav Link on Scroll ---
    const highlightNavLink = () => {
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('.nav-item');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbar.offsetHeight - 20; // Adjust for fixed nav
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    };

    // --- Typing Effect for Tagline ---
    const typingEffect = () => {
        const typingTextElement = document.querySelector('.typing-text');
        const phrases = ["Pengembang Web", "Desainer UI/UX", "Kreator Konten", "Pecinta Teknologi"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            const displayText = isDeleting
                ? currentPhrase.substring(0, charIndex--)
                : currentPhrase.substring(0, charIndex++);

            typingTextElement.textContent = displayText;

            let typeSpeed = 150; // Typing speed

            if (isDeleting) {
                typeSpeed /= 2; // Deleting faster
            }

            if (!isDeleting && charIndex === currentPhrase.length + 1) {
                typeSpeed = 1500; // Pause at end of phrase
                isDeleting = true;
            } else if (isDeleting && charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length; // Next phrase
                typeSpeed = 300; // Pause before typing next phrase
            }

            setTimeout(type, typeSpeed);
        };

        if (typingTextElement) {
            type();
        }
    };

    // --- Fade-in on Scroll Animation ---
    const fadeInOnScroll = () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        const options = {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: "0px 0px -100px 0px" // Trigger slightly earlier
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target.id === 'experience') {
                        // Animate timeline items individually
                        const timelineItems = entry.target.querySelectorAll('.timeline-item');
                        timelineItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('active');
                            }, index * 200); // Stagger animation
                        });
                    }
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, options);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    };

    // --- Testimonials Slider ---
    const testimonialsSlider = () => {
        const slider = document.querySelector('.testimonials-slider');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const items = document.querySelectorAll('.testimonial-item');
        let currentIndex = 0;

        const showItem = (index) => {
            if (index < 0) {
                currentIndex = items.length - 1;
            } else if (index >= items.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            slider.style.transform = `translateX(${-currentIndex * 100}%)`;
        };

        prevBtn.addEventListener('click', () => {
            showItem(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            showItem(currentIndex + 1);
        });

        // Optional: Auto-slide
        let slideInterval = setInterval(() => {
            showItem(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds

        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                showItem(currentIndex + 1);
            }, 5000);
        });
    };

    // --- Contact Form Submission ---
    const handleContactFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        const form = event.target;
        const name = form.elements['name'].value.trim();
        const email = form.elements['email'].value.trim();
        const subject = form.elements['subject'].value.trim();
        const message = form.elements['message'].value.trim();
        const formMessages = document.getElementById('form-messages');

        // Basic client-side validation
        if (!name || !email || !subject || !message) {
            formMessages.textContent = 'Harap isi semua kolom yang wajib diisi.';
            formMessages.classList.remove('success');
            formMessages.classList.add('error');
            formMessages.style.display = 'block';
            return;
        }

        if (!validateEmail(email)) {
            formMessages.textContent = 'Alamat email tidak valid.';
            formMessages.classList.remove('success');
            formMessages.classList.add('error');
            formMessages.style.display = 'block';
            return;
        }

        // Simulate sending data to a backend (replace with actual fetch() or XMLHttpRequest)
        console.log('Sending message:', { name, email, subject, message });

        // Simulate API call success/failure
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% chance of success

            if (success) {
                formMessages.textContent = 'Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.';
                formMessages.classList.remove('error');
                formMessages.classList.add('success');
                formMessages.style.display = 'block';
                form.reset(); // Clear form on success
            } else {
                formMessages.textContent = 'Terjadi kesalahan saat mengirim pesan. Mohon coba lagi nanti.';
                formMessages.classList.remove('success');
                formMessages.classList.add('error');
                formMessages.style.display = 'block';
            }

            // Hide message after a few seconds
            setTimeout(() => {
                formMessages.style.display = 'none';
            }, 7000);
        }, 1500); // Simulate network delay
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // --- Back to Top Button ---
    const backToTopButton = () => {
        const button = document.querySelector('.back-to-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });

        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // --- Set Current Year in Footer ---
    const setCurrentYear = () => {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    // --- Initialize all functions ---
    navSlide();
    highlightNavLink();
    typingEffect();
    fadeInOnScroll();
    testimonialsSlider();
    setCurrentYear();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});