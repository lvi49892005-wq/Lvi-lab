/* =========================================================
 * 공통 스크립트: 헤더/푸터 삽입 + data/*.js 를 화면에 렌더링
 * 페이지 정보는 각 HTML의 <meta name="lab-page" content="about" data-root=""> 에서 읽습니다.
 * 일반적으로 이 파일은 수정할 필요가 없습니다.
 * ========================================================= */
(function () {
  const S = window.SITE || {};
  const body = document.body;
  const META = document.querySelector('meta[name="lab-page"]');
  const PAGE = META ? META.content : "";
  const ROOT = (META && META.dataset.root) || "";          // en/ 페이지는 "../"
  const LANG = (META && META.dataset.lang) === "en" || document.documentElement.lang === "en" ? "en" : "ko";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel) => document.querySelector(sel);

  /* ---------- 아이콘 (inline SVG) ---------- */
  const ICON = {
    scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-6.8 9.2v4.3L12 20l6.8-3.5v-4.3L12 16l-6.8-3.8z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.300-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>',
    homepage: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6C8.9 5.5 8.4 6.7 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 0 1-4.4 3.6zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.3 17.3H6.7V8.6h1.6v8.7zM7.5 7.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3.2 1h3c2.8 0 4.1 2 4.1 4.3 0 2.5-2 4.3-4.1 4.3h-3V8.7zm1.6 1.4v5.8h1.3c1.900 0 2.6-1.4 2.6-2.9 0-1.6-1-2.9-2.6-2.9h-1.3z"/></svg>',
    clip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 6.5v10a4.5 4.5 0 0 1-9 0V5a3 3 0 0 1 6 0v10.5a1.5 1.5 0 0 1-3 0V6.5H9v9a3 3 0 0 0 6 0V5a4.5 4.5 0 0 0-9 0v11.5a6 6 0 0 0 12 0v-10h-1.5z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.3V17h16V7.3l-8 4.9zM19.2 7H4.8L12 11.4 19.2 7z"/></svg>'
  };

  /* ---------- 헤더 / 푸터 ---------- */
  const NAV_KO = [
    ["about", "index.html", "About Us"],
    ["research", "research.html", "Research"],
    ["publications", "publications.html", "Publications"],
    ["members", "members.html", "Members"],
    ["patents", "patents-awards.html", "Patents & Awards"],
    ["news", "news.html", "News & Notice"],
    ["gallery", "gallery.html", "Gallery"],
    ["join", "join.html", "Join Us"]
  ];
  const NAV_EN = [
    ["about", "#about", "About"],
    ["research", "#research", "Research"],
    ["publications", "../publications.html", "Publications"],
    ["members", "#people", "People"],
    ["gallery", "../gallery.html", "Gallery"],
    ["join", "#join", "Join Us"],
    ["location", "#location", "Location"]
  ];

  function renderHeader() {
    const en = LANG === "en";
    const nav = en ? NAV_EN : NAV_KO;
    const home = en ? "#about" : ROOT + "index.html";
    const langSwitch = en
      ? `<a class="lang" href="../index.html" lang="ko">한국어</a>`
      : `<a class="lang" href="${ROOT}en/index.html" lang="en">English</a>`;
    const links = nav.map(([key, href, label]) => {
      const url = en ? href : ROOT + href;
      return `<a href="${url}"${key === PAGE ? ' aria-current="page"' : ""}>${label}</a>`;
    }).join("");
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="${home}">
          <img class="brand-logo" src="${ROOT}assets/img/logo-header.png" alt="${esc(S.shortName)} ${en ? "logo" : "로고"}" width="151" height="56">
          <span class="brand-text">
            <strong>${esc(en ? S.nameEn : S.nameKo)}</strong>
            <small>${esc(en ? S.universityEn : S.university)}</small>
          </span>
        </a>
        <button class="nav-toggle" id="nav-toggle" aria-label="${en ? "Open menu" : "메뉴 열기"}" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="site-nav" aria-label="${en ? "Main menu" : "주 메뉴"}">${links}${langSwitch}</nav>
      </div>`;
    body.prepend(header);
    const btn = header.querySelector(".nav-toggle");
    btn.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    header.querySelectorAll(".site-nav a").forEach((a) =>
      a.addEventListener("click", () => { header.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }));
  }

  function renderFooter() {
    const f = document.createElement("footer");
    f.className = "site-footer";
    const en = LANG === "en";
    f.innerHTML = `
      <div class="container footer-inner">
        <div>
          <strong>${esc(en ? S.nameEn : S.nameKo)}</strong><br>
          ${esc(en ? S.universityEn : S.university)}<br>
          ${esc(en ? S.addressEn : S.address)}
        </div>
        <div>
          Tel. ${esc(en ? (S.phoneIntl || S.phone) : S.phone)}<br>
          E-mail. <span class="sel">${esc(S.email)}</span><br>
          ${S.github ? `<a href="${esc(S.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        </div>
      </div>
      <div class="container copyright">© ${S.year} ${esc(S.nameEn)}. All rights reserved.</div>`;
    body.append(f);
  }

  /* ---------- 공통 헬퍼 ---------- */
  function filterBar(el, options, onChange) {
    el.innerHTML = options.map(([v, l], i) =>
      `<button class="chip${i === 0 ? " active" : ""}" data-v="${v}" aria-pressed="${i === 0}">${l}</button>`).join("");
    el.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      el.querySelectorAll(".chip").forEach((c) => {
        c.classList.toggle("active", c === b);
        c.setAttribute("aria-pressed", c === b);
      });
      onChange(b.dataset.v);
    });
  }
  const linkBtn = (url, label) => url
    ? `<a class="tag-link" href="${esc(url)}" target="_blank" rel="noopener">${label}</a>` : "";

  /* ---------- Publications ---------- */
  const PUB_TYPE = {
    journal: ["Journal", "국제 학술지"], conference: ["Conference", "국제 학회"],
    domestic: ["Domestic", "국내 학술지·학회"], book: ["Book", "저서"], preprint: ["Preprint", "프리프린트"]
  };
  function renderPublications() {
    const list = $("#pub-list");
    if (!list || !window.PUBLICATIONS) return;
    const data = [...window.PUBLICATIONS].sort((a, b) => b.year - a.year);
    const en = LANG === "en";
    let type = "all", q = "";

    const draw = () => {
      const rows = data.filter((p) =>
        (type === "all" || p.type === type) &&
        (!q || `${p.title} ${p.authors} ${p.venue}`.toLowerCase().includes(q)));
      if (!rows.length) { list.innerHTML = `<p class="empty">${en ? "No results." : "해당하는 항목이 없습니다."}</p>`; return; }
      const years = [...new Set(rows.map((p) => p.year))];
      list.innerHTML = years.map((y) => {
        const items = rows.filter((p) => p.year === y);
        return `<section class="year-group">
          <h3 class="year">${y || (en ? "Year not specified" : "연도 미상")}<span>${items.length}</span></h3>
          <ol class="pub-items">${items.map((p) => `
            <li class="pub">
              <span class="badge badge-${p.type}">${(PUB_TYPE[p.type] || [p.type])[0]}</span>
              <div>
                <p class="pub-title">${esc(p.title)}</p>
                <p class="pub-authors">${esc(p.authors)}</p>
                <p class="pub-venue">${esc(p.venue)}${p.note ? ` <em class="note">${esc(p.note)}</em>` : ""}</p>
                <p class="pub-links">${linkBtn(p.doi && (p.doi.startsWith("http") ? p.doi : "https://doi.org/" + p.doi), "DOI")}${linkBtn(p.pdf, "PDF")}${linkBtn(p.code, "Code")}</p>
              </div>
            </li>`).join("")}
          </ol></section>`;
      }).join("");
    };

    const bar = $("#pub-filter");
    if (bar) {
      const opts = [["all", en ? "All" : "전체"]].concat(
        Object.keys(PUB_TYPE).filter((k) => data.some((p) => p.type === k))
          .map((k) => [k, en ? PUB_TYPE[k][0] : PUB_TYPE[k][1]]));
      filterBar(bar, opts, (v) => { type = v; draw(); });
    }
    const search = $("#pub-search");
    if (search) search.addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });

    const stats = $("#pub-stats");
    if (stats) {
      const c = (t) => data.filter((p) => p.type === t).length;
      stats.innerHTML = `
        <div><b>${c("journal")}</b><span>${en ? "Journal" : "국제 학술지"}</span></div>
        <div><b>${c("conference")}</b><span>${en ? "Conference" : "국제 학회"}</span></div>
        <div><b>${c("domestic")}</b><span>${en ? "Domestic" : "국내"}</span></div>`;
    }
    draw();
  }

  /* ---------- Members ---------- */
  const GROUPS = [
    ["faculty", "교수진", "Faculty"],
    ["researcher", "연구원", "Researchers"],
    ["integrated", "석박통합과정", "Integrated M.S.–Ph.D. Students"],
    ["phd", "박사과정", "Ph.D. Students"],
    ["ms", "석사과정", "M.S. Students"],
    ["intern", "학부연구생", "Undergraduate Interns"]
  ];
  const cvList = (title, items) => items && items.length
    ? `<div class="cv-block"><p class="cv-title">${title}</p><ul class="cv-list">${items.map((t) => {
        const m = String(t).match(/^(\S+(?:\s–\s\S+)?)\s{2,}(.*)$/);
        return m ? `<li><span class="cv-date">${esc(m[1])}</span><span>${esc(m[2])}</span></li>` : `<li><span></span><span>${esc(t)}</span></li>`;
      }).join("")}</ul></div>` : "";
  function memberCard(m, en) {
    const name = en ? (m.nameEn || m.name) : m.name;
    const initials = ((en ? m.nameEn : m.name) || m.name || m.nameEn || "?").replace(/[\[\]]/g, "").trim().slice(0, 1);
    const photo = m.photo
      ? `<img src="${ROOT}${esc(m.photo)}" alt="${esc(name)}" loading="lazy">`
      : `<span class="avatar-fallback" aria-hidden="true">${esc(initials)}</span>`;
    const L = m.links || {};
    const icons = [
      L.scholar && [L.scholar, "scholar", "Google Scholar"],
      L.github && [L.github, "github", "GitHub"],
      L.homepage && [L.homepage, "homepage", en ? "Homepage" : "개인 페이지"],
      L.orcid && [L.orcid, "orcid", "ORCID"]
    ].filter(Boolean).map(([u, k, t]) =>
      `<a class="icon-link" href="${esc(u)}" title="${t}" aria-label="${esc(name)} ${t}" target="_blank" rel="noopener">${ICON[k]}</a>`).join("");
    const mail = m.email ? `<p class="mail">${ICON.email}<span class="sel">${esc(m.email)}</span></p>` : "";
    return `<article class="member${m.group === "faculty" ? " member-lg" : ""}">
      <div class="avatar${m.photo ? " has-photo" : ""}">${photo}</div>
      <div class="member-body">
        <h4>${esc(name)}${!en && m.nameEn ? ` <small>${esc(m.nameEn)}</small>` : ""}</h4>
        <p class="position">${esc(en ? (m.positionEn || m.position) : m.position)}</p>
        ${(en ? (m.researchEn || m.research) : m.research) ? `<p class="research">${esc(en ? (m.researchEn || m.research) : m.research)}</p>` : ""}
        ${m.bio ? `<p class="bio">${esc(m.bio)}</p>` : ""}
        ${mail}
        ${icons ? `<div class="icons">${icons}</div>` : ""}
        ${(m.education || m.career) ? `<div class="cv-grid">
          ${cvList(en ? "Education" : "학력", en ? (m.educationEn || m.education) : m.education)}
          ${cvList(en ? "Career" : "경력", en ? (m.careerEn || m.career) : m.career)}</div>` : ""}
      </div></article>`;
  }
  function renderAlumni() {
    const t = $("#alumni-table tbody");
    const list = [...(window.ALUMNI || [])].sort((a, b) => b.year - a.year);
    if (t) {
      t.innerHTML = list.map((a) => `<tr><td class="mono">${a.year}</td><td class="t-title">${esc(a.name)}</td>
        <td>${esc(a.degree)}</td><td>${esc(a.now)}</td></tr>`).join("");
      const c = $("#alumni-count");
      if (c) {
        const n = (d) => list.filter((a) => a.degree === d).length;
        c.textContent = `총 ${list.length}명 (박사 ${n("박사")}명, 석사 ${n("석사")}명)`;
      }
    }
    const en = $("#alumni-count-en");
    if (en) en.textContent = String(list.length);
  }
  function renderMembers() {
    const wrap = $("#member-list");
    if (!wrap || !window.MEMBERS) return;
    const en = LANG === "en";
    wrap.innerHTML = GROUPS.map(([g, ko, eng]) => {
      const ms = window.MEMBERS.filter((m) => m.group === g);
      if (!ms.length) return "";
      return `<section class="member-group" id="g-${g}">
        <h3 class="section-sub">${en ? eng : ko}</h3>
        <div class="member-grid${g === "faculty" ? " faculty" : ""}">${ms.map((m) => memberCard(m, en)).join("")}</div>
      </section>`;
    }).join("");
  }

  /* ---------- News ---------- */
  const NEWS_CAT = { news: "연구실 소식", seminar: "세미나", recruit: "모집", notice: "공지" };
  function newsItem(n) {
    const ext = !n.id && /^https?:\/\//.test(n.link || "");
    const clip = n.attachments && n.attachments.length ? ' <span class="clip" title="첨부파일" aria-label="첨부파일">${ICON.clip}</span>' : "";
    const title = n.id
      ? `<a href="${ROOT}post.html?id=${encodeURIComponent(n.id)}">${esc(n.title)}</a>${clip}`
      : n.link
        ? `<a href="${ext ? "" : ROOT}${esc(n.link)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(n.title)}${ext ? " ↗" : ""}</a>`
        : esc(n.title);
    return `<li class="news-item${n.pinned ? " pinned" : ""}">
      <time datetime="${esc(n.date)}">${esc(n.date)}</time>
      <span class="badge badge-${n.category}">${NEWS_CAT[n.category] || n.category}</span>
      <div><p class="news-title">${n.pinned ? '<span class="pin">고정</span>' : ""}${title}</p>${n.body ? `<p class="news-body">${esc(n.body)}</p>` : ""}</div>
    </li>`;
  }
  function sortedNews() {
    return [...(window.NEWS || [])].sort((a, b) =>
      (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date));
  }
  function renderNews() {
    const list = $("#news-list");
    if (list && window.NEWS) {
      const data = sortedNews();
      const draw = (c) => {
        const rows = data.filter((n) => c === "all" || n.category === c);
        list.innerHTML = rows.length ? rows.map(newsItem).join("") : `<p class="empty">등록된 글이 없습니다.</p>`;
      };
      const bar = $("#news-filter");
      if (bar) filterBar(bar, [["all", "전체"], ...Object.entries(NEWS_CAT)], draw);
      draw("all");
    }
    const latest = $("#latest-news");          // 메인 페이지 최근 소식
    if (latest && window.NEWS) latest.innerHTML = sortedNews().slice(0, 4).map(newsItem).join("");
  }

  /* ---------- 게시글 상세 (post.html?id=...) + 댓글(giscus) ---------- */
  function renderPost() {
    const box = $("#post");
    if (!box) return;
    const id = new URLSearchParams(location.search).get("id");
    const n = (window.NEWS || []).find((x) => x.id && x.id === id);
    if (!n) {
      box.innerHTML = `<p class="empty">게시글을 찾을 수 없습니다.</p><p><a href="news.html">← 목록으로</a></p>`;
      return;
    }
    document.title = `${n.title} | ${S.nameKo}`;
    const secs = (n.sections || []).map((s) => `<section class="post-sec">
        <h3>${esc(s.title)}</h3>
        <ul>${(s.items || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </section>`).join("");
    const files = (n.attachments || []).map((a) => `<li>
        <span class="clip" aria-hidden="true">${ICON.clip}</span>
        <a href="${ROOT}${esc(a.file)}" download>${esc(a.name)}</a>
        <a class="tag-link" href="${ROOT}${esc(a.file)}" target="_blank" rel="noopener">새 창에서 보기</a>
      </li>`).join("");
    box.innerHTML = `
      <p class="post-back"><a href="news.html">← 목록으로</a></p>
      <header class="post-head">
        <span class="badge badge-${esc(n.category)}">${NEWS_CAT[n.category] || esc(n.category)}</span>
        <h1>${esc(n.title)}</h1>
        <time datetime="${esc(n.date)}">${esc(n.date)}</time>
      </header>
      ${n.body ? `<p class="post-lead">${esc(n.body)}</p>` : ""}
      ${secs ? `<div class="post-secs">${secs}</div>` : ""}
      ${files ? `<div class="post-files"><h3>첨부파일</h3><ul>${files}</ul></div>` : ""}
      ${n.image ? `<figure class="post-figure"><img src="${ROOT}${esc(n.image)}" alt="${esc(n.title)} 공고 포스터" loading="lazy"></figure>` : ""}
      ${n.link && /^https?:\/\//.test(n.link) ? `<p><a href="${esc(n.link)}" target="_blank" rel="noopener">관련 링크 ↗</a></p>` : ""}
      <section class="post-comments" id="comments">
        <h2 class="section-title">댓글</h2>
        <div class="giscus"></div>
      </section>`;
    loadComments(n.id);
  }

  function loadComments(term) {
    const holder = document.querySelector("#comments .giscus");
    const G = S.giscus || {};
    if (!holder) return;
    if (!G.repo || !G.repoId || !G.categoryId) {
      holder.innerHTML = `<p class="empty">댓글 기능을 준비하고 있습니다.</p>`;
      return;
    }
    const sc = document.createElement("script");
    sc.src = "https://giscus.app/client.js";
    const attrs = {
      "data-repo": G.repo, "data-repo-id": G.repoId,
      "data-category": G.category || "Announcements", "data-category-id": G.categoryId,
      "data-mapping": "specific", "data-term": term, "data-strict": "1",
      "data-reactions-enabled": "1", "data-emit-metadata": "0", "data-input-position": "top",
      "data-theme": "light", "data-lang": "ko", "data-loading": "lazy"
    };
    Object.entries(attrs).forEach(([k, v]) => sc.setAttribute(k, v));
    sc.crossOrigin = "anonymous";
    sc.async = true;
    holder.appendChild(sc);
  }

  /* ---------- Gallery (data/gallery.js) ---------- */
  function renderGallery() {
    const wrap = $("#gallery");
    if (!wrap) return;
    const albums = [...(window.GALLERY || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    if (!albums.length) {
      wrap.innerHTML = `<div class="gallery-empty"><p><b>아직 올라온 사진이 없습니다.</b></p>
        <p>사진을 올리는 방법은 저장소의 README 「사진 게시판」 항목을 참고해 주세요.</p></div>`;
      return;
    }
    const all = [];   // 라이트박스 순서
    const jump = albums.length > 3
      ? `<nav class="g-jump chips" aria-label="연도 바로가기">${albums.map((al, k) =>
          `<a class="chip" href="#album-${k}">${esc(al.title)}</a>`).join("")}</nav>` : "";
    wrap.innerHTML = jump + albums.map((al, k) => {
      const photos = (al.photos || []).map((ph) => typeof ph === "string" ? { src: ph, caption: "" } : ph);
      const tiles = photos.map((ph) => {
        const i = all.push({ src: ROOT + ph.src, caption: ph.caption || "", album: al.title }) - 1;
        const alt = ph.caption || `${al.title} 사진`;
        return `<li><button type="button" class="g-tile" data-i="${i}" aria-label="${esc(alt)} 크게 보기">
          <img src="${ROOT}${esc(ph.thumb || ph.src)}" alt="${esc(alt)}" loading="lazy"></button>
          ${ph.caption ? `<p class="g-cap">${esc(ph.caption)}</p>` : ""}</li>`;
      }).join("");
      const showDate = al.date && !String(al.title).includes(String(al.date));
      return `<section class="album" id="album-${k}">
        <header class="album-head">
          ${showDate ? `<time datetime="${esc(al.date)}">${esc(al.date)}</time>` : ""}
          <h3>${esc(al.title)} <span class="g-count">${photos.length}장</span></h3>
          ${al.desc ? `<p>${esc(al.desc)}</p>` : ""}
        </header>
        <ul class="g-grid">${tiles}</ul>
      </section>`;
    }).join("");

    // 라이트박스
    const lb = document.createElement("div");
    lb.className = "lightbox"; lb.hidden = true;
    lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "사진 크게 보기");
    lb.innerHTML = `<button type="button" class="lb-close" aria-label="닫기">×</button>
      <button type="button" class="lb-nav lb-prev" aria-label="이전 사진">‹</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button type="button" class="lb-nav lb-next" aria-label="다음 사진">›</button>`;
    document.body.appendChild(lb);
    const img = lb.querySelector("img"), cap = lb.querySelector("figcaption");
    let cur = 0, opener = null;
    const show = (i) => {
      cur = (i + all.length) % all.length;
      const it = all[cur];
      img.src = it.src; img.alt = it.caption || `${it.album} 사진`;
      cap.textContent = `${it.caption ? it.caption + " · " : ""}${it.album}  (${cur + 1}/${all.length})`;
    };
    const open = (i, btn) => { opener = btn; show(i); lb.hidden = false; document.body.classList.add("lb-open"); lb.querySelector(".lb-close").focus(); };
    const close = () => { lb.hidden = true; document.body.classList.remove("lb-open"); if (opener) opener.focus(); };
    wrap.addEventListener("click", (e) => { const t = e.target.closest(".g-tile"); if (t) open(+t.dataset.i, t); });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(cur - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(cur + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(cur - 1);
      else if (e.key === "ArrowRight") show(cur + 1);
    });
    if (all.length < 2) lb.querySelectorAll(".lb-nav").forEach((b) => (b.hidden = true));
  }

  /* ---------- Patents & Awards ---------- */
  const PAT_STATUS = { registered: "등록", applied: "출원", pct: "PCT" };
  function renderPatents() {
    const t = $("#patent-table tbody");
    const P = window.PATENTS || [];
    if (t) {
      let filter = "all";
      const order = { registered: 0, pct: 1, applied: 2 };
      const rows = [...P].sort((a, b) => (order[a.status] - order[b.status]) || (b.regDate || b.appDate).localeCompare(a.regDate || a.appDate));
      const num = (no, d) => no ? `${esc(no)}<small>${esc(d)}</small>` : `<span class="dash">–</span>`;
      const draw = () => {
        t.innerHTML = rows.filter((p) => filter === "all" || p.status === filter).map((p) => `<tr>
          <td><span class="badge badge-${p.status}">${PAT_STATUS[p.status] || p.status}</span></td>
          <td class="t-title">${esc(p.title)}</td>
          <td>${esc(p.country)}</td>
          <td class="mono">${num(p.appNo, p.appDate)}</td>
          <td class="mono">${num(p.regNo, p.regDate)}</td></tr>`).join("");
      };
      const bar = $("#patent-filter");
      if (bar) filterBar(bar, [["all", "전체"], ["registered", "등록"], ["pct", "PCT"], ["applied", "출원"]], (v) => { filter = v; draw(); });
      draw();
      const s = $("#patent-stats");
      if (s) {
        const c = (k) => P.filter((p) => p.status === k).length;
        s.innerHTML = `<div><b>${c("registered")}</b><span>등록 특허</span></div>
          <div><b>${c("applied")}</b><span>출원 특허</span></div>
          <div><b>${c("pct")}</b><span>PCT 국제출원</span></div>
          <div><b>${(window.TRANSFERS || []).length}</b><span>기술이전</span></div>`;
      }
    }
    const tr = $("#transfer-table tbody");
    if (tr && window.TRANSFERS) tr.innerHTML = window.TRANSFERS.map((w) => `<tr>
      <td class="mono">${esc(w.date)}</td><td class="t-title">${esc(w.title)}</td><td>${esc(w.company)}</td></tr>`).join("");
    const a = $("#award-table tbody");
    const sec = $("#award-section");
    if (sec) sec.hidden = !(window.AWARDS && window.AWARDS.length);
    if (a && window.AWARDS) a.innerHTML = window.AWARDS.map((w) => `<tr>
      <td class="mono">${esc(w.date)}</td><td class="t-title">${esc(w.title)}</td>
      <td>${esc(w.recipient)}</td><td>${esc(w.org)}</td></tr>`).join("");
  }

  /* ---------- 사이트 설정값 채우기 (data-site="email" 등) ---------- */
  function fillSite() {
    document.querySelectorAll("[data-site]").forEach((el) => {
      const v = S[el.dataset.site];
      if (v == null) return;
      if (el.tagName === "A") {               // 링크형(scholar, github 등): href만 설정, 텍스트 유지
        if (v) { el.href = v; el.target = "_blank"; el.rel = "noopener"; }
        return;
      }
      el.textContent = v;
    });
  }

  /* ---------- Google 지도 삽입 ----------
   * 직접 호스팅한 사이트(최상위 창)에서만 iframe 을 넣습니다.
   * Claude 미리보기 링크처럼 다른 페이지 안에 들어가 있으면 외부 지도 삽입이 막혀 있으므로 버튼을 그대로 둡니다. */
  function renderMap() {
    const box = $("#map-embed");
    if (!box || !S.mapEmbed) return;
    let topLevel = false;
    try { topLevel = window.self === window.top; } catch (e) { topLevel = false; }
    if (!topLevel) return;
    box.innerHTML = `<iframe src="${esc(S.mapEmbed)}" title="${LANG === "en" ? "Map" : "오시는 길 지도"}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  }

  renderHeader();
  renderFooter();
  renderMap();
  fillSite();
  renderPublications();
  renderMembers();
  renderAlumni();
  renderNews();
  renderPost();
  renderGallery();
  renderPatents();
  setupReveal();

  /* ---------- 스크롤 페이드 인 ----------
   * 처음 화면에 보이는 요소는 그대로 두고, 아래쪽 요소만 스크롤로 들어올 때 나타나게 합니다.
   * '동작 줄이기' 설정 사용자, IntersectionObserver 미지원 브라우저에서는 적용하지 않습니다. */
  function setupReveal() {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    const SEL = [
      ".section-title", ".section-sub", ".lead", ".greeting", ".map-wrap", ".stats", ".filter-row",
      ".card", ".member", ".year-group", ".news-item", ".album", ".table-wrap", ".steps li", ".checklist", ".cta", ".count-line"
    ].join(",");
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    document.querySelectorAll(SEL).forEach((el) => {
      if (el.closest(".site-header, .site-footer, .hero")) return;
      if (el.parentElement && el.parentElement.closest(".reveal")) return;   // 바깥 요소가 이미 애니메이션 대상
      if (el.getBoundingClientRect().top < vh) return;                        // 첫 화면에 보이는 요소는 그대로
      // 같은 줄에 놓인 카드들은 조금씩 늦게 나타나게 (최대 3단계)
      const sibs = el.parentElement ? [...el.parentElement.children] : [];
      const i = sibs.indexOf(el);
      if (sibs.length > 1 && i > 0) el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
