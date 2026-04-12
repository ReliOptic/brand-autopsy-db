# 05. 디자인 시스템 — 페덱스 (FedEx)

## 컬러 팔레트

### 주요 컬러

| 역할 | 이름 | HEX | 사용 빈도 | 출처 |
|------|------|-----|-----------|------|
| Primary Brand Purple | FedEx Purple | `#4D148C` | 최다 (로고·헤더·CTA) | (공식) |
| Primary Brand Orange | FedEx Orange | `#FF6600` | 높음 (로고 서브·강조) | (공식) |
| Background White | Clean White | `#FFFFFF` | 높음 (기본 배경) | (공식) |
| Background Light | Light Gray | `#F5F5F5` | 중간 (섹션 구분) | (공식) |
| Text Primary | Deep Charcoal | `#333333` | 중간 (본문 텍스트) | (공식) |
| Text Secondary | Mid Gray | `#666666` | 중간 (보조 텍스트) | (공식) |
| Border/Divider | Silver | `#CCCCCC` | 낮음 (구분선) | (공식) |
| Surface Dark | Dark Navy | `#1A1A2E` | 낮음 (다크 섹션) | (추정) |

### 서비스 라인별 컬러 (브랜드 아키텍처)

| 서비스 브랜드 | 컬러 이름 | HEX | 출처 |
|--------------|-----------|-----|------|
| FedEx Express | Express Orange | `#FF6600` | (공식) |
| FedEx Ground | Ground Green | `#006400` | (공식) |
| FedEx Freight | Freight Red | `#CC0000` | (공식) |
| FedEx Office | Office Teal | `#00857D` | (공식) |
| FedEx Logistics | Logistics Blue | `#003DA5` | (추정 — 공식 서비스 페이지 관찰 기반) |
| FedEx Custom Critical | Custom Charcoal | `#424242` | (추정) |

### 보조 / 기능 컬러

| 역할 | 이름 | HEX | 출처 |
|------|------|-----|------|
| Success / Delivered | Confirm Green | `#28A745` | (추정) |
| Warning / Delay | Amber Alert | `#FFC107` | (추정) |
| Error / Exception | Alert Red | `#DC3545` | (추정) |
| Link / Interactive | Action Blue | `#0066CC` | (추정) |
| Highlight Accent | Light Purple | `#7B2D8B` | (추정 — 공식 사이트 그라디언트 기반) |

### 컬러 사용 원칙
- `#4D148C` (FedEx Purple)과 `#FF6600` (FedEx Orange)의 조합이 브랜드의 가장 핵심적인 시각 정체성이다. 이 두 색을 분리하지 않는다
- 서비스 라인별 컬러는 해당 서비스 전용으로만 사용하고 교차 사용하지 않는다 (브랜드 아키텍처 혼선 방지)
- 흰 배경 위에 Purple + Orange 조합이 기본 레이아웃 원칙
- 기능 컬러(성공·경고·오류)는 서비스 UI/UX에서만 사용, 마케팅 자료에 혼용 금지

---

## 타이포그래피

### 폰트 스택

| 우선순위 | 폰트명 | 용도 | 출처 |
|----------|--------|------|------|
| 1 | FedEx Sans (커스텀) | 로고 및 핵심 브랜드 헤드라인 | (공식) |
| 2 | Roboto | 영문 UI·웹 기본 본문 | (공식 — 웹 분석 기반) |
| 3 | Open Sans | 영문 보조 텍스트, 이메일 | (추정) |
| 4 | Arial / Helvetica | 시스템 폴백 | (공식) |
| 5 | Noto Sans KR | 한국어 본문 | (추정) |
| 6 | Noto Sans JP | 일본어 본문 | (추정) |
| — | Material Icons | UI 아이콘 시스템 | (추정) |

### 타이포그래피 위계 (추정 — 공식 디자인 관찰 기반)

| 레벨 | 스타일 | 용도 |
|------|--------|------|
| H1 | Roboto Bold, 48–64px, 자간 -0.5px | 캠페인 헤드라인, 히어로 섹션 |
| H2 | Roboto SemiBold, 32–48px | 섹션 제목, 서비스명 |
| H3 | Roboto Medium, 24–32px | 카드 제목, 서브 섹션 |
| Body | Roboto Regular, 16–18px, 행간 1.6 | 설명 텍스트, 기사 본문 |
| Caption | Open Sans Regular, 12–14px | 각주, 법적 고지, 보증 조건 |
| CTA | Roboto Bold, 14–16px, 대문자 | 버튼, 행동 유도 레이블 |

---

## 채널 규격

| 채널 | 포맷 | 해상도/크기 | 컬러 모드 | 비고 |
|------|------|------------|-----------|------|
| 웹 히어로 배너 | 와이드스크린 | 1920×1080px | sRGB | 흰 배경 + Purple/Orange 강조 |
| 소셜 정방형 | 1:1 | 1080×1080px | sRGB | 서비스 라인 컬러 상단 배너 |
| 소셜 스토리 | 9:16 | 1080×1920px | sRGB | FedEx 로고 상단 좌측 고정 |
| YouTube 썸네일 | 16:9 | 1280×720px | sRGB | 배송 차량/직원 이미지 + 수치 오버레이 |
| LinkedIn 배너 | 4:1 | 1584×396px | sRGB | 기업·채용 용도, Purple 배경 |
| 프린트 광고 | A4 세로 | 210×297mm | CMYK | Purple: C=66 M=88 Y=0 K=0 (추정) |
| 트럭/차량 래핑 | 가변 | 실제 차량 사이즈 | Pantone | Pantone 267C (Purple), 165C (Orange) (추정) |
| 이메일 헤더 | 고정폭 | 600px 고정 | sRGB | 배송 알림·마케팅 통일 템플릿 |
| 패키지 테이프/라벨 | 가변 | 실물 규격 | CMYK | Purple + White 단색 원칙 |

