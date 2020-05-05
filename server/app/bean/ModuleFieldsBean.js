/**
 * @description
 * @author higuaifan
 * @date 2020/5/5 17:04
 **/

class ModuleFieldsBean {
    constructor(data) {
        this.id = data.id;
        this.moduleId = data.moduleId;
        this.fieldId = data.fieldId;
        this.parentModuleFieldId = data.parentModuleFieldId;
        this.content = data.content;
        this.createTime = data.createTime;
        this.modifyTime = data.modifyTime;
    }

    get create() {
        return {
            moduleId: this.moduleId,
            fieldId: this.fieldId,
            parentModuleFieldId: this.parentModuleFieldId,
            content: this.content,
        }
    }
}


module.exports = ModuleFieldsBean;
