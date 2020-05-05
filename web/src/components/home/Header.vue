<template>
  <div class="header">
    <div class="header-info">
      <span class="separator">|</span>
      <span @mouseenter="overShow()" @mouseleave="outHide()">
                <i class="el-icon-third-setting icon icon-padding"></i>
            </span>
      <span @click="hrefHost(8)" title="帮助中心"><i
        class="el-icon-third-bangzhuzhongxin icon"></i></span>
    </div>
    <div class="separator">|</div>
    <div class="header-types">
      <div class="header-type" @click="hrefHost(0)">
        <i class="el-icon-s-home"/>
        <span v-if="isShowTitle">系统首页</span>
      </div>
    </div>
    <div class="userSetting" v-if="userSettingShow" @mouseenter="overShow()"
         @mouseleave="outHide()">
            <span @click="hrefHost(0)">
                <i class="el-icon-third-system-settings" style="padding-right: 5px;"></i>系统管理
            </span>
      <span @click="hrefHost(0)">
                <i class="el-icon-third-personal-settings" style="padding-right: 5px;"></i>个人信息
            </span>
      <span @click="dropOut()">
                <i class="el-icon-third-drop-out" style="padding-right: 5px;"></i>安全退出
            </span>
    </div>
  </div>
</template>

<script>
  /**
   * @Description header头
   * @Author: higuaifan
   * @Date: 2019-11-25-9:43
   * @Version: V1.0.1
   *
   * 从仓储复制过来稍微改了改的header头
   */

  export default {
    name: 'Header',
    data() {
      return {
        userUrl: '',
        userSettingShow: false,
        isShowTitle: true
      };
    },
    methods: {
      hrefHost(type) {
        const urlObj = {
          0: '/basecommonweb/index',
          1: '/prodweb/index',
          2: '/baseweb/index'
        };
        window.open(urlObj[type], '_blank');
      },
      overShow() {
        this.userSettingShow = true;
      },
      outHide() {
        this.userSettingShow = false;
      },
      dropOut() {
        localStorage.removeItem('token');
        window.location.href = '/userweb/login.html';
      }
    }
  };
</script>

<style lang="scss">
  .header {
    height: 48px;
    width: 100%;
    background: white;
    color: #9FA9BA;

    & > div {
      float: right;
    }
  }

  .header-types {
    display: inline-block;
    height: 48px;
    overflow-x: auto;
  }

  .header-type {
    display: inline-block;
    font-size: 16px;
    color: #9FA9BA;
    line-height: 48px;
    margin-left: 40px;
    cursor: pointer;

    i {
      display: inline-block;
      margin: 0 4px;
    }

    &:hover {
      color: #8F9EB8;
    }
  }

  .header-info {
    display: inline-block;
    height: 48px;
    max-width: 300px;
    float: right;
    text-align: left;
    position: relative;
    cursor: pointer;
    margin-right: 40px;

    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      margin: 0 10px;
    }

    span {
      max-width: 120px;
      height: 48px;
      line-height: 48px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      color: #9FA9BA;

      .icon {
        font-size: 26px;
        height: 48px;
        line-height: 48px;

        &.icon-padding {
          padding: 0 5px 15px;
        }
      }

      &:hover {
        color: #8F9EB8;
      }
    }
  }

  .userSetting {
    background: #fff;
    position: absolute;
    right: 40px;
    top: 55px;
    color: #9FA9BA;
    font-size: 12px;
    box-shadow: 0 0 3px rgba(86, 96, 117, 0.3);
    cursor: pointer;
    z-index: 9999;

    span {
      display: block;
      margin: 2px;
      padding: 2px 15px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .separator {
    display: inline-block;
    float: right;
    line-height: 48px;
    color: #9FA9BA;
    font-size: 18px !important;
    margin-left: 15px;
  }
</style>
