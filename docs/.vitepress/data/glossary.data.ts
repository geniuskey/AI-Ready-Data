import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'csv-parse/sync'
import { defineLoader } from 'vitepress'

export interface GlossaryItem {
  id: string
  term: string
  english: string
  category: string
  definition: string
  why: string
  aliases: string
}

declare const data: GlossaryItem[]
export { data }

export default defineLoader({
  watch: ['../../public/downloads/ai-ready-data-glossary.csv'],
  load() {
    const file = fileURLToPath(
      new URL('../../public/downloads/ai-ready-data-glossary.csv', import.meta.url)
    )
    return parse(fs.readFileSync(file, 'utf8'), {
      columns: true,
      bom: true,
      skip_empty_lines: true
    }) as GlossaryItem[]
  }
})
