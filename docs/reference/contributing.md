---
title: 기여 가이드
description: AI-Ready Data 위키의 문서 계약, 출처, 사례와 합성 데이터 작성 규칙
status: reviewed
page_type: reference
audience: [기여자, 검토자]
maturity_level: [0, 1, 2, 3, 4, 5]
topics: [기여, 문서 계약, 품질]
last_updated: 2026-07-22
review_due: 2027-01-22
---

# 기여 가이드

저장소의 [CONTRIBUTING.md](https://github.com/geniuskey/AI-Ready-Data/blob/main/CONTRIBUTING.md)에
로컬 실행, front matter, 인용, 사례, 테스트와 라이선스 규칙이 있다.

## 좋은 기여의 기준

- 독자의 실제 업무 질문과 다음 행동이 분명하다.
- 원칙, 구현 예시, 제품 기능, 법적 요구를 구분한다.
- 수치와 변경 가능한 사실에 원출처와 확인일이 있다.
- 실제 조직 정보 대신 합성 예시를 사용한다.
- AI가 만든 초안도 사람이 출처와 의미를 확인한다.
- 내부 링크, 모바일 표, 인쇄와 문서 검증을 통과한다.

기여 전 `python scripts/validate_docs.py`, `pymarkdown`, `mkdocs build --strict`를 실행한다.

