let mediaRecorder;
let audioChunks = [];

document.getElementById("startBtn").addEventListener("click", async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        let audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById("audioPlayer").src = audioUrl;
        audioChunks = [];
    };

    mediaRecorder.start();
    document.getElementById("status").innerText = "Recording...";
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
});

document.getElementById("stopBtn").addEventListener("click", () => {
    mediaRecorder.stop();
    document.getElementById("status").innerText = "Recording stopped. Playing back...";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
});
