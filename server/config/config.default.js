exports.keys = 'higuaifan';
exports.logger = {
    level: 'DEBUG',
};
exports.mysql = {
    client: {
        host: '',
        port: '',
        user: '',
        password: '',
        database: 'field_system'
    },
    app: true,
    agent: false
}
exports.security = {
    csrf: {
        enable: false
    }
}
exports.onerror = {
    all(err, ctx) {
        if (err.name === 'ServiceBizError') {
            ctx.body = JSON.stringify({
                code: 201,
                msg: err.message
            });
            ctx.status = 200;
        }
    }
}
