import axios from 'axios'
import { useAuthStore } from '../store/auth'; // 确保扩展名

//单独引入element的Message组件，以使用
import { ElMessage } from 'element-plus'

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000
});

//------------------请求拦截-------------------//
//------------在发送请求之前做些什么------------//
axios.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const token = authStore.token; // 从 Pinia store 获取 token
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, err => {
    console.log("请求拦截=>", err);
    return err;
})

// 响应拦截器，处理 HTTP 401 错误
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // 当接收到 401 错误时，跳转到登录页面
            ElMessage.error('认证已过期，请重新登录');
            const authStore = useAuthStore();
            authStore.clearToken();             
            router.push('/login'); // 跳转到登录页面
        }
        return Promise.reject(error);
    }
);

export default instance;