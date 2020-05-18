/**
 * @description 常规列表混入
 * @author: higuaifan
 * @date 2020/2/12 8:39 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */


const gfTable = {
  data() {
    return {
      gfTable: {
        url: '',
        table: [],
        updateFlag: 0,
        searchObj: this.defaultSearchObj()
      },
      modifyOrder: {},
      detailsOrder: {}
    };
  },
  methods: {
    /**
     * 冒泡更新table方法
     * @param data 新的table
     */
    updateTable(data) {
      this.gfTable.table = data.table;
    },
    tableFlagAdd() {
      this.gfTable.updateFlag = this.gfTable.updateFlag + 1;
    },
    async handleClick() {
      this.tableFlagAdd();
    },
    /**
     * 用于简单重置gfTable searchObj的方法，后续可以考虑封装进去
     * @returns {{}}
     */
    defaultSearchObj() {
      return {};
    },
    reSearch(tags) {
      this.gfTable.searchObj = this.defaultSearchObj();
      tags.map(tag => {
        this.gfTable.searchObj[tag.param] = tag.value;
        return true;
      });
      this.tableFlagAdd();
    },
    async deleteOrderFunc(row) {
      const deleteStr = `确定删除${row.id}吗？`;
      const { code } = await this.qDelete(`${this.gfTable.url}/${row.id}`, deleteStr, '取消删除');
      if (code === 200) {
        this.$message.success('删除成功！');
        this.tableFlagAdd();
      }
    },
    modify(row) {
      this.$router.push(`/modify-${this.orderUrl}/${row.id}`);
    },
    details(row) {
      window.open(`/purchaseweb/check-${this.orderUrl}/${row.id}`);
    },
    async remove(row) {
      await this.deleteOrderFunc(row);
    }
  }

};

export default gfTable;
