# 05. 디자인 시스템 — 인텔 (Intel Corporation)

## 컬러 시스템

### 주요 컬러 (CSS 데이터 기반)

| 역할 | 색상명 | HEX | 출처 | 사용 맥락 |
|------|--------|-----|------|----------|
| Primary Brand Blue | Intel Blue | `#0066FF` | (공식) | 주요 CTA 버튼, 링크, 강조 요소 |
| Primary Dark | Deep Navy | `#000F28` | (공식) | 배경, 헤더, 다크 모드 베이스 (사용 빈도 최고: 43회) |
| Interactive Blue | Action Blue | `#2D76FF` | (공식) | 호버 상태, 인터랙티브 UI 요소 (25회) |
| Accent Cyan | Intel Cyan | `#00C7FD` | (공식) | 그래디언트 강조, AI/기술 비주얼 포인트 (7회) |
| Dark Gray | Charcoal | `#262626` | (공식) | 본문 텍스트, 다크 UI 배경 (6회) |
| Legacy Blue | Classic Blue | `#004A86` | (공식) | 레거시 브랜드 요소, 서브 컴포넌트 (5회) |
| Medium Blue | Mid Blue | `#0046C8` | (공식) | 보조 버튼, 아이콘 강조 (4회) |
| Muted Blue-Gray | Slate | `#667389` | (추정) | 서브텍스트, 캡션, 비활성 요소 (4회) |
| Light Gray | Neutral Gray | `#999FA9` | (추정) | 보더, 구분선, 비활성 상태 (4회) |
| Link Blue | Legacy Link | `#0068B5` | (공식) | 본문 내 링크, 하이퍼텍스트 (4회) |
| Dark Navy Alt | Midnight | `#1A273E` | (추정) | 카드 배경, 섹션 구분 다크 (4회) |
| Light Blue | Ice Blue | `#CDD8EA` | (추정) | 연한 배경, 인포그래픽 베이스 (3회) |
| Bright Blue | Vivid Blue | `#4183FF` | (추정) | 다크 배경 위 강조 텍스트 (3회) |
| Light Gray 2 | Silver | `#D7D7D7` | (추정) | 구분선, 배경 경계 (3회) |
| White BG | Off White | `#F7F7F7` | (추정) | 섹션 배경, 카드 배경 (2회) |

### 그래디언트 (추정)
- **Primary Gradient:** `#0066FF` → `#00C7FD` (좌→우, 135도) — AI/기술 히어로 섹션
- **Dark Gradient:** `#000F28` → `#1A273E` — 다크 배경 섹션 전환

### 컬러 사용 원칙
- 다크 배경(`#000F28`) 위에 밝은 블루(`#2D76FF`, `#4183FF`) 조합이 인텔 고유 비주얼 언어
- 흰 배경에는 `#0066FF`를 주 버튼 컬러로 단독 사용
- 시안(`#00C7FD`)은 강조 포인트에만 제한 사용 (남용 시 AMD 컬러와 혼동 위험)
- 국내 버전에서도 동일 팔레트 적용 (로컬라이즈 컬러 변경 금지)

---

## 타이포그래피

### 전용 서체 (CSS 데이터 기반)

| 서체명 | 분류 | 용도 | 비고 |
|--------|------|------|------|
| **Intel One Display** | Sans-serif, Display | 히어로 헤드라인, 캠페인 타이틀 | (공식) 인텔 전용 서체 |
| **Intel One Display Medium** | Sans-serif, Display | 서브헤드라인, 섹션 제목 | (공식) |
| **Intel One Body Text** | Sans-serif, Text | 본문, UI 레이블, 설명 텍스트 | (공식) |
| **Intel One Mono** | Monospace | 코드 스니펫, 기술 문서, CLI 출력 | (공식) 개발자 콘텐츠 필수 |
| **Intel Clear** | Sans-serif | 구형 콘텐츠 호환, 내부 문서 | (공식) 신규 콘텐츠는 Intel One 우선 |
| **Intel Clear KO** (`intel-clear-ko`) | 한글 최적화 | 한국어 콘텐츠 전용 | (공식) |

