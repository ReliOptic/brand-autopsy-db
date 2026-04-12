# 05. 디자인 시스템 해부 — Salesforce (CRM)

## 컬러 팔레트

### 브랜드 코어 컬러

| 역할 | 색상명 | HEX | 출처 | 용도 |
|------|--------|-----|------|------|
| Primary Brand Blue | Salesforce Blue | `#0176D3` | 공식 | CTA 버튼, 링크, 핵심 UI 액션 요소 |
| Brand Dark Blue | Dark Blue | `#032D60` | 공식 | 헤더, 히어로 섹션 배경, 네이비 강조 |
| Brand Deep Navy | Deep Navy | `#001639` | 공식 | 푸터, 다크 배경, 고급감 영역 |
| Brand Mid Blue | Medium Blue | `#014486` | 공식 | 섹션 배경, 카드 테두리, 보조 강조 |
| Brand Cobalt | Cobalt Blue | `#0B5CAB` | 공식 | 아이콘, 인포그래픽 강조색 |

### 확장 컬러 (CSS 추출 기반)

| 역할 | 색상명 | HEX | 출처 | 용도 |
|------|--------|-----|------|------|
| Brand Light Blue | Sky Blue | `#1B96FF` | 공식 | 호버 상태, 라이트 테마 강조 |
| Agentforce Purple 1 | Royal Purple | `#321D71` | 공식 | Agentforce 브랜드 서브 컬러 |
| Agentforce Purple 2 | Violet | `#3A49DA` | 공식 | AI 제품 그라디언트 시작색 |
| Agentforce Purple 3 | Medium Purple | `#7F56D9` | 공식 | AI 그라디언트 중간색 |
| Agentforce Purple 4 | Bright Purple | `#9333EA` | 공식 | Agentforce 아이콘, 배지 |
| Agentforce Accent | Magenta | `#D946EF` | 공식 | AI 기능 하이라이트, 그라디언트 끝색 |
| Agentforce Cyan | Electric Cyan | `#00D4FF` | 공식 | Agentforce 글로우 효과, 데이터 시각화 |
| Success Green 1 | Emerald | `#2E844A` | 공식 | 성공 상태, 포지티브 지표 |
| Success Green 2 | Forest | `#22683E` | 공식 | 성공 상태 다크 변형 |
| Success Green 3 | Deep Green | `#194E31` | 공식 | 성공 배경 다크 테마 |
| Success Light BG | Mint BG | `#EBF7E6` | 공식 | 성공 알림 배경 |
| Brand Background | Ice Blue | `#EAF5FE` | 공식 | 섹션 배경, 카드 라이트 배경 |
| Text Primary | Off Black | `#181818` | 공식 | 본문 텍스트 |
| Text Secondary | Charcoal | `#2E2E2E` | 공식 | 보조 텍스트, 캡션 |
| Warm Dark | Espresso | `#281202` | 공식 | 특수 강조 배경 (추정) |

### Agentforce 그라디언트 (추정)
```
background: linear-gradient(135deg, #321D71 0%, #3A49DA 25%, #7F56D9 50%, #9333EA 75%, #D946EF 100%);
```
AI·자율 에이전트 관련 제품 마케팅 전반에 사용되는 보라-마젠타 스펙트럼 그라디언트.

---

## 타이포그래피

### 폰트 패밀리

| 역할 | 폰트 | 출처 | 비고 |
|------|------|------|------|
| 브랜드 전용 폰트 | Salesforce Sans | 공식 | Salesforce 독자 개발 서체, 공식 문서·마케팅 자료 전용 |
| 시스템 UI (웹 앱) | `-apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial` | 공식 (CSS 추출) | Lightning Design System(SLDS) 기본 폰트 스택 |
| 한국어 폰트 | `Apple SD Gothic Neo` (macOS), `Malgun Gothic` (Windows) | 추정 | 시스템 폰트 폴백 체인 |
| 이모지 지원 | `Apple Color Emoji`, `Segoe UI Emoji`, `Segoe UI Symbol` | 공식 (CSS 추출) | 크로스 플랫폼 이모지 렌더링 |

### 타입 스케일 (추정 — Lightning Design System 기반)

