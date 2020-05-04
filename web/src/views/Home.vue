<template>
  <el-container id="home">
    <el-aside id="menu" width="160px">
      <Menu/>
    </el-aside>
    <el-container id="home-left">
      <el-header height="80px" id="header">
        <Header/>
      </el-header>
      <el-main>
        <div id="body">
          <div id="tabs">
            <Tabs/>
          </div>
          <div id="views" :class="$store.state.tab.view.title==='首页'?'no-padding':''">
            <keep-alive :include="$store.state.tab.keepAliveTabs">
              <router-view/>
            </keep-alive>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Menu from '../components/home/Menu.vue';
  import Header from '../components/home/Header.vue';
  import Tabs from '../components/home/Tabs.vue';

  export default {
    name: 'home',
    components: {
      Menu,
      Header,
      Tabs
    }
  };
</script>

<style lang="scss" scoped>
  #home {
    height: 100vh;
    width: 100vw;
  }

  #header {
    padding: 0;
  }

  #menu {
    width: 250px;
    height: 100vh;
  }


  #home-left {
    width: calc(100vw - 250px);
    height: 100vh;
  }

  #body {
    width: calc(100vw - 160px);
    margin: 0 auto;
    height: calc(100% - 20px);
    background-color: #EFF3F6;
  }

  #tabs {
    height: 32px;
    width: calc(100vw - 160px);
    background-color: #F3F3F3;
  }

  #views {
    width: calc(100vw - 168px);
    height: calc(100% - 14px);
    background: #EFF3F6;
    overflow-y: auto;
  }

  .no-padding {
    padding: 0 !important;
    width: calc(100vw - 160px) !important;
    height: calc(100% - 12px) !important;

    div {
      padding: 0 !important;
    }
  }
</style>
