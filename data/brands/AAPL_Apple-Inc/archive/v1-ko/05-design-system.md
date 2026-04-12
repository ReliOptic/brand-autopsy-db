# 05. 디자인 시스템 명세 — Apple Inc. (AAPL)

> Apple은 자체 디자인 시스템 **HIG(Human Interface Guidelines)**를 공개 운영 (developer.apple.com/design, 공식). 본 문서는 공식 HIG + CSS 데이터 분석 + 추정 기반.

## 컬러 팔레트

### 핵심 브랜드 컬러 (CSS 데이터 기반)

| 용도 | 색상명 | HEX | 빈도 | 사용처 |
|------|--------|-----|------|--------|
| **Primary Text** | **Apple Dark** | **#1D1D1F** | 핵심 | 모든 주요 헤드라인·본문 텍스트 (공식, apple.com) |
| **Primary Dark Alt** | Near Black | #161617 | 보조 | 다크 배경 섹션 기본 텍스트 |
| **Primary CTA** | **Apple Blue** | **#0071E3** | 높음 (6회) | 모든 클릭 가능한 링크·CTA 버튼 (공식, CSS 데이터) |
| **CTA Hover** | Blue Hover | #0077ED | 보조 | Apple Blue 호버 상태 (CSS 데이터) |
| **CTA Active** | Blue Active | #006EDB | 보조 | Apple Blue 클릭 상태 (CSS 데이터) |
| **CTA Dark** | Deep Blue | #0066CC | 보조 | 다크 배경 위 CTA (CSS 데이터) |
| **Accent Blue** | Bright Blue | #2997FF | 강조 | 다크 배경 위 링크 강조 (CSS 데이터) |
| **Secondary Text** | Mid Grey | #6E6E73 | 높음 (6회) | 부제목·보조 설명 텍스트 (공식, apple.com) |
| **Caption Text** | Light Grey | #86868B | 중간 (5회) | 캡션·주석·법적 고지 텍스트 (공식, apple.com) |
| **Divider/Border** | Pale Grey | #E8E8ED | 높음 (8회) | 구분선·카드 테두리·비활성 상태 (공식, apple.com) |
| **Background** | Off White | #F4F8FB | 섹션 배경 | 제품 섹션 배경 (CSS 데이터) |
| **Surface Light** | Near White | #FAFAFC | 카드 배경 | 카드·팝업 배경 (CSS 데이터) |
| **Body Dark** | Charcoal | #333336 | 매우 높음 (13회) | 다크 모드 본문·UI 컴포넌트 (CSS 데이터) |

### 제품 액센트 컬러 (공식, Product Page)

| 색상명 | HEX | 사용처 |
|--------|-----|--------|
| Product Blue | #9FC6F4 | iPhone·iPad 제품 컬러 옵션 배경 |
| Product Purple | #7424B5 | iPhone 제품 컬러·Apple Watch 밴드 |
| Product Orange | #EC893C | iPhone 제품 컬러·AirPods 케이스 |
| Product Pink | #EA33C0 | iPhone 제품 컬러 |
| Product Teal | #485B5E | iPhone·MacBook 제품 컬러 |
| Product Brown | #604630 | Apple Watch 밴드 |
| Google-ref Blue | #3397D4 | 앱 내 링크·인터렉티브 요소 |

