document.addEventListener('DOMContentLoaded', function() {
    logEvent('view', 'page', 'Page loaded');
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        let elementType = target.tagName.toLowerCase();
        let description = '';
        
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
            const parentElement = target.closest('section');
            if (parentElement && parentElement.id) {
                description = `Element in ${parentElement.id} section`;
            } else {
                description = `${elementType} element`;
            }
        }
        
        logEvent('click', elementType, description);
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const elementId = element.id || '';
                const elementType = element.tagName.toLowerCase();
                
                logEvent('view', elementType, `Section: ${elementId || element.className}`);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

function logEvent(eventType, objectType, description) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${objectType} - ${description}`);
}