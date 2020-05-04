<template>
  <div class="tab">
    <el-tabs @tab-click="handleClick"
             @tab-remove="handleDelete"
             closable
             type="card"
             v-model="$store.state.tab.view.title">
      <el-tab-pane :key="item.title"
                   :label="item.title"
                   :name="item.title"
                   v-for="item in $store.state.tab.tabs">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  /**
   @author: 菩萨蛮
   @date: 2019-05-27 14:57
   @version: V1.0.0
   */
  export default {
    name: 'Tabs',
    data() {
      return {
        activeTab: ''
      };
    },
    methods: {
      handleClick(item) {
        this.$store.commit('tab/selectTab', {
          title: item.label
        });
        this.$router.push(this.$store.state.tab.view.path);
      },
      handleDelete(item) {
        this.$store.commit('tab/deleteTab', { item, route: this.$route });
      }
    }
  };
</script>

<style scoped>
</style>
