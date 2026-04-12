# 05 디자인 시스템 — AppLovin (APP)

## 디자인 철학

AppLovin의 비주얼 아이덴티티는 **"기술적 정밀함 + 다크 테크 미학"**을 기반으로 한다. 딥 네이비·퍼플 그라디언트가 AI·첨단 기술 이미지를 구현하며, 선명한 블루 액센트가 클리어한 행동 신호를 제공한다. 전반적으로 B2B SaaS 테크 기업의 시각 언어를 따르되, 게임 산업과 연계된 에너제틱한 퍼플 계열이 차별화 포인트다.

---

## 컬러 시스템

### 주요 컬러 팔레트

| 역할 | 색상명 | HEX | 사용 빈도 | 출처 |
|------|--------|-----|----------|------|
| 배경 Primary | Deep Space Navy | `#181625` | 매우 높음 (33회) | (공식) |
| 브랜드 액센트 | Electric Purple | `#A15AF0` | 높음 (13회) | (공식) |
| CTA / 인터랙션 | Vivid Blue | `#105FFB` | 높음 (11회) | (공식) |
| 배경 Light | Cloud White | `#F7F8FC` | 높음 (10회) | (공식) |
| 보조 Blue | Cobalt Blue | `#3B5EF8` | 중간 (6회) | (공식) |
| 보더 / 구분선 | Silver Mist | `#D3D9E7` | 중간 (4회) | (공식) |
| 배경 Subtle | Pale Blue | `#E7EBF4` | 중간 (4회) | (공식) |
| 배경 Neutral | Light Gray | `#F2F2F2` | 중간 (4회) | (공식) |
| 보조 Teal | Ocean Teal | `#099AC6` | 중간 (4회) | (공식) |

### 확장 팔레트

| 역할 | 색상명 | HEX | 사용 빈도 | 출처 |
|------|--------|-----|----------|------|
| 배경 Subtle 2 | Ghost Blue | `#EEF0F6` | 낮음 (3회) | (공식) |
| 보조 Blue Light | Sky Blue | `#68A7FF` | 낮음 (3회) | (공식) |
| 텍스트 Dark | Charcoal | `#393939` | 낮음 (2회) | (공식) |
| 텍스트 Primary | Near Black | `#212121` | 낮음 (2회) | (공식) |
| 배경 Pink Tint | Blush White | `#FFF5F7` | 낮음 (2회) | (공식) |
| 배경 Blue Tint | Ice Blue | `#F0F2FF` | 낮음 (2회) | (공식) |
| 보더 2 | Lavender Mist | `#E3E7F2` | 낮음 (2회) | (공식) |
| 텍스트 Secondary | Slate Gray | `#4A5568` | 낮음 (2회) | (공식) |
| 텍스트 Muted | Steel Gray | `#4F5A7D` | 낮음 (2회) | (공식) |
| 텍스트 Placeholder | Soft Blue Gray | `#929BBA` | 낮음 (2회) | (공식) |
| 배경 Off-White | Pebble | `#E6E6E6` | 낮음 (2회) | (공식) |

---

## 컬러 사용 원칙

### 다크 모드 우선 (Dark-First)
- 주 배경: `#181625` (Deep Space Navy) — 테크·AI 이미지 강화
- 텍스트 온 다크: `#F7F8FC` (Cloud White)
- 다크 배경 위 액센트: `#A15AF0` (Electric Purple) + `#105FFB` (Vivid Blue)

### 그라디언트 활용 (추정)
- 히어로 섹션: `#A15AF0` → `#105FFB` 대각선 그라디언트
- CTA 버튼: `#3B5EF8` → `#105FFB`
- 배경 오버레이: `#181625` → 투명 (페이드 아웃)

### 라이트 모드
- 배경: `#F7F8FC` 또는 `#FFFFFF`
- 주 텍스트: `#212121`
- 보조 텍스트: `#4A5568`
- 액센트: `#105FFB` (CTA), `#A15AF0` (하이라이트)

---

## 타이포그래피 시스템

### 주요 서체

