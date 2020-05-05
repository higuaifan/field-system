/**
 * @description
 * @author: higuaifan
 * @date 2020/2/13 5:48 下午
 * @version V1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 * v1.0.1 将close方法提取出来
 */


const modifyOrder = {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setDefaultValue();
    });
  },
  methods: {
    close(isPush = false) {
      this.$store.commit('tab/deleteTab', {
        item: this.$store.state.tab.view.title,
        route: this.$route,
        pushUrl: isPush ? this.pushUrl : undefined
      });
    },
    async setDefaultValue() {
      const { data } = await this.qGet(`${this.url}/${this.$route.params.id}`);
      this.setValue(data);
    },
    async goSubmit(needAudit, data) {
      const { code } = await this.qPut({
        url: this.url,
        data
      });

      if (code === 200) {
        this.$message.success('修改成功！');
        this.close(true);
      }
    }
  }
};

export default modifyOrder;
