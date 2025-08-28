// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle for mobile
    const setupMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create hamburger menu button for mobile
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        navbar.insertBefore(hamburger, navLinks);

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Show hamburger on mobile
        const checkMobile = () => {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navLinks.style.display = 'none';
            } else {
                hamburger.style.display = 'none';
                navLinks.style.display = 'flex';
                navLinks.classList.remove('active');
            }
        };

        // Initial check and window resize listener
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    };

    // Smooth scroll for navigation links
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    };

    // Animate elements when they come into view
    const setupScrollAnimations = () => {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.aadhaar-service-card, .aadhaar-step-card, .aadhaar-benefit-item');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                    element.classList.add('visible');
                }
            });
        };

        // Initial check and scroll listener with throttling
        let ticking = false;
        animateOnScroll();
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    animateOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // Form validation for any forms on the page
    const setupFormValidation = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    validateInput(this);
                });

                input.addEventListener('blur', function() {
                    validateInput(this);
                });
            });

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    // Here you would typically send the form data to a server
                    console.log('Form is valid, submitting...');
                    form.reset();
                    showSuccessMessage(form);
                }
            });
        });
    };

    // Helper function for form validation
    const validateInput = (input) => {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Update input styling
        input.classList.toggle('error', !isValid);
        
        // Update error message
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!isValid) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                input.parentElement.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        } else if (errorElement) {
            errorElement.remove();
        }

        return isValid;
    };

    // Show success message after form submission
    const showSuccessMessage = (form) => {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Form submitted successfully!';
        form.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    };

    // Add loading animation for images
    const setupImageLoading = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading placeholder
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';

            // Handle image load
            if (img.complete) {
                img.classList.add('loaded');
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                    this.style.opacity = '1';
                });

                // Handle image error
                img.addEventListener('error', function() {
                    console.error('Failed to load image:', this.src);
                    this.src = 'images/placeholder.png';
                    this.alt = 'Image not available';
                });
            }
        });
    };

    // Add active state to current navigation item
    const setupActiveNav = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    };

    // Initialize all features
    const init = () => {
        setupMobileMenu();
        setupSmoothScroll();
        setupScrollAnimations();
        setupFormValidation();
        setupImageLoading();
        setupActiveNav();
    };

    // Start the application
    init();
});

// Add CSS for new features
const style = document.createElement('style');
style.textContent = `
    .hamburger {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        color: #2c3e50;
        transition: color 0.3s ease;
    }

    .hamburger:hover {
        color: #3498db;
    }

    .hamburger.active {
        color: #3498db;
    }

    .nav-links.active {
        display: flex;
        animation: slideDown 0.3s ease forwards;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .error {
        border-color: #e74c3c !important;
    }

    .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    .success-message {
        background-color: #2ecc71;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        margin-top: 1rem;
        text-align: center;
        animation: fadeIn 0.3s ease;
    }

    img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    img.loaded {
        opacity: 1;
    }

    .nav-links a.active {
        color: #3498db;
        font-weight: 600;
        background-color: rgba(52, 152, 219, 0.1);
    }

    .aadhaar-service-card,
    .aadhaar-step-card,
    .aadhaar-benefit-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .aadhaar-service-card.visible,
    .aadhaar-step-card.visible,
    .aadhaar-benefit-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);
