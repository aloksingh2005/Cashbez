// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Form Validation and Submission
const supportForm = document.getElementById('support-form');

if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(supportForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message. We will get back to you soon!');
        supportForm.reset();
    });
}

// Live Chat Button
const chatBtn = document.querySelector('.chat-btn');

if (chatBtn) {
    chatBtn.addEventListener('click', () => {
        // Here you would typically initialize your chat widget
        console.log('Chat initiated');
        alert('Chat feature coming soon!');
    });
}

// Smooth Scrolling
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

// Mobile Menu
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            navbar.insertBefore(mobileMenuBtn, navLinks);
            
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });
        }
    } else {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.remove();
        }
        navLinks.classList.remove('show');
    }
};

// Initialize mobile menu
createMobileMenu();

// Update mobile menu on window resize
window.addEventListener('resize', createMobileMenu);

// Add loading animation to buttons
document.querySelectorAll('.btn, .submit-btn, .chat-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Success Stories Slider
const storiesSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.story-card'),
    totalSlides: document.querySelectorAll('.story-card').length,
    
    init() {
        if (this.slides.length === 0) return;
        
        this.setupControls();
        this.showSlide(0);
    },
    
    setupControls() {
        const prevBtn = document.querySelector('.slider-controls button:first-child');
        const nextBtn = document.querySelector('.slider-controls button:last-child');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
    },
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
            slide.style.opacity = i === index ? '1' : '0.5';
        });
        this.currentSlide = index;
    },
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(next);
    },
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prev);
    }
};

// Knowledge Base Search
const knowledgeBase = {
    searchInput: document.querySelector('.search-box input'),
    searchButton: document.querySelector('.search-box button'),
    categoryCards: document.querySelectorAll('.category-card'),
    
    init() {
        if (!this.searchInput || !this.searchButton) return;
        
        this.searchButton.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
    },
    
    performSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        
        this.categoryCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const links = Array.from(card.querySelectorAll('a'));
            const hasMatch = title.includes(searchTerm) || 
                           links.some(link => link.textContent.toLowerCase().includes(searchTerm));
            
            card.style.display = hasMatch ? 'block' : 'none';
        });
    }
};

// Community Forum Features
const communityForum = {
    joinButton: document.querySelector('.join-btn'),
    statBoxes: document.querySelectorAll('.stat-box'),
    
    init() {
        if (this.joinButton) {
            this.joinButton.addEventListener('click', () => this.handleJoin());
        }
        
        this.animateStats();
    },
    
    handleJoin() {
        // Add your join forum logic here
        console.log('Join forum clicked');
        // You might want to show a modal or redirect to registration
    },
    
    animateStats() {
        this.statBoxes.forEach(box => {
            const number = box.querySelector('.number');
            if (number) {
                const target = parseInt(number.textContent);
                this.animateNumber(number, 0, target, 2000);
            }
        });
    },
    
    animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
};

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    storiesSlider.init();
    knowledgeBase.init();
    communityForum.init();
});
