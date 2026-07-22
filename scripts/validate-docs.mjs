import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { parse as parseCsv } from 'csv-parse/sync'
import YAML from 'yaml'
import { sidebar } from '../docs/.vitepress/navigation.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = path.join(root, 'docs')
const required = new Set([
  'title',
  'description',
  'status',
  'page_type',
  'audience',
  'maturity_level',
  'topics',
  'last_updated',
  'review_due'
])
const enums = {
  status: new Set(['draft', 'reviewed']),
  page_type: new Set(['guide', 'playbook', 'template', 'case', 'reference'])
}
const caseTypes = new Set(['verified-case', 'composite-case'])
const coreDocs = new Set([
  'index.md',
  '00-start/what-is-ai-ready-data.md',
  '01-assess/readiness.md',
  '01-assess/business-impact.md',
  '01-assess/90-day-roadmap.md',
  '02-govern/governance.md',
  '02-govern/security.md',
  '03-capture/better-records.md',
  '04-sources/office-spreadsheets.md',
  '04-sources/email.md',
  '04-sources/edm-ssot.md',
  '05-pipeline/ingestion.md',
  '05-pipeline/rag-operations.md',
  '06-cases/index.md',
  'data-ready/index.md',
  'knowledge-ready/index.md',
  'knowledge-ready/knowledge-units.md',
  'ai-use/index.md',
  'workbench/index.md',
  'practice/index.md',
  'seminar/index.md'
])
const labFiles = new Set([
  '00-README.txt',
  '01-mail-thread.txt',
  '02-edm-register.csv',
  '03-alarm-history.csv',
  '04-meeting-notes.txt',
  '05-access-matrix.csv',
  '10-source-inventory-empty.csv',
  '11-knowledge-register-empty.csv',
  '12-golden-set-empty.csv',
  '90-knowledge-register-example.csv',
  '91-golden-set-example.csv'
])
const linkPattern = /(?<!!)\[[^\]]+\]\(([^)]+)\)/g
const secretPatterns = new Map([
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{30,}\b/]
])

function walkMarkdown(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  return entries.flatMap((entry) => {
    if (entry.name === '.vitepress' || entry.name === 'node_modules') return []
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return walkMarkdown(absolute)
    return entry.isFile() && entry.name.endsWith('.md') ? [absolute] : []
  })
}

function splitFrontMatter(file) {
  const text = fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n')
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error('YAML front matter가 없거나 닫히지 않았습니다')
  const metadata = YAML.parse(match[1])
  if (!metadata || Array.isArray(metadata) || typeof metadata !== 'object') {
    throw new Error('front matter가 객체가 아닙니다')
  }
  return { metadata, body: match[2] }
}

function flattenLinks(items) {
  return items.flatMap((item) => [
    ...(item.link ? [item.link] : []),
    ...(item.items ? flattenLinks(item.items) : [])
  ])
}

