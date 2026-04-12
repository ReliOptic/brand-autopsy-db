# 05. 디자인 시스템 — 엔비디아 (NVIDIA)

## 컬러 팔레트

### 주요 컬러 (CSS 분석 기반)

| 역할 | 이름 | HEX | 사용 빈도 | 출처 |
|------|------|-----|-----------|------|
| Primary Brand | NVIDIA Green | `#76B900` | 184회 (최다) | (공식) |
| Background Dark | Jet Black | `#1A1A1A` | 39회 | (공식) |
| Background Mid | Charcoal | `#222222` | 22회 | (공식) |
| Background Deep | Dark Slate | `#313131` | 20회 | (공식) |
| Surface Light | Pale Cyan | `#AACCCC` | 19회 | (공식) |
| Neutral Light | Near White | `#F7F7F7` | 4회 | (공식) |
| Border Light | Silver | `#DDDDDD` | 11회 | (공식) |
| Text Mid | Ash Gray | `#898989` | 8회 | (공식) |

### 보조 / 액센트 컬러

| 역할 | 이름 | HEX | 사용 빈도 | 출처 |
|------|------|-----|-----------|------|
| Green Variant 1 | Lime Shift | `#91C733` | 8회 | (공식) |
| Green Variant 2 | Deep Green | `#5E9400` | 4회 | (공식) |
| Green Variant 3 | Forest Green | `#549A00` | 4회 | (공식) |
| Accent Orange | Amber Alert | `#EF9100` | 4회 | (공식) |
| Accent Teal | Electric Teal | `#1DBBA4` | 4회 | (공식) |
| Warning Red | Signal Red | `#FF0000` | 1회 | (공식) |
| Error Soft | Coral Pink | `#FF8181` | 3회 | (공식) |
| Icon Mid | Steel Gray | `#616161` | 4회 | (공식) |
| Deep Black 1 | Obsidian | `#161616` | 7회 | (공식) |
| Deep Black 2 | Pitch | `#0C0C0C` | 7회 | (공식) |
| Deep Black 3 | Ink | `#111111` | 7회 | (공식) |

### 컬러 사용 원칙
- `#76B900` (NVIDIA Green)은 CTA 버튼, 로고, 핵심 강조 요소에 단독 사용
- 배경은 다크 계열 (`#1A1A1A`, `#222222`, `#313131`) 레이어로 깊이감 표현
- 라이트 배경 사용 시 `#F7F7F7` + `#76B900` 조합으로 브랜드 일관성 유지
- `#AACCCC`는 그래프·차트·보조 정보 레이어에 사용 (직접 브랜드 컬러와 충돌 방지)
- `#EF9100` (Amber)와 `#1DBBA4` (Teal)은 데이터 시각화·상태 표시 전용

---

## 타이포그래피

### 폰트 스택 (CSS 분석 기반)

| 우선순위 | 폰트명 | 용도 | 출처 |
|----------|--------|------|------|
| 1 | NVIDIA Sans | 모든 영문 UI·마케팅 텍스트 기본 | (공식) |
| 2 | NVIDIA (커스텀 패밀리) | 로고·헤드라인 특수 가중치 | (공식) |
| 3 | Heebo | 영문 보조 텍스트, 웹 폴백 | (공식) |
| 4 | Arial / Helvetica | 시스템 폴백 | (공식) |
| 5 | Source Han Sans KR | 한국어 본문 | (공식) |
| 6 | Source Han Sans JP | 일본어 본문 | (공식) |
| 7 | Source Han Sans SC/TC | 중국어 간체/번체 | (공식) |
| — | Font Awesome 6 Pro | 아이콘 시스템 | (공식) |

### 타이포그래피 위계 (추정 — 공식 디자인 관찰 기반)

| 레벨 | 스타일 | 용도 |
|------|--------|------|
| H1 | NVIDIA Sans Bold, 48–72px, 자간 -1px | 제품 이름, 키노트 타이틀 |
| H2 | NVIDIA Sans SemiBold, 32–48px | 섹션 제목, 기능명 |
| H3 | NVIDIA Sans Medium, 24–32px | 서브 섹션, 카드 타이틀 |
| Body | NVIDIA Sans Regular, 16–18px, 행간 1.6 | 설명 텍스트, 기사 본문 |
| Caption | Heebo Regular, 12–14px | 각주, 법적 고지, 출처 |
| CTA | NVIDIA Sans Bold, 14–16px, 대문자 | 버튼, 링크 레이블 |

---

## 채널 규격

