// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
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

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .step-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.benefit-card, .step-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger animation check on page load
    animateOnScroll();

    // Handle button clicks
    const startPayoutsBtn = document.querySelector('#hero-payouts .primary-btn');
    if (startPayoutsBtn) {
        startPayoutsBtn.addEventListener('click', function() {
            console.log('Start Instant Payouts button clicked');
        });
    }

    const learnMoreBtn = document.querySelector('#hero-payouts .secondary-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            console.log('Learn More button clicked from Instant Payouts');
        });
    }

    const getStartedCtaBtn = document.querySelector('#cta-payouts .primary-btn');
    if (getStartedCtaBtn) {
        getStartedCtaBtn.addEventListener('click', function() {
            console.log('Get Started with Instant Payouts CTA button clicked');
        });
    }
});
