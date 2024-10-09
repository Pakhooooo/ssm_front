import { useAuthStore } from '@/store/auth';

export default {
    mounted(el, binding) {
        const authStore = useAuthStore();
        const { role, permission } = binding.value;

        // 如果没有指定角色和权限，直接返回
        if (!role && !permission) return;

        let hasRole = true;
        let hasPermission = true;

        // 检查角色
        if (role) {
            hasRole = authStore.hasRole(role);
        }

        // 检查权限
        if (permission) {
            hasPermission = authStore.hasPermission(permission);
        }

        if (!hasRole || !hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
};
