/* =========================================================
 * 구성원 목록
 *  group: "faculty" | "researcher" | "integrated"(석박통합) | "phd" | "ms" | "intern"
 *  photo: "assets/img/파일명.jpg" (비워두면 이니셜 아바타 표시)
 *  links: 해당 항목이 없으면 빈 문자열 → 아이콘이 숨겨집니다.
 *  career / careerEn: 교수 약력 (위에서부터 최신순)
 * ========================================================= */
window.MEMBERS = [
  {
    group: "faculty",
    name: "남재환", nameEn: "Jae-Hwan Nam",
    position: "교수 / 연구책임자", positionEn: "Professor, Principal Investigator",
    research: "바이러스학, 백신학, mRNA 백신·치료제",
    researchEn: "Virology, vaccinology, mRNA vaccines and therapeutics",
    email: "",
    photo: "assets/img/prof-nam.webp",
    education: [
      "1997  고려대학교 바이러스학 박사",
      "1993  고려대학교 유전학 석사",
      "1990  고려대학교 생물학 학사"
    ],
    educationEn: [
      "1997  Ph.D. in Virology, Korea University",
      "1993  M.Sc. in Genetics, Korea University",
      "1990  B.Sc. in Biology, Korea University"
    ],
    career: [
      "2026.01 – 현재  국립보건연구원 원장",
      "2026.01 – 현재  대한바이러스학회 회장",
      "2005.03 – 현재  가톨릭대학교 의생명과학과 교수",
      "2012.02 – 2013.01  미국 Pennington Biomedical Research Center (LSU) 방문교수",
      "2002.08 – 2005.02  국립보건원 생명의과학부 선임연구원",
      "1998.02 – 2001.02  미국 NIH 간염바이러스실 (LID) 박사후연구원",
      "1995.11 – 1996.04  미국 NIH 바이러스질환실 (LVD) 연구원",
      "1993.10 – 2002.07  국립보건원 바이러스부 연구원"
    ],
    careerEn: [
      "2026.01 – present  General Director, Korea National Institute of Health",
      "2026.01 – present  President, Korean Society of Virology",
      "2005.03 – present  Professor, Dept. of Medical and Biological Sciences, The Catholic University of Korea",
      "2012.02 – 2013.01  Visiting Professor, Pennington Biomedical Research Center, LSU System, USA",
      "2002.08 – 2005.02  Senior Research Scientist, Dept. of Biomedical Science, Korean National Institute of Health",
      "1998.02 – 2001.02  Postdoctoral Fellow, Hepatitis Virus Section, LID, NIH, USA",
      "1995.11 – 1996.04  Researcher, Laboratory of Viral Diseases, NIH, USA",
      "1993.10 – 2002.07  Research Scientist, Dept. of Virology, Korean National Institute of Health"
    ],
    links: { scholar: "https://scholar.google.com/citations?user=0KNsVokAAAAJ&hl=ko", github: "", homepage: "", orcid: "" }
  },

  /* ----- 석박통합과정 ----- */
  { group: "integrated", name: "하다현", nameEn: "Dahyeon Ha",     position: "석박통합과정", positionEn: "Integrated M.S.–Ph.D. Student", links: {} },
  { group: "integrated", name: "이수연", nameEn: "Soo-Yeon Lee",   position: "석박통합과정", positionEn: "Integrated M.S.–Ph.D. Student", links: {} },
  { group: "integrated", name: "최은진", nameEn: "Eun-Jin Choi",   position: "석박통합과정", positionEn: "Integrated M.S.–Ph.D. Student", links: {} },
  { group: "integrated", name: "조소희", nameEn: "Sohee Jo",       position: "석박통합과정", positionEn: "Integrated M.S.–Ph.D. Student", links: {} },
  { group: "integrated", name: "강유진", nameEn: "Yujin Kang",     position: "석박통합과정", positionEn: "Integrated M.S.–Ph.D. Student", links: {} },
  { group: "integrated", name: "강은솔", nameEn: "Eunsol Kang",    position: "석박통합과정", positionEn: "Integrated M.S.–Ph.D. Student", links: {} },

  /* ----- 석사과정 ----- */
  { group: "ms", name: "김혜민", nameEn: "Hyemin Kim",   position: "석사과정", positionEn: "M.S. Student", links: {} },
  { group: "ms", name: "신지수", nameEn: "Jisu Shin",    position: "석사과정", positionEn: "M.S. Student", links: {} },
  { group: "ms", name: "윤상호", nameEn: "Sangho Yun",  position: "석사과정", positionEn: "M.S. Student", links: {} },
  { group: "ms", name: "박예은", nameEn: "Yeeun Park",   position: "석사과정", positionEn: "M.S. Student", links: {} },
  { group: "ms", name: "이승아", nameEn: "Seungah Lee",  position: "석사과정", positionEn: "M.S. Student", links: {} }
];

