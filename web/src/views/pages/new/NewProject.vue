<template>
  <div>
    <el-input v-model="projectName" placeholder="请输入系统名称"/>
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
</template>

<script>
  export default {
    name: 'NewProject',
    data() {
      return {
        projectName: ''
      };
    },
    methods: {
      async submit() {
        const response = await this.qPost({
          url: '/api/project',
          data: {
            projectName: this.projectName
          }
        });
        if (response) {
          this.$message.success('新增成功！');
        }
      }
    }
  };
</script>

<style scoped>

</style>
