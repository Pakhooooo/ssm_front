<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
            :delFunc="handleDelete" :changePage="changePage" :editFunc="handleEdit" :currentPage="page.index">
                <template #toolbarBtn>
                    <el-button v-permission="{ role: 'ADMIN', permission: 'competition:add' }" type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template>
            </TableCustom>

        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
        </el-dialog>
        <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="viewData"></TableDetail>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive } from 'vue';
import { Competition } from '@/types/competition';
import { fetchCompetitions, addCompetition, deleteCompetition } from '@/api/competitionAPI';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import permission from '@/store/permission';

// 查询相关
const query = reactive({
    competitionName: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '比赛名称：', prop: 'competitionName' }
])
const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'competitionName', label: '比赛名称' },
    { prop: 'competitionDate', label: '比赛日期', width: 180 },
    { prop: 'competitionLocation', label: '比赛地点' },
    { prop: 'competitionPersonNumber', label: '参赛人数', width: 150 },
    { prop: 'operator', label: '操作', width: 250 },
    { prop: 'registration', label: '报名', width: 100, align: 'center' }
])
const page = reactive({
    index: 1,
    size: 10,
    total: 0,
})
const tableData = ref<Competition[]>([]);
const getData = async () => {
    const res = await fetchCompetitions(page.index, page.size, query);
    
    tableData.value = res.data.data.list;
    page.total = res.data.data.total;
};
getData();

const changePage = (val: number) => {
    page.index = val;
    getData();
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '300px',
    span: 30,
    list: [
        { type: 'input', label: '比赛名称', prop: 'competitionName', required: true },
        { type: 'date', label: '比赛时间', prop: 'competitionDate', required: true },
        { type: 'input', label: '比赛地点', prop: 'competitionLocation', required: true },
        { type: 'number', label: '比赛人数', prop: 'competitionPersonNumber', required: true },
        { type: 'textarea', label: '比赛描述', prop: 'competitionDescription', required: true },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Competition) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = async (row: Competition) => {
    await addCompetition(row);
    closeDialog();
    getData();
};

const closeDialog = () => {
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: []
});
const handleView = (row: Competition) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: 'ID',
        },
        {
            prop: 'competitionName',
            label: '比赛名称',
        },
        {
            prop: 'competitionDate',
            label: '比赛时间',
        },
        {
            prop: 'competitionLocation',
            label: '比赛地点',
        },
        {
            prop: 'competitionPersonNumber',
            label: '比赛人数',
        },
        {
            prop: 'competitionDescription',
            label: '比赛描述',
        }
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Competition) => {
    await deleteCompetition(row);
    getData();
}
</script>

<style scoped></style>