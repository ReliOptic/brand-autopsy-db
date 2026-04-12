# 05 디자인 시스템 — Super Micro Computer (SMCI)

## 컬러 시스템

### 주요 컬러 팔레트 (CSS 데이터 기반)

| 역할 | 컬러명 | HEX | 용도 | 출처 |
|------|--------|-----|------|------|
| 브랜드 네이비 (Primary Dark) | Deep Navy | `#003A70` | 헤더, 주요 CTA 배경, 브랜드 앵커 컬러 | 공식 (count:3) |
| 미디엄 블루 (Primary) | Corporate Blue | `#0C82C4` | 버튼, 링크, 아이콘 강조 | 공식 (count:2) |
| 라이트 블루 (Accent) | Sky Accent | `#5EC0ED` | 호버 상태, 하이라이트, 배지 | 공식 (count:2) |
| 소프트 블루 1 | Horizon Blue | `#55B1DD` | 섹션 구분선, 보조 그래픽 | 공식 (count:1) |
| 소프트 블루 2 | Lagoon Blue | `#4EB4E5` | 인포그래픽, 차트 보조색 | 공식 (count:1) |
| 미드 블루 1 | Pacific Blue | `#2A99D3` | 내비게이션 호버, 탭 활성 | 공식 (count:1) |
| 미드 블루 2 | Azure | `#1488C8` | 보조 버튼, 링크 활성 | 공식 (count:1) |
| 페일 블루 (Background) | Ice Blue | `#D1EDFA` | 카드 배경, 섹션 배경 | 공식 (count:1) |
| 틸 블루 1 | Cerulean | `#3DA6DB` | 차트 주요 데이터 포인트 | 공식 (count:1) |
| 틸 블루 2 | Steel Teal | `#3D8CAC` | 테이블 헤더, 구분선 | 공식 (count:1) |
| 다크 블루 | Midnight Blue | `#08528C` | 풋터 배경, 다크 섹션 | 공식 (count:1) |
| 엑센트 옐로 | Amber Gold | `#FAAD17` | 경고 뱃지, 프로모션 강조, CTA 포인트 | 공식 (count:1) |
| 블루 2 | Cobalt | `#46AAE0` | 소셜 아이콘, 보조 링크 | 공식 (count:1) |
| 라이트 그레이 (Background) | Cloud Gray | `#F6F6F6` | 페이지 배경, 카드 기본 배경 | 공식 (count:1) |
| 미드 블루 3 | Bay Blue | `#2294D6` | 배너 그라디언트 보조 | 공식 (count:1) |
| 다크 미드 블루 | Indigo Blue | `#186296` | 사이드바 배경, 다크 카드 | 공식 (count:1) |
| 브라이트 블루 | Vivid Blue | `#008ADB` | 인터랙티브 강조, 뱃지 | 공식 (count:1) |
| 라이트 그레이 보더 | Silver | `#DDDDDD` | 테이블 보더, 카드 구분선 | 공식 (count:3) |
| 다크 브라운-그레이 | Warm Slate | `#5F3F3F` | 경고 텍스트, 에러 상태 (추정) | 공식 (count:3) |
| 미드 그레이 (Text) | Charcoal | `#555555` | 본문 텍스트, 부제목 | 공식 (count:2) |

---

### 컬러 사용 원칙

1. **블루 도미넌스(Blue Dominance)**: 전체 UI의 70% 이상을 블루 계열로 통일 — 기술 신뢰성·전문성 연상 (추정)
2. **앰버 골드 절제 사용**: `#FAAD17`은 CTA 강조·프로모션 등 전체 UI의 5% 이하로 제한 (추정)
3. **배경 중립화**: `#F6F6F6`, `#DDDDDD`로 콘텐츠 가독성 확보
4. **다크-라이트 대비**: `#003A70`(다크)과 `#D1EDFA`(라이트)를 헤더-섹션 교차 배치

---

