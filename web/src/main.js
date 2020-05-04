import Vue from 'vue';
import ElementUI from 'element-ui';
import './plugins/axios';
import qxUI from '@qxintech/qx-ui';
import { qxMath, qxUtils, qxComponent } from '@qxintech/qx-component';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './styles.scss';
import './assets/icon/iconfont.css';
import Search from './components/common/search/Search';
import ProjectAutoComplete from './components/autoComplete/ProjectAutoComplete';
import ModulesAutoComplete from './components/autoComplete/ModulesAutoComplete';


Vue.use(ElementUI);
Vue.use(qxUI);
Vue.use(qxComponent);
router.beforeEach((to, from, next) => {
  const component = to.path.split('/')[1];
  if (!(component.includes('check') && component.split('-')[0] === 'check')) {
    store.commit('tab/addTab', { component, routerInfo: to });
  }
  next();
});
Vue.prototype.math = qxMath;
Vue.prototype.utils = qxUtils;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
Vue.component('Search', Search);
Vue.component('ProjectAutoComplete', ProjectAutoComplete);
Vue.component('ModulesAutoComplete', ModulesAutoComplete);
