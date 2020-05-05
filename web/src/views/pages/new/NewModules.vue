<template>
  <div>
    <el-form ref="form"  class="drawer-form" label-width="120px">
      <el-form-item label="模块名称：">
        <el-input v-model="data.moduleName" placeholder="请输入模块名称"/>
      </el-form-item>
      <el-form-item label="所属系统：">
        <project-auto-complete :value.sync="projectName" @setValue="setProject"/>
      </el-form-item>
      <el-form-item label="父模块名称：">
        <modules-auto-complete :value.sync="moduleName" @setValue="setModules"/>
      </el-form-item>
      <el-form-item label="模块描述：">
        <el-input v-model="data.description" placeholder="请输入模块描述"/>
      </el-form-item>
    </el-form>
    <br/>
    <div class="control-button">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
  import Drawer from '../../../../mixins/order/Drawer';

  export default {
    name: 'NewModules',
    mixins: [Drawer],
    data() {
      return {
        submitUrl: '/api/modules',
        projectName: '',
        moduleName: '',
        data: {
          moduleName: '',
          projectId: '',
          parentModuleId: '',
          description: ''
        }
      };
    },
    methods: {
      setProject(data) {
        this.data.projectId = data.id;
      },
      setModules(data) {
        this.data.parentModuleId = data.id;
      }
    }
  };
</script>

<style scoped>

</style>
