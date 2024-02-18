let currentSlide = 0;
const slides = document.querySelectorAll('.slides li');
slides[currentSlide].style.display = 'block'; // Display the first image initially

function nextSlide() {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
    setTimeout(nextSlide, 3000); // Change images every 3 seconds
}

// Start the image rotation
nextSlide();