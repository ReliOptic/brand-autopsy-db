# 05. 디자인 시스템 — Microsoft (MSFT)

## 컬러 시스템

### 주요 컬러 팔레트 (CSS 데이터 기반)

| 역할 | 컬러명 | HEX | 출처 | 사용 용도 |
|------|--------|-----|------|-----------|
| Primary Brand Blue | Microsoft Blue | `#0067B8` | (공식) | 주요 CTA 버튼, 링크, 핵심 UI 요소 |
| Primary Interactive | Interactive Blue | `#0066FF` | (공식) | 호버 상태, 인터랙티브 강조 |
| Secondary Light Blue | Azure Sky | `#3AA0FA` | (공식) | 카드 강조, 아이콘, 보조 UI |
| Accent Cyan | Copilot Cyan | `#50E6FF` | (공식) | Azure·Copilot 브랜드 강조, 그라데이션 |
| Dark Navy | Microsoft Navy | `#243A5E` | (공식) | 다크 헤더, 프리미엄 섹션 배경 |
| Neutral Dark | Charcoal | `#171717` | (공식) | 본문 텍스트, 다크 모드 배경 |
| Neutral Mid-Dark | Dark Gray | `#2F2F2F` | (공식) | 서브 텍스트, 아이콘 |
| Neutral Mid | Medium Gray | `#505050` | (공식) | 보조 텍스트, 비활성 요소 |
| Neutral Light-Mid | Silver | `#757575` | (공식) | 캡션, 플레이스홀더 |
| Neutral Light | Soft Gray | `#A2A2A2` | (공식) | 비활성 버튼, 보더 |
| Neutral Border | Border Gray | `#D2D2D2` | (공식) | 카드 보더, 구분선 |
| Neutral Background | Light Gray | `#E6E6E6` | (공식) | 섹션 배경, 비활성 영역 |
| Neutral Surface | Off White | `#F2F2F2` | (공식) | 페이지 배경, 카드 배경 |
| Light Accent | Sky Tint | `#D2E4F2` | (공식) | 정보 박스 배경, 강조 표시 배경 |
| Alert Red | Error Red | `#DC3545` | (공식) | 에러 상태, 경고 메시지 |
| Office Orange | Word/Office Red | `#D83B01` | (공식) | 오피스 제품군 강조, 오류 |
| Accent Yellow | Xbox Yellow | `#FFB900` | (공식) | 배지, 하이라이트, Xbox 브랜드 |
| Accent Dark | Graphite | `#404040` | (공식) | 다크 UI 보조 요소 |
| Neutral Mid-Alt | Mid Gray Alt | `#858585` | (공식) | 보조 텍스트 대안 |
| Neutral Border Alt | Soft Border | `#D9D9D9` | (공식) | 대안 구분선 |

### 컬러 사용 규칙

**주 브랜드 컬러 조합 (공식)**
- 배경 흰색 + 텍스트 `#171717` + CTA `#0067B8` — 기본 라이트 테마
- 배경 `#243A5E` + 텍스트 `#F2F2F2` + 강조 `#50E6FF` — 다크·프리미엄 섹션
- 배경 `#0067B8` + 텍스트 흰색 — 히어로 배너, CTA 블록

**그라데이션 패턴 (추정: Copilot/Azure 비주얼)**
- Azure 그라데이션: `#0067B8` → `#50E6FF` (45도 좌하→우상)
- Copilot 그라데이션: `#243A5E` → `#3AA0FA` → `#50E6FF`

**접근성 규칙**
- 텍스트-배경 최소 대비율 WCAG AA 4.5:1 준수 (Microsoft Accessibility Standards)
- `#757575` on white = 4.48:1 (경계선, 소형 텍스트 주의)
- `#0067B8` on white = 4.6:1 (AA 통과)

---

## 타이포그래피 시스템

### 폰트 패밀리 (CSS 데이터 기반)

| 역할 | 폰트 | 분류 | 출처 | 사용 맥락 |
|------|------|------|------|-----------|
| **Primary Brand Font** | Segoe UI | Sans-serif | (공식) | 모든 Microsoft 제품 UI, 웹사이트 본문·제목 |
| **Primary Brand Font (Alt)** | SegoeUI | Sans-serif | (공식) | CSS 변수명 표기 대안 |
| **Code / Monospace** | Consolas | Monospace | (공식) | 코드 블록, 터미널 출력, Azure CLI 예시 |
| **Code Fallback** | Courier / Liberation Mono / Menlo / SFMono-Regular | Monospace | (공식) | Consolas 미지원 환경 폴백 |
| **System Fallback** | Arial, Helvetica, Helvetica Neue | Sans-serif | (공식) | Segoe UI 미지원 환경 (비Windows) |
| **Icon Font** | MWF-FLUENT-ICONS | Icon | (공식) | Microsoft Web Framework Fluent 아이콘 셋 |
| **Legacy Serif** | Times, Times New Roman, TimesNewRoman | Serif | (공식) | 법적 문서, 일부 레거시 페이지 |

