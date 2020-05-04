<template>
  <el-tag closable @close="close">{{tag.name}}</el-tag>
</template>

<script>
  /**
   * @description 查询tag
   * @author: 菩萨蛮
   * @date 2020/2/12 9:47 下午
   * @version V1.0.0
   *
   * 公司的业务千篇一律，复杂的代码好几百行
   */

  export default {
    name: 'SearchTag',
    props: {
      tag: { type: Object }
    },
    methods: {
      close() {
        this.$emit('close', this.tag.index);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-tag {
    background-color: #E2E9EF !important;
    color: #323539 !important;
    margin: 0 5px;
  }
</style>
