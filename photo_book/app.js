document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const container = document.getElementById('random-images-container');
    console.log('Container found:', container);
    
    const images = [
        './photobook1.png',
        './photobook2.png',
        './photobook3.png',
        './photobook4.png',
        './photobook5.png',
        './photobook6.png'
    ];
    const maxImages = 12; // Maximum number of images to show at once
    
    // Get the height below the marquee
    const marqueeHeight = document.querySelector('.marquee-container').offsetHeight;
    console.log('Marquee height:', marqueeHeight);
    
    function getRandomSize() {
        const size = Math.random() * (400 - 200) + 200;
        console.log('Random size generated:', size);
        return size;
    }
    
    function getRandomPosition(size) {
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - marqueeHeight - size) + marqueeHeight;
        console.log('Random position:', { x, y });
        return { x, y };
    }
    
    function createRandomImage() {
        const img = document.createElement('img');
        const randomImage = images[Math.floor(Math.random() * images.length)];
        console.log('Creating image:', randomImage);
        
        const size = getRandomSize();
        const { x, y } = getRandomPosition(size);
        
        // Set image attributes
        img.src = randomImage;
        img.alt = 'Random photo book image';
        img.style.position = 'absolute';
        img.style.width = `${size}px`;
        img.style.height = 'auto';
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.opacity = '0';
        img.style.zIndex = '1';
        
        // Add error handling for image loading
        img.onerror = (e) => {
            console.error('Failed to load image:', randomImage, e);
            img.remove();
        };
        
        // Ensure image loads before showing
        img.onload = () => {
            console.log('Image loaded successfully:', randomImage);
            requestAnimationFrame(() => {
                img.style.opacity = '1';
                console.log('Image opacity set to 1');
            });
        };
        
        return img;
    }
    
    function addNewImage() {
        console.log('Adding new image...');
        // Remove oldest image if we've reached the maximum
        if (container.children.length >= maxImages) {
            console.log('Removing oldest image');
            container.removeChild(container.firstChild);
        }
        
        const newImage = createRandomImage();
        container.appendChild(newImage);
        console.log('New image added to container');
    }
    
    // Click event listener
    document.body.addEventListener('click', (e) => {
        console.log('Click detected');
        // Don't trigger if clicking on navigation
        if (e.target.closest('.marquee-container')) {
            console.log('Click was on marquee - ignoring');
            return;
        }
        
        addNewImage();
    });
    
    // Add initial images
    console.log('Adding initial images...');
    for (let i = 0; i < 3; i++) {
        addNewImage();
    }
});
