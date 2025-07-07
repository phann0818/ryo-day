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
    
    // Replace this array with your actual image list
    const sampleImages = [
        // PASTE YOUR 100 IMAGE PATHS HERE
        // Example format:
        // 'collections/image1.jpg',
        // 'collections/image2.png',
        // 'collections/image3.gif',
        // Add all your images here...
         'collections/001.jpg'
        , 'collections/002.jpg'
        , 'collections/003.jpg'
        , 'collections/004.jpg'
        , 'collections/005.jpg'
        , 'collections/006.jpg'
        , 'collections/007.jpg'
        , 'collections/008.jpg'
        , 'collections/009.jpg'
        , 'collections/010.jpg'
        , 'collections/011.jpg'
        , 'collections/012.jpg'
        , 'collections/013.jpg'
        , 'collections/014.jpg'
        , 'collections/015.jpg'
        , 'collections/016.jpg'
        , 'collections/017.jpg'
        , 'collections/018.jpg'
        , 'collections/019.jpg'
        , 'collections/020.jpg'
        , 'collections/021.jpg'
        , 'collections/022.jpg'
        , 'collections/023.jpg'
        , 'collections/024.jpg'
        , 'collections/025.jpg'
        , 'collections/026.jpg'
        , 'collections/027.jpg'
        , 'collections/028.jpg'
        , 'collections/029.jpg'
        , 'collections/030.jpg'  
        , 'collections/031.jpg'
        , 'collections/032.jpg'  
        , 'collections/033.jpg'
        , 'collections/034.jpg'
        , 'collections/035.jpg'
        , 'collections/036.jpg'
        , 'collections/037.jpg'
        , 'collections/038.jpg'
        , 'collections/039.jpg'
        , 'collections/040.jpg'
        , 'collections/041.jpg'
        , 'collections/042.jpg'
        , 'collections/043.jpg'
        , 'collections/044.jpg'
        , 'collections/045.jpg'
        , 'collections/046.jpg'
        , 'collections/047.jpg'
        , 'collections/048.jpg'
        , 'collections/049.jpg'
        , 'collections/050.jpg'
        , 'collections/051.jpg'
        , 'collections/052.jpg'
        , 'collections/053.jpg'
        , 'collections/054.jpg'
        , 'collections/055.jpg'
        , 'collections/056.jpg'
        , 'collections/057.jpg'
        , 'collections/058.jpg'
        , 'collections/059.jpg'
        , 'collections/060.jpg'
    ];

    // Image validation
    const validImages = [];
    
    for (const imagePath of sampleImages) {
        try {
            const img = new Image();
            img.src = imagePath;
            
            await new Promise((resolve) => {
                img.onload = () => {
                    validImages.push(imagePath);
                    resolve();
                };
                img.onerror = () => resolve();
                setTimeout(() => resolve(), 2000);
            });
        } catch (error) {
            console.log(`Could not load image: ${imagePath}`);
        }
    }

    if (validImages.length === 0) {
        loadingMessage.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p style="margin-bottom: 1rem;">No images found in collections folder.</p>
                <p style="font-size: 14px; color: rgba(241, 228, 169, 0.7);">
                    Please add your images to the 'collections' folder and update the image list in script.js
                </p>
            </div>
        `;
        return;
    }

    // Randomize image order
    images = shuffleArray(validImages);
    
    // Remove loading message
    loadingMessage.remove();
    
    // Create slides
    createSlides();
    
    // Start slideshow
    startSlideshow();
}

// Function to create slides
function createSlides() {
    const container = document.querySelector('.slideshow-container');
    const controlsContainer = document.getElementById('slideControls');
    
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
