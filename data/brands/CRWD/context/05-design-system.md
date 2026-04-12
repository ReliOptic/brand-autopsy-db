# 05. 디자인 시스템 해부 — CrowdStrike (CRWD)

## 디자인 철학

CrowdStrike의 비주얼 언어는 **"군사적 정밀함 + 기술적 권위"**를 시각화한다. 레드(위협)와 다크(심층 방어)의 대비가 브랜드 긴장감을 만들고, 커스텀 폰트 시스템이 플랫폼 전문성을 각인한다. UI/마케팅 에셋 모두에서 데이터 시각화와 아이콘 시스템이 제품 신뢰도를 보강한다.

---

## 컬러 시스템

### Primary 컬러 (공식 — CSS 추출)

| 역할 | 색상명 | HEX | 사용 빈도 | 용도 |
|------|--------|-----|---------|------|
| Brand Red | CrowdStrike Red | `#EC0000` | 12회 (CSS 최다 등장) | 로고, CTA 버튼, 강조 요소, 위협 레벨 표시 |
| Accent Blue | Electric Blue | `#0024FF` | 9회 | 링크, 보조 CTA, 데이터 시각화 포인트 컬러 |

### Secondary 컬러 (공식 — CSS 추출)

| 역할 | 색상명 | HEX | 사용 빈도 | 용도 |
|------|--------|-----|---------|------|
| Mid Gray | Steel Gray | `#949494` | 2회 | 본문 보조 텍스트, 구분선, 비활성 UI |
| Dark Gray | Graphite | `#707070` | 1회 | 아이콘, 캡션, 테이블 헤더 보조 |

### Extended 컬러 팔레트 (추정 — 브랜드 가이드라인 기반)

| 역할 | 색상명 | HEX | 용도 |
|------|--------|-----|------|
| Background Dark | Midnight Black | `#0A0A0A` | 다크 모드 배경, 히어로 섹션 |
| Background Navy | Deep Navy | `#0D1B2A` | 다크 배경 대안, 대시보드 UI |
| Text Primary | Off White | `#F5F5F5` | 다크 배경 위 기본 텍스트 |
| Success / Safe | Cyber Green | `#00C853` | 보호 상태 표시, 성공 알림 |
| Warning | Amber Alert | `#FF8F00` | 중간 위협 레벨, 경고 알림 |
| Critical | Deep Red | `#B71C1C` | 최고 위협 레벨, 크리티컬 알림 |

### 컬러 사용 원칙
- `#EC0000` Red는 항상 행동 유도(CTA) 또는 위협 강조에만 사용. 배경 대면적 사용 금지.
- `#0024FF` Blue는 정보성 요소(링크, 데이터)에 한정. Red와 동시 병치 시 가독성 점검 필수.
- 다크 배경 위에서 Red + White 조합이 브랜드의 가장 강력한 시각 모멘트.

---

## 타이포그래피 시스템

### Primary Typeface (공식 — CSS 추출)

**CrowdStrike SharpSans** — 전용 커스텀 폰트 패밀리

| 웨이트 | 폰트명 | 용도 |
|--------|--------|------|
| ExtraBold | CrowdStrikeSharpSans-ExBd | 히어로 헤드라인, 캠페인 카피 |
| Bold | CrowdStrikeSharpSans-Bold | 섹션 타이틀, UI 버튼 레이블 |
| SemiBold | CrowdStrikeSharpSans-SmBd | 서브헤딩, 카드 제목 |
| Medium | CrowdStrikeSharpSans-Mdm | 보조 헤딩, 네비게이션 |
| Book | CrowdStrikeSharpSans-Book | 본문 텍스트, 설명 카피 |
| Light | CrowdStrikeSharpSans-Lgt | 캡션, 법적 고지 |
| Thin | CrowdStrikeSharpSans-Thin | 대형 디스플레이 숫자, 배경 텍스트 |

각 웨이트에 이탤릭(Itl) 버전 병행 제공. 이탤릭은 인용문·위협 명칭 강조에 사용.

### Secondary Typeface (공식 — CSS 추출)

**Neue Haas Grotesk Display Pro** — 세리프리스 그로테스크, 유럽 기술 권위감

| 웨이트 | 폰트명 | 용도 |
|--------|--------|------|
| Black | NeueHaasDisplayPro-Black | 대형 통계 숫자, 인포그래픽 |
| Bold | NeueHaasDisplayPro-Bold | 보고서 헤딩 |
| Medium | NeueHaasDisplayPro-Medium | 보고서 본문, 기술 문서 |
| Roman | NeueHaasDisplayPro-Roman | 캡션, 각주 |
| Light | NeueHaasDisplayPro-Light | 디스플레이 보조 |

