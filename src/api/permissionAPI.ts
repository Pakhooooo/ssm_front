import api from '@/api/api';
import { ElMessage } from 'element-plus';
import { Permission } from '@/types/permission';

export const fetchPermissions = async (pageNum: number, pageSize: number, query: Record<string, any>) => {
    try {
        const response = await api.post('/permissions', {
            pageNum: pageNum,
            pageSize: pageSize,
            ...query,
        });
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const updatePermission = async (row: Permission) => {
    try {
        const response = await api.put('/permission/update', {
            permissionId: row.id,
            permissionName: row.permissionName
        });
        ElMessage.success(response.data.message);
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const deletePermission = async (row: Permission) => {
    try {
        const response = await api.delete('/permission/' + row.id);
        ElMessage.success(response.data.message);
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};