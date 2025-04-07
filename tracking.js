// Initialize tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Track page view when page loads
    logEvent('view', 'page', 'Page loaded');
    
    // Track all click events
    document.addEventListener('click', function(e) {
        // Get information about the clicked element
        const target = e.target;
        let elementType = target.tagName.toLowerCase();
        let description = '';
        
        // Determine element type and description
        if (elementType === 'a') {
            description = `Link to ${target.getAttribute('href') || 'unknown'}`;
        } else if (elementType === 'img') {
            description = `Image: ${target.getAttribute('alt') || 'unnamed image'}`;
        } else if (target.closest('nav')) {
            description = 'Navigation element';
        } else if (target.classList.contains('cv-button')) {
            description = 'CV download button';
        } else if (target.closest('.education-item')) {
            description = `Education item: ${target.closest('.education-item').querySelector('h3').textContent}`;
        } else if (target.closest('.skill-category')) {
            description = `Skill category: ${target.closest('.skill-category').querySelector('h3').textContent}`;
        } else if (target.closest('.gallery-item')) {
            description = `Gallery item: ${target.closest('.gallery-item').querySelector('p').textContent}`;
        } else {
            // For any other element, try to get some context
            const parentElement = target.closest('section');
            if (parentElement && parentElement.id) {
                description = `Element in ${parentElement.id} section`;
            } else {
                description = `${elementType} element`;
            }
        }
        
        // Log the event to console
        logEvent('click', elementType, description);
    });
    
    // Add view tracking for visible elements as they scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const elementId = element.id || '';
                const elementType = element.tagName.toLowerCase();
                
                // Log section views
                logEvent('view', elementType, `Section: ${elementId || element.className}`);
                
                // Once logged, unobserve the element to avoid duplicate logs
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Helper function to log events to console
function logEvent(eventType, objectType, description) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${objectType} - ${description}`);
}