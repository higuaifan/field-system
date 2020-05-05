/**
 * @description 字段表fields
 * @author higuaifan
 * @date 2020/5/5 0:27
 **/

const BaseService = require('./BaseService')
const ServiceBizError = require('../../error/ServiceBizError')

class FieldsService extends BaseService {
    async index(where) {
        return this.app.mysql.select('fields', { where: this.objectToLine(where) });
    }

    async like(where) {
        return this.app.mysql
            .query(`select * from fields where field_name like \'%${where.fieldName}%\'`);
    }

    async read(where) {
        return this.app.mysql.select('fields', { where: this.objectToLine(where) });
    }

    async insert(data) {
        const isInsert = await this.read({ field_name: data.fieldName });
        if (isInsert.length > 0) {
            throw new ServiceBizError('字段名称不可重复');
        }
        const result = await this.app.mysql.insert('fields', this.objectToLine(data));
        return result.affectedRows === 1;
    }

    async destroy(id) {
        const result = await this.app.mysql.delete('fields', { id });
        return result.affectedRows === 1;
    }


}

module.exports = FieldsService;
