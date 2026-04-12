# 05. 디자인 시스템 명세 — Best Buy Co., Inc. (BBY)

> Best Buy는 자체 디자인 시스템을 공개 운영하지 않으나, bestbuy.com CSS 데이터 분석 + 공식 브랜드 자산 + 추정 기반으로 구성.

## 컬러 팔레트

### 핵심 브랜드 컬러 (CSS 데이터 기반)

| 용도 | 색상명 | HEX | 빈도 | 사용처 |
|------|--------|-----|------|--------|
| **Primary Brand** | **BBY Navy** | **#101F61** | 높음 (3회) | 헤더·내비게이션 배경·주요 브랜드 영역 (공식, CSS 데이터) |
| **Primary CTA / Link** | **BBY Blue** | **#4171FC** | 중간 (1회) | 주요 CTA 버튼·클릭 가능 링크 (공식, CSS 데이터) |
| **Interactive Blue** | Mid Blue | #2B4CB6 | 중간 (1회) | 버튼 호버·보조 인터랙티브 요소 (공식, CSS 데이터) |
| **Accent Blue** | Sky Blue | #4976E6 | 중간 (1회) | 강조 배지·하이라이트 요소 (공식, CSS 데이터) |
| **Light Blue BG** | Pale Blue | #A6E4FF | 낮음 (2회) | 프로모션 배너 배경·알림 배경 (공식, CSS 데이터) |
| **Light Blue Alt** | Ice Blue | #7FD8FF | 낮음 (1회) | 세일 배지·라이트 강조 배경 (공식, CSS 데이터) |
| **Brand Yellow** | **BBY Yellow** | **#FFF200** | 낮음 (1회) | Best Buy 로고 태그·가격 강조·세일 배지 액센트 (공식, CSS 데이터) |

### 확장 컬러 시스템 (추정, bestbuy.com 실측 기반)

| 색상명 | HEX | 사용처 |
|--------|-----|--------|
| Pure White | #FFFFFF | 카드 배경·콘텐츠 영역 기본 배경 |
| Light Gray BG | #F5F5F5 | 페이지 섹션 배경·비활성 탭 |
| Border Gray | #DDDDDD | 카드 테두리·구분선 |
| Body Text Dark | #1A1A1A | 주요 본문 텍스트·헤드라인 |
| Secondary Text | #555555 | 보조 설명 텍스트·캡션 |
| Success Green | #1A7B3A | 재고 있음·확인 상태·긍정 알림 (추정) |
| Warning/Sale Red | #C00000 | 세일 가격·마감 임박 배지·오류 상태 (추정) |
| Geek Squad Black | #000000 | Geek Squad 로고·블랙 테마 서비스 영역 (공식, Geek Squad 브랜드) |

