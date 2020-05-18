<template>
  <div class="order contract">
    <search :search-obj-list="order.search"
            new-str="新增系统"
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
      </gf-table>
    </div>
    <el-drawer title="新增系统" :visible.sync="newDrawerVisible" :before-close="closeNewDrawer">
      <new-project v-if="newDrawerVisible" @close="closeNewDrawer"/>
    </el-drawer>
  </div>
</template>

<script>
  /**
   * @description 项目页面
   * @author: higuaifan
   * @date 2020/05/04 7:07 下午
   * @version V1.0.0
   */

  import GfTable from '../../../mixins/order/GfTable';
  import Order from '../../../mixins/order/Order';
  import NewProject from './new/NewProject';

  export default {
    name: 'Project',
    mixins: [GfTable, Order],
    components: { NewProject },
    data() {
      return {
        gfTable: { url: '/api/project' },
        order: {
          search: []
        }
      };
    }
  };
</script>

<style scoped>

</style>
