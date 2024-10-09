import { useAuthStore } from '@/store/auth';

export default {
    mounted(el, binding) {
        const authStore = useAuthStore();
        const { role, permission } = binding.value;

        if (role && !authStore.hasRole(role)) {
            el.parentNode && el.parentNode.removeChild(el);
        }

        if (permission && !authStore.hasPermission(permission)) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
};