/* =========================================================
 * 졸업생 (표로 표시, 최신 졸업 연도순으로 자동 정렬)
 *  degree: "박사" | "석사"
 * ========================================================= */
window.ALUMNI = [
  { year: 2009, name: "김연정", degree: "석사", now: "녹십자 중앙연구소" },
  { year: 2009, name: "정수영", degree: "석사", now: "제네시스" },
  { year: 2010, name: "김대선", degree: "박사", now: "캐나다 캘거리 대학교 포스닥" },
  { year: 2011, name: "박기범", degree: "석사", now: "㈜ 일양약품" },
  { year: 2011, name: "박미영", degree: "석사", now: "LAS" },
  { year: 2012, name: "나하나", degree: "박사", now: "브라운대학교 포스닥" },
  { year: 2012, name: "김수진", degree: "석사", now: "질병관리본부" },
  { year: 2014, name: "심승현", degree: "박사", now: "LAS" },
  { year: 2014, name: "박성아", degree: "석사", now: "셀인바이오" },
  { year: 2014, name: "박혜림", degree: "박사", now: "GC 녹십자" },
  { year: 2014, name: "전현정", degree: "석사", now: "동인바이오텍" },
  { year: 2014, name: "안선영", degree: "석사", now: "㈜유영제약" },
  { year: 2016, name: "박수호", degree: "박사", now: "종근당" },
  { year: 2016, name: "이상연", degree: "석사", now: "셀리버리" },
  { year: 2016, name: "정지우", degree: "석사", now: "GenScript" },
  { year: 2017, name: "윤일섭", degree: "석사", now: "SK 바이오사이언스" },
  { year: 2017, name: "최슬기", degree: "석사", now: "인터파크 바이오 융합연구소" },
  { year: 2017, name: "이득기", degree: "석사", now: "스크립스" },
  { year: 2017, name: "김학",   degree: "박사", now: "SK 바이오사이언스" },
  { year: 2017, name: "정서연", degree: "석사", now: "SK 바이오사이언스" },
  { year: 2018, name: "황경아", degree: "박사", now: "삼광의료재단" },
  { year: 2019, name: "이승목", degree: "석사", now: "SML 제니트리" },
  { year: 2019, name: "김륜호", degree: "석사", now: "에이엠사이언스" },
  { year: 2019, name: "박선화", degree: "석사", now: "SML 제니트리" },
  { year: 2020, name: "김혜정", degree: "석사", now: "차바이오텍" },
  { year: 2021, name: "이수진", degree: "박사", now: "SK 바이오사이언스" },
  { year: 2021, name: "이건세", degree: "박사", now: "SK 바이오사이언스" },
  { year: 2021, name: "김윤희", degree: "박사", now: "SK 바이오사이언스" },
  { year: 2021, name: "김상연", degree: "석사", now: "SML 제니트리" },
  { year: 2021, name: "조예나", degree: "석사", now: "SK 바이오사이언스" },
  { year: 2022, name: "곽혜원", degree: "박사", now: "SML 바이오팜" },
  { year: 2023, name: "박형준", degree: "박사", now: "SML 바이오팜" },
  { year: 2024, name: "김재용", degree: "박사", now: "SML 바이오팜" },
  { year: 2024, name: "방유진", degree: "박사", now: "SML 바이오팜" },
  { year: 2024, name: "이유선", degree: "박사", now: "GC 녹십자" },
  { year: 2024, name: "노가현", degree: "석사", now: "SK 바이오사이언스" },
  { year: 2025, name: "배서현", degree: "박사", now: "GC 녹십자" },
  { year: 2025, name: "오아영", degree: "석사", now: "국립보건연구원" },
  { year: 2026, name: "조성제", degree: "박사", now: "LG 화학" },
  { year: 2026, name: "조영란", degree: "박사", now: "" },
  { year: 2026, name: "윤수빈", degree: "박사", now: "GC 녹십자" },
  { year: 2026, name: "이성현", degree: "박사", now: "유타주립대학 포스닥" },
  { year: 2026, name: "김연정", degree: "박사", now: "GC 녹십자" },
  { year: 2026, name: "정오석", degree: "박사", now: "SK 바이오사이언스" },
  { year: 2026, name: "최희정", degree: "석사", now: "국립보건연구원" },
  { year: 2026, name: "이예은", degree: "석사", now: "연세대학교 석사후 연구원" },
  { year: 2026, name: "정혜선", degree: "석사", now: "SML 바이오팜" },
  { year: 2026, name: "김아연", degree: "석사", now: "SML 바이오팜" },
  { year: 2026, name: "김정민", degree: "석사", now: "국제백신연구소" },
  { year: 2026, name: "전상혁", degree: "석사", now: "한국파스퇴르연구소" },
  { year: 2026, name: "이소원", degree: "석사", now: "유타주립대학 석사 후 연구원" }
];
