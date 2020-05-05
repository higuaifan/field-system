<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="系统名称：">
        <el-input v-model="data.projectName" placeholder="请输入系统名称"/>
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
    name: 'NewProject',
    mixins: [Drawer],
    data() {
      return {
        submitUrl: '/api/project',
        data: {
          projectName: ''
        }
      };
    }
  };
</script>

<style scoped>

</style>
