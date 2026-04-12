# 05. 디자인 시스템 명세 — FORTINET (FTNT)

포티넷 디자인 시스템의 원칙은 한 문장이다: **"위협은 붉고, 신뢰는 어둡고, 해결은 밝다."** CSS 분석 결과 레드(#DA291C 계열)가 압도적 1위(사용 빈도 23회)이며, 딥 네이비·다크 블랙 계열이 베이스를 형성한다. 청록(#1C8388)이 포티넷 고유의 기술 신뢰 컬러로 작동하고 있다. 이 3색 체계가 사이버보안 브랜드의 시각 문법을 정의한다.

## 컬러 팔레트

| 용도 | 색상명 | HEX | 사용 빈도 | 출처 | 사용처 |
|------|--------|-----|-----------|------|--------|
| Primary Brand | Fortinet Red | #DA291C | 23회 | (공식) | 로고, CTA 버튼, 경고 배지, 헤드라인 강조, 탐색 메뉴 활성 |
| Primary Brand Alt | Signal Red | #DB2D27 | 8회 | (공식) | 버튼 호버, 알림 배지, 위협 심각도 High 레이블 |
| Secondary | Tech Teal | #1C8388 | 6회 | (공식) | FortiGuard 섹션, 기술 다이어그램 어센트, 링크 색상, 성공 상태 |
| Base Dark | Midnight | #02121D | 6회 | (공식) | 히어로 배경, 다크 섹션, 보안 대시보드 UI 배경 |
| Neutral Light | Silver Mist | #DCDCDC | 4회 | (공식) | 구분선, 비활성 UI 요소, 폼 테두리 |
| Neutral Soft | Pearl | #EDECEC | 3회 | (공식) | 카드 배경, 섹션 분리, 밝은 영역 기반 |
| Brand Dark Navy | Abyss | #00173B | 3회 | (공식) | 풀-다크 헤더, 사이드바, 보안 위협 맵 배경 |
| Base Black | Void | #02060C | 3회 | (공식) | 최심부 배경, 터미널 스타일 코드 블록 |
| Deep Red | Ember | #B82F1D | 3회 | (공식) | 위협 위험도 Critical 레이블, 에러 상태, 경고 배너 |
| Text Dark | Carbon | #222222 | 2회 | (공식) | 본문 텍스트, 기술 문서 내용 |
| Accent Blue | Link Blue | #307FE1 | 2회 | (추정) | 하이퍼링크, 정보형 알림, 클라우드 보안 섹션 |
| Slate | Steel | #323E48 | 2회 | (공식) | 중간 톤 배경, UI 컴포넌트 테두리 |
| Green Success | Cipher Green | #3CB17E | 2회 | (추정) | 보안 상태 OK, 탐지 성공 레이블, FortiGuard 클린 판정 |
| White | Clean | #FFFFFF | — | (공식) | 기본 배경, 데이터시트, 백서 본문 배경 |

**사용 규칙**:
- 레드(#DA291C)는 로고·CTA·위협 알림의 3가지 역할만 담당한다. 장식용 사용 금지
- 다크 배경(#02121D, #00173B)은 히어로·기술 섹션에만. 장문 백서·데이터시트는 흰 배경 기본
- Tech Teal(#1C8388)은 FortiGuard·AI 기능·성공 상태에 제한 사용 — 남용 시 브랜드 레드와 충돌
- 그라데이션은 히어로 배너에만 허용: #02121D → #00173B 다크 계열 수직 그라데이션

## 타이포그래피

| 용도 | 폰트 | Weight | 사이즈 규칙 |
|------|------|--------|-------------|
| 헤드라인 | fortinetone (전용) / Inter | Bold (700) | 웹 히어로 40~56px / 섹션 타이틀 28~36px |
| 서브 헤드 | Inter / HelveticaNeueW01-55Roma | SemiBold (600) | 웹 20~24px / 데이터시트 16~18px |
| 본문 (영문) | Inter-Regular / Arial | Regular (400) | 14~16px, 행간 1.6 |
| 본문 (한국어) | Noto Sans JP (대체) / 시스템 sans-serif | Regular (400) | 14~16px, 행간 1.7 |
| 숫자·통계 강조 | Inter | Bold (700) | 기술 수치 강조 시 본문보다 +4px, 레드 또는 테일 컬러 |
| 코드·명령어 | Monospace (시스템) | Regular | 13px, #02060C 배경 코드블록 |
| 로고 워드마크 | fortinetone (전용) | — | "FORTINET" 균일 자간, 레드 단색 또는 흰색 반전 |

**원칙**: 헤드라인은 fortinetone 전용체 우선. 가용 불가 환경에서 Inter 대체. Baskerville은 법적 문서·아카데믹 레포트 등 격식 문맥에만 제한 사용. 한국어 콘텐츠는 Noto Sans JP 계열 또는 시스템 sans-serif. 폰트 3종 이상 혼용 금지.

## 채널별 규격

| 채널 | 사이즈 (px) | 안전영역 마진 | 비고 |
|------|------------|--------------|------|
| 웹 히어로 배너 | 1920 × 800 | 상하 80px, 좌우 160px | 다크 배경, 레드 CTA 버튼 우측 배치 |
| 데이터시트 PDF | A4 (210×297mm) | 사방 20mm | 흰 배경, 좌측 레드 사이드바 3mm |
| LinkedIn 피드 이미지 | 1200 × 627 | 상하좌우 60px | 포티넷 레드 배경 또는 다크 배경 |
| LinkedIn 문서 슬라이드 | 1080 × 1080 | 사방 80px | 기술 다이어그램 중심, 숫자 강조 |
| 웨비나 슬라이드 | 1920 × 1080 | 상하 80px | 다크 배경, 레드 강조선, 로고 우하단 |
| 유튜브 썸네일 | 1280 × 720 | 우하단 120px | 레드 배지 + 위협 키워드 7자 이내 |
| 이메일 헤더 | 600 × 200 | 상하 20px | 흰 배경, 레드 로고, 네이비 서브헤드 |
| 이벤트 배너 (오프라인) | 가변 | 사방 10% | 다크 배경, 포티넷 레드 로고, 파트너 로고 우하단 |

## 레이아웃 원칙
- **"위협은 크게, 해결은 명확하게"** — 위협 수치·공격 건수는 화면 중앙 대형 타입. 솔루션 CTA는 레드 버튼 단일 포인트
- **격자**: 8pt grid. 여백은 8·16·24·40·64·96 배수만 사용
- **정렬**: 좌측정렬 기본. 히어로 섹션만 중앙정렬 허용
- **위계**: 위협 수치 > 제품명 > 기능 설명 > 케이스 스터디 > CTA
- **텍스트 vs 이미지**: 기술 백서 60:40 / 랜딩페이지 40:60 / 이벤트 배너 30:70
- **다크/라이트 분리**: 히어로·기술 섹션은 다크(#02121D), 기능 설명·케이스 스터디는 라이트(#FFFFFF/#EDECEC)

## 아이콘 & 다이어그램 스타일
- **아이콘**: 2px 라인 아이콘, 모서리 4px 둥글기. 보안·네트워크·클라우드 유니버설 기호 중심
- **컬러**: Tech Teal(#1C8388) 기본, 위협/에러는 레드(#DA291C), 성공/클린은 Green(#3CB17E)
- **아키텍처 다이어그램**: 수평 플로우 기본. FortiGate 중심에 Security Fabric 연결선 방사형. 배경 다크(#00173B), 연결선 테일 컬러
- **위협 맵**: 세계 지도 다크 배경, 공격 발원지 레드 펄스 애니메이션, 차단 성공 테일 컬러

## AI 이미지 생성 프롬프트 가이드
```
스타일 키워드: cybersecurity dashboard, network topology, dark enterprise UI, threat visualization, professional B2B
톤: dark navy background, red accent highlights, teal technical elements, clean data visualization
금지 요소: stock photo hackers, skull/danger stereotypes, neon glow excess, consumer lifestyle imagery, cartoon elements
선호 요소: abstract network nodes, data flow lines, shield iconography, server rack visualization, global threat map
타이포 합성: Inter Bold for statistics, fortinetone for headlines, tabular numerals for threat counts
```

## 디자인 금지사항
- 만화적 해커 이미지(후드티+해골) — 진부하고 신뢰 훼손
- 레드 외의 원색(노랑·초록·파랑) 포인트를 로고 색상처럼 사용
- 폰트 3종 이상 혼용, 특히 손글씨·장식체
- 텍스트 drop shadow, outer glow, bevel 효과
- 로고 왜곡·회전·레드 외 컬러 변경
- 포티넷 레드 배경에 레드 텍스트 (가독성 0)
- 기술 다이어그램에 3D 렌더링 플라스틱 질감
- 무지개·파스텔 그라데이션 배경
- 위협 심각도 색상 역전 (Critical을 초록으로 표시하는 등)
