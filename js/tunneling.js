const canvas = document.getElementById("tunnelCanvas");
const ctx = canvas.getContext("2d");

const slider = document.getElementById("energySlider");
const energyValue = document.getElementById("energyValue");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = 350;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let phase = 0;
let energy = 20;

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    const centerX = canvas.width / 2;

    for (let x = 0; x < canvas.width; x++) {

        let y;

        if (x < centerX) {

            y = Math.sin((x + phase) * 0.05) * 60;

        }

        else {

            const transmission = energy / 200;
            y = Math.sin((x + phase) * 0.05) * (20 + transmission * 40);

        }

        if (x === 0) {
            ctx.moveTo(x, canvas.height / 2 - y);
        } else {
            ctx.lineTo(x, canvas.height / 2 - y);
        }
    }

    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.stroke();


    const barrierWidth = 20;
    const barrierX = centerX - barrierWidth / 2;

    const gradient = ctx.createLinearGradient(barrierX, 0, barrierX + barrierWidth, 0);

    gradient.addColorStop(0, "#ff0000");
    gradient.addColorStop(0.5, "#ff4444");
    gradient.addColorStop(1, "#ff0000");

    ctx.shadowBlur = 40;
    ctx.shadowColor = "red";

    ctx.fillStyle = gradient;
    ctx.fillRect(barrierX, 0, barrierWidth, canvas.height);

    ctx.shadowBlur = 0;

    phase += 4;

    requestAnimationFrame(draw);
}

slider.addEventListener("input", () => {

    energy = parseInt(slider.value);
    energyValue.innerText = "Energy = " + energy;

});

draw();