---
title: RAG·검색·평가 근거
description: 검색, 근거, 답변, 인용, 권한과 운영 효과를 분리 평가하는 연구·벤치마크·공식 문서
status: reviewed
page_type: reference
audience: [AI 엔지니어, 데이터 스튜어드, 제품 책임자, 보안 담당자]
maturity_level: [2, 3, 4, 5]
topics: [RAG, 검색, 평가, 골든셋, 인용]
last_updated: 2026-07-22
review_due: 2026-10-22
---

# RAG·검색·평가 근거

RAG 평가는 점수 하나가 아니다. `데이터 → 검색 → 근거 → 답변 → 권한 → 업무 효과`를
분리해야 실패 원인을 찾을 수 있다.

## 핵심 연구·벤치마크

| 근거 | 얻을 수 있는 것 | 한계·주의 |
| --- | --- | --- |
| [RAG 원 논문](https://papers.neurips.cc/paper_files/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html) | 매개변수·비매개변수 지식 결합과 출처 문제 | 현재 기업 RAG 전체 아키텍처의 표준은 아님 |
| [BEIR](https://arxiv.org/abs/2104.08663) | 18개 데이터셋의 이질적 검색 비교·BM25 기준선 | 영어 중심, 사내 한국어 성능은 별도 시험 |
| [NIST TREC 2025 RAG Track](https://pages.nist.gov/trec-browser/trec34/rag/proceedings/) | 관련성·완전성·귀속 검증·합의의 다층 평가 | 공개 말뭉치 결과를 사내 목표로 복사 금지 |
| [RAGAS, EACL 2024](https://aclanthology.org/2024.eacl-demo.16/) | 참조답 없이 자동 평가하는 지표 후보 | LLM 판정 비용·편향을 사람과 교정 |
| [ARES, NAACL 2024](https://aclanthology.org/2024.naacl-long.20/) | 문맥 관련성·충실성·답변 관련성 자동평가 | 소량의 사람 라벨로 판정기를 보정해야 함 |
| [DataPerf](https://www.dataperf.org/home) | 데이터 선택·정제·획득 중심 벤치마킹 | RAG 업무 정확도 벤치마크는 아님 |
| [LaRA, ICML 2025](https://proceedings.mlr.press/v267/li25dv.html) | 긴 컨텍스트와 RAG 간 과업별 비교 관점 | 특정 실험 결과, 어느 한 방식의 보편 우위 아님 |

## 평가 축과 원문

| 층 | 최소 지표 | 참고 근거 |
| --- | --- | --- |
| 데이터 | 승인·최신·중복·파싱·ACL·삭제 전파 | [ISO/IEC 5259-2](https://www.iso.org/standard/81860.html), [OWASP RAG](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html) |
| 검색 | Recall@k·Precision@k·MRR·nDCG·효력 버전 | [BEIR](https://arxiv.org/abs/2104.08663), [NIST TREC](https://trec.nist.gov/data/rag.html) |
| 근거 | 인용 적합성·충분성·원문 추적·귀속 검증 | [TREC 2025 RAG](https://pages.nist.gov/trec-browser/trec34/rag/proceedings/) |
| 답변 | 정확성·완전성·충실성·관련성·거절 | [Microsoft RAG Evaluators](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators), [ARES](https://aclanthology.org/2024.naacl-long.20/) |
| 권한 | ACL precision·존재 노출·캐시 격리·연쇄삭제 | [OWASP RAG Security](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html) |
| 업무 | 탐색시간·최초 해결·재작업·위험·실사용률 | [NIA 공공AI 효과성](https://nia.or.kr/site/nia_kor/ex/bbs/View.do?bcIdx=28374&cbIdx=37989) |

Microsoft 자료는 제품 기능을 쓰라는 권고가 아니라 **검색 과정 평가와 최종 답변 평가를
나누는 패턴**의 출처다. `preview` 지표는 운영 기준으로 고정하기 전에 변경 가능성을
검토한다.

## 골든셋 근거 등급

| 등급 | 정답 근거 | 사용 |
| --- | --- | --- |
| A | 업무 소유자가 승인한 원문 위치·답·거절 조건 | 출시 차단·회귀 시험 |
| B | 두 명 이상이 합의한 관련 문서·평가 루브릭 | 모델·검색 비교 |
| C | LLM이 합성하고 사람이 표본 검수 | 누락 질문 탐색 |
| D | 사용자 피드백만 있고 정답 근거 없음 | 오류 후보 수집 |

자동 생성 질문과 LLM-as-a-judge만으로 출시를 승인하지 않는다. 최소한 A·B 세트에서
사람 평가와 자동 점수의 일치도, 오탐·미탐, 사용자 역할별 ACL 결과를 측정한다.

## 실패 원인 분해

| 현상 | 먼저 확인 | 잘못된 처방 |
| --- | --- | --- |
| 답이 없음 | 원천 범위·파싱·Recall@k | 즉시 더 큰 모델로 교체 |
| 틀린 최신본 | 승인·효력·폐기 메타데이터 | 수정일만 가중 |
| 근거는 맞고 답이 틀림 | 프롬프트·컨텍스트·모델 충실성 | 임베딩만 교체 |
| 출처가 답을 지지하지 않음 | 주장-인용 정렬·귀속 검증 | 링크만 붙이면 통과 |
| 권한 문서 노출 | 검색 전 ACL·캐시·로그 | 답변 직전 문서명 숨김 |
| 삭제 문서 재등장 | 청크·임베딩·캐시·백업 전파 | 벡터 한 건만 삭제 |

## 사내 구축 후보의 공식 문서

아래는 기능 확인용이며 보안 승인이나 조합 권고가 아니다.

| 계층 | 후보 문서 | 확인할 것 |
| --- | --- | --- |
| 로컬 추론 | [llama.cpp](https://github.com/ggml-org/llama.cpp), [vLLM](https://docs.vllm.ai/en/stable/getting_started/quickstart/) | 모델 라이선스·오프라인·처리량·감사로그 |
| 검색 | [OpenSearch DLS](https://docs.opensearch.org/latest/security/access-control/document-level-security), [Qdrant Payload](https://qdrant.tech/documentation/manage-data/payload/) | 필터가 실제 권한 통제인지, 쓰기 권한은 별도인지 |
| 카탈로그 | [DataHub](https://docs.datahub.com/), [OpenMetadata](https://github.com/open-metadata/openmetadata) | 원천·소유자·계보·분류·배포 복잡도 |
| 계보 | [OpenLineage](https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.md) | run·job·dataset 이벤트와 정적 문서 연결 |
| 품질 | [Great Expectations](https://docs.greatexpectations.io/docs/core/run_validations/) | 기대조건·실패 증거·운영 스케줄 |

OpenSearch의 문서 수준 보안은 읽기 필터이며 쓰기 권한을 자동 제한하지 않는다. Qdrant의
payload 필터도 설계만으로 인증·인가 체계가 되지 않는다. 서비스 계정·테넌트 격리·부정
테스트로 `검색 전에 허용 집합이 제한되는지` 확인한다.

## 출시 판단

1. 검색과 답변을 별도 점수로 보고한다.
2. 무근거·모호·충돌·권한·공격·삭제 질문을 정상 질문만큼 포함한다.
3. 자동 판정은 사람 라벨과 정기적으로 재교정한다.
4. 정확도 평균이 높아도 권한 누출·조작 인용·삭제 실패는 즉시 차단한다.
5. 최종 판단은 실제 업무 시간·재작업·실사용률과 함께 내린다.