### 컬러 원칙 (공식 HIG 기반)
- **Apple Blue(#0071E3)는 CTA 전용** — 배너·장식·일러스트에 파란색 사용 금지. 사용자가 "눌러도 되는 곳"을 즉시 인식하게 함 (공식 HIG).
- **순검정(#000000) 사용 금지** — 눈의 피로 감소를 위해 #1D1D1F(Apple Dark)가 최대 대비 텍스트 색상 (공식, apple.com 실측).
- **배경은 흰색~아이보리 계열** — 제품이 주인공. 배경은 무조건 뒤로 물러남.
- **다크 모드 완전 지원** — #1D1D1F ↔ #FFFFFF 반전 구조. 모든 색상 토큰은 라이트/다크 쌍으로 존재 (공식 HIG).
- **그라데이션은 제품 사진에만** — UI 요소에 그라데이션 금지. 제품 이미지 배경의 미묘한 그라데이션만 허용.

## 타이포그래피

| 용도 | 폰트 | Weight | 사이즈 규칙 |
|------|------|--------|-------------|
| **디스플레이 헤드 (키노트·히어로)** | **SF Pro Display** | Bold / Semibold (700/600) | 웹: 48~96px; 모바일: 32~56px |
| **헤드라인 H1** | SF Pro Display | Semibold (600) | 웹: 32~48px; 앱: 28~34px |
| **헤드라인 H2** | SF Pro Display | Regular (400) | 웹: 24~32px; 앱: 22~28px |
| **본문 Body** | **SF Pro Text** | Regular (400) | 웹: 17px / 앱: 17px, 행간 1.5 (공식 HIG) |
| **캡션/법적 고지** | SF Pro Text | Regular (400) | 12~13px, #86868B |
| **UI 라벨/버튼** | SF Pro Text | Medium / Semibold (500/600) | 15~17px |
| **숫자 강조 (가격·스펙)** | SF Pro Display Numeric | Bold (700) | 본문보다 +4~8px |
| **한국어 본문** | SF Pro KR | Regular (400) | 한글 기준 17px, 행간 1.6 (공식, CSS 데이터 SF Pro KR 확인) |
| **한국어 헤드** | SF Pro KR | Bold (700) | 28~48px |

### 타이포 원칙 (공식 HIG)
- **SF Pro 폰트 패밀리 독점** — San Francisco(SF Pro)는 Apple이 자체 제작한 시스템 폰트. iOS·macOS·watchOS 전 플랫폼 통일 (공식).
- **한국어는 SF Pro KR** — CSS 데이터에서 SF Pro KR 확인. 기존 HY Dotum·HY Gulim·MalgunGothic은 레거시 폴백용 (CSS 데이터).
- **자간(Letter-spacing) 극도 조절** — 대형 헤드라인(-0.5px~-1px), 본문(0), 캡션(+0.2px). 헤드라인을 꽉 채워 중량감 표현.
- **Dynamic Type 필수 지원** — 사용자 텍스트 크기 설정을 앱이 존중해야 함 (공식 HIG 접근성 요건).
- **Bold는 강조에만** — 전체 텍스트 Bold 처리 금지. 핵심 단어·수치만 Bold.

## 채널별 규격

| 채널 | 사이즈 | 안전 영역 | 비고 |
|------|--------|----------|------|
| **Apple.com 히어로 배너** | 1440px 기준 (반응형) | 좌우 192px (컨텐츠 영역 1056px) | 단 한 문장·단 하나의 CTA 원칙 (공식) |
| **iPhone 앱 (iOS)** | 390×844 (iPhone 14 기준) | Safe Area: 상단 59px, 하단 34px | HIG 기준 (공식) |
| **iPad 앱** | 1024×1366 기준 | Safe Area: 상하좌우 20px | Split View 지원 필수 |
| **Apple Watch 앱** | 198×242 (Series 9) | 모든 엣지 8px | 단일 정보, 하나의 탭 동작 |
| **App Store 스크린샷** | iPhone: 1290×2796 (최대) | 콘텐츠 상하 80px | 텍스트 오버레이 허용, 실제 UI 스크린샷 필수 (공식) |
| **키노트 슬라이드** | 3840×2160 (4K) | 상하좌우 200px | 텍스트 최소화, 단일 이미지·단어 원칙 |
| **YouTube (제품 영상)** | 3840×2160 (4K) / 썸네일 1280×720 | 썸네일 텍스트 5단어 이내 | 사운드 디자인 중요 (무음 시청 대비 자막 필수) |
| **Instagram 피드** | 1080×1350 (4:5 세로) | 상하좌우 60px | 제품 단독 또는 생활 장면, 캡션 최소화 |
| **Instagram 릴스** | 1080×1920 | 하단 260px (UI 오버레이) | Shot on iPhone 자막 우하단 (공식 캠페인 패턴) |
| **OG 이미지 (공유 썸네일)** | 1200×630 | 좌우 60px | 제품명 + 제품 이미지 + Apple 로고 |

## 레이아웃 원칙

### 1. 단일 초점 원칙 (Single Hero Focus)
한 화면·한 섹션에 하나의 제품·하나의 메시지·하나의 CTA. apple.com 제품 페이지의 모든 섹션은 이 원칙으로 구성 (공식, apple.com 실측).

### 2. 여백이 브랜드다 (Whitespace as Brand)
컨텐츠를 감싸는 여백의 양이 프리미엄 포지셔닝을 결정한다. apple.com 히어로 섹션의 텍스트 행 간격·여백은 경쟁사 대비 1.5~2배 (추정). "비어있는 공간이 말한다."

### 3. 타이포그래피가 레이아웃이다 (Type as Layout)
이미지 없이 텍스트만으로 한 섹션을 구성할 때, 폰트 크기 대비 차이로 시각적 계층을 만든다. "iPhone 16 Pro" (96px Bold) + "Hello, Apple Intelligence." (28px Regular) 조합이 이미지 없이도 완결된 레이아웃.

### 4. 스크롤 내러티브 (Scroll Narrative)
apple.com 제품 페이지는 스크롤이 곧 스토리다. 위에서 아래로: 감성 훅 → 디자인 → 성능 → 카메라 → 소프트웨어 → 가격·CTA. 사용자가 설득되는 순서를 레이아웃이 결정한다 (공식, apple.com 구조 분석).

### 5. 색상보다 형태 (Form over Color)
레이아웃의 계층은 색상이 아닌 크기·위치·여백으로 표현한다. 중요한 것을 크게, 덜 중요한 것을 작게. 색상은 CTA에만 사용.

## AI 이미지 생성 프롬프트 가이드

```
스타일 키워드: Apple-like, minimal, ultra-clean, product photography,
               studio lighting, white or near-black background only
톤: Premium, restrained, emotionally warm but visually cold,
    high contrast between subject and background
컬러 제약: background #FFFFFF or #1D1D1F only,
           accent #0071E3 for interactive elements only,
           product colors exactly as specified
타이포 처리: SF Pro Display style, tight letter-spacing on headlines,
             never use decorative or serif fonts
금지 요소: gradients on UI elements, stock photo humans,
           busy backgrounds, text shadows or glows,
           clip art, cartoon mascots, rainbow effects,
           lens flare, over-saturated colors
선호 요소: single product centered on pure white/black,
           shallow depth of field for context shots,
           real human hands (no faces) using product,
           environmental context (desk, outdoor, studio),
           motion blur for speed/performance messaging
인물 처리: Real-looking diverse humans, candid emotional expressions,
           hands-only shots for UI/product interaction,
           never stock photo expressions (forced smiles)
해상도: minimum 3000×3000 for print, 1920×1080 minimum for digital
```

## 디자인 금지사항

### 절대 금지 (공식 HIG·브랜드 가이드라인 기반)
- **Apple Blue(#0071E3)를 CTA 외 영역에 사용** — 링크·버튼 외 장식·배너·배경에 파란색 절대 금지
- **순검정(#000000) 텍스트** — #1D1D1F 또는 #1D1D1F에 opacity 조절로 대체
- **SF Pro 외 폰트 혼용** — 한국어는 SF Pro KR, 영문은 SF Pro. Helvetica Neue는 레거시 폴백만 허용 (CSS 데이터 확인)
- **Apple 로고 색상 변경** — 흰색 또는 검정 단색만 허용. 무지개 로고는 Heritage 맥락에서만
- **제품 이미지 배경 합성** — 실제 제품 사진에 배경 합성 엄격히 제한. 공식 제공 제품 이미지 사용 필수

### 강력 권고 금지 (추정, 브랜드 일관성 기반)
- 3색 이상의 UI 동시 사용 (Blue + Grey scale + 1 semantic color 원칙)
- 그라데이션 배경 (제품 사진 배경의 미묘한 vignette 제외)
- 텍스트 그림자·테두리·네온·발광 효과
- 사실적인 사람 얼굴 클로즈업 (손·실루엣 선호)
- 버튼 직각 모서리 (HIG 기준 radius 10~12px)
- 아이콘 스타일 혼용 (SF Symbols 외 아이콘 세트 혼용 금지)
- 정보 과부하 화면 (한 화면 = 한 의사결정 원칙)
- 스톡 포토 삽화 및 클립아트

## Apple 디자인을 한 줄로
> **"흰 배경, SF Pro, Apple Blue CTA, 충분한 여백. 이 네 가지만 지키면 Apple처럼 보인다."**

## Steal Sheet

1. **"여백을 깎지 말고 채우지 마라"** — Apple 디자인의 가장 쉬운 모방법은 현재 레이아웃의 패딩을 두 배로 늘리는 것이다. 대부분의 한국 웹사이트는 정보를 꽉 채우려는 본능으로 여백을 최소화한다. Apple은 반대로 한다. 섹션 상하 패딩을 80px에서 160px로 늘리기만 해도 즉시 프리미엄 느낌이 온다. 비용 제로의 리디자인.

2. **"단일 CTA, 단일 색상" 원칙 즉시 적용** — Apple Blue(#0071E3)처럼, 브랜드의 CTA 버튼 색상을 딱 하나로 고정하고 그 색을 전체 사이트·앱에서 CTA에만 쓴다. 현재 사이트에서 파란색·초록색·주황색 버튼이 혼재하고 있다면, 오늘 당장 하나로 통일하라. 클릭률과 함께 브랜드 신뢰도가 올라간다.

3. **"SF Symbols 스타일 아이콘" 채택** — Apple의 SF Symbols(공개 라이브러리, 6,000개+, 공식)는 무게감 조절(Ultralight~Black)이 가능한 선형 아이콘 시스템이다. 이 스타일을 한국 웹/앱 디자인에 적용하면 즉시 Apple 무드가 생긴다. Phosphor Icons, Lucide, Heroicons 등 유사 오픈소스 세트를 활용하면 된다. 아이콘 스타일 통일만으로 전체 UI 일관성이 30% 이상 향상된다(추정).
