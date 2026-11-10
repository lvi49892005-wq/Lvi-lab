# 연구실 홈페이지 — 직접 수정 안내

설치할 것 없이 HTML/CSS/JS 파일만으로 동작합니다.
`index.html`을 더블클릭하면 브라우저에서 바로 열립니다.

## 1. 편집 프로그램

- **추천: Visual Studio Code** (무료, https://code.visualstudio.com) → `파일 > 폴더 열기`로 `lab-website` 폴더 열기
- 메모장으로도 고칠 수 있습니다. 저장할 때 인코딩은 **UTF-8**로 하세요(아니면 한글이 깨집니다).

## 2. 어디를 고치면 되나

| 고칠 내용 | 파일 |
|---|---|
| 연구실명, 학교/학과, 주소, 전화, 이메일 | `assets/js/config.js` |
| 논문 · 학회 발표 | `data/publications.js` |
| 구성원 (사진, 구글 스칼라, GitHub 링크) | `data/members.js` |
| 소식 · 세미나 · 모집 공고 | `data/news.js` |
| 특허 · 수상 · 산학협력 | `data/patents-awards.js` |
| 소개글, 인사말, 비전, 오시는 길 | `index.html` |
| 연구 분야, 프로젝트 | `research.html` |
| 모집 안내 | `join.html` |
| 영문 페이지 | `en/index.html` |
| 색상 | `assets/css/style.css` 맨 위 `:root { ... }` |

HTML 파일에서는 `[대괄호]`로 된 문구를 찾아 바꾸면 됩니다.

### 목록 항목 추가하는 법 (예: 논문)

`data/publications.js`에서 `{` 부터 `},` 까지 한 덩어리를 복사해 붙여 넣고 내용을 바꿉니다.

```js
  {
    year: 2026,
    type: "journal",          // journal / conference / domestic / book / preprint
    title: "논문 제목",
    authors: "홍길동, 김철수*",
    venue: "Journal Name, Vol. 1, pp. 1–10",
    doi: "10.xxxx/xxxxx",     // 없으면 "" → DOI 버튼 숨김
    pdf: "", code: "", note: ""
  },
```

연도순 정렬, 유형별 편수, 필터는 자동으로 처리됩니다.

### 사진 넣기

`assets/img/` 폴더에 사진을 넣고 `members.js`에 `photo: "assets/img/hong.jpg"`처럼 적습니다.

### 지도 넣기

Google 지도에서 위치 검색 → 공유 → **지도 퍼가기** → HTML 복사 →
`index.html`의 "지도 영역" 회색 박스(`<div class="placeholder-img" ...>지도 영역...</div>`)를 복사한 코드로 바꿉니다.

## 3. 주의할 점

- 따옴표 `"`나 쉼표 `,`가 하나만 빠져도 그 목록 전체가 안 보입니다.
- 화면이 비면 브라우저에서 **F12 → Console**을 열어 빨간 오류의 파일명과 줄 번호를 확인하세요.

## 4. 인터넷에 올리기 (GitHub Pages, 무료)

1. https://github.com 가입 → **New repository** 생성 (Public)
2. **Add file → Upload files**로 `lab-website` 폴더 *안의* 파일과 폴더를 모두 끌어다 놓고 Commit
3. 저장소 **Settings → Pages** → Branch를 `main`, 폴더를 `/ (root)`로 두고 Save
4. 몇 분 뒤 `https://<계정명>.github.io/<저장소명>/` 주소로 열립니다

이후에는 GitHub 웹에서 파일을 열고 연필(✏️) 아이콘을 눌러 바로 고칠 수 있고, 저장(Commit)하면 1~2분 안에 사이트에 반영됩니다.
학교 웹서버에 올릴 때도 폴더 전체를 그대로 업로드하면 됩니다.

## 5. 논문 자동 확인 (PubMed, 3개월마다)

`.github/workflows/pubmed-update.yml` 이 1·4·7·10월 1일에 PubMed를 검색해서,
홈페이지에 없는 남재환 교수님 논문이 있으면 **확인용 Pull Request** 를 만듭니다.

1. 저장소 **Pull requests** 탭에서 "PubMed 새 논문 N편" PR을 엽니다.
2. 목록이 교수님 논문이 맞는지 확인합니다.
   - 아니면 PR을 닫고(Close) 그 PMID를 `data/pubmed-exclude.txt` 에 한 줄 추가하세요.
3. 교신저자 논문이면 **Files changed** 탭 → 연필 아이콘으로 `Nam JH` 뒤에 `*` 를 붙입니다.
4. **Merge pull request** → **Confirm merge** 를 누르면 1~2분 뒤 홈페이지에 반영됩니다.

- 바로 확인하고 싶으면: **Actions** 탭 → "PubMed 논문 자동 확인" → **Run workflow**
- 철회 논문·정오표는 자동으로 건너뛰고, PR 본문에 "건너뛴 항목"으로 표시됩니다.
- PubMed에 없는 국내 학술지·학회 발표, 특허는 자동으로 추가되지 않으니 직접 추가하세요.
- 검색어는 `scripts/update_pubmed.py` 맨 위 `QUERY` 에서 바꿀 수 있습니다.

## 6. 사진 게시판 (Gallery)

사진은 `assets/gallery/` 폴더에, 사진 목록은 `data/gallery.js` 에 있습니다.

1. **사진 크기 줄이기 (권장)** — 가로 1600px 이하, 1장 1MB 안팎. 휴대폰 원본(5~10MB)을 그대로 올리면 페이지가 느려집니다.
   파일 이름은 영문·숫자로 (예: `01.jpg`, `02.jpg`).
2. **사진 올리기** — 저장소에서 `assets/gallery` 폴더로 이동 → **Add file → Upload files**
   - 새 앨범 폴더를 만들려면 끌어다 놓기 전에, 위쪽 경로 칸에 `2026-11-lab-workshop/` 처럼 폴더 이름을 입력하면 됩니다.
   - 사진을 끌어다 놓고 **Commit changes**.
3. **목록에 추가** — `data/gallery.js` 를 열고 연필 아이콘 → 예시를 참고해 앨범을 추가 → **Commit changes**.
   ```js
   {
     date: "2026-11-20",
     title: "2026 연구실 워크숍",
     desc: "연구 성과 발표와 2027년 연구 계획 토론",
     photos: [
       "assets/gallery/2026-11-lab-workshop/01.jpg",
       { src: "assets/gallery/2026-11-lab-workshop/02.jpg", caption: "단체 사진" }
     ]
   },
   ```
4. 1~2분 뒤 홈페이지 **Gallery** 메뉴에 나타납니다. 최신 날짜 앨범이 맨 위에 옵니다.

- 사진 경로는 대소문자까지 정확히 같아야 합니다 (`01.JPG` ≠ `01.jpg`).
- 사진을 지우려면 `gallery.js` 에서 해당 줄을 지우고, 파일은 `assets/gallery/...` 에서 열어 휴지통 아이콘으로 삭제합니다.
- 얼굴이 나온 사진은 본인 동의를 받아 주세요.
