
(function () {
  var box = document.querySelector(".night .stars");
  if (!box) return;

  var TOTAL = 40; // sube o baja este numero para tener mas o menos estrellas

  for (var i = 0; i < TOTAL; i++) {
    var s = document.createElement("span");
    var esPunto = Math.random() < 0.35;

    s.className = "star" + (esPunto ? " star--dot" : "");

    // Tamano en vmin: las estrellas son mas grandes que los puntitos
    var size = esPunto ? 0.5 + Math.random() * 0.8 : 1.6 + Math.random() * 2.8;

    s.style.left = Math.random() * 100 + "%";
    s.style.setProperty("--size", size + "vmin");
    s.style.setProperty("--dur", 9 + Math.random() * 11 + "s"); // cuanto tarda en caer
    s.style.setProperty("--delay", -Math.random() * 20 + "s"); // negativo: ya vienen cayendo al cargar
    s.style.setProperty("--drift", Math.random() * 16 - 8 + "vmin"); // movimiento de lado
    s.style.setProperty("--o", (0.45 + Math.random() * 0.5).toFixed(2)); // que tan visible es
    s.style.setProperty(
      "--spin",
      (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 360) + "deg"
    );

    box.appendChild(s);
  }
})();
