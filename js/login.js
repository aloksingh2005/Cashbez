document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const signupPassword = document.getElementById('signupPassword');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    // Switch between login and signup forms
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    });

    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Password strength meter
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updateStrengthMeter(strength);
        });
    }

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                return;
            }

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                showNotification(
                    this.id === 'loginForm' ? 'Successfully logged in!' : 'Account created successfully!',
                    'success'
                );

                // Redirect after success
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                showNotification('An error occurred. Please try again.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });

    // Form validation function
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.type === 'password' && field.id === 'signupPassword' && !isValidPassword(field.value)) {
                showError(field, 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
                isValid = false;
            } else if (field.id === 'confirmPassword' && field.value !== signupPassword.value) {
                showError(field, 'Passwords do not match');
                isValid = false;
            } else {
                clearError(field);
            }
        });

        return isValid;
    }

    // Show error message
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        
        field.classList.add('error');
    }

    // Clear error message
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        field.classList.remove('error');
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // Calculate password strength
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/)) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
        
        return strength;
    }

    // Update password strength meter
    function updateStrengthMeter(strength) {
        const percentage = (strength / 5) * 100;
        strengthBar.style.width = `${percentage}%`;
        
        // Update color based on strength
        if (strength <= 2) {
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
        } else if (strength <= 4) {
            strengthBar.style.backgroundColor = '#f1c40f';
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.style.backgroundColor = '#2ecc71';
            strengthText.textContent = 'Strong';
        }
    }

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            background: white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left: 4px solid #2ecc71;
        }
        
        .notification.error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: #2ecc71;
        }
        
        .notification.error i {
            color: #e74c3c;
        }
        
        .form-group .error-message {
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 0.3rem;
        }
        
        .form-group input.error {
            border-color: #e74c3c;
        }
    `;
    document.head.appendChild(style);
});
