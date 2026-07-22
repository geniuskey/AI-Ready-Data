<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type Layout = 'title' | 'cards' | 'formula' | 'timeline' | 'architecture' | 'metrics' | 'checklist' | 'closing'

interface SlideItem {
  eyebrow?: string
  title: string
  text: string
  value?: string
  tone?: 'data' | 'knowledge' | 'risk' | 'value'
}

interface Slide {
  kicker: string
  title: string
  highlight?: string
  lead?: string
  layout: Layout
  items?: SlideItem[]
  footer?: string
  note: string
}

const slides: Slide[] = [
  {
    kicker: 'AI/AX SEMINAR · 60–90 MIN',
    title: 'AI-Ready Data',
    highlight: '읽을 수 있게. 믿을 수 있게.',
    lead: 'DX가 충분하지 않은 조직도 외부 반출 없이 시작하는 현실적인 첫 90일',
    layout: 'title',
    footer: 'Data Ready + Knowledge Ready → Evidence-based AI',
    note: '2분. 청중의 조직에서 AI보다 먼저 막히는 데이터·문서 문제를 손들어 확인한다. 오늘은 모델 선정이 아니라 AI가 읽어도 되고 믿어도 되는 범위를 만드는 방법을 다룬다고 예고한다.'
  },
  {
    kicker: 'THE REAL STARTING POINT',
    title: '모델보다 먼저 막히는 곳',
    lead: '데이터가 없는 게 아니라, 결정과 근거가 서로 다른 형태로 흩어져 있다.',
    layout: 'cards',
    items: [
      { eyebrow: 'MAIL', title: '결정이 스레드에', text: '첨부·회신·개인 메일함 사이에서 승인 근거가 사라진다.', tone: 'risk' },
      { eyebrow: 'EDM', title: '최종본이 여러 개', text: '초안·스캔·개인 복사본과 효력 중인 문서가 섞여 있다.', tone: 'risk' },
      { eyebrow: 'EXCEL', title: '표준이 사람 머릿속에', text: '병합 셀, 자유 서식, 제각각인 코드·단위가 자동화를 막는다.', tone: 'risk' },
      { eyebrow: 'MEETING', title: '맥락이 회의와 함께 종료', text: '녹음도 회의록도 없어서 결정·조건·예외·담당자가 남지 않는다.', tone: 'risk' }
    ],
    footer: '“파일이 있다”와 “AI가 안전하게 쓸 수 있다”는 다른 말이다.',
    note: '4분. 각 카드마다 청중이 겪는 사례를 하나씩 받는다. 핵심은 비정형 데이터의 양이 아니라 소유자·효력·권한·맥락이 보이지 않는다는 점이다.'
  },
  {
    kicker: 'ONE EQUATION',
    title: 'AI-Ready는 두 준비축이 만나는 상태',
    layout: 'formula',
    items: [
      { eyebrow: 'DATA READY', title: '읽고 통제할 수 있는가', text: '원천 · 파싱 · 품질 · 메타데이터 · ACL · 계보', tone: 'data' },
      { eyebrow: 'KNOWLEDGE READY', title: '의미와 효력을 믿을 수 있는가', text: '용어 · SSoT · 맥락 · 관계 · 근거 · 사람 승인', tone: 'knowledge' },
      { eyebrow: 'AI USE', title: '근거 있게 답하고 거절하는가', text: '검색 · 인용 · 권한 · 평가 · 변경 · 중단', tone: 'value' }
    ],
    footer: '한 축의 높은 점수가 다른 축의 중단 조건을 상쇄하지 않는다.',
    note: '5분. Data Ready와 Knowledge Ready를 분리한 이유를 설명한다. 파싱이 완벽해도 낡은 규정이면 위험하고, 정답을 아는 전문가가 있어도 권한·삭제가 색인에 반영되지 않으면 위험하다.'
  },
  {
    kicker: 'TRACK 01 · DATA READY',
    title: '데이터는 “많이”보다 “읽고 통제”',
    layout: 'cards',
    items: [
      { eyebrow: 'DISCOVER', title: '원천·소유자', text: '어디에 있고 누가 수집과 사용을 승인하는가', tone: 'data' },
      { eyebrow: 'PARSE', title: '기계 판독', text: '본문·표·첨부·스캔을 얼마나 정확히 추출하는가', tone: 'data' },
      { eyebrow: 'QUALITY', title: '품질·표준', text: '날짜·단위·코드·중복 오류를 누가 언제 고치는가', tone: 'data' },
      { eyebrow: 'CONTROL', title: '권한·계보', text: '원본 ACL·버전·삭제가 청크·색인·캐시에 전파되는가', tone: 'data' }
    ],
    footer: '산출물: 원천 인벤토리 · 접근 권한표 · 추출 품질 보고서 · 실패 대기열',
    note: '5분. “OCR을 했다”가 완료 기준이 아니라 표본으로 정확도를 확인하고 실패 문서를 검역하는 운영이 있어야 한다. 특히 원본보다 넓은 서비스 계정과 삭제되지 않은 캐시를 강조한다.'
  },
  {
    kicker: 'TRACK 02 · KNOWLEDGE READY',
    title: '지식은 “요약”보다 “효력과 근거”',
    layout: 'cards',
    items: [
      { eyebrow: 'SEMANTICS', title: '용어·의미', text: '약어·동의어·코드·단위가 질문과 문서에서 같은 뜻인가', tone: 'knowledge' },
      { eyebrow: 'AUTHORITY', title: 'SSoT·효력', text: '무엇이 현재 승인본이고 무엇을 대체했는가', tone: 'knowledge' },
      { eyebrow: 'CONTEXT', title: '맥락·관계', text: '누구에게 어떤 조건·예외·범위로 적용되는가', tone: 'knowledge' },
      { eyebrow: 'EVIDENCE', title: '근거·평가', text: '원문 위치·승인자·거절 조건을 사람이 검증할 수 있는가', tone: 'knowledge' }
    ],
    footer: 'AI는 지식 후보를 만들 수 있지만, 업무 효력을 승인하지 않는다.',
    note: '5분. 파일명의 최종, 최근 수정일, 검색 순위가 SSoT 기준이 아님을 설명한다. 정의·사실·규칙·절차·결정을 구분하고 후보와 승인 지식을 분리한다.'
  },
  {
    kicker: 'THREE GATES · NOT ONE BIG BANG',
    title: '첫 90일은 작은 증명 루프',
    layout: 'timeline',
    items: [
      { eyebrow: '0–30 DAYS', title: '찾고 읽고 통제', text: '범위 · 원천 · 파싱 · 품질 · ACL · 기준선', tone: 'data' },
      { eyebrow: '31–60 DAYS', title: '의미와 근거 승인', text: '용어 · SSoT · 효력 · 관계 · 골든셋', tone: 'knowledge' },
      { eyebrow: '61–90 DAYS', title: '작게 운영하고 측정', text: '제한 사용자 · 인용 · 거절 · 변경 · 효과 · 중단', tone: 'value' }
    ],
    footer: '게이트가 막히면 모델 튜닝으로 건너뛰지 않는다.',
    note: '5분. 전사 플랫폼이 아니라 한 질문·한 사용자 집단·승인 원천 몇 개로 루프를 만드는 것이 목표다. 각 단계의 승인자가 다음 단계 진입을 결정한다.'
  },
  {
    kicker: 'ON-PREMISES BY DESIGN',
    title: '외부 반출 없는 참조 흐름',
    lead: '문서·질의·임베딩·로그·모델을 같은 보안 경계 안에 두고 원본 권한을 끝까지 전달한다.',
    layout: 'architecture',
    items: [
      { eyebrow: 'IDENTITY', title: '사내 사용자·그룹', text: '질의 시점의 역할과 권한', tone: 'data' },
      { eyebrow: 'SOURCES', title: '메일·EDM·Office', text: '승인된 최소 원천과 원본 ACL', tone: 'data' },
      { eyebrow: 'PIPELINE', title: '파싱·검역·계보', text: '원본 ID, 해시, 메타데이터, 삭제', tone: 'data' },
      { eyebrow: 'KNOWLEDGE', title: 'SSoT·용어·골든셋', text: '사람이 승인한 의미와 효력', tone: 'knowledge' },
      { eyebrow: 'AI', title: '검색·LLM·감사로그', text: '근거 인용, 거절, 관측', tone: 'value' }
    ],
    footer: '인터넷 egress 차단만으로는 부족하다: 패키지·모델 반입, 원격측정, 관리자 권한도 통제한다.',
    note: '6분. 사용자 권한이 검색 전 필터와 결과 후 검증에 모두 적용되어야 한다. 모델·패키지 반입 절차, 원격측정 비활성화, 감사로그의 민감정보 최소화도 함께 설명한다.'
  },
  {
    kicker: '15-MINUTE WORKBENCH',
    title: '우리 조직의 막힌 곳부터 찾는다',
    layout: 'metrics',
    items: [
      { eyebrow: 'CONTEXT', title: '5개 출발점', text: '메일 · EDM · 회의 · Excel · 폐쇄망', value: '01', tone: 'data' },
      { eyebrow: 'EVIDENCE', title: '10개 증거 문항', text: '없음 · 일부 · 증거 있음', value: '10', tone: 'knowledge' },
      { eyebrow: 'ACTION', title: '상위 실행 과제', text: '책임자 · KPI · 가이드 · 템플릿', value: 'TOP 3', tone: 'value' }
    ],
    footer: '입력은 브라우저에만 저장된다. 조직명·문서 내용·개인정보는 묻지 않는다.',
    note: '4분 + 데모 5분. 실행 워크벤치를 열어 메일 중심 예시값을 적용하고 상위 세 과제가 어떻게 달라지는지 보여준다. 점수 경쟁이 아니라 증거의 부재를 대화로 바꾸는 도구라고 설명한다.'
  },
  {
    kicker: 'GATE 01 · DAY 30',
    title: '첫 달에는 챗봇 화면을 만들지 않아도 된다',
    layout: 'checklist',
    items: [
      { title: '업무 질문 하나', text: '사용자·순간·결정·승인 원천·제외 범위를 한 문장으로' },
      { title: '실제 질문 30개', text: '정상 질문과 답하면 안 되는 질문을 함께 수집' },
      { title: '원천·권한 인벤토리', text: '소유자·등급·ACL·보존·형식·규모·수집 승인' },
      { title: '추출 품질 표본', text: '대표·낡음·중복·스캔·암호화·깨진 표를 포함' },
      { title: '현재 기준선', text: '탐색 시간·재작업·오류·준수율과 중단 조건' }
    ],
    footer: '통과 질문: “원천 하나를 삭제하면 파생 청크와 검색 결과도 정해진 시간 안에 사라지는가?”',
    note: '4분. 30일 산출물이 다음 단계의 안전 경계를 만든다는 점을 강조한다. 대표 문서만 데모해서는 실제 운영 실패를 발견하지 못한다.'
  },
  {
    kicker: 'GATE 02 · DAY 60',
    title: '두 번째 달에는 “무엇을 믿을지” 합의한다',
    layout: 'checklist',
    items: [
      { title: '최소 용어사전', text: '핵심 약어·동의어·단위·코드와 정의 소유자' },
      { title: '지식 단위', text: '정의·사실·규칙·절차·결정 후보와 원문 위치' },
      { title: 'SSoT·충돌대장', text: '상태·효력일·적용 범위·대체·충돌·보류 판정' },
      { title: '골든셋 50문항', text: '정상·모호·무근거·과거 버전·권한·오염 문서' },
      { title: '사람 승인', text: 'AI 후보와 게시 지식을 분리하고 재검토일 지정' }
    ],
    footer: '통과 질문: “답의 문장마다 누가, 어떤 원문 근거로, 언제까지 유효하다고 승인했는가?”',
    note: '4분. 보류를 실패가 아니라 안전한 상태로 취급한다. 골든셋의 목적은 모델 점수를 예쁘게 만드는 것이 아니라 답변·명확화·거절의 경계를 명시하는 것이다.'
  },
  {
    kicker: 'GATE 03 · DAY 90',
    title: '세 번째 달에는 정답보다 운영 실패를 연습한다',
    layout: 'checklist',
    items: [
      { title: '읽기 전용·제한 사용자', text: '두 게이트를 통과한 원천과 기능만 허용' },
      { title: '근거 또는 거절', text: '원문·버전·절을 표시하고 근거 없으면 답하지 않음' },
      { title: '권한 회수·삭제 훈련', text: '사용자 그룹 변경과 원본 삭제가 캐시까지 전파' },
      { title: '변경·오염·롤백 훈련', text: '문서 개정, 숨은 지시, 파서 회귀를 의도적으로 시험' },
      { title: '확대·보완·중단', text: '효과·품질·위험·운영비 근거로 하나를 승인' }
    ],
    footer: '운영할 수 없는 데모는 성공이 아니라 미뤄진 사고다.',
    note: '4분. ACL 회수, 삭제, 문서 오염, 파서 업데이트처럼 실제 운영에서 일어날 변화를 파일럿 기간에 훈련한다. 목적 없는 확대보다 근거 있는 중단이 성숙한 결정임을 말한다.'
  },
  {
    kicker: 'HANDS-ON · SYNTHETIC CASE',
    title: '75분 실습: 흩어진 파일에서 승인 지식까지',
    layout: 'timeline',
    items: [
      { eyebrow: 'INPUT', title: '문제 원천', text: '메일 스레드 · EDM 목록 · 깨진 Excel · 부실 회의 메모', tone: 'risk' },
      { eyebrow: 'WORK', title: '두 게이트', text: '원천·권한·품질 → 용어·SSoT·효력·근거', tone: 'knowledge' },
      { eyebrow: 'OUTPUT', title: '운영 증거', text: '인벤토리 · 승인 지식 · 거절 포함 골든셋', tone: 'value' }
    ],
    footer: '회사·인물·주소·설비·문서는 모두 합성 데이터. 실제 자료 업로드 금지.',
    note: '3분. 세미나가 워크숍을 포함하면 여기서 실습 페이지와 ZIP을 연다. 팀별로 Data Ready, Knowledge Ready, 평가 역할을 나눠 75분 활동을 진행할 수 있다.'
  },
  {
    kicker: 'BUSINESS IMPACT · NO DOUBLE COUNTING',
    title: '경영효과는 네 바구니로 분리한다',
    layout: 'metrics',
    items: [
      { eyebrow: 'CASH', title: '현금 효과', text: '실제로 제거된 외주·라이선스·초과근무', value: '₩', tone: 'value' },
      { eyebrow: 'CAPACITY', title: '생산 여력', text: '절약시간 × 실제 사용량 × 총인건비', value: 'H', tone: 'data' },
      { eyebrow: 'QUALITY', title: '품질 효과', text: '재작업·오류·탐색 실패·준수율 변화', value: 'Δ', tone: 'knowledge' },
      { eyebrow: 'RISK', title: '위험 효과', text: '권한 사고·감사 지적·중단시간의 기대손실', value: 'P×I', tone: 'risk' }
    ],
    footer: '기준선 · 비교 집단 · 실제 도입률 · 낮음/기준/높음 시나리오를 함께 보고한다.',
    note: '5분. 시간 절감을 곧바로 현금 절감으로 보고하지 않는다. 같은 편익을 생산 여력과 비용 절감에 중복 계산하지 않고, 실제 사용률과 사람 검토 비용을 포함한다.'
  },
  {
    kicker: 'COMMON FAILURE MODES',
    title: '이 다섯 가지는 시작이 아니라 지름길처럼 보이는 우회로',
    layout: 'checklist',
    items: [
      { title: '전사 문서를 먼저 전부 색인', text: '범위·소유자·권한·삭제를 모른 채 위험만 확대' },
      { title: '파일명의 “최종”을 SSoT로 간주', text: '효력·승인·적용 범위·대체 관계를 확인하지 않음' },
      { title: '정상 질문만으로 데모', text: '모호함·무근거·권한·오염·변경 실패를 숨김' },
      { title: '시간 절감을 현금 효과로 보고', text: '재배치되지 않은 여력을 비용 절감과 중복 계산' },
      { title: '보안팀을 마지막에 호출', text: '이미 만든 구조를 폐기하거나 과도한 예외를 승인하게 됨' }
    ],
    footer: '가장 빠른 길은 범위를 작게 잡고 증거를 일찍 만드는 길이다.',
    note: '4분. 청중 조직에서 가장 익숙한 실패 유형을 고르게 한다. 보안·현업·데이터 소유자가 0일차에 같은 범위 문장을 승인해야 재작업을 줄일 수 있다.'
  },
  {
    kicker: 'START NEXT MONDAY',
    title: '다음 주에 할 일은 딱 다섯 가지',
    layout: 'checklist',
    items: [
      { title: '업무 질문 하나 고르기', text: '반복적이고 사람이 확인·복구할 수 있는 탐색 업무' },
      { title: '실제 사용자 5–20명 만나기', text: '질문 30개와 답하면 안 되는 질문 10개 수집' },
      { title: '원천 세 개만 목록화', text: '소유자·등급·ACL·보존·형식·수집 승인 확인' },
      { title: '현업·IT·보안 책임자 지정', text: '집단명이 아닌 실제 이름과 승인일 기록' },
      { title: '15분 워크벤치 실행', text: '가장 낮은 축의 상위 세 과제를 첫 백로그로 승인' }
    ],
    footer: '전사 AI 전략보다 먼저, 작고 되돌릴 수 있는 증명 루프 하나.',
    note: '3분. 각 항목의 실제 담당자를 청중이 메모하게 한다. 세미나 후 실행 워크벤치 링크와 템플릿을 공유한다.'
  },
  {
    kicker: 'THE TAKEAWAY',
    title: '데이터는 읽을 수 있게.',
    highlight: '지식은 믿을 수 있게.',
    lead: '두 게이트를 통과한 작은 범위에서만 AI를 운영하고, 효과와 위험의 증거로 다음 결정을 내린다.',
    layout: 'closing',
    footer: 'Q&A · AI-Ready Data 실행 워크벤치와 실습 팩은 이 사이트에서 바로 사용',
    note: '질의응답. 마지막으로 Data Ready, Knowledge Ready, 제한 운영의 세 문장을 반복한다. 질문을 모델·인프라, 데이터, 지식·업무, 보안·거버넌스, 경영효과 중 하나로 분류해 답한다.'
  }
]

