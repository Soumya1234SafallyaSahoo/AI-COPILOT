let mediaRecorder;
let audioChunks = [];

document.getElementById("startBtn").addEventListener("click", async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
        let audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        let audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById("audioPlayer").src = audioUrl;

        let formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");

        document.getElementById("status").innerText = "Uploading...";
        let response = await fetch("/upload-audio", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            let result = await response.json();
            document.getElementById("status").innerText = `Uploaded: ${result.filename} (${result.size} bytes)`;
        } else {
            document.getElementById("status").innerText = "Upload failed.";
        }

        audioChunks = [];
    };

    mediaRecorder.start();
    document.getElementById("status").innerText = "Recording...";
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
});

document.getElementById("stopBtn").addEventListener("click", () => {
    mediaRecorder.stop();
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
});
