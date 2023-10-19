const routes = [
  {
    path: "/login",
    component: () => import("@/login.vue"), //路由懒加载
  }
]

export default routes;