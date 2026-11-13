/* =========================================================
 * 交互逻辑 —— 一般不用改，改作品请编辑 works.js
 * ========================================================= */

(function () {
  "use strict";

  var works = Array.isArray(window.WORKS) ? window.WORKS : [];

  var grid = document.getElementById("grid");
  var filtersBox = document.getElementById("filters");
  var modal = document.getElementById("modal");
  var modalTitle = document.getElementById("modalTitle");
  var modalOpen = document.getElementById("modalOpen");
  var modalClose = document.getElementById("modalClose");
  var stage = document.getElementById("stage");
  var toast = document.getElementById("toast");
  var typer = document.getElementById("typer");
  var menuBtn = document.getElementById("menuBtn");
  var drawer = document.getElementById("drawer");
  var drawerClose = document.getElementById("drawerClose");
  var toTop = document.getElementById("toTop");
  var hero = document.querySelector(".hero");

  var PLAY_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var lastFocus = null;
  var toastTimer = null;

  /* ---------- 工具 ---------- */

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-on");
    }, 2600);
  }

  function lockBody(locked) {
    document.body.classList.toggle("is-locked", !!locked);
  }

  /* ---------- 渲染作品卡片 ---------- */

  function renderWorks() {
    if (!grid) return;
    var html = "";

    works.forEach(function (w, i) {
      var cover = w.cover
        ? '<img src="' + w.cover + '" alt="' + w.title + ' 的封面" loading="lazy" />'
        : "";
      var tags = '<span>' + (w.category || "") + "</span>" +
        (w.year ? "<span>" + w.year + "</span>" : "") +
        (w.note ? '<span class="badge">' + w.note + "</span>" : "");

      html +=
        '<button class="card reveal" type="button" data-index="' + i + '">' +
          '<span class="thumb" style="--i:' + (i + 1) + '">' +
            '<span class="thumb__idx">' + pad(i + 1) + "</span>" +
            cover +
            '<span class="play" aria-hidden="true">' + PLAY_ICON + "</span>" +
          "</span>" +
          '<span class="card__body">' +
            '<span class="card__row">' +
              '<span class="card__title">' + w.title + "</span>" +
              '<span class="card__meta">' + (w.duration || "") + "</span>" +
            "</span>" +
            '<span class="card__tags">' + tags + "</span>" +
          "</span>" +
        "</button>";
    });

    grid.innerHTML = html;
  }

  /* ---------- 渲染筛选按钮（分类从作品数据里自动收集） ---------- */

  function renderFilters() {
    if (!filtersBox) return;

    var cats = ["全部"];
    works.forEach(function (w) {
      if (w.category && cats.indexOf(w.category) === -1) cats.push(w.category);
    });

    filtersBox.innerHTML = cats
      .map(function (c, i) {
        return (
          '<button class="filter" type="button" role="tab" data-filter="' + c +
          '" aria-selected="' + (i === 0 ? "true" : "false") + '">' + c + "</button>"
        );
      })
      .join("");
  }

  /* ---------- 筛选 ---------- */

  function applyFilter(cat) {
    if (!grid) return;

    Array.prototype.forEach.call(filtersBox.querySelectorAll(".filter"), function (btn) {
      btn.setAttribute("aria-selected", btn.dataset.filter === cat ? "true" : "false");
    });

    Array.prototype.forEach.call(grid.querySelectorAll(".card"), function (card) {
      var w = works[Number(card.dataset.index)];
      var hit = cat === "全部" || (w && w.category === cat);
      card.hidden = !hit;
      if (hit) card.classList.add("is-in");
    });
  }

  /* ---------- 弹层 ---------- */

  function openModal(index) {
    var w = works[index];
    if (!w) return;

    if (!w.url) {
      showToast("《" + w.title + "》还没上传，先在 works.js 里填上 url");
      return;
    }

    lastFocus = document.activeElement;
    modalTitle.textContent = w.title + (w.duration ? " · " + w.duration : "");
    modalOpen.href = w.url;

    // 点击才注入 iframe：不点就不加载，省流量也避免同页多个播放器
    stage.innerHTML =
      '<div class="embed-16x9">' +
        '<iframe src="' + w.url + '" title="' + w.title + '" ' +
          'frameborder="0" scrolling="no" allowfullscreen ' +
          'allow="autoplay; fullscreen; picture-in-picture" ' +
          'referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
      "</div>";

    modal.hidden = false;
    lockBody(true);
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    stage.innerHTML = ""; // 清空 iframe，声音/播放随之停止
    modal.hidden = true;
    lockBody(false);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  /* ---------- 移动端抽屉 ---------- */

  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    requestAnimationFrame(function () {
      drawer.classList.add("is-open");
    });
    menuBtn.setAttribute("aria-expanded", "true");
    lockBody(true);
  }

  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    lockBody(false);
    setTimeout(function () {
      if (!drawer.classList.contains("is-open")) drawer.hidden = true;
    }, 360);
  }

  /* ---------- 打字机 ---------- */

  function typewriter() {
    if (!typer) return;
    var text = "采访 · 拍摄 · 剪辑 · 出镜";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      typer.textContent = text;
      return;
    }

    var i = 0;
    setTimeout(function tick() {
      typer.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 88);
    }, 700);
  }

  /* ---------- 入场动画 ---------- */

  function observeReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    Array.prototype.forEach.call(items, function (el) {
      io.observe(el);
    });
  }

  /* ---------- 事件 ---------- */

  function bindEvents() {
    if (grid) {
      grid.addEventListener("click", function (e) {
        var card = e.target.closest(".card");
        if (card) openModal(Number(card.dataset.index));
      });
    }

    if (filtersBox) {
      filtersBox.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter");
        if (btn) applyFilter(btn.dataset.filter);
      });
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);

    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (modal && !modal.hidden) closeModal();
      if (drawer && !drawer.hidden) closeDrawer();
    });

    if (menuBtn) menuBtn.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);

    if (drawer) {
      drawer.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeDrawer();
      });
    }

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // 首屏滚过之后，移动端菜单按钮换成浅色底，避免白底上看不见
    if (menuBtn && hero) {
      var onScroll = function () {
        var past = window.scrollY > hero.offsetHeight - 80;
        menuBtn.classList.toggle("is-solid", past);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---------- 启动 ---------- */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderFilters();
  renderWorks();
  observeReveals();
  typewriter();
  bindEvents();
})();
