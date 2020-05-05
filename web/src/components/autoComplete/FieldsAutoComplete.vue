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
   * @description 字段自动搜索组件
   * @author higuaifan
   * @date 2020/5/5 16:12
   * @version V1.0.0
   */

  import AutoComplete from '../../../mixins/common/AutoComplete';

  export default {
    name: 'FieldsAutoComplete',
    mixins: [AutoComplete],
    data() {
      return {
        url: '/api/fields/like?fieldName=',
        itemName: 'field_name'
      };
    }
  };
</script>

<style lang="scss" scoped>

</style>
