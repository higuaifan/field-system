<template>
  <div class="order contract">
    <search :search-obj-list="order.search"
            new-str="新增系统"
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
            <el-table-column prop="project_name" label="系统名称"/>
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
    <el-drawer title="新增系统" :visible.sync="newDrawerVisible" :before-close="closeNewDrawer">
      <new-project v-if="newDrawerVisible"/>
    </el-drawer>
  </div>
</template>

<script>
  /**
   * @description 项目页面
   * @author: 菩萨蛮
   * @date 2020/05/04 7:07 下午
   * @version V1.0.0
   */

  import QxTable from '../../../mixins/order/QxTable';
  import Order from '../../../mixins/order/Order';
  import NewProject from './new/NewProject';

  export default {
    name: 'Project',
    mixins: [QxTable, Order],
    components: { NewProject },
    data() {
      return {
        qxTable: { url: '/api/project' },
        order: {
          search: []
        }
      };
    }
  };
</script>

<style scoped>

</style>
