---
title: AI-Ready Data의 정의와 원칙
description: AI-Ready Data를 쓸모, 발견, 신뢰, 통제, 기계 활용과 운영 관점에서 이해하는 안내서
status: reviewed
page_type: guide
audience: [현업 리더, IT·데이터 담당자, AX 추진자]
maturity_level: [0, 1]
topics: [AI-Ready Data, 정의, 원칙]
last_updated: 2026-07-22
review_due: 2027-01-22
---

# AI-Ready Data의 정의와 원칙

AI-Ready Data는 특정 AI 유즈케이스에 대해 다음 여섯 질문에 답할 수 있는 데이터다.

<div class="metric-grid">
  <div class="metric-card"><strong>🎯 쓸모</strong>어떤 결정이나 행동을 개선하는가?</div>
  <div class="metric-card"><strong>🔎 발견</strong>어디에 있고 어떤 의미인지 찾을 수 있는가?</div>
  <div class="metric-card"><strong>✅ 신뢰</strong>누가, 언제, 무엇을 근거로 만들었는가?</div>
  <div class="metric-card"><strong>🛡️ 통제</strong>누가 읽고 바꾸고 폐기할 수 있는가?</div>
  <div class="metric-card"><strong>⚙️ 기계 활용</strong>텍스트·구조·메타데이터를 추출할 수 있는가?</div>
  <div class="metric-card"><strong>♻️ 운영</strong>변경·권한·삭제와 품질을 계속 반영하는가?</div>
</div>

파일 형식을 바꾸거나 벡터DB에 복사했다고 준비가 끝난 것이 아니다. 데이터 품질은
**의도한 목적에 적합한지**를 기준으로 봐야 한다. 이 관점은 AI·ML 데이터 품질을
생애주기 전체에서 다루는
[ISO/IEC 5259-1:2024](https://www.iso.org/standard/81088.html)과도 맞닿아 있다.

::: tip 한 문장 원칙
모든 데이터를 정리하지 말고, 가치 있는 유즈케이스 하나에 필요한 근거를
안전하고 검증 가능하게 만드는 것부터 시작한다.
:::

## 다섯 가지 위험한 지름길

| 지름길 | 대신 할 일 |
| --- | --- |
| 전사 파일을 전부 수집 | 승인된 유즈케이스 원천만 수집 |
| AI가 SSoT를 자동 선택 | AI는 후보를 찾고 업무 소유자가 확정 |
| Markdown 변환으로 종료 | 원본·파생물 연결과 변환 품질 검사 |
| RAG가 환각을 해결한다고 기대 | 인용·거절·ACL·삭제 전파 평가 |
| 온프레미스면 안전하다고 판단 | 데이터 흐름과 신뢰경계 기준으로 통제 |

[NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)는 AI 위험관리를
Govern, Map, Measure, Manage의 지속적인 활동으로 제시한다. 따라서 AI-Ready는
한 번의 정제 작업이 아니라 **소유하고, 측정하고, 갱신하는 운영체계**다.

## 첫 유즈케이스의 완료 기준

- [ ] 업무 질문과 답하면 안 되는 질문이 정의됐다.
- [ ] 원천, 소유자, 정보등급, 권한과 삭제 규칙이 있다.
- [ ] 답에서 원문 위치와 버전을 확인할 수 있다.
- [ ] 정답·부분정답·거절·권한 차단을 골든셋으로 평가한다.
- [ ] 원문 변경·권한 회수·삭제가 색인과 캐시에 전파된다.
- [ ] 오류를 발견하고 고칠 담당자와 운영 주기가 있다.

<a class="md-button md-button--primary" href="../">30분 Quick Start로 돌아가기</a>
