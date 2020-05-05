<template>
  <div>
    <el-form ref="form"  class="drawer-form" label-width="120px">
      <el-form-item label="字段名称：">
        <el-input v-model="data.fieldName" placeholder="请输入字段名称"/>
      </el-form-item>
      <el-form-item label="字段描述：">
        <el-input v-model="data.description" type="textarea" placeholder="请输入字段描述"/>
      </el-form-item>
    </el-form>
    <div class="control-button">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
  import Drawer from '../../../../mixins/order/Drawer';

  export default {
    name: 'NewFields',
    mixins: [Drawer],
    data() {
      return {
        submitUrl: '/api/fields',
        data: {
          fieldName: '',
          description: ''
        }
      };
    }
  };
</script>

<style scoped>

</style>
