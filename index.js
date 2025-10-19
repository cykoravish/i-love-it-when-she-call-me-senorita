const container = document.getElementById("container");
const song = document.getElementById("song");
const playButton = document.getElementById("playButton");

const lyrics = [
  "I love it when you call me señorita",
  "I wish I could pretend I didn't need ya",
  "But every touch is ooh, la-la-la",
  "It's true, la-la-la",
  "Ooh, I should be running",
  "Ooh, you keep me coming for ya",
];

let isPlaying = false;
let timeoutIds = [];

function delay(ms) {
  let timeoutId;
  const promise = new Promise((resolve) => {
    timeoutId = setTimeout(resolve, ms);
    timeoutIds.push(timeoutId);
  });
  promise.timeoutId = timeoutId;
  return promise;
}

function clearAllTimeouts() {
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
}

async function printLyrics() {
  song.pause();
  song.currentTime = 0;

  container.innerHTML = "";
  if (isPlaying) {
    isPlaying = false;
    clearAllTimeouts();
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  isPlaying = true;
  
  try {
    await song.play();
    console.log("Audio playback started");
  } catch (error) {
    console.error("Audio playback failed:", error);
    playButton.textContent = "Error: Audio Failed";
    setTimeout(() => (playButton.textContent = "Play Lyrics"), 2000);
    isPlaying = false;
    clearAllTimeouts();
    return;
  }

  for (const line of lyrics) {
    if (!isPlaying) break;
    let para = document.createElement("p");
    container.appendChild(para);
    for (const char of line) {
      if (!isPlaying) break;
      para.textContent += char;
      await delay(100);
    }
    if (!isPlaying) break;
    await delay(500);
  }

  isPlaying = false;
  clearAllTimeouts();
}

playButton.addEventListener("click", () => {
  printLyrics();
});
