# Data-Driven Content Refactor

This document summarizes the conversion of hardcoded HTML content to CSV-based data files with dynamic rendering.

## Files Created

### Data Files (CSV)
- **`public/data/timeline.csv`** - Timeline events for the home page slideshow (43 events from 2018-2025)
- **`public/data/publications.csv`** - Research publications (19 journal + conference papers)
- **`public/data/resume.csv`** - Resume data (education, awards, experience, grants)

### JavaScript Renderers
- **`public/js/timeline.js`** - Loads timeline.csv and renders slideshow on index.html
- **`public/js/publications.js`** - Loads publications.csv and renders on research.html
- **`public/js/resume.js`** - Loads resume.csv and renders on resume.html

## Pages Updated

### 1. **index.html** (Home Page)
- **Before**: 140+ lines of hardcoded HTML slides
- **After**: Single empty `<div class="slideshow-container"></div>` + `timeline.js`
- **Data Source**: `public/data/timeline.csv`
- **Reduction**: ~95% less HTML code

### 2. **research.html** (Research Page)
- **Before**: 100+ lines of hardcoded publication entries
- **After**: Empty divs for publications and conferences + `publications.js`
- **Data Source**: `public/data/publications.csv`
- **Reduction**: ~90% less HTML code

### 3. **resume.html** (About Page)
- **Before**: 80+ lines of hardcoded education, awards, experience, grants
- **After**: Empty divs + `resume.js`
- **Data Source**: `public/data/resume.csv`
- **Reduction**: ~85% less HTML code

## How to Update Content

### Add a Timeline Event
Edit `public/data/timeline.csv`:
```csv
2025,Mar,Your new event description here
```

### Add a Publication
Edit `public/data/publications.csv`:
```csv
journal,2025,Title of paper,Author names,Venue,https://doi.org/...
```

### Update Resume
Edit `public/data/resume.csv`:
```csv
education,Degree Name,Location,Years,Description
```

## Benefits

✅ **No more hardcoding** - Content is separated from HTML  
✅ **Easier maintenance** - Edit CSV files instead of HTML  
✅ **Reduced file sizes** - HTML files are much smaller  
✅ **Consistent formatting** - Rendering logic is centralized  
✅ **Scalable** - Easy to add hundreds of items  
✅ **Version control friendly** - CSV diffs are readable  

## Technical Details

All scripts use:
- **Fetch API** to load CSV files
- **CSV parsing** with simple string split
- **DOM manipulation** to render content
- **Event grouping** by year for organized display

No external libraries required - pure vanilla JavaScript.

## Contact Page (contact.html)

The contact page uses Formspree for form handling and doesn't have repetitive hardcoded content, so it was not refactored.

## Complete Data Files Summary

| File | Purpose | Records |
|------|---------|---------|
| `timeline.csv` | Home page timeline events | 43 |
| `publications.csv` | Research publications (journals + conferences) | 19 |
| `resume.csv` | Education, awards, experience, grants | 19 |
| `skills.csv` | Technical and language skills | 4 |
| `datasets.csv` | Datasets, reports, presentations | 5 |
| `acknowledgments.csv` | Acknowledgment text and credits | 18 |

**Total: 6 CSV files, 108 data records**

## All Pages Now Data-Driven

✅ **index.html** - Timeline from CSV  
✅ **research.html** - Publications, datasets, acknowledgments from CSV  
✅ **resume.html** - Education, awards, experience, grants, skills from CSV  
✅ **contact.html** - Form-based (no hardcoding needed)  
✅ **tutorial.html** - Iframe-based (no hardcoding needed)
