(function () {
  var quotes = [
    "El mejor sistema es el que resuelve el problema real, sin agregar complejidad que nadie pidió.",
    "Cada negocio tiene sus propios procesos. El software debe adaptarse a ellos, no al revés.",
    "Un buen programa no se nota cuando funciona; se nota cuando deja de hacerlo.",
    "La pantalla más útil es la que el operador puede usar sin manual de instrucciones.",
    "Automatizar un mal proceso solo hace que el error sea más rápido.",
    "Menos funciones mal usadas valen más que un menú lleno de opciones que nadie necesita.",
    "El soporte post-entrega es parte del sistema, no un extra opcional.",
    "Elegir la tecnología correcta importa menos que entender cómo trabaja quien la va a usar.",
    "Los reportes que nadie lee no son información: son ruido en disco.",
    "Lo que el cliente pide es el punto de partida; lo que necesita es lo que hay que descubrir juntos."
  ];

  var quoteEl = document.querySelector("#random-quote p");
  if (quoteEl && quotes.length) {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      menu.hidden = open;
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      });
    });
  }
})();
