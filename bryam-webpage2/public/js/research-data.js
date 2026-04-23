async function loadResearchData() {
  await loadPublicationsData();
  loadAcknowledgments();
}

let allPublications = [];

async function loadPublicationsData() {
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

    allPublications = publications;
    renderAllPublications(publications);
    renderDatasets(publications);
  } catch (error) {
    console.error('Error loading publications data:', error);
  }
}

function renderAllPublications(publications) {
  const container = document.getElementById('all-tab');
  if (!container) return;

  const groupedByYear = {};
  publications.forEach(pub => {
    if (!groupedByYear[pub.year]) {
      groupedByYear[pub.year] = [];
    }
    groupedByYear[pub.year].push(pub);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => b - a);
  
  let html = '';
  
  years.forEach(year => {
    html += `<p style="font-size: 1.2em; font-weight: 500; margin-top: 20px; margin-bottom: 10px;">${year}</p>`;
    groupedByYear[year].forEach(pub => {
      const authors = pub.authors.replace(/Astudillo, B\./g, '<span class="me">Astudillo, B.</span>');
      let tagColor = '#4A90E2';
      let tagLabel = 'Journal';
      
      if (pub.type === 'conference') {
        tagColor = '#50C878';
        tagLabel = 'Conference';
      } else if (pub.type === 'dataset') {
        tagColor = '#FF6B6B';
        tagLabel = 'Dataset';
      } else if (pub.type === 'report') {
        tagColor = '#FFB84D';
        tagLabel = 'Report';
      } else if (pub.type === 'presentation') {
        tagColor = '#9B59B6';
        tagLabel = 'Presentation';
      }
      
      html += `
        <p class="enfasis"><strong>${pub.title}</strong></p>
        <p class="authors">${authors}</p>
        <p class="conference">${pub.venue} <span style="background-color: ${tagColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: 500;">${tagLabel}</span></p>
      `;
      if (pub.doi) {
        html += `<a style="text-decoration: none; color: #737C8C;" href="${pub.doi}" target="_blank"><p class="conference-link">${pub.doi}</p></a>`;
      }
    });
  });

  container.innerHTML = html;
}

function renderDatasets(publications) {
  const container = document.getElementById('others-tab');
  if (!container) return;

  let html = '<h2 class="context">Datasets</h2>';
  
  const datasetItems = publications.filter(d => d.type === 'dataset');
  const datasetsByYear = {};
  datasetItems.forEach(item => {
    if (!datasetsByYear[item.year]) {
      datasetsByYear[item.year] = [];
    }
    datasetsByYear[item.year].push(item);
  });
  const datasetYears = Object.keys(datasetsByYear).sort((a, b) => b - a);
  datasetYears.forEach(year => {
    html += `<p style="font-size: 1.2em; font-weight: 500; margin-top: 20px; margin-bottom: 10px;">${year}</p>`;
    datasetsByYear[year].forEach(item => {
      html += `
        <p class="enfasis"><strong>${item.title}</strong></p>
        <p class="authors">${item.authors.replace(/Astudillo, B\./g, '<span class="me">Astudillo, B.</span>')}</p>
        <p class="conference">${item.venue}</p>
      `;
      if (item.doi) {
        html += `<a style="text-decoration: none; color: #737C8C;" href="${item.doi}" target="_blank"><p class="conference-link">${item.doi}</p></a>`;
      }
    });
  });

  html += '<h2 class="context">Reports</h2>';
  const reports = publications.filter(d => d.type === 'report');
  const reportsByYear = {};
  reports.forEach(item => {
    if (!reportsByYear[item.year]) {
      reportsByYear[item.year] = [];
    }
    reportsByYear[item.year].push(item);
  });
  const reportYears = Object.keys(reportsByYear).sort((a, b) => b - a);
  reportYears.forEach(year => {
    html += `<p style="font-size: 1.2em; font-weight: 500; margin-top: 20px; margin-bottom: 10px;">${year}</p>`;
    reportsByYear[year].forEach(item => {
      html += `
        <p class="enfasis"><strong>${item.title}</strong></p>
        <p class="authors">${item.authors.replace(/Astudillo, B\./g, '<span class="me">Astudillo, B.</span>')}</p>
        <p class="conference">${item.venue}</p>
      `;
    });
  });

  html += '<h2 class="context">Other Presentations</h2>';
  const presentations = publications.filter(d => d.type === 'presentation');
  const presentationsByYear = {};
  presentations.forEach(item => {
    if (!presentationsByYear[item.year]) {
      presentationsByYear[item.year] = [];
    }
    presentationsByYear[item.year].push(item);
  });
  const presentationYears = Object.keys(presentationsByYear).sort((a, b) => b - a);
  presentationYears.forEach(year => {
    html += `<p style="font-size: 1.2em; font-weight: 500; margin-top: 20px; margin-bottom: 10px;">${year}</p>`;
    presentationsByYear[year].forEach(item => {
      html += `
        <p class="enfasis"><strong>${item.title}</strong></p>
        <p class="authors">${item.authors.replace(/Astudillo, B\./g, '<span class="me">Astudillo, B.</span>')}</p>
        <p class="conference">${item.venue}</p>
      `;
    });
  });

  container.innerHTML = html;
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

async function loadAcknowledgments() {
  try {
    const response = await fetch('data/acknowledgments.csv');
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    const ackData = {};
    for (let i = 1; i < lines.length; i++) {
      const parts = parseCSVLine(lines[i]);
      const key = parts[0].trim();
      const value = parts.slice(1).join(',').trim();
      ackData[key] = value;
    }

    renderAcknowledgments(ackData);
  } catch (error) {
    console.error('Error loading acknowledgments:', error);
  }
}

function renderAcknowledgments(ackData) {
  const container = document.getElementById('ak-tab');
  if (!container) return;

  let html = '<h2 class="context">Acknowledgment</h2><hr>';
  html += `<p>${ackData.intro}</p><hr>`;
  html += `<p><strong>Scholarships and Fellowships: </strong>${ackData.scholarships}</p><hr>`;
  
  html += `<p><strong>${ackData.project1_title}</strong></p>`;
  html += `<p>${ackData.project1_agency}</p>`;
  html += `<p>${ackData.project1_pi}</p>`;
  
  html += `<p><strong>${ackData.project2_title}</strong></p>`;
  html += `<p>${ackData.project2_agency}</p>`;
  html += `<p>${ackData.project2_grants}</p>`;
  html += `<p>${ackData.project2_pi}</p>`;
  html += `<p>${ackData.project2_copi}</p>`;
  html += `<p>${ackData.project2_collaborators}</p>`;
  html += `<p>Additional support:</p>`;
  html += `<p>${ackData.project2_support}</p>`;
  
  html += '<hr>';
  html += `<p><strong>${ackData.simpson_group}</strong></p>`;
  html += `<p><strong>${ackData.flores_group}</strong></p>`;
  html += `<p><strong>${ackData.blume_colleagues}</strong></p>`;
  
  html += '<hr>';
  html += `<p><strong>Personal Note.</strong></p>`;
  html += `<p>${ackData.personal_note}</p>`;
  html += `<p>${ackData.flores_appreciation}</p>`;
  html += `<p>${ackData.simpson_appreciation}</p>`;
  html += `<p style="justify-content: center; display: flex; font-style: italic;"><strong>${ackData.disclaimer}</strong></p>`;

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', loadResearchData);
