var queryString = window.location.search;
// Crear un objeto URLSearchParams para manipular los parámetros
var urlParams = new URLSearchParams(queryString);
// Obtener el valor del parámetro 'gif'
var gifValue = urlParams.get('gif');
var songValue = urlParams.get('cancion')
// Utilizar el valor del parámetro 'gif'
const gif = document.getElementById('GIF');
const audio = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const seekBar = document.getElementById('seekBar');
const Descarga = document.getElementById('Descarga');
const volumeSlider = document.getElementById('volumeSlider');

// Reproduccion 
Descarga.setAttribute('href',songValue)
console.log(Descarga.getAttribute('href'))
gif.setAttribute('src',gifValue)
audio.setAttribute('src',songValue)
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

volumeSlider.addEventListener('change', function () {
    audioPlayer.volume = volumeSlider.value;
});