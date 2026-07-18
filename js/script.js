(function () {
  "use strict";

  // ---- Sample data (placeholder copy preserved from the mockup) ----
  var TITLES = [
    { title: "Project Inspire", subtitle: "The Unlikely Village", img: "images/project-inspire.jpg", desc: "Description: Dolut la volupta spelitate aceperatem doloratur sim quam ium quatur sit exere vendebi tibusan ihilit dolum", url: "https://example.com/project-inspire" },
    { title: "Meaningful Minute", subtitle: "Neighbors", img: "images/meaningful-minute.jpg", desc: "Description: Dolut la volupta spelitate aceperatem doloratur sim quam ium quatur sit exere vendebi tibusan ihilit dolum", url: "https://example.com/meaningful-minute" },
    { title: "Aish", subtitle: "Terror.  Meet the Heroes", img: "images/aish.jpg", desc: "Description: Dolut la volupta spelitate aceperatem doloratur sim quam ium quatur sit exere vendebi tibusan ihilit dolum", url: "https://example.com/aish" },
    { title: "Ohr Naava", subtitle: "Just One Brick", img: "images/ohr-naava.jpg", desc: "Description: Dolut la volupta spelitate aceperatem doloratur sim quam ium quatur sit exere vendebi tibusan ihilit dolum", url: "https://example.com/ohr-naava" },
    { title: "Chofetz Chaim Heritage Foundation", subtitle: "Hidden", img: "images/cchf.jpg", desc: "Description: Dolut la volupta spelitate aceperatem doloratur sim quam ium quatur sit exere vendebi tibusan ihilit dolum", url: "https://example.com/cchf" },
    { title: "Inkredible Kids", subtitle: "A Family Film", img: "images/inkredible-kids.jpg", desc: "Description: Dolut la volupta spelitate aceperatem doloratur sim quam ium quatur sit exere vendebi tibusan ihilit dolum", url: "https://example.com/inkredible-kids" }
  ];

  var grid = document.getElementById("cardGrid");
  var track = document.getElementById("carTrack");

  function cardHTML(item) {
    var i = TITLES.indexOf(item);
    return (
      '<article class="card">' +
      '  <div class="card__media"><img src="' + item.img + '" alt="' + item.subtitle + '" loading="lazy"></div>' +
      '  <h3 class="card__title">' + item.title + '</h3>' +
      '  <p class="card__subtitle">' + item.subtitle + '</p>' +
      '  <div class="card__actions">' +
      '    <a class="btn btn-watch" href="' + item.url + '" target="_blank" rel="noopener">Watch</a>' +
      '    <button class="btn btn-info" data-info="' + i + '">More Info</button>' +
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
        '<a class="carousel__slide' + (i === 1 ? " is-center" : "") + '" href="' + item.url + '" target="_blank" rel="noopener">' +
        '<img src="' + item.img + '" alt="' + item.subtitle + '" loading="lazy"></a>'
      );
    }).join("");
  }

  renderGrid();
  renderCarousel();

  // ---- More Info modal ----
  var modal = document.getElementById("infoModal");
  var modalImg = document.getElementById("infoModalImg");
  var modalTitle = document.getElementById("infoModalTitle");
  var modalSubtitle = document.getElementById("infoModalSubtitle");
  var modalDesc = document.getElementById("infoModalDesc");
  var modalWatch = document.getElementById("infoModalWatch");

  function openModal(item) {
    modalImg.src = item.img;
    modalImg.alt = item.subtitle;
    modalTitle.textContent = item.title;
    modalSubtitle.textContent = item.subtitle;
    modalDesc.textContent = item.desc;
    modalWatch.href = item.url;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".btn-info");
    if (!btn) return;
    var item = TITLES[Number(btn.dataset.info)];
    if (item) openModal(item);
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

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
