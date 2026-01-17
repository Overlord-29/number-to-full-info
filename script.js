const input = document.getElementById("numberInput");
const button = document.getElementById("searchBtn");
const progressBox = document.getElementById("progressBox");
const progressFill = document.querySelector(".progress-fill");
const statusText = document.getElementById("statusText");
const result = document.getElementById("result");
const audio = document.getElementById("audio");

const messages = [
  "Initializing request…",
  "Connecting to global database…",
  "Decrypting records…",
  "Matching phone registry…",
  "Finalizing results…"
];

function startLookup() {
  const value = input.value.trim();

  if (!value) {
    alert("Please enter a number");
    return;
  }

  // Reset
  result.classList.add("hidden");
  progressBox.classList.remove("hidden");
  progressFill.style.width = "0%";

  let progress = 0;
  let step = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 8;
    if (progress > 100) progress = 100;

    progressFill.style.width = progress + "%";
    statusText.innerText = messages[step % messages.length];
    step++;

    // Mobile vibration
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    if (progress === 100) {
      clearInterval(interval);

      setTimeout(() => {
        progressBox.classList.add("hidden");
        result.classList.remove("hidden");

        audio.currentTime = 0;
        audio.play();
      }, 600);
    }
  }, 450);
}

button.addEventListener("click", startLookup);

// ENTER key support
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    startLookup();
  }
});
