/* ==========================================================================
   Rebecca Luo — site behavior
   Vanilla ES2019+, no dependencies. Degrades gracefully: with JS off you
   still get the whole page, just without modals and filters.
   ========================================================================== */
(function () {
  "use strict";

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================================================================
     Detail content for the project + community modals.
     Card fronts live in the HTML; this is only the expanded story.
     theme: [background, ink, logo-chip background]
     logo:  path, or null to fall back to a text mark
     ====================================================================== */
  var DETAIL = {
    /* ---------------------------------------------------- projects ------ */
    jackfruit: {
      theme: ["#a5e4de", "#0a5b56", "#1a363a"],
      logo: "assets/img/logos/jackfruit.svg",
      logoAlt: "Jackfruit Network logo",
      kicker: "Impact measurement · Nairobi, Kenya",
      title: "Jackfruit Network",
      meta: ["Yale Global Social Entrepreneurship Fellow", "Jackfruit Network", "2026"],
      glance: [
        ["1K+", "schools in the network"],
        ["20+", "stakeholders interviewed"],
        ["70%", "shorter impact survey"]
      ],
      beats: [
        ["The brief", "Jackfruit Network finances and supports low-cost private schools across Kenya and Uganda — lending, procurement, and teacher development under one roof. As a Yale Global Social Entrepreneurship Fellow based in Nairobi, our team was handed a question difficult to answer cleanly: is this working, how would we know, and how do we collect that data?"],
        ["What came of it", "A 70% shorter impact survey, a measurement architecture the field team can realistically run, a report prototype schools want to read, and a shortlist of community initiatives worth piloting next."]
      ],
      links: [
        ["Read the final presentation", "assets/docs/Jackfruit-Network-GSE-Final-Presentation.pdf", 1],
        ["Jackfruit Network", "https://www.jackfruitnetwork.com/", 0]
      ]
    },

    readworks: {
      theme: ["#c2e5f8", "#14607f", "#ffffff"],
      logo: "assets/img/logos/readworks.svg",
      logoAlt: "ReadWorks logo",
      kicker: "Product strategy · EdTech",
      title: "ReadWorks",
      meta: ["Product Strategy & Analytics Intern", "ReadWorks", "2026"],
      glance: [
        ["11.5M", "teachers and students reached annually"],
        ["~20%", "AI tool performance gain"],
        ["3", "workstreams owned"]
      ],
      beats: [
        ["The brief", "ReadWorks gives teachers free, research-backed reading materials. I joined the team to identify and work on projects pertaining to product and analytics."],
        ["What came of it", "Roughly 20% better performance from the AI tool, a documented recommendation on prompt design that fed the product roadmap, and a standardized analytics process."]
      ],
      links: [["Visit ReadWorks", "https://www.readworks.org/", 0]]
    },

    airemory: {
      theme: ["#cfe8d8", "#2c6b48", "#ffffff"],
      logo: null,
      mark: "Air<br>Emory",
      kicker: "Product & UX · Civic tech",
      title: "AirEmory",
      meta: ["Website Lead", "AirEmory", "2019 – 2022"],
      glance: [
        ["1st", "campus sensor network at Emory"],
        ["40+", "air quality challenge participants"],
        ["3 yrs", "leading the website efforts"]
      ],
      beats: [
        ["The brief", "AirEmory is a student-led air quality sensor network — the first of its kind at Emory — publishing live readings from around campus so students and faculty could see their own environment."],
        ["What came of it", "A live, public campus air quality network; a 40+ participant statewide challenge; and panels with groups like Girls Who Code."]
      ],
      links: [
        ["View the GitHub repo", "https://github.com/EmoryAir/EmoryAir.github.io", 0],
        ["airemory.com", "https://www.airemory.com/", 0],
        ["Georgia Air Quality Challenge", "https://scienceatl.org/air-quality/", 0]
      ]
    },

    ajstickers: {
      theme: ["#f9c9de", "#a83a6f", "#ffffff"],
      logo: "assets/img/logos/ajstickers.png",
      logoAlt: "AJ Stickers logo",
      kicker: "Brand & marketing · E-commerce",
      title: "AJ Stickers",
      meta: ["Creative Direction, Marketing & Branding", "AJ Stickers", "2021 – 2022"],
      glance: [
        ["6/11/21", "launch day, 3:14pm EST"],
        ["1 yr", "as creative lead"],
        ["Weekly", "content, shoots & designs"]
      ],
      beats: [
        ["The brief", "During the pandemic, a friend and her sisters started a sticker store built around inclusivity in STEM and talking openly about mental health. I was asked to take creative direction for marketing and branding – which I happily agreed to."],
        ["What came of it", "We launched on 6/11/21 at 3:14pm EST (yes, on purpose) and moved from launch sales into commissions and custom work. I stepped away in 2022, but it remains one of my favorite side projects."]
      ],
      /* Exports of the original Canva designs, served from this repo so they
         cannot break. Add Motivational Mondays and 3 Day Countdown the same
         way: [kind, src, caption, aspect%, poster (video) or alt (image)]. */
      media: [
        ["image", "assets/img/work/aj-thank-you-card.jpg", "Thank You Card", 71.4,
         "AJ Stickers thank-you card: purple lettering, the AJ monogram, social handles and a QR code"],
        ["video", "assets/video/aj-stem-fact.mp4", "STEM Fact of the Week", 177.7778,
         "assets/img/work/aj-stem-fact-poster.jpg"]
      ],
      links: [
        ["Marketing & branding deliverable", "assets/docs/AJ-Stickers-Marketing-Strategy.pdf", 1],
        ["Instagram", "https://www.instagram.com/ajstickers.atl/", 0]
      ]
    },

    designthinking: {
      theme: ["#bcc8ec", "#012169", "#ffffff"],
      logo: "assets/img/logos/goizueta.png",
      logoAlt: "Emory Goizueta Business School logo",
      kicker: "Design thinking · Service design",
      title: "Design Thinking",
      meta: ["Team Project, Business Design Thinking", "Emory Goizueta", "2021"],
      glance: [
        ["1", "semester, live university challenge"],
        ["Zoom", "interviews → personas"],
        ["Tested", "prototype + final pitch"]
      ],
      beats: [
        ["The brief", "Emory Goizueta's BBA/MPA accounting program was hard to find and harder to understand if you were not already inside the business school. Our team took it on as one of the university's live strategic challenges."],
        ["What came of it", "A tested prototype and a final recommendation to the school. More durably, design thinking became the way I approach ambiguous problems, and I have since brought it into nearly every organization I have joined. Still one of my favorite courses."]
      ],
      links: [
        ["Final presentation", "assets/docs/Design-Thinking-Final-Presentation.pdf", 1],
        ["View the prototype", "http://bit.ly/bus360prototype", 0]
      ]
    },

    cimm: {
      theme: ["#dbcdef", "#4a2280", "#ffffff"],
      logo: null,
      mark: "CIMM",
      kicker: "Computational research · NSF REU",
      title: "Modeling a refractory high-entropy alloy",
      meta: ["NSF REU Researcher, CIMM", "Baton Rouge, LA", "Summer 2019"],
      glance: [
        ["NSF", "funded REU placement"],
        ["2600°C", "predicted melting point"],
        ["SSOS", "method, validated vs. 100-atom cell"]
      ],
      beats: [
        ["The brief", "As part of the NSF-funded CIMM REU, in collaboration with the Department of Computer Science at Southern University and A&M College, we designed a refractory high-entropy alloy — ReMoNbTaV — and set out to characterize its structural and mechanical behavior computationally."],
        ["What came of it", "The alloy holds a body-centered cubic phase above 1000°C with a melting point near 2600°C, and the results confirmed SSOS accuracy while showing high strength, hardness, and ductility. Alongside the research we ran outreach with middle school students to encourage underrepresented students into engineering and computer science."]
      ],
      links: [
        ["Research poster", "assets/docs/CIMM-Research-Poster.pdf", 1],
        ["About the CIMM REU", "https://www.lsu.edu/eng/cimm/experiences/reus.php", 0]
      ]
    },

    /* --------------------------------------------------- community ------ */
    boundless: {
      theme: ["#d3daf6", "#2e3e86", "#ffffff"],
      logo: "assets/img/logos/boundless.png",
      logoAlt: "Boundless Literacy logo",
      kicker: "Board service · New Haven, CT",
      title: "Boundless Literacy",
      meta: ["Board of Directors Member", "Golub Nonprofit Board Fellow", "2025 – present"],
      glance: [
        ["200+", "students served since 2021"],
        ["7", "Orton-Gillingham trained teachers"],
        ["2", "public school districts"]
      ],
      beats: [
        ["The organization", "Boundless Literacy is the only nonprofit in New Haven providing daily, small-group, intensive reading instruction inside underserved schools. It started in 2021 with a single teacher and now runs Orton-Gillingham instruction across New Haven and East Haven Public Schools, reaching more than 200 students."],
        ["Involvement", "I joined the board through Yale's Golub Nonprofit Board Fellowship, and I am driving strategic marketing and communications standardization as the organization scales."]
      ],
      links: [["Visit Boundless Literacy", "https://boundlessliteracy.org/", 0]]
    },

    bcnc: {
      theme: ["#f8c4da", "#8e1b4c", "#ffffff"],
      logo: "assets/img/logos/bcnc.png",
      logoAlt: "Boston Chinatown Neighborhood Center logo",
      kicker: "Mentorship · Boston, MA",
      title: "Boston Chinatown Neighborhood Center",
      meta: ["College Access & Post-Secondary Mentor", "Boston, MA", "2022 – 2025"],
      glance: [
        ["13K+", "people served each year"],
        ["2 yrs", "with one matched mentee"],
        ["Weekly", "sessions, in Mandarin"]
      ],
      beats: [
        ["The organization", "BCNC works to ensure the children, youth, and families it serves have the resources to reach greater economic success and social well-being — through the Pao Arts Center, the Red Oak after-school and summer program, parent education, and more. It reaches more than 13,000 children, youth, and adults every year."],
        ["Involvement", "I mentored in the College Access and Post-Secondary (CAPS) program, meeting weekly in Mandarin with a matched student across the last two years of high school: college applications, resume workshops, art portfolio reviews, and a lot of talking through what comes next."],
        ["Favorite memory", "One of the youth gave me one of my most treasured gifts as he headed off to art school — a digital drawing of his favorite flower, the gypsophila."]
      ],
      figure: ["assets/img/bcnc-gift.jpg",
               "Digital drawing of gypsophila flowers in blue and violet, inscribed 'only for Rebecca Luo'",
               0, "The gypsophila drawing, a parting gift from one of the CAPS students."],
      links: [["Visit BCNC", "https://bcnc.net/find-a-program/child-and-youth-services/youth-program/", 0]]
    },

    mcf: {
      theme: ["#bedcf0", "#00478e", "#ffffff"],
      logo: "assets/img/logos/mcf.png",
      logoAlt: "Migrant Children's Foundation logo",
      kicker: "Volunteer · Beijing, China (remote)",
      title: "Migrant Children's Foundation",
      meta: ["Volunteer & Curriculum Developer", "Beijing (remote)", "2020 – 2024"],
      glance: [
        ["12", "week environmental curriculum"],
        ["2009", "founded, UK-registered charity"],
        ["Remote", "translation & program work"]
      ],
      beats: [
        ["The organization", "Founded in 2009 by Helen Boyle, MCF is a UK-registered charity operating as a nonprofit social enterprise in Beijing. It works with disadvantaged schools in Beijing and the surrounding areas to bring healthcare and educational opportunity to the children who attend them — weekly classes, health checks, educational trips, and sponsorship for children in particular hardship."],
        ["Involvement", "I take on remote projects: translating CSR booklets, and developing a 12-week interactive environmental education curriculum for migrant students in Beijing to build environmental literacy."]
      ],
      links: [
        ["Visit MCF", "https://mcfworldwide.org/about-mcf/", 0],
        ["Environmental curriculum plan", "https://docs.google.com/document/d/e/2PACX-1vS79PDZF2B7Cabt2VlBq2A348mpxfTG-5T3cmLufQyaa1PA5uRQMIIyiX_M3lsQF5OBI0ZBudiwNz0o/pub", 0]
      ]
    },

    womenintech: {
      theme: ["#a9eadb", "#0b6a57", "#ffffff"],
      logo: "assets/img/logos/gwc.png",
      logoAlt: "Girls Who Code logo",
      kicker: "Women in tech · Atlanta & remote",
      title: "Girls Who Code, ProgramHers, Rewriting the Code",
      meta: ["President · President & Founding Member · Fellow", "Atlanta, GA & remote", "2018 – 2022"],
      glance: null,
      beats: [
        ["Girls Who Code", "As president of Emory's chapter, I ran weekly Python and web development lessons for middle and high school students across Atlanta, with students building an impact project each spring. We launched our first fully virtual school year in 2020–21 when the pandemic made the in-person model impossible."],
        ["Emory ProgramHers", "I was a founding member and later president of ProgramHers, building a support community for women in Computer Science and other technical fields at Emory through mentorship, panels, speaker series, and management of the Grace Hopper Scholarship Program at Emory."],
        ["Rewriting the Code", "A free community for women in tech working to increase diversity in the field. I particularly valued the Big/Little mentorship program and the summer meet-ups across major cities."]
      ],
      figure: ["assets/img/women-in-tech.png",
               "Logos for Emory ProgramHers, Girls Who Code and Rewriting the Code",
               1, ""],
      links: [
        ["Girls Who Code", "https://girlswhocode.com/", 0],
        ["ProgramHers on Instagram", "https://www.instagram.com/emoryprogramhers/", 0],
        ["Rewriting the Code", "https://rewritingthecode.org/", 0]
      ]
    }
  };

  /* ======================================================================
     Nav: stuck state, mobile drawer, active section
     ====================================================================== */
  var bar    = $(".progress__bar");
  var nav    = $(".nav");
  var toggle = $(".nav__toggle");
  var drawer = $(".nav__drawer");
  var toTop  = $(".totop");

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      drawer.classList.toggle("is-open", !open);
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        drawer.classList.remove("is-open");
      }
    });
  }

  var sections = $$("main section[id]");
  var navLinks = $$(".nav__link");

  function setActive(id) {
    navLinks.forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) { a.setAttribute("aria-current", "true"); }
      else { a.removeAttribute("aria-current"); }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { setActive(en.target.id); } });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ======================================================================
     Reveal on scroll
     ====================================================================== */
  var revealables = $$("[data-reveal]");

  if ("IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        en.target.classList.add("is-in");
        obs.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { reveal.observe(el); });

    /* Safety net: nothing is allowed to stay invisible because a callback
       went missing. */
    window.setTimeout(function () {
      revealables.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add("is-in"); }
      });
    }, 2500);
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ======================================================================
     Experience: expandable detail
     ====================================================================== */
  $$(".job__toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open  = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.setAttribute("data-open", String(!open));
      $(".job__toggle-label", btn).textContent = open ? "Show details" : "Hide details";
    });
  });

  /* ======================================================================
     Modal sheet — projects + community
     ====================================================================== */
  var sheet = $("#sheet");
  var panel = $(".sheet__panel", sheet);
  var lastFocus = null;

  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var DOC   = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(d) {
    var chip = d.logo
      ? '<span class="logo-chip"><img src="' + esc(d.logo) + '" alt="' + esc(d.logoAlt || "") + '"></span>'
      : '<span class="logo-chip logo-chip--text" aria-hidden="true">' + (d.mark || "") + "</span>";

    var glance = d.glance
      ? '<div class="glance">' + d.glance.map(function (g) {
          return "<div><b>" + esc(g[0]) + "</b><span>" + esc(g[1]) + "</span></div>";
        }).join("") + "</div>"
      : "";

    var beats = d.beats.map(function (b) {
      return '<section class="beat"><h4>' + esc(b[0]) + "</h4><p>" + esc(b[1]) + "</p></section>";
    }).join("");

    var links = d.links.map(function (l, i) {
      return '<a class="' + (i === 0 ? "btn" : "btn btn--ghost") + '" href="' + esc(l[1]) +
             '" target="_blank" rel="noopener">' + (l[2] ? DOC : ARROW) +
             "<span>" + esc(l[0]) + "</span></a>";
    }).join("");

    var meta = d.meta.map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");

    var figure = d.figure
      ? '<figure class="sheet__figure' + (d.figure[2] ? " sheet__figure--pad" : "") + '">' +
          '<img src="' + esc(d.figure[0]) + '" alt="' + esc(d.figure[1]) + '" loading="lazy">' +
          (d.figure[3] ? "<figcaption>" + esc(d.figure[3]) + "</figcaption>" : "") +
        "</figure>"
      : "";

    /* Selected work: local images and video, each keeping its own aspect
       ratio via padding-top. Entries are
       [kind, src, caption, aspect%, posterOrAlt]. */
    var media = d.media
      ? '<div class="embeds">' + d.media.map(function (m) {
          var inner = m[0] === "video"
            ? '<video controls preload="none" playsinline ' +
              'poster="' + esc(m[4]) + '"><source src="' + esc(m[1]) +
              '" type="video/mp4">Your browser cannot play this video.</video>'
            : '<img src="' + esc(m[1]) + '" alt="' + esc(m[4]) + '" loading="lazy" decoding="async">';
          return '<figure class="embed">' +
            '<div class="embed__frame" style="padding-top:' + m[3] + '%">' + inner +
            "</div><figcaption>" + esc(m[2]) + "</figcaption></figure>";
        }).join("") + "</div>"
      : "";

    panel.setAttribute("style",
      "--t-bg:" + d.theme[0] + ";--t-ink:" + d.theme[1] + ";--t-chip:" + d.theme[2]);

    panel.innerHTML =
      '<button class="sheet__close" type="button" data-close aria-label="Close">' +
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      "</button>" +
      '<header class="sheet__hero">' + chip +
        "<div>" +
          '<p class="sheet__kicker">' + esc(d.kicker) + "</p>" +
          '<h2 class="sheet__title display" id="sheet-title">' + esc(d.title) + "</h2>" +
          '<p class="sheet__meta">' + meta + "</p>" +
        "</div>" +
      "</header>" +
      '<div class="sheet__body">' + glance + beats + figure + media +
        '<div class="sheet__links">' + links + "</div>" +
      "</div>";
  }

  function openSheet(key, trigger) {
    var d = DETAIL[key];
    if (!d) { return; }
    lastFocus = trigger || document.activeElement;
    render(d);
    sheet.classList.add("is-open");
    sheet.removeAttribute("aria-hidden");
    document.body.classList.add("is-locked");
    sheet.scrollTop = 0;
    var close = $(".sheet__close", panel);
    if (close) { close.focus(); }
  }

  function closeSheet() {
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
  }

  $$("[data-open-sheet]").forEach(function (el) {
    el.addEventListener("click", function () { openSheet(el.getAttribute("data-open-sheet"), el); });
  });

  sheet.addEventListener("click", function (e) {
    if (e.target === sheet || e.target.closest("[data-close]")) { closeSheet(); }
  });

  /* ======================================================================
     Gallery — filters, parallel rise, lightbox
     ====================================================================== */
  var wall    = $("#wall");
  var tiles   = wall ? $$(".tile", wall) : [];
  var visible = tiles.slice();

  var filters = $$(".filter");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var want = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      tiles.forEach(function (t) {
        t.hidden = !(want === "all" || t.getAttribute("data-cat") === want);
      });
      visible = tiles.filter(function (t) { return !t.hidden; });
    });
  });

  /* Every tile shares one offset, so the wall rises as a single parallel
     plane as it scrolls into view rather than scattering. */
  function updateConverge() {
    if (!wall || reduceMotion) { return; }
    var r = wall.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    var p = (r.top - vh * 0.2) / (vh * 0.65);
    wall.style.setProperty("--conv", Math.min(1, Math.max(0, p)).toFixed(3));
  }

  /* --- Lightbox -------------------------------------------------------- */
  var lb      = $("#lightbox");
  var lbImg   = $(".lightbox__stage img", lb);
  var lbCap   = $(".lightbox__cap", lb);
  var lbCount = $(".lightbox__count", lb);
  var lbIndex = 0;
  var lbFocus = null;

  function showAt(i) {
    if (!visible.length) { return; }
    lbIndex = (i + visible.length) % visible.length;
    var t = visible[lbIndex];
    lbImg.src = t.getAttribute("data-full");
    lbImg.alt = t.getAttribute("data-alt") || "";
    lbCap.textContent = t.getAttribute("data-medium") || "";
    lbCount.textContent = (lbIndex + 1) + " / " + visible.length;
  }

  function openLb(t) {
    lbFocus = document.activeElement;
    visible = tiles.filter(function (x) { return !x.hidden; });
    showAt(visible.indexOf(t));
    lb.classList.add("is-open");
    lb.removeAttribute("aria-hidden");
    document.body.classList.add("is-locked");
    $(".lightbox__close", lb).focus();
  }

  function closeLb() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    lbImg.removeAttribute("src");
    if (lbFocus) { lbFocus.focus(); lbFocus = null; }
  }

  tiles.forEach(function (t) { t.addEventListener("click", function () { openLb(t); }); });

  if (lb) {
    lb.addEventListener("click", function (e) {
      if (e.target.closest("[data-lb-close]") || e.target === lb ||
          e.target.classList.contains("lightbox__stage")) { closeLb(); return; }
      if (e.target.closest("[data-lb-prev]")) { showAt(lbIndex - 1); }
      if (e.target.closest("[data-lb-next]")) { showAt(lbIndex + 1); }
    });
  }

  /* ======================================================================
     Keyboard + focus containment
     ====================================================================== */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (lb.classList.contains("is-open")) { closeLb(); }
      else if (sheet.classList.contains("is-open")) { closeSheet(); }
      else if (drawer && drawer.classList.contains("is-open")) {
        drawer.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
      return;
    }
    if (!lb.classList.contains("is-open")) { return; }
    if (e.key === "ArrowLeft")  { showAt(lbIndex - 1); }
    if (e.key === "ArrowRight") { showAt(lbIndex + 1); }
  });

  document.addEventListener("focusin", function (e) {
    var open = lb.classList.contains("is-open") ? lb
             : sheet.classList.contains("is-open") ? sheet
             : null;
    if (open && !open.contains(e.target)) {
      var first = open.querySelector("button, a[href]");
      if (first) { first.focus(); }
    }
  });

  /* ======================================================================
     Single rAF-throttled scroll loop
     ====================================================================== */
  var queued = false;
  function onScroll() {
    var y   = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (bar)   { bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")"; }
    if (nav)   { nav.classList.toggle("is-stuck", y > 24); }
    if (toTop) { toTop.classList.toggle("is-shown", y > window.innerHeight * 0.9); }

    updateConverge();
    queued = false;
  }

  window.addEventListener("scroll", function () {
    if (queued) { return; }
    queued = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });

  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
