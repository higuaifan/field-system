<template>
  <div class="order contract">
    <search :search-obj-list="order.search"
            new-str="新增字段"
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
            <el-table-column prop="field_name" label="字段名称"/>
            <el-table-column prop="description" label="字段描述"/>
            <el-table-column label="操作" fixed="right" width="140px">
              <template slot-scope="scope">
                <div class="table-operator">
                  <i class="el-icon-third-shanchu" @click="remove(scope.row)"/>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </qx-table>
    </div>
    <el-drawer title="新增字段" :visible.sync="newDrawerVisible" :before-close="closeNewDrawer">
      <new-fields v-if="newDrawerVisible"/>
    </el-drawer>
  </div>
</template>

<script>
  /**
   * @description 模块页面
   * @author: 菩萨蛮
   * @date 2020/05/05 1:00 上午
   * @version V1.0.0
   */

  import QxTable from '../../../mixins/order/QxTable';
  import Order from '../../../mixins/order/Order';
  import NewFields from './new/NewFields';

  export default {
    name: 'Fields',
    mixins: [QxTable, Order],
    components: { NewFields },
    data() {
      return {
        qxTable: { url: '/api/fields' },
        order: {
          search: []
        }
      };
    }
  };
</script>

<style scoped>

</style>
