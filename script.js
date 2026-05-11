// ==========================================================================
// PAGE LOADER
// ==========================================================================
window.onload = () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-section .fade-up');
    heroElements.forEach(el => el.classList.add('visible'));
};

// ==========================================================================
// SMOOTH SCROLL & ACTIVE LINKS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const hamburger = document.getElementById('hamburger');
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    hamburger.classList.remove('active');
                }

                // Smooth scroll
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Active Nav Links & FadeUp Animations
    const sections = document.querySelectorAll('section');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-item');
    const fadeElements = document.querySelectorAll('.fade-up:not(.hero-section .fade-up)');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Active Nav Link Update
                const id = entry.target.getAttribute('id');
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Trigger animations within the section
                const sectionFades = entry.target.querySelectorAll('.fade-up');
                sectionFades.forEach(el => el.classList.add('visible'));
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Separate observer for scattered fade elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
});

// ==========================================================================
// NAVBAR SCROLL SHADOW
// ==========================================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') && 
        !mobileMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
    }
});

// ==========================================================================
// FAQ ACCORDION
// ==========================================================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        // Toggle current item
        if (isOpen) {
            item.classList.remove('open');
            answer.style.maxHeight = null;
        } else {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// ==========================================================================
// CONTACT FORM
// ==========================================================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = contactForm.querySelector('.submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        // Visual feedback
        submitBtn.style.opacity = '0.5';
        submitBtn.querySelector('.btn-text').innerText = 'SENDING...';
        
        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formSuccess.style.display = 'block';
                submitBtn.style.display = 'none';
                contactForm.reset();
            } else {
                alert("Submission failed. Please try again.");
                resetBtn();
            }
        } catch (error) {
            alert("Connection error. Please check your internet.");
            resetBtn();
        }
        
        setTimeout(() => {
            formSuccess.style.display = 'none';
            resetBtn();
        }, 3500);
    });
}

function resetBtn() {
    submitBtn.style.display = 'flex';
    submitBtn.style.opacity = '1';
    submitBtn.querySelector('.btn-text').innerText = 'SEND MESSAGE';
}// ==========================================================================
// BRAND BADGE CLICK TO TOP
// ==========================================================================
const brandBadge = document.getElementById('brand-badge');
if (brandBadge) {
    brandBadge.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}