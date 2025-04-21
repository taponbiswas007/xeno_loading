const audioPlayer = document.getElementById('audioPlayer');
const rangeInput = document.getElementById('customRange');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// 🎵 List your actual MP3 filenames here
const musicFiles = [
  'music/song1.mp3',
  'music/song2.mp3',
  'music/song3.mp3'
];

let currentTrackIndex = 0;

// 🔊 Load saved volume and update gradient
const savedVolume = localStorage.getItem('playerVolume');
if (savedVolume !== null) {
  const fillPercent = parseFloat(savedVolume);
  rangeInput.value = fillPercent;
  audioPlayer.volume = fillPercent / 100;
  rangeInput.style.setProperty('--fill-percent', fillPercent + '%');
  rangeInput.style.setProperty('--highlight-stop', (fillPercent * 0.4) + '%');
} else {
  rangeInput.value = 63.91;
  audioPlayer.volume = 0.6391;
  rangeInput.style.setProperty('--fill-percent', '63.91%');
  rangeInput.style.setProperty('--highlight-stop', '25.56%'); // 40% of 63.91
}

// ▶️ Load and play track
function loadTrack(index) {
  audioPlayer.src = musicFiles[index];
  audioPlayer.play().catch(err => {
    console.warn('Autoplay blocked or failed:', err);
  });
}

// ⏭️ Next track
function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length;
  loadTrack(currentTrackIndex);
}

// ⏮️ Previous track
function playPrevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + musicFiles.length) % musicFiles.length;
  loadTrack(currentTrackIndex);
}

// 🎧 Set volume and update gradient when slider moves
rangeInput.addEventListener('input', function () {
  const volume = parseFloat(this.value);
  audioPlayer.volume = volume / 100;

  // Set custom CSS properties for dynamic gradient
  this.style.setProperty('--fill-percent', volume + '%');
  this.style.setProperty('--highlight-stop', (volume * 0.4) + '%');

  // Save volume to localStorage
  localStorage.setItem('playerVolume', volume);
});

// 🔄 Auto play next when current song ends
audioPlayer.addEventListener('ended', playNextTrack);

// ⏯️ Button listeners
nextBtn.addEventListener('click', playNextTrack);
prevBtn.addEventListener('click', playPrevTrack);

// 🚀 Start playing first song on load
loadTrack(currentTrackIndex);