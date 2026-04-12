# 02. 오디언스 맵 해부 — Salesforce (CRM)

## ICP (Ideal Customer Profile)

| 항목 | 내용 |
|------|------|
| 기업 규모 | 직원 200명 이상, ARR $10M+ (코어 타깃) / 엔터프라이즈 5,000명+ (최우선) |
| 산업 | 금융서비스, 제조, 리테일/커머스, 헬스케어, 테크, 미디어 |
| 기술 성숙도 | 클라우드 전환 진행 중 또는 완료 / 레거시 온프레미스 교체 검토 중 |
| 구매 트리거 | 영업 사이클 비효율, 고객 데이터 사일로, M&A 후 시스템 통합 필요, AI 도입 압박 |
| 예산 규모 | 연간 $50K ~ $수백만 (엔터프라이즈 계약 기준) |
| 지리 | 북미(60%+), 유럽, APAC(한국 포함) 순 |
| 의사결정 구조 | 챔피언(CRM 관리자/RevOps) → 인플루언서(CRO/CMO/CIO) → 최종 승인(CFO/CEO) |

**ICP 핵심 고통점**: 고객 데이터가 영업·마케팅·서비스 부서별로 분리되어 있어 일관된 고객 경험 제공이 불가능하고, 수작업 보고에 영업 시간의 30%+ 낭비 중.

---

## 페르소나

### 페르소나 1 — 박지훈 (Sales Operations Manager, 38세)

**직책**: Sales Operations Manager, B2B SaaS 기업 (직원 500명)
**목표**: 영업 파이프라인 예측 정확도 향상, 영업 담당자의 CRM 입력률 개선, 분기 보고 자동화
**고통점**:
- 영업 담당자 15명이 각자 다른 방식으로 딜 정보를 기록해 파이프라인 데이터 신뢰도 낮음
- 매월 말 Excel로 수동 집계하는 데 3일 소요
- 경영진은 실시간 파이프라인 대시보드를 요구하지만 현재 시스템으로는 불가능
**Salesforce 선택 동기**: Sales Cloud의 기회(Opportunity) 관리 + Einstein AI 예측 + 실시간 대시보드
**구매 여정**: Trailhead 무료 학습 → 동료 RevOps 커뮤니티 추천 → Trial → 내부 ROI 제안서 작성 → IT/CFO 승인
**메시지 공명 포인트**: "영업 팀이 CRM을 사랑하게 만드는 것" — 입력 부담을 줄이는 자동화, Einstein 활동 캡처
**채널**: Salesforce 공식 블로그, Trailhead, LinkedIn, RevOps 커뮤니티 슬랙

---

### 페르소나 2 — 이수연 (Chief Revenue Officer, 47세)

**직책**: CRO, 제조업 대기업 (직원 3,000명, B2B)
**목표**: 연간 매출 15% 성장, 영업 사이클 단축, 고객 이탈률(Churn) 감소
**고통점**:
- 영업·마케팅·서비스가 각기 다른 시스템 사용 → 고객 접점마다 데이터 불일치
- 딜 클로즈 후 서비스 팀이 계약 내용을 모르는 사태 반복
- AI 도입 압박은 강하지만 데이터 기반 부재로 어디서 시작해야 할지 모름
**Salesforce 선택 동기**: Customer 360(전 클라우드 통합) + Agentforce AI 에이전트 + 업종별 Cloud 솔루션(Manufacturing Cloud)
**구매 여정**: Gartner/Forrester 리포트 → Dreamforce 참관 → 파트너 컨설팅사 RFP → Executive Briefing Center 방문 → 다년 계약
**메시지 공명 포인트**: ROI 수치("고객사 평균 25% 매출 증가"), 동종 업계 레퍼런스, 신뢰·보안·컴플라이언스
**채널**: Dreamforce, IDC/Gartner 리포트, Salesforce Executive Briefing Center, LinkedIn Thought Leadership

---

### 페르소나 3 — 김민재 (Salesforce Administrator, 29세)

