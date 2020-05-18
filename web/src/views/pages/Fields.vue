<template>
  <div class="order contract">
    <search :search-obj-list="order.search"
            new-str="新增字段"
            @toNew="showNewDrawer"
            @reSearch="reSearch"/>
    <div class="order-table">
      <div class="order-main-header">
      </div>
      <gf-table :gf-table="gfTable"
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
      </gf-table>
    </div>
    <el-drawer title="新增字段" :visible.sync="newDrawerVisible" :before-close="closeNewDrawer">
      <new-fields v-if="newDrawerVisible" @close="closeNewDrawer"/>
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

  import GfTable from '../../../mixins/order/GfTable';
  import Order from '../../../mixins/order/Order';
  import NewFields from './new/NewFields';

  export default {
    name: 'Fields',
    mixins: [GfTable, Order],
    components: { NewFields },
    data() {
      return {
        gfTable: { url: '/api/fields' },
        order: {
          search: []
        }
      };
    }
  };
</script>

<style scoped>

</style>
