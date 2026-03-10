const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

const probCanvas = document.getElementById("probCanvas");
const probCtx = probCanvas.getContext("2d");

const slider = document.getElementById("nSlider");
const nValue = document.getElementById("nValue");

function resizeCanvas() {

    canvas.width = canvas.offsetWidth;
    canvas.height = 350;

    probCanvas.width = probCanvas.offsetWidth;
    probCanvas.height = 350;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function wavefunction(x, n) {
    return Math.sin(n * Math.PI * x);
}


function drawWave(n) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    const padding = 60;

    for (let x = 0; x <= canvas.width; x++) {

        let scaledX = x / canvas.width;
        let psi = wavefunction(scaledX, n);

        let drawY = canvas.height / 2 - psi * (canvas.height / 2 - padding);

        if (x === 0) {
            ctx.moveTo(x, drawY);
        } else {
            ctx.lineTo(x, drawY);
        }
    }

    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 3;

    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00e5ff";

    ctx.stroke();

    ctx.shadowBlur = 0;
}


function drawProbability(n) {

    probCtx.clearRect(0, 0, probCanvas.width, probCanvas.height);
    probCtx.beginPath();

    const padding = 60;

    for (let x = 0; x <= probCanvas.width; x++) {

        let scaledX = x / probCanvas.width;
        let psi = wavefunction(scaledX, n);

        let prob = psi * psi;

        let y = probCanvas.height - prob * (probCanvas.height - padding);

        if (x === 0) {
            probCtx.moveTo(x, y);
        } else {
            probCtx.lineTo(x, y);
        }
    }

    probCtx.strokeStyle = "yellow";
    probCtx.lineWidth = 2;

    probCtx.shadowBlur = 10;
    probCtx.shadowColor = "yellow";

    probCtx.stroke();
    probCtx.shadowBlur = 0;
}


slider.addEventListener("input", () => {

    let n = parseInt(slider.value);

    nValue.innerText = "n = " + n;

    drawWave(n);
    drawProbability(n);
});


drawWave(1);
drawProbability(1);