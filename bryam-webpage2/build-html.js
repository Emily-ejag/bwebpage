const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const headerContent = fs.readFileSync(path.join(publicDir, 'includes', 'header.html'), 'utf8');
const navbarContent = fs.readFileSync(path.join(publicDir, 'includes', 'navbar.html'), 'utf8');

const htmlFiles = ['index.html', 'contact.html', 'resume.html', 'research.html', 'tutorial.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>\s*<meta charset/,
    `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8L4B7J2TSN"><\/script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-8L4B7J2TSN');
<\/script>
<meta charset`
  );

  content = content.replace(
    /<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[\d.]+\/css\/font-awesome\.min\.css">\s*<link rel="stylesheet" href="css\//,
    `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${file}`);
});

console.log('HTML files processed successfully!');
