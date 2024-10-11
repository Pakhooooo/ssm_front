import api from '@/api/api';
import { ElMessage } from 'element-plus';
import { Role } from '@/types/role';

export const fetchRoles = async (pageNum: number, pageSize: number, query: Record<string, any>) => {
    try {
        const response = await api.post('/roles', {
            pageNum: pageNum,
            pageSize: pageSize,
            ...query,
        });
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const addRole = async (role: Role) => {
    try {
        if (role.id != null) {
            const response = await api.put('/role/update', {
                id: role.id,
                roleName: role.roleName
            });
            ElMessage.success(response.data.message);
        } else {
            const response = await api.post('/role/add', {
                roleName: role.roleName,
                roleCode: role.roleCode
            });
            ElMessage.success(response.data.message);
        }
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const deleteRole = async (row: Role) => {
    try {
        const response = await api.delete('/role/' + row.id);
        ElMessage.success(response.data.message);
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};