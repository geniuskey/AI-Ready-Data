import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import GlossaryExplorer from './components/GlossaryExplorer.vue'
import ExecutionWorkbench from './components/ExecutionWorkbench.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import ReadinessDashboard from './components/ReadinessDashboard.vue'
import ReferenceExplorer from './components/ReferenceExplorer.vue'
import RoiCalculator from './components/RoiCalculator.vue'
import SeminarDeck from './components/SeminarDeck.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ExecutionWorkbench', ExecutionWorkbench)
    app.component('GlossaryExplorer', GlossaryExplorer)
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('ReadinessDashboard', ReadinessDashboard)
    app.component('ReferenceExplorer', ReferenceExplorer)
    app.component('RoiCalculator', RoiCalculator)
    app.component('SeminarDeck', SeminarDeck)
  }
} satisfies Theme
