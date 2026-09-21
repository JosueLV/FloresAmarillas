onload = () =>{
    document.body.classList.remove("container");
};
// ---- Arranque: primero cargan las flores y despues empieza la cancion ----

// 0 = la música empieza apenas terminan las flores
var RETRASO_MUSICA = 0;

// La cancion no arranca sola: la controlamos nosotros
audio.autoplay = false;
audio.removeAttribute("autoplay");
audio.preload = "auto";
if (!audio.paused) audio.pause();

function iniciarCancion() {
  audio.currentTime = 0;
  var intento = audio.play();
  if (intento && intento.catch) {
    // Si el navegador bloquea el audio, empieza con el primer toque en la pantalla
    intento.catch(function () {
      ["click", "touchend", "keydown"].forEach(function (evento) {
        document.addEventListener(
          evento,
          function () {
            audio.play();
          },
          { once: true }
        );
      });
    });
  }
}

var cancionProgramada = false;
function programarCancion() {
  if (cancionProgramada) return;
  cancionProgramada = true;
  setTimeout(iniciarCancion, RETRASO_MUSICA * 1000);
}

// Las flores empiezan a crecer cuando anim.js le quita la clase "container" al body
if (!document.body.classList.contains("container")) {
  programarCancion();
} else {
  var vigia = new MutationObserver(function () {
    if (!document.body.classList.contains("container")) {
      vigia.disconnect();
      programarCancion();
    }
  });
  vigia.observe(document.body, { attributes: true, attributeFilter: ["class"] });
}

// Por si acaso: si a los 3 segundos de cargar la pagina aun no se programo, se programa igual
window.addEventListener("load", function () {
  setTimeout(programarCancion, 3000);
});
function updateLyrics() {
  var time = audio.currentTime;
  var currentLine = null;
  var maxDuration = 9; // máximo que puede quedarse una línea (ajusta si quieres)

  for (var i = 0; i < lyricsData.length; i++) {
    var line = lyricsData[i];
    var nextLine = lyricsData[i + 1];

    // Si estamos dentro del tiempo de esta línea
    if (time >= line.time) {
      // Si hay siguiente línea y aún no llega
      if (nextLine && time < nextLine.time) {
        // Solo la mostramos si no ha pasado demasiado tiempo
        if (time - line.time <= maxDuration) {
          currentLine = line;
        }
        break;
      }
      // Si es la última línea de todas
      if (!nextLine && time - line.time <= maxDuration) {
        currentLine = line;
      }
    }
  }

  if (currentLine) {
    lyrics.style.opacity = 1;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Parte instrumental → se borra
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 100);

// ---- Cuando termina la cancion, vuelve al inicio (Hola Tatiana) ----

// Segundos que espera despues de que termina la cancion antes de desvanecerse
var PAUSA_AL_TERMINAR = 2;

audio.addEventListener("ended", function () {
  setTimeout(function () {
    // Todo se desvanece suavemente y vuelve a index.html
    document.body.style.transition = "opacity 1.5s ease";
    document.body.style.opacity = 0;
    setTimeout(function () {
      window.location.replace("index.html");
    }, 1500);
  }, PAUSA_AL_TERMINAR * 1000);
});