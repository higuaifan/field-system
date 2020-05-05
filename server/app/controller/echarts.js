/**
 * @description echarts图表获取方法
 * @author higuaifan
 * @date 2020/5/5 23:39
 **/

const BaseController = require('./base')

class EchartsController extends BaseController {
    async index() {
        const { ctx } = this;
        const obj = await ctx.service.echarts.index();
        ctx.body = this.successResponseData(obj);
    }
}

module.exports = EchartsController;
