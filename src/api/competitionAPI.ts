import api from '@/api/api';
import { Competition } from '@/types/competition';
import moment from 'moment';

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

export const addCompetition = async (competition: Competition) => {
    try {
        const response = await api.post('/competition/add', {
            competitionName: competition.competitionName,
            competitionDate: moment(competition.competitionDate).format('YYYY-MM-DD'),
            competitionLocation: competition.competitionLocation,
            competitionPersonNumber: competition.competitionPersonNumber,
            competitionDescription: competition.competitionDescription
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log('新增比赛信息失败:', error);
    }
};