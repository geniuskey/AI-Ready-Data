---
title: 보안·개인정보 근거
description: 온프레미스 AI와 RAG의 법·개인정보·제로트러스트·공급망·삭제 통제를 위한 근거
status: reviewed
page_type: reference
audience: [보안 담당자, 개인정보 담당자, 아키텍트, AI 엔지니어]
maturity_level: [1, 2, 3, 4, 5]
topics: [보안, 개인정보, 온프레미스, 제로트러스트, RAG 보안]
last_updated: 2026-07-22
review_due: 2026-10-22
---

# 보안·개인정보 근거

`사내 설치`와 `안전`은 같은 말이 아니다. 현행 국내 기준을 먼저 확인한 뒤, 국제
프레임워크와 공격별 실무 자료를 통제로 변환한다.

## 국내에서 먼저 확인할 것

| 근거 | 적용 지점 | 상태·주의 |
| --- | --- | --- |
| [개인정보 보호법](https://www.law.go.kr/법령/개인정보보호법) | 처리근거·최소수집·안전조치·권리 | 적용 시점의 현행본과 하위 규정 확인 |
| [인공지능기본법](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=&chrClsCd=010202&efYd=20260122&lsiSeq=282791&urlMode=lsInfoP) | 국내 AI 사업자·고영향 AI 등 기본 의무 | 2026-01-22 시행본, 조직 적용성 법무 검토 |
| [개인정보위 생성형 AI 개인정보 안내서](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS217&mCode=G010030000&nttId=11439) | 목적·수집·전처리·학습·배포·권리 보장 | 2025.8 현행 안내서 |
| [AI 프라이버시 리스크 관리 모델](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS217&mCode=G010030020&nttId=11014) | 용례·데이터 특성별 위험 식별·경감 | 2025.2, 법·기술 변화에 따라 갱신 가능 |
| [KISA AI 보안 안내서](https://www.kisa.or.kr/2060204/form?lang_type=KO&page=1&postSeq=19) | 모델·데이터·서비스 생애주기 보안 | 2026-03-13 정오 수정본 사용 |
| [KISA 제로트러스트 가이드라인 2.0](https://www.kisa.or.kr/2060204/form?lang_type=KO&page=1&postSeq=18) | 신원·기기·네트워크·데이터 접근 설계 | 조직 환경에 맞춘 단계 적용 |
| [KISA 제로트러스트 성숙도 해설서](https://www.kisa.or.kr/2060204/form?lang_type=KO&page=1&postSeq=21) | 성숙도 체크리스트와 로드맵 | 2025.12, 인증 기준 아님 |
| [ISMS-P 자료실](https://isms.kisa.or.kr/ntcn/rcsrm/selectGnrlRcsrmList.do) | 국내 정보보호·개인정보 관리체계 점검 | 최신 고시·세부점검항목을 함께 확인 |

안내서는 법률 자문을 대체하지 않는다. 개인정보가 없더라도 영업비밀·국가핵심기술·계약상
비밀·저작권·기록 보존 의무가 남을 수 있다.

## 경영시스템과 위험관리

| 근거 | 적용 지점 | 한계·주의 |
| --- | --- | --- |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) | 정보보호 경영시스템과 위험관리 | AI 공격 상세 통제는 별도 |
| [ISO/IEC 27701:2025](https://www.iso.org/standard/27701) | 독립형 개인정보 경영시스템 | 2019판은 철회됨 |
| [NIST CSF 2.0](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20) | Govern·Identify·Protect·Detect·Respond·Recover | 성과 중심, 구현 통제는 별도 선택 |
| [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework/privacy-framework) | 기업 위험관리와 프라이버시 결과 연결 | 1.1은 2026년 현재 초안 상태 확인 필요 |
| [NIST AI RMF GenAI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) | 생성형 AI 위험 시나리오와 조치 | 자발적 프로파일, 국내법 우선 |

## 온프레미스·제로트러스트·삭제

| 근거 | 통제로 바꿀 내용 | 한계·주의 |
| --- | --- | --- |
| [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) | 네트워크 위치가 아닌 신원·자원별 동적 승인 | 제품명이 아니라 아키텍처 원칙 |
| [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final) | 서비스 신원과 정책 기반 애플리케이션 접근 | 클라우드 네이티브 중심, 사내 환경에 조정 |
| [NIST SP 1800-35](https://csrc.nist.gov/pubs/sp/1800/35/final) | 온프레미스·멀티클라우드 19개 구현 예 | 예시 구성은 조직 위협모델로 재검증 |
| [NIST SP 800-88 Rev.2](https://csrc.nist.gov/pubs/sp/800/88/r2/final) | 저장매체 소거·폐기 프로그램 | 색인·캐시 논리삭제 정책은 별도 |
| [NSA Deploying AI Systems Securely](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/3741371/nsa-publishes-guidance-for-strengthening-ai-system-security/) | 배포 환경·모델·데이터·API 보호 | 미국 국가안보 관점의 보완 자료 |
| [CISA/NCSC Secure AI Development](https://www.cisa.gov/news-events/alerts/2023/11/26/cisa-and-uk-ncsc-unveil-joint-guidelines-secure-ai-system-development) | 설계·개발·배포·운영 전 생애주기 보안 | 법적 준수 체크리스트가 아님 |

## RAG·LLM 공격과 방어

| 근거 | 반드시 시험할 것 | 한계·주의 |
| --- | --- | --- |
| [OWASP RAG Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html) | 해시·계보·청크 ACL·오염·캐시·연쇄삭제 | 가장 직접적인 RAG 실무 근거 |
| [OWASP LLM Top 10 2025](https://genai.owasp.org/llm-top-10/?cat=253) | 프롬프트 인젝션·정보노출·공급망·과권한 | 위험 목록이지 완성 통제 세트는 아님 |
| [OWASP Prompt Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) | 직접·간접 지시 분리와 출력 검증 | 탐지만으로 완전 차단 불가 |
| [MITRE ATLAS](https://atlas.mitre.org/) | AI 공격 전술·기법 기반 위협모델 | 실제 환경 우선순위는 조직이 산정 |
| [ENISA Multilayer AI Cybersecurity](https://www.enisa.europa.eu/publications/multilayer-framework-for-good-cybersecurity-practices-for-ai) | 인프라·모델·데이터·애플리케이션 다층 통제 | EU 관점의 참고 프레임 |
| [ENISA AI Standardisation Mapping](https://www.enisa.europa.eu/publications/cybersecurity-of-ai-and-standardisation) | AI 보안 표준 간 범위 비교 | 표준 원문을 대신하지 않음 |

## 파이프라인별 최소 근거

| 구간 | 설계 질문 | 우선 근거 |
| --- | --- | --- |
| 수집 | 처리 목적·범위·민감도·원본 권한은 무엇인가 | PIPA·PIPC·ISO 27701 |
| 검역 | 악성파일·숨은 지시·공급망 오염을 어떻게 막는가 | KISA·CISA/NCSC·OWASP |
| 변환 | 원본 해시·도구 버전·변환 이력·실패를 남기는가 | NIST AI RMF·OWASP RAG |
| 색인 | 사용자별 검색 전 ACL 필터가 적용되는가 | OWASP RAG·NIST ZTA |
| 생성 | 근거 밖 주장·민감정보·위험 행동을 차단하는가 | OWASP·MITRE ATLAS |
| 운영 | 원본 변경·권한 회수·삭제가 파생물에 전파되는가 | OWASP RAG·NIST 800-88 |
| 사고 | 오염 원천·응답·사용자·버전을 재구성할 수 있는가 | NIST CSF·KISA |

## 도구 문서를 해석하는 법

[Microsoft Presidio](https://github.com/microsoft/presidio)는 사내에서 PII 탐지·마스킹을
구성할 수 있지만 공식 문서도 모든 민감정보 탐지를 보장하지 않는다고 명시한다. 자동
탐지는 위험 감소 통제일 뿐이다. 한국어·사번·협력사 코드·프로젝트명 등 조직 고유 식별자를
별도 규칙과 골든셋으로 평가하고, 원본 ACL과 최소권한을 대체하지 않는다.
