import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token'), // 从 localStorage 初始化 token
    }),
    actions: {
        // 设置 token，并将其保存到 localStorage
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token); // 保存 token 到 localStorage
        },
        // 清除 token，并从 localStorage 中移除
        clearToken() {
            this.token = null;
            localStorage.removeItem('token'); // 移除 localStorage 中的 token
        },
    },
    getters: {
        // 判断用户是否已认证
        isAuthenticated: (state) => !!state.token,
    },
});
