import api from '@/api/api';

export const fetchData = () => {
    // return request({
    //     url: './mock/table.json',
    //     method: 'get'
    // });
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
