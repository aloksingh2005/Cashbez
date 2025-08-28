// Modern animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const animateElements = () => {
        const elements = document.querySelectorAll('.feature-card, .category-item, .step-card, .benefit-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-in');
            }
        });
    };

    // Add animation classes
    document.querySelectorAll('.feature-card, .category-item, .step-card, .benefit-card').forEach(element => {
        element.classList.add('animate-ready');
    });

    // Smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('#hero-utility');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Interactive hover effects
    const cards = document.querySelectorAll('.feature-card, .category-item, .step-card, .benefit-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });

    // FAQ Accordion with smooth animation
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answers
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.3s ease';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            
            // Close all other answers
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('p');
                if (otherAnswer !== answer) {
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current answer
            if (isOpen) {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                item.classList.add('active');
            }
        });
    });

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateElements);
    
    // Initial animation check
    animateElements();

    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Add intersection observer for lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });

    // Add button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = 'var(--shadow-lg)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'var(--shadow)';
        });
    });

    // Handle button clicks
    const payBillsNowBtn = document.querySelector('#hero-utility .primary-btn');
    if (payBillsNowBtn) {
        payBillsNowBtn.addEventListener('click', function() {
            console.log('Pay Bills Now button clicked');
        });
    }

    const viewAllServicesBtn = document.querySelector('#hero-utility .secondary-btn');
    if (viewAllServicesBtn) {
        viewAllServicesBtn.addEventListener('click', function() {
            console.log('View All Services button clicked');
        });
    }

    // Handle app store buttons
    const appStoreBtn = document.querySelector('#download-app-utility .app-store-btn');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function() {
            console.log('App Store button clicked from Utility Payments');
        });
    }

    const playStoreBtn = document.querySelector('#download-app-utility .play-store-btn');
    if (playStoreBtn) {
        playStoreBtn.addEventListener('click', function() {
            console.log('Play Store button clicked from Utility Payments');
        });
    }
});
