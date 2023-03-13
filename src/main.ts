import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'element-plus/theme-chalk/index.css'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common'

const app = createApp(App)
app.use(hljsVuePlugin)
app.mount('#app')