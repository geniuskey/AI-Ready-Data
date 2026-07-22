<script setup lang="ts">
import { computed, ref } from 'vue'
import { data as glossary } from '../../data/glossary.data'

const query = ref('')
const category = ref('전체')

const categories = computed(() => ['전체', ...new Set(glossary.map((item) => item.category))])
const filtered = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase('ko-KR')
  return glossary.filter((item) => {
    const haystack = Object.values(item).join(' ').toLocaleLowerCase('ko-KR')
    return (
      (!needle || haystack.includes(needle)) &&
      (category.value === '전체' || item.category === category.value)
    )
  })
})

function reset() {
  query.value = ''
  category.value = '전체'
}
</script>

<template>
  <section class="ard-tool glossary-explorer" aria-labelledby="glossary-explorer-title">
    <header class="tool-header">
      <div>
        <span class="tool-kicker">PLAIN-LANGUAGE GLOSSARY</span>
        <h2 id="glossary-explorer-title">낯선 용어를 쉬운 말로 찾기</h2>
        <p>약어·한글·영문·현장 표현 중 기억나는 것 하나만 입력하세요.</p>
      </div>
      <strong class="result-count">{{ filtered.length }}<small>/ {{ glossary.length }}개</small></strong>
    </header>

    <div class="tool-filters">
      <label class="search-field">
        <span>용어 검색</span>
        <input v-model="query" type="search" placeholder="예: 권한, SSoT, 검색 정확도, 최종본" />
      </label>
      <label>
        <span>분야</span>
        <select v-model="category">
          <option v-for="item in categories" :key="item">{{ item }}</option>
        </select>
      </label>
      <button type="button" class="tool-button secondary" @click="reset">초기화</button>
    </div>

    <div v-if="filtered.length" class="glossary-list">
      <article v-for="item in filtered" :id="item.id" :key="item.id" class="glossary-card">
        <div class="reference-meta">
          <span>{{ item.category }}</span>
        </div>
        <h3>
          <a :href="`#${item.id}`" :aria-label="`${item.term} 항목 링크`">{{ item.term }}</a>
          <small v-if="item.english">{{ item.english }}</small>
        </h3>
        <p>{{ item.definition }}</p>
        <p class="glossary-why"><strong>왜 중요한가</strong>{{ item.why }}</p>
        <p v-if="item.aliases" class="glossary-alias"><strong>함께 찾기</strong>{{ item.aliases }}</p>
      </article>
    </div>
    <p v-else class="empty-state">일치하는 용어가 없습니다. 검색어를 줄이거나 분야를 전체로 바꿔보세요.</p>
  </section>
</template>
