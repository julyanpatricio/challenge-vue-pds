// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { MdButton, MdContent, MdTabs, MdTable,MdIcon,MdField,MdMenu,MdList,MdDatepicker,MdDialog,MdCard,MdRipple } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.config.productionTip = false

// Vue.use(MdTabs)
// Vue.use(MdTable)
// Vue.use(MdIcon)
// Vue.use(MdMenu)
// Vue.use(MdList)
// Vue.use(MdDatepicker)
// Vue.use(MdDialog)
Vue.use(MdButton)
Vue.use(MdField)
Vue.use(MdContent)
Vue.use(MdCard)
Vue.use(MdRipple)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
