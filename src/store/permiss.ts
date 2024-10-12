import { defineStore } from 'pinia';

export const usePermissStore = defineStore('permiss', {
    state: () => {
        const permissionIds = localStorage.getItem('permissionIds') || [];
        return {
            key: permissionIds as number[]
        };
    },
    actions: {
        handleSet(val: string[]) {
            this.key = val;
        },
    },
});