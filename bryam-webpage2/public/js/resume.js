async function loadResumeData() {
  try {
    const response = await fetch('data/resume.csv');
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      data.push({
        section: parts[0].trim(),
        title: parts[1].trim(),
        location: parts[2].trim(),
        years: parts[3].trim(),
        description: parts[4] ? parts[4].trim() : ''
      });
    }

    renderEducation(data.filter(d => d.section === 'education'));
    renderAwards(data.filter(d => d.section === 'awards'));
    renderExperience(data.filter(d => d.section === 'experience'));
    renderGrants(data.filter(d => d.section === 'grants'));
    loadSkills();
  } catch (error) {
    console.error('Error loading resume data:', error);
  }
}

async function loadSkills() {
  try {
    const response = await fetch('data/skills.csv');
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    const skills = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      skills.push({
        category: parts[0].trim(),
        skills: parts.slice(1).join(',').trim()
      });
    }

    renderSkills(skills);
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}

function renderEducation(items) {
  const container = document.querySelector('.education');
  if (!container) return;
  
  let html = '<h2 class="context">Education</h2>';
  items.forEach(item => {
    html += `
      <p class="enfasis"><strong>${item.title}</strong></p>
      <p class="where">${item.location}</p>
      <p class="year">${item.years}</p>
    `;
  });
  container.innerHTML = html;
}

function renderAwards(items) {
  const container = document.querySelector('.merits');
  if (!container) return;
  
  let html = '<h2 class="context">Merits and Awards</h2>';
  items.forEach(item => {
    if (item.description) {
      html += `<p class="year">${item.description} ${item.location}</p>`;
    } else {
      html += `
        <p class="enfasis"><strong>${item.title}</strong></p>
        <p class="where">${item.location}</p>
        <p class="year">${item.years}</p>
      `;
    }
  });
  container.innerHTML = html;
}

function renderExperience(items) {
  const container = document.querySelector('.work-experience');
  if (!container) return;
  
  let html = '<h2 class="context">Work Experience</h2>';
  items.forEach(item => {
    html += `
      <p class="enfasis"><strong>${item.title}</strong></p>
      <p class="where">${item.location}</p>
      <p class="year">${item.years}</p>
    `;
  });
  container.innerHTML = html;
}

function renderGrants(items) {
  const containers = document.querySelectorAll('.merits');
  if (containers.length < 2) return;
  
  const container = containers[1];
  let html = '<h2 class="context">Travel Grants</h2>';
  items.forEach(item => {
    html += `<p class="year">${item.title}. ${item.location}. ${item.years}.</p>`;
  });
  container.innerHTML = html;
}

function renderSkills(skills) {
  const container = document.querySelector('.skills');
  if (!container) return;
  
  let html = '<h2 class="context">Other Skills</h2>';
  skills.forEach(skill => {
    html += `<p class="enfasis2"><strong>${skill.category}: </strong>${skill.skills}</p>`;
  });
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', loadResumeData);
