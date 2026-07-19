(function () {
  "use strict";

  // ---- Sample data (placeholder copy preserved from the mockup) ----
  var TITLES = [
    { title: "Project Inspire", subtitle: "The Unlikely Village", img: "images/project-inspire.jpg", desc: "", trailer: "https://vimeo.com/1207875700", url: "https://content.jcn.io/pi9avjcn" },
    { title: "Meaningful Minute", subtitle: "Neighbors", img: "images/meaningful-minute.jpg", desc: "", url: "https://content.jcn.io/mmjcn" },
    { title: "Aish", subtitle: "Terror.  Meet the Heroes", img: "images/aish.jpg", desc: "", url: "https://content.jcn.io/aish9avdom" },
    { title: "Ohr Naava", subtitle: "Just One Brick", img: "images/ohr-naava.jpg", desc: "", url: "https://content.jcn.io/onjcn" },
    { title: "Chofetz Chaim Heritage Foundation", subtitle: "Hidden", img: "images/cchf.jpg", desc: "", url: "https://content.jcn.io/cchfjcn" },
    { title: "Torah Anytime", subtitle: "25 Life Changing Hours", img: "images/torah-anytime.jpg", desc: "", url: "https://content.jcn.io/ta9av" },
    { title: "Inkredible Kids", subtitle: "A Family Film", img: "images/inkredible-kids.jpg", desc: "", url: "https://content.jcn.io/IK9avJCN", trailer: "https://video.wixstatic.com/video/cf0571_b5347004d865462285d2db488279b02c/2160p/mp4/file.mp4" },
    { title: "The Lakewood Scoop", subtitle: "Tisha B'Av Program", img: "images/lakewood-scoop.jpg", desc: "", url: "https://thelakewoodscoop.com" }
  ];

  var grid = document.getElementById("cardGrid");
  var track = document.getElementById("carTrack");

  function hasMoreInfo(item) {
    return Boolean(item.trailer || item.desc);
  }

  function cardHTML(item) {
    var i = TITLES.indexOf(item);
    var infoBtn = hasMoreInfo(item)
      ? '    <button class="btn btn-info" data-info="' + i + '">More Info</button>'
      : '';
    return (
      '<article class="card">' +
      '  <a class="card__media" href="' + item.url + '" target="_blank" rel="noopener"><img src="' + item.img + '" alt="' + item.subtitle + '" loading="lazy"></a>' +
      '  <h3 class="card__title">' + item.title + '</h3>' +
      '  <p class="card__subtitle">' + item.subtitle + '</p>' +
      '  <div class="card__actions">' +
      '    <a class="btn btn-watch" href="' + item.url + '" target="_blank" rel="noopener">Watch</a>' +
      infoBtn +
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
  var modalMedia = document.getElementById("infoModalMedia");
  var modalTitle = document.getElementById("infoModalTitle");
  var modalSubtitle = document.getElementById("infoModalSubtitle");
  var modalDesc = document.getElementById("infoModalDesc");
  var modalWatch = document.getElementById("infoModalWatch");

  function escapeAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Build a playable embed for a trailer URL (YouTube / Vimeo / direct video file)
  function trailerEmbedHTML(url) {
    var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) {
      return '<iframe class="modal__video" src="https://www.youtube.com/embed/' + yt[1] +
        '?rel=0" title="Trailer" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) {
      return '<iframe class="modal__video" src="https://player.vimeo.com/video/' + vm[1] +
        '" title="Trailer" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    }
    return '<video class="modal__video" src="' + escapeAttr(url) + '" controls playsinline preload="metadata"></video>';
  }

  function openModal(item) {
    if (item.trailer) {
      modalMedia.className = "modal__media modal__media--trailer";
      modalMedia.innerHTML =
        '<p class="modal__trailer-label">Watch Trailer</p>' +
        '<div class="modal__video-wrap">' + trailerEmbedHTML(item.trailer) + '</div>';
    } else {
      modalMedia.className = "modal__media";
      modalMedia.innerHTML =
        '<a href="' + escapeAttr(item.url) + '" target="_blank" rel="noopener">' +
        '<img src="' + escapeAttr(item.img) + '" alt="' + escapeAttr(item.subtitle) + '"></a>';
    }
    modalTitle.textContent = item.title;
    modalSubtitle.textContent = item.subtitle;
    modalDesc.textContent = item.desc || "";
    modalDesc.hidden = !item.desc;
    modalWatch.href = item.url;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    modalMedia.innerHTML = ""; // stop any playing trailer
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
