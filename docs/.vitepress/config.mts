import { Buffer } from 'node:buffer'
import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'
import { nav, sidebar } from './navigation.mjs'

export default defineConfig({
  lang: 'ko-KR',
  title: 'AI-Ready Data',
  titleTemplate: ':title | AI-Ready Data',
  description: '레거시 조직을 위한 외부 반출 없는 AI-Ready Data 실전 가이드',
  base: '/AI-Ready-Data/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://geniuskey.github.io/AI-Ready-Data/'
  },
  vite: {
    server: {
      host: '127.0.0.1'
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/AI-Ready-Data/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#111a3a' }]
  ],
  markdown: {
    config(md) {
      md.use(taskLists, { enabled: true, label: true })

      const defaultFence = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index]
        if (token.info.trim() === 'mermaid') {
          const code = Buffer.from(token.content, 'utf8').toString('base64')
          return `<MermaidDiagram code="${code}" />`
        }
        return defaultFence?.(tokens, index, options, env, self) ?? self.renderToken(tokens, index, options)
      }
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'AI-Ready Data',
    nav,
    sidebar,
    outline: {
      level: [2, 3],
      label: '이 페이지에서'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '검색',
                buttonAriaLabel: '문서 검색'
              },
              modal: {
                noResultsText: '검색 결과가 없습니다.',
                resetButtonTitle: '검색 초기화',
                footer: {
                  selectText: '선택',
                  navigateText: '이동',
                  closeText: '닫기'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/geniuskey/AI-Ready-Data' }
    ],
    editLink: {
      pattern: 'https://github.com/geniuskey/AI-Ready-Data/edit/main/docs/:path',
      text: '이 페이지 수정 제안'
    },
    lastUpdated: {
      text: '마지막 변경'
    },
    docFooter: {
      prev: '이전',
      next: '다음'
    },
    darkModeSwitchLabel: '화면 모드',
    lightModeSwitchTitle: '밝은 화면',
    darkModeSwitchTitle: '어두운 화면',
    sidebarMenuLabel: '목차',
    returnToTopLabel: '맨 위로',
    externalLinkIcon: true,
    footer: {
      message: '문서 CC BY 4.0 · 코드 MIT',
      copyright: '실제 사내 데이터와 개인정보는 이 공개 저장소에 올리지 마세요.'
    }
  }
})
