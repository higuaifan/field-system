<template>
  <div class="new-order">
    <span class="title">{{moduleObj.module_name}}模块字段设置</span>
    <div class="control-button">
      <el-button @click="close()">关闭</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
    <el-divider/>
    <div>
      <qx-select-table :data="fieldsData">
        <el-table-column prop="fieldName" label="字段名称">
          <template slot-scope="scope">
            <fields-auto-complete v-if="scope.row.isNew"
                                  :value.sync="filedName" @setValue="setFields"/>
            <div v-else>
              <el-tag type="danger" effect="dark" v-if="scope.row.isOld">历史字段</el-tag>
              <span class="filed-name-span">{{scope.row.fieldName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fieldId" label="字段id"/>
        <el-table-column prop="description" label="字段描述"/>
        <qx-select-table-column prop="content" label="字段内容"/>
        <el-table-column label="操作" fixed="right" width="100px">
          <template slot-scope="scope">
            <div class="table-operator" v-if="!scope.row.isNew">
              <i class="el-icon-third-shanchu" @click="remove(scope.$index,scope.row)"/>
              <i class="el-icon-guide" @click="setCorrelation(scope.row)"/>
            </div>
          </template>
        </el-table-column>
      </qx-select-table>
    </div>
    <el-dialog :title="`${fieldCorrelationOperator.field.fieldName}字段关联编辑`"
               :visible.sync="fieldCorrelationOperator.visible">
      <field-correlation-operator v-if="fieldCorrelationOperator.visible"
                                  :field="fieldCorrelationOperator.field"
                                  @close="closeFieldCorrelationOperator"/>
    </el-dialog>
  </div>
</template>

<script>
  /**
   * @description 模块编辑页面
   * @author: higuaifan
   * @date 2020/05/05 3:41 下午
   * @version V1.0.0
   *
   * 这个页面的业务逻辑应该可以优化一下
   */
  import modifyOrder from '../../../../mixins/order/ModifyOrder';
  import FieldCorrelationOperator from './FieldCorrelationOperator';

  export default {
    name: 'ModulesOperator',
    mixins: [modifyOrder],
    components: { FieldCorrelationOperator },
    props: {
      url: {
        type: String,
        default: '/api/modules'
      }
    },
    data() {
      return {
        fieldCorrelationOperator: {
          visible: false,
          field: {}
        },
        filedName: '',
        moduleObj: {},
        fieldsData: []
      };
    },
    methods: {
      async setValue(data) {
        const { datas } = data;
        if (datas && datas.length === 1) {
          [this.moduleObj] = datas;
          // eslint-disable-next-line no-shadow
          const { data } = await this.qGet(`/api/moduleFields?module_id=${this.moduleObj.id}`);
          const { datas: fieldsData } = data;
          if (fieldsData && fieldsData.length > 0) {
            this.fieldsData = fieldsData.map(e => ({
              ...this.utils.objToHump(e),
              isOld: true
            }));
          } else {
            this.fieldsData = [];
          }
        }
      },
      setFields(item) {
        this.filedName = '';
        if (this.fieldsData.map(f => f.fieldName).includes(item.field_name)) {
          this.$message.error('字段不可重复!');
          return;
        }


        this.fieldsData.push({
          moduleId: this.moduleObj.id,
          moduleName: this.moduleObj.module_name,
          fieldId: item.id,
          fieldName: item.field_name,
          description: item.description,
          content: '',
          isOld: false
        });
      },
      async remove(i, row) {
        if (row.isOld) {
          // 如果是历史字段
          const response = await this.qDelete(`/api/moduleFields/${row.id}`,
            '将直接从数据库中删除本字段及关联信息，是否要删除？');
          if (response.code === 200) {
            this.$message.success('删除成功！');
            this.fieldsData.splice(i, 1);
          }
          return;
        }

        this.fieldsData.splice(i, 1);
      },
      async submit() {
        const { fieldsData } = this;
        if (fieldsData && fieldsData.length > 0) {
          const response = await this.qPost({
            url: '/api/moduleFields/createAll',
            data: this.fieldsData.filter(d => !d.isOld)
          });
          if (response.code === 200) {
            this.$message.success('新增字段成功！');
            this.close(true);
          }
        } else {
          this.$message.info('无新增！');
        }
      },
      setCorrelation(field) {
        if (this.utils.isEmpty(field.id)) {
          this.$message.error('请先保存字段！');
          return;
        }

        this.fieldCorrelationOperator = {
          visible: true,
          field
        };
      },
      closeFieldCorrelationOperator() {
        this.fieldCorrelationOperator.visible = false;
      }
    }
  };
</script>

<style scoped>
  .filed-name-span {
    display: inline-block;
    padding: 0 4px;
  }

</style>
