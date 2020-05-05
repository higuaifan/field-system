/**
 * @description 模块字段对应表Service
 * @author higuaifan
 * @date 2020/5/5 0:38
 **/

const BaseService = require('./BaseService')

class ModuleFieldsService extends BaseService {
    async index(where) {
        return this.app.mysql.select('module_fields_view', { where: this.objectToLine(where) });
    }

    async like(where) {
        let moduleIdSql = '';
        if (where.moduleId !== undefined) {
            moduleIdSql = ` and module_id = ${where.moduleId}`
        }

        return this.app.mysql
            .query(`select * from module_fields_view where field_name like \'%${where.fieldName}%\'${moduleIdSql}`);
    }

    async show(id) {
        return this.app.mysql.select('module_fields_view', { where: { id } });
    }

    async insert(data) {
        const result = await this.app.mysql.insert('module_fields', this.objectToLine(data));
        return result.affectedRows === 1;
    }

    async destroy(id) {
        const result = await this.app.mysql.delete('module_fields', { id });
        return result.affectedRows === 1;
    }


}

module.exports = ModuleFieldsService;
