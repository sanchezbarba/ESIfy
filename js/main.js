const audio = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const seekBar = document.getElementById('seekBar');


// Reproduccion 


let isPlaying = false;

playPauseButton.addEventListener('click', function() {
	const icon = playPauseButton.querySelector('i');
    if (!isPlaying) {
        audio.play();
		icon.classList.remove('fa-play');
		icon.classList.add('fa-pause');
        isPlaying = true;
    } else {
        audio.pause();
		icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        isPlaying = false;
    }
});

audio.addEventListener('timeupdate', function() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    seekBar.value = (currentTime / duration) * 100;
});

seekBar.addEventListener('change', function() {
    const seekTo = audio.duration * (seekBar.value / 100);
    audio.currentTime = seekTo;
});