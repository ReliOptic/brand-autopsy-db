# 05. 디자인 시스템 — Meta Platforms

## 디자인 철학

Meta의 디자인 시스템은 "연결을 가속하는 투명한 인터페이스"를 지향한다. UI가 전면에 나서지 않고 콘텐츠와 사람을 연결하는 배경으로 기능하도록 설계되어 있다. 2021년 리브랜딩 이후 메타버스·무한(infinity) 개념을 시각 언어에 통합했다. 각 앱(Facebook·Instagram·WhatsApp·Threads)은 독립 디자인 시스템을 운영하되, Meta 코퍼레이트 레이어와 일관된 토큰 체계를 공유한다.

---

## 컬러 시스템

### Meta 코퍼레이트 (리브랜딩 2021 이후)

| 컬러명 | HEX | 용도 | 출처 |
|--------|-----|------|------|
| Meta Blue | `#0082FB` | 메인 브랜드 컬러, CTA 버튼 | (공식) Meta Brand Guidelines |
| Meta Gradient Start | `#0082FB` | 인피니티 로고 그라디언트 시작 | (공식) |
| Meta Gradient End | `#A335FE` | 인피니티 로고 그라디언트 끝 | (공식) |
| Meta Gradient Mid | `#FF5CA1` | 그라디언트 중간점 | (추정) |
| Pure White | `#FFFFFF` | 배경, 여백 | (공식) |
| Dark Charcoal | `#1C1E21` | 다크모드 배경, 텍스트 | (공식) |
| Surface Gray | `#F0F2F5` | Facebook 라이트모드 배경 | (공식) |

### Facebook

| 컬러명 | HEX | 용도 | 출처 |
|--------|-----|------|------|
| Facebook Blue | `#1877F2` | 메인 브랜드, 로그인 버튼 | (공식) Facebook Brand Resource Center |
| Facebook Dark Blue | `#166FE5` | 호버 상태 | (공식) |
| Like Blue | `#1877F2` | 좋아요 아이콘 | (공식) |
| Messenger Gradient Blue | `#00B2FF` | Messenger 브랜드 | (공식) |
| Messenger Gradient Purple | `#7B68EE` | Messenger 그라디언트 | (추정) |

### Instagram

| 컬러명 | HEX | 용도 | 출처 |
|--------|-----|------|------|
| Instagram Yellow | `#FCAF45` | 로고 그라디언트 | (공식) Instagram Brand Guidelines |
| Instagram Orange | `#FD1D1D` | 로고 그라디언트 중간 | (공식) |
| Instagram Pink | `#E1306C` | 로고 그라디언트 | (공식) |
| Instagram Purple | `#833AB4` | 로고 그라디언트 | (공식) |
| Instagram Dark Purple | `#5851DB` | 로고 그라디언트 시작 | (공식) |
| Instagram Deep Blue | `#405DE6` | 로고 그라디언트 끝 | (공식) |
| IG Surface | `#FAFAFA` | 피드 배경 | (공식) |
| IG Text Primary | `#262626` | 본문 텍스트 | (공식) |
| IG Text Secondary | `#8E8E8E` | 보조 텍스트, 시간 표시 | (공식) |

### WhatsApp

| 컬러명 | HEX | 용도 | 출처 |
|--------|-----|------|------|
| WhatsApp Green | `#25D366` | 메인 브랜드, 로고 | (공식) WhatsApp Brand Guidelines |
| WhatsApp Dark Green | `#128C7E` | 헤더, 네비게이션 바 | (공식) |
| WhatsApp Teal | `#075E54` | 다크 헤더 | (공식) |
| Chat Bubble Sent | `#DCF8C6` | 보낸 메시지 말풍선 | (공식) |
| Chat Bubble Received | `#FFFFFF` | 받은 메시지 말풍선 | (공식) |
| WA Background | `#ECE5DD` | 채팅 배경 | (공식) |

