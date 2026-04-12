# 03 경쟁 환경 — Synopsys (SNPS)

## 경쟁 구도 개요

Synopsys는 EDA 시장에서 Cadence와 함께 과점 구조를 형성하며 (추정) 시장 점유율 약 30~35%를 보유한다. 소프트웨어 보안 영역에서는 Veracode, Checkmarx 등 전문 업체와 경쟁한다. (추정)

---

## 주요 경쟁사 분석

### 경쟁사 1: Cadence Design Systems (CDNS)

| 항목 | 내용 |
|------|------|
| 티커 | CDNS (NASDAQ) (공식) |
| 핵심 강점 | Virtuoso 아날로그 설계 툴, Spectre 시뮬레이터, AI 기반 Cerebrus 옵티마이저 (공식) |
| 핵심 약점 | 소프트웨어 보안 포트폴리오 부재, EDA 집중도 높아 다각화 부족 (추정) |
| 포지셔닝 | "Intelligent System Design" — 시스템 레벨 통합 설계 강조 (공식) |
| 주요 고객 | 인텔, AMD, Nvidia, 삼성 (추정) |

### 경쟁사 2: Siemens EDA (구 Mentor Graphics)

| 항목 | 내용 |
|------|------|
| 모회사 | Siemens AG (공식) |
| 핵심 강점 | PCB 설계(Xpedition), 자동차 전장 솔루션 특화, Siemens 산업 생태계 연동 (공식) |
| 핵심 약점 | 반도체 IP 포트폴리오 부재, 독립 EDA 벤더 대비 의사결정 속도 느림 (추정) |
| 포지셔닝 | 산업 자동화·디지털 트윈과 결합한 통합 EDA (추정) |
| 주요 고객 | 자동차, 항공, 방산 OEM (추정) |

### 경쟁사 3: Ansys (ANSS)

| 항목 | 내용 |
|------|------|
| 티커 | ANSS (NASDAQ) (공식) |
| 핵심 강점 | 물리 시뮬레이션(FEA, CFD), 멀티피직스 해석, 반도체 열/전자기 신뢰성 검증 (공식) |
| 핵심 약점 | 순수 EDA 툴체인 부재, 반도체 IP 없음 (추정) |
| 포지셔닝 | 시뮬레이션 기반 엔지니어링 전반 (공식) |
| 겹치는 영역 | 반도체 신뢰성 검증, SI/PI 분석 (추정) |

---

## 배틀카드 (Battle Cards)

### 배틀카드 1: Synopsys vs. Cadence — EDA 플랫폼 경쟁

**우리의 강점 포인트**
- Synopsys Fusion Design Platform은 RTL부터 GDSII까지 단일 플로우를 제공하여 툴 전환 비용이 없다. (공식)
- DesignWare IP 포트폴리오 5,000개 이상 — Cadence는 자체 IP 수가 현저히 적다. (추정)
- AI 기반 DSO.ai 옵티마이저는 PPA 목표 달성률을 경쟁 제품 대비 20% 이상 개선한다. (추정)

**상대방이 공격할 포인트 & 대응**
- "Cadence Virtuoso가 아날로그에서 더 강하다" → Synopsys Custom Compiler는 동급 정밀도를 제공하며, 혼합 신호(AMS) 설계에서 단일 플로우 이점이 크다.
- "Cadence AI 툴도 있다" → DSO.ai는 2019년부터 production 레퍼런스를 보유하며, 검증된 고객 케이스 수에서 앞선다.

**승리 시나리오**
디지털 설계 중심의 대형 팹리스, 단일 플로우 EDA 표준화를 원하는 고객, IP 재사용율을 높이려는 팀.

---

### 배틀카드 2: Synopsys vs. Siemens EDA — 자동차 전장 시장

**우리의 강점 포인트**
- AUTOSAR 및 ISO 26262 기능 안전 검증 플로우를 EDA와 통합 제공. (공식)
- 반도체 IP 레벨에서부터 소프트웨어 보안 검증까지 End-to-End 커버리지. (추정)
- 글로벌 현지 기술 지원 체계 (한국·일본·독일 주요 거점). (공식)

**상대방이 공격할 포인트 & 대응**
- "Siemens는 자동차 OEM과의 관계가 깊다" → Synopsys는 Tier-1 반도체 공급사와 협력하여 OEM 채택 전 설계 단계에서 이미 검증된다.
- "Siemens의 디지털 트윈 통합이 강하다" → Synopsys는 MATLAB/Simulink와의 연동으로 시스템 레벨 검증을 커버한다.

**승리 시나리오**
자동차 SoC를 직접 설계하는 팹리스, 기능 안전 인증이 필요한 반도체 공급사.

---

### 배틀카드 3: Synopsys Black Duck vs. Veracode / Checkmarx — 소프트웨어 보안

**우리의 강점 포인트**
- Black Duck은 오픈소스 SCA(소프트웨어 구성 분석) 분야 업계 표준 도구로 인정받는다. (공식)
- 단일 벤더에서 SAST + DAST + SCA + Fuzz Testing을 모두 제공. (공식)
- 반도체 IP와 소프트웨어 보안을 동시에 다루는 유일한 벤더 — 공급망 전체 가시성. (추정)

**상대방이 공격할 포인트 & 대응**
- "Veracode가 SAST 정확도가 높다" → Black Duck SAST는 오탐율 감소에 집중하며, 개발자 경험(IDE 플러그인) 통합이 우수하다.
- "Checkmarx가 더 저렴하다" → TCO(총소유비용) 관점에서 단일 플랫폼 통합 시 툴 관리·라이선스 비용이 절감된다.

**승리 시나리오**
SBOM 규제 대응이 필요한 기업, 오픈소스 의존도가 높은 소프트웨어 조직, 반도체·소프트웨어를 동시에 다루는 기업.

---

## 경쟁 포지셔닝 맵

```
                    높은 포트폴리오 폭
                            │
          Siemens EDA ──────┼────── Synopsys ★
          (산업 통합)       │       (EDA + IP + 보안)
                            │
  낮은 기술 깊이 ───────────┼─────────────── 높은 기술 깊이
                            │
                    Veracode│Checkmarx
                    (보안만)│
                            │
                    낮은 포트폴리오 폭
```

**Cadence는 Synopsys와 같은 사분면에 위치하나, 보안 포트폴리오가 없어 우측 상단 내에서 분리된다. (추정)**
