/**
 * @description
 * @author higuaifan
 * @date 2020/5/5 17:04
 **/

class ModuleFieldsBean {
    constructor(data) {
        this.id = data.id;
        this.moduleId = data.moduleId;
        this.moduleName = data.moduleName;
        this.fieldId = data.fieldId;
        this.fieldName = data.fieldName;
        this.parentModuleFieldId = data.parentModuleFieldId;
        this.content = data.content;
        this.createTime = data.createTime;
        this.modifyTime = data.modifyTime;
    }

    get create() {
        return {
            moduleId: this.moduleId,
            moduleName: this.moduleName,
            fieldId: this.fieldId,
            fieldName: this.fieldName,
            parentModuleFieldId: this.parentModuleFieldId,
            content: this.content,
        }
    }
}


module.exports = ModuleFieldsBean;
