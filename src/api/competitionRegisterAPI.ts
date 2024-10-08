import api from '@/api/api';
import { Register } from '@/types/register';
import { ElMessage } from 'element-plus';

export const fetchRegisters = async (pageNum: number, pageSize: number, query: Record<string, any>) => {
    try {
        const response = api.post('/registers', {
            pageNum: pageNum,
            pageSize: pageSize,
            ...query,
        });
        return response;
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const addRegister = async (register: Register) => {
    try {
        if (register.id != null) {
            const response = await api.put('/register/update', {
                id: register.id,
                competitionId: register.competitionName
            });
            ElMessage.success(response.data.message);
        } else {
            const response = await api.post('/register/add', {
                registerName: register.registerName,
                competitionId: register.competitionName
            });
            ElMessage.success(response.data.message);
        }
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const deleteRegister = async (register: Register) => {
    try {
        const response = await api.delete('/register/' + register.id);
        ElMessage.success(response.data.message);
    } catch (error) {
        ElMessage.error(error.response.data.message);
    }
};

export const fetchCompetitionNames = async () => {
    const response = await api.get('/register/competition/names');
    return response;
}