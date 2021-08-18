import axios from 'axios';
import {
    Loading,
    Message
} from 'element-ui'
import router from './router/index'

let loading;

function start() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'grey'
    })
}

function end() {
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
    start();
    if (window.sessionStorage.getItem('token')) {
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    return config
}, err => {
    return Promise.reject(err);
})

// //响应拦截
axios.interceptors.response.use(response => {
    end();
    return response
}, err => {
    end();
    Message.error(err.response);

    //获取错误状态码
    const status = err.response;
    if (status == 401) {
        localStorage.removeItem('eletoken');
        router.push('/login')
    }

    return Promise.reject(err);
})

export default axios;