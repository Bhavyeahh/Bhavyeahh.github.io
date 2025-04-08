document.addEventListener('DOMContentLoaded', function() {
    // Define audio mapping for each interest section
    const interestAudios = [
        { name: 'Music', audioFile: 'music.mp3' },
        { name: 'Gaming', audioFile: 'gaming.mp3' },
        { name: 'Watching Nature', audioFile: 'nature.mp3' },
        { name: 'Sleeping', audioFile: 'sleeping.mp3' }
    ];
    
    // Find all interest items
    const allInterestItems = document.querySelectorAll('.interest-item');
    const audioElements = {};
    
    // Create and configure audio elements for each interest
    interestAudios.forEach(interest => {
        // Create audio element
        const audio = new Audio(`assets/${interest.audioFile}`);
        audio.volume = 0.7;
        audio.loop = true;
        
        // Store in the audio elements object
        audioElements[interest.name] = audio;
        
        // Add debugging events
        audio.addEventListener('canplaythrough', () => {
            console.log(`${interest.name} audio loaded and ready to play`);
        });
        
        audio.addEventListener('error', (e) => {
            console.error(`${interest.name} audio error:`, e);
            console.error('Audio error code:', audio.error ? audio.error.code : 'unknown');
        });
        
        // Check if the audio file exists
        fetch(`assets/${interest.audioFile}`, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log(`Audio file exists: assets/${interest.audioFile}`);
                } else {
                    console.error(`Audio file not found: assets/${interest.audioFile}`);
                }
            })
            .catch(error => {
                console.error(`Error checking ${interest.name} audio file:`, error);
            });
    });
    
    // Add event listeners to each interest item
    allInterestItems.forEach(item => {
        const heading = item.querySelector('.interest-content h3');
        if (!heading) return;
        
        const interestName = heading.textContent.trim();
        const audio = audioElements[interestName];
        
        if (audio) {
            // Function to play audio
            const playAudio = () => {
                // Pause all other audio elements first
                Object.values(audioElements).forEach(element => {
                    if (element !== audio) {
                        element.pause();
                        element.currentTime = 0;
                    }
                });
                
                console.log(`Attempting to play ${interestName} audio...`);
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log(`${interestName} audio playback started`);
                    }).catch(error => {
                        console.error(`${interestName} audio playback failed:`, error);
                        if (error.name === 'NotAllowedError') {
                            console.log('Autoplay prevented by browser - requires user interaction');
                        }
                    });
                }
            };
            
            // Function to stop audio
            const stopAudio = () => {
                console.log(`Stopping ${interestName} audio`);
                audio.pause();
                audio.currentTime = 0;
            };
            
            // Add event listeners
            item.addEventListener('mouseenter', playAudio);
            item.addEventListener('mouseleave', stopAudio);
            
            // Add touch support for mobile devices
            item.addEventListener('touchstart', playAudio);
            item.addEventListener('touchend', stopAudio);
            item.addEventListener('touchcancel', stopAudio);
            
            console.log(`Audio event listeners added to ${interestName} section`);
        }
    });
    
    // Ensure all audio stops when user navigates away
    window.addEventListener('beforeunload', () => {
        Object.values(audioElements).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    });
});
