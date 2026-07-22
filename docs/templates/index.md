---
title: 실전 템플릿 사용 안내
description: 준비도 진단부터 RAG 골든셋과 90일 RACI까지 바로 복사해 쓰는 12종 템플릿
status: reviewed
page_type: template
audience: [현업 리더, IT·데이터 담당자, AX 추진자]
maturity_level: [0, 1, 2, 3, 4, 5]
topics: [템플릿, 체크리스트, 워크숍]
last_updated: 2026-07-22
review_due: 2027-01-22
---

# 실전 템플릿 사용 안내

템플릿은 빈칸을 채우는 행정 서류가 아니라 서로 다른 팀이 같은 사실과 결정을 보게
하는 대화 도구다. 처음에는 유즈케이스 하나와 대표 원천만 기록하고 운영에서 발견한
필드를 추가한다.

| 시점 | 사용할 템플릿 | 결과 |
| --- | --- | --- |
| 시작 | [준비도 진단표](readiness-assessment.md), [유즈케이스 캔버스](use-case-canvas.md) | 범위와 중단 조건 |
| 발견 | [원천 인벤토리](source-inventory.md), [정보등급·권한표](access-matrix.md) | 승인된 데이터 경계 |
| 기록 개선 | [문서 표준](document-standard.md), [회의록](meeting-minutes.md), [의사결정 로그](decision-log.md) | 새 지식의 품질 |
| 정돈 | [용어사전](glossary-template.md), [SSoT·충돌대장](ssot-register.md), [품질 점수표](quality-scorecard.md) | 권위와 품질 근거 |
| 파일럿 | [RAG 골든셋](rag-golden-set.md), [90일 백로그·RACI](roadmap-raci.md) | 평가와 책임 |

## 작성 규칙

- `모름`, `미정`, `해당 없음`을 빈칸과 구분한다.
- 역할명만 쓰지 말고 실제 책임자와 승인일을 적는다.
- 수치에는 측정 정의, 범위, 기준일, 증거 위치를 붙인다.
- 개인정보·비밀을 공개 저장소의 예시 파일에 넣지 않는다.
- 조직 양식으로 복사한 뒤 문서 ID, 소유자, 정보등급, 검토일을 부여한다.
- AI가 초안을 채웠다면 원천 링크와 사람이 확인한 필드를 표시한다.

CSV 예시는 UTF-8로 제공한다. Excel에서 열 때 인코딩과 날짜 자동 변환을 확인한다.

