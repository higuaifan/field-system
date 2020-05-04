import Vue from 'vue';
import axios from 'axios';
import { MessageBox, Message } from 'element-ui';

axios.defaults.baseURL = '/api';

/**
 * 随手定义的错误码
 * @type {{NO_RESPONSE: number, CANCEL: number, REQUEST_ERROR: number}}
 */
const ERROR_CODE = {
  CANCEL: 999,
  NO_RESPONSE: 998,
  REQUEST_ERROR: 997
};

const config = {
  baseURL: '/',
  timeout: 60 * 1000
};

const axiosConfig = axios.create(config);

axiosConfig.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status) {
      const { status } = error.response;
      if (status === 401) {
      } else if (status === 403) {
        Message.error('无该接口权限,请重新登陆！');
      } else {
        console.error('请求异常');
      }
    }
    return Promise.reject(error);
  }
);

/**
 * 提示操作确认方法
 * @param message 提示信息
 * @param title 标题
 * @param errorMsg 取消提示
 * @returns {Promise<boolean>} true: 同意  false: 取消
 */
const msg = async ({ message, title = '提示', errorMsg = '取消' }) => {
  try {
    const result = await MessageBox.confirm(message, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    });
    if (result === 'confirm') {
      return true;
    }
    Message.error('操作异常');
  } catch (e) {
    Message.info(errorMsg);
  }
  return false;
};

/**
 * 回调函数处理方法
 * @param response 回调函数
 * @returns {*} data数据正常的时候返回data数据
 */
const handleResponse = response => {
  if (response && response.status === 200) {
    const { data } = response;
    if (data) {
      if (data.code === 200) {
        return data;
      }
      if (data.code === 401) {
        const urlList = window.location.href.split(process.env.VUE_APP_HOST_URL);
        if (urlList && urlList.length > 1) {
          localStorage.setItem('path', urlList[1]);
        }
        localStorage.clear();
        sessionStorage.clear();
      }
    }
    Message.error(data.msg || '系统异常');
    return { code: ERROR_CODE.NO_RESPONSE };
  }
  Message.error('系统请求异常');
  return { code: ERROR_CODE.REQUEST_ERROR };
};

/**
 * 请求方法
 * @param method 请求方法
 * @param _model {*} url:路径,id:id号
 * @param message 提示信息
 * @param errorMsg 取消信息
 * @returns {Promise<*>}
 */
const req = async (method, _model, message, errorMsg) => {
  try {
    let result = true;
    let response;
    if (message) {
      result = await msg({
        message,
        errorMsg
      });
    }
    if (result) {
      let headers;
      // const Authorization = localStorage.getItem('token');
      // if (Authorization) {
      //   headers = { Authorization };
      // } else {
      //   Message.error('暂未登陆用户,请先登陆！');
      // }
      response = await axiosConfig({
        method,
        url: encodeURI(_model.url),
        data: _model.data,
        params: _model.params,
        headers
      });
    } else {
      return { code: ERROR_CODE.CANCEL };
    }
    if (response) {
      return handleResponse(response);
    }
    return { code: ERROR_CODE.NO_RESPONSE };
  } catch (e) {
    console.error(e);
    return { code: ERROR_CODE.NO_RESPONSE };
  }
};

const setModel = value => {
  if (typeof value === 'string') {
    return { url: value };
  }
  return value;
};

/**
 * get方法
 * @param _model {*} url:路径
 * @returns {Promise<void>}
 */
const qGet = async _model => req('get', setModel(_model))
  .catch(() => msg({ message: '系统异常' }));

const qDelete = async (_model, message, errorMsg = '取消删除') => req('delete', setModel(_model), message, errorMsg)
  .catch(() => msg({ message: '系统异常' }));

/**
 * patch方法
 * @param _model {*} url:路径,data:修改data
 * @param message 提示信息
 * @param errorMsg 取消信息
 * @returns {Promise<*>}
 */
const qPatch = async (_model, message, errorMsg = '取消修改') => req('patch', setModel(_model), message, errorMsg)
  .catch(() => msg({ message: '系统异常' }));

/**
 * post方法
 * @param _model {*} url:路径,data:新增data
 * @param message 提示信息
 * @param errorMsg 取消信息
 * @returns {Promise<*>}
 */
const qPost = async (_model, message, errorMsg = '取消新增') => req('post', setModel(_model), message, errorMsg)
  .catch(() => msg({ message: '系统异常' }));

/**
 * put方法
 * @param _model {*} url:路径,data:修改data
 * @param message 提示信息
 * @param errorMsg 取消信息
 * @returns {Promise<*>}
 */
const qPut = async (_model, message, errorMsg = '取消修改') => req('put', setModel(_model), message, errorMsg)
  .catch(() => msg({ message: '系统异常' }));

Plugin.install = V => {
  V.prototype.qGet = qGet;
  V.prototype.qPatch = qPatch;
  V.prototype.qDelete = qDelete;
  V.prototype.qPost = qPost;
  V.prototype.qPut = qPut;
  V.prototype.qxAxios = axiosConfig;
};

Vue.use(Plugin);

export default Plugin;
