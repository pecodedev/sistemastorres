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

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var galleryTriggers = Array.prototype.slice.call(document.querySelectorAll(".gallery-trigger"));
  var currentSlide = 0;
  var savedScrollY = 0;

  function lockPageScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + savedScrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  function unlockPageScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, savedScrollY);
  }

  function openLightbox(index) {
    if (!lightbox) return;
    // Sin soporte de <dialog> no hay overlay que mostrar: si bloquearamos el
    // scroll antes de comprobarlo, la pagina quedaria trabada sin ventana.
    if (typeof lightbox.showModal !== "function") return;
    showSlide(index);
    lockPageScroll();
    lightbox.showModal();
  }

  function showSlide(index) {
    var total = galleryTriggers.length;
    if (!total || !lightboxImg) return;
    currentSlide = ((index % total) + total) % total;
    var btn = galleryTriggers[currentSlide];
    var thumb = btn.querySelector("img");
    lightboxImg.src = btn.getAttribute("data-img") || "";
    lightboxImg.alt = thumb ? thumb.alt : "";
    if (lightboxCaption) {
      lightboxCaption.textContent = btn.getAttribute("data-caption") || "";
    }
  }

  galleryTriggers.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      showSlide(currentSlide - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", function (e) {
      e.stopPropagation();
      showSlide(currentSlide + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("close", unlockPageScroll);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.close();
      }
    });

    lightbox.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showSlide(currentSlide - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showSlide(currentSlide + 1);
      }
    });
  }

  if (toggle && menu) {
    function setMenu(abierto) {
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
      toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
      menu.hidden = !abierto;
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }
})();
