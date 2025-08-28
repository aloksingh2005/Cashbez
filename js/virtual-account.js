document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pricing Plan Selection
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            // You can add your plan selection logic here
            console.log(`Selected plan: ${plan}`);
            
            // Example: Show a modal or redirect to signup
            alert(`You selected the ${plan} plan. Redirecting to signup...`);
        });
    });

    // Mobile Menu Toggle (if you have a mobile menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step, .pricing-card').forEach(element => {
        observer.observe(element);
    });

    // Form Validation (if you have forms)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                // You can add your form submission logic here
            }
        });
    });

    // Add error class removal on input
    document.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

    // Virtual Account Creation Demo
    const createAccountBtn = document.querySelector('.primary-btn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function() {
            // Show loading state
            this.textContent = 'Creating Account...';
            this.disabled = true;

            // Simulate account creation
            setTimeout(() => {
                // Reset button state
                this.textContent = 'Get Started';
                this.disabled = false;

                // Show success message
                alert('Account created successfully! Redirecting to dashboard...');
            }, 2000);
        });
    }

    // Demo Request Button
    const demoBtn = document.querySelector('.cta-secondary');
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            // Show demo request form
            const demoForm = document.createElement('div');
            demoForm.className = 'demo-modal';
            demoForm.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Request a Demo</h2>
                    <form id="demoRequestForm">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="company">Company</label>
                            <input type="text" id="company" required>
                        </div>
                        <button type="submit" class="submit-btn">Request Demo</button>
                    </form>
                </div>
            `;

            // Add modal to page
            document.body.appendChild(demoForm);

            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .demo-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    width: 90%;
                    max-width: 500px;
                }

                .close-modal {
                    float: right;
                    cursor: pointer;
                    font-size: 1.5rem;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .form-group input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .submit-btn {
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 1rem;
                }
            `;
            document.head.appendChild(style);

            // Close modal functionality
            const closeBtn = demoForm.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                demoForm.remove();
                style.remove();
            });

            // Handle form submission
            const form = demoForm.querySelector('#demoRequestForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate form submission
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    demoForm.remove();
                    style.remove();
                    alert('Demo request received! We will contact you shortly.');
                }, 1500);
            });
        });
    }
});
