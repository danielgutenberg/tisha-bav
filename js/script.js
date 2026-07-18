(function () {
  "use strict";

  // ---- Sample data (placeholder copy preserved from the mockup) ----
  var TITLES = [
    { title: "Project Inspire", subtitle: "The Unlikely Village", img: "images/project-inspire.jpg" },
    { title: "Meaningful Minute", subtitle: "Neighbors", img: "images/meaningful-minute.jpg" },
    { title: "Aish", subtitle: "Terror.  Meet the Heroes", img: "images/aish.jpg" },
    { title: "Project Inspire", subtitle: "The Unlikely Village", img: "images/card-unlikely-village.jpg" },
    { title: "Project Inspire", subtitle: "The Unlikely Village", img: "images/card-unlikely-village.jpg" },
    { title: "Inkredible Kids", subtitle: "A Family Film", img: "images/inkredible-kids.jpg" }
  ];
  var DESC = "Description: Dolut la volupta spelitate aceperatem doloratur sim quam ium quatur sit exere vendebi tibusan ihilit dolum";

  var grid = document.getElementById("cardGrid");
  var track = document.getElementById("carTrack");

  function cardHTML(item) {
    return (
      '<article class="card">' +
      '  <div class="card__media"><img src="' + item.img + '" alt="' + item.subtitle + '" loading="lazy"></div>' +
      '  <h3 class="card__title">' + item.title + '</h3>' +
      '  <p class="card__subtitle">' + item.subtitle + '</p>' +
      '  <p class="card__desc">' + DESC + '</p>' +
      '  <div class="card__actions">' +
      '    <button class="btn btn-watch">Watch</button>' +
      '    <button class="btn btn-info">More Info</button>' +
      '  </div>' +
      '</article>'
    );
  }

  function renderGrid() {
    grid.innerHTML = TITLES.map(cardHTML).join("");
  }

  function renderCarousel() {
    track.innerHTML = TITLES.map(function (item, i) {
      return (
        '<div class="carousel__slide' + (i === 1 ? " is-center" : "") + '">' +
        '<img src="' + item.img + '" alt="' + item.subtitle + '" loading="lazy"></div>'
      );
    }).join("");
  }

  renderGrid();
  renderCarousel();

  // ---- Menu toggle (Sort / Contact / About) ----
  var menuToggle = document.getElementById("menuToggle");
  var menuPanel = document.getElementById("menuPanel");
  menuToggle.addEventListener("click", function () {
    var isOpen = menuPanel.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!menuPanel.contains(e.target) && !menuToggle.contains(e.target)) {
      menuPanel.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Sort options (Featured / Newest / A-Z) — placeholder behavior: re-render in given order
  menuPanel.querySelectorAll("[data-sort]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var sortType = link.dataset.sort;
      var sorted = TITLES.slice();
      if (sortType === "az") {
        sorted.sort(function (a, b) { return a.subtitle.localeCompare(b.subtitle); });
      } else if (sortType === "newest") {
        sorted.reverse();
      }
      grid.innerHTML = sorted.map(cardHTML).join("");
      menuPanel.classList.remove("is-open");
    });
  });

  // ---- Carousel arrows ----
  var carTrack = document.getElementById("carTrack");
  document.getElementById("carPrev").addEventListener("click", function () {
    carTrack.scrollBy({ left: -320, behavior: "smooth" });
  });
  document.getElementById("carNext").addEventListener("click", function () {
    carTrack.scrollBy({ left: 320, behavior: "smooth" });
  });

  // ---- Start viewing → scroll to the top of the video listing ----
  document.getElementById("startViewing").addEventListener("click", function () {
    document.getElementById("cardGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ---- Contact form (front-end only demo) ----
  var form = document.getElementById("contactForm");
  var success = document.getElementById("contactSuccess");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    success.hidden = false;
    form.reset();
  });
})();