---

## 레이아웃 원칙

### 그리드 시스템 (추정 — 공식 웹사이트 관찰 기반)
- 12컬럼 그리드, 최대 너비 1280px, 거터 20px
- 히어로 섹션: 좌측 텍스트 + 우측 배송 이미지(차량·항공기·직원) 2분할 레이아웃
- 서비스 카드: 4컬럼 균등 분배, 상단 서비스 라인 컬러 띠 적용
- 여백 단위: 8px 베이스 그리드 (8, 16, 24, 32, 48, 64px)

### 시각 언어 원칙
- **움직임과 방향성**: 배송 차량, 항공기, 물류 흐름 이미지는 항상 화면 앞쪽을 향하도록 배치. FedEx 로고 화살표와 동일 방향성 유지
- **실제 현장 중심**: 스튜디오 제품 사진보다 실제 배달원·창고·글로벌 허브 현장 사진을 선호. 진정성 강조
- **수치의 시각화**: 배송 건수·국가 수·정시율은 반드시 인포그래픽·아이콘+숫자 조합으로 시각화
- **서비스 라인 색상 코딩**: 페이지 내에서 서비스별 컬러 띠로 직관적 구분 제공

---

## AI 이미지 생성 프롬프트 가이드 (추정)

### 배송 현장 비주얼 프롬프트 구조
```
photorealistic FedEx delivery truck/van, [urban / suburban / highway] environment,
FedEx Purple (#4D148C) and Orange (#FF6600) livery, motion blur suggesting speed,
bright daylight, professional commercial photography, --ar 16:9
```

### 글로벌 허브 비주얼 프롬프트 구조
```
hyperrealistic FedEx Memphis World Hub aerial view, dozens of aircraft and cargo,
pre-dawn blue hour lighting, orange runway lights, massive logistics operation scale,
cinematic wide angle, 8K resolution
```

### 배달원 / 인간 중심 프롬프트 구조
```
friendly FedEx courier in purple uniform delivering package, smiling interaction with customer,
warm suburban neighborhood, golden hour lighting, authentic candid photography style,
diverse cast, no text
```

---

## 디자인 금지사항

- `#4D148C` (FedEx Purple)과 `#FF6600` (FedEx Orange) 이외의 색을 로고와 함께 Primary로 사용하지 않는다
- 서비스 라인 컬러(Express Orange, Ground Green 등)를 무단 교차 사용하지 않는다 — 브랜드 아키텍처 혼선
- 로고 최소 여백 침해 금지: 로고 높이의 1/5 이상 여백 확보 (추정 — 공식 브랜드 가이드라인 기반)
- FedEx 로고 내 화살표가 보이지 않는 크기(너비 40px 미만)로 로고를 축소 사용 금지
- 경쟁사 로고(UPS·DHL)와 동일 프레임에 FedEx 로고 배치 금지 (비교 광고 특수 포맷 제외)
- 배송 실패·분실 이미지를 브랜드 자료에 사용하지 않는다 — 약속 이행 이미지만 허용
- 저품질 차량 사진(흠집·노후 차량) 사용 금지 — 모든 차량 이미지는 청결·최신 상태 원칙

---

### Steal Sheet — 마케터가 훔쳐갈 3가지

1. **"로고에 브랜드 가치를 숨겨라."** FedEx 로고의 E→x 사이 화살표는 '앞으로 나아감·속도·정확한 방향'을 상징하며, 한 번 발견한 사람은 절대 잊지 않는다. 이 숨겨진 의미가 수십 년간 무료 바이럴을 만들었다. → 마케터 적용: 자사 브랜드 아이덴티티에 의미의 레이어를 추가하라. 첫눈에 보이는 것과 두 번째 눈에 발견하는 것을 설계하면 브랜드 호기심이 생긴다.

2. **"서비스 라인별 컬러 코딩은 고객 인지 비용을 줄인다."** FedEx Express(오렌지), Ground(초록), Freight(빨강)는 차량만 봐도 어떤 서비스인지 즉시 식별된다. 설명 없이 컬러가 서비스를 구분한다. → 적용: 복수의 서비스·제품 라인을 보유한다면 일관된 컬러 코딩 시스템을 구축하라. 고객이 복잡한 포트폴리오를 한눈에 파악하면 교차 구매율이 높아진다.

3. **"실제 현장 이미지가 스튜디오 촬영보다 신뢰를 만든다."** FedEx의 배달원·창고·허브 실사 이미지는 "이 회사는 실제로 이 일을 한다"는 직접적 증거다. 브랜드 감성 영상보다 현장 다큐멘터리 스타일이 B2B 구매 신뢰에 더 강하게 작용한다. → 적용: 자사 서비스의 실제 운영 현장을 콘텐츠화하라. 사무실 뒤편의 물리적 실체를 보여주는 것이 가장 비용 효율적인 신뢰 구축이다.
