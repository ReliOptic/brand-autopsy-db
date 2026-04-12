# 02. 오디언스 맵 — 팔로알토 네트웍스 (Palo Alto Networks)

## 오디언스 개요
팔로알토 네트웍스의 핵심 구매 의사결정자는 엔터프라이즈 규모 조직의 보안 책임자 및 IT 리더십이다. 구매 주기가 6~18개월에 달하고, 복수의 이해관계자(CISO, CIO, CFO, 조달팀)가 개입하는 복잡한 B2B 세일즈 사이클을 가진다. 최종 사용자(SOC 분석가, 네트워크 엔지니어)와 예산 승인자(CFO, CEO) 사이의 메시지 간극을 동시에 좁혀야 한다.

---

## 페르소나

### 페르소나 1 — "Marcus Chen, Global CISO"

**기본 정보**
- 직함: Chief Information Security Officer (CISO)
- 산업: 글로벌 금융 서비스 / 대형 제조업 / 헬스케어 (추정: PANW 주요 버티컬 기반)
- 조직 규모: 직원 10,000명 이상, 글로벌 멀티클라우드 환경 운영
- 나이: 42~52세
- 보고 라인: CIO 또는 CEO 직속

**핵심 목표**
- 이사회에 사이버 리스크를 비즈니스 언어로 설명하고 예산 승인을 받는 것
- 포인트 솔루션 난립으로 인한 운영 복잡성과 사각지대를 제거하는 것
- 다음 랜섬웨어·공급망 공격에서 조직을 방어하고, 침해 사고 시 책임 리스크를 최소화하는 것

**핵심 고통점**
- 벤더가 너무 많아 통합 가시성(unified visibility)이 없음
- SOC 팀의 알람 피로(alert fatigue)로 실제 위협 탐지 지연
- 이사회·CFO에게 보안 ROI를 증명해야 하는 압박

**구매 트리거**
- 동종 업계 대형 침해 사고 뉴스
- 연간 예산 사이클 시작 (Q4 계획)
- 규제 감사(DORA, NIS2, HIPAA) 사전 준비

**정보 소비 채널**
- Gartner·Forrester 매직 쿼드런트 보고서
- Unit 42 Incident Response Report
- CISO 전용 커뮤니티 (CISO Forum, Evanta Summit)
- LinkedIn 업계 동료 네트워크

**PANW와의 접점 포인트**
- 플랫폼 통합(consolidation)으로 벤더 수 감축 → TCO 절감 논리
- Precision AI 기반 오탐율 감소 → SOC 운영 효율화
- Cortex XSIAM으로 SIEM·SOAR 통합 → 분석가 생산성 향상

---

### 페르소나 2 — "Sarah Müller, Cloud Security Architect"

**기본 정보**
- 직함: Senior Cloud Security Architect / Principal Security Engineer
- 산업: SaaS, 핀테크, 디지털 네이티브 기업
- 조직 규모: 직원 500~5,000명, AWS/Azure/GCP 멀티클라우드
- 나이: 32~42세
- 보고 라인: CISO 또는 VP Engineering

**핵심 목표**
- 클라우드 인프라 전체에 걸쳐 코드 단계부터 런타임까지 일관된 보안 정책 적용
- 개발팀의 배포 속도를 저해하지 않으면서 보안 기준 충족
- 컨테이너·Kubernetes·서버리스 환경의 위협 탐지 자동화

**핵심 고통점**
- 클라우드 환경별 보안 정책이 파편화되어 일관성 없음
- 개발팀과 보안팀 간 마찰(shift-left 요구 vs 배포 속도 우선)
- 클라우드 자산의 오설정(misconfiguration)이 주요 침해 원인임을 알면서도 탐지가 늦음

**구매 트리거**
- 클라우드 인프라 대규모 마이그레이션 또는 새 클라우드 도입
- 오설정 관련 내부 침해 또는 감사 지적
- Kubernetes·컨테이너 환경 대규모 확장 시점

**정보 소비 채널**
- KubeCon, re:Inforce, RSA Conference 기술 세션
- GitHub, Reddit r/netsec, Hacker News
- PANW 기술 블로그, Prisma Cloud 문서
- CNCF Security Whitepaper 등 오픈소스 커뮤니티

**PANW와의 접점 포인트**
- Prisma Cloud CNAPP — 코드부터 클라우드까지 단일 플랫폼 (공식 제품 포지셔닝)
- AI 기반 오설정 자동 탐지 및 우선순위 지정
- DevSecOps 파이프라인 통합으로 개발팀 마찰 최소화

---

