const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Welcome to Emily's website",
    // "Emily's Page",
    // "Page",
    ":)"
];

const morphTime = 2;
const cooldownTime = 0.05;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(3 / fraction - 3, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.8) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(3 / fraction - 3, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.8) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
    // window.location.replace = "index.html"
    // goToIndex();
    // Check if the animation has finished and if you need to redirect
    if (textIndex >= texts.length) {
        // If all texts have been displayed, redirect to another page
        setTimeout(redirectToAnotherPage, 2800);
    }

}
// function goToIndex(){
//     window.location.replace("./index.html");
// }
function redirectToAnotherPage() {
    window.location.href = 'main.html'; // Replace with your desired URL
}


 animate();

//goToIndex();
// window.location.replace = "./index.html"
// location.reload("index.html");