### 타이포그래피 스케일 (추정: Fluent Design System 기반)

| 레벨 | 사용 | 크기(데스크톱) | 굵기 | 행간 |
|------|------|----------------|------|------|
| Display | 히어로 메인 헤드라인 | 68px | 600 | 1.1 |
| Title Large | 섹션 대제목 | 40px | 600 | 1.2 |
| Title | 카드 제목, 서브섹션 | 28px | 600 | 1.3 |
| Subtitle | 리드 텍스트 | 20px | 400 | 1.5 |
| Body Large | 주요 본문 | 18px | 400 | 1.6 |
| Body | 일반 본문 | 16px | 400 | 1.6 |
| Caption | 주석, 메타 정보 | 12px | 400 | 1.4 |

**폰트 스택 (CSS 표준):**
```css
font-family: "Segoe UI", "SegoeUI", Arial, Helvetica, "Helvetica Neue", sans-serif;
```

---

## 채널별 규격

### 소셜 미디어

| 채널 | 포맷 | 권장 크기 | 텍스트 비율 | 비고 |
|------|------|-----------|------------|------|
| LinkedIn 피드 이미지 | 정방형 | 1200×1200px | 20% 이하 | 브랜드 블루 배경 + 흰색 텍스트 주류 |
| LinkedIn 배너 | 가로형 | 1128×191px | - | 기업 페이지 커버 |
| X(트위터) 이미지 | 가로형 | 1200×675px | 20% 이하 | - |
| YouTube 썸네일 | 가로형 | 1280×720px | - | 제품 스크린샷 + 브랜드 오버레이 |
| YouTube 채널아트 | 와이드 | 2560×1440px | - | 안전 영역 1546×423px 내 핵심 요소 |
| Instagram 피드 | 정방형 | 1080×1080px | - | Microsoft 공식 IG 활동 제한적 |

### 디지털 광고

| 포맷 | 크기 | 용도 |
|------|------|------|
| 리더보드 | 728×90px | 뉴스 사이트 상단 |
| 미디엄 레크탱글 | 300×250px | 사이드바, 모바일 인피드 |
| 스카이스크래퍼 | 160×600px | 사이드바 |
| 빌보드 | 970×250px | 프리미엄 상단 |
| 모바일 배너 | 320×50px | 모바일 웹 |

### 이메일

| 항목 | 규격 |
|------|------|
| 최대 너비 | 600px |
| 헤더 이미지 | 600×200px |
| 버튼 크기 | 최소 44×44px (터치 접근성) |
| 본문 폰트 | Segoe UI 16px, Fallback Arial |
| 모바일 최적화 | 단일 컬럼, 버튼 전체 너비 |

### 프레젠테이션 (PowerPoint)

| 항목 | 규격 |
|------|------|
| 슬라이드 비율 | 16:9 (1920×1080px) |
| 여백 | 최소 40px (각 방향) |
| 제목 폰트 | Segoe UI 28~40pt, Bold |
| 본문 폰트 | Segoe UI 18~24pt, Regular |
| 슬라이드 당 텍스트 | 최대 6줄 권장 |

---

## 레이아웃 원칙 (Fluent Design System)

Microsoft Fluent Design System의 5대 원칙(출처: microsoft.com/design/fluent, 공식):

1. **Light (빛)** — 중요한 요소에 빛과 반사를 사용해 계층 구조를 표현. Azure 사이트의 Acrylic/Blur 효과.
2. **Depth (깊이)** — Z축 레이어링으로 정보 계층화. 카드 위 카드, 모달 오버레이.
3. **Motion (모션)** — 애니메이션은 의미가 있어야 함. 전환은 부드럽고 목적 있게. 장식적 모션 금지.
4. **Material (소재)** — Acrylic(반투명 흐림), Reveal(마우스 근접 강조) 등 재료감 있는 UI.
5. **Scale (스케일)** — 모든 기기 크기에서 일관된 경험. 8px 그리드 시스템 기반.

