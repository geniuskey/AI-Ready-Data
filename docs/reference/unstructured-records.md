---
title: 비정형 문서·기록 근거
description: 이메일, HWP, Office, PDF, 회의, 음성을 보존하고 추출·정규화할 때 쓰는 표준과 도구 문서
status: reviewed
page_type: reference
audience: [기록관리자, 데이터 엔지니어, 현업 리더, 아키텍트]
maturity_level: [0, 1, 2, 3, 4, 5]
topics: [비정형 데이터, 전자기록, 이메일, 문서 추출, OCR, ASR]
last_updated: 2026-07-22
review_due: 2027-01-22
---

# 비정형 문서·기록 근거

추출이 성공해도 업무 증거가 되는 것은 아니다. **원본·맥락·효력·권한·보존**을 먼저
정하고, 텍스트와 표는 검색용 파생물로 관리한다.

## 기록 생애주기

| 근거 | 적용 지점 | 한계·주의 |
| --- | --- | --- |
| [ISO 15489-1:2016](https://www.iso.org/standard/62542.html) | 형식과 무관한 기록 생성·획득·관리 | 국내 법정 보존기간은 별도 확인 |
| [ISO 30301:2019](https://www.iso.org/standard/74292.html) | 기록 경영시스템 요구사항 | 2026년 현재 `to be revised` 상태 |
| [국가기록원 전자기록관리](https://www.archives.go.kr/next/newmanager/electronicProperty.do) | 메일·첨부·웹·문서와 메타데이터·감사추적 | 공공기관 중심, 민간은 운영 원칙 참고 |
| [국가기록원 전자기록의 구조](https://www.archives.go.kr/next/newmanager/electronicStructure.do) | 업무과정·시점·참여자 맥락 | 검색 텍스트만으로 맥락 대체 불가 |
| [NARA Universal ERM Requirements](https://www.archives.gov/records-mgmt/policy/universalermrequirements) | 획득·사용·처분·이관·메타데이터·보고 | 미국 연방기관용, 국내 직접 규정 아님 |
| [NARA Email Management](https://www.archives.gov/records-mgmt/email-mgmt) | 본문·첨부·전자메시지 기록관리 | 조직 보존표와 법적 보존 우선 |
| [NARA FERMI](https://www.archives.gov/records-mgmt/policy/fermi) | 시스템 요구·표준 데이터 요소·서비스 척도 | 조달 모델을 그대로 복제하지 않음 |
| [NARA Meeting Documentation](https://www.archives.gov/records-mgmt/policy/agency-recordkeeping-requirements.html) | 참석·안건·자료·논의·결정·행동·책임 | 회의별 중요도에 비례해 적용 |
| [NARA Video Conference Bulletin](https://www.archives.gov/records-mgmt/bulletins/2023/2023-04) | 녹음 없이 결정 증거를 남기는 기준 | 미국 연방 기록 일정에 종속 |

NARA 자료는 “모든 회의를 녹음하라”는 지침이 아니다. 녹음·전사 없이도 결정·근거·담당·기한을
회의록에 남길 수 있고, 녹음이 있다면 원음·전사·승인 회의록의 지위와 보존을 분리한다.

## 파일·메일 형식

| 근거 | 적용 지점 | 한계·주의 |
| --- | --- | --- |
| [ISO 19005-1 PDF/A-1](https://www.iso.org/standard/38920.html) | 장기보존 PDF의 기반 | 검색성·접근성·업무 효력을 자동 보장하지 않음 |
| [Library of Congress RFS 2025-2026](https://wwws.loc.gov/preservation/resources/rfs/introduction.html) | 텍스트·데이터·메일·음성 보존형식 선택 | 미 의회도서관 수집 관점의 참고표 |
| [한컴 HWP/OWPML 형식](https://www.hancom.co.kr/support/downloadCenter/hwpOwpml) | HWP·HWPML·HWPX 구조와 변환 | 암호·배포용·구버전·개체는 별도 시험 |
| [KS X 6101 OWPML](https://www.standard.go.kr/KSCI/standardIntro/getStandardSearchView.do?ksNo=KSX6101&menuId=503&tmprKsNo=KSX6101&topMenuId=502) | 개방형 HWPX 문서 구조 | HWP 바이너리와 처리 경로가 다름 |
| [Microsoft Open XML SDK](https://learn.microsoft.com/en-us/office/open-xml/open-xml-sdk) | DOCX·XLSX·PPTX의 ZIP/XML 구조 처리 | SDK 지원이 렌더링 동일성 보장은 아님 |
| [Microsoft Office File Format Specs](https://learn.microsoft.com/en-us/openspecs/office_file_formats/ms-offfflp/8aea05e3-8c1e-4a9a-9614-31f71e679456) | 구형 DOC·XLS·PPT·PST 규격 | 복잡한 개체·매크로·암호는 격리 필요 |
| [RFC 5322](https://www.rfc-editor.org/info/rfc5322/) | Message-ID·References·In-Reply-To 기반 메일 스레드 | 로컬 저장 형식과 봉투 정보는 범위 밖 |
| [RFC 2045 MIME](https://www.rfc-editor.org/info/rfc2045/) | 본문·인코딩·첨부 구조 | 중첩 첨부와 위험 콘텐츠 검역 필요 |
| [RFC 4155 mbox](https://www.rfc-editor.org/info/rfc4155/) | mbox 보관·교환 | 변형이 많고 불필요 정보 노출 가능 |
| [Microsoft PST Specification](https://learn.microsoft.com/en-us/openspecs/office_file_formats/ms-pst/ad1e6f1a-575d-47e7-be9c-9433247d496c) | PST 유효성·읽기·쓰기 구현 | 기업 장기 기록 저장소로 자동 적합하지 않음 |

## 사내 추출 도구 후보

아래는 **PoC 후보**다. 제품 선정이나 보안 승인이 아니며 인터넷 차단 상태에서 모델·폰트·
언어팩·업데이트·원격측정 동작을 확인해야 한다.

| 후보 | 강점 | 반드시 검증할 것 |
| --- | --- | --- |
| [Apache Tika](https://tika.apache.org/) | 다수 형식의 타입·텍스트·메타데이터 추출 | 구형·손상·암호·중첩 파일과 JVM 취약점 |
| [Docling](https://docling-project.github.io/docling/reference/document_converter/) | PDF·Office·이미지 구조화 변환 | 표·도표·한국어·GPU/CPU 부하·라이선스 |
| [OCRmyPDF](https://ocrmypdf.readthedocs.io/en/stable/) | 스캔 PDF에 검색 가능한 OCR 레이어 추가 | 원본 보존·서명·악성 PDF·OCR 왜곡 |
| [Tesseract](https://github.com/tesseract-ocr/tessdoc) | 사내 OCR·다언어 스크립트 지원 | 한국어 글꼴·저해상도·표·세로쓰기 정확도 |
| [Whisper](https://github.com/openai/whisper) | 공개 가중치 기반 다언어 ASR | 한국어 고유명사·숫자·잡음·환각·GPU 비용 |
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | 로컬 CPU/GPU 추론 선택지 | 모델 파일 반입·양자화별 정확도·처리시간 |
| [Microsoft Presidio](https://github.com/microsoft/presidio) | PII 탐지·마스킹·가명처리 구성 | 모든 PII를 찾지 못하므로 사람 검증과 ACL 필요 |

## 원천별 최소 산출물

| 원천 | 보존할 원본 맥락 | 검색용 파생물 | 품질 게이트 |
| --- | --- | --- | --- |
| 메일 | Message-ID·스레드·송수신자·시각·첨부·폴더·ACL | 본문·첨부 텍스트·결정 후보 | 중복·인코딩·인용부·첨부 누락 |
| HWP/Office | 파일 해시·버전·소유자·승인·효력·ACL | 제목 구조·문단·표·노트·이미지 설명 | 표 셀·슬라이드 노트·개체·암호 |
| PDF/스캔 | 원본 PDF·페이지·서명·수집경로 | OCR 텍스트·좌표·표·신뢰도 | 페이지 누락·수치·단위·읽기 순서 |
| 회의 | 안건·참석 역할·자료 ID·결정권자 | 결정·근거·담당·기한 | 종료 전 확인·24시간 이의 절차 |
| 음성 | 승인 장비·고지·원음·시각·접근·보존 | 화자·구간·신뢰도 포함 전사 | 고유명사·숫자·결정은 원음 대조 |

파생 텍스트는 원본을 대체하지 않는다. 원본 ID·해시·페이지/시각·변환 도구와 버전·ACL·
보존·삭제 상태를 연결해야 SSoT 판정과 감사가 가능하다.
