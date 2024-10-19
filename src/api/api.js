import axios from 'axios'
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth'; // 确保扩展名

//单独引入element的Message组件，以使用
import { ElMessage } from 'element-plus'

// 创建一个 axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000
});

//------------------请求拦截-------------------//
//------------在发送请求之前做些什么------------//
axiosInstance.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const token = authStore.token; // 从 Pinia store 获取 token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // 添加 token 到请求头
    }
    return config;
}, err => {
    console.log("请求拦截=>", err);
    return err;
})

// 响应拦截器，处理 HTTP 401 错误
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // 当接收到 401 错误时，跳转到登录页面
            if (error.config.url !== '/auth/user/login') {
                ElMessage.error('认证已过期，请重新登录');
                const authStore = useAuthStore();
                authStore.clearToken();
                
                const router = useRouter();
                router.push('/login'); // 跳转到登录页面
            }
        }
        return Promise.reject(error);
    }
);

// 定义通用请求方法
const api = {
    get: (url, params) => axiosInstance.get(url, { params }),
    post: (url, data) => axiosInstance.post(url, data),
    put: (url, data) => axiosInstance.put(url, data),
    delete: (url) => axiosInstance.delete(url),
};

export default api;