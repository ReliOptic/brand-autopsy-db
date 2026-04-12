# 06. 채널별 운영 플레이북 — FORTINET (FTNT)

포티넷의 채널 전략은 **"웹사이트는 기술 도서관, FortiGuard는 미디어 엔진, 이벤트는 파이프라인 가속기, 파트너는 마지막 유통 채널"**로 요약된다. 각 채널의 역할이 분리되어 있고, 모든 경로는 결국 '파트너 영업 상담 또는 PoC 신청'이라는 단일 결제 지점으로 수렴한다. 이것이 엔터프라이즈 B2B 보안의 파이프라인 지리학이다.

## 채널 매트릭스

| 채널 | 포맷 | 발행 빈도 | 톤 | 주요 KPI | 목적 |
|------|------|-----------|-----|---------|------|
| 포티넷 공식 웹사이트 | 제품 페이지, 백서, 케이스 스터디, 데이터시트 | 주 3~5건 업데이트 | 격식, 기술 중심 | 유기 검색 순위, 백서 다운로드, PoC 신청 | Consideration + Decision |
| FortiGuard Labs (blog.fortinet.com) | 위협 분석, CVE 해설, 랜섬웨어 트래커 | 주 3~7건 | 기술 권위, 중립적 | 트래픽, 인용 언론사 수, 소셜 공유 | Awareness + Trust |
| LinkedIn (공식/한국 법인) | 기술 인사이트, 위협 뉴스, 이벤트 안내, 케이스 스터디 | 일 1~2회 | 전문적, 인사이트 중심 | 팔로워, 인게이지먼트율, 링크 클릭 | Awareness + Consideration |
| YouTube (Fortinet) | 제품 데모, 웨비나 녹화, NSE 교육 영상, 고객 인터뷰 | 주 1~3회 | 교육적, 실용적 | 시청 지속률, 구독자, 영상→문의 전환 | Consideration + Education |
| 이메일 뉴스레터 | FortiGuard 위협 리포트, 제품 업데이트, 이벤트 안내 | 월 2~4회 | 정보형, 세그먼트 기반 | 오픈율, 클릭률, 구독 해지율 | Retention + Nurture |
| 이벤트 (Security Summit, RSA, 파트너 데이) | 기조연설, 기술 세션, PoC 체험, 네트워킹 | 분기 주요 2~3개 | 임팩트형, 체험 중심 | 등록자 수, 리드 생성, NPS | Pipeline Acceleration |
| 파트너 포털 (Fortinet Partner Program) | 배틀카드, 세일즈 킷, NSE 교육, 마케팅 자료 | 월 업데이트 | 실용, 영업 지원 | 파트너 활성율, NSE 취득 수, 리드 등록 | Channel Enablement |

## 채널별 콘텐츠 배합 비율

콘텐츠 필러(04-content-dna.md: ①위협 인텔리전스 ②제품/기술 백서 ③케이스 스터디 ④NSE 교육 ⑤이벤트/웨비나)의 채널별 분배:

| 채널 | 위협 인텔리전스 | 기술 백서 | 케이스 스터디 | NSE 교육 | 이벤트 |
|------|--------------|----------|-------------|---------|--------|
| 공식 웹사이트 | 15% | 40% | 25% | 10% | 10% |
| FortiGuard Labs | 75% | 20% | — | — | 5% |
| LinkedIn | 35% | 20% | 30% | 5% | 10% |
| YouTube | 10% | 30% | 20% | 35% | 5% |
| 이메일 뉴스레터 | 30% | 25% | 25% | 10% | 10% |
| 이벤트 | 20% | 20% | 20% | 10% | 30% |
| 파트너 포털 | 10% | 35% | 25% | 20% | 10% |

**관찰**: FortiGuard Labs는 위협 인텔리전스 75%로 독립 미디어처럼 운영된다 — 브랜드 광고가 아니라 '보안 저널'로 포지셔닝해야 신뢰가 쌓인다. 반면 공식 웹사이트는 기술 백서 40%로 '구매 직전 근거 자료 창고' 역할에 집중한다. **채널 깊이와 영업 파이프라인 거리의 반비례 — 이것이 포티넷 채널 플래닝의 핵심 규칙이다.**

