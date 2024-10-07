import api from '@/api/api';
import { Competition } from '@/types/competition';
import moment from 'moment';
import { ElMessage } from 'element-plus';

export const fetchCompetitions = async (pageNum: number, pageSize: number, query: Record<string, any>) => {
    try {
        const response = api.post('/competitions', {
            pageNum: pageNum,
            pageSize: pageSize,
            ...query,
        });
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const addCompetition = async (competition: Competition) => {
    try {
        if (competition.id != null) {
            const response = await api.put('/competition/edit', {
                id: competition.id,
                competitionName: competition.competitionName,
                competitionDate: moment(competition.competitionDate).format('YYYY-MM-DD'),
                competitionLocation: competition.competitionLocation,
                competitionPersonNumber: competition.competitionPersonNumber,
                competitionDescription: competition.competitionDescription
            });
            ElMessage.success(response.data.message);
        } else {
            const response = await api.post('/competition/add', {
                competitionName: competition.competitionName,
                competitionDate: moment(competition.competitionDate).format('YYYY-MM-DD'),
                competitionLocation: competition.competitionLocation,
                competitionPersonNumber: competition.competitionPersonNumber,
                competitionDescription: competition.competitionDescription
            });
            ElMessage.success(response.data.message);
        }
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const deleteCompetition = async (competition: Competition) => {
    try {
        const response = await api.delete('/competition/' + competition.id);
        ElMessage.success(response.data.message);
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};