| 채널 | 포맷 | 해상도/크기 | 컬러 모드 | 비고 |
|------|------|------------|-----------|------|
| 웹 히어로 배너 | 와이드스크린 | 1920×1080px | sRGB | Dark 배경 우선 |
| 소셜 정방형 | 1:1 | 1080×1080px | sRGB | #76B900 CTA 하단 배치 |
| 소셜 스토리 | 9:16 | 1080×1920px | sRGB | 로고 상단 좌측 고정 |
| YouTube 썸네일 | 16:9 | 1280×720px | sRGB | 제품 이미지 + 수치 오버레이 |
| LinkedIn 배너 | 4:1 | 1584×396px | sRGB | 기업/채용 용도 |
| 프린트 광고 | A4 세로 | 210×297mm | CMYK | Green: C=37 M=0 Y=100 K=0 (추정) |
| OOH 빌보드 | 16:9 확장 | 최소 3840×2160px | sRGB | 초고해상도 AI 렌더링 사용 |
| 이메일 헤더 | 고정폭 | 600px 고정 | sRGB | 다크/라이트 모드 대응 필수 |

---

## 레이아웃 원칙

### 그리드 시스템 (추정 — 공식 웹사이트 관찰 기반)
- 12컬럼 그리드, 최대 너비 1440px, 거터 24px
- 히어로 섹션: 풀블리드(full-bleed) 다크 배경 + 중앙 정렬 텍스트
- 카드 레이아웃: 3–4컬럼 균등 분배, 호버 시 `#76B900` 테두리 강조
- 여백 단위: 8px 베이스 그리드 (8, 16, 24, 32, 48, 64, 96px)

### 시각 언어 원칙
- **어둠에서 빛으로**: 다크 배경에서 그린 계열 라이트 이펙트로 드라마틱한 조명감 연출
- **기술적 정밀함**: 칩 회로 패턴, 와이어프레임 메쉬, 데이터 흐름 시각화를 장식 요소로 사용
- **압도적 스케일**: 제품 사진은 실제보다 크게, 배경 전체를 차지하도록 배치
- **수치의 시각화**: 성능 비교는 반드시 차트·그래프·인포그래픽으로 시각화

---

## AI 이미지 생성 프롬프트 가이드 (추정)

### 제품 비주얼 프롬프트 구조
```
photorealistic [NVIDIA 제품명] GPU chip, [dark studio / sci-fi environment] background,
dramatic [green neon / cyan light] rim lighting, ultra-detailed circuit board texture,
professional product photography, 8K resolution, --ar 16:9 --style raw
```

### 데이터센터 비주얼 프롬프트 구조
```
hyperrealistic NVIDIA AI data center, rows of [DGX H100] servers, 
[cool blue-green ambient lighting], steam/airflow visualization, 
cinematic wide angle, blade runner aesthetic, photorealistic render, 8K
```

### 키노트 슬라이드 배경 프롬프트 구조
```
abstract technology background, dark (#1A1A1A) base, flowing green (#76B900) 
light streams, neural network node visualization, ultra-minimal, 
no text, suitable for presentation slide background
```

---

## 디자인 금지사항

- `#76B900` 이외의 초록 계열 컬러를 Primary로 사용하지 않는다 (브랜드 희석)
- 흰 배경에 NVIDIA Green 로고 단독 배치 금지 — 다크 배경 또는 그린 배경 사용 원칙
- 로고 최소 여백 침해 금지: 로고 높이의 1/4 이상 여백 확보 (공식 가이드라인 추정)
- 폰트 혼용: NVIDIA Sans 계열 외 폰트를 헤드라인에 사용하지 않는다
- 원색 배경(빨강·파랑·노랑 등) 위에 로고 배치 금지
- 저해상도 제품 렌더링 사용 금지 — 모든 제품 이미지는 공식 에셋 라이브러리에서 사용
- 경쟁사 제품 이미지와 동일 프레임에 NVIDIA 제품 배치 금지 (비교 광고 특수 포맷 제외)

---

### Steal Sheet — 마케터가 훔쳐갈 3가지

1. **"다크 배경은 프리미엄의 언어다."** NVIDIA의 다크 테마는 애플과 동일한 심리적 효과를 낸다. 어두운 배경 위의 발광체(칩, 빛)는 고급스러움과 기술적 경외감을 동시에 전달한다. → 마케터 적용: 프리미엄 포지셔닝을 원한다면 비주얼부터 다크 테마로 전환하라. 제품 광고에서 배경색 하나로 가격 인식이 달라진다.

2. **"고유 폰트는 가장 저비용 고효율 브랜드 자산이다."** NVIDIA Sans는 전 세계 어디서 보더라도 "NVIDIA"라는 인식을 만든다. 이 폰트를 위해 별도 로고가 필요 없다. → 적용: 자체 폰트 개발이 어렵다면 특정 폰트-컬러 조합을 브랜드 전용으로 고정하고 일관되게 사용하라. 반복이 곧 자산이다.

3. **"성능 수치를 인포그래픽으로 바꾸면 공유된다."** "30x faster"라는 텍스트보다 막대그래프 하나가 더 많이 공유된다. NVIDIA는 모든 성능 비교를 시각화한다. → 적용: 자사 핵심 수치를 단순한 비교 차트로 만들어 브랜드 컬러로 패키징하라. 이것 하나만으로 인스타그램·LinkedIn 적합 콘텐츠가 완성된다.
