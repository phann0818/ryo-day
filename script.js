// Current active year
let currentYear = 2025
const availableYears = [2024, 2025, 2026]

// Function to go to specific year
function goToYear(year) {
  currentYear = year
  updateActiveButton()

  // Here you would typically navigate to the year's page
  console.log(`Navigating to year: ${year}`)
  // window.location.href = `/wishes/${year}`;
}

// Function to go to previous year
function previousYear() {
  const currentIndex = availableYears.indexOf(currentYear)
  if (currentIndex > 0) {
    currentYear = availableYears[currentIndex - 1]
    updateActiveButton()
    goToYear(currentYear)
  }
}

// Function to go to next year
function nextYear() {
  const currentIndex = availableYears.indexOf(currentYear)
  if (currentIndex < availableYears.length - 1) {
    currentYear = availableYears[currentIndex + 1]
    updateActiveButton()
    goToYear(currentYear)
  }
}

// Update active button styling
function updateActiveButton() {
  // Remove active class from all year buttons
  document.querySelectorAll(".year-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Add active class to current year button
  document.querySelectorAll(".year-btn").forEach((btn) => {
    if (btn.textContent === currentYear.toString()) {
      btn.classList.add("active")
    }
  })
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  const yearButtons = document.querySelectorAll(".year-btn")
  const navArrows = document.querySelectorAll(".nav-arrow")

  // Add click handlers to year buttons
  yearButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const year = Number.parseInt(this.textContent)
      console.log("Year selected:", year)
      goToYear(year)
    })
  })

  // Handle navigation arrows
  navArrows.forEach((arrow) => {
    arrow.addEventListener("click", function () {
      console.log(`Arrow clicked: ${this.classList.contains("nav-arrow-left") ? "Previous" : "Next"}`)
      if (this.classList.contains("nav-arrow-left")) {
        previousYear()
      } else if (this.classList.contains("nav-arrow-right")) {
        nextYear()
      }
    })
  })

  updateActiveButton()
})

// ===== SLIDESHOW FUNCTIONALITY =====

let currentSlide = 0;
let slides = [];
let slideInterval;
let images = [];

