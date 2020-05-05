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
import FieldsAutoComplete from './components/autoComplete/FieldsAutoComplete';
import ModuleFieldsAutoComplete from './components/autoComplete/ModuleFieldsAutoComplete';
import echarts from 'echarts';

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
Vue.prototype.$echarts = echarts;
Vue.prototype.math = qxMath;
Vue.prototype.utils = qxUtils;
Vue.prototype.utils.objToHump = obj => {
  // eslint-disable-next-line no-useless-escape
  const toHump = name => name.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
  const humpObj = {};
  Object.keys(obj).map(k => {
    if (obj[k] !== '') {
      humpObj[toHump(k)] = obj[k];
    }
    return null;
  });
  return humpObj;
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
Vue.component('Search', Search);
Vue.component('ProjectAutoComplete', ProjectAutoComplete);
Vue.component('ModulesAutoComplete', ModulesAutoComplete);
Vue.component('FieldsAutoComplete', FieldsAutoComplete);
Vue.component('ModuleFieldsAutoComplete', ModuleFieldsAutoComplete);
