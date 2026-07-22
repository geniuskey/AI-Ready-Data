---
title: 75분 AI-Ready 종단간 실습
description: 메일·EDM·Excel·부실 회의 메모가 섞인 가상 조직을 Data Ready와 Knowledge Ready로 전환하는 합성 데이터 워크숍
status: reviewed
page_type: playbook
audience: [현업 리더, IT·데이터 담당자, AX 추진자, 교육 진행자]
maturity_level: [0, 1, 2]
topics: [실습, 합성 데이터, 메일, EDM, SSoT, 골든셋]
last_updated: 2026-07-23
review_due: 2027-01-23
---

# 75분 AI-Ready 종단간 실습

읽었던 원칙을 메일·EDM·Excel·회의 메모에 적용해 실제 산출물로 바꿔본다.

<span class="case-badge composite-case">synthetic lab · 완전 합성 실습</span>

새봄기공 A공장의 반복 경보 대응 지식 검색을 준비한다. 공유 메일함, EDM 목록, Excel
장애 이력, 급하게 쓴 회의 메모가 전부다. 목표는 챗봇을 만드는 것이 아니라 **AI가
읽어도 되는 데이터와 믿어도 되는 지식의 경계**를 증명하는 것이다.

::: warning 실제 데이터가 아니다
회사·인물·주소·설비·문서·수치는 모두 교육을 위해 만든 합성 정보다. 실습 방법을 실제
조직에 적용할 때는 승인된 사내 환경에서 최소 범위로 수행하고, 원문을 공개 저장소나
외부 AI에 올리지 않는다.
:::

<figure class="guide-illustration">
  <img :src="'/AI-Ready-Data/images/illustrations/ai-ready-workshop.webp'" width="1200" height="676" loading="lazy" decoding="async" alt="현업·데이터·보안 담당자 네 명이 메일·문서·표를 Data Ready와 Knowledge Ready 두 작업 구역으로 나누어 승인 근거와 평가 자료를 만드는 실습 삽화">
  <figcaption>실습은 문제 원천을 함께 보고 Data Ready, Knowledge Ready, 평가 증거로 차례로 바꾸는 협업 과정이다.</figcaption>
</figure>

<div class="lab-download-card">
  <div>
    <span>OFFLINE LAB PACK · UTF-8</span>
    <strong>새봄기공 AI-Ready 실습 팩</strong>
    <small>문제 원천 5개 + 빈 산출물 3개 + 정답 예시 2개 + 안내문</small>
  </div>
  <a class="tool-button" href="../labs/saebom-ai-ready-lab.zip" download>ZIP 내려받기</a>
</div>

## 실습 목표와 범위

> A공장 설비 담당자 8명이 P-101 반복 경보가 발생했을 때, 효력 중인 승인 절차와
> 최근 승인된 유사 조치를 찾아 **첫 확인 순서**를 결정하도록 돕는다.

자동 제어, 부품 주문, 작업 승인, B공장, 개인 메일함은 제외한다. 결과는 읽기 전용이며
원문 문서 ID와 위치를 반드시 표시한다.

## 제공 파일

| 파일 | 일부러 넣은 문제 | 실습에서 할 일 |
| --- | --- | --- |
| [`01-mail-thread.txt`](../labs/saebom/01-mail-thread.txt) | “최종”, 첨부 누락, 조건부 결정 | 결정 후보와 원문 ID 분리 |
| [`02-edm-register.csv`](../labs/saebom/02-edm-register.csv) | 승인·초안·스캔본·대체 관계 혼재 | SSoT와 보류 문서 판정 |
| [`03-alarm-history.csv`](../labs/saebom/03-alarm-history.csv) | 설비명·코드·단위·날짜 불일치 | 최소 품질 규칙 정의 |
| [`04-meeting-notes.txt`](../labs/saebom/04-meeting-notes.txt) | 담당자·기한·근거가 불완전 | 결정 로그로 다시 작성 |
| [`05-access-matrix.csv`](../labs/saebom/05-access-matrix.csv) | 원천별 권한 차이 | 허용·거절 질문 설계 |
| [`10-source-inventory-empty.csv`](../labs/saebom/10-source-inventory-empty.csv) | 빈 산출물 | 승인 원천 인벤토리 작성 |
| [`11-knowledge-register-empty.csv`](../labs/saebom/11-knowledge-register-empty.csv) | 빈 산출물 | 지식 후보·효력·근거 기록 |
| [`12-golden-set-empty.csv`](../labs/saebom/12-golden-set-empty.csv) | 빈 산출물 | 정상·모호·무근거·권한 평가 |

정답 예시는 마지막 회고 전까지 열지 않는다.

## 0–10분 · 질문과 중단 조건 잠그기

