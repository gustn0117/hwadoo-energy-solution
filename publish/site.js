/*!
 * 화두에너지솔루션 — 퍼블리싱 스크립트
 * 의존성 없는 순수 JS. 아래 기능이 모두 이 한 파일에 들어 있습니다.
 *   1) 스크롤 등장 효과   2) 헤더 전체메뉴/햄버거   3) FAQ 아코디언
 *   4) 브랜드 무한 슬라이드  5) 숫자 카운트업        6) 상담 팝업
 *   7) 주소 검색 → 팝업     8) TOP 버튼            9) 게시판 검색/필터/더보기
 *   10) 충전사업자 순위 전환 · 전체보기 팝업  11) 약관 팝업
 *   12) 순위 팝업 표 열기/접기(모바일)  13) 설치 상담 3단계 이동
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 설치 상담은 단계마다 파일이 따로 있습니다 (PHP 에서 한 화면으로 합치셔도 됩니다)
  var CONSULT = {
    step1: "/sub/consult/index.html",
    found: "/sub/consult/step1-found.html",
    step2: "/sub/consult/step2.html",
    step3: "/sub/consult/step3.html"
  };

  /* ------------------------------------------------------------------
     1) 스크롤 등장 — [data-reveal], [data-reveal-group] > *
     ------------------------------------------------------------------ */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("reveal");

    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty("--reveal-delay", Math.min(i, 8) * 110 + "ms");
      });
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal], [data-reveal-group] > *").forEach(function (el) {
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     2) 헤더 — PC 전체메뉴(마우스오버), 모바일 햄버거
     ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector(".hd");
    if (!header) return;
    var nav = header.querySelector(".hd__nav");
    var burger = header.querySelector(".hd__burger");
    var dim = header.querySelector(".hd__dim");
    var mega = header.querySelector(".hd__mega");

    function setMega(on) {
      header.setAttribute("data-mega", on ? "true" : "false");
      if (mega) {
        mega.setAttribute("aria-hidden", on ? "false" : "true");
        if (on) mega.removeAttribute("inert");
        else mega.setAttribute("inert", "");
      }
      nav && nav.querySelectorAll("a[aria-haspopup]").forEach(function (a) {
        a.setAttribute("aria-expanded", on ? "true" : "false");
      });
    }
    function setOpen(on) {
      header.setAttribute("data-open", on ? "true" : "false");
      if (burger) {
        burger.setAttribute("aria-expanded", on ? "true" : "false");
        burger.setAttribute("aria-label", on ? "메뉴 닫기" : "메뉴 열기");
      }
    }
    function closeAll() {
      setMega(false);
      setOpen(false);
    }

    setMega(false);
    setOpen(false);

    if (nav) {
      nav.addEventListener("mouseenter", function () { setMega(true); });
      nav.addEventListener("focusin", function () { setMega(true); });
    }
    if (mega) mega.addEventListener("mouseenter", function () { setMega(true); });
    header.addEventListener("mouseleave", function () { setMega(false); });
    if (dim) {
      dim.addEventListener("click", closeAll);
      dim.addEventListener("mouseenter", function () { setMega(false); });
    }
    if (burger) {
      burger.addEventListener("click", function () {
        setOpen(header.getAttribute("data-open") !== "true");
      });
    }
    // 메뉴 안의 링크를 누르면 닫는다
    header.querySelectorAll(".hd__nav a, .hd__mega a").forEach(function (a) {
      a.addEventListener("click", closeAll);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  }

  /* ------------------------------------------------------------------
     3) FAQ 아코디언 — 플러스가 45° 돌아 ×, 답변 높이 전환
     ------------------------------------------------------------------ */
  function initFaq() {
    document.querySelectorAll(".faq__list").forEach(function (list) {
      var items = Array.prototype.slice.call(list.querySelectorAll(".faq__item"));
      items.forEach(function (item) {
        var btn = item.querySelector("button");
        var panel = item.querySelector(".faq__panel");
        if (!btn) return;
        var open = item.getAttribute("data-open") === "true";
        apply(item, btn, panel, open);
        btn.addEventListener("click", function () {
          var next = item.getAttribute("data-open") !== "true";
          items.forEach(function (other) {
            if (other === item) return;
            apply(other, other.querySelector("button"), other.querySelector(".faq__panel"), false);
          });
          apply(item, btn, panel, next);
        });
      });
    });

    function apply(item, btn, panel, on) {
      item.setAttribute("data-open", on ? "true" : "false");
      if (btn) btn.setAttribute("aria-expanded", on ? "true" : "false");
      if (panel) {
        if (on) panel.removeAttribute("inert");
        else panel.setAttribute("inert", "");
      }
    }
  }

  /* ------------------------------------------------------------------
     4) 브랜드 무한 슬라이드
        마크업의 카드는 [복제·원본·복제] 3세트이며, 스크립트가 위치를 잡습니다.
        카드를 늘리고 줄이실 때는 세 세트의 개수를 똑같이 맞춰 주세요.
     ------------------------------------------------------------------ */
  function initBrands() {
    var track = document.querySelector(".brands__track");
    if (!track) return;
    var cards = track.children;
    var total = cards.length;
    var n = Math.round(total / 3); // 한 세트의 카드 수
    if (!n) return;

    var index = n;      // 가운데(원본) 세트의 첫 카드
    var step = 0;
    var busy = false;

    function measure() {
      var card = cards[0];
      if (!card) return;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      step = card.offsetWidth + gap;
      place(false);
    }
    function place(animate) {
      track.style.transition = animate && !reduceMotion ? "" : "none";
      track.style.transform = "translate3d(" + -index * step + "px, 0, 0)";
      if (!animate || reduceMotion) {
        // 다음 프레임에 전환 효과를 되살린다
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { track.style.transition = ""; });
        });
      }
    }
    function toMiddle(i) { return (((i - n) % n) + n) % n + n; }
    function settle() {
      busy = false;
      if (index < n || index >= n * 2) {
        index = toMiddle(index);
        place(false);
      }
    }
    function move(d) {
      if (busy || !d || !step) return;
      if (reduceMotion) { index = toMiddle(index + d); place(false); return; }
      busy = true;
      index += d;
      place(true);
      window.setTimeout(function () { if (busy) settle(); }, 900);
    }

    track.addEventListener("transitionend", function (e) {
      if (e.propertyName === "transform" && busy) settle();
    });

    var prev = document.querySelector(".brands__ctrl .round--dark");
    var next = document.querySelector(".brands__ctrl .round:not(.round--dark)");
    if (prev) prev.addEventListener("click", function () { move(-1); });
    if (next) next.addEventListener("click", function () { move(1); });

    // 터치·마우스로 밀어서 넘기기
    var startX = null;
    var viewport = document.querySelector(".brands__viewport") || track;
    viewport.addEventListener("pointerdown", function (e) { startX = e.clientX; });
    viewport.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
    });
    viewport.addEventListener("pointercancel", function () { startX = null; });

    measure();
    if ("ResizeObserver" in window) new ResizeObserver(measure).observe(track);
    else window.addEventListener("resize", measure);
  }

  /* ------------------------------------------------------------------
     5) 실적 숫자 카운트업 — .num 안의 숫자가 0부터 올라간다
     ------------------------------------------------------------------ */
  function initCountUp() {
    var targets = document.querySelectorAll(".stats__list dd.num");
    if (!targets.length || reduceMotion || !("IntersectionObserver" in window)) return;

    targets.forEach(function (el) {
      var text = el.textContent.trim();
      var target = Number(text.replace(/\D/g, ""));
      if (!target) return;
      el.textContent = "0";

      var io = new IntersectionObserver(
        function (entries) {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          var start = performance.now();
          var duration = 1600;
          (function tick(now) {
            var t = Math.min(1, (now - start) / duration);
            var eased = 1 - Math.pow(1 - t, 4);
            el.textContent = Math.round(target * eased).toLocaleString("en-US");
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = text;
          })(start);
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     6) 상담 팝업
        href="/#consult" 인 링크를 누르면 열립니다.
        폼 action 이 비어 있으면 완료 메시지만 보여 줍니다 —
        PHP 연동 시 .cmodal__form 에 action 과 method 를 넣어 주세요.
     ------------------------------------------------------------------ */
  function initConsult() {
    var modal = document.querySelector(".cmodal");
    if (!modal) return;
    var form = modal.querySelector(".cmodal__form");
    var done = modal.querySelector(".cmodal__done");

    function open(prefill) {
      if (form) {
        form.hidden = false;
        if (prefill) {
          Object.keys(prefill).forEach(function (k) {
            var field = form.elements[k];
            if (field && prefill[k]) field.value = prefill[k];
          });
        }
      }
      if (done) done.hidden = true;
      if (modal.showModal) modal.showModal();
    }
    function close() { modal.close && modal.close(); }

    // 팝업을 여는 링크들
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      var href = a.getAttribute("href") || "";
      if (href === "/#consult" || href === "#consult" || /\/index\.(html|php)#consult$/.test(href)) {
        e.preventDefault();
        open(null);
      }
    });

    var closeBtn = modal.querySelector(".cmodal__close");
    if (closeBtn) closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    if (done) {
      var ok = done.querySelector("button");
      if (ok) ok.addEventListener("click", close);
      done.hidden = true;
    }

    // 메인 상담 폼 → 입력값을 팝업으로 넘김
    var main = document.querySelector("form.consult");
    if (main) {
      main.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(main);
        open({ cpo: fd.get("cpo"), building: fd.get("building"), name: fd.get("name"), address: fd.get("address") });
      });
    }

    // 팝업 폼 전송 — action 이 비어 있을 때만 화면에서 처리
    if (form) {
      form.addEventListener("submit", function (e) {
        if (form.getAttribute("action")) return; // PHP 로 그대로 전송
        e.preventDefault();
        if (form.elements.website && form.elements.website.value) return; // 봇 차단
        form.hidden = true;
        if (done) done.hidden = false;
      });
    }
  }

  /* ------------------------------------------------------------------
     7) 주소 검색 → 상담 팝업
        action 을 지정하시면 그 주소로 일반 폼 전송이 됩니다.
     ------------------------------------------------------------------ */
  function initFinder() {
    var form = document.querySelector("form.finder__bar");
    if (!form) return;
    var modal = document.querySelector(".amodal");
    form.addEventListener("submit", function (e) {
      if (form.getAttribute("action")) return;
      e.preventDefault();
      if (!modal) return;
      // 팝업의 다음 버튼은 설치 상담 2단계로 보낸다
      var next = modal.querySelector(".cw__next");
      if (next) next.setAttribute("href", CONSULT.step2);
      if (modal.showModal) modal.showModal();
    });
    if (modal) {
      var close = modal.querySelector(".amodal__close");
      if (close) close.addEventListener("click", function () { modal.close(); });
      modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
    }
  }

  /* ------------------------------------------------------------------
     8) TOP 버튼
     ------------------------------------------------------------------ */
  function initTop() {
    var btn = document.querySelector(".dock__top");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     9) 게시판 — 검색/필터/더보기
        카드형(프로모션·설치사례), FAQ 아코디언, 공지 목록을 모두 같은 방식으로 다룹니다.
        정적 화면 확인용의 단순 동작입니다.
        실제 서비스에서는 PHP 에서 조건 검색과 페이징을 처리하시고,
        이 블록은 그대로 두거나 지우셔도 됩니다.
     ------------------------------------------------------------------ */
  function initBoard() {
    var grid = document.querySelector(".board__grid, .board .faq__list, .board .pg-list");
    if (!grid) return;
    var items = Array.prototype.slice.call(grid.children);
    var count = document.querySelector(".board__count b");
    var moreWrap = document.querySelector(".board__more");
    var moreBtn = moreWrap ? moreWrap.querySelector("button") : null;
    var step = items.length;
    var shown = items.length;
    var touched = false; // 검색·필터를 쓰기 전에는 더보기 버튼을 그대로 둔다 (PHP 페이징 자리)

    function apply() {
      var search = document.getElementById("board-q");
      var q = (search ? search.value : "").trim().toLowerCase();
      var selects = Array.prototype.slice.call(document.querySelectorAll(".board__filters select"));
      var matched = 0;
      items.forEach(function (li) {
        var text = li.textContent.toLowerCase();
        var ok =
          (!q || text.indexOf(q) > -1) &&
          selects.every(function (s) { return !s.value || text.indexOf(s.value.toLowerCase()) > -1; });
        if (ok) matched++;
        li.hidden = !ok || matched > shown;
      });
      if (count) count.textContent = String(matched);
      if (moreWrap) moreWrap.style.display = !touched || matched > shown ? "" : "none";
    }

    var search = document.getElementById("board-q");
    if (search) search.addEventListener("input", function () { touched = true; shown = step; apply(); });
    document.querySelectorAll(".board__filters select").forEach(function (s) {
      s.addEventListener("change", function () { touched = true; shown = step; apply(); });
    });
    if (moreBtn) moreBtn.addEventListener("click", function () { touched = true; shown += step; apply(); });
    apply();
  }

  /* ------------------------------------------------------------------
     11) 약관 팝업 — 푸터의 이용약관 / 개인정보처리방침
        두 문서가 모두 들어 있고, data-kind 값으로 보이는 쪽만 바뀝니다.
     ------------------------------------------------------------------ */
  function initLegal() {
    var modal = document.querySelector(".lmodal");
    if (!modal) return;
    document.querySelectorAll("[data-legal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        modal.setAttribute("data-kind", btn.getAttribute("data-legal"));
        if (modal.showModal) modal.showModal();
      });
    });
    var close = modal.querySelector(".lmodal__close");
    if (close) close.addEventListener("click", function () { modal.close(); });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
  }

  /* ------------------------------------------------------------------
     12) 순위 팝업 표 — 모바일에서 제목을 눌러 열었다 접었다
        PC 에서는 CSS 가 항상 펼쳐 두므로 이 동작이 화면에 드러나지 않습니다.
     ------------------------------------------------------------------ */
  function initRankTables() {
    document.querySelectorAll(".rtable__toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var box = btn.closest(".rtable");
        var open = box.hasAttribute("data-open");
        if (open) box.removeAttribute("data-open");
        else box.setAttribute("data-open", "");
        btn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    });
  }

  /* ------------------------------------------------------------------
     10) 충전사업자 순위 — 운영대수/충전요금 전환, 전체보기 팝업
        값은 마크업의 data-count / data-price 에서 읽습니다.
     ------------------------------------------------------------------ */
  function initRanking() {
    var section = document.querySelector(".rank");
    if (!section) return;

    // 운영대수 / 충전요금 전환 — 값은 전체보기 팝업의 표에서 사업자명으로 찾아 쓴다
    var tabs = Array.prototype.slice.call(section.querySelectorAll(".rank__metric button"));
    var rows = Array.prototype.slice.call(section.querySelectorAll(".rank__row"));
    var book = {}; // 사업자명 → { count, price }

    document.querySelectorAll(".rpanel").forEach(function (panel, p) {
      var key = p === 0 ? "count" : "price";
      panel.querySelectorAll(".rtable tbody tr").forEach(function (tr) {
        var cells = tr.children;
        if (cells.length < 3) return;
        var name = cells[1].textContent.trim();
        if (!book[name]) book[name] = {};
        book[name][key] = cells[2].textContent.trim();
      });
    });

    rows.forEach(function (row) {
      var value = row.querySelector(".rank__value");
      if (value) row.setAttribute("data-count", value.textContent.trim());
    });

    function setMetric(i) {
      tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); });
      rows.forEach(function (row) {
        var value = row.querySelector(".rank__value");
        var nameEl = row.querySelector(".rank__name");
        if (!value || !nameEl) return;
        var found = book[nameEl.textContent.trim()];
        if (i === 0) value.textContent = row.getAttribute("data-count");
        else if (found && found.price) value.textContent = found.price;
      });
    }
    tabs.forEach(function (t, i) { t.addEventListener("click", function () { setMetric(i); }); });

    // 1위부터 차례로 굴러가는 강조 (마우스를 올리면 멈춘다)
    var cols = Array.prototype.slice.call(section.querySelectorAll(".rank__cols > div"));
    var lists = cols.map(function (c) { return Array.prototype.slice.call(c.querySelectorAll(".rank__row")); });
    var len = Math.max.apply(null, lists.map(function (l) { return l.length; }).concat([0]));
    var active = 0;
    var paused = false;
    if (len > 1 && !reduceMotion) {
      section.addEventListener("mouseenter", function () { paused = true; });
      section.addEventListener("mouseleave", function () { paused = false; });
      window.setInterval(function () {
        if (paused) return;
        active = (active + 1) % len;
        lists.forEach(function (list) {
          list.forEach(function (row, i) {
            if (i === active) row.setAttribute("data-active", "");
            else row.removeAttribute("data-active");
          });
        });
      }, 2200);
    }

    // 전체보기 팝업
    var modal = document.querySelector(".rmodal");
    var openBtn = section.querySelector(".rank__more button");
    if (modal && openBtn) {
      openBtn.addEventListener("click", function () { if (modal.showModal) modal.showModal(); });
      var close = modal.querySelector(".rmodal__close");
      if (close) close.addEventListener("click", function () { modal.close(); });
      modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
    }
  }

  /* ------------------------------------------------------------------
     13) 설치 상담 3단계 — 정적 파일에서는 단계마다 파일이 따로 있습니다.
        sub/consult/index.html → step2.html → step3.html
        실제로는 PHP 에서 한 화면으로 처리하셔도 됩니다.
     ------------------------------------------------------------------ */
  function initConsultWizard() {
    var wizard = document.querySelector(".cw");
    if (!wizard) return;

    // 1단계 — 주소를 넣고 검색하면 결과가 보이고 다음 버튼이 켜진다
    var search = wizard.querySelector(".cw__search");
    var empty = wizard.querySelector(".cw__empty");
    var result = wizard.querySelector(".addr");
    var next = wizard.querySelector(".cw__next");

    if (search) {
      search.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = (wizard.querySelector("#cw-q") || { value: "" }).value.trim();
        if (!q) return;
        // 검색 결과 화면은 파일이 따로 있습니다
        location.href = CONSULT.found;
      });
    }

    // 단계 이동
    wizard.querySelectorAll(".cw__next, .cw__prev").forEach(function (btn) {
      if (btn.tagName === "A") return; // 팝업의 다음 링크는 그대로 둔다
      btn.addEventListener("click", function (e) {
        var panel = wizard.querySelector(".cw__panel");
        var isForm = panel && panel.tagName === "FORM";
        if (btn.classList.contains("cw__prev")) {
          e.preventDefault();
          location.href = CONSULT.step1;
          return;
        }
        if (btn.disabled) return;
        e.preventDefault();
        location.href = isForm ? CONSULT.step3 : CONSULT.step2;
      });
    });

    // 현재(기설) + 추가 = 합계
    var form = wizard.querySelector("form.cw__panel");
    if (form) {
      var num = function (name) {
        var el = form.querySelector('[name="' + name + '"]');
        var n = Number((el && el.value || "").replace(/\D/g, ""));
        return isFinite(n) ? n : 0;
      };
      var put = function (name, v) {
        var el = form.querySelector('[name="' + name + '"]');
        if (el) el.value = String(v);
      };
      form.addEventListener("input", function () {
        put("fast_total", num("fast_now"));
        put("slow_total", num("slow_now") + num("slow_add"));
      });
    }
  }

  function init() {
    initReveal();
    initHeader();
    initFaq();
    initBrands();
    initCountUp();
    initConsult();
    initFinder();
    initTop();
    initBoard();
    initRanking();
    initRankTables();
    initLegal();
    initConsultWizard();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
