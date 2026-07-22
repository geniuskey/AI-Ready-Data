---
title: 근거·참고문헌 허브
description: AI-Ready Data 의사결정에 사용할 국내외 표준·정부 지침·연구·공식 기술문서 지도
status: reviewed
page_type: reference
audience: [모든 독자, 기여자, 검토자]
maturity_level: [0, 1, 2, 3, 4, 5]
topics: [참고문헌, 출처, 근거, 인용]
last_updated: 2026-07-22
review_due: 2026-10-22
---

# 근거·참고문헌 허브

필요한 결정을 먼저 고르고 해당 근거표로 이동한다. 각 표에는 **어디에 쓰는지**와
**그대로 적용하면 안 되는 이유**를 함께 적었다.

2026년 7월 22일 기준으로 원문 126개를 대조하고, 실제 설계·검토에 다시 쓸 수 있는
121개를 카탈로그에 선별했다. 표의 단어로 사이트 검색하거나 CSV의 `domain`,
`use_stage`, `evidence_type` 열을 필터링하면 된다.

| 결정 | 먼저 볼 근거표 |
| --- | --- |
| Data Ready 품질·메타데이터·계보 | [표준·품질·거버넌스](standards-governance.md) |
| Knowledge Ready 용어·출처·승인 | [표준·품질·거버넌스](standards-governance.md) |
| 외부 반출 금지·권한·개인정보 | [보안·개인정보](security-privacy.md) |
| 메일·HWP·Office·PDF·회의·음성 | [비정형 문서·기록](unstructured-records.md) |
| 검색·인용·골든셋·RAG 평가 | [RAG·검색·평가](rag-evaluation.md) |
| ROI·생산성·데이터 가치 | [경영효과·실증 근거](value-evidence.md) |

<a class="md-button md-button--primary" href="../downloads/reference-catalog.csv">전체 레퍼런스 CSV 내려받기</a>

<ReferenceExplorer />

## 처음 읽을 12개

| 목적 | 원문 | 바로 적용할 것 |
| --- | --- | --- |
| 국내 AI 데이터 품질 | [NIA AI 데이터 품질관리 가이드 v3.5](https://www.nia.or.kr/site/nia_kor/ex/bbs/View.do?bcIdx=28106&cbIdx=26537&parentSeq=28106) | 품질 프로세스·산출물·지표 |
| 국내 공공데이터 품질 | [공공데이터 품질관리](https://www.data.go.kr/ugs/selectPublicDataQlityView.do) | 표준용어·구조·값·개선 체계 |
| AI용 데이터 품질 | [ISO/IEC 5259-1:2024](https://www.iso.org/standard/81088.html) | AI 데이터 품질 공통 언어 |
| AI 위험관리 | [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) | Govern·Map·Measure·Manage |
| 국내 개인정보 | [개인정보위 생성형 AI 개인정보 안내서](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS217&mCode=G010030000&nttId=11439) | 생애주기별 적법성·안전조치 |
| 국내 AI 보안 | [KISA AI 보안 안내서 정오 수정본](https://www.kisa.or.kr/2060204/form?lang_type=KO&page=1&postSeq=19) | 모델·데이터·서비스 위협 통제 |
| RAG 보안 | [OWASP RAG Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html) | ACL·오염·캐시·삭제 시험 |
| 전자기록 | [ISO 15489-1:2016](https://www.iso.org/standard/62542.html) | 기록 생성·획득·관리 원칙 |
| 메일·문서 기록 | [NARA Universal ERM Requirements](https://www.archives.gov/records-mgmt/policy/universalermrequirements) | 생애주기별 시스템 요구사항 |
| RAG 평가 | [NIST TREC 2025 RAG Track](https://pages.nist.gov/trec-browser/trec34/rag/proceedings/) | 검색·완전성·귀속·합의 평가 |
| 경영효과 | [NIA 공공AI 효과성 측정 방안](https://nia.or.kr/site/nia_kor/ex/bbs/View.do?bcIdx=28374&cbIdx=37989) | 국내 사례와 효과 프레임 |
| 데이터 가치 | [UK Data Valuation Framework](https://www.gov.uk/government/publications/balance-sheet-framework/balance-sheet-framework) | 시장·사용·비용 기반 가치평가 |

## 근거 라벨

| 라벨 | 의미 | 사용 원칙 |
| --- | --- | --- |
| `법·규제` | 적용 관할의 현행 법령·감독기관 안내 | 조직 법무·CPO가 적용 여부 확인 |
| `표준` | ISO·W3C·IETF 등 합의 규격 | 유료 본문과 버전 상태 확인 |
| `정부 지침` | 정부·공공기관 운영 가이드 | 타 국가 자료는 설계 참고로만 사용 |
| `연구` | 동료심사 논문·공공 연구기관 분석 | 과업·표본·대조군이 다르면 수치 재사용 금지 |
| `제품·프로젝트 문서` | 공식 기능·구현 설명 | 보증·보안승인·도입 권고가 아님 |
| `공개 사례` | 특정 조직의 결과 | 기준선·측정범위·발표 주체를 함께 표시 |

## 출처 정책

사실·수치·법·표준·제품 기능은 문장 가까이에 원문을 둔다. 검색 결과나 재인용 기사보다
원 법령, 표준 발행기관, 정부 보고서, 논문 원문, 프로젝트 공식 문서를 우선한다.

- ISO 표준 소개 페이지는 범위 확인용이다. 전체 요구사항은 정식 표준 원문을 확인한다.
- 해외 법과 정부 지침은 국내 직접 준수 규정으로 표시하지 않는다.
- 초안은 `draft`, 철회된 규격은 `withdrawn`으로 표시하고 운영 기준으로 쓰지 않는다.
- 벤더 수치와 외부 생산성 수치는 우리 조직의 ROI 목표가 아니라 가설로만 사용한다.
- 도구는 라이선스·SBOM·취약점·한국어 품질·부하·오프라인 동작을 사내에서 재검증한다.

마지막 웹 검토일은 `2026-07-22`다. 최신성이 높은 국내 지침·법·보안 자료는 분기마다
점검하고, 정정은 문서 위치·문제 문장·원출처·확인일과 함께 GitHub 이슈로 남긴다.
