import { createRouter, createWebHistory } from "vue-router"
import Personal from "@/views/User/personal"
import Home from "@/views/Home/index.vue"

const routes = [
  {
    path: "/",
    name: "Web",
    component: () => import("@/views/Web"),
    children: [
      {
        path: "/",
        component: () => import("@/views/Web/list"),
      },
      {
        path: "/detail/:id",
        name: "Detail",
        component: () => import("@/views/Web/detail"),
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: Home,
    children: [
      {
        path: "/admin/users/personal",
        name: "Peraonal",
        component: Personal,
        meta: {
          title: "个人资料",
        },
      },
      {
        path: "/admin/users/password",
        name: "Password",
        component: () => import("@/views/User/password.vue"),
        meta: {
          title: "修改密码",
        },
      },
      {
        path: "/admin/artical",
        name: "Artical",
        component: () => import("@/views/Artile"),
        meta: {
          title: "文章列表",
        },
      },
      {
        path: "/admin/artical/public",
        name: "Public",
        component: () => import("@/views/Artile/public.vue"),
        meta: {
          title: "发布文章",
        },
      },
      {
        path: "/admin/artical/update",
        name: "Update",
        component: () => import("@/views/Artile/update.vue"),
        meta: {
          title: "编辑文章",
        },
      },
      {
        path: "/admin/comment",
        name: "Comment",
        component: () => import("@/views/Comment"),
        meta: {
          title: "评论管理",
        },
      },
      {
        path: "/admin/fans",
        name: "Fans",
        component: () => import("@/views/Fans/fans.vue"),
        meta: {
          title: "粉丝管理",
        },
      },
      {
        path: "/admin/star",
        name: "Star",
        component: () => import("@/views/Star"),
        meta: {
          title: "点赞管理",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
