document.addEventListener('DOMContentLoaded', () => {
    // Music toggle functionality
    const musicButton = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

    // Initially, set the button text and try to pause if it somehow started playing
    if (backgroundMusic.paused) {
        musicButton.textContent = 'Play Music';
    } else {
        musicButton.textContent = 'Pause Music';
        isPlaying = true;
    }

    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicButton.textContent = 'Play Music';
        } else {
            // Attempt to play, handle potential Autoplay Policy restrictions
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Autoplay started!
                    musicButton.textContent = 'Pause Music';
                }).catch(error => {
                    // Autoplay was prevented. Show a "Play" button.
                    console.log("Autoplay prevented:", error);
                    musicButton.textContent = 'Play Music (Click to enable)';
                    // You might want to add a visual cue that it's waiting for user interaction
                });
            }
        }
        isPlaying = !isPlaying;
    });

    // Functionality for video/image galleries (reusable)
    function setupGallery(galleryContainer) {
        const slides = galleryContainer.querySelectorAll('.slide');
        const prevButton = galleryContainer.querySelector('.video-nav.prev');
        const nextButton = galleryContainer.querySelector('.video-nav.next');
        const dots = galleryContainer.querySelectorAll('.video-dot');
        const previewItems = galleryContainer.querySelectorAll('.preview-item');
        let currentSlideIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                // Pause videos when not active
                const iframe = slide.querySelector('iframe');
                if (iframe) {
                    const src = iframe.src;
                    // Reset video to ensure it stops playing
                    iframe.src = src;
                }
            });
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            previewItems.forEach((item, i) => item.classList.toggle('active', i === index));
            currentSlideIndex = index;
        }

        prevButton.addEventListener('click', () => {
            let newIndex = currentSlideIndex - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
        });

        nextButton.addEventListener('click', () => {
            let newIndex = currentSlideIndex + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.slideIndex);
                showSlide(index);
            });
        });

        previewItems.forEach(item => {
            item.addEventListener('click', (event) => {
                // Find the parent preview-item if click is on child elements
                const targetItem = event.target.closest('.preview-item');
                const index = parseInt(targetItem.dataset.slideIndex);
                showSlide(index);
            });
        });

        // Initialize first slide
        showSlide(currentSlideIndex);
    }

    // Apply gallery functionality to all gallery containers
    document.querySelectorAll('.gallery-container').forEach(gallery => {
        setupGallery(gallery);
    });

    // Year navigation functionality (example, can be extended to load content dynamically)
    const yearButtons = document.querySelectorAll('.year-btn');
    yearButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            yearButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Here you would add logic to load content specific to the selected year
            console.log(`Navigating to ${button.textContent} content`);
        });
    });
});
