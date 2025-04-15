document.addEventListener('DOMContentLoaded', function() {
    const interestAudios = [
        { name: 'Music', audioFile: 'music.mp3' },
        { name: 'Gaming', audioFile: 'gaming.mp3' },
        { name: 'Watching Nature', audioFile: 'nature.mp3' },
        { name: 'Sleeping', audioFile: 'sleeping.mp3' }
    ];
    
    const allInterestItems = document.querySelectorAll('.interest-item');
    const audioElements = {};
    let audioPermissionGranted = false;
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
    audioNotice.classList.add('hidden');
    setTimeout(() => {
        audioNotice.classList.remove('hidden');
    }, 1500);
    const closeButton = audioNotice.querySelector('.close-notice');
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        audioNotice.classList.add('hidden');
    });
    interestAudios.forEach(interest => {
        const audio = new Audio(`assets/${interest.audioFile}`);
        audio.volume = 0.7;
        audio.loop = true;
        audioElements[interest.name] = audio;
        audio.preload = 'auto';
        audio.addEventListener('canplaythrough', () => {
            console.log(`${interest.name} audio loaded and ready to play`);
        });
        audio.addEventListener('error', (e) => {
            console.error(`${interest.name} audio error:`, e);
        });
    });
    function initializeAudio() {
        if (audioPermissionGranted) return;
        console.log("User interaction detected - initializing audio...");
        audioPermissionGranted = true;
        Object.values(audioElements).forEach(audio => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    console.log("Audio initialized successfully");
                }).catch(error => {
                    console.error("Audio initialization failed:", error);
                });
            }
        });
        audioNotice.classList.add('hidden');
        document.removeEventListener('click', initializeAudio);
        document.removeEventListener('touchstart', initializeAudio);
    }
    document.addEventListener('click', initializeAudio);
    document.addEventListener('touchstart', initializeAudio);
    allInterestItems.forEach(item => {
        const heading = item.querySelector('.interest-content h3');
        if (!heading) return;
        const interestName = heading.textContent.trim();
        const audio = audioElements[interestName];
        if (audio) {
            const playAudio = (e) => {
                if (!audioPermissionGranted) return;
                Object.values(audioElements).forEach(element => {
                    if (element !== audio) {
                        element.pause();
                        element.currentTime = 0;
                    }
                });
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error(`${interestName} audio playback failed:`, error);
                    });
                }
            };
            const stopAudio = () => {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            };
            item.addEventListener('mouseenter', playAudio);
            item.addEventListener('mouseleave', stopAudio);
            item.addEventListener('touchstart', playAudio);
            item.addEventListener('touchend', stopAudio);
            item.addEventListener('touchcancel', stopAudio);
        }
    });
    window.addEventListener('beforeunload', () => {
        Object.values(audioElements).forEach(audio => {
            audio.pause();
        });
    });
});
