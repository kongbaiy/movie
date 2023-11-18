import axios from 'axios';
import { Dialog, Toast } from '@/components/lib/index';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const newAxios = axios.create({
  baseURL: '/api',
  timeout: 100000,
  responseType: 'json',
  responseEncoding: 'utf8'
});

// 添加请求拦截器
newAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
newAxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data } = response;
  const { code, msg } = data;
  const status = code == 20000 ? true : false;

  if (code == 401) {
    Dialog.confirm({
      message: '暂无权限，请先登录',
      onConfirm() {
        window.location.hash = 'login';
      }
    });
  }

  if (!status) {
    Toast.show({
      message: msg,
      position: 'bottom'
    });
  }

  return {
    status,
    data: data?.data,
    originalData: data
  };
}, function (error) {
  // 对响应错误做点什么
  // return Promise.reject(error);

  if (error.response) {
    const { status } = error.response;

    if (status) {
      const errorText = codeMessage[status];

      Toast.show({
        message: `错误码：${status}, ${errorText}`,
        position: 'bottom'
      });
    }
  } else {
    Toast.show({
      message: '请求失败',
      position: 'bottom'
    });
  }

  throw error
});

export default newAxios
