# 02. 오디언스 맵 — CrowdStrike (CRWD)

## 오디언스 개요

CrowdStrike의 구매 사이클은 복수 의사결정자가 관여하는 엔터프라이즈 B2B 구조다. 최종 예산 결정권자(CISO/CFO)와 기술 평가자(보안 엔지니어/SOC 분석가), 그리고 실무 사용자(IT 운영팀)가 서로 다른 언어로 설득되어야 한다. 파트너 채널(MSSP, 리셀러)은 별도 서브-오디언스로 관리된다.

---

### 페르소나 1 — Elena Vasquez, CISO (최고정보보안책임자)

**기본 정보**
- 직책: CISO / VP of Information Security
- 소속: Fortune 500 금융·헬스케어·에너지 기업
- 연령: 42–55세
- 경력: 보안 엔지니어 → SOC 리드 → 보안 아키텍트 → CISO (15–20년)
- 예산 권한: 연간 사이버보안 예산 $5M–$50M 직접 결재

**심리 프로파일**
- 핵심 두려움: 이사회 보고 중 침해 사고 발생. "우리가 막을 수 있었던 사고"라는 뉴스 헤드라인.
- 핵심 욕망: 규제(SOC 2, PCI-DSS, HIPAA) 준수 + 이사회에 보여줄 수 있는 보안 성숙도 지표.
- 의사결정 기준: 벤더 레퍼런스(동종업계 사례), Gartner/Forrester 평가, 이전 침해 사고 대응 실적.
- 정보 소비: Gartner Magic Quadrant, RSA Conference 발표, CrowdStrike Annual Threat Report.

**CrowdStrike와의 접점**
- 유입: Gartner MQ Leader 포지셔닝 → 동종업계 CISO 레퍼런스 콜 → PoC 평가
- 설득 포인트: "298개 Fortune 500 기업 선택", "Gartner EDR Magic Quadrant 7년 연속 Leader"(추정), 침해 사고 사례 연구(IR 보고서).
- 이탈 리스크: 2024년 7월 Falcon 센서 업데이트 장애로 인한 신뢰 훼손. 경쟁사 전환 검토 가능성.

**메시지 프레임**
> "이사회는 '보안에 얼마나 썼는가'가 아니라 '침해를 막았는가'를 묻습니다. CrowdStrike는 그 질문에 숫자로 답합니다."

---

### 페르소나 2 — Marcus Chen, 시니어 보안 엔지니어 / SOC 분석가

**기본 정보**
- 직책: Senior Security Engineer / Tier 2 SOC Analyst
- 소속: 중견 테크 기업 또는 금융기관 내부 SOC
- 연령: 28–40세
- 경력: 네트워크 엔지니어 → SOC 분석가 → 보안 엔지니어 (5–12년)
- 자격증: CISSP, CEH, OSCP, CompTIA Security+

**심리 프로파일**
- 핵심 두려움: 알람 피로(Alert Fatigue) — 하루 수천 개 이벤트 속에서 진짜 위협을 놓치는 것.
- 핵심 욕망: 오탐(False Positive) 최소화 + 자동화 플레이북 + 명확한 공격 타임라인 시각화.
- 의사결정 기준: 기술 문서 품질, API 연동 유연성, 커뮤니티 포럼(Reddit r/netsec), PoC 실습 경험.
- 정보 소비: CrowdStrike Blog(Adversary Intelligence), GitHub 리포지토리, DEF CON/Black Hat 발표.

**CrowdStrike와의 접점**
- 유입: Falcon 무료 트라이얼 → 기술 블로그 → SANS 트레이닝 파트너십
- 설득 포인트: "단일 경량 에이전트로 CPU 1% 미만 점유"(추정), Falcon Fusion(SOAR 통합), 실시간 프로세스 트리 시각화.
- 이탈 리스크: 2024년 장애 이후 업데이트 프로세스 불신. 경쟁사(SentinelOne) 기술 문서 비교 검토.

