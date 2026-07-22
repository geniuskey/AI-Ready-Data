<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type ProfileKey = 'mail' | 'edm' | 'meeting' | 'spreadsheet' | 'secure'
type Track = 'data' | 'knowledge' | 'operation'
type Answer = 0 | 1 | 2 | null

interface Profile {
  key: ProfileKey
  icon: string
  label: string
  summary: string
  focus: string[]
  sample: Array<Exclude<Answer, null>>
}

interface Question {
  key: string
  track: Track
  label: string
  hint: string
}

interface Action {
  id: string
  question: string
  track: Track
  phase: 30 | 60 | 90
  title: string
  outcome: string
  owner: string
  kpi: string
  guide: string
  template?: string
}

const STORAGE_KEY = 'ai-ready-data-workbench-v1'

const profiles: Profile[] = [
  {
    key: 'mail',
    icon: '✉',
    label: '메일 중심',
    summary: '결정·첨부·업무 맥락이 공유 메일함과 개인 메일함에 흩어져 있다.',
    focus: ['inventory', 'records', 'ssot'],
    sample: [1, 0, 1, 1, 0, 0, 0, 0, 0, 1]
  },
  {
    key: 'edm',
    icon: '▤',
    label: 'EDM 혼란',
    summary: '초안·최종·스캔·개인 복사본이 섞여 어떤 문서가 유효한지 모른다.',
    focus: ['inventory', 'ssot', 'evidence'],
    sample: [1, 1, 1, 1, 0, 1, 0, 0, 0, 1]
  },
  {
    key: 'meeting',
    icon: '◉',
    label: '회의 기록 부재',
    summary: '녹음은 어렵고 회의가 끝나면 결정·근거·담당자와 예외가 사라진다.',
    focus: ['records', 'terms', 'evidence'],
    sample: [1, 1, 1, 1, 1, 1, 1, 0, 0, 1]
  },
  {
    key: 'spreadsheet',
    icon: '▦',
    label: 'Excel 중심',
    summary: '병합 셀·자유 서식·제각각인 코드와 단위가 자동화를 막는다.',
    focus: ['machine', 'quality', 'terms'],
    sample: [1, 1, 1, 0, 0, 0, 1, 1, 0, 1]
  },
  {
    key: 'secure',
    icon: '◆',
    label: '폐쇄망·고보안',
    summary: '문서·질의·모델·로그를 외부에 보내지 않고 사내에서 통제해야 한다.',
    focus: ['access', 'inventory', 'evidence'],
    sample: [1, 1, 0, 1, 1, 1, 1, 1, 0, 1]
  }
]

const questions: Question[] = [
  { key: 'scope', track: 'operation', label: '업무 질문과 사용자를 한 문장으로 제한했다.', hint: '누가, 언제, 어떤 승인 원천으로 어떤 결정을 돕는가' },
  { key: 'inventory', track: 'data', label: '원천·소유자·등급·위치·보존기간을 목록화했다.', hint: '메일함, EDM, 공유 폴더, Excel을 포함한 실제 인벤토리' },
  { key: 'access', track: 'data', label: '원본 ACL과 삭제가 파생물·검색 결과까지 전파된다.', hint: '서비스 계정, 캐시, 청크, 백업까지 확인할 수 있는 증거' },
  { key: 'machine', track: 'data', label: '대표 문서의 텍스트·표·첨부를 기계가 안정적으로 읽는다.', hint: '파싱·OCR 표본검사와 실패·검역 대기열' },
  { key: 'quality', track: 'data', label: '날짜·단위·코드·중복의 품질 규칙과 소유자가 있다.', hint: '오류를 고치는 사람과 허용 기준이 정해져 있음' },
  { key: 'terms', track: 'knowledge', label: '핵심 용어·약어·동의어·단위의 뜻을 합의했다.', hint: '조직 용어사전과 정의 승인자' },
  { key: 'ssot', track: 'knowledge', label: '최종본·효력일·대체 관계·충돌 판정 근거가 있다.', hint: '파일명보다 문서 상태와 업무 효력으로 SSoT 판정' },
  { key: 'records', track: 'knowledge', label: '결정·조건·예외·담당자·기한을 구조적으로 남긴다.', hint: '녹음이 없어도 공동 회의록과 결정 로그로 포착' },
  { key: 'evidence', track: 'knowledge', label: '실제 질문·허용 근거·거절 조건으로 평가할 수 있다.', hint: '권한·오래된 문서·무근거 질문을 포함한 골든셋' },
  { key: 'value', track: 'operation', label: '현재 시간·오류·재작업 기준선과 중단 조건이 있다.', hint: '도입 전 수치, 비교 방법, 경제적 효과와 현금 효과의 분리' }
]

