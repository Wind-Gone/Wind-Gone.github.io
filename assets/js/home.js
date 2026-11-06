/* ==========================================================================
   Wind-Gone · 个人主页交互增强
   - 环境光 / 鼠标柔光
   - 顶部阅读进度条
   - 滚动揭示（IntersectionObserver + 错峰延迟）
   - 返回顶部
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  root.classList.add("wg-js");

  /* ---------------------------------------------------------------- 环境光 */

  function buildAmbient() {
    if (reduceMotion) return;
    var wrap = document.createElement("div");
    wrap.id = "wg-ambient";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = "<i></i><i></i><i></i>";
    document.body.appendChild(wrap);
  }

  function buildGlow() {
    if (reduceMotion || !finePointer) return;
    var glow = document.createElement("div");
    glow.id = "wg-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var x = targetX;
    var y = targetY;
    var ticking = false;

    function render() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        requestAnimationFrame(render);
      } else {
        ticking = false;
      }
    }

    window.addEventListener(
      "mousemove",
      function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        glow.classList.add("is-on");
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(render);
        }
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", function () {
      glow.classList.remove("is-on");
    });
  }

  /* ------------------------------------------------------------ 阅读进度条 */

  function buildProgress() {
    var bar = document.createElement("div");
    bar.id = "wg-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var ticking = false;

    function update() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var ratio = scrollable > 0 ? window.pageYOffset / scrollable : 0;
      bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, ratio)) + ")";
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------- 返回顶部 */

  function buildBackToTop() {
    var btn = document.createElement("button");
    btn.id = "wg-top";
    btn.type = "button";
    btn.title = "Back to top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "&#8593;";
    document.body.appendChild(btn);

    var ticking = false;

    function update() {
      if (window.pageYOffset > 400) {
        btn.classList.add("is-show");
      } else {
        btn.classList.remove("is-show");
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    btn.addEventListener("click", function () {
      var start = window.pageYOffset;
      var startTs = null;
      var duration = reduceMotion ? 0 : 480;

      if (duration === 0) {
        window.scrollTo(0, 0);
        return;
      }

      function step(ts) {
        if (startTs === null) startTs = ts;
        var p = Math.min(1, (ts - startTs) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, start * (1 - eased));
        if (p < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });

    update();
  }

  /* -------------------------------------------------------------- 滚动揭示 */

  function buildReveal() {
    /* 只对确定的文本类块做揭示，避免把第三方脚本注入的 canvas / iframe
       （如 ClustrMaps 访客地图）一起设为 opacity:0 而看不见 */
    var selectors = [
      ".page__content > p",
      ".page__content > ul",
      ".page__content > ol",
      ".page__content > blockquote",
      ".page__content > h1",
      ".page__content > h2",
      ".page__content > h3",
      ".page__content > h4",
      ".page__content > pre",
      ".page__content > table",
      ".page__content > figure",
      ".page__content > hr",
      ".page__content > .wg-hero",
      ".page__title",
      ".sidebar .author__avatar",
      ".sidebar .author__content",
      ".sidebar .author__urls-wrapper"
    ];

    var nodes = [];
    selectors.forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        if (nodes.indexOf(el) === -1) nodes.push(el);
      });
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-in");
      });
      // 仍然挂上 wg-reveal 保持样式一致（此时为可见态）
      nodes.forEach(function (el) {
        el.classList.add("wg-reveal");
      });
      return;
    }

    nodes.forEach(function (el) {
      var parent = el.parentNode;
      var idx = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
      el.style.setProperty("--wg-delay", (idx % 6) * 60 + "ms");
      el.classList.add("wg-reveal");
    });

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

    nodes.forEach(function (el) {
      // 首屏元素直接显示，避免等待回调造成空白
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    });
  }

  /* -------------------------------------------------- 顶栏高度 → CSS 变量 */

  function syncMastheadHeight() {
    var masthead = document.querySelector(".masthead");
    if (!masthead) return;
    var h = Math.round(masthead.getBoundingClientRect().height);
    if (h > 0) root.style.setProperty("--wg-masthead-h", h + "px");
  }

  /* ------------------------------------------------------------------ 打字机 */

  function buildTyping() {
    var el = document.querySelector(".wg-typed");
    if (!el) return;

    var text = el.getAttribute("data-text") || el.textContent || "";
    if (reduceMotion) {
      el.classList.add("is-done");
      return;
    }

    el.textContent = "";
    var i = 0;

    (function step() {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) {
        setTimeout(step, 45);
      } else {
        el.classList.add("is-done");
      }
    })();
  }

  /* ---------------------------------------------------------------- 标题锚点 */

  function buildAnchors() {
    Array.prototype.forEach.call(
      document.querySelectorAll(
        ".page__content h1[id], .page__content h2[id], .page__content h3[id]"
      ),
      function (heading) {
        if (heading.querySelector(".wg-anchor")) return;
        var a = document.createElement("a");
        a.className = "wg-anchor";
        a.href = "#" + heading.id;
        a.textContent = "#";
        a.setAttribute("aria-label", "Permalink");
        heading.appendChild(a);
      }
    );
  }

  /* ------------------------------------------------------------ 图片灯箱 */

  function buildLightbox() {
    var imgs = document.querySelectorAll(
      ".page__content img:not([src*='shields.io'])"
    );
    if (!imgs.length) return;

    var box = document.createElement("div");
    box.id = "wg-lightbox";
    box.innerHTML = '<img alt="">';
    document.body.appendChild(box);

    var boxImg = box.querySelector("img");

    function close() {
      box.classList.remove("is-open");
    }

    Array.prototype.forEach.call(imgs, function (img) {
      if (img.closest && img.closest("a")) return; /* 链接里的图片不劫持 */
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        boxImg.src = img.getAttribute("src") || "";
        boxImg.alt = img.getAttribute("alt") || "";
        box.classList.add("is-open");
      });
    });

    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ------------------------------------------------- 访客数字（不蒜子统计） */

  function buildVisitorsCount() {
    if (!document.getElementById("wg-visitors")) return;

    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
    document.body.appendChild(script);

    /* 6 秒后仍无数字则把卡片降透明度（不显示报错文案） */
    setTimeout(function () {
      var pv = document.getElementById("busuanzi_value_site_pv");
      if (!pv) return;
      var text = (pv.textContent || "").trim();
      if (!text || text === "—") {
        var card = document.getElementById("wg-visitors");
        if (card) card.classList.add("is-offline");
      }
    }, 6000);
  }

  /* ---------------------------------------------------------------- 动画小人 */

  var MASCOT_TIPS = [
    "Hi there 👋",
    "Patience is key in life 🏔",
    "顶部有阅读进度条 →",
    "右上角可以切换深色模式 ☾",
    "数据库内核 / 评测 / LLM 基建 🚀"
  ];

  function buildMascot() {
    var wrap = document.createElement("div");
    wrap.id = "wg-mascot";
    wrap.title = "Say hi 👋";
    wrap.innerHTML =
      '<div class="wg-mascot__bubble">Hi there 👋</div>' +
      '<svg viewBox="0 0 64 64" aria-hidden="true">' +
      '<defs><linearGradient id="wg-mascot-grad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#7ad7ef"/><stop offset="100%" stop-color="#8b7bf0"/>' +
      "</linearGradient></defs>" +
      '<rect class="wg-arm wg-arm--l" x="9" y="33" width="6.5" height="13" rx="3.2" fill="#6fc3dd"/>' +
      '<rect class="wg-arm wg-arm--r" x="48.5" y="33" width="6.5" height="13" rx="3.2" fill="#6fc3dd"/>' +
      '<circle cx="32" cy="32" r="22" fill="url(#wg-mascot-grad)"/>' +
      '<circle cx="17" cy="37" r="3.2" fill="#ffffff" opacity="0.35"/>' +
      '<circle cx="47" cy="37" r="3.2" fill="#ffffff" opacity="0.35"/>' +
      '<circle cx="25" cy="29" r="6" fill="#ffffff"/>' +
      '<circle cx="39" cy="29" r="6" fill="#ffffff"/>' +
      '<circle class="wg-pupil" cx="25" cy="29" r="2.7" fill="#2b3240"/>' +
      '<circle class="wg-pupil" cx="39" cy="29" r="2.7" fill="#2b3240"/>' +
      '<path d="M26.5 38.5q5.5 5 11 0" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"/>' +
      "</svg>";

    document.body.appendChild(wrap);

    var bubble = wrap.querySelector(".wg-mascot__bubble");
    var pupils = wrap.querySelectorAll(".wg-pupil");
    var tipIndex = 0;
    var talkTimer = null;

    /* 眼睛跟随鼠标 */
    if (finePointer && !reduceMotion) {
      window.addEventListener(
        "mousemove",
        function (e) {
          var rect = wrap.getBoundingClientRect();
          var dx = e.clientX - (rect.left + rect.width / 2);
          var dy = e.clientY - (rect.top + rect.height / 2);
          var dist = Math.sqrt(dx * dx + dy * dy) || 1;
          var k = Math.min(1, dist / 320);
          var px = ((dx / dist) * 2.6 * k).toFixed(2);
          var py = ((dy / dist) * 2.6 * k).toFixed(2);
          for (var i = 0; i < pupils.length; i++) {
            pupils[i].setAttribute("transform", "translate(" + px + "," + py + ")");
          }
        },
        { passive: true }
      );
    }

    function say(text) {
      bubble.textContent = text;
      wrap.classList.add("is-talk");
      clearTimeout(talkTimer);
      talkTimer = setTimeout(function () {
        wrap.classList.remove("is-talk");
      }, 2600);
    }

    wrap.addEventListener("click", function () {
      wrap.classList.remove("is-jump");
      void wrap.offsetWidth; /* 重排以重启动画 */
      wrap.classList.add("is-jump");
      tipIndex = (tipIndex + 1) % MASCOT_TIPS.length;
      say(MASCOT_TIPS[tipIndex]);
    });

    wrap.addEventListener("animationend", function (e) {
      if (e.animationName === "wg-jump") wrap.classList.remove("is-jump");
    });
  }

  /* ------------------------------------------------------- 图片型链接去下划线 */

  function markImageLinks() {
    Array.prototype.forEach.call(
      document.querySelectorAll(".page__content a"),
      function (a) {
        if (a.querySelector("img, svg")) a.classList.add("wg-plain");
      }
    );
  }

  function init() {
    syncMastheadHeight();
    buildAmbient();
    buildGlow();
    buildProgress();
    buildBackToTop();
    markImageLinks();
    buildTyping();
    buildAnchors();
    buildLightbox();
    buildVisitorsCount();
    buildMascot();
    buildReveal();
  }

  window.addEventListener("resize", syncMastheadHeight, { passive: true });
  window.addEventListener("load", syncMastheadHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncMastheadHeight);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