### 컬러 원칙 (공식 패턴 + 추정)
- **BBY Navy(#101F61)는 브랜드 앵커 컬러** — 헤더·푸터·공식 브랜드 영역에 독점 사용. 일반 콘텐츠 배경에 남색 계열 금지.
- **BBY Yellow(#FFF200)는 가격·세일 강조 전용** — 로고 태그 컬러에서 파생. 딜·프라이스 배지·CTA 보조 강조에만 사용. 배경 전면 도배 금지.
- **BBY Blue(#4171FC)는 CTA 전용** — 인터랙티브 요소에 집중. 장식용 블루 사용 금지로 사용자의 클릭 포인트를 명확히 함.
- **흰색 배경이 기본** — 제품 이미지가 주인공. 배경은 최대한 물러남. 컬러 배경은 프로모션 섹션에만.
- **Geek Squad는 독립 컬러 체계** — 블랙·옐로우·화이트의 대비 체계. 본 브랜드의 네이비·블루와 구분. (공식, Geek Squad 브랜드 아이덴티티)

## 타이포그래피

| 용도 | 폰트 | Weight | 사이즈 규칙 |
|------|------|--------|-------------|
| **디스플레이 헤드 (히어로·프로모션)** | **Human BBY Web** | Bold (700) | 웹: 40~72px; 모바일: 28~48px |
| **헤드라인 H1** | Human BBY Web | Semibold (600) | 웹: 28~40px; 모바일: 22~32px |
| **헤드라인 H2** | Human BBY Web | Regular (400) | 웹: 22~28px; 모바일: 18~24px |
| **본문 Body** | **Arial / Roboto** | Regular (400) | 웹: 16px; 모바일: 15px, 행간 1.5 |
| **가격·숫자 강조** | Human BBY Web | Bold (700) | 헤드라인보다 +4~8px; 세일가 빨간색 강조 |
| **캡션·법적 고지** | Arial | Regular (400) | 12~13px; #555555 |
| **버튼·라벨** | Human BBY Web / Arial | Medium~Semibold (500~600) | 14~16px |
| **Geek Squad 전용** | Arial Black / Human BBY Web Bold | Black (900) / Bold (700) | 브랜드 블록 전용 |

### 폰트 시스템 특이사항 (공식, CSS 데이터)
- **Human BBY Web**: Best Buy 자체 제작 브랜드 폰트 (CSS 데이터 확인, 공식). 친근하고 읽기 쉬운 기하학적 산세리프. 온기와 전문성의 균형.
- **Arial**: 폴백(Fallback) 및 보조 폰트. 시스템 폰트 안정성 확보.
- **Roboto**: Google Material 계열. 소형 텍스트·인터페이스 라벨 보조.
- 세리프 폰트 사용 금지 — 전체 브랜드에서 일관된 현대적·친근한 이미지 유지.

## 채널별 규격

| 채널 | 사이즈 | 안전 영역 | 비고 |
|------|--------|----------|------|
| **bestbuy.com 히어로 배너** | 1440px 기준 (반응형) | 좌우 160px (콘텐츠 영역) | 딜 가격·제품명·CTA 3요소 필수 |
| **이메일 헤더 배너** | 600px 고정폭 | 좌우 20px | BBY Navy 배경 + Yellow 로고 + 흰색 텍스트 |
| **제품 카드** | 220×280px (목록뷰 기준) | 상하좌우 12px | 제품 이미지·가격·별점·"Add to Cart" 버튼 |
| **세일 배지** | 40~60px 직경 | - | BBY Yellow(#FFF200) 배경·Navy 텍스트 또는 Red 배경·White 텍스트 |
| **Instagram 피드** | 1080×1080 (정방형) / 1080×1350 (세로) | 상하좌우 60px | 제품·라이프스타일 이미지 혼합 |
| **YouTube 썸네일** | 1280×720 | 상하좌우 40px | 제품 이미지 + 가격 또는 타이틀 텍스트 (5단어 이내) |
| **TV 광고 (30초)** | 1920×1080 (HD) / 3840×2160 (4K) | 하단 80px (자막 영역) | 마지막 3초 BBY 로고 + bestbuy.com 주소 |
| **전단 광고 (인쇄)** | 타블로이드 (11×17인치) | 상하 0.5인치, 좌우 0.5인치 | 연휴 세일 시즌 주요 포맷 |
| **OG 이미지 (공유)** | 1200×630 | 좌우 60px | BBY Navy 배경 + 제품 이미지 + 로고 |

## 레이아웃 원칙

### 1. 가격 계층 명확화 (Price Hierarchy)
정가·할인가·멤버십가·카드 추가 할인이 공존할 때, 시각적 계층을 명확히 한다. 가장 큰 텍스트 = 최종 결제가. 취소선 = 정가. 컬러 배지 = 세일 표시. 고객이 "내가 얼마를 내는가"를 1초 내에 파악해야 한다(추정, 베스트 프랙티스 기반).

### 2. 제품 이미지가 주인공 (Product Hero)
모든 카테고리 페이지·제품 카드에서 제품 이미지가 최소 50% 화면 면적을 차지한다. 텍스트·가격 정보는 이미지 아래 또는 오버레이. 이미지를 가리는 텍스트 레이어 최소화.

### 3. 비교 구조 (Comparison Grid)
Best Buy의 핵심 레이아웃 패턴은 나란히 비교(Side-by-side). TV·노트북·스마트폰 모두 "모델 A vs. 모델 B" 비교 테이블이 표준 레이아웃. 고객의 의사결정을 돕는 콘텐츠 구조가 레이아웃이다.

### 4. 서비스 레이어 통합 (Service Layer)
제품 구매 흐름 안에 Geek Squad 서비스·보증 선택·배송 옵션이 자연스럽게 통합된다. 별도 서비스 페이지로 분기하지 않고 구매 흐름 중간에 삽입. "이 제품을 사면 어떻게 받고 어떻게 쓸 수 있는가"가 한 페이지에서 해결된다(공식, bestbuy.com 제품 페이지 구조).

### 5. 모바일 퍼스트 (Mobile First)
bestbuy.com 방문의 60%+ 가 모바일 기기로 추정(추정). 모든 레이아웃은 390px 너비(iPhone 기준)에서 먼저 설계. 데스크톱은 확장 버전.

## AI 이미지 생성 프롬프트 가이드

```
스타일 키워드: Best Buy retail, consumer electronics, clean product photography,
               lifestyle tech, bright and approachable, mid-market premium
톤: Friendly, accessible, value-conscious but not cheap-looking,
    warm yet professional, everyday American household setting
컬러 제약: background #FFFFFF or #F5F5F5,
           accent #101F61 for brand bars,
           #FFF200 for price/deal badges only,
           #4171FC for CTA buttons
타이포 처리: Human BBY Web style (geometric sans-serif),
             bold for price/headlines, regular for body
금지 요소: luxe/aspirational minimalism (too Apple),
           dark moody photography, harsh shadows,
           overly tech-abstract visuals, stock photo clichés
           (forced smiles, pointless handshakes)
선호 요소: real families and individuals using tech at home,
           living rooms / home offices / kitchens as settings,
           products shown in context (not floating on white),
           blue-shirt employees in natural helpful poses,
           before/after room transformations with new tech
인물 처리: diverse age groups (teens to seniors),
           middle-class American settings,
           candid expressions, real-looking interactions
해상도: minimum 2000×2000 for product shots, 1920×1080 minimum for digital
```

## 디자인 금지사항

### 절대 금지 (공식 패턴 + 추정)
- **BBY Yellow(#FFF200)를 배경 전면에 사용** — 로고 태그·가격 배지에만. 노란 배경 전체 페이지 금지.
- **Navy(#101F61)와 Yellow(#FFF200)의 무분별한 혼용** — 로고 블록 외에서의 Navy+Yellow 조합은 브랜드 아이덴티티 희석.
- **Geek Squad 블랙 체계를 본 브랜드 영역에 혼입** — 서비스 브랜드와 리테일 브랜드의 시각 분리 필수.
- **세리프 폰트 사용** — 전 브랜드 커뮤니케이션에서 산세리프 전용.
- **Human BBY Web 폰트 왜곡·변형** — stretch, skew 적용 금지.

### 강력 권고 금지 (추정, 브랜드 일관성 기반)
- 가격을 작게 숨기는 레이아웃 (Best Buy의 핵심 가치가 가격 투명성)
- 3개 이상 CTA 버튼을 동일 화면에 동시 배치 (의사결정 과부하)
- 제품 이미지 없는 텍스트 전용 제품 카드
- 배지 남발 (세일·인기·신제품·추천 배지가 동시에 5개 이상인 카드)
- 네이비와 파란 계열의 유사 색상 혼용 (색상 체계 혼란)

## Best Buy 디자인을 한 줄로
> **"파란 브랜드 바, 노란 가격 배지, 흰 배경, Human BBY Web 폰트. 이 네 가지가 Best Buy다."**

## Steal Sheet

1. **"가격 계층 시각화를 브랜드 자산으로"** — Best Buy는 정가·할인가·멤버십가가 하나의 카드에 공존하면서도 혼란스럽지 않게 계층화한다. 가장 큰 숫자 = 내가 내는 돈. 이 명확함이 신뢰다. 한국 이커머스가 훔칠 구조: 쿠폰·카드 할인·포인트가 겹치는 최종가를 히어로 숫자로 배치. "어차피 이렇게 되는 가격"을 앞에 놓으면 전환율이 올라간다.

2. **"브랜드 내 브랜드의 독립 시각 체계"** — Geek Squad는 Best Buy와 완전히 다른 블랙·옐로우·화이트 시각 체계를 쓴다. 이 시각적 분리가 서비스 부문에 독립적 권위와 신뢰를 부여한다. 한국 기업이 훔칠 구조: B2C 본 브랜드와 전문 서비스 부문을 별도 시각 체계로 운영. "삼성전자서비스"보다 독자 브랜드 네임+시각 체계를 가진 서비스 브랜드가 더 강한 신뢰를 만든다.

3. **"비교 레이아웃이 의사결정을 대신한다"** — Best Buy의 비교 테이블은 고객이 스스로 결론을 내리도록 돕는 레이아웃이다. 직원 추천보다 비교 테이블이 더 설득력 있다. 한국 B2C SaaS·가전·금융상품이 훔칠 구조: 경쟁사와의 기능 비교표를 랜딩 페이지에 직접 배치. 고객이 비교하지 않으면 경쟁사에서 비교하고 온다. 내 페이지에서 비교가 끝나야 전환이 일어난다.
