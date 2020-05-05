/**
 * @description
 * @author higuaifan
 * @date 2020/5/5 21:33
 **/

const BaseService = require('./BaseService')


class FieldsCorrelationService extends BaseService {
    async index(where) {
        return this.app.mysql.select('fields_correlation', {
            where: this.objectToLine(where)
        });
    }

    async getListByFieldId(id) {
        return this.app.mysql.query(`select * from fields_correlation_view where module_fields_id_a = '${id}' or (module_fields_id_b='${id}' and direction=2)`);
    }

    async insert(data) {
        // 判断是否有反向的双向关系

        const result = await this.app.mysql.insert('fields_correlation', this.objectToLine(data));
        return result.affectedRows === 1;
    }

    async destroy(id) {
        const result = await this.app.mysql.delete('fields_correlation', { id });
        return result.affectedRows === 1;
    }


}

module.exports = FieldsCorrelationService;
