document.addEventListener('DOMContentLoaded', () => {
    // Only select main sections for fade-in
    const fadeSections = document.querySelectorAll('.hero-content, .hero-image, .features-grid, .steps-container, .cta-content');
    fadeSections.forEach(section => {
        section.classList.add('fade-in', 'animated');
    });

    // Use Intersection Observer for subtle fade-in
    const observer = new window.IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // Add click event listeners for buttons
    const primaryButtons = document.querySelectorAll('.primary-btn');
    const secondaryButtons = document.querySelectorAll('.secondary-btn');

    primaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Handle primary button click
            console.log('Primary button clicked');
            // Add your primary button action here
        });
    });

    secondaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Handle secondary button click
            console.log('Secondary button clicked');
            // Add your secondary button action here
        });
    });
});

// Initialize scroll effects
function initializeScrollEffects() {
    // Add scroll-based animations
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for hero section
        const heroImage = document.querySelector('#hero-micro-atm .hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }

        // Fade in elements as they come into view
        const fadeElements = document.querySelectorAll('.section-header, .features-grid, .steps-container');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    });
}

// DOM Elements
const heroSection = document.getElementById('hero-micro-atm');
const featuresSection = document.getElementById('features-micro-atm');
const howItWorksSection = document.getElementById('how-it-works');
const ctaSection = document.getElementById('cta-micro-atm');
const primaryButtons = document.querySelectorAll('.primary-btn');
const secondaryButtons = document.querySelectorAll('.secondary-btn');
const featureCards = document.querySelectorAll('.feature-card');
const steps = document.querySelectorAll('.step');

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Button hover effects
primaryButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 12px 20px rgba(76, 175, 80, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 8px 15px rgba(76, 175, 80, 0.3)';
    });
});

secondaryButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Feature cards hover effects
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

// Steps hover effects
steps.forEach(step => {
    step.addEventListener('mouseenter', () => {
        step.style.transform = 'translateY(-10px)';
        step.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        const number = step.querySelector('.step-number');
        if (number) {
            number.style.transform = 'scale(1.1)';
            number.style.backgroundColor = '#43A047';
        }
    });

    step.addEventListener('mouseleave', () => {
        step.style.transform = 'translateY(0)';
        step.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        const number = step.querySelector('.step-number');
        if (number) {
            number.style.transform = 'scale(1)';
            number.style.backgroundColor = '#4CAF50';
        }
    });
});

// CTA section parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (ctaSection) {
        ctaSection.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
});

// Add active class to current section in viewport
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('active') && !e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.innerHTML = '<span class="spinner"></span> Loading...';
            
            // Simulate loading (remove in production)
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = this.getAttribute('data-original-text') || 'Click Me';
            }, 2000);
        }
    });
});

// Store original button text
document.querySelectorAll('.btn').forEach(button => {
    button.setAttribute('data-original-text', button.innerHTML);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        if (nav && !nav.classList.contains('active')) {
            nav.classList.add('active');
            menuToggle.classList.add('active');
        }
    }
}

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Add CSS for scroll progress
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #4CAF50;
        z-index: 1000;
        transition: width 0.1s ease;
    }
    
    .btn.loading {
        position: relative;
        pointer-events: none;
    }
    
    .btn.loading .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 10px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);