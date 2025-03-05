document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenIframe = document.getElementById('fullscreen-iframe');
    const closeButton = document.getElementById('close-fullscreen');
    
    // Function to open iframe in fullscreen
    function openFullscreen(url) {
        fullscreenIframe.src = url;
        fullscreenContainer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Add event to handle escape key
        document.addEventListener('keydown', handleEscKey);
    }
    
    // Function to close fullscreen
    function closeFullscreen() {
        fullscreenContainer.classList.remove('active');
        // Small delay before removing the source to allow for smooth transition
        setTimeout(() => {
            fullscreenIframe.src = '';
        }, 300);
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove escape key event
        document.removeEventListener('keydown', handleEscKey);
    }
    
    // Function to handle escape key
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    }
    
    // Add click event to each tile
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const url = tile.dataset.url;
            if (url) {
                openFullscreen(url);
            }
        });
    });
    
    // Close button event
    closeButton.addEventListener('click', closeFullscreen);
    
    // Close on click outside iframe (on the container)
    fullscreenContainer.addEventListener('click', (e) => {
        // Only close if clicking the container itself, not the iframe or close button
        if (e.target === fullscreenContainer) {
            closeFullscreen();
        }
    });
    
    // Add hover effect for better mobile experience
    tiles.forEach(tile => {
        // For touch devices, add active class on touch start and remove after delay
        tile.addEventListener('touchstart', () => {
            tile.classList.add('hover-effect');
        }, { passive: true });
        
        tile.addEventListener('touchend', () => {
            setTimeout(() => {
                tile.classList.remove('hover-effect');
            }, 300);
        }, { passive: true });
    });
});

