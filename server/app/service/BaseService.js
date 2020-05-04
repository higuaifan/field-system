/**
 * @description
 * @author higuaifan
 * @date 2020/5/4 22:09
 **/

const Service = require('egg').Service;

class BaseService extends Service {

    objectToLine(obj) {
        const toLine = name => {
            return name.replace(/([A-Z])/g, "_$1").toLowerCase();
        }
        const lineObj = {};
        Object.keys(obj).map(k => {
            if (obj[k] !== '') {
                lineObj[toLine(k)] = obj[k];
            }
        });
        return lineObj;
    }


}

module.exports = BaseService;
