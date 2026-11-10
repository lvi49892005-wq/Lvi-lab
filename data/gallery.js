/* =========================================================
 * 사진 게시판 (Gallery) — 연도별 앨범, 최신 연도가 맨 위
 *
 *  사진 추가 방법
 *  1) 사진을 assets/gallery/<연도>/ 폴더에 올립니다. (예: assets/gallery/2026/2026-05-01.jpg)
 *  2) 아래 해당 연도 앨범의 photos 맨 앞에 한 줄을 추가합니다. (맨 앞 = 가장 먼저 보임)
 *       { src: "assets/gallery/2026/2026-05-01.jpg", caption: "봄 산책 (2026.05)" },
 *     - thumb(작은 사진)은 없어도 됩니다. 없으면 src 사진을 그대로 씁니다.
 *  3) 새 연도라면 앨범 하나를 통째로 맨 위에 추가합니다.
 *       { date: "2027", title: "2027년", photos: [ ... ] },
 *
 *  ※ 사진은 가로 1600px 이하, 1장 1MB 안팎으로 줄여서 올려 주세요.
 *  ※ 얼굴이 나온 사진은 본인 동의를 받은 뒤 올려 주세요.
 * ========================================================= */
window.GALLERY = [
  {
    date: "2026", title: "2026년",
    photos: [
      { src: "assets/gallery/2026/2026-02-01.webp", thumb: "assets/gallery/2026/thumbs/2026-02-01.webp", caption: "졸업식 (2026.02)" }
    ]
  },
  {
    date: "2025", title: "2025년",
    photos: [
      { src: "assets/gallery/2025/2025-08-01.webp", thumb: "assets/gallery/2025/thumbs/2025-08-01.webp", caption: "바이러스학회 MT (2025.08)" },
      { src: "assets/gallery/2025/2025-08-02.webp", thumb: "assets/gallery/2025/thumbs/2025-08-02.webp", caption: "학사졸업식 (2025.08)" },
      { src: "assets/gallery/2025/2025-02-03.webp", thumb: "assets/gallery/2025/thumbs/2025-02-03.webp", caption: "졸업식 (2025.02)" },
      { src: "assets/gallery/2025/2025-01-04.webp", thumb: "assets/gallery/2025/thumbs/2025-01-04.webp", caption: "미국 GRC 학회 (2025.01)" }
    ]
  },
  {
    date: "2024", title: "2024년",
    photos: [
      { src: "assets/gallery/2024/2024-02-01.webp", thumb: "assets/gallery/2024/thumbs/2024-02-01.webp", caption: "졸업 (2024.02)" }
    ]
  },
  {
    date: "2023", title: "2023년",
    photos: [
      { src: "assets/gallery/2023/2023-12-01.webp", thumb: "assets/gallery/2023/thumbs/2023-12-01.webp", caption: "크리스마스 파티 (2023.12)" },
      { src: "assets/gallery/2023/2023-10-02.webp", thumb: "assets/gallery/2023/thumbs/2023-10-02.webp", caption: "가을산책 (2023.10)" },
      { src: "assets/gallery/2023/2023-08-03.webp", thumb: "assets/gallery/2023/thumbs/2023-08-03.webp", caption: "바이러스학회 MT (2023.08)" },
      { src: "assets/gallery/2023/2023-08-04.webp", thumb: "assets/gallery/2023/thumbs/2023-08-04.webp", caption: "학사졸업식 (2023.08)" },
      { src: "assets/gallery/2023/2023-06-05.webp", thumb: "assets/gallery/2023/thumbs/2023-06-05.webp", caption: "티셔츠맞춤 (2023.06)" },
      { src: "assets/gallery/2023/2023-06-06.webp", thumb: "assets/gallery/2023/thumbs/2023-06-06.webp", caption: "티셔츠맞춤 (2023.06)" }
    ]
  },
  {
    date: "2022", title: "2022년",
    photos: [
      { src: "assets/gallery/2022/2022-00-01.webp", thumb: "assets/gallery/2022/thumbs/2022-00-01.webp", caption: "봄 산책" }
    ]
  },
  {
    date: "2021", title: "2021년",
    photos: [
      { src: "assets/gallery/2021/2021-00-01.webp", thumb: "assets/gallery/2021/thumbs/2021-00-01.webp", caption: "바이러스면역학연구실 봄 산책" },
      { src: "assets/gallery/2021/2021-00-02.webp", thumb: "assets/gallery/2021/thumbs/2021-00-02.webp", caption: "바이러스면역학연구실 봄 산책" }
    ]
  },
  {
    date: "2020", title: "2020년",
    photos: [
      { src: "assets/gallery/2020/2020-02-01.webp", thumb: "assets/gallery/2020/thumbs/2020-02-01.webp", caption: "김혜정 석사졸업 (2020.02)" }
    ]
  },
  {
    date: "2019", title: "2019년",
    photos: [
      { src: "assets/gallery/2019/2019-08-01.webp", thumb: "assets/gallery/2019/thumbs/2019-08-01.webp", caption: "김륜호 석사 졸업 (2019.08)" },
      { src: "assets/gallery/2019/2019-00-02.webp", thumb: "assets/gallery/2019/thumbs/2019-00-02.webp", caption: "봄 단체사진" },
      { src: "assets/gallery/2019/2019-00-03.webp", thumb: "assets/gallery/2019/thumbs/2019-00-03.webp", caption: "크리스마스 선물교환식" }
    ]
  },
  {
    date: "2015", title: "2015년",
    photos: [
      { src: "assets/gallery/2015/2015-00-01.webp", thumb: "assets/gallery/2015/thumbs/2015-00-01.webp", caption: "10주년 기념 홈커밍데이" },
      { src: "assets/gallery/2015/2015-00-02.webp", thumb: "assets/gallery/2015/thumbs/2015-00-02.webp", caption: "송년회" }
    ]
  },
  {
    date: "2013", title: "2013년",
    photos: [
      { src: "assets/gallery/2013/2013-00-01.webp", thumb: "assets/gallery/2013/thumbs/2013-00-01.webp", caption: "실험실 사진" }
    ]
  },
  {
    date: "2012", title: "2012년",
    photos: [
      { src: "assets/gallery/2012/2012-00-01.webp", thumb: "assets/gallery/2012/thumbs/2012-00-01.webp", caption: "PBRC Nikhil's Lab" },
      { src: "assets/gallery/2012/2012-00-02.webp", thumb: "assets/gallery/2012/thumbs/2012-00-02.webp", caption: "나하나 박사 졸업!!" }
    ]
  },
  {
    date: "2011", title: "2011년",
    photos: [
      { src: "assets/gallery/2011/2011-00-01.webp", thumb: "assets/gallery/2011/thumbs/2011-00-01.webp", caption: "졸업식" }
    ]
  },
  {
    date: "2010", title: "2010년",
    photos: [
      { src: "assets/gallery/2010/2010-00-01.webp", thumb: "assets/gallery/2010/thumbs/2010-00-01.webp", caption: "ICO 나하나 발표" },
      { src: "assets/gallery/2010/2010-00-02.webp", thumb: "assets/gallery/2010/thumbs/2010-00-02.webp", caption: "ICO 노벨상 수상식 만찬장 앞에서" },
      { src: "assets/gallery/2010/2010-00-03.webp", thumb: "assets/gallery/2010/thumbs/2010-00-03.webp", caption: "김대선 학생 졸업" },
      { src: "assets/gallery/2010/2010-00-04.webp", thumb: "assets/gallery/2010/thumbs/2010-00-04.webp", caption: "송년회" },
      { src: "assets/gallery/2010/2010-00-05.webp", thumb: "assets/gallery/2010/thumbs/2010-00-05.webp", caption: "연구실 5주년 기념 식수 및 모임" }
    ]
  },
  {
    date: "2009", title: "2009년",
    photos: [
      { src: "assets/gallery/2009/2009-00-01.webp", thumb: "assets/gallery/2009/thumbs/2009-00-01.webp", caption: "ASV 미팅" },
      { src: "assets/gallery/2009/2009-00-02.webp", thumb: "assets/gallery/2009/thumbs/2009-00-02.webp", caption: "ASV 미팅" },
      { src: "assets/gallery/2009/2009-00-03.webp", thumb: "assets/gallery/2009/thumbs/2009-00-03.webp", caption: "Dr. Atkinson 집에서" },
      { src: "assets/gallery/2009/2009-00-04.webp", thumb: "assets/gallery/2009/thumbs/2009-00-04.webp", caption: "여름 제주도 MT" },
      { src: "assets/gallery/2009/2009-00-05.webp", thumb: "assets/gallery/2009/thumbs/2009-00-05.webp", caption: "졸업식" },
      { src: "assets/gallery/2009/2009-00-06.webp", thumb: "assets/gallery/2009/thumbs/2009-00-06.webp", caption: "졸업식 날 전체 실험실 식구들과" }
    ]
  },
  {
    date: "2008", title: "2008년",
    photos: [
      { src: "assets/gallery/2008/2008-00-01.webp", thumb: "assets/gallery/2008/thumbs/2008-00-01.webp", caption: "Pepcon 중국학회" },
      { src: "assets/gallery/2008/2008-00-02.webp", thumb: "assets/gallery/2008/thumbs/2008-00-02.webp", caption: "제 6차 콕사키바이러스 연구회" },
      { src: "assets/gallery/2008/2008-00-03.webp", thumb: "assets/gallery/2008/thumbs/2008-00-03.webp", caption: "제 6차 콕사키바이러스 연구회" }
    ]
  },
  {
    date: "2007", title: "2007년",
    photos: [
      { src: "assets/gallery/2007/2007-10-01.webp", thumb: "assets/gallery/2007/thumbs/2007-10-01.webp", caption: "ASV (2007.10)" },
      { src: "assets/gallery/2007/2007-10-02.webp", thumb: "assets/gallery/2007/thumbs/2007-10-02.webp", caption: "ASV (2007.10)" },
      { src: "assets/gallery/2007/2007-10-03.webp", thumb: "assets/gallery/2007/thumbs/2007-10-03.webp", caption: "ASV (2007.10)" },
      { src: "assets/gallery/2007/2007-10-04.webp", thumb: "assets/gallery/2007/thumbs/2007-10-04.webp", caption: "ASV (2007.10)" },
      { src: "assets/gallery/2007/2007-10-05.webp", thumb: "assets/gallery/2007/thumbs/2007-10-05.webp", caption: "ASV (2007.10)" },
      { src: "assets/gallery/2007/2007-10-06.webp", thumb: "assets/gallery/2007/thumbs/2007-10-06.webp", caption: "ASV (2007.10)" },
      { src: "assets/gallery/2007/2007-09-07.webp", thumb: "assets/gallery/2007/thumbs/2007-09-07.webp", caption: "International Symposium & Annual Meeting (2007.09)" },
      { src: "assets/gallery/2007/2007-09-08.webp", thumb: "assets/gallery/2007/thumbs/2007-09-08.webp", caption: "International Symposium & Annual Meeting (2007.09)" },
      { src: "assets/gallery/2007/2007-09-09.webp", thumb: "assets/gallery/2007/thumbs/2007-09-09.webp", caption: "International Symposium & Annual Meeting (2007.09)" },
      { src: "assets/gallery/2007/2007-08-10.webp", thumb: "assets/gallery/2007/thumbs/2007-08-10.webp", caption: "바이러스면역학연구실 하계 세미나 MT (2007.08)" },
      { src: "assets/gallery/2007/2007-08-11.webp", thumb: "assets/gallery/2007/thumbs/2007-08-11.webp", caption: "바이러스면역학연구실 하계 세미나 MT (2007.08)" },
      { src: "assets/gallery/2007/2007-08-12.webp", thumb: "assets/gallery/2007/thumbs/2007-08-12.webp", caption: "바이러스면역학연구실 하계 세미나 MT (2007.08)" },
      { src: "assets/gallery/2007/2007-08-13.webp", thumb: "assets/gallery/2007/thumbs/2007-08-13.webp", caption: "바이러스면역학연구실 하계 세미나 MT (2007.08)" },
      { src: "assets/gallery/2007/2007-06-14.webp", thumb: "assets/gallery/2007/thumbs/2007-06-14.webp", caption: "한국미생물학회 발표 후 허브농장에서 (2007.06)" },
      { src: "assets/gallery/2007/2007-04-15.webp", thumb: "assets/gallery/2007/thumbs/2007-04-15.webp", caption: "경주 면역학회 (2007.04)" },
      { src: "assets/gallery/2007/2007-00-16.webp", thumb: "assets/gallery/2007/thumbs/2007-00-16.webp", caption: "연정·수영 졸업식" }
    ]
  }
];
