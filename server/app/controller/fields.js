/**
 * @description 字段表controller
 * @author higuaifan
 * @date 2020/5/5 0:50
 **/
const BaseController = require('./base')

class FieldsController extends BaseController {
    async index() {
        const { ctx } = this;
        const list = await ctx.service.fields.index();
        ctx.body = this.successResponseData(list);
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.fields.insert(ctx.request.body);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.fields.destroy(ctx.request.ctx.params.id);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }
}

module.exports = FieldsController;
