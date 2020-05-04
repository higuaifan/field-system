/**
 * @description 项目表service
 * @author higuaifan
 * @date 2020/05/04
 */

const BaseService = require('./BaseService')

class ProjectService extends BaseService {
    async index(where) {
        return this.app.mysql.select('project', {
            where: this.objectToLine(where)
        });
    }

    async like(where) {
        return this.app.mysql
            .query(`select * from project where project_name like \'%${where.projectName}%\'`);
    }

    async insert(data) {
        const result = await this.app.mysql.insert('project', this.objectToLine(data));
        return result.affectedRows === 1;
    }

    async destroy(id) {
        const result = await this.app.mysql.delete('project', { id });
        return result.affectedRows === 1;
    }


}

module.exports = ProjectService;
