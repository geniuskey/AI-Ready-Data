# AI-Ready Data 기여 가이드

이 프로젝트는 사람과 AI가 함께 읽을 수 있고, 출처와 책임을 검증할 수 있는 한국어
실전 가이드를 지향합니다.

## 로컬 확인

먼저 [공식 설치 가이드](https://docs.astral.sh/uv/getting-started/installation/)에 따라
`uv`를 설치합니다. 저장소의 `.python-version`에 지정된 Python도 `uv`가 관리합니다.

```powershell
uv sync --locked
uv run --locked python scripts/validate_docs.py
uv run --locked pymarkdown --config .pymarkdown.json scan docs README.md CONTRIBUTING.md
uv run --locked mkdocs build --strict
```

Python 의존성을 바꿀 때는 `uv add <패키지>` 또는 `uv remove <패키지>`로
`pyproject.toml`과 `uv.lock`을 함께 갱신합니다. 잠금 파일을 직접 편집하지 않습니다.

## 문서 계약

모든 `docs/**/*.md`는 다음 YAML front matter를 가집니다.

```yaml
---
title: 사람이 이해할 제목
description: 검색 결과에 쓸 한 문장
status: draft | reviewed
page_type: guide | playbook | template | case | reference
audience: [주요 독자]
maturity_level: [0, 1, 2, 3, 4, 5]
topics: [검색 태그]
last_updated: YYYY-MM-DD
review_due: YYYY-MM-DD
---
```

사례 문서는 `case_type: verified-case | composite-case`와 같은 본문 배지를 추가합니다.
새 문서는 `mkdocs.yml` 내비게이션에 반드시 연결합니다.

## 출처와 사례

- 법령·표준·정부기관·공식 기술문서·원 연구를 우선합니다.
- 변경 가능한 사실과 수치는 문장 가까이에 직접 링크합니다.
- 벤더 고객 사례의 수치는 발표 주체의 주장임을 밝힙니다.
- 사실, 출처의 주장, 작성자의 해석을 한 문장에 섞지 않습니다.
- 합성 사례는 실제 조직처럼 보이는 이름·개인·성과를 사용하지 않고 명확히 표시합니다.

## 보안과 개인정보

- 실제 메일, 문서, 이름, 사번, 시스템 주소, 토큰, 내부 경로를 커밋하지 않습니다.
- 예제는 합성 데이터만 사용하고 비밀정보 검출 경고를 우회하지 않습니다.
- 취약점이나 민감한 문제는 공개 이슈 대신 저장소 소유자에게 비공개로 알립니다.

## 문체

- 독자가 무엇을 결정하고 어떤 증거를 남길지 먼저 씁니다.
- “항상”, “완벽”, “환각 제거”처럼 증명할 수 없는 단정을 피합니다.
- 제품 이름은 역량의 예시로만 사용하고 대안과 검증 질문을 함께 둡니다.
- 표는 작은 화면에서도 이해할 수 있게 열 수를 줄이고 긴 설명은 본문으로 옮깁니다.

## 라이선스

기여하면 문서·도표·템플릿은 CC BY 4.0, 코드와 구성은 MIT로 배포하는 데 동의하는
것으로 간주합니다. 제3자 콘텐츠를 복사하지 말고 허용 범위에서 요약·인용하고 원문을
연결하세요.
