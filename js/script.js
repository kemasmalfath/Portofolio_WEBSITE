/* ========================================
   MODERN TECH PORTFOLIO 2026
   JavaScript — Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. DARK MODE TOGGLE
    // =========================================
    const initTheme = () => {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            html.setAttribute('data-theme', 'dark');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    };

    // =========================================
    // 2. NAVBAR BEHAVIOR
    // =========================================
    const initNavbar = () => {
        const navbar = document.getElementById('navbar');
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const allNavLinks = document.querySelectorAll('.navbar__link');

        // Scroll effect — add glassmorphism after scrolling
        let lastScrollY = 0;
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on load

        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when link is clicked
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };

    // =========================================
    // 3. ACTIVE NAV LINK HIGHLIGHT
    // =========================================
    const initNavHighlight = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar__link');

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${targetId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    };

    // =========================================
    // 4. TYPING EFFECT
    // =========================================
    const initTypingEffect = () => {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;

        const phrases = [
            'Python Developer',
            'Data Science Enthusiast',
            'Machine Learning Learner',
            'JavaScript Web Developer',
            'Security Analyst'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                speed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 400; // Pause before next phrase
            }

            setTimeout(type, speed);
        };

        // Start after a short delay
        setTimeout(type, 1200);
    };

    // =========================================
    // 5. SCROLL REVEAL ANIMATIONS
    // =========================================
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Don't unobserve — keep it persistent
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    };

    // =========================================
    // 6. SMOOTH SCROLL WITH OFFSET
    // =========================================
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // =========================================
    // 7. CONTACT FORM
    // =========================================
    const initContactForm = () => {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.elements['name'].value.trim();
            const email = form.elements['email'].value.trim();
            const message = form.elements['message'].value.trim();
            const formMessages = document.getElementById('formMessages');

            // Validation
            if (!name || !email || !message) {
                showFormMessage(formMessages, 'Harap isi semua kolom yang wajib diisi.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage(formMessages, 'Alamat email tidak valid.', 'error');
                return;
            }

            // Formspree submission
            const formspreeEndpoint = 'https://formspree.io/f/your_unique_hash';
            const formData = new FormData(form);

            fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    showFormMessage(formMessages, 'Pesan berhasil terkirim! Terima kasih.', 'success');
                    form.reset();
                } else {
                    showFormMessage(formMessages, 'Terjadi kesalahan. Silakan coba lagi.', 'error');
                }
            })
            .catch(() => {
                showFormMessage(formMessages, 'Gagal terhubung ke server. Periksa koneksi internet Anda.', 'error');
            });
        });
    };

    const showFormMessage = (element, message, type) => {
        element.textContent = message;
        element.className = `form-messages ${type}`;
        element.style.display = 'block';

        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // =========================================
    // 8. BACK TO TOP
    // =========================================
    const initBackToTop = () => {
        const button = document.getElementById('backToTop');
        if (!button) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        }, { passive: true });

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // =========================================
    // 9. CURRENT YEAR
    // =========================================
    const initCurrentYear = () => {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    };

    // =========================================
    // 10. PROJECT FILTERS
    // =========================================
    const initProjectFilters = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.portfolio-item');
        if (!filterButtons.length) return;
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                projectCards.forEach(card => {
                    const category = card.dataset.category || 'all';
                    if (filter === 'all' || filter === category) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    };

    // =========================================
    // INITIALIZE ALL
    // =========================================
    initTheme();
    initNavbar();
    initNavHighlight();
    initTypingEffect();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
    initBackToTop();
    initCurrentYear();
    initProjectFilters();
});