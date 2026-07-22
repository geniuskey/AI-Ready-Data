<script setup lang="ts">
import { computed, reactive } from 'vue'
import { withBase } from 'vitepress'

const axes = [
  { key: 'sources', group: 'data', label: '원천·접근', hint: '위치·소유자·수집 승인' },
  { key: 'machine', group: 'data', label: '기계 판독', hint: '파싱·OCR·표 구조' },
  { key: 'quality', group: 'data', label: '품질·표준', hint: '형식·단위·중복·오류' },
  { key: 'lifecycle', group: 'data', label: '보호·계보', hint: 'ACL·버전·보존·삭제' },
  { key: 'semantics', group: 'knowledge', label: '용어·의미', hint: '정의·동의어·코드' },
  { key: 'authority', group: 'knowledge', label: 'SSoT·효력', hint: '권위·시점·승인 상태' },
  { key: 'context', group: 'knowledge', label: '맥락·관계', hint: '대상·조건·예외·연결' },
  { key: 'evidence', group: 'knowledge', label: '근거·평가', hint: '원문·승인·골든셋' }
] as const

const groups = [
  { key: 'data', label: 'Data Ready', description: '읽기·품질·권한·계보' },
  { key: 'knowledge', label: 'Knowledge Ready', description: '의미·효력·맥락·근거' }
] as const

const scores = reactive<Record<string, number>>(Object.fromEntries(axes.map((axis) => [axis.key, 0])))
const touched = reactive<Record<string, boolean>>(Object.fromEntries(axes.map((axis) => [axis.key, false])))

const average = computed(() => axes.reduce((sum, axis) => sum + scores[axis.key], 0) / axes.length)
const groupAverages = computed(() => Object.fromEntries(groups.map((group) => {
  const groupAxes = axes.filter((axis) => axis.group === group.key)
  const value = groupAxes.reduce((sum, axis) => sum + scores[axis.key], 0) / groupAxes.length
  return [group.key, value]
})))
const minimum = computed(() => Math.min(...axes.map((axis) => scores[axis.key])))
const completed = computed(() => axes.filter((axis) => touched[axis.key]).length)
const blockers = computed(() => axes.filter((axis) => touched[axis.key] && scores[axis.key] < 2))
const criticalStop = computed(() => ['sources', 'lifecycle', 'authority'].some((key) => touched[key] && scores[key] < 2))

const decision = computed(() => {
  if (completed.value < axes.length) return { label: '진단 중', tone: 'neutral', text: `${axes.length - completed.value}개 축을 더 입력하세요.` }
  if (criticalStop.value) return { label: '중단', tone: 'danger', text: '원천·보호·SSoT 근거를 먼저 확보해야 합니다.' }
  if (minimum.value < 2) return { label: '조건부', tone: 'warning', text: '가장 낮은 축의 30일 조치를 먼저 승인하세요.' }
  if (groupAverages.value.data >= 3 && groupAverages.value.knowledge >= 3) {
    return { label: '파일럿 후보', tone: 'success', text: '두 준비축을 통과한 범위로 제한 검증을 시작할 수 있습니다.' }
  }
  return { label: '기초 준비 보완', tone: 'warning', text: '더 낮은 준비축의 증거를 보완한 뒤 재진단하세요.' }
})

function markTouched(key: string) {
  touched[key] = true
}

function reset() {
  for (const axis of axes) {
    scores[axis.key] = 0
    touched[axis.key] = false
  }
}
</script>

<template>
  <section class="ard-tool readiness-tool" aria-labelledby="readiness-tool-title">
    <header class="tool-header">
      <div>
        <span class="tool-kicker">TWO-TRACK · 8-AXIS CHECK</span>
        <h2 id="readiness-tool-title">Data와 Knowledge 준비도 진단</h2>
        <p>두 준비축을 섞어 평균내지 말고 확인할 수 있는 증거로 각각 평가하세요.</p>
      </div>
      <div class="decision-chip" :data-tone="decision.tone">
        <span>{{ decision.label }}</span>
        <strong>{{ completed }}/8</strong>
      </div>
    </header>

    <div class="readiness-layout">
      <div class="score-controls">
        <section v-for="group in groups" :key="group.key" class="score-group" :data-group="group.key">
          <header><strong>{{ group.label }}</strong><small>{{ group.description }}</small></header>
          <label v-for="axis in axes.filter((item) => item.group === group.key)" :key="axis.key" class="score-control">
            <span><strong>{{ axis.label }}</strong><small>{{ axis.hint }}</small></span>
            <input
              v-model.number="scores[axis.key]"
              type="range"
              min="0"
              max="5"
              step="1"
              :aria-label="`${axis.label} 점수`"
              @input="markTouched(axis.key)"
            />
            <output :class="{ untouched: !touched[axis.key] }">{{ touched[axis.key] ? scores[axis.key] : '–' }}</output>
          </label>
        </section>
      </div>

      <aside class="score-visual" aria-live="polite">
        <div class="lane-score-cards">
          <div v-for="group in groups" :key="group.key" :data-group="group.key">
            <span>{{ group.label }}</span>
            <strong>{{ completed === 8 ? groupAverages[group.key].toFixed(1) : '–' }}</strong>
            <small>/ 5.0</small>
          </div>
        </div>
        <p class="overall-score">전체 참고 평균 <strong>{{ completed === 8 ? average.toFixed(1) : '–' }}</strong></p>
        <div class="score-bars" aria-label="영역별 준비도 막대그래프">
          <div v-for="axis in axes" :key="axis.key" :data-group="axis.group">
            <span>{{ axis.label }}</span>
            <i><b :style="{ width: touched[axis.key] ? `${scores[axis.key] * 20}%` : '0%' }" /></i>
          </div>
        </div>
        <p class="decision-text">{{ decision.text }}</p>
        <p v-if="blockers.length" class="blocker-text">
          우선 보완: {{ blockers.map((axis) => axis.label).join(' · ') }}
        </p>
      </aside>
    </div>

    <footer class="tool-footer">
      <span>입력값은 브라우저 밖으로 전송되지 않습니다.</span>
      <div>
        <button type="button" class="tool-button secondary" @click="reset">초기화</button>
        <a class="tool-button" :href="withBase('/templates/readiness-assessment')">상세 진단표 열기</a>
      </div>
    </footer>
  </section>
</template>
