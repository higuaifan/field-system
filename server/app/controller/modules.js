/**
 * @description 模块表Controller
 * @author higuaifan
 * @date 2020/5/5 0:50
 **/
const BaseController = require('./base')

class ModulesController extends BaseController {
    async index() {
        const { ctx } = this;
        const list = await ctx.service.modules.index(this.queryHandler(ctx.query));
        ctx.body = this.successResponseData(list);
    }

    async like() {
        const { ctx } = this;
        const list = await ctx.service.modules.like(this.queryHandler(ctx.query));
        ctx.body = this.successResponseData(list);
    }

    async show(){
        const { ctx } = this;
        const list = await ctx.service.modules.show(ctx.request.ctx.params.id);
        ctx.body = this.successResponseData(list);
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.modules.insert(ctx.request.body);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.modules.destroy(ctx.request.ctx.params.id);
        ctx.body = result ? this.successResponseData() : this.failResponseData();
    }
}

module.exports = ModulesController;
