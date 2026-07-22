<script setup lang="ts">
import { computed, reactive } from 'vue'
import { withBase } from 'vitepress'

const axes = [
  { key: 'fit', label: '업무 적합성', hint: '결정·효과 기준' },
  { key: 'find', label: '발견 가능성', hint: '원천·담당자 목록' },
  { key: 'quality', label: '품질', hint: '정확·완전·최신' },
  { key: 'standard', label: '표준화', hint: '용어·단위·구조' },
  { key: 'governance', label: '소유권·거버넌스', hint: '승인·정정·폐기' },
  { key: 'security', label: '보안·개인정보', hint: '처리근거·ACL' },
  { key: 'lineage', label: '출처·버전', hint: '원본·효력·계보' },
  { key: 'operations', label: '기계 활용·운영성', hint: '추출·삭제·평가' }
] as const

const scores = reactive<Record<string, number>>(Object.fromEntries(axes.map((axis) => [axis.key, 0])))
const touched = reactive<Record<string, boolean>>(Object.fromEntries(axes.map((axis) => [axis.key, false])))

const average = computed(() => axes.reduce((sum, axis) => sum + scores[axis.key], 0) / axes.length)
const minimum = computed(() => Math.min(...axes.map((axis) => scores[axis.key])))
const completed = computed(() => axes.filter((axis) => touched[axis.key]).length)
const blockers = computed(() => axes.filter((axis) => touched[axis.key] && scores[axis.key] < 2))
const criticalStop = computed(() => ['governance', 'security'].some((key) => touched[key] && scores[key] < 2))

const decision = computed(() => {
  if (completed.value < axes.length) return { label: '진단 중', tone: 'neutral', text: `${axes.length - completed.value}개 축을 더 입력하세요.` }
  if (criticalStop.value) return { label: '중단', tone: 'danger', text: '소유권 또는 보안 근거를 먼저 확보해야 합니다.' }
  if (minimum.value < 2) return { label: '조건부', tone: 'warning', text: '가장 낮은 축의 30일 조치를 먼저 승인하세요.' }
  if (average.value >= 3) return { label: '파일럿 후보', tone: 'success', text: '제한된 원천·사용자로 검증을 시작할 수 있습니다.' }
  return { label: '기초 통제 보완', tone: 'warning', text: '목록과 통제 증거를 보완한 뒤 재진단하세요.' }
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
        <span class="tool-kicker">8-AXIS CHECK</span>
        <h2 id="readiness-tool-title">준비도 빠른 진단</h2>
        <p>느낌이 아니라 확인할 수 있는 증거를 기준으로 0~5점을 선택하세요.</p>
      </div>
      <div class="decision-chip" :data-tone="decision.tone">
        <span>{{ decision.label }}</span>
        <strong>{{ completed }}/8</strong>
      </div>
    </header>

    <div class="readiness-layout">
      <div class="score-controls">
        <label v-for="axis in axes" :key="axis.key" class="score-control">
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
      </div>

      <aside class="score-visual" aria-live="polite">
        <div class="score-summary">
          <span>평균</span>
          <strong>{{ completed === 8 ? average.toFixed(1) : '–' }}</strong>
          <small>/ 5.0</small>
        </div>
        <div class="score-bars" aria-label="영역별 준비도 막대그래프">
          <div v-for="axis in axes" :key="axis.key">
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
