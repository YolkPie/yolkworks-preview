import Vue from 'vue'
import Router from 'vue-router'
import progress from 'nprogress'
import ga from 'vue-ga'

Vue.use(Router)

const EditorPage = () => import(/* webpackChunkName: "editor-page" */ '@/views/EditorPage.vue')
const NotFound = () => import(/* webpackChunkName: "not-found-page" */ '@/views/NotFound.vue')
const GitHubSuccess = () => import(/* webpackChunkName: "ghlogin-result" */ '@/views/GitHubSuccess.vue')
const Test = () => import(/* webpackChunkName: "ghlogin-result" */ '@/views/GitHubSuccess' + '.vue')

let routerConfig = {
  mode: 'hash',
  routes: [
    {
      name: 'home',
      path: '/',
      component: EditorPage
    },
    {
      name: 'gist',
      path: '/gist/:gist',
      component: EditorPage
    },
    {
      name: 'boilerplate',
      path: '/boilerplate/:boilerplate',
      component: EditorPage
    },
    {
      name: 'github-success',
      path: '/github_success',
      component: GitHubSuccess
    }
  ]
}

// 按照组件名称设置路由
const componentList = process.env.COMPONENTS_LIST
componentList.forEach(componentStr => {
  routerConfig.routes.push({
    name: componentStr,
    path: '/' + componentStr,
    component: EditorPage
  })
})

routerConfig.routes.push({
  path: '*',
  component: NotFound
})
const router = new Router(routerConfig)
console.log(routerConfig.routes);


ga(router, 'UA-54857209-13')

router.beforeEach((to, from, next) => {
  progress.start()
  next()
})

export default router