### 페르소나 3 — "James Park, SOC Analyst (Tier 2)"

**기본 정보**
- 직함: SOC Analyst Tier 2 / Threat Hunter
- 산업: 금융, 통신, 공공 (MSSPs 포함)
- 조직 규모: 대형 엔터프라이즈 또는 외부 MSSP
- 나이: 27~37세
- 보고 라인: SOC Manager / Security Operations Director

**핵심 목표**
- 하루 수천 건의 알람 중 실제 위협을 빠르게 식별하고 격리
- 인시던트 대응(IR) 시간(MTTR) 단축
- 위협 헌팅을 통한 사전 탐지 역량 강화

**핵심 고통점**
- 알람 피로(alert fatigue) — 오탐이 많아 실제 위협 놓칠 위험
- 다수의 콘솔(SIEM, EDR, NGFW, 클라우드)을 오가며 컨텍스트 파악하는 비효율
- 자동화 부족으로 반복 작업에 시간 낭비, 위협 헌팅 시간 부족

**구매 트리거**
- 기존 SIEM 라이선스 갱신 시점
- 내부 침해 사고 후 탐지·대응 역량 재검토
- SOC 팀 확장 없이 커버리지를 늘려야 하는 예산 압박

**정보 소비 채널**
- SANS Institute 교육 및 자격증 (GCIA, GCIH)
- Unit 42 위협 인텔리전스 피드·블로그
- Cortex XSIAM·XSOAR 제품 데모·튜토리얼
- Twitter/X의 보안 리서처 커뮤니티 (#ThreatIntel, #DFIR)

**PANW와의 접점 포인트**
- Cortex XSIAM — AI 기반 알람 자동 분류 및 인시던트 상관관계 분석 (공식 제품)
- 단일 콘솔에서 네트워크·엔드포인트·클라우드 통합 가시성
- 자동화 플레이북(SOAR)으로 반복 대응 작업 제거

---

## 오디언스 인사이트 요약

| 구분 | Marcus (CISO) | Sarah (클라우드 아키텍트) | James (SOC 분석가) |
|------|---------------|--------------------------|-------------------|
| 핵심 동기 | 리스크 제거·이사회 보고 | 클라우드 보안 자동화 | 알람 피로 해소·MTTR 단축 |
| 구매 권한 | 최종 승인자 | 기술 평가 추천자 | 실사용자·내부 챔피언 |
| 설득 언어 | 비즈니스 리스크·TCO | 기술 통합·API·자동화 | 탐지율·MTTR·UX |
| 핵심 채널 | Gartner·CISO Summit | KubeCon·GitHub·Docs | SANS·Unit 42·데모 |

---

### Steal Sheet — 마케터가 훔쳐갈 3가지

1. **"구매자와 사용자를 분리해서 콘텐츠를 만들어라."** PANW는 CISO용 비즈니스 케이스 자료(ROI 계산기, 이사회 보고 템플릿)와 SOC 분석가용 기술 문서(Cortex 플레이북, Unit 42 위협 피드)를 완전히 다른 채널과 포맷으로 운영한다 (추정: 공식 콘텐츠 포트폴리오 구조 기반). → 적용: 동일 제품을 최종 승인자에게는 '리스크·비용' 언어로, 기술 평가자에게는 '통합·자동화·API' 언어로 각각 별도 콘텐츠 트랙을 운영하라.

2. **"현장 실무자를 내부 챔피언으로 전환하는 기술 콘텐츠를 만들어라."** SOC 분석가(James 페르소나)는 예산 권한이 없지만, 기술 평가 과정에서 강력한 내부 추천인이 된다. PANW는 무료 인증 교육(Palo Alto Networks Academy), 위협 인텔리전스 피드, Cortex 무료 체험을 통해 이 층을 먼저 설득한다 (추정). → 적용: 실무자가 자발적으로 내부에 추천할 수 있도록 '기술 자랑거리'가 되는 무료 자료(데모, 인증, 커뮤니티 콘텐츠)를 전략적으로 배치하라.

3. **"고통 지점별 랜딩 페이지를 직책별로 분기하라."** 동일한 플랫폼이라도 CISO에게는 'Reduce your attack surface', 클라우드 아키텍트에게는 'Secure every cloud workload from code to runtime', SOC 분석가에게는 'Cut MTTR by 80%'라는 각기 다른 헤드라인이 필요하다 (추정: 공식 웹사이트 역할별 섹션 구조 기반). → 적용: 역할 기반 랜딩 페이지와 광고 카피를 분리하면 같은 예산으로 전환율을 크게 높일 수 있다.
