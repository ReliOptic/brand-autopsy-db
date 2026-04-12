# 05. 디자인 시스템 명세 — Adobe Inc. (ADBE)

## 컬러 팔레트

Adobe의 브랜드 컬러 시스템은 크게 두 레이어로 구성된다. (1) 제품 UI·마케팅 공통의 **Adobe Spectrum** 디자인 시스템 컬러, (2) 크리에이티브 마케팅 캠페인에서 쓰이는 **브랜드 레드(Adobe Red)** 중심 팔레트. 두 레이어가 분리되어 운영된다.

| 용도 | 색상명 | HEX | (공식)/(추정) | 사용처 |
|------|--------|-----|---------------|--------|
| Primary Brand | Adobe Red | `#FF0000` | (공식) | 로고, 기업 아이덴티티 최상위. 오직 Adobe 로고와 최고 강조에만 사용 |
| Primary Brand (정확 로고 색) | Adobe Red (Pantone 485C 기반) | `#FA0F00` | (추정, Pantone 485C ≈ FA0F00) | 공식 브랜드 가이드 상 Pantone 485. 디지털 대응값 근사치 |
| Primary Action | Spectrum Blue | `#1473E6` | (공식, Adobe Spectrum) | CTA 버튼, 링크, 인터랙티브 요소. Creative Cloud 앱 UI 전반 |
| Primary Action Hover | Spectrum Blue Dark | `#0D66D0` | (공식, Adobe Spectrum) | Hover 상태. Action Blue보다 한 단계 어둡게 |
| Background / Surface | White | `#FFFFFF` | (공식) | 메인 마케팅 배경, 제품 UI 기본 캔버스 |
| Background Dark | Spectrum Gray 900 | `#1E1E1E` | (공식, Adobe Spectrum) | Dark mode 배경, Premiere·After Effects UI 기본 다크 테마 |
| Text Primary | Near Black | `#2C2C2C` | (공식, Adobe Spectrum, Gray 900 계열) | 본문 텍스트, 헤드라인 |
| Text Secondary | Gray | `#6E6E6E` | (공식, Adobe Spectrum, Gray 500 계열) | 캡션, 보조 설명 텍스트 |
| Surface Neutral | Light Gray | `#F5F5F5` | (공식, Adobe Spectrum, Gray 75 계열) | 카드 배경, 섹션 구분, 폼 필드 배경 |
| Success / Positive | Green | `#268E6C` | (공식, Adobe Spectrum) | 성공 상태, 완료 알림, 긍정 데이터 시각화 |
| Error / Negative | Spectrum Red | `#C9252D` | (공식, Adobe Spectrum) | 에러 상태, 경고 메시지. 브랜드 레드(#FA0F00)와 혼용 금지 |
| Warning | Amber | `#E68619` | (공식, Adobe Spectrum) | 주의 메시지, 중간 경고 |
| Firefly Gradient Start | Purple | `#7B2FF7` | (추정, Firefly 마케팅 비주얼 기반) | Firefly AI 제품 마케팅 그라데이션 시작색 |
| Firefly Gradient End | Pink/Magenta | `#F24FF4` | (추정, Firefly 마케팅 비주얼 기반) | Firefly AI 제품 마케팅 그라데이션 끝색 |
| Creative Cloud Badge | CC Red | `#DA1F26` | (추정, Creative Cloud 로고 색상 근사치) | Creative Cloud 앱 아이콘 공통 배경색 계열 |

### 컬러 운영 원칙
- **Adobe Red는 로고 전용**: `#FA0F00` 계열의 브랜드 레드는 로고·최상위 아이덴티티에만. CTA 버튼에 레드를 쓰면 '위험·에러' 연상 유발 — CTA는 반드시 Spectrum Blue
- **다크 UI가 기본인 영상·음악 앱**: Premiere Pro·After Effects·Audition·Lightroom Classic은 기본 다크 테마(`#1E1E1E` 계열). 사진 편집 정확도를 위한 환경 설계
- **Firefly 그라데이션은 AI 전용 맥락으로만**: Purple→Magenta 그라데이션은 Firefly·AI 기능 프로모션에만 사용. 일반 블로그·UI에 남발 금지
- **Adobe Spectrum은 공개 오픈소스**: `spectrum.adobe.com`에서 전체 색상·컴포넌트 토큰 공개 (공식). 외부 개발자·파트너도 사용 가능

## 타이포그래피

Adobe는 자체 오픈소스 폰트 패밀리 **Adobe Source Sans / Source Serif / Source Code Pro**를 보유하며, 마케팅에서는 더 기하학적인 **Adobe Clean**을 주력으로 사용한다.

| 용도 | 폰트 | Weight | 사이즈 규칙 |
|------|------|--------|-------------|
| 마케팅 헤드라인 | Adobe Clean (독점, 공식) | ExtraBold / Bold | Desktop 48~80px / Mobile 32~48px |
| 서브 헤드라인 | Adobe Clean | SemiCondensed Bold | 24~36px |
| 본문 (마케팅) | Adobe Clean | Regular (400) | 16~18px, line-height 1.5 |
| 제품 UI (Spectrum) | Adobe Clean / System-UI fallback | Regular / Medium | 14~16px, line-height 1.4 |
| 코드 / 개발자 문서 | Source Code Pro (공식, 오픈소스) | Regular | 13~14px, monospace |
| 오픈소스 대체 (마케팅) | Source Sans 3 (공식, Google Fonts 배포) | Regular / Bold | 본문 대체 |
| 한국어 대체 | Noto Sans KR / Spoqa Han Sans Neo | Regular / Bold | Adobe Clean과 line-height 1.5 매칭 |

### 타이포 운영 원칙
- **Adobe Clean = 브랜드 전용체**: 마케팅·광고·제품 UI 전반에 Adobe Clean 사용. 외부 공개 라이선스 없음 — 파트너·에이전시에게 별도 제공
- **Source 패밀리는 오픈소스 증거**: Source Sans·Source Serif·Source Code Pro를 오픈소스로 공개한 것은 "Adobe = 크리에이티브 커뮤니티를 위한 기업"이라는 브랜드 행동의 증거
- **사이즈는 과감하게**: MAX 키 비주얼·Creative Cloud 홈페이지의 헤드라인은 80~120px 대형 타이포. '크리에이티브 대담함'을 타이포로 표현
- **최대 2종 혼용**: 마케팅 자산에서 Adobe Clean + Source Code Pro(코드 문맥) 조합이 한계. 3종 이상 혼용 금지

## 채널별 규격

| 채널 | 사이즈 (px) | 안전영역 마진 | 비고 |
|------|------------|--------------|------|
| 웹사이트 Hero | 1440 × 900 (desktop) / 390 × 844 (mobile) | 좌우 80px / 20px | 반응형. Hero는 풀블리드 또는 Adobe Red·Black 배경 |
| Adobe MAX 키 비주얼 | 1920 × 1080 | 중앙 세이프존 60% | 키노트·OOH·SNS 헤더 공통 마스터. 대형 타이포 중심 |
| Adobe Summit 키 비주얼 | 1920 × 1080 | 중앙 세이프존 65% | 붉은 계열 배경 + 비즈니스 톤 타이포 |
| Blog / Article Header | 1600 × 800 | 상단 60px | MadeWithAdobe 아티스트 작품 또는 제품 UI 스크린샷 |
| YouTube 썸네일 | 1280 × 720 | 우하단 180px | 아티스트 얼굴·작품 + 짧은 타이틀. Adobe Red 강조 가능 |
| Instagram Post | 1080 × 1080 (1:1) / 1080 × 1350 (4:5) | 상하 80px | MadeWithAdobe 갤러리, Firefly 결과물 릴스 |
| Instagram Stories | 1080 × 1920 | 상하 250px (UI 안전영역) | MAX 하이라이트, Firefly 기능 소개 |
| Twitter/X 헤더 | 1500 × 500 | 중앙 80% | MAX/Summit 시즌 변경. Adobe Red 배경 자주 사용 |
| LinkedIn 배너 | 1584 × 396 | 좌우 100px | B2B 포지션 강조. Experience Cloud·Firefly 로고 배치 |
| App Store / Play Store 아이콘 | 1024 × 1024 | 내부 콘텐츠 80% | 앱별 고유 색상 (Ps=Blue, Ai=Orange, Pr=Purple 등, 공식) |

## 레이아웃 원칙
- **여백은 크리에이티브 자신감**: Adobe 마케팅 사이트는 섹션 간 120~160px 패딩. "정보 밀집" 대신 "크리에이티브 공간감"
- **그리드**: 12칼럼 데스크톱 / 4칼럼 모바일. 최대 컨테이너 1440px, 좌우 80px 거터
- **제품 UI 스크린샷을 전면에**: Figma처럼 Adobe도 제품 인터페이스를 숨기지 않는다. Photoshop·Premiere 스크린샷이 Hero에 등장하는 것이 표준
- **다크/라이트 전환**: 크리에이티브 앱(Premiere·After Effects)은 다크 배경, 문서·마케팅(Acrobat·Express)은 라이트 배경이 기본
- **앱별 고유 색상 코딩**: Photoshop(#31A8FF), Illustrator(#FF9A00), Premiere Pro(#9999FF), After Effects(#9999FF 근사), Acrobat(#FF0000) — 앱 아이콘 컬러는 공식, 정확한 HEX는 근사

## 아이콘 & 일러스트 스타일
- **앱 아이콘**: 각 앱의 두 글자 이니셜(Ps, Ai, Pr, Ae 등)을 앱별 고유 색상 배경 위에 Adobe Clean Bold로 배치. 극도로 단순하고 즉각 식별 가능
- **마케팅 일러스트**: 추상적 그라데이션·빛 번짐·색상 스플래시를 활용한 '크리에이티브 에너지' 비주얼. 특히 MAX·Firefly 캠페인에서 빛과 색의 폭발적 표현
- **사진 선택**: 크리에이터가 실제 작업하는 순간을 담은 사진. 다양성 필수(인종·성별·연령). 완성된 결과물보다 '만드는 과정'을 촬영
- **Firefly 비주얼**: 보라-핑크 그라데이션 배경에 Firefly 생성 결과물 병치. 'Before Firefly / After Firefly' 대비 포맷 자주 사용

## AI 이미지 생성 프롬프트 가이드 (Firefly 활용 시)
```
스타일 키워드: vibrant, professional photography aesthetic, cinematic color grading, creative studio environment
분위기: bold, ambitious, craft-forward, inspirational, human-centered creativity
색상: Adobe brand palette (Red #FA0F00, Blue #1473E6), with Firefly gradient accents (Purple #7B2FF7 to Magenta #F24FF4) for AI-specific visuals
구도: 크리에이터가 작업에 몰입하는 순간, 완성된 비주얼 결과물, 협업하는 다양한 팀
금지 요소: 클립아트 스타일, 어색한 인물 손·손가락 (Firefly 품질 이슈), 과도하게 깔끔한 기업 사진관 느낌, 단일 인종·성별 편중
선호 요소: 작업 과정에서의 집중, 빛과 색의 폭발적 에너지, 실제 Photoshop/Premiere 화면이 배경에 보이는 환경, 다양한 체형·인종의 크리에이터
```

## 디자인 금지사항
- **브랜드 레드를 CTA 버튼에 사용**: `#FA0F00`은 에러·위험 연상. 버튼은 반드시 Spectrum Blue(`#1473E6`)
- **Adobe Spectrum 외 비표준 색상**: 임의 색상을 UI에 추가하면 접근성(WCAG AA) 기준 충족 여부 불명확
- **Adobe Clean 폰트 무단 외부 배포**: 라이선스 제한. 파트너에게는 PDF·이미지로만 전달
- **앱 아이콘 색상 임의 변경**: Photoshop은 반드시 파란 계열, Illustrator는 오렌지 계열. 비공식 색상 조합 금지
- **Firefly 그라데이션을 일반 콘텐츠에 남발**: AI 전용 맥락 외 사용 시 Firefly 제품 정체성 희석
- **다크 앱 UI를 라이트 배경에 부적절하게 배치**: Premiere·After Effects 스크린샷은 다크 배경 또는 중립 배경 위에서만
- **3D 글로시 렌더링 남발**: Adobe 마케팅의 주력은 사진·일러스트·실제 UI. 과도한 CGI·글로시 3D는 '가짜 혁신' 이미지 유발
- **저해상도 압축 이미지 사용**: 크리에이티브 품질의 회사로서 자사 마케팅 자산의 이미지 품질 타협 금지

### Steal Sheet

Adobe 디자인 시스템의 핵심 인사이트: **"디자인 시스템을 오픈소스로 공개하면 파트너 생태계가 자동으로 브랜드를 확장한다."** Adobe Spectrum(`spectrum.adobe.com`)을 공개 오픈소스로 배포함으로써, 수천 개의 Adobe 파트너·통합 앱이 Adobe와 시각적으로 일관된 경험을 구현한다. B2B SaaS의 디자인 시스템 공개는 단순한 개발자 친화 제스처가 아니라 브랜드 일관성을 파트너 생태계 전체로 확장하는 전략이다.
