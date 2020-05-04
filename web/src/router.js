import Vue from 'vue';
import Router from 'vue-router';

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/index',
      component: () => import('./views/Home.vue'),
      children: [
        { path: '/index', component: () => import('./views/Index.vue') },
        { path: '/project', component: () => import('./views/pages/Project.vue') },
        { path: '/fields', component: () => import('./views/pages/Fields.vue') },
        { path: '/modules', component: () => import('./views/pages/Modules.vue') }
        ]
    }
  ]
});
