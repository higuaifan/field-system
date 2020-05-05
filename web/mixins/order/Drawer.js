/**
 * @description Drawer混入
 * @author higuaifan
 * @date 2020/5/5 18:08
 * */

const Drawer = {
  methods: {
    close(needUpdate = false) {
      this.$emit('close', needUpdate);
    },
    async submit() {
      const response = await this.qPost({
        url: this.submitUrl,
        data: this.data
      });
      if (response.code === 200) {
        this.$message.success('新增成功！');
        this.close(true);
      }
    }
  }
};

export default Drawer;
