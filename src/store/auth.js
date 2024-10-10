import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token'), // 从 localStorage 初始化 token
        userId: localStorage.getItem('userId'), // 从 localStorage 初始化 userId
        username: localStorage.getItem('username'), // 初始化用户名
        roles: JSON.parse(localStorage.getItem('roles')) || [], // 初始化角色
        permissions: JSON.parse(localStorage.getItem('permissions')) || [], // 初始化权限
    }),
    actions: {
        // 设置 token，并将其保存到 localStorage
        setToken(token, userId, username, roles, permissions) {
            this.token = token;
            this.userId = userId;
            this.username = username;
            this.roles = roles;
            this.permissions = permissions;
        
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            localStorage.setItem('roles', JSON.stringify(roles)); // 保存 roles 到 localStorage
            localStorage.setItem('permissions', JSON.stringify(permissions)); // 保存 permissions 到 localStorage
        },
        // 清除 token，并从 localStorage 中移除
        clearToken() {
            this.token = null;
            this.userId = null;
            this.username = null;
            this.roles = [];
            this.permissions = [];

            localStorage.removeItem('token'); // 移除 localStorage 中的 token
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('roles');
            localStorage.removeItem('permissions');
        },
    },
    getters: {
        // 判断用户是否已认证
        isAuthenticated: (state) => !!state.token,
        hasRole: (state) => (role) => {
            return state.roles.includes(role);
        },
        // 检查权限
        hasPermission: (state) => (permissionKey) => {
            return state.permissions.includes(permissionKey);
        },
    },
});
