import Vue from 'vue'
import App from './App.vue'
import bootstrap from 'bootstrap'
import axios from 'axios'
import animate from '../node_modules/animate.css'
import headComponent from './components/head'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'

import popular from './components/song/song.vue'
import hotsong from './components/hotsong/hotsong.vue'
import home from './components/home/home.vue'
import mv from './components/mv.vue'
import album from './components/album.vue'

Vue.use(VueRouter)
Vue.use(headComponent)
Vue.use(animate)

const routes = [
  { path: '/population', component: popular },
  { path: '/hotsong', component: hotsong},
  { path: '/', component: home },
  { path: '/mv', component:mv },
  { path: '/album', component:album }
]

const router = new VueRouter({
  routes,
})

new Vue({
  el: '#app',
  Vue,
  router,
  render: h => h(App)
})
