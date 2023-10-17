container.addEventListener("click", function () {
    let audio1 = new Audio();
    audio1.src = "abstract.mp3";
    audio1.crossOrigin = "anonymous";
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // for safari browser
    const container = document.getElementById("container");
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let audioSource = null;
    let analyser = null;

    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1); // creates an audio node from the audio source
    analyser = audioCtx.createAnalyser(); // creates an audio node for analysing the audio data for time and frequency
    audioSource.connect(analyser); // connects the audio source to the analyser. Now this analyser can explore and analyse the audio data for time and frequency
    analyser.connect(audioCtx.destination); // connects the analyser to the destination. This is the speakers
    analyser.fftSize = 128; // controls the size of the FFT. The FFT is a fast fourier transform. Basically the number of sound samples. Will be used to draw bars in the canvas
    const bufferLength = analyser.frequencyBinCount; // the number of data values that dictate the number of bars in the canvas. Always exactly one half of the fft size
    const dataArray = new Uint8Array(bufferLength); // coverting to unsigned 8-bit integer array format because that's the format we need
    const barWidth = canvas.height / 2 / bufferLength; // the width of each bar in the canvas
    
    let x = 0; // used to draw the bars one after another. This will get increased by the width of one bar
    
    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas
        analyser.getByteFrequencyData(dataArray); // copies the frequency data into the dataArray in place. Each item contains a number between 0 and 255
        drawVisualizer({ bufferLength, dataArray, barWidth });
        requestAnimationFrame(animate); // calls the animate function again. This method is built in
    }

    const drawVisualizer = ({ bufferLength, dataArray, barWidth }) => {
        let barHeight;
        let start = Math.floor(canvas.height/2);
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]; // the height of the bar is the dataArray value. Larger sounds will have a higher value and produce a taller bar
            const red = (i * barHeight) / 5;
            const green = i * 4;
            const blue = (barHeight / 4) - 12;
            ctx.fillStyle = `rgb(${blue}, ${green}, ${red})`;// this will start the bars at the center of the canvas and move from right to left
            ctx.fillRect((canvas.width/2) - 1,x + start,-1 * barHeight,-1 * barWidth); // draws the bar. the reason we're calculating Y weird here is because the canvas starts at the top left corner. So we need to start at the bottom left corner and draw the bars from there
            x += barWidth; // increases the x value by the width of the bar
            
        }
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]; // the height of the bar is the dataArray value. Larger sounds will have a higher value and produce a taller bar
            const red = (i * barHeight) / 5;
            const green = i * 4;
            const blue = (barHeight / 4) - 12;
            ctx.fillStyle = `rgb(${blue}, ${green}, ${red})`;
            ctx.fillRect((canvas.width/2) + 1,x-barWidth, barHeight, barWidth); // this will continue moving from left to right
            x += barWidth; // increases the x value by the width of the bar
            
        }

    };

    animate();
});