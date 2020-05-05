/**
 * @description
 * @author higuaifan
 * @date 2020/5/5 21:33
 **/
const BaseController = require('./base')


class FieldsCorrelation extends BaseController {
    async index() {
        const { ctx } = this;
        const list = await ctx.service.fieldsCorrelation.index(this.queryHandler(ctx.query));
        ctx.body = this.successResponseData(list);
    }

    async getListByFieldId() {
        const { ctx } = this;
        const list = await ctx.service.fieldsCorrelation.getListByFieldId(ctx.request.ctx.params.id);
        ctx.body = this.successResponseData(list);
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.fieldsCorrelation.insert(ctx.request.body);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.fieldsCorrelation.destroy(ctx.request.ctx.params.id);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }
}

module.exports = FieldsCorrelation