const actions: Action[] = [
  { id: 'scope', question: 'scope', track: 'operation', phase: 30, title: '유즈케이스 한 문장으로 잠그기', outcome: '사용자·업무 순간·승인 원천·결정·제외 범위를 합의한다.', owner: '현업 소유자', kpi: '승인된 범위 문장 1개', guide: '/templates/use-case-canvas' },
  { id: 'inventory', question: 'inventory', track: 'data', phase: 30, title: '원천과 소유자 지도 만들기', outcome: '메일·EDM·Office·Excel의 위치, 소유자, 등급과 수집 승인을 기록한다.', owner: '데이터 스튜어드', kpi: '대표 원천 소유자 확인율 100%', guide: '/04-sources/email', template: '/templates/source-inventory' },
  { id: 'access', question: 'access', track: 'data', phase: 30, title: 'ACL·삭제 전파 계약 세우기', outcome: '원본 권한을 청크·색인·캐시까지 상속하고 회수 훈련을 설계한다.', owner: '보안·IT', kpi: '권한 회수·삭제 훈련 통과', guide: '/02-govern/security', template: '/templates/access-matrix' },
  { id: 'machine', question: 'machine', track: 'data', phase: 30, title: '형식별 추출 품질 표본검사', outcome: '스캔 PDF, 표, 병합 셀, 첨부를 포함해 파싱 실패를 수치화한다.', owner: 'IT·데이터 담당', kpi: '필수 필드 추출 성공률', guide: '/05-pipeline/ingestion', template: '/templates/quality-scorecard' },
  { id: 'quality', question: 'quality', track: 'data', phase: 30, title: '최소 품질 규칙과 검역 운영', outcome: '날짜·단위·코드·중복 규칙과 실패 대기열의 책임자를 정한다.', owner: '데이터 스튜어드', kpi: '핵심 규칙 위반률·해결시간', guide: '/04-sources/office-spreadsheets', template: '/templates/quality-scorecard' },
  { id: 'terms', question: 'terms', track: 'knowledge', phase: 60, title: '업무 용어의 뜻과 소유자 합의', outcome: '약어·동의어·코드·단위의 정의와 승인자를 최소 범위에서 정한다.', owner: '지식 스튜어드', kpi: '핵심 용어 미정의율', guide: '/reference/glossary', template: '/templates/glossary-template' },
  { id: 'ssot', question: 'ssot', track: 'knowledge', phase: 60, title: 'SSoT·효력·충돌 판정', outcome: '최종본, 효력일, 적용 범위, 대체·충돌 관계를 사람이 승인한다.', owner: '현업 소유자', kpi: '미해결 충돌 수', guide: '/04-sources/edm-ssot', template: '/templates/ssot-register' },
  { id: 'records', question: 'records', track: 'knowledge', phase: 60, title: '회의와 메일의 결정을 지식으로 승격', outcome: '결정·근거·조건·예외·담당자·기한을 구조화하고 원문과 연결한다.', owner: '회의 주관자·현업', kpi: '결정 로그 완결률', guide: '/03-capture/better-records', template: '/templates/decision-log' },
  { id: 'evidence', question: 'evidence', track: 'knowledge', phase: 60, title: '실제 질문으로 골든셋 만들기', outcome: '정답뿐 아니라 허용 원천·필수 인용·명확화·거절 조건을 기록한다.', owner: 'AI 담당·사용자 대표', kpi: '골든셋 50문항·권한 실패 0건', guide: '/05-pipeline/rag-operations', template: '/templates/rag-golden-set' },
  { id: 'value', question: 'value', track: 'operation', phase: 30, title: '도입 전 기준선과 중단 조건 측정', outcome: '시간·오류·재작업·준수율을 정의하고 경제적 가치와 현금을 분리한다.', owner: '현업·재무', kpi: '기준선·비교 방법·중단값 승인', guide: '/01-assess/business-impact' },
  { id: 'pilot', question: 'evidence', track: 'operation', phase: 90, title: '제한된 읽기 전용 파일럿', outcome: '두 게이트를 통과한 원천과 사용자만 허용하고 모든 답에 근거를 표시한다.', owner: 'AI 담당·보안', kpi: '인용 검증률·거절 정확도', guide: '/ai-use/' },
  { id: 'operate', question: 'value', track: 'operation', phase: 90, title: '주간 평가와 확대·중단 결정', outcome: '실사용 로그와 기준선을 비교해 확대, 보완, 중단 중 하나를 결정한다.', owner: '현업 소유자·AX 리더', kpi: '효과·품질·위험 주간 보고', guide: '/01-assess/90-day-roadmap', template: '/templates/roadmap-raci' }
]

