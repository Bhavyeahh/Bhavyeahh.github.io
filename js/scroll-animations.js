document.addEventListener('DOMContentLoaded', function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= windowHeight + 50 &&
            rect.bottom >= -100
        );
    }

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

    handleScrollAnimation();

    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('resize', handleScrollAnimation);
});