### 폴백 서체 (시스템 폰트)
- 한국어: `Malgun Gothic`, `Dotum` (Windows), `Apple SD Gothic Neo` (macOS)
- 영문: `Arial`, `Helvetica`, `Verdana`
- 일본어: `MS PGothic`
- 중국어 간체: `Microsoft YaHei`

### 타이포그래피 스케일 (추정)

| 레벨 | 서체 | 크기 (px) | 굵기 | 행간 |
|------|------|---------|------|------|
| Hero H1 | Intel One Display | 56~72 | Regular | 1.1 |
| Section H2 | Intel One Display Medium | 36~48 | Medium | 1.2 |
| H3 | Intel One Display Medium | 24~32 | Medium | 1.3 |
| Body Large | Intel One Body Text | 18 | Regular | 1.6 |
| Body | Intel One Body Text | 16 | Regular | 1.6 |
| Caption | Intel One Body Text | 13~14 | Regular | 1.5 |
| Code | Intel One Mono | 14~16 | Regular | 1.7 |

---

## 채널 규격

### 디지털 광고

| 포맷 | 크기 | 용도 | 핵심 규칙 |
|------|------|------|----------|
| 리더보드 | 728×90 px | PC 배너 광고 | 로고 좌측 고정, 헤드라인 최대 8어절 |
| 미디움 렉탱글 | 300×250 px | 사이드바 배너 | 제품 이미지 + 1줄 헤드라인 + CTA |
| 빌보드 | 970×250 px | 프리미엄 DA | 그래디언트 배경 + 제품 렌더 필수 |
| 모바일 배너 | 320×50 px | 모바일 앱 | 로고 + 핵심 메시지 1개만 |
| 인터스티셜 | 320×480 px | 모바일 전면 | 영상 또는 애니메이션 GIF 권장 |

### 소셜 미디어

| 채널 | 피드 이미지 | 스토리/릴스 | 커버 | 특이사항 |
|------|------------|------------|------|---------|
| LinkedIn | 1200×627 px | 1080×1920 px | 1584×396 px | B2B 백서 썸네일은 데이터 시각화 포함 |
| Instagram | 1080×1080 px | 1080×1920 px | — | 다크 배경 비주얼 우선, 로고 우하단 |
| YouTube | 썸네일 1280×720 px | — | 2560×1440 px | 썸네일에 얼굴+텍스트 오버레이 권장 |
| X (Twitter) | 1200×675 px | — | 1500×500 px | 텍스트 밀도 낮게, 여백 충분히 |
| KakaoTalk (국내) | 800×400 px | — | — | 한글 서체 Intel Clear KO 필수 |

### 인쇄·전시

| 용도 | 규격 | 해상도 | 비고 |
|------|------|--------|------|
| 전시 배너 (롤업) | 850×2000 mm | 150 dpi 이상 | 다크 배경, 하단 로고 배치 |
| A4 브로슈어 | 210×297 mm | 300 dpi | 여백 최소 15mm |
| 명함 | 90×50 mm | 300 dpi | 로고 + 이름 + 직함 + 인텔 블루 |
| 기술 포스터 | A1 (594×841 mm) | 300 dpi | Intel One Display 헤드라인, 다이어그램 포함 |

---

## 레이아웃 원칙

### 그리드 시스템
- **웹:** 12컬럼 그리드, 거터 24px, 최대 너비 1440px
- **모바일:** 4컬럼 그리드, 거터 16px
- **여백(Margin):** 데스크톱 80px, 태블릿 48px, 모바일 24px

