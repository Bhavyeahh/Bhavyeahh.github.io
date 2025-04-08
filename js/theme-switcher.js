document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (systemDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // Theme toggle click handler
    document.getElementById('theme-toggle').addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme !== 'dark') {
            newTheme = 'dark';
        }
        
        // Set the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update the toggle icon
        updateThemeIcon(newTheme);
    });
    
    // Function to update the theme icon
    function updateThemeIcon(theme) {
        const iconElement = document.getElementById('theme-icon');
        if (theme === 'dark') {
            iconElement.className = 'fas fa-sun'; // Show sun icon in dark mode
        } else {
            iconElement.className = 'fas fa-moon'; // Show moon icon in light mode
        }
    }
});
