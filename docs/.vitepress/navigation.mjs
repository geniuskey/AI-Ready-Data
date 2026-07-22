export const nav = [
  { text: '시작', link: '/' },
  { text: '실행 워크벤치', link: '/workbench/' },
  { text: '진단·로드맵', link: '/01-assess/readiness' },
  { text: 'Data Ready', link: '/data-ready/' },
  { text: 'Knowledge Ready', link: '/knowledge-ready/' },
  { text: 'AI 활용', link: '/ai-use/' },
  {
    text: '실습·세미나',
    items: [
      { text: '75분 종단간 실습', link: '/practice/' },
      { text: '세미나 슬라이드', link: '/seminar/' }
    ]
  },
  { text: '사례', link: '/06-cases/' },
  {
    text: '자료',
    items: [
      { text: '용어사전', link: '/reference/glossary' },
      { text: '실전 템플릿', link: '/templates/' },
      { text: '근거·참고문헌', link: '/reference/sources' }
    ]
  }
]

export const sidebar = [
  {
    text: '시작하기',
    collapsed: false,
    items: [
      { text: '30분 Quick Start', link: '/' },
      { text: 'AI-Ready의 두 축', link: '/00-start/what-is-ai-ready-data' }
    ]
  },
  {
    text: '진단과 90일 실행',
    collapsed: false,
    items: [
      { text: '실행 워크벤치', link: '/workbench/' },
      { text: '두 축 준비도 진단', link: '/01-assess/readiness' },
      { text: '경영효과 측정', link: '/01-assess/business-impact' },
      { text: '90일 로드맵', link: '/01-assess/90-day-roadmap' }
    ]
  },
  {
    text: '1 · Data Ready',
    collapsed: false,
    items: [
      { text: 'Data Ready 전체 지도', link: '/data-ready/' },
      { text: 'Office·PDF·Excel', link: '/04-sources/office-spreadsheets' },
      { text: '이메일·첨부', link: '/04-sources/email' },
      { text: '수집·정제 파이프라인', link: '/05-pipeline/ingestion' }
    ]
  },
  {
    text: '2 · Knowledge Ready',
    collapsed: false,
    items: [
      { text: 'Knowledge Ready 전체 지도', link: '/knowledge-ready/' },
      { text: '지식 단위·관계·효력', link: '/knowledge-ready/knowledge-units' },
      { text: '문서·회의·결정 기록', link: '/03-capture/better-records' },
      { text: 'EDM·SSoT·충돌', link: '/04-sources/edm-ssot' },
      { text: 'AI-Ready 용어사전', link: '/reference/glossary' }
    ]
  },
  {
    text: '공통 기반',
    collapsed: true,
    items: [
      { text: 'Data·Knowledge 거버넌스', link: '/02-govern/governance' },
      { text: '온프레미스 보안', link: '/02-govern/security' }
    ]
  },
  {
    text: '3 · AI 활용·운영',
    collapsed: false,
    items: [
      { text: 'AI 활용·운영 전체 지도', link: '/ai-use/' },
      { text: 'RAG 품질과 운영', link: '/05-pipeline/rag-operations' }
    ]
  },
  {
    text: '사례',
    collapsed: true,
    items: [
      { text: '사례에서 배우기', link: '/06-cases/' },
      { text: 'Rexera 문서 처리', link: '/06-cases/rexera' },
      { text: 'Siemens 분산 검색', link: '/06-cases/siemens' },
      { text: '국내 공공 AI 실증', link: '/06-cases/nia-public-ai' },
      { text: '한빛제조 90일 전환', link: '/06-cases/hanbit-manufacturing' }
    ]
  },
  {
    text: '실습과 발표',
    collapsed: false,
    items: [
      { text: '75분 종단간 실습', link: '/practice/' },
      { text: '세미나 슬라이드', link: '/seminar/' }
    ]
  },
  {
    text: '실전 템플릿',
    collapsed: true,
    items: [
      { text: '템플릿 안내', link: '/templates/' },
      { text: 'Data·Knowledge 진단표', link: '/templates/readiness-assessment' },
      { text: '유즈케이스 캔버스', link: '/templates/use-case-canvas' },
      { text: '데이터 원천 인벤토리', link: '/templates/source-inventory' },
      { text: '정보등급·권한표', link: '/templates/access-matrix' },
      { text: 'AI 친화적 문서 표준', link: '/templates/document-standard' },
      { text: '회의록', link: '/templates/meeting-minutes' },
      { text: '의사결정 로그', link: '/templates/decision-log' },
      { text: '조직 용어사전', link: '/templates/glossary-template' },
      { text: 'SSoT·충돌대장', link: '/templates/ssot-register' },
      { text: '데이터 품질 점수표', link: '/templates/quality-scorecard' },
      { text: 'RAG 골든셋', link: '/templates/rag-golden-set' },
      { text: '90일 백로그·RACI', link: '/templates/roadmap-raci' }
    ]
  },
  {
    text: '근거와 참고',
    collapsed: true,
    items: [
      { text: '참조 아키텍처', link: '/reference/architectures' },
      { text: '근거·참고문헌', link: '/reference/sources' },
      { text: '표준·품질·거버넌스', link: '/reference/standards-governance' },
      { text: '보안·개인정보', link: '/reference/security-privacy' },
      { text: '비정형 문서·기록', link: '/reference/unstructured-records' },
      { text: 'RAG·검색·평가', link: '/reference/rag-evaluation' },
      { text: '경영효과·실증', link: '/reference/value-evidence' },
      { text: '기여 가이드', link: '/reference/contributing' }
    ]
  }
]
