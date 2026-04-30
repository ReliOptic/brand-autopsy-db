# Brand Autopsy DB — Session Status

Last updated: 2026-04-30  
Branch: `main`  
Server: `http://localhost:3001` (Next.js), `http://localhost:8000` (FastAPI)

---

## 이번 세션에서 완료한 작업

### 1. API 수정 (`src/api/`)

| 파일 | 변경 내용 |
|------|-----------|
| `routes/brands.py` | `limit` max `le=200` → `le=600` (대시보드 전체 브랜드 로드 가능) |
| `routes/brands.py` | `_extract_channels_from_table` 정규식 — `## 1. Channel Strategy Matrix` 등 번호 포함 헤딩 매칭 |
| `services/brand_reader.py` | `_hex_to_rgb`, `_color_distance`, `_deduplicate_colors(threshold=30.0)` 추가 — AAPL 유사 파란색 4개 중복 제거 |

### 2. 브랜드 테마 시스템 (`web/lib/brand-theme.ts`) — 신규 파일

- `BrandTheme` interface (15개 토큰: `isLight`, `bg`, `surface`, `surfaceLift`, `text`, `textBright`, `textSecondary`, `textMuted`, `textDim`, `border`, `accent`, `accentBright`, `accentDim`, `accentAlpha15`, `accentAlpha50`, `radius`)
- `deriveBrandTheme(colors, archetype?)` — 라이트/다크 자동 감지, 브랜드 컬러 블렌딩
- `ARCHETYPE_RADIUS` — Creator/Caregiver→16px, Sage/Ruler→2px 등
- `isLightModeBrand`: 팔레트에 near-black(lum<30) AND near-white(lum>200) 있으면 라이트 모드

### 3. 브랜드 페이지 히어로 (`web/app/brands/[ticker]/page.tsx`)

- 브랜드명: 44px/600 → **72px/800**
- Nav bar: `T.*` 전역 색상 → `brandTheme.*` + `backdropFilter: blur(12px)` 글래스 효과
- View tabs: monospace/CAPS → sans-serif/Title Case, `brandTheme` 색상
- 섹터/인더스트리 레이블: monospace → sans-serif
- 아키타입 칩: ALL CAPS mono → sans 600weight
- 메쉬 그라디언트 opacity 강화 (라이트모드 `22`→`55`, `18`→`44`, `12`→`33`)
- 그리드 오버레이 div 완전 제거
- Report 사이드바 `T.*` → `brandTheme.*` 전체 교체
- Color System 사이드바: 전폭 컬러 밴드 + hex 목록

### 4. Visual Overview 완전 오버홀 (`web/components/visual-overview-parts.tsx`) — 신규 파일

| 컴포넌트 | 변경 내용 |
|----------|-----------|
| `ArchetypePhilosophyBanner` | **NEW** — 3단 배너: 아키타입명(36px/800) + 브랜드 에센스(22px italic) + 코어 오디언스 + 트레이트 칩 |
| `ColorStrip` | 48×32 타일 → **전폭 96px 컬러 밴드**, Primary 2배 너비, 텍스트 오버레이 |
| `VoicePositioningGrid` | 300px → **380px** 보이스 카드, 레이더 250 → **310px**, progress bar 3→5px, Positioning 15→**18px** |
| `CoverageChannelsSource` | Coverage: 28px 숫자 인디케이터, Channels: 랭크 번호 뱃지, Source: 계층화 정보 |
| `CtaBar` | ghost 버튼 → **solid accent 배경** + glow shadow |

### 5. VoiceRadar 수정 (`web/components/ui-primitives.tsx`)

