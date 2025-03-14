import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../layouts/Form/FormContainer.vue'),
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router