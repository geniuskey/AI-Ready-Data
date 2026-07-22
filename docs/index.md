---
title: AI-Ready Data, 어디서부터 시작할까
description: DX와 표준화가 부족한 조직을 위한 AI-Ready Data의 정의와 시작 원칙
status: reviewed
page_type: guide
audience: [현업 리더, IT·데이터 담당자, AX 추진자]
maturity_level: [0, 1]
topics: [AI-Ready Data, 시작하기, 유즈케이스]
last_updated: 2026-07-22
review_due: 2027-01-22
---

<div class="hero">
  <h1>AI는 준비됐는데,<br>우리 데이터는 준비됐나요?</h1>
  <p>메일함, 오래된 EDM, 제각각인 Excel, 기록되지 않은 회의에서 시작하는<br>외부 반출 없는 AI-Ready Data 실전 안내서</p>
</div>

## AI-Ready Data란

AI-Ready Data는 특정 AI 유즈케이스에 대해 다음 질문에 답할 수 있는 데이터다.

- **쓸모**: 어떤 업무 결정이나 행동을 개선하는가?
- **발견**: 어디에 있고 어떤 의미인지 찾을 수 있는가?
- **신뢰**: 누가, 언제, 무엇을 근거로 만들었는가?
- **통제**: 누가 읽고 바꾸고 폐기할 수 있는가?
- **기계 활용**: 텍스트·구조·메타데이터를 손실 없이 추출할 수 있는가?
- **운영**: 품질을 측정하고 변경·권한·삭제를 계속 반영할 수 있는가?

즉, 파일 형식을 바꾸거나 벡터DB에 복사했다고 준비가 끝난 것이 아니다. 데이터
품질은 **의도한 목적에 적합한지**를 기준으로 봐야 한다. 이 관점은 AI·ML 데이터
품질을 데이터 생애주기 전체에서 다루는
[ISO/IEC 5259-1:2024](https://www.iso.org/standard/81088.html)과도 맞닿아 있다.

!!! quote "이 위키의 한 문장"
    모든 데이터를 정리하지 말고, 가치 있는 유즈케이스 하나에 필요한 근거를
    안전하고 검증 가능하게 만드는 것부터 시작한다.

## 지금 이런 조직을 위한 가이드다

<div class="path-grid">
  <div class="path-card"><strong>📨 메일이 업무 시스템</strong>결정과 첨부파일이 개인 메일함과 긴 스레드에 갇혀 있다.</div>
  <div class="path-card"><strong>📁 EDM은 파일 무덤</strong>최종·진짜최종·수정본이 함께 있고 어느 문서가 유효한지 모른다.</div>
  <div class="path-card"><strong>📊 Excel마다 언어가 다름</strong>열 이름, 단위, 코드, 날짜 형식과 업무 규칙이 사람마다 다르다.</div>
  <div class="path-card"><strong>🗣️ 회의가 증발함</strong>녹음은 금지되고 회의록·결정·후속조치도 일정한 형식으로 남지 않는다.</div>
  <div class="path-card"><strong>🔒 외부 반출 불가</strong>문서·음성·질문·모델 호출까지 사내 보안 경계 안에서 끝나야 한다.</div>
  <div class="path-card"><strong>🤖 AI부터 도입하라는 압박</strong>데이터 소유자·품질 기준·평가 질문 없이 모델과 솔루션부터 검토한다.</div>
</div>

## 하지 않을 것

| 위험한 지름길 | 왜 실패하는가 | 바꿔서 할 일 |
| --- | --- | --- |
| 전사 파일을 전부 수집 | 목적 없는 복제, 권한 확대, 낡은 문서까지 검색 | 유즈케이스에 필요한 원천만 승인 후 수집 |
| AI가 SSoT를 자동 선택 | 그럴듯함과 법적·업무상 효력은 다름 | AI는 후보·충돌을 제시하고 소유자가 확정 |
| Markdown 변환이면 완료 | 표·이미지·권한·버전·출처가 유실될 수 있음 | 원본과 파생물을 연결하고 변환 품질 검사 |
| RAG가 환각을 해결 | 검색 실패·오염·권한 누출이라는 새 위험이 생김 | 골든셋, 인용, 거절, ACL, 삭제 전파 평가 |
| 온프레미스면 안전 | 과도한 권한·로그 부재·공급망·출력 누출은 남음 | 데이터 흐름과 신뢰경계를 기준으로 통제 |

[NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)는 AI 위험관리를
Govern, Map, Measure, Manage의 지속적인 활동으로 제시한다. 이 위키도 한 번의
정제 프로젝트가 아니라 **소유하고, 측정하고, 갱신하는 운영체계**를 목표로 한다.

## 두 가지 이용 경로

=== "차근차근 준비"

    1. [준비도 진단](01-assess/readiness.md)으로 현재 상태를 사실로 적는다.
    2. [90일 로드맵](01-assess/90-day-roadmap.md)으로 유즈케이스 하나를 고른다.
    3. [거버넌스](02-govern/governance.md)와 [보안](02-govern/security.md)의 중단
       조건을 해결한다.
    4. 원천별 플레이북으로 대표 데이터를 정돈한다.
    5. [수집 파이프라인](05-pipeline/ingestion.md)과
       [RAG 운영](05-pipeline/rag-operations.md)으로 제한된 파일럿을 검증한다.

=== "지금 문제 해결"

    - Word·PPT·PDF·Excel이 문제라면 [Office 플레이북](04-sources/office-spreadsheets.md)
    - 모든 일이 메일에 있다면 [이메일 플레이북](04-sources/email.md)
    - 무엇이 최신인지 모른다면 [EDM과 SSoT](04-sources/edm-ssot.md)
    - 회의와 의사결정이 사라진다면 [처음부터 잘 남기기](03-capture/better-records.md)
    - 이미 RAG가 있다면 [RAG 품질과 운영](05-pipeline/rag-operations.md)

## 완료의 모습

AI-Ready는 “전사 데이터가 깨끗해졌다”가 아니다. 첫 유즈케이스에서 다음을 증명하면
된다.

- 답변해야 할 질문과 답변하지 말아야 할 질문이 정의되어 있다.
- 승인된 원천, 소유자, 정보등급, 접근권한, 보존·삭제 규칙이 있다.
- 답변에는 원문 위치와 버전이 표시되고 사용자가 직접 검증할 수 있다.
- 정답·부분정답·거절을 포함한 골든셋으로 품질과 권한 누출을 측정한다.
- 원문 변경·권한 회수·삭제가 파생 텍스트, 색인, 캐시에 전파된다.
- 실패를 발견하고 고칠 담당자와 운영 주기가 정해져 있다.

다음 단계는 [준비도 진단](01-assess/readiness.md)이다. 점수를 잘 받기 위한 평가가
아니라, **첫 90일 동안 무엇을 하지 않을지 정하기 위한 대화 도구**로 사용한다.
