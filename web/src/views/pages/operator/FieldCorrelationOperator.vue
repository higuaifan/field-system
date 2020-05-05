<template>
  <div>
    <qx-select-table :data="correlationList">
      <el-table-column prop="fieldId" label="模块">
        <template slot-scope="scope">
          <modules-auto-complete v-if="scope.row.isNew"
                                 :value.sync="moduleName" @setValue="setModule"/>
          <div v-else>
            <span class="filed-name-span">{{scope.row.moduleName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="fieldName" label="关联关系">
        <template slot-scope="scope">
          <el-select v-model="direction" placeholder="placeholder" v-if="scope.row.isNew">
            <el-option label="单向" :value="1"></el-option>
            <el-option label="双向" :value="2"></el-option>
          </el-select>
          <span v-else>{{scope.row.direction===1?'单向':'双向'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fieldName" label="字段名称">
        <template slot-scope="scope">
          <module-fields-auto-complete v-if="scope.row.isNew"
                                       :disabled="utils.isEmpty(moduleObj.id)"
                                       :module-param="moduleParam"
                                       :value.sync="filedName" @setValue="setFields"/>
          <div v-else>
            <span class="filed-name-span">{{scope.row.fieldName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="140px">
        <template slot-scope="scope">
          <div class="table-operator" v-if="!scope.row.isNew">
            <i class="el-icon-third-shanchu" @click="remove(scope.row)"/>
          </div>
        </template>
      </el-table-column>
    </qx-select-table>
  </div>
</template>

<script>
  /**
   * @description 字段关联操作页面
   * @author higuaifan
   * @date 2020/5/5 20:28
   *
   * 选择框有机会做下优化
   * TODO 模块字段双向时会有指向错误，需要优化
   */

  export default {
    name: 'FieldCorrelationOperator',
    props: {
      field: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        moduleName: '',
        filedName: '',
        moduleObj: {},
        correlationList: [],
        moduleParam: '',
        direction: 2
      };
    },
    async created() {
      await this.getCorrelationList();
    },
    methods: {
      async getCorrelationList() {
        const { data } = await this.qGet(`/api/fieldsCorrelation/getListByFieldId/${this.field.id}`);
        this.correlationList = data.datas.map(d => this.utils.objToHump(d));
      },
      setModule(item) {
        this.moduleObj = item;
        this.moduleParam = `&moduleId=${item.id}`;
      },
      async setFields(item) {
        const response = await this.qPost({
          url: '/api/fieldsCorrelation',
          data: {
            moduleFieldsIdA: this.field.id,
            moduleFieldsIdB: item.id,
            direction: this.direction
          }
        });
        if (response.code === 200) {
          this.direction = 2;
          this.moduleName = '';
          this.filedName = '';
          this.$message.success('新增成功！');
          await this.getCorrelationList();
        }
      },
      async remove(row) {
        const deleteStr = `确定删除与字段${row.fieldName}的关系吗？`;
        const { code } = await this.qDelete(`/api/fieldsCorrelation/${row.id}`, deleteStr, '取消删除');
        if (code === 200) {
          this.$message.success('删除成功！');
          await this.getCorrelationList();
        }
      }
    }
  };
</script>

<style scoped>

</style>
