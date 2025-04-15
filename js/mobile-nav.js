document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav ul');
    
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    header.insertBefore(mobileNavToggle, nav.parentElement);
    
    mobileNavToggle.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('open');
        
        mobileNavToggle.innerHTML = isOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
        
        mobileNavToggle.setAttribute('aria-expanded', isOpen.toString());
        
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('open') && 
            !nav.contains(event.target) && 
            !mobileNavToggle.contains(event.target)) {
            nav.classList.remove('open');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    if (document.getElementById('text-analysis')) {
        const resultsContainer = document.getElementById('results-container');
        
        const addResponsiveTables = function() {
            const tables = resultsContainer.querySelectorAll('table');
            tables.forEach(table => {
                if (!table.parentElement.classList.contains('table-responsive')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-responsive';
                    wrapper.style.cssText = 'width: 100%; overflow-x: auto;';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                }
            });
        };
        
        document.getElementById('analyze-btn').addEventListener('click', function() {
            setTimeout(addResponsiveTables, 100);
        });
    }
});
