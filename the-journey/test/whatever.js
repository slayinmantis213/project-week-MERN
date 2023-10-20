let audio1 = new Audio();//create audio object
audio1.src = "titanium.mp3";//grab and set source

const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;//just making the visualizer full screen. meh.
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");//grabbing context (current state) of canvas for later use. (set to 2d. 3d is available)

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

audio1.play();//this is auto playing the music from the source

//connect source audio with analyser
audioSource = audioCtx.createMediaElementSource(audio1);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);

//linking audio to visual and setting parameters
analyser.fftSize = 512;
const bufferLength = analyser.frequencyBinCount; //frequenceBinCount is always half of the fftSize
const dataArray = new Uint8Array(bufferLength);
const barWidth = canvas.width / bufferLength;
// We’re setting the fftSize property of our analyzer to 128. 
//This will determine how many data points we collect from the sound. 
//The higher the number, the more data points we get and the more bars we’ll display
//https://blog.logrocket.com/audio-visualizer-from-scratch-javascript/#setting-up-the-project


// visual animations
let x = 0;
function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualizer({
        bufferLength,
        dataArray,
        barWidth
    });
    requestAnimationFrame(animate);
}

const drawVisualizer = ({
    bufferLength,
    dataArray,
    barWidth
}) => {
    let barHeight;
    for (let i = 1; i < bufferLength; i++) {
        barHeight = dataArray[i];
        const red = (i * barHeight) / 10;
        const green = i * 4;
        const blue = barHeight / 4 - 12;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(
            canvas.width / 2 - x, // this will start the bars at the center of the canvas and move from right to left
            canvas.height - barHeight,
            barWidth,
            barHeight
        );
        x += barWidth; // increases the x value by the width of the bar
    }

    for (let i = 1; i < bufferLength; i++) {
        barHeight = dataArray[i];
        const red = (i * barHeight) / 10;
        const green = i * 4;
        const blue = barHeight / 4 - 12;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight); // this will continue moving from left to right
        x += barWidth; // increases the x value by the width of the bar
    }
};

animate();