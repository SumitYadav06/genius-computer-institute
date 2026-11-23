/* ============================================================================
   Genius Computer Institute — shared site script (GitHub Pages)
   Structure (future-proof, aage badhane ke liye):
     - Config: WA number upar (WA constant) — number badle to sirf yahin badlein.
     - COURSES array: naya course jodna ho to yahin ek entry jodein
       {name, full, group, catLabel, icon, cls, desc, tags} — course cards,
       filter, search, goal helper aur enquiry dropdown khud ban jayenge.
       group sirf inme se ek ho: "diploma" | "basic" | "job" | "typing".
     - Naya page jodna ho to: <pagename>.html banayein, <head> me style.css,
       end me script.js link karein, <body data-page="<pagename>"> rakhein,
       header/nav + footer + stickybar copy karein, aur neeche tabByPage
       me us page ka data-tab jodein. Nav links relative rakhein
       (index.html, courses.html ...) — GitHub Pages root se serve hota hai.
     - Koi fees/timing yahan hard-code nahi hai — wo hamesha
       Call / WhatsApp (8004353554) par confirm karne ko likha jata hai.
   ============================================================================ */
(function(){
  "use strict";
  var WA = "918004353554";
  function waLink(text){ return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }
  function $(id){ return document.getElementById(id); }
  function on(el, ev, fn){ if (el) el.addEventListener(ev, fn); }

  var ICONS = {
    diploma:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.5"/><path d="M22 10v6"/></svg>',
    monitor:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>',
    book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    calc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/></svg>',
    sheet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></svg>',
    print:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    kb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>',
    globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/></svg>'
  };
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" style="width:17px;height:17px"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.82 9.82 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.43 9.88-9.89 9.88m8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.41"/></svg>';

  /* Courses — group is the category shown on courses.html.
     Diploma: ADCA, DCA | Basic: CCC, BCC, DTP, Internet
     Job: Tally Prime, Advance Excel | Typing: English + Hindi typing */
  var COURSES = [
    {name:"ADCA", full:"Advance Diploma in Computer Applications", group:"diploma", catLabel:"Diploma", icon:"diploma", cls:"", desc:"Sabse poora diploma course — computer basic se lekar advanced tak, ek hi course me naukri layak taiyari.", tags:["Diploma Course","Job Course"]},
    {name:"DCA", full:"Diploma in Computer Applications", group:"diploma", catLabel:"Diploma", icon:"monitor", cls:"alt2", desc:"Computer ki mazboot neev — office work aur aage ki padhai dono ke liye behtareen shuruaat.", tags:["Diploma Course","Basic + Advance"]},
    {name:"CCC", full:"Course on Computer Concepts", group:"basic", catLabel:"Basic", icon:"award", cls:"alt", desc:"Sarkari naukri ke liye sabse zyada manga jane wala computer course — exam pattern ke saath taiyari.", tags:["Sarkari Exam","IT Literacy"]},
    {name:"BCC", full:"Basic Computer Course", group:"basic", catLabel:"Basic", icon:"book", cls:"alt2", desc:"Computer literacy ka basic course — shuruaat karne walon ke liye asaan aur kaam ka.", tags:["IT Literacy","Basic Course"]},
    {name:"DTP", full:"Desktop Publishing", group:"basic", catLabel:"Basic", icon:"print", cls:"alt2", desc:"Design aur printing ka kaam — pamphlet, banner, shaadi card jaise kaam ke liye practical training.", tags:["Design","Printing Work"]},
    {name:"Internet", full:"Internet & Online Kaam", group:"basic", catLabel:"Basic", icon:"globe", cls:"", desc:"Online form, email, sarkari website aur roz ke digital kaam — khud karna seekhein.", tags:["Basic Course","Online Form"]},
    {name:"Tally Prime", full:"Tally Prime — New Version", group:"job", catLabel:"Job Course", icon:"calc", cls:"", desc:"New Version ke saath accounting seekhein — dukaan, firm aur office ke hisaab-kitab ka asli kaam.", tags:["Accounting","Job Course","New Version"]},
    {name:"Advance Excel", full:"Advance Excel", group:"job", catLabel:"Job Course", icon:"sheet", cls:"alt", desc:"Formula, report aur data ka kaam — office job me sabse zyada istemal hone wala skill.", tags:["Office Job","Advance Course"]},
    {name:"English Typing", full:"English Typing", group:"typing", catLabel:"Typing", icon:"kb", cls:"", desc:"Sahi technique ke saath tez aur accurate English typing — sarkari typing test ki taiyari.", tags:["Speed + Accuracy","Typing Test"]},
    {name:"Hindi Typing — Kruti Dev", full:"Hindi Typing, Kruti Dev Font", group:"typing", catLabel:"Typing", icon:"kb", cls:"alt", desc:"Kruti Dev font me Hindi typing — sarkari daftaron me sabse zyada chalne wala font.", tags:["Kruti Dev","Sarkari Test"]},
    {name:"Hindi Typing — Mangal", full:"Hindi Typing, Mangal Font (Unicode)", group:"typing", catLabel:"Typing", icon:"kb", cls:"alt2", desc:"Mangal / Unicode Hindi typing — naye sarkari test aur online kaam ke liye zaroori.", tags:["Mangal Font","Unicode"]}
  ];

  /* ---- Course cards: render into every [data-course-grid] on the page ---- */
  var sel = $("fCourse");
  var grids = document.querySelectorAll("[data-course-grid]");
  grids.forEach(function(grid){
    var want = grid.getAttribute("data-course-grid");
    COURSES.forEach(function(c){
      if (want !== "all" && c.group !== want) return;
      var card = document.createElement("article");
      card.className = "course " + c.cls;
      card.setAttribute("data-cat", c.group);
      card.setAttribute("data-name", (c.name + " " + c.full).toLowerCase());
      var tagsHtml = c.tags.map(function(t){ return "<span>" + t + "</span>"; }).join("");
      card.innerHTML =
        '<div class="course-top"><span class="ic">' + ICONS[c.icon] + '</span>' +
        '<span><h3>' + c.name + '</h3><span class="full">' + c.full + '</span></span>' +
        '<span class="cat">' + c.catLabel + '</span></div>' +
        '<p>' + c.desc + '</p><div class="tags2">' + tagsHtml + '</div>' +
        '<div class="course-actions">' +
        '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + waLink("Namaste, mujhe " + c.name + " (" + c.full + ") course ki jaankari chahiye — fees aur batch timing bata dein.") + '">' + WA_SVG + 'WhatsApp</a>' +
        '<button type="button" class="btn btn-ghost pick">Form me Chunein</button></div>';
      card.querySelector(".pick").addEventListener("click", function(){
        window.location.href = "admission.html?course=" + encodeURIComponent(c.name);
      });
      grid.appendChild(card);
    });
  });
  /* Enquiry form course dropdown (admission page only) */
  if (sel){
    COURSES.forEach(function(c){
      var opt = document.createElement("option");
      opt.value = c.name; opt.textContent = c.name + " — " + c.full;
      sel.appendChild(opt);
    });
    var optOther = document.createElement("option");
    optOther.value = "Doosra / Salah chahiye"; optOther.textContent = "Doosra course / Salah chahiye";
    sel.appendChild(optOther);
    try {
      var q = new URLSearchParams(window.location.search).get("course");
      if (q) sel.value = q;
    } catch(e){}
  }

  /* ---- Course filter + search (courses page only) ---- */
  var searchEl = $("courseSearch");
  var activeFilter = "all";
  function applyFilter(){
    if (!searchEl) return;
    var q = searchEl.value.trim().toLowerCase();
    var visible = 0;
    document.querySelectorAll("[data-course-grid] .course").forEach(function(card){
      var okCat = activeFilter === "all" || card.getAttribute("data-cat") === activeFilter;
      var okQ = !q || card.getAttribute("data-name").indexOf(q) > -1;
      var show = okCat && okQ;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    document.querySelectorAll("[data-group-section]").forEach(function(sec){
      var anyVisible = sec.querySelectorAll(".course:not([style*='none'])").length > 0;
      sec.style.display = anyVisible ? "" : "none";
    });
    var noRes = $("noResult");
    if (noRes) noRes.style.display = visible ? "none" : "block";
  }
  document.querySelectorAll(".tab").forEach(function(tab){
    tab.addEventListener("click", function(){
      document.querySelectorAll(".tab").forEach(function(t){ t.setAttribute("aria-pressed","false"); });
      tab.setAttribute("aria-pressed","true");
      activeFilter = tab.getAttribute("data-filter");
      applyFilter();
    });
  });
  on(searchEl, "input", applyFilter);

  /* ---- Goal helper (courses page only) ---- */
  var GOALS = {
    govt:{text:"Aapke liye sahi rahega: <b>CCC + Hindi/English Typing</b> — sarkari form me CCC manga jata hai aur bahut si bhartiyon me typing test bhi hota hai.", course:"CCC"},
    office:{text:"Aapke liye sahi rahega: <b>Tally Prime + Advance Excel</b> — account aur office data ka kaam. Saath me <b>ADCA</b> kar lein to profile aur mazboot ho jayegi.", course:"Tally Prime"},
    basic:{text:"Aapke liye sahi rahega: <b>DCA ya BCC</b> se shuruaat — computer ki neev pakki hogi, phir Internet wala hissa roz ke kaam aayega.", course:"DCA"},
    typing:{text:"Aapke liye sahi rahega: <b>Hindi Typing (Kruti Dev + Mangal) aur English Typing</b> — dono font seekhne se har typing test ke liye taiyaar rahenge.", course:"Hindi Typing — Kruti Dev"}
  };
  var goalOut = $("goalOut");
  if (goalOut){
    document.querySelectorAll(".goal").forEach(function(g){
      g.addEventListener("click", function(){
        document.querySelectorAll(".goal").forEach(function(x){ x.setAttribute("aria-pressed","false"); });
        g.setAttribute("aria-pressed","true");
        var d = GOALS[g.getAttribute("data-goal")];
        goalOut.innerHTML = "<div>" + d.text + "</div>" +
          '<button type="button" class="btn btn-saffron btn-sm" id="goalPick">👉 ' + d.course + ' ke liye Enquiry Bharein</button>';
        goalOut.classList.add("show");
        $("goalPick").addEventListener("click", function(){
          window.location.href = "admission.html?course=" + encodeURIComponent(d.course);
        });
      });
    });
  }

  /* ---- Typing test (typing page only) — text auto-scrolls as you type ---- */
  var SAMPLES = [
    "Computer skill is very useful in every office and government job today. Regular practice makes typing fast and accurate.",
    "Learning computer opens new doors for students. With daily practice anyone can type quickly without looking at the keyboard.",
    "Hard work and honest practice always bring success. A student who learns computer skills can build a bright future."
  ];
  var sampleEl = $("typeSample"), inputEl = $("typeInput"), timerEl = $("typeTimer"), resultEl = $("typeResult");
  if (sampleEl && inputEl){
    var sampleIdx = 0, sample = SAMPLES[0], started = false, finished = false, remain = 60, timerId = null;
    function scrollCurIntoView(){
      var cur = sampleEl.querySelector(".cur");
      if (!cur) return;
      /* keep the current character's line visible inside the sample box */
      var box = sampleEl.getBoundingClientRect();
      var r = cur.getBoundingClientRect();
      sampleEl.scrollTop += (r.top - box.top) - sampleEl.clientHeight / 2 + cur.offsetHeight;
    }
    function renderSample(){
      var typed = inputEl.value, html = "";
      for (var i = 0; i < sample.length; i++){
        var ch = sample.charAt(i) === " " ? "&nbsp;" : sample.charAt(i);
        if (i < typed.length){ html += '<span class="' + (typed.charAt(i) === sample.charAt(i) ? "ok" : "bad") + '">' + ch + '</span>'; }
        else if (i === typed.length){ html += '<span class="cur">' + ch + '</span>'; }
        else { html += '<span>' + ch + '</span>'; }
      }
      sampleEl.innerHTML = html;
      scrollCurIntoView();
    }
    function finishTest(){
      finished = true;
      if (timerId) clearInterval(timerId);
      inputEl.disabled = true;
      var typed = inputEl.value, correct = 0;
      for (var i = 0; i < typed.length && i < sample.length; i++){ if (typed.charAt(i) === sample.charAt(i)) correct++; }
      var elapsed = 60 - remain; if (elapsed < 1) elapsed = 1;
      var wpm = Math.round((correct / 5) / (elapsed / 60));
      var acc = typed.length ? Math.round(correct * 100 / typed.length) : 0;
      $("resWpm").textContent = wpm;
      $("resAcc").textContent = acc + "%";
      $("resChars").textContent = correct;
      resultEl.classList.add("show");
      timerEl.textContent = "✅ Test Khatm";
    }
    function resetTest(){
      if (timerId) clearInterval(timerId);
      started = false; finished = false; remain = 60;
      inputEl.value = ""; inputEl.disabled = false;
      timerEl.textContent = "⏱️ 60 sec";
      resultEl.classList.remove("show");
      renderSample();
      sampleEl.scrollTop = 0;
    }
    inputEl.addEventListener("input", function(){
      if (finished) return;
      if (!started && inputEl.value.length){
        started = true;
        timerId = setInterval(function(){
          remain--;
          timerEl.textContent = "⏱️ " + remain + " sec bache";
          if (remain <= 0) finishTest();
        }, 1000);
      }
      renderSample();
      if (inputEl.value.length >= sample.length) finishTest();
    });
    on($("typeReset"), "click", function(){ resetTest(); inputEl.focus(); });
    on($("typeNew"), "click", function(){
      sampleIdx = (sampleIdx + 1) % SAMPLES.length; sample = SAMPLES[sampleIdx]; resetTest(); inputEl.focus();
    });
    renderSample();
  }

  /* ---- Enquiry form -> WhatsApp (admission page only) ---- */
  var form = $("enquiryForm");
  if (form){
    function setErr(id, show){ $(id).classList.toggle("show", show); return !show; }
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var name = $("fName").value.trim();
      var mobile = $("fMobile").value.replace(/\D/g,"");
      if (mobile.length === 12 && mobile.indexOf("91") === 0) mobile = mobile.slice(2);
      if (mobile.length === 11 && mobile.charAt(0) === "0") mobile = mobile.slice(1);
      var course = sel ? sel.value : "";
      var when = $("fTime").value;
      var msg = $("fMsg").value.trim();
      var ok = true;
      ok = setErr("eName", !name) && ok;
      ok = setErr("eMobile", !/^[6-9]\d{9}$/.test(mobile)) && ok;
      ok = setErr("eCourse", !course) && ok;
      if (!ok) return;
      var text = "Namaste, Genius Computer Institute — Admission Enquiry\n" +
        "Naam: " + name + "\nMobile: " + mobile + "\nCourse: " + course +
        (when ? "\nCallback ka samay: " + when : "") +
        (msg ? "\nSawaal: " + msg : "") +
        "\nKripya fees aur batch timing ki jaankari dein.";
      $("sentBox").classList.add("show");
      window.open(waLink(text), "_blank");
    });
  }

  /* ---- Reveal on scroll ---- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  }, {threshold:.1}) : null;
  document.querySelectorAll(".reveal").forEach(function(el){ if (io) io.observe(el); else el.classList.add("in"); });

  /* ---- Bottom tab bar: active page (multi-page site) ---- */
  var pageId = document.body.getAttribute("data-page") || "top";
  var tabByPage = {"top":"top","courses":"courses","typing":"typing","enquiry":"enquiry"}; /* contact has no tab in the bar, so none is active there */
  document.querySelectorAll(".stickybar a[data-tab]").forEach(function(a){
    /* clear any hard-coded tab-active from HTML first, then set the real one */
    a.classList.remove("tab-active");
    var want = tabByPage[pageId];
    if (want) a.classList.toggle("tab-active", a.getAttribute("data-tab") === want);
  });
  /* Press / bounce feedback on bottom-bar tabs (light, 180ms) */
  document.querySelectorAll(".stickybar a").forEach(function(a){
    a.addEventListener("click", function(){
      a.classList.add("pressed");
      window.setTimeout(function(){ a.classList.remove("pressed"); }, 180);
    });
  });

  var yr = $("yr"); if (yr) yr.textContent = new Date().getFullYear();
  var tt = $("tickerTrack"); if (tt) tt.innerHTML += tt.innerHTML;
})();
