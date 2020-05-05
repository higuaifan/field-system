<template>
  <div class="order contract">
    <search :search-obj-list="order.search"
            new-str="新增模块"
            @toNew="showNewDrawer"
            @reSearch="reSearch"/>
    <div class="order-table">
      <div class="order-main-header">
      </div>
      <qx-table :qx-table="qxTable"
                @updateTable="updateTable">
        <template slot="table" slot-scope="data">
          <el-table :data="data.table" fit show-overflow-tooltip>
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="module_name" label="模块名称"/>
            <el-table-column prop="description" label="模块描述"/>
            <el-table-column label="操作" fixed="right" width="140px">
              <template slot-scope="scope">
                <div class="table-operator">
                  <i class="el-icon-third-shanchu" @click="remove(scope.row)"/>
                  <i class="el-icon-edit-outline" @click="setFields(scope.row)"/>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </qx-table>
    </div>
    <el-drawer title="新增模块" :visible.sync="newDrawerVisible" :before-close="closeNewDrawer">
      <new-modules v-if="newDrawerVisible" @close="closeNewDrawer"/>
    </el-drawer>
  </div>
</template>

<script>
  /**
   * @description 模块页面
   * @author: higuaifan
   * @date 2020/05/05 1:00 上午
   * @version V1.0.0
   */

  import QxTable from '../../../mixins/order/QxTable';
  import Order from '../../../mixins/order/Order';
  import NewModules from './new/NewModules';

  export default {
    name: 'Modules',
    mixins: [QxTable, Order],
    components: { NewModules },
    data() {
      return {
        qxTable: { url: '/api/modules' },
        order: {
          search: []
        }
      };
    },
    methods: {
      setFields(row) {
        this.$router.push(`/modules-operator/${row.id}`);
      }
    }
  };
</script>

<style scoped>

</style>
