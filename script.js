// DOM Elements
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.getElementById('closeModal');
const memoryItems = document.querySelectorAll('.memory-item');
const navLinks = document.querySelectorAll('.nav-link');
const paperContainer = document.querySelector('.paper-container');

// Initialize the album
function initAlbum() {
    console.log('Etasha Society Memory Album initialized');
    
    // Add random rotations to photos
    addRandomRotations();
    
    // Setup click events for memory items
    setupMemoryItems();
    
    // Setup modal close events
    setupModal();
    
    // Setup navigation
    setupNavigation();
    
    // Add random hover quotes
    addRandomHoverQuotes();

    // Add paper crinkle effect
    setupPaperEffects();
    
    // Add random tape colors
    addRandomTapeColors();
    
    // Setup Game/Intro
    setupGameIntro();
}

// Add random rotation to memory items
function addRandomRotations() {
    memoryItems.forEach(item => {
        const rotation = (Math.random() * 6) - 3; // Random rotation between -3 and 3 degrees
        item.style.transform = `rotate(${rotation}deg)`;
        
        // Store original rotation for hover effect
        item.dataset.originalRotation = rotation;
        
        // Add hover event listeners
        item.addEventListener('mouseenter', function() {
            const originalRotation = parseFloat(this.dataset.originalRotation);
            this.style.transform = `translateY(-8px) rotate(${originalRotation + 0.5}deg)`;
        });
        
        item.addEventListener('mouseleave', function() {
            const originalRotation = parseFloat(this.dataset.originalRotation);
            this.style.transform = `rotate(${originalRotation}deg)`;
        });
    });
}

// Setup memory items click events
function setupMemoryItems() {
    memoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const mediaType = this.getAttribute('data-type');
            const caption = this.getAttribute('data-caption');
            
            // Set caption
            modalCaption.textContent = caption;
            
            // Add crinkle effect to the clicked item
            this.classList.add('crinkle');
            setTimeout(() => {
                this.classList.remove('crinkle');
            }, 300);
            
            if (mediaType === 'photo') {
                // Use the actual image source from the clicked element
                const img = this.querySelector('img');
                if (img) modalImage.src = img.src;
                
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
            } else if (mediaType === 'video') {
                // Use the actual video source from the clicked element
                const video = this.querySelector('video');
                if (video) modalVideo.src = video.src;
                
                modalVideo.style.display = 'block';
                modalImage.style.display = 'none';
            }
        });
    });
}

// Setup modal functionality
function setupModal() {
    // Close modal when X is clicked
    closeModal.addEventListener('click', closeModalFunc);
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModalFunc();
        }
    });
}

// Function to close modal
function closeModalFunc() {
    modal.style.display = 'none';
    modalVideo.pause();
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Setup navigation smooth scrolling
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Add visual feedback to active link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Setup paper crinkle effects
function setupPaperEffects() {
    // Add click effect to paper container
    paperContainer.addEventListener('click', function(e) {
        // Only trigger if clicking directly on paper container (not on child elements)
        if (e.target === paperContainer) {
            this.classList.add('crinkle');
            setTimeout(() => {
                this.classList.remove('crinkle');
            }, 300);
        }
    });
    
    // Add crinkle effect to quotes and notes on click
    document.querySelectorAll('.emotional-quote, .handwritten-note').forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('crinkle');
            setTimeout(() => {
                this.classList.remove('crinkle');
            }, 300);
        });
    });
}

// Add random tape colors for more visual variety
function addRandomTapeColors() {
    const tapes = document.querySelectorAll('.tape');
    const tapeColors = [
        'rgba(196, 30, 58, 0.7)',   // Christmas Red
        'rgba(47, 82, 51, 0.7)',    // Christmas Green
        'rgba(255, 215, 0, 0.7)',   // Gold
        'rgba(192, 192, 192, 0.7)', // Silver
        'rgba(255, 255, 255, 0.6)'  // Snow White
    ];
    
    tapes.forEach(tape => {
        const randomColor = tapeColors[Math.floor(Math.random() * tapeColors.length)];
        tape.style.backgroundColor = randomColor;
        
        // Add slight rotation variations
        const rotation = (Math.random() * 10) - 5; // -5 to 5 degrees
        tape.style.transform = `rotate(${rotation}deg)`;
    });
}

// Add random emotional lines that appear on hover over certain elements
function addRandomHoverQuotes() {
    const hoverQuotes = [
        "Ho Ho Ho! Merry Christmas!",
        "Crafting joy, one Santa at a time.",
        "Festive vibes only!",
        "Making memories that last forever.",
        "Tis the season to be creative!"
    ];
    
    const elementsToHover = document.querySelectorAll('.memory-item, .section-title');
    
    elementsToHover.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Only add tooltip on some elements randomly
            if (Math.random() > 0.7) {
                const randomQuote = hoverQuotes[Math.floor(Math.random() * hoverQuotes.length)];
                
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'hover-tooltip';
                tooltip.textContent = randomQuote;
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'rgba(245, 241, 232, 0.95)';
                tooltip.style.color = 'var(--ink-dark)';
                tooltip.style.padding = '10px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                tooltip.style.zIndex = '100';
                tooltip.style.fontSize = '0.9rem';
                tooltip.style.maxWidth = '200px';
                tooltip.style.border = '1px solid rgba(93, 64, 55, 0.2)';
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.top - 50}px`;
                tooltip.style.left = `${rect.left + rect.width/2 - 100}px`;
                
                document.body.appendChild(tooltip);
                
                // Remove tooltip on mouse leave
                this.addEventListener('mouseleave', function() {
                    if (document.body.contains(tooltip)) {
                        document.body.removeChild(tooltip);
                    }
                }, { once: true });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initAlbum);

// Add CSS for hover tooltips dynamically
const style = document.createElement('style');
style.textContent = `
    .hover-tooltip {
        position: fixed;
        animation: fadeIn 0.3s;
        font-family: 'Caveat', cursive !important;
        pointer-events: none;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Setup Game Intro Logic
function setupGameIntro() {
    const envelope = document.getElementById('envelope');
    const santaInstruction = document.getElementById('santa-instruction');
    const gameOverlay = document.getElementById('game-overlay');
    const startBtn = document.getElementById('start-game-btn');
    const clickHint = document.querySelector('.click-hint');

    // Open envelope on click
    envelope.addEventListener('click', function() {
        if (!this.classList.contains('open')) {
            this.classList.add('open');
            clickHint.style.display = 'none';
            
            // Show Santa after envelope opens
            setTimeout(() => {
                envelope.style.display = 'none';
                santaInstruction.style.display = 'flex';
            }, 800);
        }
    });

    // Close overlay when starting game
    startBtn.addEventListener('click', function() {
        gameOverlay.style.opacity = '0';
        setTimeout(() => {
            gameOverlay.style.display = 'none';
        }, 500);
    });
}

// Add some interactive console message
console.log(`
    ███████ ████████  █████  ███████ ██   ██      ███████ ██████   ██████ ██   ██ ████████ 
    ██         ██    ██   ██ ██      ██  ██       ██      ██   ██ ██      ██   ██    ██    
    ███████    ██    ███████ ███████ █████        ███████ ██████  ██      ███████    ██    
         ██    ██    ██   ██      ██ ██  ██            ██ ██   ██ ██      ██   ██    ██    
    ███████    ██    ██   ██ ███████ ██   ██      ███████ ██   ██  ██████ ██   ██    ██    
                                                                                          
    Welcome to the Etasha Society Memory Album
    This album holds the stories of a class that became a family.
    "We joined as strangers, we left as keepers of each other's dreams."
`);