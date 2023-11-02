const routes = [
  {
    path: "/login",
    component: () => import("@/login.vue"), //路由懒加载
  },
  {
    path: "/ball",
    component: () => import("@/Ball.vue")
  }
]

export default routes;