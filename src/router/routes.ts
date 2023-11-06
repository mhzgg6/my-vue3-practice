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
  },
  {
    path: "/theme",
    component: () => import("@/views/Theme.vue")
  },
  {
    path: "/ticket",
    component: () => import("@/views/ScratchTicket.vue")
  },
  {
    path: "/blur",
    component: () => import("@/views/GaussianBlur.vue")
  },
  {
    path: "/snake",
    component: () => import("@/views/gluttonousSnake/index.vue")
  },
]

export default routes;