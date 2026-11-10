#!/usr/bin/env python3
"""
PubMed에서 남재환 교수님의 새 논문을 찾아 data/publications.js 맨 앞에 추가합니다.

- GitHub Actions(.github/workflows/pubmed-update.yml)가 3개월마다 실행합니다.
- 새 논문이 있으면 파일을 고치고, 워크플로가 확인용 Pull Request를 만듭니다.
- 이미 목록에 있는 논문(PMID, DOI, 제목 기준)과 data/pubmed-exclude.txt 에
  적힌 PMID는 건너뜁니다. 철회 논문과 정오표(Erratum)도 자동으로 건너뜁니다.
- 교신저자 표시(*)는 PubMed 정보에 없으므로 Pull Request 확인 단계에서 직접 붙여 주세요.

표준 라이브러리만 사용합니다 (Python 3.9+).
"""
import datetime
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB_FILE = os.path.join(ROOT, "data", "publications.js")
EXCLUDE_FILE = os.path.join(ROOT, "data", "pubmed-exclude.txt")

# 처음 목록을 만들 때와 같은 검색어 (필요하면 여기만 고치세요)
QUERY = '("Nam, Jae-Hwan"[Author] OR "Nam, Jae Hwan"[Author]) AND "Catholic University of Korea"[Affiliation]'
# 최근 몇 년치만 확인 (새 논문을 찾는 용도라 충분합니다)
LOOKBACK_YEARS = 3

EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"
TOOL = "lvi-lab-website"
EMAIL = os.environ.get("NCBI_EMAIL", "")  # 선택: 저장소 Secret 으로 넣을 수 있음


def eutils(endpoint, params):
    params = dict(params, tool=TOOL)
    if EMAIL:
        params["email"] = EMAIL
    url = EUTILS + endpoint + "?" + urllib.parse.urlencode(params)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=60) as r:
                return r.read()
        except Exception as e:  # 일시적 오류는 재시도
            if attempt == 2:
                raise
            print(f"retry after error: {e}", file=sys.stderr)
            time.sleep(5)


def search_pmids():
    year = datetime.date.today().year
    term = f"{QUERY} AND ({year - LOOKBACK_YEARS}:{year + 1}[pdat])"
    data = json.loads(eutils("esearch.fcgi", {"db": "pubmed", "term": term, "retmode": "json", "retmax": 500}))
    return data["esearchresult"]["idlist"]


def text(el):
    return "".join(el.itertext()).strip() if el is not None else ""


def parse_articles(xml_bytes):
    """PubMed efetch XML -> 사이트 형식의 dict 목록"""
    out = []
    root = ET.fromstring(xml_bytes)
    for art in root.findall("PubmedArticle"):
        mc = art.find("MedlineCitation")
        pmid = text(mc.find("PMID"))
        a = mc.find("Article")
        title = re.sub(r"\s+", " ", text(a.find("ArticleTitle"))).rstrip(".")
        types = [text(t) for t in a.findall("PublicationTypeList/PublicationType")]

        authors = []
        has_nam = False
        for au in a.findall("AuthorList/Author"):
            last, ini = text(au.find("LastName")), text(au.find("Initials"))
            if last:
                authors.append(f"{last} {ini}".strip())
                if last.lower() == "nam" and ini.upper() == "JH":
                    has_nam = True
            elif au.find("CollectiveName") is not None:
                authors.append(text(au.find("CollectiveName")))

        j = a.find("Journal")
        journal = text(j.find("Title")) if j is not None else ""
        vol = text(j.find("JournalIssue/Volume")) if j is not None else ""
        iss = text(j.find("JournalIssue/Issue")) if j is not None else ""
        year = text(j.find("JournalIssue/PubDate/Year")) if j is not None else ""
        if not year and j is not None:
            m = re.search(r"\d{4}", text(j.find("JournalIssue/PubDate/MedlineDate")))
            year = m.group(0) if m else ""
        pages = text(a.find("Pagination/MedlinePgn"))
        if not pages:
            eloc = [e for e in a.findall("ELocationID") if e.get("EIdType") != "doi"]
            pages = text(eloc[0]) if eloc else ""

        doi = ""
        for aid in art.findall("PubmedData/ArticleIdList/ArticleId"):
            if aid.get("IdType") == "doi":
                doi = text(aid)
        if not doi:
            for e in a.findall("ELocationID"):
                if e.get("EIdType") == "doi":
                    doi = text(e)

        venue = journal
        if vol:
            venue += f", {vol}" + (f"({iss})" if iss else "")
        if pages:
            venue += f", {pages}"

        out.append({
            "pmid": pmid, "year": int(year) if year.isdigit() else 0, "title": title,
            "authors": ", ".join(authors), "venue": venue, "doi": doi,
            "review": "Review" in types,
            "skip": next((t for t in types if t in ("Retracted Publication", "Published Erratum", "Retraction of Publication")), ""),
            "has_nam": has_nam,
        })
    return out


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower().replace("retracted:", ""))


