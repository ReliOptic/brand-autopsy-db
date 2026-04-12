# 05. 디자인 시스템 해부 — Dell Technologies

## 디자인 철학

Dell Technologies의 디자인 언어는 **"명확성을 통한 신뢰(Trust Through Clarity)"** 로 요약된다 (추정). 복잡한 IT 포트폴리오를 다루는 브랜드답게, 시각적 노이즈를 최소화하고 정보 위계를 명확히 하는 것이 최우선 원칙이다. 소비자 라인(XPS·Alienware)은 각각의 독자적 디자인 시스템을 갖지만, Dell Technologies 코퍼레이트 레이어에서는 일관된 블루-화이트-그레이 트라이어드가 지배한다.

---

## 컬러 시스템

### 코퍼레이트 팔레트 (CSS 데이터 기반)

| 역할 | 컬러명 | HEX | 출처 | 사용 빈도 |
|------|--------|-----|------|---------|
| Primary Blue | Dell Blue | `#00468B` | 공식 | 높음 (count: 18) |
| Interactive Blue | Action Blue | `#0672CB` | 공식 | 중간 (count: 8) |
| Deep Blue | Deep Blue | `#0063B8` | 공식 | 중간 (count: 5) |
| Mid Blue | Link Blue | `#1D73C2` | 공식 | 낮음 (count: 2) |
| Primary Dark | Near Black | `#0E0E0E` | 공식 | 높음 (count: 14) |
| Text Gray | Body Gray | `#636363` | 공식 | 매우 높음 (count: 30) |
| Mid Gray | UI Gray | `#535657` | 공식 | 낮음 (count: 3) |
| Warm Gray | Subtle Gray | `#6E6E6E` | 공식 | 낮음 (count: 2) |
| Light Gray | Background | `#C8C9C7` | 공식 | 낮음 (count: 5) |
| Border Gray | Divider | `#B6B6B6` | 공식 | 낮음 (count: 3) |
| Pale Gray | Card BG | `#D2D2D2` | 공식 | 낮음 (count: 2) |
| Light Border | Subtle Border | `#C4C4C4` | 공식 | 낮음 (count: 2) |
| Surface Gray | Section BG | `#E1E1E1` | 공식 | 낮음 (count: 5) |
| Surface Light | Alt Section | `#E0E1E2` | 공식 | 낮음 (count: 3) |
| Near White | Page BG | `#F0F0F0` | 공식 | 높음 (count: 12) |
| Off White | Alt BG | `#F5F6F7` | 공식 | 중간 (count: 7) |
| Pure Near White | Card BG | `#F9F9F9` | 공식 | 낮음 (count: 2) |
| Sky Tint | Accent Light | `#D9F5FD` | 공식 | 낮음 (count: 2) |
| Accent Magenta | Highlight | `#7F234F` | 공식 | 낮음 (count: 3) |
| Accent Purple | Dark Accent | `#40155C` | 공식 | 낮음 (count: 3) |

### 컬러 사용 원칙

**Primary Hierarchy**
- `#00468B` (Dell Blue): 로고, 헤더, 주요 CTA 버튼 — 브랜드 인식의 핵심 앵커
- `#0672CB` (Action Blue): 링크, 보조 버튼, 인터랙티브 요소
- `#0E0E0E` (Near Black): 본문 텍스트, 헤드라인
- `#636363` (Body Gray): 보조 텍스트, 캡션, 메타데이터

**배경 시스템**
- `#F5F6F7` / `#F0F0F0`: 섹션 배경 교차 사용으로 시각적 리듬 생성
- `#FFFFFF` (명시되지 않음, 추정 사용): 카드·모달 배경

**액센트 컬러 (제한적 사용)**
- `#7F234F` (Magenta): 이벤트·캠페인 강조, Dell Technologies World 등 특수 맥락
- `#40155C` (Deep Purple): 그라데이션 배경, 엔터프라이즈 AI 관련 시각 자료
- `#D9F5FD` (Sky Tint): 클라우드·APEX 관련 인포그래픽 배경

### 서브브랜드 컬러 (추정)

| 서브브랜드 | 대표 컬러 | HEX | 비고 |
|-----------|---------|-----|------|
| Alienware | Lunar Light + Teal | `#00D1B2` | (추정) 게이밍 고채도 팔레트 |
| XPS | Platinum Silver | `#C0C0C0` | (추정) 메탈릭 미니멀 |
| Dell APEX | Deep Blue Gradient | `#00468B` → `#0672CB` | (추정) |
| Alienware Dark | Void Black | `#0A0A0A` | (추정) 어두운 테마 기본 |

---

## 타이포그래피 시스템

### 웹폰트 (CSS 데이터 기반 — 다국어 지원 포함)

