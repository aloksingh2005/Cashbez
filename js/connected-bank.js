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
        const elements = document.querySelectorAll('.feature-card, .step, .benefit-card, .faq-item, .testimonial-card');
        
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
    document.querySelectorAll('.feature-card, .step, .benefit-card, .faq-item, .testimonial-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger animation check on page load
    animateOnScroll();

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle current answer
            const isOpen = answer.style.display === 'block';
            answer.style.display = isOpen ? 'none' : 'block';
            
            // Add transition
            answer.style.transition = 'all 0.3s ease';
            
            // Update question style
            question.style.color = isOpen ? '#333' : '#4CAF50';
        });
    });

    // Handle button clicks
    const getStartedBtn = document.querySelector('.primary-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            // Add your get started button functionality here
            console.log('Get Started button clicked');
        });
    }

    const learnMoreBtn = document.querySelector('.secondary-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Add your learn more button functionality here
            console.log('Learn More button clicked');
        });
    }

    // Handle app store buttons
    const appStoreBtn = document.querySelector('.app-store-btn');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function() {
            // Add your app store button functionality here
            console.log('App Store button clicked');
        });
    }

    const playStoreBtn = document.querySelector('.play-store-btn');
    if (playStoreBtn) {
        playStoreBtn.addEventListener('click', function() {
            // Add your play store button functionality here
            console.log('Play Store button clicked');
        });
    }

    // Handle CTA buttons
    const registerBtn = document.querySelector('#cta .primary-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // Add your register button functionality here
            console.log('Register Now button clicked');
        });
    }

    const supportBtn = document.querySelector('#cta .secondary-btn');
    if (supportBtn) {
        supportBtn.addEventListener('click', function() {
            // Add your support button functionality here
            console.log('Talk to Support button clicked');
        });
    }
});