def existing_keys(js):
    pmids = set(re.findall(r"PMID (\d+)", js))
    dois = {d.lower() for d in re.findall(r'doi: "([^"]+)"', js)}
    titles = {norm(t) for t in re.findall(r'title: "((?:[^"\\]|\\.)*)"', js)}
    return pmids, dois, titles


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def to_js(p, today):
    return (
        f"  // PMID {p['pmid']} (auto-added {today}; check '*' for corresponding author)\n"
        "  {\n"
        f"    year: {p['year']},\n"
        '    type: "journal",\n'
        f"    title: {js_str(p['title'])},\n"
        f"    authors: {js_str(p['authors'])},\n"
        f"    venue: {js_str(p['venue'])},\n"
        f"    doi: {js_str(p['doi'])},\n"
        f'    pdf: "", code: "", note: {js_str("Review" if p["review"] else "")}\n'
        "  },\n"
    )


def merge(js, articles, exclude, today):
    pmids, dois, titles = existing_keys(js)
    added, skipped = [], []
    for p in articles:
        why = ""
        if p["pmid"] in exclude:
            why = "listed in pubmed-exclude.txt"
        elif p["pmid"] in pmids or (p["doi"] and p["doi"].lower() in dois) or norm(p["title"]) in titles:
            continue  # 이미 있음
        elif p["skip"]:
            why = p["skip"]
        elif not p["has_nam"]:
            why = "no author 'Nam JH' in record"
        if why:
            skipped.append((p, why))
        else:
            added.append(p)
    if not added:
        return js, added, skipped
    added.sort(key=lambda p: (-p["year"], -int(p["pmid"])))
    marker = "window.PUBLICATIONS = [\n"
    i = js.index(marker) + len(marker)
    block = "".join(to_js(p, today) for p in added)
    return js[:i] + block + js[i:], added, skipped


def main():
    today = datetime.date.today().isoformat()
    js = open(PUB_FILE, encoding="utf-8").read()
    exclude = set()
    if os.path.exists(EXCLUDE_FILE):
        exclude = {l.split("#")[0].strip() for l in open(EXCLUDE_FILE, encoding="utf-8")} - {""}

    ids = search_pmids()
    known = existing_keys(js)[0] | exclude
    new_ids = [i for i in ids if i not in known]
    print(f"PubMed results: {len(ids)}, not yet on the site: {len(new_ids)}")
    articles = []
    for k in range(0, len(new_ids), 100):
        articles += parse_articles(eutils("efetch.fcgi", {"db": "pubmed", "id": ",".join(new_ids[k:k + 100]), "retmode": "xml"}))
        time.sleep(0.4)

    js2, added, skipped = merge(js, articles, exclude, today)
    if added:
        open(PUB_FILE, "w", encoding="utf-8").write(js2)

    # Pull Request 본문으로 쓰일 요약
    lines = [f"PubMed 자동 확인 ({today}): 새 논문 {len(added)}편"]
    for p in added:
        link = f"https://doi.org/{p['doi']}" if p["doi"] else f"https://pubmed.ncbi.nlm.nih.gov/{p['pmid']}/"
        lines.append(f"- [ ] {p['year']} · {p['title']} — {p['venue']} ([링크]({link}), PMID {p['pmid']})")
    if skipped:
        lines.append("\n건너뛴 항목 (필요하면 직접 추가하세요):")
        for p, why in skipped:
            lines.append(f"- PMID {p['pmid']} · {p['title']} — {why}")
    summary = "\n".join(lines)
    print(summary)
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a", encoding="utf-8") as f:
            f.write(f"added={len(added)}\n")
            f.write("summary<<EOF_SUMMARY\n" + summary + "\nEOF_SUMMARY\n")


if __name__ == "__main__":
    main()
