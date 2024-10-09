import api from '@/api/api';
import { ElMessage } from 'element-plus';

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
