(function () {
  "use strict";

  // ---- Sample data (placeholder copy preserved from the mockup) ----
  var TITLES = [
    { title: "Project Inspire", subtitle: "The Unlikely Village", img: "images/project-inspire.jpg", desc: "", url: "https://content.jcn.io/pi9avjcn" },
    { title: "Meaningful Minute", subtitle: "Neighbors", img: "images/meaningful-minute.jpg", desc: "", url: "https://content.jcn.io/mmjcn" },
    { title: "Aish", subtitle: "Terror.  Meet the Heroes", img: "images/aish.jpg", desc: "", url: "https://content.jcn.io/aish9avdom" },
    { title: "Ohr Naava", subtitle: "Just One Brick", img: "images/ohr-naava.jpg", desc: "", url: "https://content.jcn.io/onjcn" },
    { title: "Chofetz Chaim Heritage Foundation", subtitle: "Hidden", img: "images/cchf.jpg", desc: "", url: "https://content.jcn.io/cchfjcn" },
    { title: "Inkredible Kids", subtitle: "A Family Film", img: "images/inkredible-kids.jpg", desc: "", url: "https://content.jcn.io/IK9avJCN" }
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
    if (!track) return;
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

  // ---- Carousel arrows ----
  var carTrack = document.getElementById("carTrack");
  var carPrev = document.getElementById("carPrev");
  var carNext = document.getElementById("carNext");
  if (carTrack && carPrev && carNext) {
    carPrev.addEventListener("click", function () {
      carTrack.scrollBy({ left: -320, behavior: "smooth" });
    });
    carNext.addEventListener("click", function () {
      carTrack.scrollBy({ left: 320, behavior: "smooth" });
    });
  }

  // ---- Start viewing → scroll to the top of the video listing ----
  document.getElementById("startViewing").addEventListener("click", function () {
    document.getElementById("cardGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
