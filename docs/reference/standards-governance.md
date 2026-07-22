---
title: 표준·품질·거버넌스 근거
description: AI 데이터 품질, 메타데이터, 계보, 소유권과 성숙도 진단에 쓰는 핵심 표준과 지침
status: reviewed
page_type: reference
audience: [데이터 책임자, 스튜어드, AX 추진자, 아키텍트]
maturity_level: [0, 1, 2, 3, 4, 5]
topics: [표준, 데이터 품질, 메타데이터, 거버넌스, 계보]
last_updated: 2026-07-22
review_due: 2027-01-22
---

# 표준·품질·거버넌스 근거

표준 하나로 모든 문제를 풀지 않는다. **품질 모델 → 운영 프로세스 → 메타데이터와
계보 → 증거 기반 성숙도** 순서로 필요한 부분을 조합한다.

## 데이터 품질 기준

| 근거 | 적용 지점 | 한계·주의 |
| --- | --- | --- |
| [ISO/IEC 5259-1:2024](https://www.iso.org/standard/81088.html) | AI·ML 데이터 품질 개요·용어·생애주기 | 소개 페이지는 전체 요구사항이 아님 |
| [ISO/IEC 5259-2:2024](https://www.iso.org/standard/81860.html) | 정형·비정형 데이터 품질 모델과 측정 | 유즈케이스별 임계값은 조직이 결정 |
| [ISO/IEC 25012:2008](https://www.iso.org/standard/35736.html) | 일반 정형 데이터 품질 특성 | 2025년 확인된 현행판이나 AI 전용 아님 |
| [ISO 8000-1:2022](https://www.iso.org/standard/81745.html) | ISO 8000 계열과 품질 원칙 탐색 | 개별 실행 요구는 하위 표준에 있음 |
| [ISO 8000-61:2016](https://www.iso.org/standard/63086.html) | 품질관리 프로세스와 역량 개선 | 품질 규칙 자체를 대신 정의하지 않음 |
| [ISO 8000-63:2019](https://www.iso.org/standard/65344.html) | 목표·질문·지표·메트릭 측정 스택 | 적합한 성숙도 모델 선택은 별도 |
| [ISO 8000-64:2022](https://www.iso.org/standard/80752.html) | 품질관리 프로세스 성숙도 평가 | 특정 품질영역 목표는 조직이 정의 |
| [NIA AI 데이터 품질관리 가이드 v3.5](https://www.nia.or.kr/site/nia_kor/ex/bbs/View.do?bcIdx=28106&cbIdx=26537&parentSeq=28106) | 국내 구축·라벨·생성형 AI 품질 산출물 | 사업형 학습데이터 중심, RAG에는 조정 필요 |
| [공공데이터 품질관리](https://www.data.go.kr/ugs/selectPublicDataQlityView.do) | 표준용어·구조·값·진단·개선 | 공공기관 적용 기준, 민간은 참고 모델 |
| [UK Government Data Quality Framework](https://www.gov.uk/data-ethics-guidance/the-government-data-quality-framework) | 품질 문화·문서화·개선 운영 | 영국 정부용, 국내 준수 기준 아님 |
| [UK Data Quality Issues Framework](https://www.gov.uk/government/publications/implement-a-data-quality-action-plan/data-quality-issues-framework) | 오류 식별·우선순위·근본원인 | 2026년 지침, 조직 위험척도로 조정 |

## AI·데이터 거버넌스와 성숙도

| 근거 | 적용 지점 | 한계·주의 |
| --- | --- | --- |
| [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) | Govern·Map·Measure·Manage 운영체계 | 자발적 프레임워크, 통제 목록은 별도 설계 |
| [NIST GenAI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) | 생성형 AI 특화 위험과 조치 | 법적 적합성 인증이 아님 |
| [ISO/IEC 42001:2023](https://www.iso.org/standard/42001) | 인증 가능한 AI 경영시스템 | 개별 데이터 품질 규칙은 5259 등과 결합 |
| [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) | AI 위험관리 통합·실행 | 조직 맥락에 맞춘 조정 필요 |
| [ISO/IEC 42005:2025](https://www.iso.org/standard/42005) | 사람·집단·사회 영향평가 | 데이터 품질 시험을 대신하지 않음 |
| [ISO/IEC 42006:2025](https://www.iso.org/standard/42006) | 42001 인증기관 역량 확인 | 도입 조직의 실무 체크리스트가 아님 |
| [ISO 55013:2024](https://www.iso.org/standard/82455.html) | 데이터 자산의 유용성·생애주기 관리 | 재무가치 산정 방법은 범위 밖 |
| [DAMA-DMBOK 2 Revised](https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/) | 데이터관리 11개 지식영역 공통 언어 | 저작권 자료·유료 도서, 3.0은 개발 중 |
| [EDM Council DCAM v3](https://edmcouncil.org/frameworks/dcam/) | 증거 기반 데이터 역량·로드맵 진단 | 전체 프레임워크는 회원 접근 |
| [UK Data Maturity Assessment](https://www.gov.uk/government/publications/data-maturity-assessment-for-government-framework) | 10개 주제·5단계 자기진단 | 정부 조직용, 점수를 조직 목적에 맞춰 해석 |
| [UK Data Asset Management](https://www.gov.uk/government/collections/data-asset-management-in-government) | 핵심 데이터 자산·소유권·품질계획 | 영국 부처 정책, 민간에는 운영 패턴 |

## 메타데이터·계보·상호운용

| 근거 | 적용 지점 | 한계·주의 |
| --- | --- | --- |
| [ISO/IEC 11179-1:2023](https://www.iso.org/standard/78914.html) | 메타데이터 레지스트리 기본 틀 | 구현 스키마는 3부 등과 결합 |
| [ISO/IEC 11179-3:2023](https://www.iso.org/standard/78915.html) | 레지스트리 개념모델 | 파일 저장소에 과도하게 적용하지 않음 |
| [ISO/IEC 11179-6:2023](https://www.iso.org/standard/78916.html) | 메타데이터 등록 절차·역할 | 전사 핵심 항목부터 단계 적용 |
| [W3C DCAT 3](https://www.w3.org/TR/vocab-dcat-3/) | 데이터셋·서비스 카탈로그 교환 | 내부 ACL·보존 정책은 별도 확장 |
| [W3C PROV-O](https://www.w3.org/TR/prov-o/) | Entity·Activity·Agent 기반 계보 | 모든 이벤트를 RDF로 만들 필요는 없음 |
| [W3C SKOS](https://www.w3.org/TR/skos-reference/) | 표준용어·동의어·분류체계 | 업무 규칙과 데이터 타입 검증은 별도 |
| [W3C SHACL 1.0](https://www.w3.org/TR/shacl/) | RDF 그래프 제약 검증 | SHACL 1.2는 2026년 현재 작업초안 |
| [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/) | 일반 문서·자원 최소 메타데이터 | 업무 효력·SSoT 필드는 조직 확장 |
| [FAIR Principles](https://www.go-fair.org/fair-principles/) | 발견·접근·상호운용·재사용 점검 | 연구데이터 기원, 보안·법 준수 프레임 아님 |
| [MLCommons Croissant 1.1](https://docs.mlcommons.org/croissant/docs/croissant-spec-1.1.html) | ML 데이터셋 구조·파일·필드 기술 | 사내 문서 기록관리 전체를 대체하지 않음 |
| [OpenLineage Specification](https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.md) | 실행시점 job·run·dataset 계보 | 정적 파일의 업무 맥락은 별도 메타데이터 필요 |
| [Open Data Contract Standard 3.1](https://bitol-io.github.io/open-data-contract-standard/) | 생산자·소비자 스키마·품질·SLA 계약 | 커뮤니티 표준, ISO 규격이 아님 |
| [JSON Schema](https://json-schema.org/specification) | JSON 구조와 값 제약 자동검증 | 의미·업무 효력·계보는 별도 |

## 데이터셋 설명 책임

[Datasheets for Datasets](https://arxiv.org/abs/1803.09010)은 동기·구성·수집·권장 사용을,
[Google Data Cards](https://research.google/pubs/data-cards-purposeful-and-transparent-dataset-documentation-for-responsible-ai/)는
출처·의도·변환·접근·보존·삭제·한계를 구조화한다. 사내 데이터 제품 카드에는 최소한
`소유자, 목적, 원천, 민감도, ACL, 변환, 품질, 버전, 보존, 삭제, 적합/부적합 사용`을
남긴다. 둘 다 법적 적합성 인증이나 정확도 보증은 아니다.

## 선택 순서

1. ISO/IEC 5259 또는 NIA 가이드로 품질 특성과 산출물을 정한다.
2. NIST AI RMF·ISO/IEC 42001·23894에서 역할과 위험 루프를 정한다.
3. DCMI·DCAT·PROV-O 중 필요한 최소 메타데이터와 계보만 채택한다.
4. JSON Schema·SHACL·데이터 계약으로 자동 검증 가능한 규칙을 만든다.
5. DCAM·UK 성숙도 모델은 점수 경쟁이 아니라 다음 투자 우선순위에 사용한다.
