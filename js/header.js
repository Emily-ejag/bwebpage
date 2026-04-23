document.addEventListener('DOMContentLoaded', function() {
  const headerHTML = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8L4B7J2TSN"><\/script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8L4B7J2TSN');
    <\/script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fuggles&family=Quicksand&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  `;

  const navbarHTML = `
    <div class="navbar">
      <div id="brand">Bryam Astudillo</div>
      <div>
        <a href="index.html" >Home</a>
        <a href="research.html" >Research</a>
        <a href="resume.html" >About</a>
        <a href="contact.html" >Contact</a>
        <a href="tutorial.html" >Knowledge Hub</a>
      </div>
    </div>
  `;

  const headElement = document.querySelector('head');
  if (headElement) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;
    while (tempDiv.firstChild) {
      headElement.appendChild(tempDiv.firstChild);
    }
  }

  const navContainer = document.querySelector('body');
  if (navContainer) {
    const navDiv = document.createElement('div');
    navDiv.innerHTML = navbarHTML;
    navContainer.insertBefore(navDiv.firstChild, navContainer.firstChild);
  }
});
