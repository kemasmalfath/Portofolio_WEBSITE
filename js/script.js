document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar & Burger Menu ---
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links li');
        const navbar = document.querySelector('.navbar');
        const heroSection = document.getElementById('hero'); // Added for dynamic hero height
        const heroHeight = heroSection ? heroSection.offsetHeight : 0; // Get hero height dynamically

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
            // Use the 'scrolled' class in CSS for styling, more maintainable
            if (window.scrollY > heroHeight / 2) { // Use dynamic hero height for threshold
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    };

    // --- Active Nav Link on Scroll and Fade-in Animation ---
    // Consolidated this from separate functions for better performance with IntersectionObserver
    const setupScrollAnimationsAndNavHighlight = () => {
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('.nav-item');
        const navbar = document.querySelector('.navbar'); // Get navbar reference for offset

        const observerOptions = {
            root: null,
            // Adjust rootMargin based on navbar height to activate sections correctly
            // Example: `-${navbar.offsetHeight + 10}px 0px -20% 0px`
            // This pulls the activation point up by navbar height + some extra, and allows bottom 20% to be off screen
            rootMargin: `-${navbar.offsetHeight + 10}px 0px -20% 0px`,
            threshold: 0 // Activate as soon as any part of the element enters
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const targetId = entry.target.getAttribute('id');

                if (entry.isIntersecting) {
                    // Add 'active' class for general section fade-in
                    entry.target.classList.add('active');

                    // Highlight active navigation link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${targetId}`) {
                            link.classList.add('active');
                        }
                    });

                    // Animate timeline items for 'experience' and 'education' sections
                    if (targetId === 'experience' || targetId === 'education') {
                        const timelineItems = entry.target.querySelectorAll('.timeline-item');
                        timelineItems.forEach((item, index) => {
                            // Only animate if not already active to prevent re-animation on scroll up/down
                            if (!item.classList.contains('active')) {
                                setTimeout(() => {
                                    item.classList.add('active');
                                }, index * 200); // Stagger animation
                            }
                        });
                    }

                    // Stop observing once animated if you only want it to animate once
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: remove 'active' class when section exits view, if you want re-animation
                    // entry.target.classList.remove('active');
                    // navLinks.forEach(link => {
                    //     if (link.getAttribute('href') === `#${targetId}`) {
                    //         link.classList.remove('active');
                    //     }
                    // });
                }
            });
        }, observerOptions);

        sections.forEach(element => {
            observer.observe(element);
        });
    };

    // --- Typing Effect for Tagline ---
    const typingEffect = () => {
        const typingTextElement = document.querySelector('.typing-text');
        const phrases = ["Pengembang Web", "Desainer UI/UX", "Public Speaker", "Pecinta Teknologi"];
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
        // --- IMPORTANT: Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual Formspree endpoint URL ---
        // Example: https://formspree.io/f/your_unique_hash
        const formspreeEndpoint = 'https://formspree.io/f/your_unique_hash'; 
        
        const formData = new FormData(form);
        
        fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formMessages.textContent = 'Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.';
                formMessages.classList.remove('error');
                formMessages.classList.add('success');
                form.reset(); // Clear form on success
            } else {
                return response.json().then(data => {
                    if (data.errors) {
                        formMessages.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        formMessages.textContent = 'Terjadi kesalahan saat mengirim pesan. Mohon coba lagi.';
                    }
                    formMessages.classList.remove('success');
                    formMessages.classList.add('error');
                });
            }
        })
        .catch(error => {
            formMessages.textContent = 'Gagal terhubung ke server. Periksa koneksi internet Anda.';
            formMessages.classList.remove('success');
            formMessages.classList.add('error');
        })
        .finally(() => {
            formMessages.style.display = 'block'; // Ensure messages are shown
            setTimeout(() => {
                formMessages.style.display = 'none'; // Hide message after a few seconds
            }, 7000);
        });
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
    typingEffect();
    setupScrollAnimationsAndNavHighlight(); // This replaces highlightNavLink and fadeInOnScroll
    backToTopButton();
    setCurrentYear();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Removed the testimonialsSlider() call as the section is no longer in HTML
    // testimonialsSlider();
});