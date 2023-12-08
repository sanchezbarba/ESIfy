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
const iconoVolumen = document.querySelector('.icono-volumen');

ultimoVolumen = 0;
// Reproduccion 
Descarga.setAttribute('href',songValue)
console.log(Descarga.getAttribute('href'))
gif.setAttribute('src',gifValue)
audio.setAttribute('src',songValue)
let isPlaying = false;


iconoVolumen.addEventListener('click', function () {
    // Cambia el valor de la barra de volumen
    if (audio.volume == 0 && ultimoVolumen != 0) {
        audio.volume = ultimoVolumen;
    } else if (ultimoVolumen == 0){
        audio.volume = 0.75
        ultimoVolumen = 0.75
    }
        else {
        audio.volume = 0;
    }

    // Actualiza el valor de la barra de volumen visualmente
    volumeSlider.value = audio.volume;
});

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
    ultimoVolumen = volumeSlider.value
    audioPlayer.volume = ultimoVolumen;
});


var durationElement = document.getElementById("duration");

function initializePlayer() {
    // La información de duración está disponible, inicializa la interfaz según sea necesario
    var durationMinutes = Math.floor(audio.duration / 60);
    var durationSeconds = Math.floor(audio.duration % 60);
    durationElement.innerText = durationMinutes + ":" + (durationSeconds < 10 ? "0" : "") + durationSeconds;
}

function updateTime() {
    var seekPercentage = (audio.currentTime / audio.duration) * 100;
    seekBar.value = seekPercentage;
}

var currentTimeElement = document.getElementById("currentTime");

function updateTime() {
    var seekPercentage = (audio.currentTime / audio.duration) * 100;
    seekBar.value = seekPercentage;

    // Actualiza el tiempo actual de la canción
    var currentMinutes = Math.floor(audio.currentTime / 60);
    var currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeElement.innerText = currentMinutes + ":" + (currentSeconds < 10 ? "0" : "") + currentSeconds;
}