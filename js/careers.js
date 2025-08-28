// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initPositionFilters();
    initGalleryHover();
    initScrollAnimations();
    initApplyButtons();
});

// Position filtering functionality
function initPositionFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const positionCards = document.querySelectorAll('.position-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            // Show/hide positions based on category
            positionCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Gallery hover effects
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.overlay').style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            item.querySelector('.overlay').style.opacity = '0';
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.benefit-card, .step, .position-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
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

// Apply button functionality
function initApplyButtons() {
    const applyButtons = document.querySelectorAll('.apply-btn');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const position = button.closest('.position-card').querySelector('h3').textContent;
            showApplicationModal(position);
        });
    });
}

// Application Modal
function showApplicationModal(position) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Apply for ${position}</h2>
            <form id="application-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="resume">Resume/CV</label>
                    <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
                </div>
                <div class="form-group">
                    <label for="cover-letter">Cover Letter</label>
                    <textarea id="cover-letter" name="cover-letter" rows="4"></textarea>
                </div>
                <button type="submit" class="submit-btn">Submit Application</button>
            </form>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .application-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 600px;
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }

        .submit-btn {
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            width: 100%;
            transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
            background-color: #45a049;
        }
    `;
    document.head.appendChild(style);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });

    // Form submission
    const form = modal.querySelector('#application-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            modal.querySelector('.modal-content').innerHTML = `
                <div class="success-message">
                    <h2>Application Submitted!</h2>
                    <p>Thank you for applying to ${position}. We will review your application and get back to you soon.</p>
                    <button class="close-success">Close</button>
                </div>
            `;

            // Add success message styles
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .success-message {
                    text-align: center;
                    padding: 20px;
                }

                .success-message h2 {
                    color: #4CAF50;
                    margin-bottom: 15px;
                }

                .success-message p {
                    color: #666;
                    margin-bottom: 20px;
                }

                .close-success {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                }
            `;
            document.head.appendChild(successStyle);

            // Close success message
            const closeSuccessBtn = modal.querySelector('.close-success');
            closeSuccessBtn.addEventListener('click', () => {
                modal.remove();
                style.remove();
                successStyle.remove();
            });
        }, 1500);
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
