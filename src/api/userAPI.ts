import api from '@/api/api';
import { ElMessage } from 'element-plus';
import { User } from '@/types/user';

export const logout = async () => {
    try {
        await api.post('/user/logout', {});
    } catch (error) {
        console.log('用户登出失败:', error);
        ElMessage.error(error.response.data.message);
    }
};

export const fetchUsers = async (pageNum: number, pageSize: number, query: Record<string, any>) => {
    try {
        const response = await api.post('/users', {
            pageNum: pageNum,
            pageSize: pageSize,
            ...query,
        });
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const updateUser = async (row: User) => {
    try {
        const response = await api.put('/user/' + row.userId, {
            age: row.age,
            sex: row.sex,
            realName: row.realName,
            phone: row.phone
        });
        ElMessage.success(response.data.message);
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const deleteUser = async (row: User) => {
    try {
        const response = await api.delete('/user/' + row.userId);
        ElMessage.success(response.data.message);
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const saveUserRole = async (userId: number, query: Record<number, any>) => {
    try {
        const response = await api.post('/user/role/add', {
            userId: userId,
            roleIds: query
        });
        ElMessage.success(response.data.message);
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};