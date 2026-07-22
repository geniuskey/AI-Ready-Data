# AI-Ready Data

DX와 데이터 표준화가 충분하지 않은 조직도 안전하게 AI를 시작할 수 있도록 돕는
한국어 실전 위키입니다. 이메일, Word/PPT/PDF, Excel, 회의 기록, EDM에 흩어진
정보를 외부 반출 없이 발견하고 정돈해 신뢰할 수 있는 AI 근거로 만드는 과정을
다룹니다.

## 빠른 시작

Node.js 22 이상을 설치한 뒤 저장소 루트에서 실행합니다.

```powershell
npm ci
npm run docs:dev
```

브라우저에서 `http://127.0.0.1:5173/AI-Ready-Data/`를 열면 됩니다.

## 구성

- `docs/`: 위키의 유일한 콘텐츠 원본(SSoT)
- `docs/.vitepress/`: 내비게이션·테마·Vue 시각화와 렌더링 설정
- `docs/public/downloads/`: 사용자가 내려받는 CSV 템플릿과 레퍼런스 카탈로그
- `package.json`·`package-lock.json`: Node.js 의존성과 재현 가능한 잠금 파일
- `scripts/validate-docs.mjs`: 문서 계약·링크·사례 표시·민감정보 검사
- `.github/workflows/pages.yml`: 검증, VitePress 빌드, GitHub Pages 배포

레퍼런스 탐색기, 준비도 진단과 경영효과 계산기는 Vue 컴포넌트이며 입력값을 외부로
전송하지 않습니다. 문서 페이지와 검색 인덱스는 정적 파일로 생성됩니다.

문서의 추천 학습 경로는 **정의 → 준비도 진단 → 90일 로드맵 → 거버넌스와
보안 → 원천별 플레이북 → 파이프라인과 RAG 운영**입니다. 급한 문제가 있다면
사이트 검색이나 원천별 플레이북에서 바로 시작해도 됩니다.

## 검증

```powershell
npm ci
npm run check
```

의존성을 변경할 때는 `npm install <패키지>` 또는 `npm uninstall <패키지>`를 사용하고,
함께 갱신된 `package.json`과 `package-lock.json`을 모두 커밋합니다.

## GitHub Pages 배포

1. 저장소의 **Settings → Pages → Build and deployment → Source**에서 최초 한 번
   `GitHub Actions`를 선택합니다.
2. `main`에 변경이 푸시되면 `.github/workflows/pages.yml`이 문서 검증과 엄격 빌드를
   거쳐 `https://geniuskey.github.io/AI-Ready-Data/`에 배포합니다.
3. 외부 링크는 별도의 주간 워크플로가 점검하며, 외부 사이트의 일시 장애는 배포를
   막지 않고 보고만 합니다.

GitHub Pages는 공개 사이트입니다. 실제 사내 문서·메일·경로·개인정보는 이 저장소에
커밋하지 마세요.

## 라이선스

`docs/`의 문서·도표·템플릿은 [CC BY 4.0](LICENSE-CONTENT), 구성·검증 스크립트와
예제 코드는 [MIT](LICENSE-CODE)로 제공합니다. 외부 자료는 각 원출처의 조건을
따릅니다.
