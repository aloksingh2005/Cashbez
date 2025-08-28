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
        const elements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card');
        
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
    document.querySelectorAll('.service-card, .feature-item, .testimonial-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger animation check on page load
    animateOnScroll();

    // Testimonial Carousel functionality (if not using infinite CSS scroll)
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const leftArrow = document.querySelector('.carousel-navigation .left-arrow');
    const rightArrow = document.querySelector('.carousel-navigation .right-arrow');

    if (testimonialsCarousel && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            testimonialsCarousel.scrollBy({ left: -testimonialsCarousel.offsetWidth / 3, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            testimonialsCarousel.scrollBy({ left: testimonialsCarousel.offsetWidth / 3, behavior: 'smooth' });
        });
    }

    // Handle button clicks
    const bookNowBtn = document.querySelector('#hero-travel .primary-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            console.log('Book Now button clicked');
        });
    }

    const exploreDestinationsBtn = document.querySelector('#hero-travel .secondary-btn');
    if (exploreDestinationsBtn) {
        exploreDestinationsBtn.addEventListener('click', function() {
            console.log('Explore Destinations button clicked');
        });
    }

    const downloadAppBtn = document.querySelector('#cta-travel .primary-btn');
    if (downloadAppBtn) {
        downloadAppBtn.addEventListener('click', function() {
            console.log('Download Cashbez App button clicked from Travel Booking');
        });
    }
});
