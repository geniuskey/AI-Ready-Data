---
title: Data에서 Knowledge·AI 색인까지
description: Data Ready와 Knowledge Ready의 경계를 보존하며 원본 수집부터 승인 지식·청킹·색인까지 재현하는 파이프라인
status: reviewed
page_type: guide
audience: [데이터 엔지니어, AI 엔지니어, 플랫폼 운영자, 데이터 스튜어드]
maturity_level: [2, 3, 4, 5]
topics: [Data Ready, Knowledge Ready, 데이터 파이프라인, 메타데이터, 청킹, 계보, 색인]
last_updated: 2026-07-22
review_due: 2027-01-22
---

# Data에서 Knowledge·AI 색인까지

AI 데이터 파이프라인의 목적은 많은 파일을 빨리 임베딩하는 것이 아니다. **허용된
원본에서 Data Ready와 Knowledge Ready의 승인 경계를 거쳐 검증 가능한 서비스 표현을
만들고 언제든 재현·수정·삭제하는 것**이다.
[Microsoft RAG 데이터 준비 지침](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-enrichment-phase)은
청크 정제와 제목·요약·키워드 같은 메타데이터가 검색 목적에 맞게 설계돼야 한다고
설명한다. 제품 구현은 달라도 원칙은 같다.

## 세 구역 14단계

```mermaid
flowchart TB
  subgraph DR[Data Ready]
    A[1 발견·승인] --> B[2 원본·검역]
    B --> C[3 파싱·OCR·ASR]
    C --> D[4 정규화·품질]
    D --> E[5 중복·버전 후보]
    E --> F[6 메타데이터·ACL·계보]
  end
  subgraph KR[Knowledge Ready]
    G[7 용어·대상 정렬] --> H[8 사실·규칙·결정 후보]
    H --> I[9 SSoT·효력·충돌 판정]
    I --> J[10 관계·근거·사람 승인]
  end
  subgraph AU[AI 활용·운영]
    K[11 청킹] --> L[12 색인]
    L --> M[13 골든셋 평가]
    M --> N[14 게시·관측·삭제]
  end
  F --> G
  J --> K
```

| 구역 | 단계 | 필수 출력 | 실패 시 동작 |
| --- | --- | --- | --- |
| Data | 발견·승인 | 목적, 원천, 소유자, 등급, ACL, 보존 | 승인 전 수집 금지 |
| Data | 원본·검역 | source ID, 해시, 실제 형식, 악성·암호·DRM 검사 | 격리 대기열 |
| Data | 파싱·OCR·ASR | 텍스트·표·이미지·좌표·신뢰도 | 원본별 실패 보고 |
| Data | 정규화·품질 | 인코딩, 형식, 단위, 구조, 표본 정확도 | 원문 차이·오류 기록 |
| Data | 중복·버전 후보 | 동일·유사·파생·충돌 후보 | 자동 삭제·최종본 판정 금지 |
| Data | 메타데이터·ACL·계보 | 소유·분류·버전·변환·보존·삭제 연결 | 필수 필드 미달 격리 |
| Knowledge | 용어·대상 정렬 | 표준명·동의어·코드·대상 매핑 | 미정 용어 표시 |
| Knowledge | 지식 후보 | 정의·사실·규칙·절차·결정과 원문 위치 | AI 후보로만 보관 |
| Knowledge | SSoT·효력·충돌 | 권위·상태·시점·범위·대체·충돌 판정 | 미확정 서비스 제외 |
| Knowledge | 관계·근거·승인 | 조건·예외·관계·승인자·검토일 | 승인 전 게시 금지 |
| AI | 청킹 | 자기완결 청크와 지식·문서·섹션 연결 | 전략별 평가 |
| AI | 색인 | 키워드·벡터·필터·ACL 필드 | 원본 ACL 없는 적재 금지 |
| AI | 골든셋 평가 | 검색·근거·답변·거절·권한 결과 | 게이트 실패 시 미게시 |
| AI | 게시·운영 | 데이터·지식·인덱스 버전 manifest와 SLO | 롤백·격리·삭제 |

::: info 자동화 경계
1~6단계는 데이터 처리 자동화 비중이 높다. 7~10단계에서 AI는 후보를 만들 수 있지만
의미·효력·SSoT는 업무 소유자가 승인한다. 11~14단계는 승인된 두 준비축을 소비한다.
:::

