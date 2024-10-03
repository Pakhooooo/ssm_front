import api from '@/api/api';
import { ElMessage } from 'element-plus';

export const logout = async () => {
    try {
        await api.post('/user/logout', {});
    } catch (error) {
        console.log('用户登出失败:', error);
        ElMessage.error(error.response.data.message);
    }
};

export const fetchUsers = async (pageNum: number, pageSize: number) => {
    try {
        const response = await api.post('/users', {
            pageNum: pageNum,
            pageSize: pageSize,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log('获取用户列表失败:', error);
        ElMessage.error(error.response.data.message);
    }
};

export const fetchRoleData = () => {
    // return request({
    //     url: './mock/role.json',
    //     method: 'get'
    // });
};
