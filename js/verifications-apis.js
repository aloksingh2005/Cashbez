document.addEventListener('DOMContentLoaded', () => {
    // Get all try API buttons
    const tryApiButtons = document.querySelectorAll('.try-api-btn');

    // Add click event listener to each button
    tryApiButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const apiCard = e.target.closest('.api-card');
            const apiName = apiCard.querySelector('h2').textContent;
            handleApiClick(apiName);
        });
    });

    // FAQ Section Interactivity
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

    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target, 0, parseInt(entry.target.textContent), 1500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
});

// Function to handle API button clicks
function handleApiClick(apiName) {
    // Create modal for API testing
    const modal = document.createElement('div');
    modal.className = 'api-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Test ${apiName}</h2>
            <div class="api-test-form">
                <div class="form-group">
                    <label for="apiKey">API Key</label>
                    <input type="text" id="apiKey" placeholder="Enter your API key">
                </div>
                <div class="form-group">
                    <label for="testData">Test Data</label>
                    <textarea id="testData" placeholder="Enter test data in JSON format"></textarea>
                </div>
                <button class="send-request-btn">Send Request</button>
            </div>
            <div class="response-container">
                <h3>Response</h3>
                <pre><code id="responseData">No response yet</code></pre>
            </div>
        </div>
    `;

    // Add modal to the page
    document.body.appendChild(modal);

    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .api-modal {
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
            padding: 2rem;
            border-radius: 10px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
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

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .form-group textarea {
            height: 100px;
            resize: vertical;
        }

        .send-request-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
        }

        .response-container {
            margin-top: 2rem;
        }

        .response-container pre {
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
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

    // Handle API request
    const sendRequestBtn = modal.querySelector('.send-request-btn');
    sendRequestBtn.addEventListener('click', async () => {
        const apiKey = modal.querySelector('#apiKey').value;
        const testData = modal.querySelector('#testData').value;
        const responseData = modal.querySelector('#responseData');

        if (!apiKey) {
            alert('Please enter an API key');
            return;
        }

        try {
            // Simulate API request
            responseData.textContent = 'Sending request...';
            
            // Simulate API response after 1 second
            setTimeout(() => {
                responseData.textContent = JSON.stringify({
                    status: 'success',
                    message: 'API request successful',
                    data: {
                        verification_id: 'ver_' + Math.random().toString(36).substr(2, 9),
                        timestamp: new Date().toISOString(),
                        status: 'verified'
                    }
                }, null, 2);
            }, 1000);
        } catch (error) {
            responseData.textContent = JSON.stringify({
                status: 'error',
                message: error.message
            }, null, 2);
        }
    });
}

// Function to animate counting numbers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
