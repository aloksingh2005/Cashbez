document.addEventListener('DOMContentLoaded', () => {
    // Load header
    fetch('html/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            // Re-attach dropdown event listeners after header is loaded
            attachDropdownListeners();
        });

    // Load footer
    fetch('html/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });

    // Existing tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Get the target tab content ID from the data-tab attribute
            const targetTabId = button.dataset.tab;
            const targetTabContent = document.getElementById(targetTabId);

            // Add 'active' class to the target tab content
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            }
        });
    });

    // Function to attach dropdown listeners
    function attachDropdownListeners() {
        const dropdowns = document.querySelectorAll('.has-dropdown');

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                // dropdown.querySelector('.dropdown-menu').style.display = 'block'; // Removed for smooth transition
            });

            dropdown.addEventListener('mouseleave', () => {
                // dropdown.querySelector('.dropdown-menu').style.display = 'none'; // Removed for smooth transition
            });
        });
    }
}); 