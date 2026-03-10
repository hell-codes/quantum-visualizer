const canvas = document.getElementById("atomCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = 350;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let angle = 0;

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // nucleus
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#00e5ff";
    ctx.fill();

    // orbit
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 1;
    ctx.stroke();

    // electron
    let ex = centerX + 80 * Math.cos(angle);
    let ey = centerY + 80 * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(ex, ey, 6, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // wave
    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {

        let y = centerY + Math.sin((x + angle * 40) * 0.05) * 20;

        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.strokeStyle = "#00e5ff";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00e5ff";
    ctx.stroke();
    ctx.shadowBlur = 0;

    angle += 0.02;

    requestAnimationFrame(draw);
}

draw();