**메시지 프레임**
> "알람이 아니라 인텔리전스를 받으세요. Falcon의 AI가 노이즈를 걸러내고 당신이 진짜 위협에 집중할 수 있게 합니다."

---

### 페르소나 3 — David Park, IT 인프라 관리자 / 시스템 어드민

**기본 정보**
- 직책: IT Infrastructure Manager / Systems Administrator
- 소속: 중소·중견기업(SMB–Mid-Market), 직원 200–2,000명
- 연령: 32–48세
- 경력: 헬프데스크 → 시스템 어드민 → IT 매니저 (8–15년)
- 특징: 보안 전담이 아닌 IT 제너럴리스트. 보안은 업무의 일부.

**심리 프로파일**
- 핵심 두려움: 랜섬웨어 감염으로 인한 업무 중단. 사고 발생 후 경영진 질책.
- 핵심 욕망: 설치·관리가 간단하고, 기존 IT 스택(Microsoft 365, Azure)과 잘 통합되는 도구.
- 의사결정 기준: 관리 복잡도, 라이선스 단순성, 파트너/MSP 지원 가용성, TCO.
- 정보 소비: Spiceworks, Reddit r/sysadmin, 파트너 MSP 추천, G2/Gartner Peer Insights 리뷰.

**CrowdStrike와의 접점**
- 유입: MSP/MSSP 파트너 추천 → Falcon Go(SMB 티어) → 무료 평가판
- 설득 포인트: 단일 콘솔 관리, Microsoft Azure 네이티브 통합, Falcon Complete MDR(관제 아웃소싱).
- 이탈 리스크: 가격 민감도 높음. SentinelOne, Microsoft Defender for Endpoint 비교 우위 검토.

**메시지 프레임**
> "보안팀 없이도 엔터프라이즈 수준 보호를. Falcon Complete가 24/7 관제를 대신합니다."

---

## 오디언스 매트릭스

| 세그먼트 | 규모 | 구매 주기 | 핵심 KPI | 우선 채널 |
|---------|------|----------|---------|---------|
| Enterprise CISO | 직원 5,000명+ | 12–24개월 | MTTD/MTTR, 규제 준수율 | 직접 영업, Executive Briefing |
| Mid-Market IT Security | 직원 500–5,000명 | 6–12개월 | TCO, 관리 공수 | 파트너 채널, 웨비나 |
| SMB IT Admin | 직원 50–500명 | 3–6개월 | 설치 용이성, 가격 | MSP/MSSP, 셀프서비스 |
| MSSP/파트너 | — | 연간 계약 | 마진율, 기술 지원 | 파트너 포털, 전용 SE |

---

### Steal Sheet — 3가지

1. **"구매자별 언어를 따로 설계하라."** CrowdStrike는 CISO에게 "이사회 보고 가능한 수치"를, 엔지니어에게 "API 연동 유연성"을, IT 관리자에게 "설치 간소화"를 각각 다른 언어로 말한다. 단일 메시지로 복수 의사결정자를 설득하려는 시도는 모두를 설득하지 못한다 — 페르소나별 카피를 분리하라.

2. **"두려움을 구체화하면 전환율이 오른다."** "사이버 위협이 증가하고 있습니다"는 공허하다. "FANCY BEAR가 지난 분기 귀사와 동일한 업종을 타겟했습니다"는 행동을 촉발한다. 추상적 위협을 구체적 피해 시나리오로 변환하면 리드 퀄리티가 올라간다.

3. **"기술 평가자를 내부 챔피언으로 전환하라."** Marcus 같은 SOC 분석가는 구매 결정권자가 아니지만, CISO에게 가장 신뢰받는 기술 조언자다. 기술 문서, 무료 트라이얼, 커뮤니티 포럼에서 이들을 먼저 설득하면, 이들이 예산 결재 보고서를 대신 써준다.
