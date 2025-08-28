// DOM Elements
const contactForm = document.querySelector('.contact-form');
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendMessage = document.querySelector('.send-message');

// Form Validation
const validateForm = () => {
    const formData = new FormData(contactForm);
    let isValid = true;
    let firstInvalidField = null;

    // Reset previous error states
    contactForm.querySelectorAll('.error-message').forEach(el => el.remove());
    contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate each field
    for (let [key, value] of formData.entries()) {
        const field = contactForm.querySelector(`[name="${key}"]`);
        
        if (!value.trim()) {
            isValid = false;
            showError(field, 'This field is required');
            if (!firstInvalidField) firstInvalidField = field;
        } else if (key === 'email' && !isValidEmail(value)) {
            isValid = false;
            showError(field, 'Please enter a valid email address');
            if (!firstInvalidField) firstInvalidField = field;
        } else if (key === 'phone' && !isValidPhone(value)) {
            isValid = false;
            showError(field, 'Please enter a valid phone number');
            if (!firstInvalidField) firstInvalidField = field;
        }
    }

    if (firstInvalidField) {
        firstInvalidField.focus();
    }

    return isValid;
};

const showError = (field, message) => {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.3rem';
    field.parentNode.appendChild(errorDiv);
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
};

// Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Chat Widget
let isChatOpen = false;

const toggleChat = () => {
    isChatOpen = !isChatOpen;
    chatContainer.classList.toggle('active');
    chatToggle.innerHTML = isChatOpen ? 
        '<i class="fas fa-times"></i> Close Chat' : 
        '<i class="fas fa-comments"></i> Chat with Us';
};

chatToggle.addEventListener('click', toggleChat);
closeChat.addEventListener('click', toggleChat);

// Chat Messages
const addMessage = (message, isUser = false) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'support-message'}`;
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.padding = '0.8rem';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.maxWidth = '80%';
    messageDiv.style.wordWrap = 'break-word';
    
    if (isUser) {
        messageDiv.style.backgroundColor = '#3498db';
        messageDiv.style.color = 'white';
        messageDiv.style.marginLeft = 'auto';
    } else {
        messageDiv.style.backgroundColor = '#f0f0f0';
        messageDiv.style.color = '#333';
    }

    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Send Message
const sendChatMessage = () => {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatInput.value = '';

    // Simulate support response
    setTimeout(() => {
        addMessage('Thank you for your message. Our support team will get back to you shortly.');
    }, 1000);
};

sendMessage.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Notification System
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#2ecc71';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add welcome message to chat
    setTimeout(() => {
        addMessage('Welcome to our support chat! How can we help you today?');
    }, 1000);
});
