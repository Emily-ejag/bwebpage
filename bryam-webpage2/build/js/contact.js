document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(contactForm);

        // Perform client-side validation here if needed

        // Send form data to Formspree
        fetch("https://formspree.io/f/xkndreqd", {
            method: "POST",
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            responseMessage.innerHTML = data;

            // Reset the form
            contactForm.reset();
        })
        .catch(error => {
            responseMessage.innerHTML = "An error occurred.";
        });
    });
});

