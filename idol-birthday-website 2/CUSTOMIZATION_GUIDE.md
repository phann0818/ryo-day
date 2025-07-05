# Website Customization Guide

## 🎨 How to Edit Each Element

### 1. **Background**
**Location:** `styles.css` - `.background` class
- **Change main color:** Modify `background-color: #22c55e` (currently green)
- **Change pattern:** Adjust the `radial-gradient` values for different dot patterns
- **Remove pattern:** Delete the `background-image` property for solid color

### 2. **Header ("letters to ryo")**
**Location:** `index.html` - `.header-title` and `styles.css`
- **Change text:** Edit `<h1 class="header-title">letters to ryo</h1>`
- **Change colors:** 
  - Border: `.header` - `border: 4px solid #fbbf24`
  - Background: `.header-content` - `background-color: #22c55e`
- **Change font size:** `.header-title` - `font-size: 2rem`

### 3. **Main Title ("リョウへの手紙")**
**Location:** `index.html` - `.main-title`
- **Change text:** Edit `<h2 class="main-title">リョウへの手紙</h2>`
- **Change icons:** Replace `🍀` and `🦭` with your preferred emojis
- **Change colors:** `.main-title-section` - modify background and border colors

### 4. **Main Message Text**
**Location:** `index.html` - `.main-msg` section
- **Edit Japanese text:** Modify the `<p class="japanese-text">` content
- **Edit English text:** Modify the `<p class="english-text">` content
- **Change colors:** 
  - Japanese: `.japanese-text` - `color: #000`
  - English: `.english-text` - `color: #15803d`

### 5. **Year Buttons (2024, 2025, 2026)**
**Location:** `index.html` - `.year-buttons` and `script.js`
- **Add/Remove years:** 
  1. Add button in HTML: `<button class="year-btn button-YEAR" onclick="goToYear(YEAR)">YEAR</button>`
  2. Update `availableYears` array in `script.js`
- **Change colors:** `.year-btn` class in CSS
- **Change active year:** Modify `currentYear = 2025` in `script.js`

### 6. **Navigation Arrows**
**Location:** `index.html` - `.arrow-btn` elements
- **Change arrow symbols:** Replace `‹` and `›` with different symbols
- **Change colors:** `.arrow-btn` class in CSS
- **Disable arrows:** Add `disabled` attribute to buttons

### 7. **"Ryo's moment" Section**
**Location:** `index.html` - `.frame-2` section
- **Change title:** Edit `<h3 class="moment-title">Ryo's moment</h3>`
- **Change icons:** Replace `🍀` and `🦭` emojis
- **Change text color:** `.moment-title` - `color: #fef3c7`

### 8. **Image Gallery Area**
**Location:** `index.html` - `.frame-1` section
- **Add images:** Replace `.gallery-placeholder` with image elements
- **Change placeholder text:** Edit the `<p>` content inside `.gallery-placeholder`
- **Change colors:** `.gallery-container` background and border

### 9. **Footer**
**Location:** `index.html` - `.footer` section
- **Change text:** Edit `<p>from Vietnamese fans</p>`
- **Change colors:** Similar to header styling
- **Change pattern:** Modify `background-image` in `.footer-content`

## 🎯 Color Scheme Customization

### Primary Colors Used:
- **Green shades:** `#22c55e`, `#16a34a`, `#15803d`
- **Yellow shades:** `#fbbf24`, `#f59e0b`, `#d97706`, `#fef3c7`
- **Gray shades:** `#6b7280`, `#374151`, `#9ca3af`

### To Change Color Scheme:
1. **Find and replace** color values throughout `styles.css`
2. **Maintain contrast** between text and background colors
3. **Test on mobile** devices after changes

## 📱 Responsive Design

### Breakpoints:
- **Tablet:** `@media (max-width: 768px)`
- **Mobile:** `@media (max-width: 480px)`

### To Modify Mobile Layout:
1. Adjust font sizes in media queries
2. Change margins and padding for smaller screens
3. Modify flex-direction for better mobile stacking

## 🔧 Adding New Sections

### To Add New Content:
1. **HTML:** Add new section between existing elements
2. **CSS:** Create corresponding styles with consistent naming
3. **JavaScript:** Add any interactive functionality needed

### Example New Section:
\`\`\`html
<section class="new-section">
    <div class="new-content">
        <h3>New Section Title</h3>
        <p>New section content</p>
    </div>
</section>
\`\`\`

## 🎮 Interactive Features

### Current JavaScript Functions:
- `goToYear(year)` - Navigate to specific year
- `previousYear()` - Go to previous year
- `nextYear()` - Go to next year
- `updateActiveButton()` - Update button styling

### To Add New Interactions:
1. Add event listeners in `script.js`
2. Create corresponding functions
3. Update HTML with appropriate `onclick` attributes

## 🚀 Deployment Tips

1. **Test locally** before deploying
2. **Optimize images** for web use
3. **Check mobile responsiveness**
4. **Validate HTML/CSS** for errors
5. **Test JavaScript functionality**

## 📝 File Structure
\`\`\`
project/
├── index.html          (Main HTML structure)
├── styles.css          (All styling)
├── script.js           (Interactive functionality)
└── CUSTOMIZATION_GUIDE.md (This guide)
