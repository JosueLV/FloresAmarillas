// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  // Verse 1
  { text: '<div style="text-align: center;">Por solo tener la oportunidad de ganar tu corazón<br>For just the chance to win your heart</div>', time: 22.0 },
  { text: '<div style="text-align: center;">Podrías fijar la meta más allá de las estrellas<br>You could set the bar beyond the stars</div>', time: 26.8 },
  { text: '<div style="text-align: center;">Haré cualquier cosa<br>I\'ll do anything</div>', time: 33.0 },
  { text: '<div style="text-align: center;">Cualquier cosa que me pidas<br>Anything you ask me to</div>', time: 35.5 },

  // Chorus 1
  { text: '<div style="text-align: center;">Di que quieres la Luna<br>Say you want the Moon</div>', time: 43.0 },
  { text: '<div style="text-align: center;">Mírame aprender a volar<br>Watch me learn to fly</div>', time: 45.8 },
  { text: '<div style="text-align: center;">No hay montaña que puedas señalar<br>Ain\'t no mountain you could point to</div>', time: 48.5 },
  { text: '<div style="text-align: center;">Que yo no subiría<br>I wouldn\'t climb</div>', time: 52.0 },
  { text: '<div style="text-align: center;">Es una locura, pero es verdad<br>It\'s crazy, but it\'s true</div>', time: 54.5 },
  { text: '<div style="text-align: center;">No hay nada que no haría<br>There\'s nothing I won\'t do</div>', time: 57.0 },
  { text: '<div style="text-align: center;">Lo arriesgaría todo por ti<br>I\'d risk it all for you</div>', time: 59.5 },

  // Verse 2
  { text: '<div style="text-align: center;">Tomar tu mano y llamarte mía<br>To hold your hand and call you mine</div>', time: 66.0 },
  { text: '<div style="text-align: center;">Estoy tratando de ser tu hombre hasta el fin de los tiempos<br>I\'m tryna be your man till the end of time</div>', time: 70.0 },
  { text: '<div style="text-align: center;">Ay, haré cualquier cosa<br>Oh, I\'ll do anything</div>', time: 77.0 },
  { text: '<div style="text-align: center;">Cualquier cosa que me pidas<br>Anything you ask me to</div>', time: 79.5 },

  // Chorus 2
  { text: '<div style="text-align: center;">Correría a través del fuego<br>I would run through a fire</div>', time: 86.0 },
  { text: '<div style="text-align: center;">Solo para estar a tu lado<br>Just to be by your side</div>', time: 89.5 },
  { text: '<div style="text-align: center;">Si tu corazón está en peligro<br>If your heart\'s on the line</div>', time: 94.0 },
  { text: '<div style="text-align: center;">Podrías quedarte con el mío<br>You could take mine</div>', time: 97.0 },
  { text: '<div style="text-align: center;">Es una locura, pero es verdad<br>It\'s crazy, but it\'s true</div>', time: 99.0 },
  { text: '<div style="text-align: center;">No hay nada que no haría<br>There\'s nothing I won\'t do</div>', time: 101.0 },
  { text: '<div style="text-align: center;">Lo arriesgaría todo por ti<br>I\'d risk it all for you</div>', time: 104.0 },

  // Bridge
  { text: '<div style="text-align: center;">Cruzaría el mar nadando solo para demostrártelo<br>I would swim across the sea just to show you</div>', time: 112.0 },
  { text: '<div style="text-align: center;">Sacrificaría mi vida solo para abrazarte<br>Sacrifice my life just to hold you</div>', time: 116.5 },
  { text: '<div style="text-align: center;">Podría seguir y seguir<br>I could go on and on</div>', time: 122.0 },
  { text: '<div style="text-align: center;">Para probar que perteneces aquí, en mis brazos<br>To prove that you belong here in my arms</div>', time: 126.0 },

  // Final Chorus
  { text: '<div style="text-align: center;">Di que quieres la Luna<br>Say you want the Moon</div>', time: 154.0 },
  { text: '<div style="text-align: center;">Mírame aprender a volar<br>Watch me learn to fly</div>', time: 156.8 },
  { text: '<div style="text-align: center;">No hay montaña que puedas señalar<br>Ain\'t no mountain you could point to</div>', time: 160.0 },
  { text: '<div style="text-align: center;">Que yo no subiría<br>I wouldn\'t climb</div>', time: 163.0 },
  { text: '<div style="text-align: center;">Es una locura, pero es verdad<br>It\'s crazy, but it\'s true</div>', time: 165.0 },
  { text: '<div style="text-align: center;">No hay nada que no haría<br>There\'s nothing I won\'t do</div>', time: 167.5 },
  { text: '<div style="text-align: center;">Lo arriesgaría todo por ti<br>I\'d risk it all for you</div>', time: 170.0 },

  // Outro
  { text: '<div style="text-align: center;">Es una locura, pero es verdad<br>It\'s crazy, but it\'s true</div>', time: 177.0 },
  { text: '<div style="text-align: center;">No hay nada que no haría<br>There\'s nothing I won\'t do</div>', time: 179.5 },
  { text: '<div style="text-align: center;">Lo arriesgaría todo por ti<br>I\'d risk it all for you</div>', time: 182.5 },
];

// Animar las letras
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

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);