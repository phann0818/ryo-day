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
