import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'element-plus/theme-chalk/index.css'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common'

const app = createApp(App)
app.use(hljsVuePlugin)
app.mount('#app')