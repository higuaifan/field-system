/**
 * @description
 * @author higuaifan
 * @date 2020/5/5 1:35
 **/

class ServiceBizError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServiceBizError";
    }
}

module.exports = ServiceBizError;