const current = ref(0)
const notesVisible = ref(false)
const deck = ref<HTMLElement | null>(null)
const progress = computed(() => (current.value + 1) / slides.length * 100)
const currentSlide = computed(() => slides[current.value])

function go(index: number) {
  current.value = Math.max(0, Math.min(slides.length - 1, index))
}

function next() {
  go(current.value + 1)
}

function previous() {
  go(current.value - 1)
}

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (target?.matches('input, textarea, select')) return
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault()
    next()
  } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
    event.preventDefault()
    previous()
  } else if (event.key === 'Home') {
    event.preventDefault()
    go(0)
  } else if (event.key === 'End') {
    event.preventDefault()
    go(slides.length - 1)
  } else if (event.key.toLowerCase() === 'n') {
    notesVisible.value = !notesVisible.value
  } else if (event.key.toLowerCase() === 'f') {
    toggleFullscreen()
  }
}

async function toggleFullscreen() {
  if (typeof document === 'undefined' || !deck.value) return
  if (document.fullscreenElement) await document.exitFullscreen()
  else await deck.value.requestFullscreen()
}

function printDeck() {
  if (typeof window === 'undefined') return
  document.body.classList.add('print-seminar')
  window.print()
}

function clearPrintMode() {
  document.body.classList.remove('print-seminar')
}

