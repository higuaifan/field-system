/**
 * @description
 * @author higuaifan
 * @date 2020/5/5 0:51
 **/
const BaseController = require('./base')

class ModuleFieldsController extends BaseController {
    async index() {
        const { ctx } = this;
        const list = await ctx.service.moduleFields.index();
        ctx.body = this.successResponseData(list);
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.moduleFields.insert(ctx.request.body);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.moduleFields.destroy(ctx.request.ctx.params.id);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }
}

module.exports = ModuleFieldsController;
