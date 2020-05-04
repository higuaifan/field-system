/**
 * @description 项目表controller
 * @author higuaifan
 * @date 2020/05/04
 */

const BaseController = require('./base')

class ProjectController extends BaseController {
    async index() {
        const { ctx } = this;
        const list = await ctx.service.project.index(this.queryHandler(ctx.query));
        ctx.body = this.successResponseData(list);
    }

    async like() {
        const { ctx } = this;
        const list = await ctx.service.project.like(this.queryHandler(ctx.query));
        ctx.body = this.successResponseData(list);
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.project.insert(ctx.request.body);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.project.destroy(ctx.request.ctx.params.id);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }
}

module.exports = ProjectController;