function routeToDocument(route) {
  if (route === '/') return 'index.md'
  const clean = route.replace(/^\//, '').replace(/\/$/, '')
  return route.endsWith('/') ? `${clean}/index.md` : `${clean}.md`
}

function validateInternalLink(source, rawTarget) {
  const target = decodeURIComponent(rawTarget.trim())
  if (!target || /^(https?:|mailto:|#)/i.test(target)) return null
  const pathPart = target.split('#', 1)[0].split('?', 1)[0]
  if (!pathPart) return null

  const candidate = pathPart.startsWith('/')
    ? path.join(docsRoot, pathPart.replace(/^\//, ''))
    : path.resolve(path.dirname(source), pathPart)
  if (fs.existsSync(candidate)) return null

  const candidateRelative = path.relative(docsRoot, candidate)
  if (!candidateRelative.startsWith('..')) {
    const publicCandidate = path.join(docsRoot, 'public', candidateRelative)
    if (fs.existsSync(publicCandidate)) return null
  }

  if (!path.extname(candidate)) {
    if (fs.existsSync(`${candidate}.md`) || fs.existsSync(path.join(candidate, 'index.md'))) {
      return null
    }
  }
  return `깨진 내부 링크: ${rawTarget}`
}

function validateReferenceCatalog(errors) {
  const file = path.join(docsRoot, 'public', 'downloads', 'reference-catalog.csv')
  const rows = parseCsv(fs.readFileSync(file, 'utf8'), {
    columns: true,
    bom: true,
    skip_empty_lines: true
  })
  const ids = new Set()
  const urls = new Set()
  for (const [index, row] of rows.entries()) {
    for (const field of ['id', 'domain', 'title', 'issuer', 'evidence_type', 'application', 'caveat', 'url', 'checked_on']) {
      if (!row[field]) errors.push(`reference-catalog.csv:${index + 2}: ${field} 누락`)
    }
    if (ids.has(row.id)) errors.push(`reference-catalog.csv:${index + 2}: 중복 ID ${row.id}`)
    if (urls.has(row.url)) errors.push(`reference-catalog.csv:${index + 2}: 중복 URL ${row.url}`)
    ids.add(row.id)
    urls.add(row.url)
  }
  if (rows.length < 100) errors.push(`reference-catalog.csv: 레퍼런스가 100건 미만입니다(현재 ${rows.length}건)`)
  return rows.length
}

function validateGlossary(errors) {
  const file = path.join(docsRoot, 'public', 'downloads', 'ai-ready-data-glossary.csv')
  const rows = parseCsv(fs.readFileSync(file, 'utf8'), {
    columns: true,
    bom: true,
    skip_empty_lines: true
  })
  const ids = new Set()
  const terms = new Set()
  const requiredFields = ['id', 'term', 'english', 'category', 'definition', 'why', 'aliases']
  for (const [index, row] of rows.entries()) {
    for (const field of requiredFields) {
      if (!row[field]) errors.push(`ai-ready-data-glossary.csv:${index + 2}: ${field} 누락`)
    }
    if (ids.has(row.id)) errors.push(`ai-ready-data-glossary.csv:${index + 2}: 중복 ID ${row.id}`)
    if (terms.has(row.term)) errors.push(`ai-ready-data-glossary.csv:${index + 2}: 중복 용어 ${row.term}`)
    ids.add(row.id)
    terms.add(row.term)
  }
  if (rows.length < 70) {
    errors.push(`ai-ready-data-glossary.csv: 용어가 70개 미만입니다(현재 ${rows.length}개)`)
  }
  return rows.length
}

function validateLabPack(errors) {
  const labRoot = path.join(docsRoot, 'public', 'labs', 'saebom')
  for (const fileName of labFiles) {
    const file = path.join(labRoot, fileName)
    if (!fs.existsSync(file)) {
      errors.push(`실습 팩 파일 누락: ${fileName}`)
      continue
    }
    if (fs.statSync(file).size === 0) errors.push(`실습 팩 파일이 비어 있음: ${fileName}`)
    const fileContents = fs.readFileSync(file, 'utf8')
    for (const [label, pattern] of secretPatterns) {
      if (pattern.test(fileContents)) errors.push(`실습 팩 ${fileName}: 잠재적 비밀정보 발견(${label})`)
    }
    if (fileName.endsWith('.csv')) {
      try {
        const rows = parseCsv(fileContents, {
          columns: true,
          bom: true,
          relax_column_count: false,
          skip_empty_lines: true
        })
        if (!rows.length) errors.push(`실습 팩 CSV에 데이터 행이 없음: ${fileName}`)
      } catch (error) {
        errors.push(`실습 팩 CSV 파싱 실패(${fileName}): ${error.message}`)
      }
    }
  }

  const readme = path.join(labRoot, '00-README.txt')
  if (fs.existsSync(readme) && !fs.readFileSync(readme, 'utf8').includes('합성 정보')) {
    errors.push('실습 팩 안내문에 합성 데이터 표시가 없습니다')
  }

  const archive = path.join(docsRoot, 'public', 'labs', 'saebom-ai-ready-lab.zip')
  if (!fs.existsSync(archive)) {
    errors.push('실습 팩 ZIP 누락: saebom-ai-ready-lab.zip')
  } else {
    const contents = fs.readFileSync(archive)
    if (contents.length < 1000 || contents.subarray(0, 2).toString('ascii') !== 'PK') {
      errors.push('실습 팩 ZIP이 비어 있거나 올바른 ZIP 형식이 아닙니다')
    }
    for (const fileName of labFiles) {
      if (!contents.includes(Buffer.from(fileName))) errors.push(`실습 팩 ZIP 내부 파일 누락: ${fileName}`)
    }
  }
  return labFiles.size
}

function main() {
  const errors = []
  const markdownFiles = walkMarkdown(docsRoot).sort()
  const relativeFiles = new Set(markdownFiles.map((file) => path.relative(docsRoot, file).replaceAll('\\', '/')))
  const navigationPaths = new Set(flattenLinks(sidebar).map(routeToDocument))

  for (const file of markdownFiles) {
    const relative = path.relative(docsRoot, file).replaceAll('\\', '/')
    let metadata
    let body
    try {
      ;({ metadata, body } = splitFrontMatter(file))
    } catch (error) {
      errors.push(`${relative}: ${error.message}`)
      continue
    }

    const missing = [...required].filter((field) => !(field in metadata))
    if (missing.length) errors.push(`${relative}: 필수 front matter 누락: ${missing.sort().join(', ')}`)
    for (const [field, allowed] of Object.entries(enums)) {
      if (field in metadata && !allowed.has(metadata[field])) {
        errors.push(`${relative}: ${field} 값이 허용 목록에 없습니다`)
      }
    }
    for (const field of ['audience', 'topics']) {
      if (field in metadata && (!Array.isArray(metadata[field]) || metadata[field].length === 0)) {
        errors.push(`${relative}: ${field}는 비어 있지 않은 목록이어야 합니다`)
      }
    }
    for (const field of ['last_updated', 'review_due']) {
      if (field in metadata && !/^\d{4}-\d{2}-\d{2}$/.test(String(metadata[field]))) {
        errors.push(`${relative}: ${field}는 YYYY-MM-DD 날짜여야 합니다`)
      }
    }

    if (metadata.page_type === 'case') {
      if (!caseTypes.has(metadata.case_type)) errors.push(`${relative}: 사례에는 case_type 배지가 필요합니다`)
      if (metadata.case_type && !body.includes(metadata.case_type)) {
        errors.push(`${relative}: 본문에 ${metadata.case_type} 표시가 없습니다`)
      }
    }

    const needsSource = ['guide', 'playbook', 'reference'].includes(metadata.page_type)
    if (needsSource && !['templates/index.md', 'reference/contributing.md'].includes(relative)) {
      if (!/https?:\/\//i.test(body)) errors.push(`${relative}: 근거가 필요한 문서에 외부 출처 링크가 없습니다`)
    }

    for (const [label, pattern] of secretPatterns) {
      if (pattern.test(body)) errors.push(`${relative}: 잠재적 비밀정보 발견(${label})`)
    }
    if (/^!!! /m.test(body)) errors.push(`${relative}: MkDocs 경고 문법을 VitePress container로 변환해야 합니다`)

    for (const match of body.matchAll(linkPattern)) {
      const linkError = validateInternalLink(file, match[1])
      if (linkError) errors.push(`${relative}: ${linkError}`)
    }
    if (!navigationPaths.has(relative)) errors.push(`${relative}: VitePress sidebar에 없는 고아 문서입니다`)
  }

  for (const navPath of navigationPaths) {
    if (!relativeFiles.has(navPath)) errors.push(`navigation.mjs: 존재하지 않는 문서: ${navPath}`)
  }
  for (const core of coreDocs) {
    if (!relativeFiles.has(core)) errors.push(`MVP: 핵심 문서 누락: ${core}`)
  }

  const templates = [...relativeFiles].filter((file) => file.startsWith('templates/') && file !== 'templates/index.md')
  const cases = [...relativeFiles].filter((file) => file.startsWith('06-cases/') && file !== '06-cases/index.md')
  if (templates.length !== 12) errors.push(`MVP: 실전 템플릿은 12개여야 합니다(현재 ${templates.length}개)`)
  if (cases.length !== 4) errors.push(`MVP: 상세 사례는 4개여야 합니다(현재 ${cases.length}개)`)
  const referenceCount = validateReferenceCatalog(errors)
  const glossaryCount = validateGlossary(errors)
  const labFileCount = validateLabPack(errors)

  if (errors.length) {
    console.error('Documentation validation failed:')
    for (const error of errors) console.error(`- ${error}`)
    return 1
  }
  console.log(
    `Documentation validation passed: ${markdownFiles.length} Markdown files, ` +
      `${coreDocs.size} core guides, ${templates.length} templates, ${cases.length} cases, ` +
      `${referenceCount} references, ${glossaryCount} glossary terms, ${labFileCount} lab files`
  )
  return 0
}

process.exitCode = main()
