document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    // Theme Toggle Logic
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add a little pop animation to the button
        themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });

    // Simple Scroll Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply observer to product cards and features
    document.querySelectorAll('.product-card, .feature-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Helper class for animation
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Add individual delays to product cards for a staggering effect
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});
