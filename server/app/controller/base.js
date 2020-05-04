/**
 * @description 基础controller
 * @author higuaifan
 * @date 2020/5/4 18:33
 **/
const Controller = require('egg').Controller;

class BaseController extends Controller {
    successResponseData(datas) {
        return {
            code: 200,
            msg: 'success',
            data: {
                datas
            }
        }
    }

    failResponseData() {
        return {
            code: 400,
            msg: 'fail'
        }
    }

    queryHandler(query) {
        const newQuery = JSON.parse(JSON.stringify(query));
        // 先删了好了
        delete newQuery.pageNum;
        delete newQuery.pageSize;
        delete newQuery.total;
        return newQuery
    }
}

module.exports = BaseController;
