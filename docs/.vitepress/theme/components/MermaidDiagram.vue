<script setup lang="ts">
import { useData } from 'vitepress'
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{ code: string }>()
const { isDark } = useData()
const container = ref<HTMLElement>()
const error = ref('')
let sequence = 0

function decodeBase64Utf8(value: string) {
  const bytes = Uint8Array.from(window.atob(value), (character) => character.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

async function renderDiagram() {
  if (!container.value) return
  try {
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: isDark.value ? 'dark' : 'neutral',
      fontFamily: 'Pretendard, Noto Sans KR, system-ui, sans-serif'
    })
    const source = decodeBase64Utf8(props.code)
    const id = `ard-mermaid-${Date.now()}-${sequence++}`
    const result = await mermaid.render(id, source)
    if (container.value) container.value.innerHTML = result.svg
    error.value = ''
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : '다이어그램을 표시하지 못했습니다.'
  }
}

onMounted(renderDiagram)
watch(isDark, async () => {
  await nextTick()
  await renderDiagram()
})
</script>

<template>
  <figure class="mermaid-frame" aria-label="프로세스 다이어그램">
    <div ref="container" class="mermaid-canvas" />
    <figcaption v-if="error" class="tool-error">{{ error }}</figcaption>
  </figure>
</template>
