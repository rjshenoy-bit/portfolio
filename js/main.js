/*
  Rendering + interaction logic. You shouldn't need to edit this file to
  update your content — see js/data.js for that. This file reads SITE_DATA
  and builds the DOM, plus handles nav/scroll/animation behavior.
*/

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* Icons (inline SVG, no external icon library)                        */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    bar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/></svg>',
    line: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-6 4 3 5-7 4 4"/><path d="M3 21h18"/></svg>',
    pie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3v9l7 4.5"/><circle cx="12" cy="12" r="9"/></svg>',
    coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="9" cy="7" rx="6" ry="3.2"/><path d="M3 7v6c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2V7"/><path d="M12 12.4c3 .2 6 1.6 6 3.4v3.2c0 1.8-2.7 3.2-6 3.2s-6-1.4-6-3.2"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 21V6l7-3 7 3v15"/><path d="M5 21h14"/><path d="M9 10h2M13 10h2M9 14h2M13 14h2M10 21v-4h4v4"/></svg>',
    calculator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0M8 19h8"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 12h5M9.5 15.5h5"/></svg>',
    growth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19l6-6 4 3 6-8"/><path d="M14 8h6v6"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>'
  };

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  /* ------------------------------------------------------------------ */
  /* Hero text + links from profile data                                 */
  /* ------------------------------------------------------------------ */
  function renderProfile() {
    const p = SITE_DATA.profile;
    document.title = `${p.name} — ${p.role}`;
    document.getElementById("heroEyebrow").textContent = p.role;
    document.getElementById("heroName").textContent = p.name;
    document.getElementById("heroTagline").textContent = p.tagline;
    document.getElementById("contactText").textContent = p.contactIntro;
    document.getElementById("footerName").textContent = p.name;
    document.getElementById("footerYear").textContent = String(new Date().getFullYear());

    const resumeLink = document.getElementById("resumeLink");
    resumeLink.href = p.resumeUrl;

    const portraitImg = document.getElementById("contactPortraitImg");
    portraitImg.src = p.portraitUrl;
    portraitImg.alt = p.portraitAlt || "";
    if (p.portraitIsPlaceholder) {
      const wrap = document.getElementById("contactPortrait");
      wrap.appendChild(el("span", "contact__portrait-tag", "Placeholder — swap for your photo"));
    }

    const markBox = document.querySelector(".nav__mark-box");
    const markName = document.querySelector(".nav__mark-name");
    if (markBox) markBox.textContent = p.initials;
    if (markName) markName.textContent = p.name;

    // Contact links row
    const linksWrap = document.getElementById("contactLinks");
    const contactItems = [
      { label: "Email", href: `mailto:${p.email}`, primary: true },
      { label: "LinkedIn", href: p.linkedin, primary: false },
      { label: "Résumé", href: p.resumeUrl, primary: false }
    ];
    contactItems.forEach((item) => {
      const a = el("a", `btn ${item.primary ? "btn--primary" : "btn--ghost"}`, item.label);
      a.href = item.href;
      linksWrap.appendChild(a);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Cards (used for both "work" and "writeups" rows)                    */
  /* ------------------------------------------------------------------ */
  function buildCard(item) {
    const card = el("article", `card card--${item.accent}`);

    const thumb = el("div", "card__thumb", ICONS[item.icon] || ICONS.bar);
    if (item.featured) {
      thumb.appendChild(el("span", "card__badge", "Featured"));
    }
    card.appendChild(thumb);

    const body = el("div", "card__body");
    body.appendChild(el("span", "card__tag", item.category));
    body.appendChild(el("h3", "card__title", item.title));
    body.appendChild(el("p", "card__summary", item.summary));
    body.appendChild(el("p", "card__desc", item.description));

    const link = el("a", "card__link", `Open file ${ICONS.external}`);
    link.href = item.link;
    if (item.link && item.link.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    body.appendChild(link);

    card.appendChild(body);
    return card;
  }

  function renderRow(trackId, items) {
    const track = document.getElementById(trackId);
    items.forEach((item) => track.appendChild(buildCard(item)));
  }

  /* ------------------------------------------------------------------ */
  /* Skills                                                               */
  /* ------------------------------------------------------------------ */
  function renderSkills() {
    const wrap = document.getElementById("skillsGroups");
    SITE_DATA.skillGroups.forEach((group) => {
      const groupEl = el("div", "skills__group");
      groupEl.appendChild(el("h3", "skills__group-title", group.title));
      const pills = el("div", "skills__pills");
      group.items.forEach((skill) => {
        pills.appendChild(el("span", `pill pill--${group.accent}`, skill));
      });
      groupEl.appendChild(pills);
      wrap.appendChild(groupEl);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Experience timeline                                                  */
  /* ------------------------------------------------------------------ */
  function renderTimeline() {
    const wrap = document.getElementById("timeline");
    SITE_DATA.experience.forEach((job) => {
      const item = el("div", "timeline__item");
      item.appendChild(el("span", "timeline__dot"));
      item.appendChild(el("p", "timeline__period", job.period));
      item.appendChild(el("h3", "timeline__role", job.role));
      item.appendChild(el("p", "timeline__org", job.org));
      const list = el("ul", "timeline__points");
      job.points.forEach((pt) => list.appendChild(el("li", "", pt)));
      item.appendChild(list);
      wrap.appendChild(item);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Education / certifications                                          */
  /* ------------------------------------------------------------------ */
  function renderEduList(containerId, items) {
    const wrap = document.getElementById(containerId);
    items.forEach((item) => {
      const card = el("div", "edu-item");
      card.appendChild(el("p", "edu-item__name", item.name));
      card.appendChild(el("p", "edu-item__meta", `${item.org} · ${item.meta}`));
      wrap.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Nav: scroll state + mobile toggle                                    */
  /* ------------------------------------------------------------------ */
  function initNav() {
    const nav = document.getElementById("siteNav");
    const toggle = document.getElementById("navToggle");
    const mobile = document.getElementById("navMobile");

    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Row scroll buttons                                                   */
  /* ------------------------------------------------------------------ */
  function initRowControls() {
    document.querySelectorAll(".row__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const track = document.getElementById(btn.dataset.row);
        const dir = Number(btn.dataset.dir);
        const cardWidth = track.querySelector(".card")?.offsetWidth || 300;
        track.scrollBy({ left: dir * (cardWidth + 22) * 2, behavior: "smooth" });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Hero canvas — a single, quiet animated moment                       */
  /* Three drifting market-style lines in the accent colors, at low      */
  /* opacity. Skipped in favor of a static draw if reduced motion is on. */
  /* ------------------------------------------------------------------ */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    const ctx = canvas.getContext("2d");
    let width, height, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth = canvas.offsetWidth;
      height = canvas.clientHeight = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const lines = [
      { color: "74,144,226", amp: 46, freq: 0.010, speed: 0.15, yBase: 0.42, width: 1.4, alpha: 0.35 },
      { color: "53,201,127", amp: 60, freq: 0.007, speed: 0.10, yBase: 0.58, width: 1.4, alpha: 0.28 },
      { color: "232,179,79", amp: 34, freq: 0.014, speed: 0.08, yBase: 0.68, width: 1.2, alpha: 0.22 }
    ];

    function drawLine(line, t) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${line.color}, ${line.alpha})`;
      ctx.lineWidth = line.width;
      const step = 6;
      for (let x = 0; x <= width; x += step) {
        const y =
          height * line.yBase +
          Math.sin(x * line.freq + t * line.speed) * line.amp +
          Math.sin(x * line.freq * 2.3 + t * line.speed * 1.7) * (line.amp * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function frame(t) {
      ctx.clearRect(0, 0, width, height);
      lines.forEach((line) => drawLine(line, t * 0.001));
      if (!prefersReducedMotion) requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      frame(1200); // one static, settled frame
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                 */
  /* ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderRow("workTrack", SITE_DATA.projects);
    renderRow("writeupTrack", SITE_DATA.writeups);
    renderSkills();
    renderTimeline();
    renderEduList("educationList", SITE_DATA.education);
    renderEduList("certList", SITE_DATA.certifications);
    initNav();
    initRowControls();
    initHeroCanvas();
  });
})();