## 원본과 파생물 ID

ID는 파일 경로만 사용하지 않는다. 경로는 바뀌고 같은 파일이 여러 곳에 있을 수 있다.

```text
source_id       = 시스템:업무객체:문서ID:버전
source_hash     = 수집 시점 원본 바이트의 SHA-256
derivative_id   = source_id + source_hash + 변환계약버전
chunk_id        = derivative_id + 섹션경로 + 순번
index_version   = 데이터셋버전 + 임베딩모델버전 + 색인설정버전
```

모델·파서·청킹 설정이 바뀌면 같은 원본에서도 다른 파생 버전이 된다. 어떤 답변이 어떤
인덱스와 청크를 사용했는지 추적한다.

## 최소 메타데이터 계약

| 범주 | 필드 |
| --- | --- |
| 식별 | source_id, source_hash, source_system, canonical_uri |
| 기본 의미 | title, document_type, language, owner, business_domain |
| Data 생애주기 | source_status, version, collected_at, retention_class, deletion_state |
| Knowledge 효력 | knowledge_type, approval_status, effective_from/to, review_due, supersedes |
| 보안 | classification, acl_users/groups, purpose, retention_class |
| 변환 | parser, parser_version, extracted_at, quality_flags |
| 청크 | chunk_id, section_path, page/slide/sheet, parent_id |
| 운영 | dataset_version, knowledge_version, indexed_at, legal_hold |

요약·키워드·예상 질문처럼 모델이 만든 메타데이터에는 생성 모델·프롬프트 버전과
검증 여부를 붙이고 원문 사실과 구분한다.

## 청킹은 문서 구조와 질문으로 결정한다

고정 토큰 수 하나를 전 문서에 적용하지 않는다.

- 절차: 단계 묶음과 선행 경고를 함께 유지한다.
- 규정: 조·항·호와 적용 범위·예외를 연결한다.
- 표: 제목, 열 헤더, 단위, 행 식별자를 매 청크에 포함한다.
- PPT: 슬라이드 제목·본문·노트·도식 설명을 한 단위로 평가한다.
- 메일: 메시지별 새 내용과 스레드 결정 맥락을 연결한다.
- Excel: 테이블·시트 목적·열 정의를 함께 제공하고 셀을 무작위로 자르지 않는다.

작은 청크는 정확한 구절을 찾지만 맥락을 잃고, 큰 청크는 관련 없는 내용을 섞는다.
구조 경계, 크기, 겹침, 부모-자식 검색을 골든셋으로 비교한다. 청킹은 정답 하나가 없는
반복 평가 문제다.

## 키워드·벡터·필터를 함께 쓴다

- 문서 ID, 설비 코드, 사람 이름, 정확한 규정 번호는 키워드 검색이 강하다.
- 자연어 의미와 표현이 다른 질문은 벡터 검색이 유리하다.
- 정보등급, 부서, 상태, 효력일, 제품, 언어는 메타데이터 필터가 필요하다.
- 두 검색 결과를 합치고 재순위화하되 ACL 필터는 검색 전에 적용한다.

## 증분 처리와 삭제

매번 전체를 다시 적재하지 않는다. 원본 ID·해시·변경시각으로 신규·변경·동일·삭제를
분류하고 멱등하게 처리한다.

1. 같은 원본과 해시는 건너뛴다.
2. 변경 해시는 새 파생 버전을 만들고 검증 후 원자적으로 전환한다.
3. 삭제·권한 회수는 tombstone 이벤트로 모든 파생 저장소에 전달한다.
4. 각 저장소가 처리한 시간을 확인하고 미처리 대상을 재시도한다.
5. 백업·법적 보존은 별도 정책에 따라 접근과 최종 삭제를 증명한다.

## 파이프라인 SLO 예시

- 승인 원천 수집 성공률
- 형식별 추출 성공률과 사람 표본 정확도
- 필수 메타데이터 충족률
- 원본 변경·ACL 회수·삭제 전파 시간
- 검역 대기열 크기와 평균 해결 시간
- 미확정·만료 문서의 게시 차단률
- 데이터셋 버전 재현 성공률

파이프라인이 안정돼도 답변 품질은 자동 보장되지 않는다. 다음
[RAG 품질과 운영](rag-operations.md)에서 검색·인용·거절·보안을 따로 평가한다.