| 언어 환경 | 폰트명 | 용도 |
|---------|--------|------|
| 영문 기본 | Roboto | 공식 — 본문, UI 전반 |
| 영문 폴백 | Arial, Helvetica | 공식 — 시스템 폰트 폴백 |
| 한국어 | 맑은 고딕 (Malgun Gothic) | 공식 — 한글 UI |
| 한국어 | Gulim | 공식 — 레거시 한글 폴백 |
| 일본어 | Meiryo UI, MS UI Gothic | 공식 — 일본어 UI |
| 중국어 (간체) | Microsoft YaHei, SimHei | 공식 — 중국 간체 |
| 중국어 (번체) | Microsoft JhengHei | 공식 — 대만·홍콩 |
| 태국어 | Cordia New | 공식 |
| 인도어군 | Nirmala UI, Kartika, Latha 등 | 공식 — 다국어 인도 지원 |

**타이포그래피 원칙 (추정)**
- 헤드라인: Roboto Bold / 28~48px / 자간 -0.5px
- 서브헤드: Roboto Medium / 18~24px
- 본문: Roboto Regular / 14~16px / 행간 1.6
- 캡션: Roboto Regular / 12px / `#636363`
- 한국어 UI: 맑은 고딕으로 동일 위계 적용

---

## 레이아웃 & 그리드 시스템 (추정)

- **컨테이너 최대 너비**: 1280px
- **그리드**: 12컬럼 / 거터 24px / 마진 32px(데스크탑), 16px(모바일)
- **섹션 패딩**: 80px 상하 (데스크탑), 48px (모바일)
- **카드 컴포넌트**: 8px 모서리 반경, `#E1E1E1` 테두리 또는 그림자
- **CTA 버튼**: Primary `#0672CB` 배경 + 흰색 텍스트 / Secondary 흰색 배경 + `#00468B` 테두리

---

## 아이콘 & 일러스트레이션 원칙 (추정)

- **아이콘 스타일**: 라인 아이콘 (stroke 2px), 모노크롬 `#636363` 또는 `#0672CB`
- **일러스트레이션**: 플랫 + 아이소메트릭 혼합, 인프라·클라우드·엣지 시각화에 주로 사용
- **포토그래피**: 실제 데이터센터·업무 환경 + 다양성 반영 인물 사진 병행
- **영상 스타일**: B2B — 화이트 스튜디오 + 데이터 시각화 / Alienware — 어두운 배경 + 네온 라이팅

---

## 디자인 시스템 적용 원칙

### 코퍼레이트 레이어
1. Dell Blue(`#00468B`)가 1개 이상 보여야 한다
2. 배경은 화이트 또는 오프화이트(`#F5F6F7`) 계열 유지
3. 텍스트 색상은 `#0E0E0E` 또는 `#636363` 2단계만 사용
4. 액센트 컬러(마젠타·퍼플)는 전체 화면의 10% 이하로 제한

### 소비자 레이어 (XPS)
1. 메탈릭 실버 톤 이미지와 `#0672CB` 액센트 조합
2. 제품 사진은 항상 고해상도 화이트 배경
3. OLED 화면은 색상 팝핑 이미지로 디스플레이 강점 직접 시연

### 게이밍 레이어 (Alienware)
1. 다크 배경 (`#0A0A0A` 계열) 필수
2. RGB 일러스트레이션 허용
3. 헤드라인은 임팩트 있는 굵은 폰트, 모두 대문자 허용

---

### Steal Sheet — 3가지

1. **CSS 컬러 데이터가 브랜드 전략을 증명한다.** Dell의 CSS에서 `#636363`(Body Gray)이 가장 높은 빈도(count 30)를 보이는 것은 텍스트 중심 정보 아키텍처의 증거다. Dell은 화려한 색보다 정보 가독성을 우선한다. 브랜드 컬러를 분석할 때 '공식 팔레트'보다 실제 CSS 빈도를 보면 브랜드의 실제 우선순위가 드러난다.

2. **다국어 폰트 스택은 글로벌 B2B 신뢰성의 비가시적 인프라다.** Dell의 CSS에 한국어(맑은 고딕), 일본어(Meiryo UI), 중국어(Microsoft YaHei), 인도어군(Nirmala UI) 등 20개 이상의 폰트가 선언된 것은 글로벌 IT 구매자에게 "우리는 당신의 언어로 비즈니스한다"는 암묵적 신호다. 글로벌 B2B 진출 시 다국어 타이포그래피 투자는 광고 예산보다 먼저 집행해야 한다.

3. **서브브랜드마다 독립적인 디자인 언어를 부여하되 컬러 앵커 하나는 공유하라.** Dell Blue(`#00468B`)는 Alienware 사이트에서도 로고 영역에 등장한다. 서브브랜드가 완전히 다른 비주얼로 운영되더라도, 코퍼레이트 컬러 앵커 하나를 유지하면 "이것도 Dell이다"라는 신뢰가 자연스럽게 전이된다.