const answers = reactive<Record<string, Answer>>(Object.fromEntries(questions.map((question) => [question.key, null])))
const selectedProfileKey = ref<ProfileKey>('mail')
const hydrated = ref(false)
const restored = ref(false)

const selectedProfile = computed(() => profiles.find((profile) => profile.key === selectedProfileKey.value) ?? profiles[0])
const completed = computed(() => questions.filter((question) => answers[question.key] !== null).length)
const isComplete = computed(() => completed.value === questions.length)

function scoreFor(track: Track) {
  const matching = questions.filter((question) => question.track === track && answers[question.key] !== null)
  if (!matching.length) return 0
  const score = matching.reduce((sum, question) => sum + Number(answers[question.key]), 0)
  return score / (matching.length * 2) * 5
}

const scores = computed(() => ({
  data: scoreFor('data'),
  knowledge: scoreFor('knowledge'),
  operation: scoreFor('operation')
}))

const gate = computed(() => {
  if (!isComplete.value) return { tone: 'neutral', label: '진단 중', detail: `${questions.length - completed.value}문항이 남았습니다.` }
  const hardStops = ['scope', 'access', 'ssot', 'evidence'].filter((key) => answers[key] === 0)
  if (hardStops.length) return { tone: 'danger', label: '준비 우선', detail: '범위·권한·SSoT·평가의 중단 조건을 먼저 해결하세요.' }
  if (scores.value.data < 3 || scores.value.knowledge < 3) return { tone: 'warning', label: '조건부 준비', detail: '더 낮은 준비축의 30·60일 과제를 먼저 완료하세요.' }
  return { tone: 'success', label: '제한 파일럿 후보', detail: '통과한 원천과 사용자로만 읽기 전용 검증을 시작할 수 있습니다.' }
})

function actionPriority(action: Action) {
  const answer = answers[action.question]
  const gap = answer === null ? 1 : 2 - answer
  const profileBoost = selectedProfile.value.focus.includes(action.id) ? 0.8 : 0
  const pilotPenalty = action.phase === 90 && !isComplete.value ? -1 : 0
  return gap * 2 + profileBoost + pilotPenalty
}

const topActions = computed(() => [...actions]
  .filter((action) => action.phase !== 90)
  .sort((a, b) => actionPriority(b) - actionPriority(a) || a.phase - b.phase)
  .slice(0, 3))