## 발행 스케줄 템플릿 (주간)

| 요일 | 채널 | 콘텐츠 유형 |
|------|------|-------------|
| 월 | LinkedIn + 이메일 | "이번 주 주목할 위협" FortiGuard 위협 요약 + 링크 |
| 화 | 공식 웹사이트 + FortiGuard Labs | 신규 취약점 분석 또는 기술 백서 발행 |
| 수 | YouTube + LinkedIn | 제품 데모 또는 웨비나 녹화 공개 + LinkedIn 클립 |
| 목 | 파트너 포털 | 파트너 배틀카드 업데이트, 신규 세일즈 킷 배포 |
| 금 | LinkedIn + FortiGuard Labs | 주간 위협 인텔리전스 정리 리포트, 주말 전 고위험 CVE 요약 |
| 격주/월간 | 이메일 뉴스레터 | 위협 트렌드 + 제품 업데이트 + 다음 이벤트 안내 세트 |
| 분기 | Security Summit | 기조연설 + 기술 세션 + PoC 체험 + 파트너 네트워킹 |

## 해시태그 전략

### LinkedIn
- **브랜드 태그 (고정)**: #Fortinet #SecurityFabric #FortiGuard #NetworkSecurity
- **기술 태그**: #ZTNA #SASE #SDwan #OTSecurity #XDR #RansomwareProtection
- **시즌/이벤트 태그**: #RSAConference #GartnerSecurity + 해당 이벤트 해시태그
- **케이스 스터디 시**: 고객사 업종 태그 병기 (#FinancialSecurity #ManufacturingSecurity)

### YouTube
- 제목에 "[Fortinet]" 프리픽스 + 기술 키워드 포함
- 설명란 첫 줄에 관련 제품 페이지·데이터시트 링크
- 태그: #Fortinet #FortiGate + 제품명 + 기술 카테고리

### 이벤트/OOH
- 로고 + "Securing People, Devices, and Data Everywhere" 슬로건 고정
- QR 코드 우하단 배치: PoC 신청 또는 이벤트 랜딩 페이지

## 배포 도구 & 운영
- **CMS**: 포티넷 공식 CMS + FortiGuard Labs 전용 퍼블리싱 툴
- **마케팅 자동화**: Marketo/Salesforce Pardot 기반 이메일 세그먼트 자동화 (업종·리드 스코어 기반) (추정)
- **파트너 포털**: Fortinet Engage Partner Program 전용 포털. NSE 교육·배틀카드·공동 마케팅 펀드 관리
- **광고**: LinkedIn Sponsored Content (CISO·IT Director 타겟), Google Search (보안 솔루션 키워드), 국내 IT 미디어(데이터넷·보안뉴스) 스폰서
- **최적 발행 시간** (추정): 평일 오전 9시(업무 시작), 점심 12시(LinkedIn 피크), 화·수요일이 LinkedIn B2B 인게이지먼트 최고

## 성과 측정 주기
- **일간**: FortiGuard Labs 트래픽, LinkedIn 인게이지먼트, CVE 반응률
- **주간**: 백서 다운로드 수, PoC 신청 수, 이메일 오픈율, YouTube 시청 지속률
- **월간**: MQL(마케팅 적격 리드) 수, 채널별 파이프라인 기여도, NSE 신규 취득자 수
- **분기**: 이벤트 리드 ROI, 파트너 활성율, 브랜드 서치 증감, Gartner Peer Insights 리뷰 수
- **연간**: 시장 점유율(방화벽·SD-WAN·SASE), FortiGuard 구독 갱신율, 파트너 등급별 GMV 기여

**종합 원칙**: 포티넷의 채널은 각자 다른 깊이로 말하지만, 모든 경로가 '파트너 영업 상담 또는 PoC 신청'이라는 하나의 파이프라인 진입점으로 수렴한다. FortiGuard가 위협의 언어로 문을 열고, 기술 백서의 숫자가 거래를 닫는다. 엔터프라이즈 B2B 파이프라인의 정석은 결국 **"다른 채널 깊이, 같은 영업 깔때기"**다.
