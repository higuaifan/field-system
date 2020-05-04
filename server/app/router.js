module.exports = app => {
    const { router, controller } = app;
    router.resources('project', '/project', controller.project);
    router.resources('modules', '/modules', controller.modules);
    router.resources('fields', '/fields', controller.fields);
    router.resources('moduleFields', '/moduleFields', controller.moduleFields);
    router.get('/project/like', controller.project.like);
    router.get('/modules/like', controller.modules.like);
};