### 컬러 그라디언트 패턴 (추정)

```css
/* 주요 헤더 그라디언트 */
background: linear-gradient(135deg, #003A70 0%, #0C82C4 50%, #5EC0ED 100%);

/* CTA 버튼 호버 그라디언트 */
background: linear-gradient(90deg, #1488C8 0%, #2294D6 100%);

/* 배너 배경 그라디언트 */
background: linear-gradient(180deg, #08528C 0%, #003A70 100%);
```

---

## 타이포그래피 시스템

### 폰트 패밀리 계층 (CSS 데이터 기반)

| 레벨 | 폰트 | 용도 | 출처 |
|------|------|------|------|
| 1순위 (Heading Display) | Montserrat | 대형 헤드라인, 히어로 제목 | 공식 |
| 2순위 (Body Primary) | Source Sans Pro | 본문, UI 라벨, 제품 설명 | 공식 |
| 3순위 (Body Fallback) | Roboto | 보조 본문, 태그, 캡션 | 공식 |
| 4순위 (UI System) | Arial / Helvetica Neue | 시스템 UI, 폼 요소 | 공식 |
| 코드/터미널 (Mono) | Consolas / Courier New / Menlo / Monaco | 기술 문서, 명령어, 코드 블록 | 공식 |
| 아이콘 폰트 | FontAwesome / Glyphicons Halflings | UI 아이콘 | 공식 |
| 슬라이더 | slick | 이미지 캐러셀 컴포넌트 | 공식 |

### 타이포그래피 스케일 (추정)

| 레벨 | 크기 | 폰트 | 굵기 | 용도 |
|------|------|------|------|------|
| H1 | 40~48px | Montserrat | 700 | 페이지 히어로 제목 |
| H2 | 28~32px | Montserrat | 600 | 섹션 제목 |
| H3 | 20~24px | Source Sans Pro | 600 | 카드 제목, 제품명 |
| Body Large | 16~18px | Source Sans Pro | 400 | 리드 문단 |
| Body | 14~16px | Source Sans Pro | 400 | 일반 본문 |
| Caption | 12px | Roboto | 400 | 각주, 이미지 캡션 |
| Code | 13px | Consolas | 400 | 기술 스펙, 명령어 |

---

## UI 컴포넌트 패턴 (추정)

### 버튼 스타일
- **Primary CTA**: `#0C82C4` 배경, 흰색 텍스트, 4px 라운드
- **Secondary**: `#003A70` 테두리, 투명 배경, `#003A70` 텍스트
- **Danger/Warning**: `#FAAD17` 배경 또는 테두리

### 카드 컴포넌트
- 배경: `#F6F6F6` 또는 흰색
- 보더: `1px solid #DDDDDD`
- 호버: `#D1EDFA` 배경 전환 + `#0C82C4` 상단 보더 강조

### 내비게이션
- 배경: `#003A70` (딥 네이비)
- 활성 메뉴: `#5EC0ED` 하이라이트
- 모바일 오프캔버스: CSS 변수 `var(--off-canvas-font-family)` 적용

### 데이터 테이블 (제품 스펙)
- 헤더 배경: `#003A70`, 흰색 텍스트
- 짝수 행: `#F6F6F6`
- 홀수 행: 흰색
- 보더: `#DDDDDD`

---

## 디자인 원칙

1. **데이터 우선(Data First)**: 스펙 수치와 비교표가 비주얼 계층 최상단
2. **밀도 최적화(Density Optimized)**: 기술 구매자는 정보 밀도가 높은 레이아웃 선호 (추정)
3. **신뢰 신호(Trust Signals)**: NVIDIA/Intel/AMD 파트너 로고를 일관되게 노출
4. **접근성(Accessibility)**: `#003A70`-흰색 조합은 WCAG AA 기준 충족 (추정)
5. **모바일 반응형**: CSS 변수 기반 반응형 타이포그래피 적용 (공식)