| 레벨 | 크기 | 폰트 두께 | 용도 |
|------|------|-----------|------|
| Display | 48–64px | 700 (Bold) | 히어로 헤드라인 |
| H1 | 32–40px | 700 | 페이지 제목 |
| H2 | 24–28px | 600 | 섹션 제목 |
| H3 | 18–22px | 600 | 카드 제목, 서브섹션 |
| Body Large | 16–18px | 400 | 리드 문단 |
| Body | 14–16px | 400 | 일반 본문 |
| Caption | 12px | 400 | 라벨, 메타 정보 |

---

## 채널별 규격

### 디지털 광고

| 채널 | 포맷 | 권장 규격 | 핵심 원칙 |
|------|------|-----------|-----------|
| Google Display | 배너 | 728×90, 300×250, 160×600 | 로고 + CTA + 핵심 메시지 1개만 |
| LinkedIn 스폰서드 콘텐츠 | 이미지 광고 | 1200×628px | 고객 성과 수치 + Trailblazer 이미지 |
| LinkedIn 비디오 광고 | 영상 | 1920×1080, 15–30초 | 처음 3초에 고통점 또는 수치 |
| YouTube 프리롤 | 영상 | 1920×1080, 6초(범퍼)/15–30초(스킵 가능) | 6초 안에 브랜드 로고 + 핵심 주장 |
| Twitter/X 이미지 | 피드 카드 | 1600×900px | 간결한 데이터 포인트, 해시태그 1–2개 |

### 소셜 미디어

| 채널 | 포맷 | 규격 | 톤 특이사항 |
|------|------|------|------------|
| LinkedIn 피드 | 정사각형 이미지 | 1080×1080px | 비즈니스·리더십 톤, 데이터 인용 |
| LinkedIn 스토리 | 세로형 | 1080×1920px | 이벤트·채용·팁 위주 |
| Twitter/X | 이미지+텍스트 | 1600×900px | 간결·직접적, 280자 안에 핵심 |
| Instagram | 정사각형/릴스 | 1080×1080px / 1080×1920px | 시각적 케이스 스터디, 직원 문화 |
| YouTube | 썸네일 | 1280×720px | 고대비 텍스트, 얼굴 + 텍스트 조합 |

### 이벤트 / Dreamforce

| 자산 | 규격 | 용도 |
|------|------|------|
| 메인 스테이지 배경 | 3840×1080px (듀얼 스크린) | Dreamforce 키노트 |
| 세션 슬라이드 | 1920×1080px (16:9) | 세션 발표 |
| 이름 배지 | 95×140mm | 참가자 배지 |
| 배너 스탠디 | 800×2000mm | 부스 사이니지 |
| 소셜 공유 카드 | 1200×628px | 이벤트 참가 인증 |

---

## 레이아웃 원칙

### 그리드 시스템 (추정 — Lightning Design System 기반)
- **기본 그리드**: 12컬럼, 거터 24px, 최대 너비 1280px
- **모바일 브레이크포인트**: 320px / 768px / 1024px / 1280px
- **카드 시스템**: 8px 베이스 그리드, 16px/24px/32px 여백 계층
- **아이콘 그리드**: 16px / 24px / 32px / 48px / 64px 고정 규격

### 히어로 섹션 공식
```
[다크 블루 배경 #032D60 또는 #001639]
  ↕ 120px 상단 패딩
  [세리프 없는 Bold 헤드라인 — 48–64px — 흰색]
  [서브 헤드라인 — 20px — 옅은 파랑 #1B96FF 또는 흰색 80% 투명도]
  [Primary CTA 버튼 — #0176D3 배경 — 흰색 텍스트 — 44px 높이]
  [Secondary CTA — 아웃라인 흰색 버튼]
  ↕ 80px 하단 패딩
```

