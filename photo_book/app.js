document.addEventListener('DOMContentLoaded', () => {
    // Audio Control Setup
    const audio = document.getElementById('bgMusic');
    const audioControl = document.getElementById('audioControl');
    
    // Reset audio to start and play
    audio.currentTime = 0;
    audio.play().catch(error => {
        console.log('Auto-play was prevented. Please click play to start the music.');
    });

    audioControl.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the image addition
        if (audio.paused) {
            audio.currentTime = 0; // Reset to start when playing
            audio.play();
            audioControl.textContent = '[PAUSE]';
        } else {
            audio.pause();
            audioControl.textContent = '[PLAY]';
        }
    });

    const imageUrls = [
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook5.png?v=1743054119',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook1.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook3.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook2.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook4.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook6.png?v=1743054334',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_4.jpg?v=1743311576',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_3.jpg?v=1743311576',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_1.jpg?v=1743311576',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_2.jpg?v=1743311576',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w.jpg?v=1743311576'
    ];

    // Track which images have been shown
    let shownImages = new Set();

    const container = document.getElementById('random-images-container');
    const marqueeHeight = document.querySelector('.marquee-container').offsetHeight;

    function getRandomPosition(size) {
        return {
            x: Math.random() * (window.innerWidth - size),
            y: Math.random() * (window.innerHeight - size - marqueeHeight) + marqueeHeight
        };
    }

    function getRandomSize() {
        // Random size between 100px and 300px
        return Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    }

    function getNextImageIndex() {
        // If all images have been shown, reset the tracking
        if (shownImages.size >= imageUrls.length) {
            shownImages.clear();
        }

        // Get available indices (ones that haven't been shown yet)
        const availableIndices = imageUrls
            .map((_, index) => index)
            .filter(index => !shownImages.has(index));

        // Randomly select from available indices
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        
        // Mark this image as shown
        shownImages.add(randomIndex);
        
        return randomIndex;
    }

    function addImage(event) {
        // Don't add image if clicking on navigation
        if (event && event.target.closest('.marquee-container')) {
            return;
        }

        const img = document.createElement('img');
        const index = getNextImageIndex();
        img.src = imageUrls[index];
        img.classList.add('clickable-image');
        img.style.opacity = '0';
        
        const size = getRandomSize();
        img.style.width = `${size}px`;

        const position = getRandomPosition(size);
        img.style.left = `${position.x}px`;
        img.style.top = `${position.y}px`;
        
        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('image-container');
        link.appendChild(img);
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            addImage();
        });
        
        container.appendChild(link);
        
        // Trigger reflow
        img.offsetHeight;
        
        // Fade in the image
        requestAnimationFrame(() => {
            img.style.opacity = '1';
        });

        // Remove old images if there are too many
        const maxImages = 100;
        const images = container.getElementsByClassName('image-container');
        if (images.length > maxImages) {
            container.removeChild(images[0]);
        }
    }

    // Add click event to body
    document.body.addEventListener('click', addImage);
});
