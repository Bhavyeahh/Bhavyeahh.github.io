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
    
    // Audio permission state
    let audioPermissionGranted = false;
    
    // Create audio notice element
    const audioNotice = document.createElement('div');
    audioNotice.className = 'audio-permission-notice';
    audioNotice.innerHTML = `
        <div class="audio-notice-content">
            <i class="fas fa-volume-up"></i>
            <span>Click anywhere to enable interest audio effects</span>
            <button class="close-notice"><i class="fas fa-times"></i></button>
        </div>
    `;
    document.body.appendChild(audioNotice);
    
    // Style the audio notice
    const style = document.createElement('style');
    style.textContent = `
        .audio-permission-notice {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 30px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s, transform 0.3s;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .audio-permission-notice.hidden {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
            pointer-events: none;
        }
        
        .audio-notice-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .audio-notice-content i {
            color: var(--primary-color, #ff6b00);
        }
        
        .close-notice {
            background: transparent;
            border: none;
            color: #aaa;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
            font-size: 16px;
        }
        
        .close-notice:hover {
            color: white;
        }
        
        @media (max-width: 600px) {
            .audio-permission-notice {
                width: 90%;
                font-size: 14px;
                padding: 10px 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Hide notice by default and show it after a delay
    audioNotice.classList.add('hidden');
    setTimeout(() => {
        audioNotice.classList.remove('hidden');
    }, 1500);
    
    // Close notice when clicked
    const closeButton = audioNotice.querySelector('.close-notice');
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        audioNotice.classList.add('hidden');
    });
    
    // Create and configure audio elements
    interestAudios.forEach(interest => {
        const audio = new Audio(`assets/${interest.audioFile}`);
        audio.volume = 0.7;
        audio.loop = true;
        audioElements[interest.name] = audio;
        
        // Preload audio files
        audio.preload = 'auto';
        
        // Add debugging events
        audio.addEventListener('canplaythrough', () => {
            console.log(`${interest.name} audio loaded and ready to play`);
        });
        
        audio.addEventListener('error', (e) => {
            console.error(`${interest.name} audio error:`, e);
        });
    });
    
    // Initialize audio on any user interaction with the page
    function initializeAudio() {
        if (audioPermissionGranted) return;
        
        console.log("User interaction detected - initializing audio...");
        audioPermissionGranted = true;
        
        // Play and immediately pause all audio elements to initialize them
        Object.values(audioElements).forEach(audio => {
            // Create a user-initiated playback attempt
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Immediately pause the audio
                    audio.pause();
                    audio.currentTime = 0;
                    console.log("Audio initialized successfully");
                }).catch(error => {
                    console.error("Audio initialization failed:", error);
                });
            }
        });
        
        // Hide the notice once permissions are granted
        audioNotice.classList.add('hidden');
        
        // Remove the global event listeners once initialized
        document.removeEventListener('click', initializeAudio);
        document.removeEventListener('touchstart', initializeAudio);
    }
    
    // Add global event listeners for first interaction
    document.addEventListener('click', initializeAudio);
    document.addEventListener('touchstart', initializeAudio);
    
    // Add hover functionality for interest items
    allInterestItems.forEach(item => {
        const heading = item.querySelector('.interest-content h3');
        if (!heading) return;
        
        const interestName = heading.textContent.trim();
        const audio = audioElements[interestName];
        
        if (audio) {
            // Function to play audio for this interest
            const playAudio = (e) => {
                // Don't try to play audio if permission isn't granted yet
                if (!audioPermissionGranted) return;
                
                // Pause all other audio elements first
                Object.values(audioElements).forEach(element => {
                    if (element !== audio) {
                        element.pause();
                        element.currentTime = 0;
                    }
                });
                
                // Play this interest's audio
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error(`${interestName} audio playback failed:`, error);
                    });
                }
            };
            
            // Function to stop audio
            const stopAudio = () => {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            };
            
            // Add hover/touch listeners
            item.addEventListener('mouseenter', playAudio);
            item.addEventListener('mouseleave', stopAudio);
            item.addEventListener('touchstart', playAudio);
            item.addEventListener('touchend', stopAudio);
            item.addEventListener('touchcancel', stopAudio);
        }
    });
    
    // Ensure all audio stops when user navigates away
    window.addEventListener('beforeunload', () => {
        Object.values(audioElements).forEach(audio => {
            audio.pause();
        });
    });
});
