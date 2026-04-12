# 05. 디자인 시스템 명세 — Datadog (DDOG)

Datadog의 디자인 시스템은 '아름다움'보다 '정보 밀도와 신뢰감'을 우선한다. 복잡한 데이터를 명확하게 시각화하는 것이 디자인의 최고 목표다. 엔지니어가 새벽 3시 장애 대응 시 화면을 보는 사람이라는 전제 하에, 모든 UI 결정은 '인지 부하 최소화'를 기준으로 내려진다.

## 컬러 팔레트

CSS 추출 데이터 기반으로 분석한 Datadog 실제 사용 컬러 체계.

| 용도 | 색상명 | HEX | 출처 | 사용처 |
|------|--------|-----|------|--------|
| Primary Brand | **Datadog Purple** | `#632CA6` | (공식) | 로고, 기본 브랜드 컬러, 헤더, 핵심 UI 요소 |
| Primary Accent | **Bright Purple** | `#8000FF` | (공식) | CTA 버튼, 하이라이트, 인터랙티브 요소 |
| Primary Light | **Medium Purple** | `#9C43FE` | (공식) | 버튼 hover 상태, 보조 액션 |
| Deep Purple | **Dark Purple** | `#4300B0` | (공식) | 섹션 배경, 다크 모드 요소 |
| Gradient Start | **Violet** | `#6300D4` | (공식) | 그라디언트 시작점, 프리미엄 배지 |
| Gradient Mid | **Indigo** | `#6A00FF` | (공식) | 그라디언트 중간값 |
| Secondary Blue | **Electric Blue** | `#0060FF` | (공식) | 링크, 보조 CTA, 정보성 강조 |
| Accent Cyan | **Sky Cyan** | `#00CAFF` | (공식) | 성공 상태, 데이터 시각화 보조 컬러 |
| Accent Teal | **Datadog Teal** | `#00BBED` | (공식) | 그래프 라인, 메트릭 시각화 |
| Success | **Green** | `#00B765` | (공식) | 정상 상태, 성공 알림, 헬스 체크 통과 |
| Warning/Alert | **Hot Pink** | `#FF0080` | (공식) | 경고 알림, 이상 감지 |
| Error/Critical | **Orange Red** | `#FF5E00` | (공식) | 크리티컬 알림, 임계값 초과 |
| Light Lavender | **Soft Lavender** | `#EFE0FF` | (공식) | 카드 배경, 섹션 구분, 부드러운 강조 |
| Mid Lavender | **Periwinkle** | `#BEAAFF` | (공식) | 차트 배경, 그라디언트 보조 |
| Rose Pink | **Light Rose** | `#FFC8F9` | (공식) | 이벤트 마커, 특별 강조 |
| Text/Code | **Dark Red** | `#A31515` | (공식) | 코드 에디터 문자열 색상 (VS Code 계열) |
| Purple Mid | **Mauve** | `#B37BFF` | (공식) | 시각화 팔레트 확장 컬러 |
| Background Dark | **Near Black** | `#110617` | (공식) | 다크 모드 배경, 터미널 UI |
| Neutral | **Light Gray** | `#C7C7C7` | (공식) | 비활성 상태, 구분선 |

### 컬러 사용 원칙
- **퍼플 주도권**: `#632CA6` → `#8000FF` 계열이 브랜드 인식의 핵심. 경쟁사(Dynatrace 다크그린, New Relic 블루)와 명확히 차별화.
- **시맨틱 컬러 엄수**: Green=정상, Orange/Red=위험, Blue=정보. 이 규칙을 마케팅 크리에이티브에서도 동일하게 적용. '빨간 배경에 세일' 금지.
- **그라디언트 방향**: 항상 Purple → Cyan 방향의 Cool 계열 그라디언트. Warm 계열(붉은→노란) 그라디언트는 경고 UI 전용.
- **다크 모드 지원**: `#110617` 기반 다크 배경은 개발자 커뮤니티 필수 지원 항목. 밝은 배경보다 다크 배경에서 데이터 시각화가 더 선명.

## 타이포그래피

| 용도 | 폰트 | Weight | 사이즈 규칙 |
|------|------|--------|-------------|
| 헤드라인 (영문) | **NationalWeb** | Bold / Black | 마케팅 36~72px, 앱 내 24~36px |
| 본문 (영문) | **Noto Sans Variable** | Regular / Medium | 14~18px |
| UI 레이블 | **Noto Sans Variable** | Medium | 12~14px |
| 코드 / 터미널 | **RobotoMono** / **Consolas** | Regular | 13~14px. 모노스페이스 필수. |
| 코드 (Mac 환경) | **Menlo** / **Monaco** / **SFMono-Regular** | Regular | 13px |
| 코드 (범용 fallback) | **Courier New** / **Liberation Mono** | Regular | 13px |
| 일본어 지원 | **Noto Sans JP** | Regular / Bold | 언어별 최적화 |
| 아이콘 | **iconfont** | — | UI 아이콘 전용 폰트 |

### 타이포그래피 원칙
- **NationalWeb이 브랜드 타이포의 핵심**: 헤드라인에서 Datadog 특유의 자신감 있는 인상을 만든다. 대체 불가 시 Helvetica Neue/Arial 사용.
- **코드 가독성 최우선**: 코드 블록은 반드시 모노스페이스. 가독성을 위해 줄간격 1.6 이상.
- **한국어 처리**: Noto Sans JP 대신 Noto Sans KR 또는 Noto Sans Variable로 처리. 한글 Bold는 800~900 weight.
- **계층 명확성**: H1:H2:H3 = 3:2:1.5 비율 유지. 정보 계층이 명확해야 대시보드처럼 빠르게 스캔 가능.