### Threads

| 컬러명 | HEX | 용도 | 출처 |
|--------|-----|------|------|
| Threads Black | `#101010` | 메인 브랜드, 로고 | (공식) Threads Brand Kit |
| Threads White | `#FFFFFF` | 라이트모드 배경 | (공식) |
| Threads Surface Dark | `#181818` | 다크모드 카드 배경 | (추정) |
| Threads Gray | `#999999` | 보조 텍스트, 아이콘 | (추정) |

### Meta Quest / Reality Labs

| 컬러명 | HEX | 용도 | 출처 |
|--------|-----|------|------|
| Quest Black | `#14141F` | 메인 배경, 하드웨어 색상 | (공식) Meta Quest Brand |
| Quest White | `#F5F5F5` | 라이트 UI 요소 | (추정) |
| Quest Accent Blue | `#0064E0` | CTA, 강조 요소 | (추정) |
| Horizon Purple | `#8B5CF6` | Horizon Worlds 브랜드 | (추정) |

---

## 타이포그래피

### Meta 코퍼레이트

| 용도 | 폰트 | 굵기 | 크기 범위 | 출처 |
|------|------|------|----------|------|
| 헤드라인 | Optimistic Display | Bold / Heavy | 32px-96px | (공식) Meta 자체 개발 서체 |
| 본문 | Optimistic Text | Regular / Medium | 14px-18px | (공식) |
| UI 레이블 | Optimistic Text | Medium / SemiBold | 12px-14px | (공식) |
| 코드 / 개발자 | Roboto Mono | Regular | 13px-14px | (추정) |

> Meta는 2021년 리브랜딩과 함께 자체 개발 서체 "Optimistic"을 공개했다. 인피니티 루프와 연결감을 서체 형태에 반영한 것이 특징이다.

### Instagram

| 용도 | 폰트 | 출처 |
|------|------|------|
| 영문 UI | Instagram Sans | (공식) 자체 개발 |
| 다국어 폴백 | SF Pro (iOS), Roboto (Android) | (공식) 플랫폼 시스템 폰트 |

---

## 로고 사용 원칙

| 원칙 | 내용 |
|------|------|
| 여백 (Clear Space) | 로고 높이의 최소 50% | (공식) |
| 최소 크기 | 디지털 16px / 인쇄 5mm | (공식) |
| 금지 변형 | 회전, 왜곡, 컬러 단색 외 변경, 그림자 추가 | (공식) |
| 배경 | White 또는 Black 배경 우선 | (공식) |
| 그라디언트 로고 | 인피니티 심볼에만 그라디언트 적용 허용 | (공식) |

---

## 디자인 원칙 (Design Principles)

1. **Focused** — 불필요한 요소 제거, 핵심 행동에 집중
2. **Responsive** — 모든 화면 크기, 접근성 기준 준수
3. **Consistent** — 앱 간 디자인 토큰 공유
4. **Human** — 기계적 느낌이 아닌 인간적 온기
5. **Open** — 개방형 플랫폼 철학 반영 (추정)

---

## Steal Sheet — 디자인 시스템

| # | 레이어 | 훔칠 요소 | 적용 방법 |
|---|--------|----------|----------|
| 1 | 컬러 시스템 | 앱별 독립 브랜드 컬러 + 모 브랜드 그라디언트 통합 구조 | 멀티 프로덕트 기업에서 서브 브랜드 컬러 독립성 유지하면서 코퍼레이트 레이어로 묶는 아키텍처 |
| 2 | 타이포그래피 | 자체 개발 서체로 브랜드 고유성 획득 (Optimistic, Instagram Sans) | 스케일 있는 브랜드라면 커스텀 서체 투자로 장기 차별화 |
| 3 | 다크모드 | 앱별 최적화된 다크 팔레트 (Threads 네이티브 다크) | 다크모드를 애프터소트가 아닌 디자인 퍼스트로 접근 |