### 콘텐츠 섹션 공식
- 교차 배경: `#FFFFFF` ↔ `#EAF5FE` (Ice Blue) 로 리듬 생성
- 아이콘+텍스트 3열 그리드: 기능/혜택 설명에 반복 사용
- 수치 강조: 대형 숫자(64px Bold #0176D3) + 작은 설명 텍스트 조합

---

## AI 이미지 생성 프롬프트

### Salesforce 브랜드 에셋용 프롬프트 템플릿

**히어로 이미지 (B2B 제품)**
```
Professional B2B enterprise software hero image, diverse business team collaborating on data dashboards, 
clean modern office environment, Salesforce blue color scheme (#0176D3, #032D60, #EAF5FE), 
data visualization floating UI elements, photorealistic, high contrast, --ar 16:9
```

**Agentforce AI 제품 이미지**
```
Futuristic AI agent visualization, glowing purple-magenta gradient orb (#321D71 to #D946EF), 
abstract neural network connections, dark navy background (#001639), electric cyan (#00D4FF) 
highlight accents, professional enterprise tech aesthetic, no text, --ar 16:9
```

**Trailblazer 커뮤니티 이미지**
```
Diverse group of professionals at a tech conference, celebrating achievement, 
Salesforce blue (#0176D3) branded environment, authentic candid moment, 
warm lighting, community and collaboration theme, photorealistic, --ar 3:2
```

**고객 성공 케이스 썸네일**
```
Confident business executive portrait, professional office background, 
soft blue tone overlay (#EAF5FE), data chart or growth graph in background, 
corporate but approachable, --ar 4:3
```

---

## 디자인 금지사항

### 컬러 관련
- `#0176D3` (Salesforce Blue)를 소셜 플랫폼 고유색(Twitter 파랑 `#1DA1F2`, LinkedIn 파랑 `#0A66C2`)과 혼용 금지 — 브랜드 혼동 초래
- Agentforce 그라디언트(보라-마젠타)를 기존 Salesforce 파랑 계열과 동일 레이아웃 내 병치 금지 — 브랜드 컬러 충돌
- `#EAF5FE` 배경 위에 `#1B96FF` 텍스트 사용 금지 — 명도 대비 WCAG AA 미달

### 타이포 관련
- Salesforce Sans를 대체로 Times New Roman, Georgia 등 세리프 폰트 사용 금지
- 본문 텍스트 9pt 이하 사용 금지 — 접근성 위반
- 영문 모두 대문자(ALL CAPS) 본문 사용 금지 — 가독성 저하, 공격적 톤

### 로고 관련
- Salesforce 로고 색상 변경 금지 (공식 컬러 이외 적용 불가)
- 로고 주변 클리어 스페이스: 로고 높이의 50% 이상 유지 필수
- 경쟁사 로고와 동일 화면에 직접 배치 금지 (배틀카드 등 내부 자료 제외)

---

### Steal Sheet — 3가지

1. **단일 제품색에서 제품 라인별 색으로 확장하는 전략을 배워라.** Salesforce는 오랫동안 파랑 하나의 브랜드였다. Agentforce 출시 이후 보라-마젠타 스펙트럼을 AI 제품 전용 색으로 도입했다. 이것은 무분별한 확장이 아니라 "AI는 새로운 카테고리"라는 메시지를 컬러로 전달하는 시각적 포지셔닝이다. 새 제품 라인 출시 시 기존 팔레트와 충분히 구분되는 컬러 시스템을 부여하면, 마케팅 없이도 "이것은 다른 것이다"를 전달할 수 있다.

2. **디자인 시스템 자체를 제품으로 공개하라.** Salesforce의 Lightning Design System(SLDS)은 오픈소스로 공개되어 있다. 수천 명의 개발자가 이 시스템을 사용해 AppExchange 앱을 만들고, 그 앱들은 Salesforce 생태계를 확장한다. 디자인 시스템을 내부 가이드라인으로만 쓰지 말고 외부 개발자 커뮤니티에 공개하면, 브랜드 일관성과 생태계 확장을 동시에 얻을 수 있다.

3. **8px 그리드는 철학이다.** Lightning Design System의 8px 베이스 그리드는 단순한 레이아웃 규칙이 아니라 "일관성이 신뢰를 만든다"는 Salesforce 브랜드 철학의 시각적 표현이다. 고급 B2B 브랜드일수록 여백과 그리드에 더 엄격해야 한다. 픽셀 하나의 일관성이 "이 회사는 디테일을 관리할 수 있다"는 무의식적 신호를 CIO에게 전달한다.
