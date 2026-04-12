# 05 디자인 시스템 — Jabil (JBL)

> 분석 기준일: 2026-04-12 | 색상 데이터: css_data.json (공식) | 기타 항목: (추정)

---

## 1. 컬러 시스템

### 컬러 팔레트 전체 (공식 — css_data.json 기준)

| 역할 | 색상명 | HEX | 사용 빈도 | 용도 |
|------|--------|-----|-----------|------|
| Primary Dark | Jabil Navy | `#003865` | 126 (최다) | 주 브랜드 컬러, 헤더, 핵심 텍스트 |
| Primary Light | Jabil Sky | `#15BEF0` | 101 | CTA, 인터랙티브 요소, 하이라이트 |
| Secondary Green | Jabil Forest | `#57822B` | 83 | 지속가능성, ESG, 성공 지표 |
| Deep Navy | Jabil Deep | `#002B49` | 64 | 다크 배경, 푸터, 심층 섹션 |
| Accent Green | Jabil Lime | `#89C800` | 59 | 포인트 강조, 그래프 하이라이트 |
| Mid Blue | Jabil Ocean | `#0990CF` | 47 | 링크, 보조 인터랙티브 |
| Royal Blue | Jabil Royal | `#0164A1` | 47 | 버튼 보조, 섹션 구분 |
| Light Gray | Jabil Mist | `#F1F2F2` | 37 | 배경, 카드 배경 |
| Dark Gray | Jabil Slate | `#2D2C2E` | 19 | 본문 텍스트 |
| Mid Gray | Jabil Stone | `#60605B` | 19 | 보조 텍스트, 캡션 |
| Charcoal | Jabil Charcoal | `#414042` | 17 | 아이콘, UI 요소 |
| Alert Red | Jabil Alert | `#CB333B` | 15 | 경고, 오류 상태 |
| Warm Orange | Jabil Coral | `#FE5339` | 15 | 에너지, 긴박감 CTA (제한적 사용) |
| Bright Teal | Jabil Teal | `#3CB4E5` | 1 | 특수 강조 (희소 사용) |
| Bright Green | Jabil Vivid | `#7FBA00` | 3 | 데이터 시각화 전용 |
| Indigo Blue | Jabil Indigo | `#3E5C9A` | 2 | 소셜 미디어 아이콘 배경 |
| Warm Gray | Jabil Warm | `#77776F` | 1 | 구분선, 비활성 상태 |
| Social Blue | Jabil Twitter | `#55ACEE` | 1 | Twitter/X 브랜드 컬러 |
| Crimson | Jabil Crimson | `#CE272D` | 1 | 특수 경고 (비상 상태) |
| Border Gray | Jabil Border | `#DDDDDD` | 1 | 테두리, 구분선 |

---

### 컬러 사용 위계

```
1순위 (브랜드 앵커)
  ├── #003865 Jabil Navy      ← 아이덴티티의 핵심
  └── #15BEF0 Jabil Sky       ← 에너지·혁신 표현

2순위 (지지 컬러)
  ├── #57822B Jabil Forest    ← ESG·지속가능성
  ├── #002B49 Jabil Deep      ← 깊이·신뢰
  └── #89C800 Jabil Lime      ← 성장·가능성

3순위 (기능 컬러)
  ├── #0990CF Jabil Ocean     ← 링크·네비게이션
  ├── #0164A1 Jabil Royal     ← 보조 CTA
  └── #F1F2F2 Jabil Mist      ← 배경·여백

4순위 (중립 컬러)
  ├── #2D2C2E Jabil Slate     ← 본문 텍스트
  ├── #60605B Jabil Stone     ← 보조 텍스트
  └── #414042 Jabil Charcoal  ← 아이콘

5순위 (시스템 컬러)
  ├── #CB333B Jabil Alert     ← 오류·경고
  └── #FE5339 Jabil Coral     ← 긴박 CTA (제한 사용)
```

---

### 접근성 대비율 체크 (추정)

| 전경색 | 배경색 | 대비율 | WCAG 기준 |
|--------|--------|--------|-----------|
| `#003865` (텍스트) | `#FFFFFF` (흰 배경) | ~14.5:1 | AAA 통과 |
| `#FFFFFF` (텍스트) | `#003865` (네이비 배경) | ~14.5:1 | AAA 통과 |
| `#15BEF0` (링크) | `#FFFFFF` (흰 배경) | ~2.8:1 | AA 미달 — 단독 텍스트 사용 주의 |
| `#2D2C2E` (본문) | `#F1F2F2` (밝은 배경) | ~13.2:1 | AAA 통과 |
| `#89C800` (강조) | `#003865` (네이비 배경) | ~4.6:1 | AA 통과 |

