# 디자인 시스템 — Alphabet / Google (GOOGL)

> 섹터: 커뮤니케이션 서비스 — 인터넷/검색/클라우드
> 기준일: 2026-04-12

---

## 1. 디자인 철학

| 원칙 | 설명 |
|------|------|
| Material You (공식) | 사용자 맞춤형 동적 색상·형태 시스템, Android 12+ 적용 |
| 유용성 우선 | 미적 요소보다 기능적 명료성 |
| 보편적 접근성 | WCAG 2.1 AA 이상 준수, 다국어·RTL 지원 |
| 모션 의미론 | 애니메이션은 장식이 아닌 상태 변화 전달 수단 |
| 일관성 | 2,000+ Google 제품 전체에 동일 컴포넌트 적용 |

---

## 2. 컬러 팔레트

### 2-1. 브랜드 코어 컬러 (공식)

| 컬러명 | HEX | 용도 |
|--------|-----|------|
| Google Blue | `#4285F4` | 주 CTA, 링크, 아이콘 (로고 B) |
| Google Red | `#EA4335` | 경고, 강조, 로고 R·e |
| Google Yellow | `#FBBC05` | 주목, 알림, 로고 o (두 번째) |
| Google Green | `#34A853` | 성공, 완료, 로고 g |
| Google Dark Grey | `#202124` | 본문 텍스트, 다크모드 배경 |
| Google Light Grey | `#F8F9FA` | 배경, 카드 서피스 |
| Google White | `#FFFFFF` | 기본 배경, 네거티브 스페이스 |

### 2-2. Google Cloud 컬러 (공식)

| 컬러명 | HEX | 용도 |
|--------|-----|------|
| Cloud Blue | `#1A73E8` | GCP 주 브랜드 컬러 |
| Cloud Dark Blue | `#174EA6` | 헤더, 다크 배경 |
| Cloud Teal | `#00897B` | 데이터 시각화, 성공 상태 |
| Cloud Orange | `#FA7B17` | 강조, 주의 |

### 2-3. Material You 동적 컬러 (공식)

| 역할 | 설명 | 예시 HEX (기본 시드) |
|------|------|----------------------|
| Primary | 주요 인터랙션 요소 | `#6750A4` (보라, 기본 시드) |
| Secondary | 보조 컨테이너 | `#625B71` |
| Tertiary | 대비 강조 | `#7D5260` |
| Surface | 카드·시트 배경 | `#FFFBFE` |
| On Primary | Primary 위 텍스트 | `#FFFFFF` |

### 2-4. Gemini AI 브랜드 컬러 (공식)

| 컬러명 | HEX | 용도 |
|--------|-----|------|
| Gemini Blue | `#8AB4F8` | Gemini 로고 그라디언트 시작 |
| Gemini Purple | `#C58AF9` | Gemini 로고 그라디언트 중간 |
| Gemini Teal | `#81C995` | Gemini 로고 그라디언트 끝 |
| Gemini Dark BG | `#1E1F20` | Gemini 앱 다크모드 배경 |

### 2-5. YouTube 브랜드 컬러 (공식)

| 컬러명 | HEX | 용도 |
|--------|-----|------|
| YouTube Red | `#FF0000` | 로고, 구독 버튼 |
| YouTube Dark | `#212121` | 다크모드 배경 |
| YouTube White | `#FFFFFF` | 라이트모드 배경 |
| YouTube Grey | `#606060` | 보조 텍스트, 아이콘 |

---

## 3. 타이포그래피

### 3-1. Google Sans (공식 브랜드 폰트)

| 웨이트 | 용도 |
|--------|------|
| Google Sans Regular (400) | 본문, UI 레이블 |
| Google Sans Medium (500) | 소제목, 강조 |
| Google Sans Bold (700) | 헤드라인, CTA |

- 폴백: `Roboto`, `Arial`, `sans-serif`
- 최소 가독성 크기: 12px (UI), 14px (본문)
- 줄간격: 1.4~1.6 (본문), 1.2 (헤드라인)

### 3-2. Google Symbols (아이콘 폰트)

- Material Symbols (가변 폰트 기반)
- 3가지 스타일: Outlined / Rounded / Sharp
- 크기 변수: 20dp, 24dp, 40dp, 48dp

---

## 4. 레이아웃 시스템

| 요소 | 규격 |
|------|------|
| 기본 그리드 단위 | 8dp |
| 컬럼 시스템 | 4 col (모바일), 8 col (태블릿), 12 col (데스크탑) |
| 최대 콘텐츠 너비 | 1,440px |
| 카드 모서리 반경 | 8dp (소), 12dp (중), 28dp (대) |
| 최소 터치 타겟 | 48×48dp |
| 기본 패딩 | 16dp (모바일), 24dp (데스크탑) |

---

## 5. 모션 & 애니메이션

| 항목 | 규격 |
|------|------|
| 기본 이징 | `cubic-bezier(0.2, 0, 0, 1)` (Material Emphasized) |
| 짧은 전환 | 100~200ms |
| 중간 전환 | 300~400ms |
| 긴 전환 | 500~600ms |
| 공유 요소 전환 | 컨테이너 변환 (Container Transform) |
| 감속 이징 | `cubic-bezier(0, 0, 0, 1)` — 화면 진입 |
| 가속 이징 | `cubic-bezier(0.3, 0, 1, 1)` — 화면 이탈 |

---

## 6. 컴포넌트 라이브러리 (Material Design 3)

| 카테고리 | 주요 컴포넌트 |
|----------|---------------|
| 버튼 | Filled, Tonal, Outlined, Text, FAB |
| 입력 | Filled TextField, Outlined TextField, Search Bar |
| 내비게이션 | Navigation Bar, Navigation Rail, Navigation Drawer |
| 카드 | Elevated, Filled, Outlined |
| 대화상자 | Basic Dialog, Full-screen Dialog |
| 칩 | Assist, Filter, Input, Suggestion |
| 알림 | Snackbar, Badge, Banner |

---

## 7. 접근성 기준

| 항목 | 기준 |
|------|------|
| 색상 대비 (일반 텍스트) | 최소 4.5:1 (WCAG AA) |
| 색상 대비 (대형 텍스트) | 최소 3:1 |
| 포커스 인디케이터 | 3px 이상, 대비 3:1 이상 |
| 화면 낭독기 지원 | TalkBack (Android), VoiceOver (iOS) 완전 지원 |
| 텍스트 크기 확대 | 200%까지 레이아웃 유지 |

---

## 8. Steal Sheet — 디자인 레이어

| # | 전술 | 실행 방법 |
|---|------|-----------|
| 1 | Material You 동적 컬러를 마케팅 자산에 적용 | 사용자 기기 배경화면 색상과 연동되는 개인화 광고 배너 — "당신의 색상으로 말하는 Google" |
| 2 | Gemini 그라디언트 아이덴티티 차용 | AI 제품 랜딩페이지에 `#8AB4F8`→`#C58AF9`→`#81C995` 그라디언트 적용, 미래지향적 포지셔닝 |
| 3 | 8dp 그리드 기반 일관성 어필 | 경쟁사 대비 "어느 화면에서나 동일한 경험" — 크로스디바이스 광고 캠페인으로 생태계 락인 시각화 |
