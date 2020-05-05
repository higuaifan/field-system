/**
 * @description
 * @author higuaifan
 * @date 2020/5/5 0:51
 **/
const BaseController = require('./base')
const ModuleFieldsBean = require('../bean/ModuleFieldsBean')

class ModuleFieldsController extends BaseController {
    async index() {
        const { ctx } = this;
        const list = await ctx.service.moduleFields.index(this.queryHandler(ctx.query));
        ctx.body = this.successResponseData(list);
    }

    async like() {
        const { ctx } = this;
        const list = await ctx.service.moduleFields.like(this.queryHandler(ctx.query));
        ctx.body = this.successResponseData(list);
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.moduleFields.insert(ctx.request.body);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }

    async show(){
        const { ctx } = this;
        const list = await ctx.service.moduleFields.show(ctx.request.ctx.params.id);
        ctx.body = this.successResponseData(list);
    }

    /**
     * 修改模块下所有字段的方法
     * @returns {Promise<void>}
     */
    async createAll() {
        // todo 这里可能要用事务
        const { ctx } = this;
        const { body } = ctx.request;
        const result = body.every(async item => {
            const moduleFieldsBean = new ModuleFieldsBean(item);
            return await ctx.service.moduleFields.insert(moduleFieldsBean.create);
        });
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.moduleFields.destroy(ctx.request.ctx.params.id);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }
}

module.exports = ModuleFieldsController;
