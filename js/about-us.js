document.addEventListener('DOMContentLoaded', function() {
    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-value'));
                animateValue(target, 0, value, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.mission-card, .vision-card, .value-card, .team-member');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => animationObserver.observe(element));

    // Add hover effect for team member images
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.member-image img').style.transform = 'scale(1.1)';
        });

        member.addEventListener('mouseleave', function() {
            this.querySelector('.member-image img').style.transform = 'scale(1)';
        });
    });

    // Function to animate counting numbers
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Format large numbers with commas
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .mission-card, .vision-card, .value-card, .team-member {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .mission-card.animate, .vision-card.animate, .value-card.animate, .team-member.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .mission-card:nth-child(2), .vision-card:nth-child(2) {
            transition-delay: 0.2s;
        }

        .value-card:nth-child(2) {
            transition-delay: 0.2s;
        }

        .value-card:nth-child(3) {
            transition-delay: 0.4s;
        }

        .value-card:nth-child(4) {
            transition-delay: 0.6s;
        }

        .team-member:nth-child(2) {
            transition-delay: 0.2s;
        }

        .team-member:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
});
