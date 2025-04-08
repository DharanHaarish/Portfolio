// Create audio context and typing sound
let audioContext;
let typingBuffer;

// Get the base URL for assets
const getBaseUrl = () => {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    // If on GitHub Pages, include the repository name in the path
    return isGitHubPages ? '/Portfolio' : '';
};

// Load the typing sound
async function loadTypingSound() {
    try {
        console.log('Loading typing sound...');
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}/static/sounds/typing.mp3`);
        console.log('Sound file response:', response);
        const arrayBuffer = await response.arrayBuffer();
        typingBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log('Sound loaded successfully!');
    } catch (error) {
        console.error('Error loading typing sound:', error);
    }
}

// Play the typing sound
function playTypingSound() {
    if (audioContext && typingBuffer) {
        try {
            const source = audioContext.createBufferSource();
            source.buffer = typingBuffer;
            source.connect(audioContext.destination);
            source.start(0);
        } catch (error) {
            console.error('Error playing typing sound:', error);
        }
    } else {
        console.log('Audio not ready:', { audioContext: !!audioContext, typingBuffer: !!typingBuffer });
    }
}

// Initialize sound on first user interaction
document.addEventListener('click', function() {
    console.log('Document clicked, initializing sound...');
    if (!audioContext) {
        loadTypingSound();
    }
}, { once: true });

// Handle typing animation and sound
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded, setting up typing sound...');
    const tooltip = document.querySelector('.typewriter-tooltip');
    const spans = tooltip.querySelectorAll('span');
    let isPlaying = false;

    function startTypingSounds() {
        if (isPlaying) {
            console.log('Already playing sounds, skipping...');
            return;
        }
        console.log('Starting typing sounds...');
        isPlaying = true;

        spans.forEach((span, index) => {
            const delay = index * 2000;
            const duration = 2000;
            const steps = 80;
            const intervalTime = duration / steps;

            setTimeout(() => {
                console.log(`Starting line ${index + 1}`);
                let charCount = 0;
                const interval = setInterval(() => {
                    playTypingSound();
                    charCount++;
                    if (charCount >= steps) {
                        clearInterval(interval);
                        console.log(`Finished line ${index + 1}`);
                    }
                }, intervalTime);
            }, delay);
        });

        setTimeout(() => {
            isPlaying = false;
            console.log('Finished all typing sounds');
        }, spans.length * 2000);
    }

    // Start typing sounds when hovering over the navbar brand
    document.querySelector('.navbar-brand').addEventListener('mouseenter', function() {
        console.log('Navbar brand hovered');
        if (audioContext) {
            startTypingSounds();
        } else {
            loadTypingSound().then(startTypingSounds);
        }
    });
}); 