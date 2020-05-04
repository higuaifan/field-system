<template>
  <qx-auto-complete v-model="supplierValue"
                    :disabled="disabled"
                    :fetch-suggestions="supplierSearch"
                    :orderDefaultValue="defaultValue"
                    @select="selectItem"
                    value-key="module_name"
                    placeholder="请选择模块"/>
</template>

<script>
  /**
   * @description 模块自动查询组件
   * @author: 菩萨蛮
   * @date 2020/5/5 2:28 上午
   * @version V1.0.0
   */
  import AutoComplete from '../../../mixins/common/AutoComplete';

  export default {
    name: 'ModulesAutoComplete',
    mixins: [AutoComplete],
    data() {
      return {
        url: '/api/modules/like?moduleName=',
        itemName: 'module_name'
      };
    }
  };
</script>

<style lang="scss" scoped>

</style>
