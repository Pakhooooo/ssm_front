import api from '@/api/api';

export const logout = async () => {
    try {
        const response = await api.post('/user/logout', {});
        console.log(response);
        return response;
    } catch (error) {
        console.log('用户登出失败:', error);
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
    }
};

export const fetchRoleData = () => {
    // return request({
    //     url: './mock/role.json',
    //     method: 'get'
    // });
};