const roadmap = computed(() => ([30, 60, 90] as const).map((phase) => ({
  phase,
  label: phase === 30 ? '찾고 읽고 통제' : phase === 60 ? '의미와 근거 승인' : '작게 운영하고 측정',
  actions: actions
    .filter((action) => action.phase === phase)
    .sort((a, b) => actionPriority(b) - actionPriority(a))
    .slice(0, phase === 90 ? 2 : 3)
})))

function setAnswer(key: string, value: Exclude<Answer, null>) {
  answers[key] = value
}

function loadSample() {
  questions.forEach((question, index) => {
    answers[question.key] = selectedProfile.value.sample[index]
  })
}

function reset() {
  questions.forEach((question) => {
    answers[question.key] = null
  })
  selectedProfileKey.value = 'mail'
  restored.value = false
  if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY)
}

function printResult() {
  if (typeof window === 'undefined') return
  document.body.classList.add('print-workbench')
  window.print()
}

function clearPrintMode() {
  document.body.classList.remove('print-workbench')
}

onMounted(() => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as { profile?: ProfileKey, answers?: Record<string, Answer> }
      if (profiles.some((profile) => profile.key === parsed.profile)) selectedProfileKey.value = parsed.profile as ProfileKey
      for (const question of questions) {
        const value = parsed.answers?.[question.key]
        if (value === 0 || value === 1 || value === 2) answers[question.key] = value
      }
      restored.value = completed.value > 0
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
  }
  hydrated.value = true
  window.addEventListener('afterprint', clearPrintMode)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') window.removeEventListener('afterprint', clearPrintMode)
})

watch([selectedProfileKey, answers], () => {
  if (!hydrated.value || typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile: selectedProfileKey.value, answers: { ...answers } }))
}, { deep: true })
</script>

