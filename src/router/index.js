// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Access.vue"),
  },
  {
    path: "/app",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/:id",
    component: () => import("@/views/ListDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