### 컴포넌트 패턴
- 히어로 섹션: 다크 네이비(`#000F28`) 배경 + 인텔 블루 그래디언트 오버레이 + 제품 3D 렌더
- 기능 카드: 흰 배경 또는 `#F7F7F7` + 테두리 없음 + 그림자 없음 (플랫 디자인)
- CTA 버튼: 주 버튼 `#0066FF` 배경 + 흰 텍스트, 보조 버튼 투명 배경 + `#0066FF` 테두리
- 구분선: `#D7D7D7` 1px, 섹션 간 공백으로 대체 권장 (구분선 남용 금지)

---

## AI 이미지 생성 프롬프트 가이드

### 제품 비주얼 (영어 프롬프트)
```
Professional product photography of Intel processor chip,
dark navy (#000F28) background, cool blue lighting (#2D76FF),
dramatic rim lighting, ultra-sharp macro detail,
silicon wafer texture visible, floating composition,
no text overlay, 16:9 ratio, commercial grade
```

### 캠페인 히어로 (영어 프롬프트)
```
Futuristic technology hero image, Intel blue (#0066FF) to cyan (#00C7FD)
gradient light rays, dark background, abstract circuit patterns,
human silhouette interacting with holographic AI interface,
cinematic lighting, wide angle, no logos, photorealistic
```

### 개발자/B2B 콘텐츠 (영어 프롬프트)
```
Corporate technology office scene, diverse engineers collaborating,
modern data center with blue LED accents, clean minimal aesthetic,
natural lighting, Intel blue color accents on screens,
professional photography style, no stock photo feel
```

### 금지 요소 (AI 이미지)
- 로봇·사이보그 이미지 (진부한 AI 표현)
- 빨간색·주황색·초록색 계열 (경쟁사 컬러 혼동)
- 과도한 렌즈 플레어 (2010년대 기술 광고 클리셰)
- 손에 칩 든 사진 (과다 사용된 반도체 마케팅 이미지)

---

## 디자인 금지사항

- **로고 변형 금지:** 인텔 로고의 컬러 변경, 비율 변형, 회전, 그림자 추가 절대 금지
- **파란색 계열 과포화:** `#00C7FD` 시안을 주 배경으로 사용하는 것 금지 (포인트 컬러 전용)
- **경쟁사 컬러 혼용:** AMD 빨강(`#ED1C24`), NVIDIA 초록(`#76B900`) 계열 색상 병용 금지
- **일반 무료 폰트 대체:** Intel One 서체 미사용 시 Arial 대체는 내부 문서에만 허용. 외부 발행물에 Arial 메인 사용 금지
- **저해상도 로고:** 72dpi 이하 로고 파일 인쇄물 사용 금지
- **텍스트 과밀:** 카드·배너에 7줄 이상 텍스트 배치 금지

---

### Steal Sheet — 3가지

1. **다크 네이비를 배경색이 아닌 브랜드 서명으로 만들어라.** `#000F28`은 단순한 검정이 아니다. 여기에 `#2D76FF`와 `#00C7FD`를 조합하는 순간 "이건 인텔이다"라는 즉각적 인식이 생긴다. 브랜드 컬러를 선택할 때 단색이 아니라 "2~3색 조합의 특정 분위기"를 시그니처로 정의하라.

2. **전용 서체는 서체 패밀리 전체를 설계해야 한다.** Intel One이 Display, Body, Mono로 나뉘어 각각의 역할이 있듯이, 전용 서체 투자를 결정했다면 헤드라인용·본문용·코드용 3종을 반드시 구비해야 한다. Body 서체 없이 Display만 있으면 본문이 폴백 서체로 깨지고 브랜드 일관성이 무너진다.

3. **AI 이미지 프롬프트 가이드를 디자인 시스템에 포함하라.** 2024년 이후 마케팅 콘텐츠의 상당 부분이 AI로 생성된다. 브랜드 컬러 HEX값, 금지 요소, 스타일 키워드를 영어 프롬프트 형태로 문서화해두면 에이전시·내부 팀 모두 브랜드 일관성을 유지하면서 AI 이미지를 생성할 수 있다.
