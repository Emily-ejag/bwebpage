async function loadPublications() {
  try {
    const response = await fetch('data/publications.csv');
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    const publications = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = parseCSVLine(lines[i]);
      publications.push({
        type: parts[0].trim(),
        year: parts[1].trim(),
        title: parts[2].trim(),
        authors: parts[3].trim(),
        venue: parts[4].trim(),
        doi: parts[5] ? parts[5].trim() : ''
      });
    }

    function parseCSVLine(line) {
      const result = [];
      let current = '';
      let insideQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result;
    }

    const journalTab = document.getElementById('publications-tab');
    const conferenceTab = document.getElementById('conferences-tab');

    if (journalTab) {
      const journals = publications.filter(p => p.type === 'journal');
      journalTab.innerHTML = renderPublications(journals, 'Journal Publications');
    }

    if (conferenceTab) {
      const conferences = publications.filter(p => p.type === 'conference');
      conferenceTab.innerHTML = renderPublications(conferences, 'Conference Proceedings');
    }
  } catch (error) {
    console.error('Error loading publications:', error);
  }
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function renderPublications(publications, title) {
  const groupedByYear = {};
  publications.forEach(pub => {
    if (!groupedByYear[pub.year]) {
      groupedByYear[pub.year] = [];
    }
    groupedByYear[pub.year].push(pub);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => b - a);
  
  let html = `<h2 class="context">${title}</h2>`;
  
  years.forEach(year => {
    html += `<p style="font-size: 1.2em; font-weight: 500; margin-top: 20px; margin-bottom: 10px;">${year}</p>`;
    groupedByYear[year].forEach(pub => {
      const authors = pub.authors.replace(/Astudillo, B\./g, '<span class="me">Astudillo, B.</span>');
      html += `
        <p class="enfasis"><strong>${pub.title}</strong></p>
        <p class="authors">${authors}</p>
        <p class="conference">${pub.venue}</p>
      `;
      if (pub.doi) {
        html += `<a style="text-decoration: none; color: #737C8C;" href="${pub.doi}" target="_blank"><p class="conference-link">${pub.doi}</p></a>`;
      }
    });
  });

  return html;
}

document.addEventListener('DOMContentLoaded', loadPublications);
