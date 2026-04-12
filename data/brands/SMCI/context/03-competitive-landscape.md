# 03 경쟁 구도 — Super Micro Computer (SMCI)

## 경쟁사 포지셔닝 맵 (추정)

```
         [고급 맞춤화]
               │
    SMCI ──────┼──── Dell EMC PowerEdge
               │
[낮은 TCO] ────┼──── [높은 TCO]
               │
    ODM Direct ┼──── HPE ProLiant
               │
         [표준 카탈로그]
```

---

## 주요 경쟁사 프로파일

### 경쟁사 1 — Dell Technologies (PowerEdge 서버)

| 항목 | Dell EMC | SMCI |
|------|----------|------|
| 시장 점유율 (x86 서버) | ~17% (공식 IDC 추정) | ~5~7% (추정) |
| 강점 | 글로벌 채널망, iDRAC 관리 도구, 엔터프라이즈 신뢰성 | 설계 유연성, GPU 서버 출시 속도, 그린 컴퓨팅 |
| 약점 | 높은 라이선스 비용, 느린 커스텀 빌드 | 브랜드 인지도, 거버넌스 이슈 이력 |
| 핵심 메시지 | "Modern Infrastructure for Every Business" (공식) | "Building the Future of IT" (추정) |
| 가격대 | 프리미엄 | 중간~프리미엄 |
| AI 서버 전략 | PowerEdge XE9680 (H100 GPU) (공식) | AS -8125GS-TNHR 등 (공식) |

**배틀카드 1 — vs. Dell EMC**

| 구분 | 내용 |
|------|------|
| 우리의 강점 | GPU 서버 신모델 출시 속도 Dell 대비 평균 2~3개월 빠름 (추정); 동일 스펙 대비 TCO 15~20% 절감 가능 (추정) |
| 상대방 강점 | 글로벌 AS 네트워크, APEX 금융 서비스, iDRAC 통합 관리 |
| 우리의 반박 | "SMCI는 NVIDIA와 직접 공동 설계를 통해 GPU 최적화 서버를 가장 먼저 출시합니다. Dell의 관리 도구 대신 IPMI/Redfish 표준 기반으로 멀티벤더 환경에서 자유롭게 통합하세요." |
| 위험 신호 | 고객이 Dell의 보증·금융 패키지에 강하게 묶여 있을 경우 |
| 질문 전술 | "현재 GPU 서버 신모델을 도입하는 데 Dell 경로로 얼마나 걸리셨나요?" |

---

### 경쟁사 2 — Hewlett Packard Enterprise (HPE ProLiant / Cray)

| 항목 | HPE | SMCI |
|------|-----|------|
| 시장 점유율 (x86 서버) | ~14% (추정) | ~5~7% (추정) |
| 강점 | iLO 원격 관리, GreenLake 구독 모델, HPC Cray 포트폴리오 | 모듈형 설계, 빠른 커스텀 납기, 낮은 전력 소비 |
| 약점 | 구독 전환 압박, 높은 소프트웨어 라이선스 비용 | 소프트웨어·관리 도구 생태계 빈약 |
| AI 서버 전략 | ProLiant DL380 Gen11 / Cray EX (공식) | SuperBlade / GPU 최적화 시스템 (공식) |

**배틀카드 2 — vs. HPE**

| 구분 | 내용 |
|------|------|
| 우리의 강점 | GreenLake 구독 없이 소유권 100% 확보; 전력 효율 1위 섀시 설계 (추정); 모듈형 업그레이드로 3~5년 사이클 비용 절감 |
| 상대방 강점 | GreenLake aaS 모델로 CAPEX 부담 해소, Cray의 HPC 신뢰성 |
| 우리의 반박 | "HPE GreenLake는 5년 계약 시 총비용이 소유 모델 대비 30~40% 높을 수 있습니다(추정). SMCI 온프레미스 + 클라우드 버스트 하이브리드로 더 낮은 TCO를 구현하세요." |
| 위험 신호 | 고객이 이미 HPE GreenLake 계약을 체결했거나 Cray HPC 환경 의존도가 높을 때 |
| 질문 전술 | "5년 후 인프라 소유권과 데이터 주권이 어느 쪽에 있기를 원하시나요?" |

---

### 경쟁사 3 — Inspur / 기가바이트 / 아수스 (ODM 직접 경쟁)

| 항목 | Inspur/Gigabyte | SMCI |
|------|----------------|------|
| 시장 포지션 | 중국계 ODM, 저가 GPU 서버 | 미국 상장 ODM, 설계 맞춤화 |
| 강점 | 공격적 가격, 아시아 내 빠른 납기 | 미국 제조·설계, NVIDIA 공식 파트너, 브랜드 신뢰성 |
| 약점 | 지정학 리스크, 서방 시장 접근 제한 | 상대적으로 높은 가격 |
| 위협 수준 | 미국·유럽 시장에서는 낮음; 아시아 시장에서 높음 (추정) | — |

**배틀카드 3 — vs. Inspur/ODM**

| 구분 | 내용 |
|------|------|
| 우리의 강점 | 미국 NASDAQ 상장 기업, 수출 통제 리스크 없음; NVIDIA Elite 파트너 인증 (공식); 미국·글로벌 데이터센터 레퍼런스 다수 |
| 상대방 강점 | 가격 10~20% 낮음 (추정), 아시아 현지 지원 체계 |
| 우리의 반박 | "지정학적 리스크와 공급망 투명성, 그리고 NVIDIA 공식 인증까지 고려하면 SMCI가 총 리스크 비용(Total Risk Cost) 기준으로 더 경쟁력이 있습니다." |
| 위험 신호 | 순수 가격 경쟁 입찰, 중국 내 납기 우선 고객 |
| 질문 전술 | "공급업체의 수출 통제 준수 현황을 내부 컴플라이언스 팀이 검토했나요?" |

---

## Steal Sheet — 경쟁사 고객 탈취 전략

### Steal Sheet 1 — Dell EMC 고객 탈취

| 레이어 | 전술 |
|--------|------|
| 인지(Awareness) | AI 서버 신모델 출시 속도 비교 인포그래픽 LinkedIn 광고 집행 (추정) |
| 검토(Consideration) | "SMCI vs Dell AI Server TCO 계산기" 랜딩 페이지 제공 |
| 전환(Conversion) | Dell 계약 만료 6개월 전 파트너 채널을 통한 전환 견적 무료 제공 |

### Steal Sheet 2 — HPE 고객 탈취

| 레이어 | 전술 |
|--------|------|
| 인지(Awareness) | "GreenLake vs 소유 모델 5년 TCO 비교" 백서 배포 (추정) |
| 검토(Consideration) | SMCI SuperCloud Composer 관리 도구 무료 PoC 제안 |
| 전환(Conversion) | GreenLake 계약 만료 시점 타겟 이메일 캠페인 + 마이그레이션 지원 서비스 번들 |

### Steal Sheet 3 — ODM/Inspur 고객 탈취

| 레이어 | 전술 |
|--------|------|
| 인지(Awareness) | 공급망 리스크 체크리스트 콘텐츠로 지정학 리스크 부각 (추정) |
| 검토(Consideration) | NVIDIA 공식 파트너 인증서·레퍼런스 케이스 제공 |
| 전환(Conversion) | 미국·EU 규정 준수(Compliance) 패키지 포함 번들 제안 |
