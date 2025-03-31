document.addEventListener('DOMContentLoaded', () => {
    // Audio Control Setup
    const audio = document.getElementById('bgMusic');
    const audioControl = document.getElementById('audioControl');
    
    // Start playing immediately
    audio.play().catch(error => {
        console.log('Auto-play was prevented. Please click play to start the music.');
    });

    // Scroll functionality
    const scrollLock = document.getElementById('scroll-lock');
    const scrollTarget = document.getElementById('scroll-target');
    const drop1Button = document.querySelector('.scroll-button');
    const drop2Button = document.querySelector('.scroll-up');
    let currentSection = 'top'; // 'top' or 'bottom'

    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';

    // Function to enable scrolling and scroll to target
    function scrollToSection(section) {
        // Clear all existing images
        const container = document.getElementById('random-images-container');
        container.innerHTML = '';
        
        if (section === 'bottom' && currentSection === 'top') {
            document.body.style.overflow = 'auto';
            const targetPosition = window.innerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            currentSection = 'bottom';
            // Hide DROP 1 button and show DROP 2 button
            drop1Button.classList.add('hidden');
            drop2Button.classList.add('visible');
        } else if (section === 'top' && currentSection === 'bottom') {
            document.body.style.overflow = 'auto';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            currentSection = 'top';
            // Show DROP 1 button and hide DROP 2 button
            drop1Button.classList.remove('hidden');
            drop2Button.classList.remove('visible');
        }
    }

    // Event listeners for button clicks
    drop1Button.addEventListener('click', () => scrollToSection('bottom'));
    drop2Button.addEventListener('click', () => scrollToSection('top'));

    // Prevent scroll events and handle button visibility
    window.addEventListener('scroll', (e) => {
        if (currentSection === 'top') {
            e.preventDefault();
            window.scrollTo(0, 0);
        } else if (currentSection === 'bottom') {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                e.preventDefault();
                window.scrollTo(0, window.innerHeight);
            }
            // Show/hide DROP 2 button based on scroll position
            if (scrollPosition >= window.innerHeight) {
                drop2Button.classList.add('visible');
            } else {
                drop2Button.classList.remove('visible');
            }
        }
    }, { passive: false });

    audioControl.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the image addition
        if (audio.paused) {
            audio.play();
            audioControl.textContent = '[PAUSE]';
        } else {
            audio.pause();
            audioControl.textContent = '[PLAY]';
        }
    });

    const drop1Images = [
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book_2.jpg?v=1743398521',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book_6.jpg?v=1743398521',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book_4.jpg?v=1743398521',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book_7.jpg?v=1743398521',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book_5.jpg?v=1743398521',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book_3.jpg?v=1743398521',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book.jpg?v=1743398521',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/Drop_1_photo_book_8.jpg?v=1743398521'
    ];

    const drop2Images = [
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook5.png?v=1743054119',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook1.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook3.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook2.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook4.png?v=1743054333',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photobook6.png?v=1743054334',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_4.jpg?v=1743311576',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_3.jpg?v=1743311576',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_1.jpg?v=1743311576',
        'https://cdn.shopify.com/s/files/1/0727/6645/6022/files/photo_book_b_w_2.jpg?v=1743311576'
    ];

    const container = document.getElementById('random-images-container');
    const marqueeHeight = document.querySelector('.marquee-container').offsetHeight;

    // Keep track of used images for each section
    let usedDrop1Images = [...drop1Images];
    let usedDrop2Images = [...drop2Images];

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

    function getRandomUnusedImage(imageArray, usedImages) {
        if (usedImages.length === 0) {
            // Reset used images if all have been shown
            usedImages = [...imageArray];
        }
        const randomIndex = Math.floor(Math.random() * usedImages.length);
        const selectedImage = usedImages[randomIndex];
        usedImages.splice(randomIndex, 1);
        return { image: selectedImage, usedImages };
    }

    function addImage(event) {
        // Don't add image if clicking on navigation
        if (event && event.target.closest('.marquee-container')) {
            return;
        }

        const img = document.createElement('img');
        const imageUrls = currentSection === 'top' ? drop2Images : drop1Images;
        const usedImages = currentSection === 'top' ? usedDrop2Images : usedDrop1Images;
        
        const { image, usedImages: updatedUsedImages } = getRandomUnusedImage(imageUrls, usedImages);
        
        // Update the appropriate used images array
        if (currentSection === 'top') {
            usedDrop2Images = updatedUsedImages;
        } else {
            usedDrop1Images = updatedUsedImages;
        }

        img.src = image;
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
