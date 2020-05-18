/**
 * @description
 * @author: higuaifan
 * @date 2020/2/13 5:38 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */

const order = {
  data() {
    return {
      newDrawerVisible: false,
      modifyDrawerVisible: false,
      detailsDrawerVisible: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.tab.update === true) {
        vm.gfTable.updateFlag++;
        vm.$store.commit('tab/afterUpdate');
      }
    });
  },
  methods: {
    showNewDrawer() {
      this.newDrawerVisible = true;
    },
    closeNewDrawer(needUpdate) {
      this.newDrawerVisible = false;
      if (needUpdate) {
        this.tableFlagAdd();
      }
    },
    closeDetailsDrawer() {
      this.detailsDrawerVisible = false;
    },
    showDetailsDrawer() {
      this.detailsDrawerVisible = true;
    },
    showModifyDrawer() {
      this.modifyDrawerVisible = true;
    },
    closeModifyDrawer(needUpdate) {
      this.modifyDrawerVisible = false;
      if (needUpdate) {
        this.tableFlagAdd();
      }
    }
  }
};

export default order;
