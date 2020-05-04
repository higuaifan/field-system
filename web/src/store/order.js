/**
 * @description 订单信息store
 * @author: 菩萨蛮
 * @date 2019/12/2 4:28 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */


const state = {
  orderVO: null
};

const getters = {};
const mutations = {
  setOrderVO(s, data) {
    s.order = data;
  },
  deleteOrder(s) {
    s.orderVO = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
