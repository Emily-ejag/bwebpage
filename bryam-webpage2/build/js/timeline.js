async function loadTimeline() {
  try {
    const response = await fetch('data/timeline.csv');
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    const events = [];
    for (let i = 1; i < lines.length; i++) {
      const [year, month, description] = lines[i].split(',').map(field => field.trim());
      events.push({ year, month, description });
    }

    const slideshowContainer = document.querySelector('.slideshow-container');
    if (!slideshowContainer) return;

    const groupedByYear = {};
    events.forEach(event => {
      if (!groupedByYear[event.year]) {
        groupedByYear[event.year] = [];
      }
      groupedByYear[event.year].push(event);
    });

    const years = Object.keys(groupedByYear).sort((a, b) => b - a);
    
    let slidesHTML = '';
    let dotsHTML = '';

    years.forEach((year, index) => {
      const yearEvents = groupedByYear[year];
      let eventsHTML = `<p class="year">${year}</p>`;
      yearEvents.forEach(event => {
        eventsHTML += `<p>${event.month}. ${event.description}</p>`;
      });

      slidesHTML += `
        <div class="mySlides fade">
          <div class="time">
            ${eventsHTML}
          </div>
        </div>
      `;

      dotsHTML += `<span class="dot" onclick="currentSlide(${index + 1})"></span>`;
    });

    slidesHTML += `
      <a class="prev" onclick="plusSlides(-1)">❮</a>
      <a class="next" onclick="plusSlides(1)">❯</a>
      <br>
      <div style="text-align:center">
        ${dotsHTML}
      </div>
    `;

    slideshowContainer.innerHTML = slidesHTML;

    let slideIndex = 1;
    showSlides(slideIndex);

    window.plusSlides = function(n) {
      showSlides(slideIndex += n);
    };

    window.currentSlide = function(n) {
      showSlides(slideIndex = n);
    };

    function showSlides(n) {
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  } catch (error) {
    console.error('Error loading timeline:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadTimeline);