| 역할 | 서체 | 스타일 | 출처 |
|------|------|--------|------|
| 브랜드 헤딩 | Mont (Montserrat 변형) | Black, Bold, SemiBold | (공식) |
| 본문 / UI | DM Sans | Regular, Medium | (공식) |
| 코드 / 기술 문서 | Consolas / SFMono-Regular | Monospace | (공식) |
| 폴백 | Arial, Helvetica | System | (공식) |

### Mont 패밀리 (브랜드 전용 서체)

AppLovin은 자체 라이선스 서체 "Mont"를 사용한다. 웨이트 체계:

| 웨이트 | 용도 |
|--------|------|
| MontBlack / MontHeavy | 히어로 헤드라인, 수치 강조 |
| MontBold | 섹션 제목, 버튼 |
| MontSemiBold | 서브 헤드라인, 카드 제목 |
| MontRegular | 본문 보조 텍스트 |
| MontLight / MontBook | 캡션, 법적 고지 |
| MontThin / MontHairline | 장식적 대형 텍스트 (추정) |

### 타이포그래피 스케일 (추정)

| 레벨 | 크기 | 웨이트 | 사용처 |
|------|------|--------|--------|
| H1 | 56–72px | MontBlack | 히어로 헤드라인 |
| H2 | 36–48px | MontBold | 섹션 제목 |
| H3 | 24–32px | MontSemiBold | 서브섹션 |
| Body Large | 18–20px | DM Sans Regular | 리드 텍스트 |
| Body | 16px | DM Sans Regular | 본문 |
| Caption | 14px | DM Sans Light | 보조 정보 |
| Code | 14px | Consolas | 코드 스니펫 |

---

## 컴포넌트 스타일 (추정)

### 버튼
- Primary CTA: `#105FFB` 배경, 흰색 텍스트, 8px radius
- Secondary: 투명 배경, `#105FFB` 보더, `#105FFB` 텍스트
- Ghost: 다크 배경 위 흰색 보더

### 카드
- 다크: `#1E1B2E` 배경 (추정), `1px` `#E3E7F2` 보더
- 라이트: `#FFFFFF` 배경, `#E7EBF4` 보더, `8px` 섀도우

### 아이콘
- 선형(Line) 아이콘 스타일 우선 (추정)
- 퍼플·블루 단색 또는 그라디언트 적용

---

## 이미지·비주얼 방향성

| 카테고리 | 스타일 |
|----------|--------|
| 제품 스크린샷 | 다크 UI 프레임, 데이터 대시보드 강조 |
| 일러스트 | 추상적 데이터 흐름, 연결망, AI 뉴럴 패턴 |
| 사진 | 다양성 있는 개발자·팀 협업 장면 |
| 데이터 시각화 | 네온 블루·퍼플 라인 차트, 바 차트 |
| 배경 텍스처 | 미묘한 그리드·닷 패턴 (추정) |

---

## 스틸 시트 (Steal Sheet) — 디자인 레이어

### Steal 1: 다크 테크 배경 + 그라디언트 액센트
`#181625` 딥 다크 배경에 `#A15AF0`→`#105FFB` 그라디언트 요소를 조합하면 AI·첨단 기술 브랜드 포지셔닝을 즉각 전달한다.
- **적용법**: 히어로 섹션에 다크 배경 + 퍼플·블루 그라디언트 헤드라인 또는 장식 요소 배치.

### Steal 2: Mont 헤딩 + DM Sans 본문 조합
브랜드 전용 헤딩 서체(개성)와 가독성 최적화 본문 서체(실용성)의 조합. 기술 브랜드의 신뢰성과 개성을 동시에 구현.
- **적용법**: 헤딩에는 고웨이트 디스플레이 서체, 본문에는 DM Sans·Inter 같은 UI 최적화 서체를 쌍으로 사용.

### Steal 3: 수치 중심 시각 계층
주요 수치(ROAS %, ARPDAU 수치)를 MontBlack 72px로 히어로 처리하고 설명 텍스트를 작게 배치. 숫자 자체가 비주얼 앵커.
- **적용법**: 랜딩 페이지 성과 섹션에서 수치를 가장 큰 요소로 배치. 독자 시선이 수치 → 설명 순으로 흐르도록 설계.
