// Smooth scrolling for anchor links
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

// Initialize all elements as visible by default
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for all cards
    document.querySelectorAll('.press-card, .media-card, .kit-item').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });

    // Add hover effects for press cards
    document.querySelectorAll('.press-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Initialize images
    document.querySelectorAll('.media-card img').forEach(img => {
        img.style.opacity = '1';
    });
});

// Add click event for read more links
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.press-card, .media-card');
        if (card) {
            // Add your custom logic here for expanding the card or showing more content
            console.log('Read more clicked for:', card.querySelector('h3').textContent);
        }
    });
});

// Add download button functionality
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const item = e.target.closest('.kit-item');
        if (item) {
            const itemName = item.querySelector('h3').textContent;
            console.log(`Downloading ${itemName}...`);
            // Add your custom download logic here
        }
    });
});

// Mobile menu functionality
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
