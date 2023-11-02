const routes = [
  {
    path: "/login",
    component: () => import("@/views/login.vue"), //路由懒加载
  },
  {
    path: "/ball",
    component: () => import("@/views/Ball.vue")
  },
  {
    path: "/saveImage",
    component: () => import("@/views/SaveImage.vue")
  }
]

export default routes;