## 채널별 규격

| 채널 | 사이즈 (px) | 안전영역 마진 | 비고 |
|------|------------|--------------|------|
| 웹 히어로 배너 | 1440×800 | 좌우 120px / 상하 80px | Purple 그라디언트 배경 + 대시보드 스크린샷 필수 |
| LinkedIn 단일 이미지 | 1200×627 | 전체 60px | 데이터 시각화 스크린샷 or 인포그래픽 |
| LinkedIn 캐러셀 | 1080×1080 | 전체 80px | 리포트 데이터, 5~10장 |
| X (Twitter) 이미지 | 1600×900 | 우하단 150px | 코드 스니펫 시각화, 기술 밈 |
| YouTube 썸네일 | 1280×720 | 우하단 150px | "DEMO:", "HOW TO:" 접두사 + 기술 스크린샷 |
| 이메일 헤더 | 600×200 | — | Purple 배경 + NationalWeb 헤드라인 |
| DASH 컨퍼런스 슬라이드 | 1920×1080 | 상하좌우 80px | 다크 배경(#110617), 그래프·데모 화면 중심 |
| 옥외/행사 배너 | 상황별 | — | 로고 + 단일 슬로건 + QR 코드 |

## 레이아웃 원칙

- **데이터 시각화 우선**: 어떤 레이아웃이든 실제 Datadog 대시보드 스크린샷이 1순위 시각 요소. "말하지 말고 보여줘라(Show, don't tell)"가 레이아웃 철학.
- **정보 밀도**: 일반 SaaS 마케팅보다 텍스트·데이터 밀도가 높다. 독자가 엔지니어이므로 '긴 글'을 읽는다. 단, 스캔 가능한 헤더 계층 필수.
- **여백은 기능적**: 과도한 여백보다 적절한 정보 밀도. 단, 코드 블록 주변 여백은 충분히 확보해 가독성 보장.
- **그리드**: 12컬럼 기반. 대시보드 스크린샷은 8~12컬럼 전체 차지. 부가 정보는 4컬럼 사이드바.
- **CTA 버튼**: 항상 Purple(`#8000FF`) 실선 배경. Ghost 버튼은 보조 액션만. 버튼 텍스트는 동사 시작("Start free trial", "Download report").
- **다크/라이트 혼용**: 마케팅 페이지는 라이트 배경, 제품 데모·터미널 화면은 다크 배경. 한 페이지 내 혼용 허용.

## 아이콘 & 일러스트 스타일

- **스타일**: 플랫 벡터 + 아이소메트릭(isometric) 3D 인포그래픽 혼용. 캐릭터 마스코트(Bits 강아지)는 공식 이벤트/DASH에서만 등장.
- **아이콘**: iconfont 기반 단색 라인 아이콘. 굵기 1.5~2px. 컬러는 브랜드 퍼플 또는 중립 그레이.
- **인프라 다이어그램**: 화살표+박스 기반 아키텍처 다이어그램. 색상은 시맨틱 컬러 체계 동일 적용.
- **데이터 시각화**: 꺾은선 그래프·히트맵·서비스 맵. 컬러는 Green(정상)→Yellow(주의)→Orange(경고)→Red(위험) 그라디언트.
- **Bits (마스코트 강아지)**: Datadog의 공식 마스코트. DASH 컨퍼런스·굿즈·소셜 이벤트 한정 등장. 일상 마케팅 콘텐츠에는 사용 자제.

## AI 이미지 생성 프롬프트 가이드

```
스타일: isometric flat vector, technical infographic, clean data visualization
배경: #110617 (dark) or #FFFFFF (light), no gradient backgrounds
주요 컬러: #632CA6 purple dominant, #00CAFF cyan accent, #00B765 green success
금지: photorealism, cartoon characters, warm colors as primary, hand-drawn style
선호: dashboard UI mockup, code terminal screenshot, infrastructure diagram, metric graphs
```

## 디자인 금지사항

- **비시맨틱 컬러 사용** — Green을 프로모션 배경으로, Red를 세일 표시로 쓰는 행위. 시맨틱 컬러 체계 위반은 개발자 독자의 인지 혼란 유발.
- **실제 고객 데이터 스크린샷 무단 사용** — 대시보드 스크린샷에 실제 고객 메트릭 데이터 노출 금지. 반드시 목업 또는 동의받은 데이터 사용.
- **세리프 폰트** — NationalWeb의 Sans Serif 계열과 충돌. 어떤 채널에서도 세리프 폰트 사용 금지.
- **저해상도 코드 스크린샷** — 코드 블록·터미널 화면은 2x Retina 해상도 이상만 사용. 흐린 코드 이미지는 기술 신뢰도 훼손.
- **경쟁사 UI 모방** — Dynatrace 다크그린 계열 또는 New Relic 블루 계열 그라디언트 사용 금지. 퍼플 정체성 유지.
- **로고 변형** — Bits 마스코트 포즈·색상 임의 변경 금지. 공식 브랜드 에셋 라이브러리 사용.
- **한 화면에 그래프 10개 이상** — 정보 과부하. 장애 대응 대시보드가 아닌 마케팅 자료에서는 최대 4~6개 그래프로 제한.
- **텍스트 없는 이미지 광고** — 기술 B2B에서 이미지만으로 메시지 전달 불가. 반드시 헤드라인 + 서브카피 포함.
