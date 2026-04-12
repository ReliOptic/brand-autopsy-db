# 03. 경쟁 환경 — Akamai Technologies (AKAM)

## 경쟁 포지셔닝 맵 (추정)

```
                    높은 보안 전문성
                          │
           Akamai ●       │       ● Cloudflare
                          │
낮은 성능 ─────────────────┼───────────────── 높은 성능
                          │
     Fastly ●             │       ● AWS CloudFront
                          │
                    낮은 보안 전문성
```

---

## 주요 경쟁사 배틀카드

### 배틀카드 1: Cloudflare (NET)

| 항목 | Akamai | Cloudflare |
|------|--------|-----------|
| 설립 | 1998 | 2009 |
| 시가총액(추정) | ~$130억 | ~$300억 |
| PoP 수 | 4,000+ (공식) | 300+ (공식) |
| 핵심 강점 | 엔터프라이즈 SLA, 미션크리티컬 신뢰성 | 개발자 친화성, 빠른 혁신 속도 |
| 약점 | 가격 프리미엄, 셀프서비스 부재 | 엔터프라이즈 SLA 깊이 부족 |
| 가격 모델 | 엔터프라이즈 커스텀 계약 | Freemium + 셀프서비스 |
| 타깃 고객 | Fortune 500, 금융, 정부 | 스타트업~중견기업, 개발자 |

**Akamai 승리 논거 (Win Arguments)**
- "Cloudflare는 성장 중이지만, Akamai는 25년간 Fortune 500 미션크리티컬 환경에서 99.999% 가용성을 증명했습니다."
- "금융·의료 규제 준수(PCI-DSS, HIPAA) 엔터프라이즈 SLA는 Akamai가 독보적입니다."
- "전 세계 4,000+ PoP은 Cloudflare 300+ PoP 대비 마지막 마일(last-mile) 지연을 구조적으로 줄입니다."

**Akamai 취약 논거 (Vulnerability Arguments)**
- Cloudflare는 Workers·Pages·R2 등 개발자 플랫폼 생태계에서 앞서 있음
- 가격 경쟁력: Cloudflare Freemium 대비 Akamai는 소규모 고객 접근성 낮음

---

### 배틀카드 2: AWS CloudFront + Shield (Amazon)

| 항목 | Akamai | AWS CloudFront + Shield |
|------|--------|------------------------|
| 독립성 | 완전 독립 CDN/보안 벤더 | AWS 종속 번들 서비스 |
| 보안 깊이 | 전용 보안 플랫폼 (WAAP, ZTNA, DDoS) | Shield Standard/Advanced, WAF 별도 |
| 글로벌 커버리지 | 4,000+ PoP (공식) | 450+ PoP (공식) |
| 멀티클라우드 지원 | 클라우드 중립 | AWS 생태계 최적화 |
| 엔터프라이즈 보안 컴플라이언스 | 전문 보안팀·인증 다수 | AWS 공동 책임 모델 |

**Akamai 승리 논거**
- "AWS CloudFront는 AWS 내 워크로드에 최적화되어 있습니다. 멀티클라우드·온프레미스 하이브리드 환경에서는 Akamai가 벤더 중립적 선택입니다."
- "Shield Advanced는 DDoS 방어에 추가 비용이 발생하며, Akamai Prolexic은 단일 플랫폼에서 더 깊은 방어를 제공합니다."
- "AWS 종속은 협상력 약화 및 Lock-in 리스크를 수반합니다."

**Akamai 취약 논거**
- AWS 인프라 이미 사용 중인 고객은 CloudFront 통합 비용 낮음
- AWS 전체 스택 협상 시 번들 할인으로 가격 경쟁 불리

---

### 배틀카드 3: Fastly

| 항목 | Akamai | Fastly |
|------|--------|--------|
| 설립 | 1998 | 2011 |
| 핵심 포지셔닝 | 엔터프라이즈 CDN + 클라우드 보안 | 개발자 중심 엣지 클라우드 |
| 엣지 컴퓨팅 | EdgeWorkers | Compute@Edge (WebAssembly) |
| 캐시 제어 | 전통 CDN 모델 | 실시간 캐시 퍼지(즉각 반응) |
| 재무 안정성 | 흑자, 안정적 현금흐름 (공식) | 적자 지속 중 (추정) |
| 고객층 | 대기업·미션크리티컬 | 기술 중심 미디어·이커머스 |

**Akamai 승리 논거**
- "Fastly는 혁신적이지만 재무 안정성이 불확실합니다. 미션크리티컬 인프라에서 벤더 생존 리스크는 Akamai와 비교할 수 없습니다."
- "Akamai의 글로벌 PoP 밀도는 Fastly 대비 월등하며, 아시아·중동·아프리카 커버리지에서 특히 두드러집니다."

**Akamai 취약 논거**
- Fastly의 즉각적 캐시 퍼지(sub-second) 기능은 실시간 미디어 고객에게 매력적
- WebAssembly 기반 Compute@Edge는 개발자 경험 측면에서 앞서 있음

---

## 시장 지형 요약 (추정)

| 벤더 | CDN 강점 | 보안 강점 | 엣지 컴퓨팅 | 가격 경쟁력 | 엔터프라이즈 신뢰 |
|------|---------|---------|-----------|-----------|----------------|
| **Akamai** | ★★★★★ | ★★★★★ | ★★★★ | ★★★ | ★★★★★ |
| Cloudflare | ★★★★ | ★★★★ | ★★★★★ | ★★★★★ | ★★★★ |
| AWS CloudFront | ★★★★ | ★★★ | ★★★ | ★★★★ | ★★★★ |
| Fastly | ★★★★ | ★★★ | ★★★★★ | ★★★ | ★★★ |
| Azure CDN | ★★★ | ★★★ | ★★★ | ★★★★ | ★★★★ |

---

## 시장 트렌드 & 위협 (추정)

1. **Cloudflare의 SASE 확장** — 네트워킹+보안 통합 플랫폼으로 Akamai 코어 시장 잠식 위협
2. **하이퍼스케일러 번들링** — AWS/Azure/GCP가 CDN+보안을 번들로 제공하며 가격 압력 가중
3. **AI 기반 위협 탐지** — 경쟁사들의 AI/ML 보안 투자 가속화
4. **엣지 AI 수요** — EdgeWorkers 수요 증가, Akamai 포지셔닝 유리 (추정)
