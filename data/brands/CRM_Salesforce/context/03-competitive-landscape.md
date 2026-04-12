# 03. 경쟁 지형 해부 — Salesforce (CRM)

## 경쟁 매트릭스

| 경쟁사 | 포지셔닝 | 강점 | 약점 | Salesforce 대응 |
|--------|----------|------|------|-----------------|
| **Microsoft Dynamics 365** | Microsoft 생태계 통합 ERP+CRM | Office 365/Teams 네이티브 통합, Azure AI, 기존 MS 라이선스 번들 할인 | CRM 전문성 이미지 약함, UI 복잡도, 구현 기간 김 | "CRM 전문 기업 vs 제너럴리스트" 프레임, Customer 360 통합 우위 강조 |
| **HubSpot** | 인바운드 마케팅 기반 SMB CRM | 사용 편의성, 무료 티어, 마케팅 자동화 강점, 빠른 온보딩 | 엔터프라이즈 확장성 한계, 커스터마이징 제약, 복잡한 B2B 영업 프로세스 지원 미흡 | 미드마켓 이상에서 "성장하면 Salesforce로" 마이그레이션 내러티브 구사 |
| **ServiceNow** | IT 서비스 관리(ITSM) → CRM 확장 | IT 워크플로우 자동화, 엔터프라이즈 플랫폼 신뢰도, AI 기반 자동화 | CRM 고객 대면 기능 약함, 마케팅·영업 클라우드 부재 | Service Cloud 우위, Agentforce vs ServiceNow AI 경쟁 구도 |
| **Oracle CX (Fusion)** | ERP 연동 엔터프라이즈 CRM | Oracle DB/ERP 기존 고객 기반, 제조·금융 업종 깊이 | 클라우드 전환 속도 느림, UI 구식 이미지, 비용 불투명 | "클라우드 네이티브 vs 레거시 클라우드" 포지셔닝 |
| **SAP Sales Cloud** | ERP 연동 CRM | SAP ERP 락인 고객 기반, 독일 제조업 레퍼런스 | CRM 단독 경쟁력 약함, 구현 복잡도 극단적 높음 | Manufacturing Cloud 등 업종 특화 클라우드로 SAP 교체 사례 축적 |
| **Zoho CRM** | 가성비 올인원 SMB CRM | 저렴한 가격, 광범위한 앱 수트, 빠른 구현 | 엔터프라이즈 신뢰도·보안 인증 약함, 파트너 생태계 한계 | 직접 경쟁 회피 (Salesforce는 SMB 타깃하지 않음) |

---

## 포지셔닝 맵

```
                    고객 대면 CRM 전문성
                           ▲
                           │
         Salesforce ●      │
                           │
    HubSpot ●              │              ● ServiceNow
                           │
──────────────────────────●──────────────────────────→
SMB / 저비용               │ Oracle CX ●   엔터프라이즈 / 고비용
                           │
              SAP ●        │
              Dynamics ●   │
                           │
                           ▼
                    ERP/IT 인프라 중심
```

**해석**: Salesforce는 "엔터프라이즈 + 고객 대면 CRM 전문성" 사분면을 독점하고 있다. Microsoft Dynamics와 Oracle은 ERP 강점으로 엔터프라이즈 시장을 공략하지만 CRM 전문성에서 Salesforce에 열세. HubSpot은 SMB-미드마켓에서 CRM 전문성을 갖추나 엔터프라이즈 확장성 한계. ServiceNow는 IT 워크플로우 자동화 강점으로 CRM 영역에 침입 중.

---

## 배틀카드

### 배틀카드 1 — vs. Microsoft Dynamics 365

**고객이 Dynamics를 고려하는 이유**: "우리 이미 M365 쓰는데 번들로 싸게 들어오지 않을까요?"

**Salesforce 반격 논리**:
- **전문성 vs 번들**: "Office 문서 관리에는 Microsoft가 최고다. 하지만 고객 관계를 관리하고, 매출을 예측하고, AI 에이전트로 고객 서비스를 자동화하는 것은 CRM 전문 플랫폼이 유리하다. 제너럴리스트 번들은 모든 것을 다 하지만, 어느 것도 탁월하게 하지 못한다."
- **생태계 규모**: AppExchange 7,000+ 앱 vs Dynamics 마켓플레이스 — 파트너 생태계 규모 비교 제시
- **구현 성공률**: Microsoft Dynamics 구현 실패 사례와 Salesforce 구현 성공 레퍼런스 병치
- **AI 비교**: Agentforce vs Copilot — CRM 컨텍스트에 특화된 AI 에이전트 우위 강조

**고객 우려 처리**: "Microsoft 라이선스 절약" → TCO 계산기로 5년 기준 매출 증가분이 라이선스 비용 차이를 초과함을 수치로 제시

---

### 배틀카드 2 — vs. HubSpot

**고객이 HubSpot을 고려하는 이유**: "우리 규모에는 Salesforce가 과하지 않을까요? HubSpot이 더 쉽고 저렴한 것 같던데."