**HaasGrotDisp** 패밀리도 CSS에서 확인됨 — Neue Haas의 레거시 명칭 버전으로 동일 계열.

### Accent Typeface (공식 — CSS 추출)

**Tungsten Rounded** — 압축형 산세리프, 임팩트용

| 웨이트 | 폰트명 | 용도 |
|--------|--------|------|
| Bold | TungstenRnd-Bold | 이벤트 배너, 긴급 알림, 카운트다운 |
| SemiBold | TungstenRnd-SemiBold | 배지, 태그, 레이블 |
| Medium | TungstenRnd-Medium | 보조 강조 |

**Fatman Light** — CSS에서 1회 등장. 특수 디스플레이 상황에 한정 사용(추정).

### 타이포그래피 위계

```
Hero Headline     — SharpSans ExBold, 64–96px, 다크 배경 위 White 또는 Red
Section Title     — SharpSans Bold, 36–48px
Subheading        — SharpSans SemiBold, 24–30px
Body Copy         — SharpSans Book, 16–18px, line-height 1.6
Data/Stats        — NeueHaas Black, 72–120px (숫자), Red 또는 White
Caption/Legal     — SharpSans Light, 12–14px, Gray (#949494)
Alert/Badge       — TungstenRnd Bold, 14–18px, 대문자
```

---

## 레이아웃 & 그리드 시스템

**기본 원칙 (추정)**
- 12컬럼 그리드, 최대 너비 1440px
- 섹션 간 여백: 80–120px (데스크탑), 40–60px (모바일)
- 다크 배경 히어로 섹션 + 라이트 콘텐츠 섹션 교차 구조
- 카드 기반 모듈러 레이아웃 — 제품 모듈(Falcon 라인업)을 카드 단위로 조합

**시각적 모티프**
- 가는 선(Hairline) 기반 기술 격자 패턴 (배경 텍스처)
- 적색 강조선(Red Line/Bar) — 섹션 구분, 인용문 강조
- 데이터 시각화: 실시간 위협 지도, 바 차트, 타임라인
- 아이콘 스타일: 라인 아이콘 (아웃라인), Red 또는 White 컬러

---

## UI 컴포넌트 패턴 (추정)

| 컴포넌트 | 스펙 |
|---------|------|
| Primary CTA 버튼 | 배경 `#EC0000`, 텍스트 White, SharpSans Bold, 패딩 16px 32px, 보더 없음 |
| Secondary CTA 버튼 | 배경 Transparent, 보더 `#EC0000`, 텍스트 `#EC0000`, 호버 시 배경 `#EC0000` |
| 경고 배지 | 배경 `#EC0000`, TungstenRnd Bold 대문자, White 텍스트 |
| 네비게이션 | 다크 배경, White 텍스트, 드롭다운 메뉴 |
| 데이터 카드 | 다크 배경, 상단 Red 강조선, NeueHaas Black 숫자, 라이트 레이블 |

---

## 사진 & 비주얼 가이드 (추정)

- **이미지 톤**: 다크/모노크롬 기조, 사이버 공간·서버실·데이터센터 이미지
- **인물 사진**: 보안 전문가·SOC 분석가 실제 업무 환경 (가상 시나리오 비선호)
- **인포그래픽**: 공격 타임라인, 글로벌 위협 지도, MITRE ATT&CK 매핑 시각화
- **금지 이미지**: 후드 착용 해커 클리셰 이미지 (업계 신뢰도 저하)

---

### Steal Sheet — 3가지

1. **"커스텀 폰트는 브랜드 해자다."** CrowdStrike SharpSans는 경쟁사가 복제할 수 없는 시각적 아이덴티티다. 브랜드가 성숙하면 커스텀 타이포그래피에 투자하라 — 폰트 하나가 모든 마케팅 에셋을 통일하고, 위조 콘텐츠와의 시각적 구분점이 된다.

2. **"위협 레벨을 컬러로 코딩하라."** `#EC0000` Red는 CTA이자 위협 신호다. 브랜드 컬러가 제품 UX의 의미론과 일치할 때, 고객은 컬러만으로 행동 신호를 읽는다. 브랜드 컬러를 장식이 아닌 의미 시스템으로 설계하라.

3. **"다크 모드는 보안 브랜드의 기본값이다."** 사이버보안 제품의 UI는 대부분 다크 모드가 기본이다 — 사용자(SOC 분석가)가 24시간 화면을 보기 때문이다. 다크 배경 위 Red + White 조합을 마스터하면, 제품 UI와 마케팅 에셋이 시각적으로 일관되어 브랜드 경험이 통합된다.
