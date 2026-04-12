# 03. 경쟁 구도 — ServiceNow (NOW)

## 경쟁 카테고리 분류

| 경쟁 유형 | 주요 플레이어 |
|-----------|-------------|
| 직접 경쟁 (ITSM 코어) | BMC Helix, Ivanti, Jira Service Management (Atlassian) |
| 플랫폼 확장 경쟁 | Salesforce (Service Cloud), Microsoft (Power Platform + Dynamics) |
| AI 워크플로우 경쟁 | ServiceNow Now Assist vs Salesforce Einstein vs MS Copilot |
| 니치/로우코드 | Freshservice, Zendesk, TOPdesk |

---

## 배틀카드 1: ServiceNow vs BMC Helix

### 배틀카드

**경쟁사 포지셔닝**: BMC Helix는 "자율 디지털 엔터프라이즈"를 표방하며 AIOps와 ITSM 통합을 강조. 레거시 Remedy 고객 기반(20년+)이 강점.

**ServiceNow 강점**:
- 사용자 경험(UX)에서 일관된 우위 — Gartner Peer Insights 4.3 vs BMC 3.9 (추정)
- 앱 마켓플레이스 생태계 규모: 3,500+ 앱 vs BMC 대비 압도적 차이
- Now Assist(GenAI) 출시 속도·기능 깊이에서 앞섬

**BMC 강점**:
- 기존 Remedy 고객의 마이그레이션 비용·위험 회피 심리 활용
- 메인프레임·레거시 인프라 통합에 강점
- 일부 대형 금융기관의 장기 계약 기반

**극복 전략**:
- TCO 비교 시 마이그레이션 비용을 3년 ROI 프레임으로 희석
- "Remedy에서 ServiceNow로" 마이그레이션 성공 사례 집중 제시
- AIOps 기능 비교 데모: ITOM + Now Assist의 실시간 이상 탐지

**금지 대응**:
- BMC의 "레거시 안정성" 주장에 "안정성 = 변화 거부"로 역공
- 가격 협상 시 플랫폼 확장 가치(HR·CSM 추가 모듈) 번들로 총 가치 상향

---

## 배틀카드 2: ServiceNow vs Atlassian Jira Service Management

### 배틀카드

**경쟁사 포지셔닝**: Jira SM은 "개발자 친화적 ITSM"으로 DevOps 팀에 침투. 낮은 진입 가격과 기존 Jira 생태계 연계를 무기로 중견기업 공략.

**ServiceNow 강점**:
- 엔터프라이즈 거버넌스·컴플라이언스 기능에서 비교 불가 우위
- ITIL 4 완전 지원, 대규모 멀티-팀 워크플로우 오케스트레이션
- 단일 데이터 모델(CMDB)로 전사 가시성 제공

**Atlassian 강점**:
- 개발팀 이미 사용 중인 Jira와의 네이티브 통합
- 중소~중견 규모에서 극적으로 낮은 초기 비용
- Cloud-native, 빠른 배포 속도

**극복 전략**:
- 스케일 임계점 논증: "팀 50명까지는 Jira, 기업 전체는 ServiceNow"
- IT 외 확장(HR·법무·재무)이 불가능한 Jira의 한계 시각화
- CIO 레벨에서 거버넌스·감사 로그 요건 강조

**금지 대응**:
- "더 비싸다" 반론 → 총소유비용(TCO) + 플랫폼 통합 절감액으로 전환
- 개발자 선호도 주장 → "CIO의 결정, 개발자의 도구" 레이어 분리

---

## 배틀카드 3: ServiceNow vs Microsoft (Power Platform + Copilot)

### 배틀카드

**경쟁사 포지셔닝**: Microsoft는 M365·Azure 기반 고객에게 "이미 있는 도구로 충분하다"는 잠식 전략. Copilot Studio + Power Automate + Dynamics 365 조합으로 ITSM 영역 진입.

**ServiceNow 강점**:
- ITSM 전문성 20년: ITIL 프로세스 깊이, CMDB 정확도, 복잡한 워크플로우 관리
- 멀티클라우드·멀티벤더 환경 중립 포지션 (Microsoft 락인 없음)
- Now Assist의 ServiceNow 데이터 컨텍스트 활용 깊이 > Copilot의 일반성

**Microsoft 강점**:
- M365 라이선스 보유 고객의 추가 비용 없음 인식
- Azure AD·Teams·Exchange 네이티브 통합
- C-suite의 Microsoft 신뢰도·관계 자산

**극복 전략**:
- "좋은 도구와 전문 플랫폼의 차이" — Microsoft Office가 ERP를 대체 못하듯
- Microsoft 도구로 구현한 ITSM의 유지보수 비용·기술부채 사례 제시
- 공존 전략: ServiceNow + Microsoft 통합(Teams 채널, Copilot 연동) 데모

**금지 대응**:
- "이미 Microsoft가 있다" → "Microsoft 환경을 더 잘 돌아가게 하는 것이 ServiceNow"
- 라이선스 비용 비교 압박 → 구현·운영 TCO 전체 프레임으로 전환

---

## 경쟁 포지셔닝 매트릭스

```
높은 엔터프라이즈 깊이
        ^
        |
BMC     |   [ServiceNow]
Helix   |   ★ 리더 포지션
        |
--------+-------------------> 높은 플랫폼 범위
        |
Jira SM |   Microsoft
(ITSM)  |   Power Platform
        |
낮은 엔터프라이즈 깊이
```

---

## Steal Sheet — 경쟁 구도 레이어

### Steal Sheet: CIO 경쟁 전환 설득 3종

1. **"플랫폼 채무 계산기"** — 현재 사용 중인 IT 운영 툴 수 × 통합 유지 비용을 수치화. ServiceNow 단일화 시 절감액 대비 전환 비용 3년 NPV 제시. 경쟁사 대비 플랫폼 확장성을 정량화.

2. **"AI 성숙도 비교 매트릭스"** — Now Assist vs BMC vs Microsoft Copilot의 ITSM 특화 GenAI 기능 체크리스트. 도메인 데이터 컨텍스트, 워크플로우 자동화 깊이, 거버넌스 제어 3축으로 비교.

3. **"Gartner/Forrester 레퍼런스 패키지"** — Gartner Magic Quadrant ITSM 리더 포지션(공식), Forrester Wave 평가, IDC 시장점유율 데이터를 하나의 1페이지 요약으로 편집. 이사회 보고용 벤더 정당화 자료.
