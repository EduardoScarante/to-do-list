// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Login.vue"),
  },
  {
    path: "/app",
    component: () => import("@/layouts/Application.vue"),
    children: [
      {
        path: "register",
        name: "register",

        component: () => import("@/views/Register.vue"),
      },
      {
        path: "to-do-list",
        name: "to-do-list",

        component: () => import("@/views/List.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
