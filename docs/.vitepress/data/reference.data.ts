import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'csv-parse/sync'
import { defineLoader } from 'vitepress'

export interface ReferenceItem {
  id: string
  domain: string
  title: string
  issuer: string
  evidence_type: string
  published_or_version: string
  status: string
  use_stage: string
  application: string
  caveat: string
  url: string
  checked_on: string
}

declare const data: ReferenceItem[]
export { data }

export default defineLoader({
  watch: ['../../public/downloads/reference-catalog.csv'],
  load() {
    const file = fileURLToPath(
      new URL('../../public/downloads/reference-catalog.csv', import.meta.url)
    )
    return parse(fs.readFileSync(file, 'utf8'), {
      columns: true,
      bom: true,
      skip_empty_lines: true
    }) as ReferenceItem[]
  }
})
