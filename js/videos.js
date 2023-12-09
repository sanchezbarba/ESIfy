var queryString = window.location.search;
// Crear un objeto URLSearchParams para manipular los parámetros
var urlParams = new URLSearchParams(queryString);
// Obtener el valor del parámetro 'gif'
var mp4Value = urlParams.get('mp4');
var songValue = urlParams.get('cancion');
var posicion = urlParams.get('posicion');

// Utilizar el valor del parámetro 'gif'
const video = document.getElementById('view');
const playPauseButton = document.getElementById('playPauseButton');
const seekBar = document.getElementById('seekBar');
const Descarga = document.getElementById('Descarga');
const volumeSlider = document.getElementById('volumeSlider');
const iconoVolumen = document.querySelector('.icono-volumen');
ultimoVolumen = 0;
// Reproduccion 
Descarga.setAttribute('href',mp4Value)
video.setAttribute('src',mp4Value)
let isPlaying = false;
const Videoclips = [
    ["../Videos/Guetta.mp4","Blue"],
    ["../Videos/Rehab.mp4","All Around The World"],
    ["../Videos/Ritual.mp4","Ritual"],
    ["../Videos/Rasputin.mp4","Rasputin"]

];


var songTitleElement = document.getElementById('songTitle');
songTitleElement.innerText = Videoclips[posicion][1];




iconoVolumen.addEventListener('click', function () {
    // Cambiar el valor del volumen del video
    if (video.volume === 0 && ultimoVolumen !== 0) {
        video.volume = ultimoVolumen;
    } else if (ultimoVolumen === 0){
        video.volume = 0.75;
        ultimoVolumen = 0.75;
    } else {
        video.volume = 0;
    }

    // Actualizar el valor del control deslizante de volumen visualmente
    volumeSlider.value = video.volume;

    cambiarIcono();
});

playPauseButton.addEventListener('click', function() {
	const icon = playPauseButton.querySelector('i');
    if (!isPlaying) {
        video.play();
		icon.classList.remove('fa-play');
		icon.classList.add('fa-pause');
        isPlaying = true;
    } else {
        video.pause();
		icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        isPlaying = false;
    }
});

video.addEventListener('timeupdate', function() {
    const currentTime = video.currentTime;
    const duration = video.duration;
    seekBar.value = (currentTime / duration) * 100;
});

seekBar.addEventListener('change', function() {
    const seekTo = video.duration * (seekBar.value / 100);
    video.currentTime = seekTo;
});

volumeSlider.addEventListener('change', function () {
    ultimoVolumen = volumeSlider.value;
    video.volume = ultimoVolumen;
    cambiarIcono();
});



var durationElement = document.getElementById("duration");

video.onloadedmetadata = function() {
    // Obtener la duración total del video
    var duration = video.duration;

    // Convertir la duración a minutos y segundos
    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.floor(duration % 60);

    // Formatear la duración para mostrarla en el HTML
    var formattedDuration = durationMinutes + ":" + (durationSeconds < 10 ? "0" : "") + durationSeconds;

    // Mostrar la duración en el elemento HTML
    durationElement.innerText = formattedDuration;
};

var currentTimeElement = document.getElementById("currentTime");

video.ontimeupdate = function() {
    var seekPercentage = (video.currentTime / video.duration) * 100;
    seekBar.value = seekPercentage;

    // Actualiza el tiempo actual del video
    var currentMinutes = Math.floor(video.currentTime / 60);
    var currentSeconds = Math.floor(video.currentTime % 60);
    currentTimeElement.innerText = currentMinutes + ":" + (currentSeconds < 10 ? "0" : "") + currentSeconds;
};

function cambiarIcono() {
    if (video.volume == 0) {
        iconoVolumen.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
    } else if (video.volume < 0.7) {
        iconoVolumen.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    } else {
        iconoVolumen.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}

const Nextbutton = document.getElementById('NextButton');

Nextbutton.addEventListener('click',function(){
    const icon = playPauseButton.querySelector('i');
    if(posicion==3){
        posicion=0;
        video.setAttribute('src',Videoclips[0][0]);        
        video.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Videoclips[0][1];
        seekBar.value = 0;
    }
    else{
        posicion++;
        video.setAttribute('src', Videoclips[posicion][0]);
        video.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Videoclips[posicion][1];
        seekBar.value = 0; 
    }

});

const PreviousButton = document.getElementById('PreviousButton');
PreviousButton.addEventListener('click',function(){
    const icon = playPauseButton.querySelector('i');
    if(posicion==0){
        posicion=3;
        video.setAttribute('src', Videoclips[3][0]);
        video.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Videoclips[3][1];
        seekBar.value = 0;
    }
    else {
        posicion--;
        video.setAttribute('src', Videoclips[posicion][0]);
        video.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Videoclips[posicion][1];
        seekBar.value = 0;
        
    }

});

