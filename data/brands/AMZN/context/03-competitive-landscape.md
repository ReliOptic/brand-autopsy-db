# 03 경쟁 환경 분석 — Amazon (AMZN)

> (공식) = 공개 자료 기반 / (추정) = 분석 추정

---

## 1. 경쟁 구도 개요

Amazon은 단일 산업이 아닌 **다층 산업**에서 동시에 경쟁한다.

| 사업 축 | 주요 경쟁자 |
|--------|-----------|
| 이커머스 | Walmart, Target, Shopify, Alibaba, Temu |
| 클라우드 (AWS) | Microsoft Azure, Google Cloud (GCP) |
| 광고 | Google, Meta |
| 스트리밍 | Netflix, Disney+, Apple TV+ |
| AI/LLM 인프라 | Microsoft (OpenAI 파트너), Google DeepMind |
| 스마트 홈 | Apple (HomeKit), Google (Nest) |

---

## 2. 이커머스 배틀카드

### 배틀카드 1: Amazon vs. Walmart

| 항목 | Amazon | Walmart |
|------|--------|---------|
| 강점 | Prime 생태계, 셀렉션 깊이, 배송 네트워크 | 오프라인 결합, 식품·생필품, 가격 경쟁력 |
| 약점 | 식품·신선식품 약세, 물리 접점 제한 | 온라인 UX 열세, 프리미엄 이미지 부재 |
| 시장 점유 | 미국 이커머스 약 38% (추정) | 미국 이커머스 약 6% (추정) |
| 핵심 무기 | FBA 물류 인프라, Prime 구독 번들 | Walmart+ 멤버십, 오프라인 픽업 |
| 고객 인식 | "편리함·속도" | "저렴함·신뢰" |
| 취약 노출점 | 가품 문제, 수수료 인상 | 온라인 전환 속도 |
| **Amazon 권장 대응** | Prime 혜택 강화, AmazonFresh 확대 | — |

**Steal Sheet — Walmart 대응 3종**
1. Prime 무료 배송 범위를 신선식품까지 확대하여 Walmart의 식품 강점을 흡수
2. Whole Foods 매장을 라스트마일 허브로 활용, 오프라인 접점 열세 보완
3. Walmart+ 대비 Prime 번들 가치(Video·Music·Reading)를 광고에서 직접 비교 소구

---

### 배틀카드 2: Amazon vs. Shopify

| 항목 | Amazon | Shopify |
|------|--------|---------|
| 강점 | 트래픽·신뢰·물류 인프라 | 브랜드 자율성, D2C 특화, 낮은 수수료 |
| 약점 | 셀러 통제권 제한, 브랜드 독립성 훼손 | 자체 트래픽 없음, 물류 의존도 |
| 전략 | 플랫폼 의존도 강화 | 탈아마존 지원 |
| 핵심 무기 | Buy with Prime (Shopify 탈출 방지) | Shop Pay 전환율, Shopify Fulfillment |
| 고객 인식 | "규모와 신뢰" | "자유와 자립" |
| 취약 노출점 | 셀러 이탈 위험 | 대형 브랜드 유치 한계 |
| **Amazon 권장 대응** | Buy with Prime 확산, Seller Tools 고도화 | — |

**Steal Sheet — Shopify 대응 3종**
1. Buy with Prime 버튼을 Shopify 스토어에 삽입, 셀러가 Amazon 트래픽 유지하면서 독립 스토어도 운영 가능하게 함으로써 이탈 인센티브 제거
2. FBA 수수료 계층 재설계 — 소규모 D2C 브랜드에 할인 수수료 제공, Shopify Fulfillment 대체
3. Amazon Brand Registry 강화로 지적재산권 보호 강조, D2C 브랜드의 신뢰 우려 해소

---

## 3. 클라우드 배틀카드

### 배틀카드 3: AWS vs. Microsoft Azure

| 항목 | AWS | Azure |
|------|-----|-------|
| 시장 점유 | 약 31% (추정, 2025 기준) | 약 25% (추정) |
| 강점 | 서비스 깊이·폭, 글로벌 리전 수, DevOps 생태계 | Microsoft 엔터프라이즈 통합(AD, Office365), OpenAI 독점 |
| 약점 | 가격 복잡성, 기업 기존 Microsoft 통합 약세 | 오픈소스 생태계 비교 열세 |
| AI 포지션 | Bedrock (Anthropic 파트너), SageMaker | Azure OpenAI Service (GPT 독점 계약) |
| 핵심 무기 | 서비스 수(240+), 파트너 ISV 생태계 | Microsoft 기존 고객 번들, Teams/Copilot 연계 |
| 취약 노출점 | OpenAI GPT 시리즈 비독점 | 글로벌 리전 수 열세 |
| **AWS 권장 대응** | Anthropic·Claude 기반 AI 서비스 차별화, 기업 마이그레이션 인센티브 강화 | — |

**Steal Sheet — Azure 대응 3종**
1. AWS Bedrock에 Claude 모델을 전면 통합, GPT 의존 기업에 "모델 다양성 + 비용 최적화" 메시지로 어필
2. AWS Migration Acceleration Program (MAP) 확대 — Azure 이탈 기업에 크레딧·컨설팅 제공
3. Microsoft 365 대체 도구(Amazon WorkDocs·WorkMail)보다는 통합보다는 AI 인프라 레이어에서 승부 — "우리는 경쟁이 아닌 기반"으로 포지셔닝

---

## 4. 포지셔닝 매트릭스

```
              [기술 혁신 높음]
                    |
          AWS ------+------ GCP
                    |
[엔터프라이즈]-----+-----[개발자·스타트업]
                    |
          Azure ----+---- DigitalOcean
                    |
              [기술 혁신 낮음]
```

```
              [저가격]
                    |
         Temu ------+------ Alibaba
                    |
[셀렉션 좁음]------+------[셀렉션 넓음]
                    |
        Walmart ----+------ Amazon
                    |
              [고가격/프리미엄]
```

---

## 5. 시장 점유율 스냅샷 (추정, 2025)

### 미국 이커머스

| 브랜드 | 점유율 |
|--------|--------|
| Amazon | ~38% |
| Walmart | ~6% |
| Apple | ~4% |
| eBay | ~3% |
| Target | ~2% |
| 기타 | ~47% |

### 글로벌 클라우드 인프라

| 브랜드 | 점유율 |
|--------|--------|
| AWS | ~31% |
| Azure | ~25% |
| GCP | ~11% |
| 기타 | ~33% |

---

## 6. 위협 시나리오

| 위협 | 가능성 | 임팩트 | Amazon 대응 |
|------|--------|--------|------------|
| 반독점 규제 분리 명령 | 중간 (추정) | 매우 높음 | 사업부 법인화 구조 준비 |
| Temu·Shein의 저가 공세 | 높음 | 중간 | Amazon Haul 런칭 (추정) |
| Azure OpenAI 생성 AI 독주 | 중간 | 높음 | Bedrock + Anthropic 투자 가속 |
| 셀러 집단 이탈 | 낮음 | 높음 | 수수료 안정화, 셀러 도구 강화 |
