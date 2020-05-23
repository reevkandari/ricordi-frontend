
const routes = [
  {
    path: '/',
    component: () => import('layouts/base.vue'),
    children: [
      { path: '', component: () => import('pages/front.vue'), meta: "poor"},
      { path: '/login', component: () => import('pages/login.vue'), meta: "poor"},
      //{ path: '/about-this-project', component: () => import('pages/help.vue'), meta: "rich"},
      { path: '/signup', component: () => import('pages/signup.vue'), meta: "poor"},
      { path: '/forgot/:code?', component: () => import('pages/forgot.vue'), meta: "poor"},
      { path: '/confirm/:code?', component: () => import('pages/confirm.vue'), 
      meta: "poor"},
      { path: '/home', component: () => import('pages/home.vue'), meta: "rich" },
      { path: '/search', component: () => import('pages/search.vue'), meta: "rich" },
      { path: '/newstory', component: () => import('pages/newstory.vue'), meta: "rich" },
      { path: '/account', component: () => import('pages/account.vue'), meta: "rich" },
      { path: '/logout', component: () => import('pages/logout.vue'), meta: "rich" },
      { path: '/settings', component: () => import('pages/settings.vue'), meta: "rich",
      children: [
        { path: '/', component: () => import('pages/settings.vue'), meta: "rich" },
        { path: '/password', component: () => import('pages/settings.vue'), meta: "rich" },
        { path: '/email', component: () => import('pages/settings.vue'), meta: "rich" },
        { path: '/sessions', component: () => import('pages/settings.vue'), meta: "rich" },        
        { path: '/delete', component: () => import('pages/settings.vue'), meta: "rich" },        
      ] 
    },
      { path: '/:slug', component: () => import('pages/profile.vue'), meta: "rich" }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
