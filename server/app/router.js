module.exports = app => {
    const { router, controller } = app;
    router.get('/modules/like', controller.modules.like);
    router.get('/moduleFields/like', controller.moduleFields.like);
    router.get('/project/like', controller.project.like);
    router.get('/fields/like', controller.fields.like);
    router.get('/echarts', controller.echarts.index);
    router.resources('project', '/project', controller.project);
    router.resources('modules', '/modules', controller.modules);
    router.resources('fields', '/fields', controller.fields);
    router.resources('moduleFields', '/moduleFields', controller.moduleFields);
    router.resources('fieldsCorrelation', '/fieldsCorrelation', controller.fieldsCorrelation);
    router.get('/fieldsCorrelation/getListByFieldId/:id', controller.fieldsCorrelation.getListByFieldId);
    router.post('/moduleFields/createAll', controller.moduleFields.createAll);
};