// Function to shuffle array (randomize order)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to load images from collections folder
async function loadImagesFromFolder() {
    const container = document.querySelector('.slideshow-container');
    const loadingMessage = document.querySelector('.loading-message');
    
    // Your image list
    const sampleImages = [
        'collections/001.jpeg',
        'collections/002.jpeg',
        'collections/003.jpeg',
        'collections/004.jpeg',
        'collections/005.jpeg',
        'collections/006.jpeg',
        'collections/007.jpeg',
        'collections/008.jpeg',
        'collections/009.jpeg',
        'collections/010.jpeg',
        'collections/011.jpeg',
        'collections/012.jpeg',
        'collections/013.jpeg',
        'collections/014.jpeg',
        'collections/015.jpeg',
        'collections/016.jpeg',
        'collections/017.jpeg',
        'collections/018.jpeg',
        'collections/019.jpeg',
        'collections/020.jpeg',
        'collections/021.jpeg',
        'collections/022.jpeg',
        'collections/023.jpeg',
        'collections/024.jpeg',
        'collections/025.jpeg',
        'collections/026.jpeg',
        'collections/027.jpeg',
        'collections/028.jpeg',
        'collections/029.jpeg',
        'collections/030.jpeg',
        'collections/031.jpeg',
        'collections/032.jpeg',
        'collections/033.jpeg',
        'collections/034.jpeg',
        'collections/035.jpeg',
        'collections/036.jpeg',
        'collections/037.jpeg',
        'collections/038.jpeg',
        'collections/039.jpeg',
        'collections/040.jpeg',
        'collections/041.jpeg',
        'collections/042.jpeg',
        'collections/043.jpeg',
        'collections/044.jpeg',
        'collections/045.jpeg',
        'collections/046.jpeg',
        'collections/047.jpeg',
        'collections/048.jpeg',
        'collections/049.jpeg',
        'collections/050.jpeg',
        'collections/051.jpeg',
        'collections/052.jpeg',
        'collections/053.jpeg',
        'collections/054.jpeg',
        'collections/055.jpeg',
        'collections/056.jpeg',
        'collections/057.jpeg',
        'collections/058.jpeg',
        'collections/059.jpeg',
        'collections/060.jpeg'
    ];

    console.log('Starting to load images...');
    console.log('Total images to check:', sampleImages.length);

    // Improved image validation with better error handling
    const validImages = [];
    let loadedCount = 0;
    
    // Show progress
    if (loadingMessage) {
        loadingMessage.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p>Loading images... (0/${sampleImages.length})</p>
            </div>
        `;
    }

    const imagePromises = sampleImages.map((imagePath, index) => {
        return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => {
                console.log(`✓ Loaded: ${imagePath}`);
                validImages.push(imagePath);
                loadedCount++;
                
                // Update progress
                if (loadingMessage) {
                    loadingMessage.innerHTML = `
                        <div style="text-align: center; padding: 2rem;">
                            <p>Loading images... (${loadedCount}/${sampleImages.length})</p>
                        </div>
                    `;
                }
                resolve(true);
            };
            
            img.onerror = () => {
                console.log(`✗ Failed to load: ${imagePath}`);
                loadedCount++;
                
                // Update progress
                if (loadingMessage) {
                    loadingMessage.innerHTML = `
                        <div style="text-align: center; padding: 2rem;">
                            <p>Loading images... (${loadedCount}/${sampleImages.length})</p>
                        </div>
                    `;
                }
                resolve(false);
            };
            
            // Set timeout to 5 seconds instead of 2
            setTimeout(() => {
                console.log(`⏱ Timeout: ${imagePath}`);
                if (img.complete === false) {
                    loadedCount++;
                    if (loadingMessage) {
                        loadingMessage.innerHTML = `
                            <div style="text-align: center; padding: 2rem;">
                                <p>Loading images... (${loadedCount}/${sampleImages.length})</p>
                            </div>
                        `;
                    }
                    resolve(false);
                }
            }, 5000);
            
            img.src = imagePath;
        });
    });

    // Wait for all images to be checked
    await Promise.all(imagePromises);

    console.log(`Validation complete. Valid images found: ${validImages.length}`);

    if (validImages.length === 0) {
        console.error('No valid images found!');
        if (loadingMessage) {
            loadingMessage.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <p style="margin-bottom: 1rem; color: #ff6b6b;">No images found in collections folder.</p>
                    <p style="font-size: 14px; color: rgba(241, 228, 169, 0.7); margin-bottom: 1rem;">
                        Please check:
                    </p>
                    <ul style="font-size: 14px; color: rgba(241, 228, 169, 0.7); text-align: left; max-width: 300px; margin: 0 auto;">
                        <li>The 'collections' folder exists in the same directory as your HTML file</li>
                        <li>Your images are named 001.jpeg, 002.jpeg, etc.</li>
                        <li>The image files are not corrupted</li>
                        <li>Check the browser console for detailed error messages</li>
                    </ul>
                </div>
            `;
        }
        return;
    }

    // Randomize image order
    images = shuffleArray(validImages);
    
    // Remove loading message
    if (loadingMessage) {
        loadingMessage.remove();
    }
    
    console.log('Creating slides with', images.length, 'images');
    
    // Create slides
    createSlides();
    
    // Start slideshow
    startSlideshow();
}

// Function to create slides
function createSlides() {
    const container = document.querySelector('.slideshow-container');
    const controlsContainer = document.getElementById('slideControls');
    
    if (!container || !controlsContainer) {
        console.error('Slideshow container or controls not found!');
        return;
    }
    
    // Clear existing slides
    slides = [];
    controlsContainer.innerHTML = '';
    
    // Create slides
    images.forEach((imagePath, index) => {
        // Create slide element
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Ryo image ${index + 1}`;
        img.loading = 'lazy';
        
        slide.appendChild(img);
        container.appendChild(slide);
        slides.push(slide);
        
        // Create dot indicator
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        controlsContainer.appendChild(dot);
    });
    
    console.log('Created', slides.length, 'slides');
}

// Function to change slide
function changeSlide(direction) {
    if (slides.length === 0) return;
    
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    
    // Reset auto-advance timer
    resetSlideshow();
}

// Function to go to specific slide
function goToSlide(index) {
    if (slides.length === 0) return;
    
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    
    // Set new slide
    currentSlide = index;
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    
    // Reset auto-advance timer
    resetSlideshow();
}

// Function to start slideshow
function startSlideshow() {
    if (slides.length === 0) return;
    
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

// Function to reset slideshow timer
function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
}

// Initialize slideshow when page loads
document.addEventListener('DOMContentLoaded', loadImagesFromFolder);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left, next slide
        } else {
            changeSlide(-1); // Swipe right, previous slide
        }
    }
}
