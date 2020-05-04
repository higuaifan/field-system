/**
 * @description 自动查询方法混入
 * @author: 菩萨蛮
 * @date 2020/4/16 5:59 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */

const AutoComplete = {
  props: {
    value: String,
    disabled: Boolean,
    defaultValue: String,
    index: Number
  },
  data() {
    return {
      supplierValue: '',
      url: '',
      itemName: 'tagName'
    };
  },
  created() {
    this.supplierValue = this.value;
  },
  watch: {
    value() {
      this.supplierValue = this.value;
    },
    supplierValue() {
      if (!this.supplierValue) {
        this.$emit('clear');
      }
    }
  },
  methods: {
    async supplierSearch(qs, cb) {
      if (qs && qs !== '') {
        const { data } = await
          this.qGet(`${this.url}${qs}&pageSize=5&pageNum=0`);
        cb(data && data.datas && data.datas.length > 0 ? data.datas : []);
      } else {
        cb([]);
      }
    },
    async selectItem(item) {
      if (item !== null) {
        this.$emit('update:value', item[this.itemName]);
        this.$emit('setValue', {
          ...item,
          index: this.index
        });
      }
    }
  }
};

export default AutoComplete;
