import api from '@/api/api';

export const fetchCompetitions = async (pageNum: number, pageSize: number) => {
    try {
        const response = await api.post('/competitions', {
            pageNum: pageNum,
            pageSize: pageSize,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log('获取比赛信息列表失败:', error);
    }
};

