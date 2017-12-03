import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index' ///Users/meifangqin/Documents/work_test/myVueCook/src/components/HelloWorld

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
