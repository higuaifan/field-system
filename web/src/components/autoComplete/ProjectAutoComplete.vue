<template>
  <qx-auto-complete v-model="supplierValue"
                    :disabled="disabled"
                    :fetch-suggestions="supplierSearch"
                    :orderDefaultValue="defaultValue"
                    @select="selectItem"
                    value-key="project_name"
                    placeholder="请选择系统"/>
</template>

<script>
  /**
   * @description 系统自动查询组件
   * @author: 菩萨蛮
   * @date 2020/5/5 2:07 上午
   * @version V1.0.0
   */
  import AutoComplete from '../../../mixins/common/AutoComplete';

  export default {
    name: 'ProjectAutoComplete',
    mixins: [AutoComplete],
    data() {
      return {
        url: '/api/project/like?projectName=',
        itemName: 'project_name'
      };
    }
  };
</script>

<style lang="scss" scoped>

</style>