**Salesforce 반격 논리**:
- **성장 시나리오**: "지금은 HubSpot으로 충분하다. 하지만 영업 팀이 30명을 넘고, 채널 파트너가 생기고, 글로벌 확장을 시작하는 순간 HubSpot의 한계에 부딪힌다. 그때 마이그레이션 비용과 리스크가 지금 Salesforce 도입 비용보다 훨씬 크다."
- **커스터마이징 깊이**: 복잡한 B2B 영업 프로세스(Opportunity Stage, Quote, Contract) 구현 사례 제시
- **미드마켓 레퍼런스**: HubSpot에서 Salesforce로 마이그레이션한 동종 업계 고객 사례 공유
- **Starter Suite**: SMB 진입 장벽 낮추는 Salesforce Starter(저가 패키지) 옵션 제시

**고객 우려 처리**: "구현이 복잡하다" → Salesforce Jumpstart 프로그램, 파트너 생태계 구현 지원 보장

---

### 배틀카드 3 — vs. ServiceNow

**고객이 ServiceNow를 고려하는 이유**: "IT 서비스 관리는 이미 ServiceNow 쓰는데, CRM도 같이 처리할 수 있다고 하더라고요."

**Salesforce 반격 논리**:
- **고객 대면 vs 내부 IT**: "ServiceNow는 IT 서비스 운영을 위해 설계되었다. Salesforce는 고객을 위해 설계되었다. 고객이 경험하는 모든 접점 — 영업, 마케팅, 서비스 — 을 하나의 플랫폼에서 관리하는 것은 ServiceNow의 DNA에 없다."
- **마케팅·영업 클라우드 부재**: ServiceNow에는 Marketing Cloud, Sales Cloud 수준의 기능이 없음을 구체적 기능 비교로 제시
- **Customer 360**: 고객 데이터 통합 관점에서 Salesforce Data Cloud의 우위 강조
- **Agentforce vs ServiceNow AI**: 고객 서비스 자동화 분야에서 ServiceNow Now Assist와 Agentforce의 기능 비교 — 고객 대면 시나리오에서 Agentforce 우위

**고객 우려 처리**: "두 시스템을 연동하면 되지 않나요?" → Salesforce-ServiceNow 네이티브 통합 커넥터 제시, 단 Customer Success 리드는 Salesforce로 통합 권고

---

## 위협 및 기회

### 주요 위협
| 위협 | 심각도 | 대응 |
|------|--------|------|
| Microsoft의 Dynamics 365 + Copilot 번들 공세 | 높음 | M365 기존 고객 대상 ROI 비교 강화, Agentforce 차별화 |
| HubSpot의 미드마켓 상향 확장 (HubSpot Enterprise) | 중간 | 미드마켓 Starter Suite 경쟁력 강화, 마이그레이션 사례 축적 |
| ServiceNow의 CRM/CX 영역 침입 | 중간 | IT+CX 통합 시나리오에서 Salesforce가 리드 시스템임을 표준화 |
| 생성 AI 스타트업의 수직 특화 CRM 등장 | 중간 | Agentforce 조기 시장 선점, AppExchange 파트너 생태계로 흡수 |
| 경기 침체 시 라이선스 비용 압박 | 낮음~중간 | Flex Credit 모델, ROI 보장 프로그램 강화 |

### 주요 기회
| 기회 | 잠재력 | 실행 방향 |
|------|--------|-----------|
| 엔터프라이즈 AI 에이전트 시장 조기 선점 | 매우 높음 | Agentforce 전면 마케팅, 파일럿 고객 성공 사례 속도감 있게 공개 |
| SAP/Oracle 레거시 교체 수요 | 높음 | Manufacturing/Financial Services Cloud 업종 특화 솔루션 강화 |
| 아시아태평양(APAC) 디지털 전환 가속 | 높음 | 한국·일본·인도 시장 파트너 생태계 확장 |
| Data Cloud를 통한 제로파티 데이터 시대 대응 | 중간~높음 | 쿠키리스 전환 컨텍스트에서 Data Cloud CDP 포지셔닝 |
| Slack 통합으로 협업+CRM 융합 | 중간 | Slack-Salesforce 통합 워크플로우 사례 마케팅 강화 |

---

### Steal Sheet — 3가지

1. **카테고리 정의를 좁게 유지하면 1등이 되기 쉽다.** Salesforce가 "엔터프라이즈 CRM"이라는 정의를 고수한 것은 전략적 선택이다. ERP까지 확장하지 않음으로써 SAP/Oracle과의 정면충돌을 피하고, "CRM 전문 플랫폼"이라는 인식을 독점했다. 당신의 카테고리를 좁게 정의할수록 그 안에서 1등이 될 확률이 높아진다.

2. **배틀카드는 고객의 언어로 시작해야 한다.** 효과적인 경쟁 대응은 경쟁사 약점을 나열하는 것이 아니라, 고객이 경쟁사를 고려하는 이유(고객의 논리)에서 시작해 그 논리를 뒤집는 것이다. "비싸 보여서 Salesforce를 안 쓴다"는 고객에게는 기능 비교표가 아니라 TCO 계산기가 필요하다.

3. **위협은 흡수하거나 재정의하라.** Salesforce는 생성 AI 스타트업의 등장을 위협으로 보지 않고, AppExchange 생태계로 흡수하는 전략을 선택했다. 외부 AI 서비스를 Agentforce Actions로 연결 가능하게 만들어, 경쟁자를 파트너로 전환했다. 시장에 새로운 플레이어가 나타날 때 "어떻게 막을까"보다 "어떻게 내 생태계 안으로 끌어들일까"를 먼저 질문하라.