---

## 2. 타이포그래피 시스템

### 사용 폰트 (공식 — css_data.json 기준)

| 폰트 | 역할 | 특성 |
|------|------|------|
| **Roboto** | 본문, UI 텍스트 | 가독성 최적화, 중립적 산세리프 |
| **Roboto Flex** | 가변 폰트, 헤딩 | Variable font — 무게·폭 유연 조정 가능 |
| **swiper-icons** | UI 아이콘 폰트 | 슬라이더·캐러셀 인터페이스 아이콘 전용 |

### 타이포그래피 스케일 (추정)

| 레벨 | 크기 | 폰트 | 무게 | 용도 |
|------|------|------|------|------|
| Display | 56px / 3.5rem | Roboto Flex | 700 | 히어로 헤드라인 |
| H1 | 40px / 2.5rem | Roboto Flex | 700 | 페이지 제목 |
| H2 | 32px / 2rem | Roboto Flex | 600 | 섹션 제목 |
| H3 | 24px / 1.5rem | Roboto Flex | 600 | 서브섹션 |
| H4 | 20px / 1.25rem | Roboto | 500 | 카드 제목 |
| Body Large | 18px / 1.125rem | Roboto | 400 | 리드 카피 |
| Body | 16px / 1rem | Roboto | 400 | 본문 |
| Body Small | 14px / 0.875rem | Roboto | 400 | 캡션, 주석 |
| Label | 12px / 0.75rem | Roboto | 500 | 레이블, 태그 |

---

## 3. 디자인 원칙 (추정)

### 3.1 격자 시스템
- 12컬럼 그리드 (데스크톱)
- 4컬럼 그리드 (모바일)
- 거터: 24px (데스크톱), 16px (모바일)
- 최대 컨테이너 폭: 1280px

### 3.2 공간 시스템 (8pt 기반)
```
4px   — 극소 간격 (아이콘-레이블)
8px   — 소 간격 (인라인 요소)
16px  — 기본 간격 (컴포넌트 내부)
24px  — 중 간격 (섹션 내 요소)
32px  — 대 간격 (카드 패딩)
48px  — 특대 간격 (섹션 구분)
64px  — 섹션 간격 (페이지 레이아웃)
96px  — 히어로 여백
```

### 3.3 이미지 방향성 (추정)
- **인물 사진**: 다양한 배경의 실제 엔지니어·전문가, 작업 현장 촬영
- **제품/시설**: 고해상도 산업 촬영, 청결하고 기술적인 환경 강조
- **인포그래픽**: 네이비+스카이블루 팔레트, 데이터 중심
- **금지 이미지**: 스톡 포토 느낌의 연출된 사무실 장면, 클리셰 악수 사진

### 3.4 아이콘 원칙 (추정)
- 라인 아이콘 기반 (Outline style)
- 획 두께: 1.5px~2px 균일
- 크기 단위: 16px, 24px, 32px, 48px
- 색상: 단색 (브랜드 컬러 적용)

---

## 4. UI 컴포넌트 원칙 (추정)

### 버튼 시스템

| 유형 | 배경 | 텍스트 | 테두리 | 용도 |
|------|------|--------|--------|------|
| Primary | `#003865` | `#FFFFFF` | 없음 | 주 CTA |
| Secondary | `#15BEF0` | `#FFFFFF` | 없음 | 보조 CTA |
| Outline | 투명 | `#003865` | `#003865` | 3차 액션 |
| Ghost | 투명 | `#0164A1` | 없음 | 텍스트 링크형 |

### 카드 시스템
- 배경: `#FFFFFF` 또는 `#F1F2F2`
- 테두리: `#DDDDDD` 1px 또는 그림자
- 모서리 반경: 4px~8px (추정)
- 호버 상태: 좌측 `#15BEF0` 3px 보더 강조

---

## 5. 브랜드 응용 금지 사항 (추정)

| 금지 행위 | 이유 |
|-----------|------|
| `#15BEF0`를 작은 텍스트에 단독 사용 | WCAG 대비율 미달 |
| `#FE5339` Coral을 주 CTA에 사용 | 브랜드 정체성 훼손 |
| Roboto 외 산세리프 혼용 | 타이포그래피 일관성 저해 |
| 네이비 배경에 Forest 그린 텍스트 | 가독성 저하 |
| 브랜드 컬러 투명도 변형 (opacity) 임의 사용 | 팔레트 희석 |