1. 위 범위 문장에서 사용자, 업무 순간, 승인 원천, 결정, 제외 범위를 표시한다.
2. 틀린 답이 나왔을 때 사람이 되돌릴 수 있는지 확인한다.
3. 다음 세 조건을 파일럿 중단 조건으로 기록한다.
   - A공장 일반 사용자에게 제한 문서가 한 건이라도 노출된다.
   - 승인 상태나 효력일을 확인하지 못한 절차를 답의 근거로 사용한다.
   - 근거가 없거나 충돌하는데도 단정적으로 답한다.

**산출물:** 승인할 유즈케이스 문장 1개, 제외 범위, 중단 조건 3개

## 10–30분 · Data Ready 만들기

### 원천과 권한

제공 파일을 읽고 `10-source-inventory-empty.csv`에 원천, 소유자 후보, 정보등급,
접근 역할, 형식, 갱신 주기, 승인 상태를 적는다. 개인 메일함은 “발견 가능”해도
수집 대상에서는 제외한다.

### 품질 규칙

`03-alarm-history.csv`에서 최소 다섯 가지 문제를 찾고 다음 형식으로 규칙을 쓴다.

> `[필드]`는 `[표준]`을 따르며, 위반 시 `[자동 교정/검역/사람 확인]`하고
> `[소유자]`가 `[기한]` 안에 처리한다.

**30일 게이트:** 허용 원천, ACL 상속 방식, 원본 ID, 추출 실패 처리, 삭제 전파를
설명하지 못하면 다음 단계로 넘기지 않는다.

## 30–50분 · Knowledge Ready 만들기

1. EDM 목록에서 현재 효력 중인 절차, 대체된 문서, 초안, 판정 보류를 구분한다.
2. 메일과 회의 메모에서 사실·규칙·결정 **후보**를 추출한다.
3. `11-knowledge-register-empty.csv`에 대상, 조건, 효력, 원문 위치, 승인자를 적는다.
4. 근거가 불충분한 후보는 억지로 승인하지 말고 `보류`로 남긴다.

::: tip 핵심 함정
메일 제목의 “최종”은 효력 증거가 아니다. 승인 상태, 적용 범위, 효력일, 대체 관계를
함께 확인해야 한다. AI가 잘 요약해도 이 판정은 현업 소유자가 승인한다.
:::

**60일 게이트:** SSoT, 충돌, 적용 대상, 조건·예외, 승인 상태, 원문 위치를 사람이
검토할 수 있어야 한다.

## 50–65분 · 답해야 할 때와 거절할 때 설계하기

`12-golden-set-empty.csv`에 최소 여섯 문항을 만든다.

- 정상 사실 질문 2개
- 모호해서 되물어야 하는 질문 1개
- 근거가 없어 거절할 질문 1개
- 과거 문서를 유도하는 질문 1개
- 제한 문서 권한을 시험하는 질문 1개

각 문항에는 사용자 역할, 허용 원천, 필수 인용, 기대 행동과 실패 심각도를 적는다.
정답 문자열만 적으면 문서가 바뀔 때 평가도 낡는다.

## 65–75분 · 효과와 다음 결정

현재 승인 절차 탐색 시간을 참가자가 가정하지 말고 실제 사용자에게 측정하도록
측정 카드를 설계한다.

| 항목 | 이번 실습에서 정할 것 |
| --- | --- |
| 기준선 | 동일 유형 질문 10건의 현재 탐색 시간 중앙값 |
| 선행지표 | 출처를 열어 효력·버전을 검증한 비율 |
| 품질지표 | 골든셋 통과율, 권한 실패 건수, 근거 없는 주장 건수 |
| 경제적 효과 | 절약시간 × 실제 사용량 × 시간당 총인건비 |
| 현금 효과 | 실제로 제거된 외주·라이선스·초과근무 비용만 별도 집계 |
| 결정 | 확대 / 보완 후 재검증 / 중단 중 하나와 승인자 |

## 회고용 정답 예시

<details>
<summary>팀 산출물을 먼저 완성한 뒤 펼치세요</summary>

- [`90-knowledge-register-example.csv`](../labs/saebom/90-knowledge-register-example.csv)은
  “정답을 많이 채우는 것”보다 보류·대체·권한 경계를 명시하는 방식을 보여준다.
- [`91-golden-set-example.csv`](../labs/saebom/91-golden-set-example.csv)은 정상 답변뿐
  아니라 명확화·거절·권한 차단을 평가 대상으로 포함한다.
- 예시와 다른 결론이라도 원문 위치, 승인자, 판정 근거가 명확하면 더 나은 답일 수 있다.

</details>

이 실습 구조는 [NIST AI RMF Playbook](https://airc.nist.gov/airmf-resources/playbook/)의
Map·Measure·Manage 활동을 작은 검색 유즈케이스에 맞춰 단순화한 교육 예시다.