**8px 그리드 규칙:**
- 모든 여백, 패딩, 컴포넌트 크기는 8의 배수 (8, 16, 24, 32, 40, 48, 64px)
- 아이콘: 16, 20, 24, 32, 48px 중 선택

---

## AI 이미지 생성 프롬프트

Microsoft 비주얼 스타일로 이미지를 생성할 때 사용하는 프롬프트 템플릿.

### 기본 스타일 프롬프트
```
Microsoft Fluent Design style, clean modern corporate, light background #F2F2F2, 
Microsoft Blue (#0067B8) accent, Segoe UI typography, 8px grid alignment, 
high contrast, professional B2B, no clutter, whitespace-heavy, 
subtle depth with soft shadows, --ar 16:9
```

### 제품 스크린샷 합성
```
Microsoft 365 Copilot interface mockup, dark navy (#243A5E) sidebar, 
Azure cyan (#50E6FF) highlight glow, floating UI card on white background, 
clean enterprise software aesthetic, depth blur effect, photorealistic, 
--ar 16:9 --style raw
```

### 인물·다양성 일러스트
```
Diverse professional team collaborating, Microsoft brand colors, 
warm inclusive atmosphere, modern office or hybrid work setting, 
flat illustration or realistic photo style, 
primary blue (#0067B8) accent elements, --ar 3:2
```

### AI/테크 컨셉 비주얼
```
Abstract AI network visualization, Microsoft Azure color palette, 
flowing light trails from #50E6FF to #0067B8, dark background #243A5E, 
particle network, clean tech aesthetic, no text, --ar 16:9
```

---

## 디자인 금지사항

### 컬러 관련
- 브랜드 블루(`#0067B8`) 외 임의 파란색 사용 금지 — 브랜드 컬러 희석
- 채도 100%의 원색 사용 금지 (빨강은 에러 상태에만, 초록·보라 임의 사용 금지)
- 배경과 텍스트 대비율 4.5:1 미만 조합 금지 (WCAG AA 위반)
- 그라데이션 남발 — 그라데이션은 히어로 섹션과 특정 제품 컨텍스트에만 허용

### 타이포그래피 관련
- Segoe UI 외 장식체(Display font) 사용 금지 — 공식 자산 아닌 경우
- 본문 텍스트 12px 미만 금지 (접근성)
- 모두 대문자(All Caps) 긴 본문 금지 — 제목은 허용
- 줄 길이 75자 초과 금지 (가독성)

### 레이아웃 관련
- 중앙 정렬 텍스트를 3줄 이상 사용 금지
- 8px 그리드 벗어난 임의 여백 금지
- 슬라이드·배너에 5개 이상 폰트 크기 사용 금지
- 이미지 위에 반투명 오버레이 없이 밝은 텍스트 직접 배치 금지

---

### Steal Sheet — 디자인 시스템

1. **"8px 그리드 단 하나의 규칙으로 일관성 확보"** — Microsoft Fluent의 8px 그리드는 디자이너·개발자·마케터 모두가 지킬 수 있는 단순한 규칙이다. 도구(Figma, PPT, CSS)에 관계없이 8의 배수 여백만 지키면 어떤 자산도 브랜드처럼 보인다. 한국 스타트업에서 훔칠 원칙: 복잡한 디자인 가이드 대신 "여백은 8, 16, 24, 32px만 사용"이라는 한 줄 규칙부터 시작.

2. **"Fluent Icons를 시스템으로"** — Microsoft는 MWF-FLUENT-ICONS라는 전용 아이콘 폰트를 통해 웹·앱·문서·슬라이드 전반의 아이콘을 통일한다. 서드파티 아이콘 혼용 금지. 한국 브랜드에서 훔칠 원칙: Lucide, Heroicons, Phosphor 중 하나를 선택해 전사 표준으로 고정하고, 아이콘 교체를 위해 PR 승인을 받는 프로세스를 만들어라.

3. **"접근성 = 품질 지표"** — Microsoft는 접근성(WCAG AA) 준수를 마케팅 차별점이 아니라 최소 품질 기준으로 설정한다. 대비율 4.5:1 미만 조합은 QA 단계에서 자동 차단. 한국 브랜드에서 훔칠 원칙: Figma의 Contrast 플러그인 또는 WebAIM Contrast Checker를 디자인 QA 체크리스트에 추가. 접근성은 추가 비용이 아니라 이미지 향상 자산이다.
