import api from '@/api/api';
import { Score } from '@/types/score';
import { ElMessage } from 'element-plus';

export const fetchScores = async (pageNum: number, pageSize: number, query: Record<string, any>) => {
    try {
        const response = api.post('/scores', {
            pageNum: pageNum,
            pageSize: pageSize,
            ...query,
        });
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const addScore = async (score: Score) => {
    try {
        if (score.id != null) {
            const response = await api.put('/score/edit', {
                id: score.id,
                competitionScore: score.competitionScore,
                competitionRank: score.competitionRank
            });
            ElMessage.success(response.data.message);
        } else {
            const response = await api.post('/score/add', {
                registerName: score.registerName,
                competitionId: score.competitionName,
                competitionScore: score.competitionScore,
                competitionRank: score.competitionRank
            });
            ElMessage.success(response.data.message);
        }
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const deleteScore = async (score: Score) => {
    try {
        const response = await api.delete('/score/' + score.id);
        ElMessage.success(response.data.message);
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const fetchCompetitionNames = async () => {
    const response = await api.get('/register/competition/names');
    return response;
}