onMounted(() => {
  const match = window.location.hash.match(/^#slide-(\d+)$/)
  if (match) go(Number(match[1]) - 1)
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('afterprint', clearPrintMode)
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('afterprint', clearPrintMode)
})

watch(current, (value) => {
  if (typeof window !== 'undefined') window.history.replaceState(null, '', `#slide-${value + 1}`)
})
</script>

<template>
  <section ref="deck" class="seminar-deck" aria-label="AI-Ready Data 세미나 슬라이드">
    <div class="seminar-toolbar">
      <a :href="withBase('/workbench/')">워크벤치</a>
      <a :href="withBase('/practice/')">실습</a>
      <button type="button" :aria-pressed="notesVisible" @click="notesVisible = !notesVisible">발표자 노트</button>
      <button type="button" @click="printDeck">인쇄·PDF</button>
      <button type="button" @click="toggleFullscreen">전체 화면</button>
    </div>

    <div class="slide-stage" aria-live="polite">
      <article
        v-for="(slide, index) in slides"
        :id="`slide-${index + 1}`"
        :key="slide.title"
        class="seminar-slide"
        :class="`layout-${slide.layout}`"
        :data-active="current === index"
        :aria-hidden="current !== index"
      >
        <div class="slide-glow" aria-hidden="true" />
        <header class="slide-heading">
          <span>{{ slide.kicker }}</span>
          <h2>{{ slide.title }}<em v-if="slide.highlight">{{ slide.highlight }}</em></h2>
          <p v-if="slide.lead">{{ slide.lead }}</p>
        </header>

        <div v-if="slide.items" class="slide-content">
          <div v-if="slide.layout === 'architecture'" class="architecture-flow">
            <template v-for="(item, itemIndex) in slide.items" :key="item.title">
              <div class="architecture-node" :data-tone="item.tone">
                <span>{{ item.eyebrow }}</span><strong>{{ item.title }}</strong><small>{{ item.text }}</small>
              </div>
              <b v-if="itemIndex < slide.items.length - 1" aria-hidden="true">→</b>
            </template>
          </div>

          <div v-else-if="slide.layout === 'formula'" class="formula-flow">
            <template v-for="(item, itemIndex) in slide.items" :key="item.title">
              <div class="formula-card" :data-tone="item.tone">
                <span>{{ item.eyebrow }}</span><strong>{{ item.title }}</strong><small>{{ item.text }}</small>
              </div>
              <b v-if="itemIndex < slide.items.length - 1" aria-hidden="true">{{ itemIndex === 0 ? '+' : '→' }}</b>
            </template>
          </div>

          <div v-else-if="slide.layout === 'timeline'" class="seminar-timeline">
            <div v-for="(item, itemIndex) in slide.items" :key="item.title" :data-tone="item.tone">
              <i>{{ itemIndex + 1 }}</i><span>{{ item.eyebrow }}</span><strong>{{ item.title }}</strong><small>{{ item.text }}</small>
            </div>
          </div>

          <div v-else-if="slide.layout === 'metrics'" class="seminar-metrics">
            <div v-for="item in slide.items" :key="item.title" :data-tone="item.tone">
              <span>{{ item.eyebrow }}</span><b>{{ item.value }}</b><strong>{{ item.title }}</strong><small>{{ item.text }}</small>
            </div>
          </div>

          <ol v-else-if="slide.layout === 'checklist'" class="seminar-checklist">
            <li v-for="(item, itemIndex) in slide.items" :key="item.title">
              <i>{{ String(itemIndex + 1).padStart(2, '0') }}</i><div><strong>{{ item.title }}</strong><small>{{ item.text }}</small></div>
            </li>
          </ol>

          <div v-else class="seminar-card-grid">
            <div v-for="item in slide.items" :key="item.title" :data-tone="item.tone">
              <span>{{ item.eyebrow }}</span><strong>{{ item.title }}</strong><small>{{ item.text }}</small>
            </div>
          </div>
        </div>

        <footer>{{ slide.footer }}</footer>
      </article>
    </div>

    <aside v-if="notesVisible" class="speaker-note" aria-label="현재 슬라이드 발표자 노트">
      <strong>발표자 노트 · {{ current + 1 }}</strong>
      <p>{{ currentSlide.note }}</p>
    </aside>

    <div class="seminar-controls">
      <button type="button" aria-label="이전 슬라이드" :disabled="current === 0" @click="previous">←</button>
      <label>
        <span class="sr-only">슬라이드 선택</span>
        <select :value="current" @change="go(Number(($event.target as HTMLSelectElement).value))">
          <option v-for="(slide, index) in slides" :key="slide.title" :value="index">{{ index + 1 }} · {{ slide.title }}</option>
        </select>
      </label>
      <span>{{ current + 1 }} / {{ slides.length }}</span>
      <button type="button" aria-label="다음 슬라이드" :disabled="current === slides.length - 1" @click="next">→</button>
    </div>
    <div class="seminar-progress" aria-hidden="true"><i :style="{ width: `${progress}%` }" /></div>
    <div class="seminar-shortcuts">← → 이동 · N 노트 · F 전체 화면</div>
  </section>
</template>

<style scoped>
.seminar-deck {
  --deck-bg: #060912;
  --deck-panel: #10172a;
  --deck-text: #f4f7ff;
  --deck-muted: #aeb8d0;
  --deck-data: #8ea1ff;
  --deck-knowledge: #51dfca;
  --deck-value: #ffc766;
  --deck-risk: #ff7d91;
  background: var(--deck-bg);
  border: 1px solid #26304a;
  border-radius: 1rem;
  color: var(--deck-text);
  container-type: inline-size;
  height: min(76vh, 760px);
  min-height: 540px;
  overflow: hidden;
  position: relative;
}

.seminar-deck:fullscreen {
  border: 0;
  border-radius: 0;
  height: 100vh;
  width: 100vw;
}

.seminar-deck::before {
  background-image: linear-gradient(rgb(142 161 255 / 5%) 1px, transparent 1px), linear-gradient(90deg, rgb(142 161 255 / 5%) 1px, transparent 1px);
  background-size: 44px 44px;
  content: "";
  inset: 0;
  mask-image: radial-gradient(circle at center, black, transparent 78%);
  pointer-events: none;
  position: absolute;
}

.seminar-toolbar {
  display: flex;
  gap: 0.4rem;
  position: absolute;
  right: 1rem;
  top: 0.8rem;
  z-index: 4;
}

.seminar-toolbar a,
.seminar-toolbar button {
  background: rgb(16 23 42 / 84%);
  border: 1px solid #34405e;
  border-radius: 999px;
  color: #dbe2f5 !important;
  cursor: pointer;
  font: inherit;
  font-size: 0.66rem;
  font-weight: 700;
  padding: 0.38rem 0.65rem;
  text-decoration: none;
}

.seminar-toolbar a:hover,
.seminar-toolbar button:hover,
.seminar-toolbar a:focus-visible,
.seminar-toolbar button:focus-visible {
  border-color: var(--deck-knowledge);
  color: white !important;
}

.slide-stage {
  height: 100%;
  position: relative;
}

.seminar-slide {
  box-sizing: border-box;
  display: none;
  flex-direction: column;
  height: 100%;
  inset: 0;
  justify-content: center;
  overflow: hidden;
  padding: clamp(3.2rem, 7cqw, 5.7rem) clamp(2rem, 7cqw, 6.6rem) clamp(3.5rem, 6cqw, 5rem);
  position: absolute;
}

.seminar-slide[data-active="true"] {
  display: flex;
}

.slide-glow {
  background: radial-gradient(circle, rgb(81 223 202 / 13%), transparent 68%);
  height: 36rem;
  pointer-events: none;
  position: absolute;
  right: -15rem;
  top: -15rem;
  width: 36rem;
}

.slide-heading {
  position: relative;
  z-index: 1;
}

.slide-heading > span {
  color: var(--deck-knowledge);
  display: block;
  font-size: clamp(0.58rem, 1.15cqw, 0.84rem);
  font-weight: 850;
  letter-spacing: 0.16em;
  margin-bottom: 0.65rem;
}

.slide-heading h2 {
  border: 0;
  color: var(--deck-text);
  font-size: clamp(1.75rem, 4.6cqw, 3.75rem);
  letter-spacing: -0.045em;
  line-height: 1.08;
  margin: 0;
  max-width: 58rem;
  padding: 0;
  white-space: pre-line;
}

.slide-heading h2 em {
  background: linear-gradient(90deg, var(--deck-data), var(--deck-knowledge));
  background-clip: text;
  color: transparent;
  display: block;
  font-style: normal;
  margin-top: 0.15em;
}

.slide-heading p {
  color: var(--deck-muted);
  font-size: clamp(0.82rem, 1.75cqw, 1.25rem);
  line-height: 1.5;
  margin: 0.8rem 0 0;
  max-width: 54rem;
}

.slide-content {
  margin-top: clamp(1rem, 3cqw, 2.1rem);
  position: relative;
  z-index: 1;
}

.seminar-slide footer {
  bottom: clamp(1.7rem, 3cqw, 2.6rem);
  color: var(--deck-muted);
  font-size: clamp(0.62rem, 1.15cqw, 0.82rem);
  left: clamp(2rem, 7cqw, 6.6rem);
  max-width: calc(100% - 12rem);
  position: absolute;
  z-index: 1;
}

.layout-title,
.layout-closing {
  background: radial-gradient(circle at 80% 20%, rgb(142 161 255 / 17%), transparent 34%), radial-gradient(circle at 25% 90%, rgb(81 223 202 / 12%), transparent 38%);
}

.layout-title .slide-heading h2,
.layout-closing .slide-heading h2 {
  font-size: clamp(2.4rem, 6.8cqw, 5.8rem);
}

.layout-title .slide-heading h2 em,
.layout-closing .slide-heading h2 em {
  font-size: 0.68em;
  white-space: nowrap;
}

.seminar-card-grid {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.seminar-card-grid > div,
.formula-card,
.seminar-metrics > div {
  background: rgb(16 23 42 / 86%);
  border: 1px solid #2b3651;
  border-radius: 0.85rem;
  padding: clamp(0.8rem, 2cqw, 1.3rem);
}

[data-tone="data"] { --tone: var(--deck-data); }
[data-tone="knowledge"] { --tone: var(--deck-knowledge); }
[data-tone="value"] { --tone: var(--deck-value); }
[data-tone="risk"] { --tone: var(--deck-risk); }

.seminar-card-grid > div {
  border-top: 0.22rem solid var(--tone, var(--deck-data));
}

.seminar-card-grid span,
.formula-card span,
.seminar-timeline span,
.seminar-metrics span,
.architecture-node span {
  color: var(--tone, var(--deck-knowledge));
  display: block;
  font-size: clamp(0.52rem, 0.95cqw, 0.68rem);
  font-weight: 850;
  letter-spacing: 0.12em;
}

.seminar-card-grid strong,
.formula-card strong,
.seminar-timeline strong,
.seminar-metrics strong,
.architecture-node strong {
  color: var(--deck-text);
  display: block;
  font-size: clamp(0.8rem, 1.7cqw, 1.22rem);
  line-height: 1.3;
  margin: 0.42rem 0 0.32rem;
}

.seminar-card-grid small,
.formula-card small,
.seminar-timeline small,
.seminar-metrics small,
.architecture-node small,
.seminar-checklist small {
  color: var(--deck-muted);
  display: block;
  font-size: clamp(0.62rem, 1.2cqw, 0.82rem);
  line-height: 1.55;
}

.formula-flow,
.architecture-flow {
  align-items: stretch;
  display: grid;
  gap: 0.55rem;
}

.formula-flow {
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 0.9fr);
}

.formula-flow > b,
.architecture-flow > b {
  align-items: center;
  color: #64708d;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
}

.formula-card {
  border-color: color-mix(in srgb, var(--tone) 55%, #2b3651);
}

.architecture-flow {
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
}

.architecture-node {
  align-items: center;
  background: color-mix(in srgb, var(--tone) 8%, var(--deck-panel));
  border: 1px solid color-mix(in srgb, var(--tone) 48%, #2b3651);
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 9rem;
  padding: 0.75rem;
  text-align: center;
}

.architecture-node strong {
  font-size: clamp(0.72rem, 1.35cqw, 1rem);
}

.architecture-node small {
  font-size: clamp(0.56rem, 1cqw, 0.72rem);
}

.seminar-timeline {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.seminar-timeline > div {
  background: linear-gradient(145deg, color-mix(in srgb, var(--tone) 12%, var(--deck-panel)), var(--deck-panel));
  border: 1px solid color-mix(in srgb, var(--tone) 40%, #2b3651);
  border-radius: 0.85rem;
  min-height: 10rem;
  padding: 1.1rem;
  position: relative;
}

.seminar-timeline i {
  color: color-mix(in srgb, var(--tone) 28%, transparent);
  font-size: 3.8rem;
  font-style: normal;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  right: 0.7rem;
  top: 0.5rem;
}

.seminar-metrics {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
}

.seminar-metrics > div {
  border-bottom: 0.2rem solid var(--tone, var(--deck-data));
}

.seminar-metrics b {
  color: var(--tone, var(--deck-data));
  display: block;
  font-size: clamp(1.5rem, 3.8cqw, 3rem);
  line-height: 1.05;
  margin: 0.5rem 0;
}

.seminar-checklist {
  display: grid;
  gap: 0.55rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.seminar-checklist li {
  align-items: center;
  background: rgb(16 23 42 / 76%);
  border: 1px solid #29334d;
  border-radius: 0.65rem;
  display: grid;
  gap: 0.85rem;
  grid-template-columns: 2.2rem 1fr;
  padding: 0.62rem 0.8rem;
}

.seminar-checklist i {
  color: var(--deck-knowledge);
  font-size: clamp(0.72rem, 1.2cqw, 0.9rem);
  font-style: normal;
  font-weight: 850;
}

.seminar-checklist strong {
  color: var(--deck-text);
  display: block;
  font-size: clamp(0.72rem, 1.35cqw, 0.95rem);
}

.speaker-note {
  background: rgb(5 8 16 / 94%);
  border: 1px solid #3a4666;
  border-radius: 0.75rem;
  bottom: 3.7rem;
  color: var(--deck-text);
  left: 1rem;
  max-width: min(38rem, calc(100% - 2rem));
  padding: 0.8rem 1rem;
  position: absolute;
  z-index: 5;
}

.speaker-note strong {
  color: var(--deck-value);
  font-size: 0.68rem;
}

.speaker-note p {
  color: #dbe2f5;
  font-size: 0.72rem;
  line-height: 1.55;
  margin: 0.3rem 0 0;
}

.seminar-controls {
  align-items: center;
  bottom: 0.75rem;
  display: flex;
  gap: 0.5rem;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  z-index: 6;
}

.seminar-controls button,
.seminar-controls select {
  background: rgb(16 23 42 / 90%);
  border: 1px solid #34405e;
  border-radius: 999px;
  color: #e7ecfa;
  font: inherit;
  font-size: 0.68rem;
  min-height: 2rem;
}

.seminar-controls button {
  cursor: pointer;
  width: 2rem;
}

.seminar-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.seminar-controls select {
  max-width: 16rem;
  padding: 0 0.65rem;
}

.seminar-controls > span {
  color: var(--deck-muted);
  font-size: 0.65rem;
  min-width: 2.8rem;
  text-align: center;
}

.seminar-progress {
  background: #172036;
  bottom: 0;
  height: 0.2rem;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 6;
}

.seminar-progress i {
  background: linear-gradient(90deg, var(--deck-data), var(--deck-knowledge));
  display: block;
  height: 100%;
  transition: width 180ms ease;
}

.seminar-shortcuts {
  bottom: 1rem;
  color: #707b96;
  font-size: 0.56rem;
  position: absolute;
  right: 1rem;
  z-index: 4;
}

.sr-only {
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

@container (max-width: 760px) {
  .seminar-deck { min-height: 620px; }
  .seminar-toolbar { left: 0.7rem; overflow-x: auto; right: 0.7rem; }
  .seminar-toolbar a, .seminar-toolbar button { flex: 0 0 auto; }
  .seminar-slide { justify-content: flex-start; overflow-y: auto; padding: 4.2rem 1.2rem 5rem; }
  .layout-title .slide-heading h2 em, .layout-closing .slide-heading h2 em { font-size: 0.78em; white-space: normal; }
  .seminar-card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .formula-flow, .architecture-flow, .seminar-timeline { grid-template-columns: 1fr; }
  .formula-flow > b, .architecture-flow > b { display: none; }
  .architecture-node { min-height: auto; }
  .seminar-slide footer { bottom: 3.4rem; left: 1.2rem; max-width: calc(100% - 2.4rem); position: absolute; }
  .seminar-shortcuts { display: none; }
  .seminar-controls select { max-width: 9rem; }
}

@media (prefers-reduced-motion: reduce) {
  .seminar-progress i { transition: none; }
}
</style>