- `SectionLabel`: `fontFamily: T.mono` → `T.sans`, fontWeight 500→600
- 그리드 선: `T.border`(불가시) → `color + strokeOpacity: 0.25`
- 폴리곤 fill: `${color}30`(CSS var 무효) → `fillOpacity={0.28}`
- stroke: 1.5 → **2.5px**, strokeLinejoin="round"
- 포인트 마커: r:3 → **r:4**
- SVG: `overflow: "visible"` — 레이블 클리핑 방지
- 축 레이블: T.mono → T.sans, T.textMuted → `color opacity:0.55`

### 6. 테스트 추가

- `web/lib/brand-theme.test.ts` — Vitest, 20개 테스트
- `tests/integration/test_brief_api.py` — pytest, 8개 테스트
- `tests/unit/test_color_extraction.py` — pytest, 4개 테스트

---

## 완료된 기능 (2026 로드맵)

| 기능 | 경로 | 상태 |
|------|------|------|
| 브랜드 비교 모드 | `/brands/compare?a=AAPL&b=NFLX` | ✅ DualVoiceRadar 포함 |
| Figma Variables 내보내기 | 브랜드 페이지 nav bar "Figma" 버튼 | ✅ Token Studio JSON |
| 30초 스캔 ↔ 딥다이브 | `?density=scan\|deep` | ✅ URL param 토글 |
| 브랜드 포트레이트 카드 | `/brands/AAPL/card` (Share 버튼) | ✅ 풀스크린 공유 카드 |
| Layer 02 오디언스 추출 | `BriefData.audience_segments` | ✅ 실제 데이터 동적 반영 |
| 모바일 반응형 | `globals.css` `.ov-grid-*` 클래스 | ✅ 768px 이하 1컬럼 |

## 현재 알려진 이슈 / 다음 세션 작업 후보

### 우선순위 HIGH
- [ ] **브랜드 Brief 1-pager PDF** — `/brands/AAPL/brief` 페이지 출력 최적화 (인쇄 CSS, PDF 저장)
- [ ] **sec_fetcher XBRL year-mapping 버그** — `_extract_annual_xbrl`이 `fy` 필드(잘못됨) 대신 `end` 날짜 연도를 써야 함 (GS, GOOGL 수동 패치됨, 전체 수정 필요)

### 우선순위 MEDIUM
- [ ] **파이프라인 자동화** — `run_batch.py` 크론 설정 (`PHASE0_CLOSEOUT.md` 참조)
- [ ] **Compare 페이지 UI 개선** — 두 브랜드 ticker 변경 input, 더 많은 비교 지표
- [ ] **Dashboard 필터 URL 동기화** — sector/archetype 필터가 URL에 반영은 되나 뒤로가기 시 초기화

### 우선순위 LOW
- [ ] **Similar Brands 알고리즘 개선** — 현재 archetype + sector 단순 매칭
- [ ] **Figma Export 개선** — 타이포그래피 스케일 토큰 추가

---

## 서버 재시작 방법

```bash
# FastAPI (port 8000)
cd /Users/reliqbit_mac/projects/brand-autopsy-db
uvicorn src.api.main:app --reload --port 8000

# Next.js (port 3001)
cd /Users/reliqbit_mac/projects/brand-autopsy-db/web
npm run dev -- --port 3001
```

## 주요 파일 맵

```
web/
  app/brands/[ticker]/page.tsx     ← 브랜드 페이지 (히어로, nav, 레이아웃)
  components/visual-overview.tsx   ← Overview 섹션 wrapper + CSS vars
  components/visual-overview-parts.tsx  ← 5개 카드 컴포넌트 (핵심)
  components/ui-primitives.tsx     ← T 상수, SectionLabel, VoiceRadar
  lib/brand-theme.ts               ← BrandTheme 인터페이스 + deriveBrandTheme()

src/api/
  routes/brands.py                 ← /api/brands/* 엔드포인트
  services/brand_reader.py         ← 색상 중복 제거, 브랜드 데이터 파싱

data/
  brand_autopsy.db                 ← SQLite DB (브랜드 메타데이터)
  quality_scores.json              ← 품질 점수 캐시
```
