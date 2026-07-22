---
title: 참고문헌과 출처 정책
description: 위키의 표준·정부기관·공식 기술문서·공개 사례 출처와 인용·검토 원칙
status: reviewed
page_type: reference
audience: [모든 독자, 기여자, 검토자]
maturity_level: [0, 1, 2, 3, 4, 5]
topics: [참고문헌, 출처, 인용, 검토]
last_updated: 2026-07-22
review_due: 2026-10-22
---

# 참고문헌과 출처 정책

## 출처 우선순위

1. 법령, 국제·국가 표준, 규제·정부기관 원문
2. 공식 기술문서와 동료심사 연구
3. 조직·벤더가 공개한 사례와 측정 결과
4. 검증 가능한 실무 참고자료

사실·수치·법·표준·제품 기능은 해당 문장 가까이에 원문 링크를 둔다. 접근일은 문서의
`last_updated`로 관리하고 분기별로 최신성 높은 국내 지침과 보안 자료를 점검한다.

## 핵심 표준·위험관리

- [NIST AI Risk Management Framework 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10), 2023.
- [NIST AI RMF: Generative Artificial Intelligence Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence), 2024, 2026년 갱신 페이지.
- [NIST AI Resource Center](https://airc.nist.gov/), AI RMF 운영 자료.
- [ISO/IEC 5259-1:2024](https://www.iso.org/standard/81088.html), AI·분석용 데이터 품질 개요·용어·예시.
- [U.S. GAO AI Accountability Framework](https://www.gao.gov/products/gao-21-519sp), 거버넌스·데이터·성능·모니터링.

## 국내 지침·법령

- [KISA 인공지능(AI) 보안 안내서](https://www.kisa.or.kr/2060204/form?lang_type=KO&page=2&postSeq=19), 2025 발간·2026 정오 수정.
- [NIA 공공부문 AI 도입·활용 가이드](https://www.nia.or.kr/site/nia_kor/ex/bbs/View.do?bcIdx=29526&cbIdx=37989), 2026년 5월 기준.
- [NIA 공공부문 AI 사례집·데이터 분석 업무 가이드](https://nia.or.kr/site/nia_kor/ex/bbs/View.do?bcIdx=28925&cbIdx=27974&parentSeq=28925), 2025.
- [디지털플랫폼정부위원회 초거대 AI 가이드라인 2.0·실증 사례집](https://www.dpg.go.kr/DPG/contents/DPG03020000.do?%3BviewCount=9&id=20250416154050742370&schM=view), 2025.
- [국가법령정보센터 개인정보 보호법](https://www.law.go.kr/법령/개인정보보호법), 적용 시점의 현행본 확인.

## 기록·이메일·전자문서

- [NARA Email and Electronic Messages Management](https://www.archives.gov/records-mgmt/email-mgmt).
- [NARA Universal Electronic Records Management Requirements](https://www.archives.gov/records-mgmt/policy/universalermrequirements).
- [NARA ERM Requirements Guidance](https://www.archives.gov/records-mgmt/policy/requirements-guidance.html).

NARA 자료는 미국 연방기관 대상이다. 국내 기업의 직접 준수 규정으로 인용하지 않고
전자기록 생애주기와 시스템 요구사항을 이해하는 참고자료로 사용한다.

## RAG·보안·데이터 처리

- [OWASP RAG Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html).
- [OWASP LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/).
- [Microsoft RAG enrichment phase](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-enrichment-phase).
- [Microsoft RAG design and evaluation guide](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide).
- [AWS generative AI data considerations](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/apg-gloss.html).
- [Apache Tika](https://tika.apache.org/), 파일 형식 탐지와 텍스트·메타데이터 추출.

클라우드 문서는 제품 사용 지침이 아니라 데이터 준비·평가 패턴의 공식 설명으로
제한해 사용한다. 온프레미스 요구사항은 별도로 검증한다.

## 공개 사례

- [AWS/Rexera document processing case](https://aws.amazon.com/solutions/case-studies/bedrock-rexera/).
- [AWS/Siemens global search case](https://aws.amazon.com/solutions/case-studies/siemens-nova-case-study/).

사례 수치는 발표 주체, 비교 기준, 측정 범위를 함께 표시한다. 독립 검증되지 않은 수치를
일반적인 ROI나 목표값으로 사용하지 않는다.

## 정정 요청

출처 변경, 끊어진 링크, 과도한 일반화, 번역 오류를 발견하면 GitHub 이슈에 문서 위치,
문제 문장, 원출처, 제안 수정과 확인일을 남긴다.

