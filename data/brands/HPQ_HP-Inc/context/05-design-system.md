# 05. 디자인 시스템 — HP Inc. (HPQ)

## 디자인 철학

HP의 디자인 언어는 **"Human. Simple. Bold."** 를 핵심 원칙으로 삼는다(추정).
CSS 데이터 분석 결과, 깊은 네이비·슬레이트 다크 계열을 베이스로,
HP 블루를 강조색으로 사용하는 절제된 프리미엄 팔레트를 구사한다.

---

## 컬러 팔레트 (CSS 실측 기반)

### 1차 컬러 (Primary Colors)

| 역할 | 색상명 | HEX | 사용 빈도 | 출처 |
|------|-------|-----|----------|------|
| 주 CTA / 링크 | HP Blue | `#165DBA` | 27회 | (공식) CSS 실측 |
| 베이스 다크 | Dark Navy | `#2C3038` | 27회 | (공식) CSS 실측 |
| 라이트 블루 BG | Sky Tint | `#CCDEF5` | 26회 | (공식) CSS 실측 |
| 딥 블루 | Deep Blue | `#114A94` | 14회 | (공식) CSS 실측 |
| 브라이트 블루 | Action Blue | `#187EE6` | 6회 | (공식) CSS 실측 |

### 2차 컬러 (Secondary Colors)

| 역할 | 색상명 | HEX | 사용 빈도 | 출처 |
|------|-------|-----|----------|------|
| 프리미엄 퍼플 | Royal Purple | `#7D3894` | 9회 | (공식) CSS 실측 |
| 인디고 | Indigo | `#4B4096` | 6회 | (공식) CSS 실측 |
| 골드 | Gold Accent | `#DEBC33` | 6회 | (공식) CSS 실측 |
| 옐로우 | Warm Yellow | `#FFD24D` | 6회 | (공식) CSS 실측 |
| 딥 다크 | Charcoal | `#212237` | 3회 | (공식) CSS 실측 |

### 뉴트럴 컬러 (Neutral Colors)

| 역할 | 색상명 | HEX | 사용 빈도 | 출처 |
|------|-------|-----|----------|------|
| 본문 텍스트 | Text Gray | `#5A5A5A` | 22회 | (공식) CSS 실측 |
| 서브 텍스트 | Medium Gray | `#626262` | 1회 | (공식) CSS 실측 |
| 라이트 그레이 BG | Light Gray | `#E6E6E6` | 2회 | (공식) CSS 실측 |
| 구분선 / 보더 | Border Gray | `#C7C7C7` | 8회 | (공식) CSS 실측 |
| 크림 웜 BG | Warm Cream | `#F2EBDC` | 2회 | (공식) CSS 실측 |
| UI 그레이 | UI Gray | `#E8E8E8` | 10회 | (공식) CSS 실측 |
| 다크 텍스트 | Near Black | `#323131` | 2회 | (공식) CSS 실측 |
| 슬레이트 | Slate | `#56585A` | 1회 | (공식) CSS 실측 |
| 미드 그레이 | Mid Gray | `#767676` | 1회 | (공식) CSS 실측 |
| 다크 차콜 | Dark Charcoal | `#2A2C2E` | 6회 | (공식) CSS 실측 |

---

## 컬러 사용 원칙

```
다크 모드 베이스:    #2C3038 (배경) + #165DBA (CTA) + #CCDEF5 (강조 BG)
라이트 모드 베이스:  #FFFFFF (배경) + #165DBA (CTA) + #5A5A5A (텍스트)
경고/강조:          #FFD24D 또는 #DEBC33 (주의, 프로모션 배지)
프리미엄 라인:      #7D3894 (Spectre 퍼플) + #114A94 (딥 블루)
```

---

## 타이포그래피 시스템

### 폰트 패밀리 (CSS 실측)

| 폰트명 | 역할 | 출처 |
|-------|------|------|
| HPSimplifiedRegular | HP 공식 본문체 | (공식) |
| HPSimplifiedLight | HP 공식 라이트/헤딩 | (공식) |
| forma-djr-micro | 마케팅 디스플레이 폰트 | (공식) |
| Roboto | UI 폴백 / 서브 텍스트 | (공식) |
| Noto Sans | 다국어 지원 폴백 | (공식) |
| Arial / Helvetica Neue | 시스템 폴백 | (공식) |
| Consolas / Courier New | 코드·기술문서 | (공식) |

### 폰트 스택 (추정 적용)

```css
/* 헤딩 */
font-family: 'HPSimplifiedLight', 'forma-djr-micro', 'Helvetica Neue', Arial, sans-serif;

/* 본문 */
font-family: 'HPSimplifiedRegular', Roboto, 'Noto Sans', Arial, sans-serif;

/* 코드/기술 */
font-family: Consolas, 'Courier New', 'Liberation Mono', Menlo, Monaco, monospace;
```

---

## 아이콘 시스템

CSS 실측 결과 다음 아이콘 폰트가 확인됨:

| 아이콘 폰트 | 용도 | 출처 |
|-----------|------|------|
| HPIcons | HP 공식 아이콘 세트 | (공식) |
| aemHPIcons | AEM CMS 연계 아이콘 | (공식) |
| newhpicon | 신규 아이콘 세트 | (공식) |
| header_icons | 네비게이션 헤더 아이콘 | (공식) |
| currencyIcons | 통화·가격 아이콘 | (공식) |
| swiper-icons | 슬라이더 UI 아이콘 | (공식) |

---

## 레이아웃 원칙 (추정)

| 원칙 | 적용 방식 |
|------|---------|
| 12컬럼 그리드 | 반응형 브레이크포인트 기반 |
| 여백 중심 | 콘텐츠 밀도 낮추고 시각적 숨공간 확보 |
| 카드 UI | 제품·카테고리 탐색의 기본 단위 |
| 풀블리드 히어로 | 랜딩·캠페인 페이지 몰입감 강화 |
| 다크/라이트 섹션 교차 | 스크롤 경험에서 리듬감 생성 |

---

## 디자인 금지 패턴

1. **무채색 단독 CTA**: 파란색 또는 대비 높은 버튼 사용 필수
2. **폰트 3종 이상 혼용**: HP Simplified + 1개 폴백으로 제한
3. **채도 높은 보색 조합**: HP Blue + 레드 등 충돌 색상 금지
4. **소형 텍스트에 `#767676` 이하 명도**: WCAG AA 접근성 기준 위반

---

## 디자인 시스템 적용 체크리스트

- [ ] 헤딩에 HPSimplifiedLight 적용
- [ ] CTA 버튼 색상 `#165DBA` 또는 `#114A94`
- [ ] 텍스트 색상 `#5A5A5A` (라이트 BG) / `#E6E6E6` (다크 BG)
- [ ] 강조 배경 `#CCDEF5` (라이트 블루 섹션)
- [ ] 다크 섹션 배경 `#2C3038`
- [ ] 아이콘: HPIcons 우선 사용
- [ ] 접근성: 명도 대비 4.5:1 이상 확보
