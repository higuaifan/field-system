/**
 * @description echarts图表获取Service
 * @author higuaifan
 * @date 2020/5/5 23:41
 **/
const BaseService = require('./BaseService')

class EchartsService extends BaseService {
    async index() {

        const modulesList = await this.app.mysql.query('select module_name as name from modules');
        const fieldNameList = await this.app.mysql.query('select field_name as name from fields');

        const data = [
            ...modulesList.map(e => ({
                name: e.name,
                symbolSize: 60
            })),
            ...fieldNameList.map(e => ({
                name: e.name,
                symbolSize: 20,
                itemStyle: {
                    color: 'rgb(128, 128, 128)'
                }
            })),
        ]

        const systemEdgeList = await this.app.mysql.query('select f.field_name as \'source\',m.module_name as \'target\' from module_fields_view f,modules m where f.module_id = m.id');
        const fieldsEdgeList = await this.app.mysql.query('select f.field_name as \'source\',m.field_name as \'target\' from fields_correlation_view f,module_fields_view m where f.module_fields_id_a = m.id');

        const edges = [
            ...systemEdgeList.map(e=>({
                ...e,
                lineStyle:{
                    color:'#f86d62',
                    width:'3'
                }
            })),
            ...fieldsEdgeList.map(e=>({
                ...e,
                lineStyle:{
                    color:'#8db600',
                    width:'1'
                }
            }))
        ]

        return { data, edges };
    }
}

module.exports = EchartsService;
