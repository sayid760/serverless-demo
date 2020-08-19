
import axios from 'axios'
import { getToken } from '@/utils/auth'

class HttpRequest {
    interceptors (instance, url) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            if(getToken()){ 
              config.headers['Authorization'] = `Bearer ${getToken()}`; // 请求带上token,后端接口判断请求头有无token
            }
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response.data;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });

        }
  request (options) {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_URL, // api的base_url  window.env.apiUrl
        timeout: 60000, // request timeout
    });
    this.interceptors(instance, options.url)
    return instance(options)
  }


}

export default HttpRequest