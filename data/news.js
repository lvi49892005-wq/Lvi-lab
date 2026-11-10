/* =========================================================
 * 소식 · 세미나 · 모집 공고
 *  category: "news"(연구실 소식) | "seminar"(세미나) | "recruit"(모집) | "notice"(공지)
 *  date: "YYYY-MM-DD" — 최신순 자동 정렬
 *  pinned: true 이면 목록 상단 고정
 *  id 가 있으면 제목을 눌렀을 때 상세 페이지(post.html?id=...)로 이동하고 댓글을 달 수 있습니다.
 *    sections: [{ title, items: [...] }]  상세 내용 / image: 포스터 이미지 / attachments: 첨부파일
 *  id 가 없고 link 가 있으면 그 주소로 이동합니다 (외부 기사 등).
 * ========================================================= */
window.NEWS = [
  
  {
    date: "2026-11-10", category: "recruit", pinned: true,
    id: "2027-graduate-recruitment",
    title: "2027 전기 및 후기 대학원생 모집",
    body: "가톨릭대학교 의생명과학과 남재환 교수님 - 화학과 이기연 교수님 공동지도교수로 유기합성과 mRNA 백신 전달체에 대해 연구할 대학원생을 모집합니다. 자세한 내용은 공고문을 확인해주세요.",
    // 상세 페이지 내용 (공고문 PDF 내용을 옮김)
    sections: [
      { title: "개요", items: ["mRNA 백신의 핵심 중 하나인 지질나노입자를 유기합성부터 체계적으로 배울 대학원생을 모집합니다.", "의생명과학과 남재환 교수님 – 화학과 이기연 교수님 공동 지도"] },
      { title: "모집기간", items: ["2026. 11. 11(수) ~ 인원 충족 시", "면담일자: 2026. 11. 13(금) ※ 추후 교수님과 논의 하에 별도 면담 가능"] },
      { title: "모집인원 및 지원자격", items: ["0 명 – 27년 1학기 또는 2학기 입학", "학부 4학년 이상", "화학과, BMCE, 생명공학, 의생명과학 전공"] },
      { title: "제출서류", items: ["CV 1부", "성적증명서 1부", "지원 동기, 관심 분야를 포함한 간단한 자기소개서 (Word 기본 레이아웃, 맑은 고딕, 12pt, A4 1장 이내)","※2026.11.13(금)에 면담 가능할 경우 제출서류 없이 지원 가능"] },
      { title: "지원 방법", items: ["CV 보낼 곳: lvi4989.2005@gmail.com"] }
    ],
    image: "assets/files/2027-graduate-recruitment.webp",
    attachments: [{ name: "2027 대학원생 모집 공고문 (PDF)", file: "assets/files/2027-graduate-recruitment.pdf" }]
  },
  
  {
    date: "2026-11-10", category: "recruit", pinned: true,
    id: "2027-undergraduate-intern-recruitment",
    title: "2027 전기 학부연구생 모집",
    body: "연구실에서 함께할 학부연구생을 모집합니다. 자세한 내용은 공고문을 확인해주세요.",
    sections: [
      { title: "모집기간", items: ["2026. 11. 13(금) ~ 2026. 11. 23(월)", "면담일자: 2026. 11. 27(금) ※ 대략적인 날짜로 추후 변동 가능"] },
      { title: "인턴 시작일", items: ["2027. 01. 04(월) ~"] },
      { title: "모집인원 및 지원자격", items: ["0 명", "3학년 1학기를 마친 관련 전공 학생"] },
      { title: "제출서류", items: ["CV 1부", "성적증명서 1부", "지원 동기, 관심 분야를 포함한 간단한 자기소개서 (Word 기본 레이아웃, 맑은 고딕, 12pt, A4 1장 이내)"] },
      { title: "지원 방법", items: ["CV 보낼 곳: lvi4989.2005@gmail.com"] }
    ],
    image: "assets/files/2027-undergraduate-intern-recruitment.webp",
    attachments: [{ name: "2027 학부연구생 모집 공고문 (PDF)", file: "assets/files/2027-undergraduate-intern-recruitment.pdf" }]
  },

  {
    date: "2026-01", category: "news",
    title: "남재환 교수, 국립보건연구원장 취임",
    body: "남재환 교수가 2026년 1월부터 국립보건연구원(질병관리청 소속) 원장을 맡고 있습니다.",
    link: ""
  },

  /* ----- 언론 보도 (날짜 = 기사 게재일, link = 기사 원문) ----- */
  {
    date: "2026-08-04", category: "news",
    title: "차세대 mRNA 백신 전달체(LNP) 개발 보도",
    body: "지질나노입자의 지질 성분을 새로 설계해 백신 물질이 목표 면역 장기로 전달되도록 하고, 기존 전달체의 독성과 부작용을 줄였다는 연구 성과가 보도되었습니다. (머니투데이)",
    link: "https://www.mt.co.kr/policy/2026/08/04/2026080415051256069"
  },
  {
    date: "2025-07-31", category: "news",
    title: "개인 맞춤형 mRNA 암백신 개발 — Advanced Science 게재",
    body: "SML바이오팜과 함께 개인 암 유전정보에 기반한 치료용 mRNA 백신을 제작하고, 대장암 쥐 모델에서 면역세포 활성화와 암 성장 억제 효과를 확인했습니다. (뉴데일리)",
    link: "https://biz.newdaily.co.kr/site/data/html/2025/07/31/2025073100396.html"
  },
  {
    date: "2025-04-17", category: "news",
    title: "SFTS(살인진드기 바이러스) mRNA 항체 치료제 개발 — Journal of Controlled Release 게재",
    body: "항체 정보를 담은 mRNA를 지질나노입자로 전달해 체내에서 항체가 만들어지도록 하는 방식으로, 치사량의 바이러스에 감염된 마우스가 모두 생존했습니다. (뉴데일리)",
    link: "https://biz.newdaily.co.kr/site/data/html/2025/04/17/2025041700004.html"
  },
  {
    date: "2024-12-23", category: "news",
    title: "남재환 교수, 2024년 국가연구개발 우수성과 100선 선정",
    body: "국산 mRNA 백신 기술의 토대를 마련한 성과로 과학기술정보통신부 주관 국가연구개발 우수성과 100선에 선정되었습니다. (뉴시스)",
    link: "https://www.newsis.com/view/NISX20241223_0003006993"
  },
  {
    date: "2023-10-24", category: "news",
    title: "KIST와 mRNA 전달체 핵심 소재 '이온화 지질' 개발",
    body: "KIST 금교창 박사팀과 함께 지질나노입자의 핵심 구성요소인 이온화 지질을 개발했으며, 이 기술은 SML바이오팜에 이전되었습니다. (베타뉴스)",
    link: "https://m.betanews.net/article/view/beta202310240008"
  }
];
