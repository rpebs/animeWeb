import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import AnimeCategory from '../views/AnimeCategory.vue';
import AnimeDetail from '../views/AnimeDetail.vue';
import AllAnime from '../views/AllAnime.vue';

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
  {
    path: '/anime',
    name: 'AllAnime',
    component: AllAnime,
  },
  {
    path: '/detail/:slug',
    name: 'AnimeDetail',
    component: AnimeDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
