// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeAnimations();
    initializePricingCards();
    initializeScrollEffects();
});

// Initialize animations
function initializeAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize pricing cards interactions
function initializePricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove featured class from all cards
            pricingCards.forEach(c => c.classList.remove('featured'));
            // Add featured class to hovered card
            card.classList.add('featured');
        });

        card.addEventListener('mouseleave', () => {
            // Remove featured class from all cards
            pricingCards.forEach(c => c.classList.remove('featured'));
            // Add featured class back to the middle card
            const middleCard = document.querySelector('.pricing-card:nth-child(2)');
            if (middleCard) {
                middleCard.classList.add('featured');
            }
        });
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Add scroll-based animations
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for hero section
        const heroImage = document.querySelector('#hero-upi .hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }

        // Fade in elements as they come into view
        const fadeElements = document.querySelectorAll('.section-header, .features-grid, .steps-container, .pricing-grid');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    });
}

// Add smooth scrolling for anchor links
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

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .feature-card, .step-card, .pricing-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .feature-card.animate-in, .step-card.animate-in, .pricing-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .section-header, .features-grid, .steps-container, .pricing-grid {
        opacity: 0;
        transition: opacity 0.8s ease;
    }

    .section-header.fade-in, .features-grid.fade-in, .steps-container.fade-in, .pricing-grid.fade-in {
        opacity: 1;
    }

    .pricing-card {
        transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    .pricing-card.featured {
        transform: scale(1.05);
        box-shadow: 0 15px 40px rgba(33, 150, 243, 0.15);
    }
`;
document.head.appendChild(style);
