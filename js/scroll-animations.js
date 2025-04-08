document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is approaching the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Start animation when element is approaching viewport (200px before entering)
        return (
            rect.top <= windowHeight + 200 &&  // Element is within viewport + 200px buffer
            rect.bottom >= -100 &&  // Allow elements that are just above viewport to animate out
            rect.left <= windowWidth &&
            rect.right >= 0
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
    }

    // Initial check on page load
    handleScrollAnimation();

    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('resize', handleScrollAnimation);
});
