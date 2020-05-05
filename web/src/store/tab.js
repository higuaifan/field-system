/**
 @author: higuaifan
 @date: 2019-05-27-11:27
 @version: V1.0.0
 */

import router from '../router';

const m = (title, icon, show, permission, value, component,
           hasGroup, add, needAdd, addPermission) => (
  { title, icon, show, permission, value, component, hasGroup, add, needAdd, addPermission }
);
const m2 = (title, component, show, add, needAdd, permission, addPermission) => (
  { title, component, show, add, needAdd, permission, addPermission }
);


const getMenu = () => [
  m('首页', '', false, '', [
    m2('首页', 'index', false, false, false)
  ]),
  m('管理', '', true, '', [
    m2('系统', 'project', true, false, false),
    m2('字段', 'fields', true, false, false),
    m2('模块', 'modules', true, false, false),
    m2('模块字段设置', 'modules-operator', false, false, false)
  ])
];

const state = {
  tabs: [],
  view: {},
  update: false,
  menu: getMenu()
};

const setKeepAliveTabs = s => {
  s.keepAliveTabs = s.tabs.map(a => {
    const t = a.component;
    return t.split('-')
      .map(q => `${q[0].toLocaleUpperCase()}${q.slice(1, q.length)}`)
      .join('');
  }).join(',');
};

/**
 * 获取标题
 * @param component 路由地址
 * @returns componentTitle 标题
 */
const getTitle = component => {
  let componentTitle;
  state.menu.forEach(p => {
    if (p.component && component === p.component) {
      componentTitle = p.title;
    }
    p.value.forEach(t => {
      if (component === t.component) {
        componentTitle = t.title;
      }
    });
  });
  if (componentTitle) {
    return componentTitle;
  }
  console.error('获取标题出错！', component);
  return null;
};

const getters = {};
const mutations = {
  /**
   页面切换方法
   @param s state
   @param data 数据
   */
  addTab(s, data) {
    let isHaveFlag = false;
    const newDataPath = data.routerInfo ? data.routerInfo.path : data.path;
    s.tabs.forEach(tab => {
      // 遍历查找是否有该页面
      if (tab.component === data.component) {
        isHaveFlag = true;
        if (tab.path !== newDataPath) {
          tab.path = newDataPath;
          tab.pathUpdate = true;
        }
      }
    });
    const title = data.title ? data.title : getTitle(data.component, data);
    if (title === null) {
      // 404直接跳my-info
      console.error('error');
    }
    s.view = {
      title,
      component: data.component,
      path: newDataPath
    };
    if (!isHaveFlag && title) {
      s.tabs.push({
        title,
        component: data.component,
        path: newDataPath
      });
    }
    setKeepAliveTabs(s);
  },
  /**
   tab点击切换方法
   @param s state
   @param data 数据
   */
  selectTab(s, data) {
    s.tabs.forEach(tab => {
      if (tab.title === data.title) {
        s.view = { title: tab.title, component: tab.component, path: tab.path };
      }
    });
  },
  /**
   @description 删除tab方法
   @param s state
   @param data 数据
   */
  deleteTab(s, data) {
    if (s.tabs.length === 1 && s.view.title === '首页') {
      return;
    }
    let removeIndex = -1;
    removeIndex = s.tabs.findIndex(tab => tab.title === data.item);
    const pushFlag = s.tabs[removeIndex].component === s.view.component;
    let pushIndex = 0;
    if (removeIndex !== -1) {
      if (removeIndex === 0) {
        s.tabs.splice(0, 1);
      } else if (removeIndex === s.tabs.length - 1) {
        s.tabs.splice(removeIndex, 1);
        pushIndex = removeIndex - 1;
      } else {
        s.tabs.splice(removeIndex, 1);
        pushIndex = removeIndex;
      }
      if (data.pushUrl) {
        router.push(data.pushUrl);
        s.update = true;
        return;
      }

      if (pushFlag) {
        if (s.tabs.length < 1) {
          router.push('/');
          return;
        }
        router.push(s.tabs[pushIndex].path);
      }
    }
    setKeepAliveTabs(s);
  },
  afterUpdate(s) {
    s.update = false;
  },
  clearPathUpdate(s, tab) {
    s.tabs.forEach(e => {
      if (e.path === tab.path) {
        e.pathUpdate = false;
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
