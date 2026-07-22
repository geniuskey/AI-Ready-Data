<script setup lang="ts">
import { computed, reactive } from 'vue'

const values = reactive({
  annualCases: 12000,
  beforeMinutes: 18,
  afterMinutes: 8,
  adoptionRate: 65,
  hourlyCost: 55000,
  otherBenefits: 8640000,
  confirmedCash: 8640000,
  initialCost: 30000000,
  annualOperatingCost: 36000000
})

const capacityHours = computed(() =>
  Math.max(0, values.beforeMinutes - values.afterMinutes) / 60 * values.annualCases * (values.adoptionRate / 100)
)
const capacityValue = computed(() => capacityHours.value * values.hourlyCost)
const yearOneCost = computed(() => values.initialCost + values.annualOperatingCost)
const economicBenefit = computed(() => capacityValue.value + values.otherBenefits)
const economicRoi = computed(() => yearOneCost.value ? (economicBenefit.value - yearOneCost.value) / yearOneCost.value * 100 : 0)
const cashRoi = computed(() => yearOneCost.value ? (values.confirmedCash - yearOneCost.value) / yearOneCost.value * 100 : 0)
const maxBar = computed(() => Math.max(capacityValue.value, values.otherBenefits, yearOneCost.value, 1))

const scenarios = computed(() => [
  scenario('낮음', 0.7, Math.max(0, values.adoptionRate - 15) / Math.max(values.adoptionRate, 1), 0.7, 1.15),
  scenario('기준', 1, 1, 1, 1),
  scenario('높음', 1.2, Math.min(100, values.adoptionRate + 15) / Math.max(values.adoptionRate, 1), 1.2, 0.95)
])

function scenario(label: string, timeFactor: number, adoptionFactor: number, benefitFactor: number, costFactor: number) {
  const benefit = capacityValue.value * timeFactor * adoptionFactor + values.otherBenefits * benefitFactor
  const cost = yearOneCost.value * costFactor
  return { label, roi: cost ? (benefit - cost) / cost * 100 : 0 }
}

function won(value: number) {
  const absolute = Math.abs(value)
  if (absolute >= 100000000) return `${(value / 100000000).toFixed(1)}억원`
  if (absolute >= 10000) return `${Math.round(value / 10000).toLocaleString('ko-KR')}만원`
  return `${Math.round(value).toLocaleString('ko-KR')}원`
}

function percent(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}
</script>

<template>
  <section class="ard-tool roi-tool" aria-labelledby="roi-tool-title">
    <header class="tool-header">
      <div>
        <span class="tool-kicker">BUSINESS CASE</span>
        <h2 id="roi-tool-title">1년차 효과 계산기</h2>
        <p>시간 절감의 경제적 가치와 실제 현금 효과를 분리해 보세요.</p>
      </div>
      <div class="roi-headline" :data-positive="economicRoi >= 0">
        <span>경제적 ROI</span>
        <strong>{{ percent(economicRoi) }}</strong>
      </div>
    </header>

    <div class="roi-layout">
      <div class="input-grid">
        <label><span>연간 업무량 <small>건</small></span><input v-model.number="values.annualCases" type="number" min="0" /></label>
        <label><span>현재 건당 시간 <small>분</small></span><input v-model.number="values.beforeMinutes" type="number" min="0" /></label>
        <label><span>도입 후 시간 <small>분</small></span><input v-model.number="values.afterMinutes" type="number" min="0" /></label>
        <label><span>실제 도입률 <small>%</small></span><input v-model.number="values.adoptionRate" type="number" min="0" max="100" /></label>
        <label><span>시간당 총인건비 <small>원</small></span><input v-model.number="values.hourlyCost" type="number" min="0" step="1000" /></label>
        <label><span>기타 검증 편익 <small>원</small></span><input v-model.number="values.otherBenefits" type="number" min="0" step="100000" /></label>
        <label><span>확정 현금 절감 <small>원</small></span><input v-model.number="values.confirmedCash" type="number" min="0" step="100000" /></label>
        <label><span>초기 구축비 <small>원</small></span><input v-model.number="values.initialCost" type="number" min="0" step="100000" /></label>
        <label><span>연 운영비 <small>원</small></span><input v-model.number="values.annualOperatingCost" type="number" min="0" step="100000" /></label>
      </div>

      <aside class="roi-results" aria-live="polite">
        <div class="result-grid">
          <div><span>연간 절약시간</span><strong>{{ Math.round(capacityHours).toLocaleString('ko-KR') }}시간</strong></div>
          <div><span>생산 여력 가치</span><strong>{{ won(capacityValue) }}</strong></div>
          <div><span>경제적 총편익</span><strong>{{ won(economicBenefit) }}</strong></div>
          <div><span>1년차 총비용</span><strong>{{ won(yearOneCost) }}</strong></div>
        </div>

        <div class="value-bars" aria-label="편익과 비용 비교 막대그래프">
          <div><span>생산 여력</span><i><b :style="{ width: `${capacityValue / maxBar * 100}%` }" /></i><strong>{{ won(capacityValue) }}</strong></div>
          <div><span>기타 편익</span><i><b :style="{ width: `${values.otherBenefits / maxBar * 100}%` }" /></i><strong>{{ won(values.otherBenefits) }}</strong></div>
          <div class="cost"><span>총비용</span><i><b :style="{ width: `${yearOneCost / maxBar * 100}%` }" /></i><strong>{{ won(yearOneCost) }}</strong></div>
        </div>

        <div class="scenario-strip">
          <div v-for="item in scenarios" :key="item.label" :data-positive="item.roi >= 0">
            <span>{{ item.label }}</span><strong>{{ percent(item.roi) }}</strong>
          </div>
        </div>
        <p class="cash-result">현금 기준 ROI <strong>{{ percent(cashRoi) }}</strong></p>
      </aside>
    </div>

    <footer class="tool-footer">
      <span>합성 예시입니다. 중복 편익을 제거하고 재무 원장·실사용 로그로 교체하세요.</span>
    </footer>
  </section>
</template>
