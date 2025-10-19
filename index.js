const container = document.getElementById("container");

const lyrics = [
  "I love it when you call me señorita",
  "I wish I could pretend I didn't need ya",
  "But every touch is ooh, la-la-la",
  "It's true, la-la-la",
  "Ooh, I should be running",
  "Ooh, you keep me coming for ya",
];

async function printLyrics() {
  console.log("");
  for (const line of lyrics) {
    for (const char of line) {
      process.stdout.write(char);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    process.stdout.write("\n");
  }
}
printLyrics();
