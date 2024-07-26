import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import AnimeCategory from '../views/AnimeCategory.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/category/:category',
    name: 'AnimeCategory',
    component: AnimeCategory,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
