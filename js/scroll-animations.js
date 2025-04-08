document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is approaching the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Start animation when element is approaching viewport (200px before entering)
        return (
            rect.top <= windowHeight + 50 &&  // Element is within viewport + 200px buffer
            rect.bottom >= -100  // Allow elements that are just above viewport to animate out
        );
    }

    // Function to handle scroll animation
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.slide-in, .slide-in-right, .slide-in-up');
        
        elements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('appear');
            } else {
                element.classList.remove('appear');
            }
        });

        // Animate interest items
        const interestItems = document.querySelectorAll('.interest-item');
        interestItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.classList.add('appear');
            } else {
                item.classList.remove('appear');
            }
        });
    }

    // Initial check on page load
    handleScrollAnimation();

    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('resize', handleScrollAnimation);
});
