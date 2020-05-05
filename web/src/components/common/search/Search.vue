<template>
  <div class="search">
    <div class="search-tag">
      <div class="search-tag-tag">
        <i class="el-icon-third-delete_all" @click="clearAllTags"/>
        <search-tag v-for="(tag,i) in tags" :key="'tag-'+i"
                    :tag="{index:i,...tag}"
                    @close="closeTag"/>
      </div>
      <div class="search-tag-button" v-if="!hiddenButton">
        <slot name="button"/>
        <el-button type="primary" @click="toNew" class="new-button">
          <i class="el-icon-third-hao"/>
          {{newStr}}
        </el-button>
      </div>
    </div>
    <div class="search-input">
      <search-item v-for="item in searchObjList"
                   :clear="clear"
                   :search-input="item" :key="item.name"
                   @pushTab="pushTab"/>
    </div>
  </div>
</template>

<script>
  /**
   * @description 查询栏组件
   * @author: higuaifan
   * @date 2020/2/12 7:48 下午
   * @version V1.0.2
   *
   * 公司的业务千篇一律，复杂的代码好几百行
   *
   * TODO tab过多的时候滚动样式
   * v1.0.1 添加slot
   * v1.0.2 添加showButton来决定是否展示按钮模块
   */

  import SearchItem from './SearchItem';
  import SearchTag from './SearchTag';

  export default {
    name: 'Search',
    components: { SearchItem, SearchTag },
    props: {
      searchObjList: { type: Array },
      newStr: { type: String, default: '新增' },
      router: { type: String },
      hiddenButton: { type: Boolean, default: false }
    },
    data() {
      return {
        tags: [],
        clear: 0
      };
    },
    methods: {
      pushTab(searchObj) {
        // 这里之后要改成如果是选择框
        // if (searchObj.type === 'input' || searchObj.type === 'select') {
        //
        // }
        // 如果搜索框中存在这个字段，则替换
        if (this.tags.map(e => e.param).includes(searchObj.param)) {
          const index = this.tags.findIndex(e => e.param === searchObj.param);
          this.tags.splice(index, 1, searchObj);
        } else {
          this.tags.push(searchObj);
        }
        // 修改完毕tabs后刷新列表
        this.$emit('reSearch', this.tags);
      },
      closeTag(i) {
        this.tags.splice(i, 1);
        this.$emit('reSearch', this.tags);
      },
      clearAllTags() {
        this.tags = [];
        this.clear++;
        this.$emit('reSearch', this.tags);
      },
      toNew() {
        this.$emit('toNew');
      }
    }
  };
</script>

<style lang="scss" scoped>

  .search {
    height: 94px;
    width: 100%;
    border-radius: 4px;
    background-color: #FFFFFF;
  }

  .search-tag, .search-input {
    width: calc(100% - 48px);
    margin: 0 24px;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .search-tag {
    height: 45px;
    border-bottom: 1px solid #E6EAEE;
    line-height: 45px;

    & > div {
      display: inline-block;
    }
  }

  .search-input {
    height: 48px;
    line-height: 48px;
  }

  .search-tag-tag {
    width: calc(100% - 200px);
  }

  .new-button {
    max-width: 180px;
    height: 32px;
    line-height: 32px;
    padding: 0;
  }

</style>