<template>
  <section id="execution-workbench" class="ard-tool execution-workbench" aria-labelledby="workbench-title">
    <header class="tool-header workbench-header">
      <div>
        <span class="tool-kicker">PRIVATE · CLIENT-SIDE WORKBENCH</span>
        <h2 id="workbench-title">우리 조직의 첫 90일 실행안</h2>
        <p>조직 상황과 10개 증거를 선택하면 우선 과제·담당자·KPI·템플릿을 한 화면에 연결합니다.</p>
      </div>
      <div class="decision-chip" :data-tone="gate.tone">
        <span>{{ gate.label }}</span>
        <strong>{{ completed }}/10</strong>
      </div>
    </header>

    <div class="workbench-section profile-section">
      <div class="section-heading">
        <div><span>STEP 1</span><h3>가장 닮은 출발점</h3></div>
        <button type="button" class="sample-button" @click="loadSample">이 유형의 예시값 적용</button>
      </div>
      <div class="profile-grid" role="radiogroup" aria-label="조직 출발점">
        <button
          v-for="profile in profiles"
          :key="profile.key"
          type="button"
          role="radio"
          class="profile-card"
          :aria-checked="selectedProfileKey === profile.key"
          :data-selected="selectedProfileKey === profile.key"
          @click="selectedProfileKey = profile.key"
        >
          <span class="profile-icon" aria-hidden="true">{{ profile.icon }}</span>
          <strong>{{ profile.label }}</strong>
          <small>{{ profile.summary }}</small>
        </button>
      </div>
    </div>

    <div class="workbench-section evidence-section">
      <div class="section-heading">
        <div><span>STEP 2</span><h3>느낌이 아닌 증거로 답하기</h3></div>
        <small>없음 0 · 일부 1 · 증거 있음 2</small>
      </div>
      <div class="question-list">
        <article v-for="(question, index) in questions" :key="question.key" class="evidence-question" :data-track="question.track">
          <div class="question-copy">
            <span>{{ String(index + 1).padStart(2, '0') }} · {{ question.track === 'data' ? 'DATA' : question.track === 'knowledge' ? 'KNOWLEDGE' : 'SCOPE & VALUE' }}</span>
            <strong>{{ question.label }}</strong>
            <small>{{ question.hint }}</small>
          </div>
          <div class="answer-set" :aria-label="`${question.label} 평가`">
            <button
              v-for="option in [{ value: 0, label: '없음' }, { value: 1, label: '일부' }, { value: 2, label: '증거 있음' }]"
              :key="option.value"
              type="button"
              :aria-pressed="answers[question.key] === option.value"
              :data-selected="answers[question.key] === option.value"
              @click="setAnswer(question.key, option.value as 0 | 1 | 2)"
            >{{ option.label }}</button>
          </div>
        </article>
      </div>
    </div>

    <div class="workbench-results" aria-live="polite">
      <div class="result-hero">
        <div>
          <span>STEP 3 · RECOMMENDED ROUTE</span>
          <h3>{{ selectedProfile.label }} 조직의 우선 실행안</h3>
          <p>{{ gate.detail }}</p>
          <small v-if="restored">이 브라우저에 저장된 이전 결과를 복원했습니다.</small>
        </div>
        <div class="workbench-scores" aria-label="준비도 점수">
          <div data-track="data"><span>Data Ready</span><strong>{{ scores.data.toFixed(1) }}</strong><small>/ 5</small></div>
          <div data-track="knowledge"><span>Knowledge Ready</span><strong>{{ scores.knowledge.toFixed(1) }}</strong><small>/ 5</small></div>
          <div data-track="operation"><span>범위·효과</span><strong>{{ scores.operation.toFixed(1) }}</strong><small>/ 5</small></div>
        </div>
      </div>

      <section class="priority-section" aria-labelledby="priority-title">
        <div class="section-heading"><div><span>TOP 3</span><h3 id="priority-title">가장 먼저 승인할 과제</h3></div></div>
        <div class="priority-grid">
          <article v-for="(action, index) in topActions" :key="action.id" class="priority-card" :data-track="action.track">
            <span class="priority-rank">0{{ index + 1 }}</span>
            <h4>{{ action.title }}</h4>
            <p>{{ action.outcome }}</p>
            <dl>
              <div><dt>책임</dt><dd>{{ action.owner }}</dd></div>
              <div><dt>확인</dt><dd>{{ action.kpi }}</dd></div>
            </dl>
            <div class="priority-links">
              <a :href="withBase(action.guide)">가이드</a>
              <a v-if="action.template" :href="withBase(action.template)">템플릿</a>
            </div>
          </article>
        </div>
      </section>

      <section class="roadmap-section" aria-labelledby="roadmap-title">
        <div class="section-heading"><div><span>90 DAYS</span><h3 id="roadmap-title">맞춤 실행 순서</h3></div></div>
        <div class="workbench-roadmap">
          <article v-for="stage in roadmap" :key="stage.phase" :data-phase="stage.phase">
            <header><span>{{ stage.phase === 30 ? '0–30' : stage.phase === 60 ? '31–60' : '61–90' }}일</span><strong>{{ stage.label }}</strong></header>
            <ol>
              <li v-for="action in stage.actions" :key="action.id">
                <strong>{{ action.title }}</strong>
                <small>{{ action.owner }} · {{ action.kpi }}</small>
              </li>
            </ol>
          </article>
        </div>
      </section>
    </div>

    <footer class="tool-footer workbench-footer">
      <span>문서 내용은 입력하지 마세요. 선택값만 이 브라우저의 localStorage에 저장되며 외부로 전송되지 않습니다.</span>
      <div>
        <button type="button" class="tool-button secondary" @click="reset">초기화</button>
        <button type="button" class="tool-button" :disabled="!isComplete" @click="printResult">결과 인쇄·PDF</button>
      </div>
    </footer>
  </section>
</template>
