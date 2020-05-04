/**
 * @description 模块表service
 * @author higuaifan
 * @date 2020/5/5 0:27
 **/

const BaseService = require('./BaseService')

class ModulesService extends BaseService {
    async index(where) {
        return this.app.mysql.select('modules', {
            where: this.objectToLine(where)
        });
    }

    async like(where) {
        return this.app.mysql
            .query(`select * from modules where module_name like \'%${where.moduleName}%\'`);
    }

    async insert(data) {
        const result = await this.app.mysql.insert('modules', this.objectToLine(data));
        return result.affectedRows === 1;
    }

    async destroy(id) {
        const result = await this.app.mysql.delete('modules', { id });
        return result.affectedRows === 1;
    }


}

module.exports = ModulesService;
