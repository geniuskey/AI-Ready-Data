<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { data as references, type ReferenceItem } from '../../data/reference.data'

const query = ref('')
const group = ref('전체')
const evidence = ref('전체')
const stage = ref('전체')
const visibleCount = ref(18)

const groupNames: Record<string, string> = {
  KOR: '국내 기준',
  STD: '국제 표준',
  GOV: '거버넌스',
  SEC: '보안',
  REC: '기록·문서',
  TOOL: '도구',
  RAG: 'RAG·검색',
  VAL: '가치·효과'
}

function groupOf(item: ReferenceItem) {
  return groupNames[item.id.split('-')[0]] ?? '기타'
}

function evidenceOf(item: ReferenceItem) {
  const value = item.evidence_type
  if (/법·규제/.test(value)) return '법·규제'
  if (/표준|규격|RFC/.test(value)) return '표준·규격'
  if (/정부|국제기구|인증/.test(value)) return '정부·공공'
  if (/논문|연구|벤치마크|워킹페이퍼/.test(value)) return '연구·벤치마크'
  if (/문서|오픈소스|제품/.test(value)) return '기술문서'
  return '기타'
}

const groups = computed(() => ['전체', ...new Set(references.map(groupOf))])
const evidenceTypes = ['전체', '법·규제', '표준·규격', '정부·공공', '연구·벤치마크', '기술문서', '기타']
const stages = ['전체', '기획', '수집', '설계', '평가', '운영', '감사']

const filtered = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase('ko-KR')
  return references.filter((item) => {
    const haystack = Object.values(item).join(' ').toLocaleLowerCase('ko-KR')
    return (
      (!needle || haystack.includes(needle)) &&
      (group.value === '전체' || groupOf(item) === group.value) &&
      (evidence.value === '전체' || evidenceOf(item) === evidence.value) &&
      (stage.value === '전체' || item.use_stage.includes(stage.value))
    )
  })
})

const visible = computed(() => filtered.value.slice(0, visibleCount.value))
const distribution = computed(() => {
  const counts = new Map<string, number>()
  for (const item of references) counts.set(groupOf(item), (counts.get(groupOf(item)) ?? 0) + 1)
  const max = Math.max(...counts.values())
  return [...counts.entries()].map(([name, count]) => ({ name, count, width: `${(count / max) * 100}%` }))
})

watch([query, group, evidence, stage], () => {
  visibleCount.value = 18
})

function reset() {
  query.value = ''
  group.value = '전체'
  evidence.value = '전체'
  stage.value = '전체'
}
</script>

<template>
  <section class="ard-tool reference-explorer" aria-labelledby="reference-explorer-title">
    <header class="tool-header">
      <div>
        <span class="tool-kicker">INTERACTIVE INDEX</span>
        <h2 id="reference-explorer-title">근거를 결정 기준으로 찾기</h2>
        <p>제목을 훑는 대신 분야·근거 유형·적용 단계와 키워드로 좁히세요.</p>
      </div>
      <strong class="result-count">{{ filtered.length }}<small>/ {{ references.length }}건</small></strong>
    </header>

    <div class="reference-overview" aria-label="분야별 레퍼런스 수">
      <div v-for="item in distribution" :key="item.name" class="distribution-row">
        <span>{{ item.name }}</span>
        <div><i :style="{ width: item.width }" /></div>
        <strong>{{ item.count }}</strong>
      </div>
    </div>

    <div class="tool-filters">
      <label class="search-field">
        <span>검색</span>
        <input v-model="query" type="search" placeholder="예: ACL, 이메일, ROI, 품질" />
      </label>
      <label>
        <span>분야</span>
        <select v-model="group">
          <option v-for="item in groups" :key="item">{{ item }}</option>
        </select>
      </label>
      <label>
        <span>근거 유형</span>
        <select v-model="evidence">
          <option v-for="item in evidenceTypes" :key="item">{{ item }}</option>
        </select>
      </label>
      <label>
        <span>적용 단계</span>
        <select v-model="stage">
          <option v-for="item in stages" :key="item">{{ item }}</option>
        </select>
      </label>
      <button type="button" class="tool-button secondary" @click="reset">초기화</button>
    </div>

    <div v-if="visible.length" class="reference-list">
      <article v-for="item in visible" :key="item.id" class="reference-card">
        <div class="reference-meta">
          <span>{{ groupOf(item) }}</span>
          <span>{{ evidenceOf(item) }}</span>
          <span>{{ item.use_stage }}</span>
        </div>
        <h3><a :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a></h3>
        <p class="reference-issuer">{{ item.issuer }} · {{ item.published_or_version }} · {{ item.status }}</p>
        <p><strong>활용</strong>{{ item.application }}</p>
        <p class="caveat"><strong>주의</strong>{{ item.caveat }}</p>
      </article>
    </div>
    <p v-else class="empty-state">조건에 맞는 근거가 없습니다. 필터를 줄여보세요.</p>

    <button
      v-if="visibleCount < filtered.length"
      type="button"
      class="tool-button more-button"
      @click="visibleCount += 18"
    >
      {{ Math.min(18, filtered.length - visibleCount) }}건 더 보기
    </button>
  </section>
</template>
