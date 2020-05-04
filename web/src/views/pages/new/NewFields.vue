<template>
  <div>
    <el-input v-model="data.fieldName" placeholder="请输入字段名称"/>
    <br/>
    <el-input v-model="data.description" type="textarea" placeholder="请输入字段描述名称"/>
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
</template>

<script>
  export default {
    name: 'NewFields',
    data() {
      return {
        data: {
          fieldName: '',
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
      }
    }
  };
</script>

<style scoped>

</style>