**직책**: Salesforce Admin, 금융서비스 기업 (직원 1,200명)
**목표**: Salesforce 플랫폼 최적화, 사용자 채택률 향상, 새 기능 구현으로 커리어 성장
**고통점**:
- 비즈니스 팀의 요구사항은 계속 늘어나지만 개발자 리소스 없이 혼자 처리해야 함
- 레거시 커스터마이징이 쌓여 매 릴리스마다 회귀 오류 우려
- Salesforce 자격증 취득 및 커리어 경로에 대한 불안
**Salesforce 선택 동기**: (플랫폼 자체가 직장) Trailhead 학습, Flow 자동화, Low-code 개발, AppExchange 앱
**구매 여정**: Trailhead → Salesforce Admin 커뮤니티 → 자격증 취득 → 내부 챔피언으로 성장
**메시지 공명 포인트**: "Trailblazer가 되어라" — 커리어 성장, 커뮤니티 소속감, 최신 기술 선도
**채널**: Trailhead, Salesforce Admin 팟캐스트, Twitter/X @Salesforce, Dreamforce, 지역 사용자 그룹(SFUG)

---

## AARRR 퍼널

| 단계 | 핵심 지표 | Salesforce 전술 |
|------|-----------|-----------------|
| **Acquisition** | 유료 트라이얼 전환율, MQL | Trailhead 무료 교육(리드 너처링), SEO("best CRM"), Dreamforce 등록, 파트너 레퍼럴 |
| **Activation** | 첫 30일 핵심 기능 사용률, 데이터 임포트 완료율 | Salesforce Jumpstart(구현 지원), Success Plan, 인앱 온보딩 가이드 |
| **Retention** | 연간 계약 갱신율(NRR), DAU/MAU | Trailhead 지속 학습, Success Cloud 지원, 분기별 비즈니스 리뷰(QBR), 커뮤니티 참여 |
| **Revenue** | 계약 확장(Expansion MRR), 크로스셀 클라우드 수 | 멀티 클라우드 번들 프로모션, 사용량 기반 업셀, Agentforce 추가 도입 |
| **Referral** | NPS, 레퍼럴 딜 비율, 케이스 스터디 수 | Trailblazer 커뮤니티, Dreamforce 스피커 섭외, Customer Advisory Board(CAB) |

---

## Anti-Persona

| 유형 | 이유 |
|------|------|
| 1인 프리랜서 / 개인 사업자 | Salesforce는 구현 복잡도와 비용이 소규모에 과도함. HubSpot Free 또는 Notion이 적합 |
| 기술 도입에 회의적인 전통 제조 중소기업 | 내부 IT 인프라·챔피언 부재. 도입 후 활성화 실패 가능성 높음 |
| 단기 계약·POC만 원하는 스타트업 | Salesforce 가격 구조와 구현 기간이 스타트업 속도와 불일치 |
| 강력한 SAP/Oracle 락인 기업 | 전환 비용과 레거시 통합 복잡도가 의사결정 장벽 |
| 데이터 주권 이슈 극도로 민감한 기관 | 퍼블릭 클라우드 불가 정책 기관 (단, Government Cloud로 일부 대응) |

---

### Steal Sheet — 3가지

1. **구매자 삼각형을 그려라.** Salesforce는 챔피언(Admin), 인플루언서(CRO/CMO), 승인자(CFO/CEO) 세 역할에게 각기 다른 메시지를 동시에 발사한다. Trailhead는 챔피언용, ROI 리포트는 승인자용, Dreamforce 키노트는 인플루언서용이다. 단일 메시지로 B2B 구매를 설득하려는 것은 위원회 결정 구조를 오해한 것이다. 세 역할의 언어가 다르다.

2. **무료 교육을 리드 파이프라인으로 전환하라.** Trailhead는 Salesforce의 가장 저평가된 성장 엔진이다. 수백만 명의 학습자가 Salesforce 기술을 익히며 자발적으로 사내 챔피언이 되고, 취업 시장에서 Salesforce 도입을 권유한다. 당신의 제품이 기술적 복잡도를 가졌다면, 무료 학습 플랫폼은 영업 비용을 낮추는 최고의 인바운드 채널이다.

3. **Anti-Persona를 공개적으로 정의하면 영업 효율이 오른다.** Salesforce가 SMB 시장을 명시적으로 포기하고(HubSpot, Zoho에 양보) 미드마켓-엔터프라이즈에 집중한 것은 타깃을 좁혔기 때문이 아니라 맞지 않는 고객과의 계약이 결국 이탈로 이어짐을 알았기 때문이다. 맞지 않는 고객을 먼저 거르면, 영업 주기가 단축되고 NPS가 오른다.
