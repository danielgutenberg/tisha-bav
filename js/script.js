(function () {
  "use strict";

  // ---- Sample data (placeholder copy preserved from the mockup) ----
  var TITLES = [
    { title: "Project Inspire", subtitle: "The Unlikely Village", img: "images/project-inspire.jpg", desc: "", trailer: "https://vimeo.com/1207875700", url: "https://content.jcn.io/pi9avjcn" },
    { title: "Meaningful Minute", subtitle: "Neighbors", img: "images/meaningful-minute.jpg", desc: "", trailer: "https://vimeo.com/1211448347", url: "https://content.jcn.io/mmjcn" },
    { title: "Aish", subtitle: "While We Were Celebrating", img: "images/aish-tisha.png", desc: "", trailer: "https://www.youtube.com/watch?v=JXMc4vVbEj8", url: "https://content.jcn.io/aish9avdom" },
    { title: "Ohr Naava", subtitle: "Just One Brick", img: "images/ohr-naava.jpg", desc: "", trailer: "https://vimeo.com/1211382238", url: "https://content.jcn.io/onjcn" },
    { title: "Torah Anytime", subtitle: "25 Life Changing Hours", img: "images/ta.png", desc: "", url: "https://content.jcn.io/ta9av" },
    { title: "Shuvu", subtitle: "Rav Pam ZT”L: The Heart of a Nation", img: "images/shuvu.jpg", desc: "", url: "https://content.jcn.io/shuvu9avdom" },
    { title: "Chofetz Chaim Heritage Foundation", subtitle: "Hidden", img: "images/cchf.jpg",trailer: "https://vimeo.com/1206602217/63bf679855", desc: "", url: "https://content.jcn.io/cchfjcn" },
    { title: "Inkredible Kids", subtitle: "A Family Film", img: "images/inkredible-kids.jpg", desc: "", url: "https://content.jcn.io/IK9avJCN", trailer: "https://video.wixstatic.com/video/cf0571_b5347004d865462285d2db488279b02c/2160p/mp4/file.mp4" },
    { title: "The Circle", subtitle: "Captive City", img: "images/circle-mag.jpg", desc: "", url: "https://content.jcn.io/XhYai9", trailer: "https://circmag.com/wp-content/uploads/2026/07/Trailer-Updated_3.mp4" },
    { title: "The Lakewood Scoop", subtitle: "Local Tisha B’av Events", img: "images/lakewood-scoop.jpg", desc: "", url: "https://content.jcn.io/LonCXr", btnText: "More Info" },
    { title: "Artscroll", subtitle: "Free Tisha B'av Downloads", img: "images/artscroll.jpg", desc: "", url: "https://content.jcn.io/KlLwqF", btnText: "Download Here" },
    { title: "Living L'Chaim", subtitle: "Letting Go", img: "images/living-lchaim.jpg", desc: "", url: "https://content.jcn.io/Pncwvr", trailer: "https://www.instagram.com/reels/Da9OVCCxn3U/" },
    { title: "Netzoir", subtitle: "Rebuild with Every Word", img: "images/netzoir-3.jpg", desc: "", url: "https://content.jcn.io/16Nrmv", trailer: "" },
    { title: "OU Torah", subtitle: "A Tisha B'av of Meaning and Hope", img: "images/ou.jpg", desc: "", url: "https://content.jcn.io/ou9av", trailer: "" },
    { title: "Chazaq x Amudim", subtitle: "Tisha B’av Marathon", img: "images/chazaq.jpg", desc: "", url: "https://content.jcn.io/chazaq9av", trailer: "" },
    { title: "Yishai Fleisher Presents", subtitle: "Water Source of Holy Temple Discovered in Judea", img: "images/pools.jpg", desc: "", url: "https://content.jcn.io/6Y9sHv", trailer: "" },
    { title: "Yeshiva Beth Yehuda", subtitle: "Kinnos Explained with Rabbi Gershon Miller", img: "images/yby.jpg", desc: "", url: "https://content.jcn.io/dD3l8h", trailer: "" },
    { title: "Toveedo", subtitle: "The Keeper of the Keilim", img: "images/keeper.jpg", desc: "", url: "https://content.jcn.io/SjCSPN", trailer: "https://www.youtube.com/watch?v=7Lez5wFeiPk" },
    { title: "BJX", subtitle: "Life Savers", img: "images/bjx.jpg", desc: "", url: "https://content.jcn.io/bjx9av", trailer: "" },
    { title: "The Loop", subtitle: "Listen! Laugh! Learn!", img: "images/loop.jpg", desc: "", url: "https://content.jcn.io/A0fgVm", trailer: "" },
    { title: "BRS", subtitle: "From Grudges to Geulah", img: "images/brs.jpg", desc: "", url: "https://content.jcn.io/brs9av", trailer: "" },
    { title: "Rabbi Yechiel Spero", subtitle: "The Siddur That Spoke", img: "images/yechiel-spero.jpg", desc: "", url: "https://content.jcn.io/alKr9Y", trailer: "" },
    { title: "Camp Agudah Midwest", subtitle: "Telephone Kinus Hookup", img: "images/agudah.jpg", desc: "", url: "", trailer: "" },
    { title: "Holy Smokes", subtitle: "The Untold Story of the Man Who Found the Ketores", img: "images/hashkifa.jpg", desc: "", url: "https://content.jcn.io/oya9a8", trailer: "" },
    { title: "Chesed 24/7", subtitle: "Pull Strings for Cholim", img: "images/pull-strings.png", desc: "", url: "https://content.jcn.io/GF7lki", trailer: "" },
    { title: "Beyond the Wall", subtitle: "The Call of Geulah", img: "images/beyond-wall.jpg", desc: "", url: "https://content.jcn.io/swHMWr", trailer: "" },
    { title: "Areyvut", subtitle: "Download A Practical Guide for the Nine Days…and Beyond", img: "images/areyvut.jpg", desc: "", url: "https://content.jcn.io/4sMNft", btnText: "Download Here" },
    { title: "Yad L'Achim", subtitle: "Still Standing", img: "images/yad-lachim.jpg", desc: "", url: "https://content.jcn.io/lLVfr6", trailer: ""},
  ];

  var grid = document.getElementById("cardGrid");
  var track = document.getElementById("carTrack");

  // On touch/mobile devices, open Watch links in the SAME tab so the browser
  // Back button returns to this page. On desktop, keep opening in a new tab.
  var SAME_TAB = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  var LINK_ATTR = SAME_TAB ? 'rel="noopener"' : 'target="_blank" rel="noopener"';

  function hasMoreInfo(item) {
    return Boolean(item.trailer || item.desc);
  }

  function cardHTML(item) {
    var i = TITLES.indexOf(item);
    var infoBtn = hasMoreInfo(item)
      ? '    <button class="btn btn-info" data-info="' + i + '">More Info</button>'
      : '';
    var media = item.url
      ? '  <a class="card__media" href="' + item.url + '" ' + LINK_ATTR + '><img src="' + item.img + '" alt="' + item.subtitle + '" loading="lazy"></a>'
      : '  <div class="card__media"><img src="' + item.img + '" alt="' + item.subtitle + '" loading="lazy"></div>';
    var btnLabel = item.btnText || "Watch";
    var watchBtn = item.url
      ? '    <a class="btn btn-watch" href="' + item.url + '" ' + LINK_ATTR + '>' + btnLabel + '</a>'
      : '';
    return (
      '<article class="card">' +
      media +
      '  <h3 class="card__title">' + item.title + '</h3>' +
      '  <p class="card__subtitle">' + item.subtitle + '</p>' +
      '  <div class="card__actions">' +
      watchBtn +
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
        '<a class="carousel__slide' + (i === 1 ? " is-center" : "") + '" href="' + item.url + '" ' + LINK_ATTR + '>' +
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
      var id = vm[1];
      // Preserve the private-video hash from either vimeo.com/ID/HASH or ?h=HASH
      var hash = (url.match(/[?&]h=([\w-]+)/) || url.match(new RegExp("vimeo\\.com/(?:video/)?" + id + "/([\\w-]+)")) || [])[1];
      var src = "https://player.vimeo.com/video/" + id + (hash ? "?h=" + hash : "");
      return '<iframe class="modal__video" src="' + src +
        '" title="Trailer" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    }
    var ig = url.match(/instagram\.com\/(?:reels?|p|tv)\/([\w-]+)/);
    if (ig) {
      return '<iframe class="modal__video modal__video--ig" src="https://www.instagram.com/reel/' + ig[1] +
        '/embed" title="Trailer" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen scrolling="no"></iframe>';
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
      var poster = '<img src="' + escapeAttr(item.img) + '" alt="' + escapeAttr(item.subtitle) + '">';
      modalMedia.innerHTML = item.url
        ? '<a href="' + escapeAttr(item.url) + '" ' + LINK_ATTR + '>' + poster + '</a>'
        : poster;
    }
    modalTitle.textContent = item.title;
    modalSubtitle.textContent = item.subtitle;
    modalDesc.textContent = item.desc || "";
    modalDesc.hidden = !item.desc;
    modalWatch.href = item.url || "#";
    modalWatch.hidden = !item.url;
    modalWatch.textContent = item.btnText || "Watch";
    if (SAME_TAB) modalWatch.removeAttribute("target");
    else modalWatch.setAttribute("target", "_blank");
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
