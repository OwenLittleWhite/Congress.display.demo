import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Abstracts from '@/components/Abstract/Abstracts'
import Abstract from '@/components/Abstract/Abstract'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/abstracts/presentation/:presentation',
      name: 'Abstracts',
      props: true,
      component: Abstracts
    },
    {
      path: '/abstracts/:id',
      name: 'Abstract',
      props: true,
      component: Abstract
    }

  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
