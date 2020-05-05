<template>
  <qx-auto-complete v-model="supplierValue"
                    :disabled="disabled"
                    :fetch-suggestions="supplierSearch"
                    :orderDefaultValue="defaultValue"
                    @select="selectItem"
                    :value-key="itemName"
                    placeholder="请选择字段"/>
</template>

<script>
  /**
   * @description 模块字段自动搜索组件
   * @author higuaifan
   * @date 2020/5/5 21:19
   * @version V1.0.0
   * */
  import AutoComplete from '../../../mixins/common/AutoComplete';

  export default {
    name: 'ModuleFieldsAutoComplete',
    mixins: [AutoComplete],
    props: {
      moduleParam: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        url: '/api/moduleFields/like?fieldName=',
        itemName: 'field_name'
      };
    },
    methods: {
      async supplierSearch(qs, cb) {
        if (qs && qs !== '') {
          const { data } = await
            this.qGet(`${this.url}${qs}&pageSize=5&pageNum=0${this.moduleParam}`);
          cb(data && data.datas && data.datas.length > 0 ? data.datas : []);
        } else {
          cb([]);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
