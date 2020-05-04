<template>
  <div class="menu">
    <div class="title">
    </div>
    <div class="menu-main">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff">
        <template v-for="(item,i) in menu">
          <el-submenu :index="`${i}`"
                      :key="i" v-if="item.hasGroup!==false">
            <template slot="title">
              <i :class="item.icon"/>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="i+'-'+j"
                            :key="v.title"
                            @click="addTab(v)"
                            @mouseenter.native="hoverTab(v,true)"
                            @mouseleave.native="hoverTab(v,false)"
                            v-for="(v,j) in item.value">
                <span class="menu-title">{{v.title}}</span>
                <div class="add" v-if="v.add&&v.needAdd" @click.stop="jumpToNew(v)"
                >
                  +
                </div>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :key="i" v-else @click="addTab(item)"
                        @mouseenter.native="hoverTab(item,true)"
                        @mouseleave.native="hoverTab(item,false)">
            <i :class="item.icon"/>
            <span>{{item.title}}</span>
            <div class="add" v-if="item.add&&item.needAdd" @click.stop="jumpToNew(item)">
              +
            </div>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
  /**
   @author: 菩萨蛮
   @date: 2019-05-27-10:55
   @version: V1.0.0
   */
  export default {
    name: 'Menu',
    data() {
      return { menu: [] };
    },
    async created() {
      this.menu = JSON.parse(JSON.stringify(this.$store.state.tab.menu));
      const sysMenuList = JSON.parse(localStorage.getItem('menuList'));
      if (sysMenuList) {
        const menuObj = {};
        sysMenuList.forEach(e => {
          if (e.pid === 0 && e.checked) {
            menuObj[e.id] = {
              ...e,
              children: []
            };
          }
        });
        sysMenuList.forEach(e => {
          if (e.pid !== 0) {
            if (menuObj[e.pid]) {
              if (e.checked) {
                menuObj[e.pid].children.push(e.name);
              }
            }
          }
        });
        this.menu.forEach(e => {
          Object.values(menuObj).forEach(item => {
            if (item.name === e.key) {
              e.show = true;
              e.value.forEach(m => {
                if (item.children && item.children.indexOf(m.title) > -1) {
                  m.show = true;
                }
              });
            }
          });
        });
      }
      this.menu = this.menu.filter(e => e.show === true);
      this.menu.forEach(item => {
        item.value = item.value.filter(e => e.show === true);
      });
    },
    methods: {
      addTab(value) {
        this.$router.push(`/${value.component}`);
      },
      jumpToNew(value) {
        this.$router.push(`/new-${value.component}`);
      },
      hoverTab(v, isShow) {
        v.add = isShow;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    position: fixed;
    z-index: 1;
    width: 160px;
    height: 120px;
    cursor: pointer;

    img {
      width: 160px;
    }

  }

  .menu {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .el-menu {
    margin-top: 120px;
  }

  .menu-title {
    color: #EEEEEE;
    display: inline-block;
    position: relative;
    margin: 0 0 0 33px;
    width: 99px;
    text-align: left;
  }

  .add {
    position: relative;
    display: inline-block;
    float: right;
    margin: 12px 9px 12px 0;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    line-height: 16px;
    font-size: 20px;
    text-align: center;
    background-color: #FFFFFF;
    border: 1px solid #000000;
    color: #384558;
    box-shadow: 0 0 #000000;
  }

</style>
