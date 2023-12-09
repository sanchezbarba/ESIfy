var queryString = window.location.search;
// Crear un objeto URLSearchParams para manipular los parámetros
var urlParams = new URLSearchParams(queryString);
// Obtener el valor del parámetro 'gif'
var gifValue = urlParams.get('gif');
var songValue = urlParams.get('cancion');
var posicion = urlParams.get('posicion');

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
const Canciones = [
    ["../img/GIFS/Schubert.gif","../Canciones/Schubert.mp3","Schuber Stabat Mater in F Minor"],
    ["../img/GIFS/Chopin.gif","../Canciones/Chopin.mp3","Etude in C Mayor, Op 10 No:1"],
    ["../img/GIFS/Concertino.gif","../Canciones/Concertino.mp3","Guitar Concertion in A Minor"],
    ["../img/GIFS/Columbia.gif","../Canciones/Columbia.mp3","Columbia"],
    ["../img/GIFS/Primavera.gif","../Canciones/Primavera.mp3","La primavera"],
    ["../img/GIFS/Shakira.gif","../Canciones/Shakira.mp3","Shakira bzrp music sessions"],
    ["../img/GIFS/Supernova.gif","../Canciones/Supernova.mp3","Supernova"],
    ["../img/GIFS/Starboy.gif","../Canciones/Starboy.mp3","Starboy"],
    ["../img/GIFS/Strangers.gif","../Canciones/Strangers.mp3","Strangers"],
    ["../img/GIFS/GodPlans.gif","../Canciones/GodPlans.mp3","God Plans"],
    ["../img/GIFS/TodoDeTi.gif","../Canciones/TodoDeTi.mp3","Todo de Ti"],
    ["../img/GIFS/Meduza.gif","../Canciones/Meduza.mp3","Piece Of Your Heart"]

];


var songTitleElement = document.getElementById('songTitle');
songTitleElement.innerText = Canciones[posicion][2];




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

    cambiarIcono()
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
    cambiarIcono()
});

// volumeSlider.addEventListener('change', function () {
//     audio.volume = volumeSlider.value;

//     // Cambiar el icono según el valor de la barra de volumen
    
// });

var durationElement = document.getElementById("duration");

function initializePlayer() {
    // La información de duración está disponible, inicializa la interfaz según sea necesario
    var durationMinutes = Math.floor(audio.duration / 60);
    var durationSeconds = Math.floor(audio.duration % 60);
    durationElement.innerText = durationMinutes + ":" + (durationSeconds < 10 ? "0" : "") + durationSeconds;
    
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

function cambiarIcono() {
    if (audio.volume == 0) {
        iconoVolumen.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
    } else if (audio.volume < 0.7) {
        iconoVolumen.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    } else {
        iconoVolumen.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}
const Nextbutton = document.getElementById('NextButton');

Nextbutton.addEventListener('click',function(){
    const icon = playPauseButton.querySelector('i');
    if(posicion==11){
        posicion=0;
        gif.setAttribute('src', Canciones[0][0]);
        audio.setAttribute('src', Canciones[0][1]);
        Descarga.setAttribute('href',Canciones[posicion][1]);

        audio.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Canciones[0][2];
        seekBar.value = 0;
    }
    else{
        posicion++;
        gif.setAttribute('src', Canciones[posicion][0]);
        audio.setAttribute('src', Canciones[posicion][1]);
        Descarga.setAttribute('href',Canciones[posicion][1]);

        audio.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Canciones[posicion][2];
        seekBar.value = 0; 
    }

});

const PreviousButton = document.getElementById('PreviousButton');
PreviousButton.addEventListener('click',function(){
    const icon = playPauseButton.querySelector('i');
    if(posicion==0){
        posicion=11;
        gif.setAttribute('src', Canciones[11][0]);
        audio.setAttribute('src', Canciones[11][1]);  
        Descarga.setAttribute('href',Canciones[11][1]);    
        audio.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Canciones[11][2];
        seekBar.value = 0;
    }
    else {
        posicion--;
        gif.setAttribute('src', Canciones[posicion][0]);
        audio.setAttribute('src', Canciones[posicion][1]);
        Descarga.setAttribute('href',Canciones[posicion][1]);
        audio.duration = 0;
        isPlaying = false;
        icon.classList.remove('fa-pause');
		icon.classList.add('fa-play');
        songTitleElement.innerText = Canciones[posicion][2];
        seekBar.value = 0;
        
    }

});


