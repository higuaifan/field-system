/**
 * @description 查询对象类
 * @author: 菩萨蛮
 * @date 2020/2/12 9:11 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */


export default class SearchObj {
  constructor(param, name, value, type = 'input', label) {
    this._type = type;
    this._name = name;
    this._value = value;
    this._param = param;
    this._label = label;
  }

  get tags() {
    return {
      name: `${this._name}:${this._type !== 'select' ? this._value : this._label}`,
      type: this._type,
      value: this._value,
      param: this._param,
      _label: this._label
    };
  }
}
