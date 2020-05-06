/**
 * @description echarts图表获取Service
 * @author higuaifan
 * @date 2020/5/5 23:41
 **/
const BaseService = require('./BaseService')

class EchartsService extends BaseService {
    async index() {

        const modulesList = await this.app.mysql.query('select module_name as name from modules');
        const fieldList = await this.app.mysql.query('select field_name as name from fields');
        const moduleFieldsList = await this.app.mysql.query('select module_name,field_name from module_fields');
        const fieldCorrelationList = await this.app.mysql.query('select module_a_name,module_fields_name_a,module_b_name,module_fields_name_b from fields_correlation');

        const data = [
            ...modulesList.map(e => ({
                name: e.name,
                symbolSize: 60
            })),
            ...fieldList.map(e => ({
                name: e.name,
                symbolSize: 20,
                itemStyle: {
                    color: 'rgb(128, 128, 128)'
                }
            })),
            ...moduleFieldsList.map(e => ({
                name: `${e.module_name}-${e.field_name}`,
                symbolSize: 40,
                itemStyle: {
                    color: '#5000b8'
                }
            })),
        ];


        const fieldsList = moduleFieldsList.map(e => [{ source: e.module_name, target: `${e.module_name}-${e.field_name}` },
            { source: `${e.module_name}-${e.field_name}`, target: e.field_name }]).flat();

        const edges = [
            ...fieldsList.map(e => ({
                ...e,
                lineStyle: {
                    color: '#2b97a4',
                    width: '3'
                }
            })),
            ...fieldCorrelationList.map(e=>({
                source:`${e.module_a_name}-${e.module_fields_name_a}`,
                target:`${e.module_b_name}-${e.module_fields_name_b}`,
                lineStyle: {
                    color: '#f2c1bd',
                    width: '3'
                }
            }))
        ];

        return { data, edges };
    }
}

module.exports = EchartsService;
