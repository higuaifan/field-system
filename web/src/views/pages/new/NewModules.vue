<template>
  <div>
    <el-input v-model="data.moduleName" placeholder="请输入模块名称"/>
    <project-auto-complete :value.sync="projectName" @setValue="setProject"/>
    <modules-auto-complete :value.sync="moduleName" @setValue="setModules"/>
    <el-input v-model="data.description" placeholder="请输入模块描述"/>
    <br/>
    <div class="control-button">
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewModules',
    data() {
      return {
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
      async submit() {
        const response = await this.qPost({
          url: '/api/fields',
          data: this.data
        });
        if (response.code === 200) {
          this.$message.success('新增成功！');
        }
      },
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
