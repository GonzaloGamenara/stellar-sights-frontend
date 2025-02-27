const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;
const depth = 1000;
let speedFactor = 0.2; // Factor de velocidad global

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * depth,
        size: Math.random() * 2 + 1,
        speed: (Math.random() * 2 + 0.5) * speedFactor
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "grey";

    for (let star of stars) {
        const perspective = depth / (depth - star.z);
        const x2D = canvas.width / 2 + star.x * perspective;
        const y2D = canvas.height / 2 + star.y * perspective;
        const size = star.size * perspective;

        if (x2D >= 0 && x2D < canvas.width && y2D >= 0 && y2D < canvas.height) {
            ctx.beginPath();
            ctx.arc(x2D, y2D, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function updateStars() {
    for (let star of stars) {
        star.z += star.speed; 
        if (star.z >= depth) {
            star.z = 0;
            star.x = (Math.random() - 0.5) * canvas.width;
            star.y = (Math.random() - 0.5) * canvas.height;
            star.size = Math.random() * 2 + 1;
            star.speed = (Math.random() * 2 + 0.5) * speedFactor;
        }
    }
}

function setStarSpeed(factor) {
    speedFactor = factor;
    for (let star of stars) {
        star.speed = (Math.random() * 2 + 0.5) * speedFactor;
    }
}

function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.setStarSpeed = setStarSpeed; // Hacer accesible la función globalmente
