// FAQ Accordion
const initAccordion = () => {
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
};

// Search Functionality
const initSearch = () => {
    const searchInput = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                
                // Highlight matching text
                if (searchTerm) {
                    highlightText(item, searchTerm);
                } else {
                    removeHighlight(item);
                }
            } else {
                item.style.display = 'none';
            }
        });
    });
};

// Text Highlighting
const highlightText = (element, searchTerm) => {
    const question = element.querySelector('.faq-question h3');
    const answer = element.querySelector('.faq-answer p');
    
    const questionText = question.textContent;
    const answerText = answer.textContent;
    
    const highlightedQuestion = questionText.replace(
        new RegExp(searchTerm, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
    
    const highlightedAnswer = answerText.replace(
        new RegExp(searchTerm, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
    
    question.innerHTML = highlightedQuestion;
    answer.innerHTML = highlightedAnswer;
};

const removeHighlight = (element) => {
    const question = element.querySelector('.faq-question h3');
    const answer = element.querySelector('.faq-answer p');
    
    question.innerHTML = question.textContent;
    answer.innerHTML = answer.textContent;
};

// Smooth Scrolling
const initSmoothScroll = () => {
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
};

// Quick Links Animation
const initQuickLinks = () => {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
};

// Contact Cards Animation
const initContactCards = () => {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
};

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initSearch();
    initSmoothScroll();
    initQuickLinks();
    initContactCards();
});
