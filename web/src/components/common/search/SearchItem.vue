<template>
  <div class="search-item">
    <div>
      <span>{{searchInput.name}}</span>
      <el-input v-model="input" :placeholder="`请输入${searchInput.name}`"
                v-if="searchInput.type !=='select'"
                @keyup.enter.native="pushTab"/>
      <el-select v-if="searchInput.type ==='select'"
                 v-model="input"
                 :placeholder="`请选择${searchInput.name}`"
                 @change="pushTab">
        <el-option v-for="item in searchInput.selectList"
                   :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>/**
 * @description 查询输入组件
 * @author: higuaifan
 * @date 2020/2/12 9:24 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */

import SearchObj from './SearchObj';

export default {
  name: 'SearchItem',
  props: {
    searchInput: {
      type: Object
    },
    clear: Number
  },
  watch: {
    clear() {
      this.input = '';
    }
  },
  data() {
    return {
      input: ''
    };
  },
  methods: {
    pushTab() {
      if (!this.utils.isEmpty(this.input)) {
        this.$emit('pushTab',
          new SearchObj(this.searchInput.param, this.searchInput.name,
            this.input, this.searchInput.type,
            this.searchInput.type === 'select' ? this.searchInput.selectList.find(i => i.value === this.input).label : '')
            .tags);
      }
    }
  }
}
;
</script>

<style lang="scss" scoped>
  .el-input {
    width: 220px;
  }

  .search-item {
    display: inline-block;

    span {
      margin: 0 13px;
      font-size: 12px;
      font-weight: 500;
      color: #6a7079;
    }
  }
</style>
