<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :changePage="changePage" :editFunc="handleEdit" :currentPage="page.index">
                <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
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
import { ref, reactive, onMounted } from 'vue';
import { Score } from '@/types/score';
import { fetchScores, addScore, deleteScore, fetchCompetitionNames } from '@/api/competitionScoreAPI';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import { CirclePlusFilled } from '@element-plus/icons-vue';

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
    { prop: 'registerName', label: '参赛者姓名' },
    { prop: 'competitionName', label: '比赛名称' },
    { prop: 'competitionScore', label: '比赛成绩' },
    { prop: 'competitionRank', label: '比赛排名' },
    { prop: 'scoreStatus', label: '成绩状态' },
    { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
    index: 1,
    size: 10,
    total: 0,
})
const tableData = ref<Score[]>([]);
const getData = async () => {
    const res = await fetchScores(page.index, page.size, query);
    
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
        { type: 'input', label: '参赛者姓名', prop: 'registerName', required: true },
        {
            type: 'select',
            label: '比赛名称',
            prop: 'competitionName',
            required: true,
            opts: []
        },
        { type: 'input', label: '比赛成绩', prop: 'competitionScore', required: true },
        { type: 'input', label: '比赛排名', prop: 'competitionRank', required: true },
    ]
})

onMounted(async () => {
  const competitionNames = await fetchCompetitionNames();
  // 填充 opts 列表
  options.value.list.find(item => item.prop === 'competitionName').opts = competitionNames.data.data;
});

const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Score) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = async (row: Score) => {
    await addScore(row);
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
const handleView = (row: Score) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: 'ID',
        },
        {
            prop: 'registerName',
            label: '参赛者姓名',
        },
        {
            prop: 'competitionName',
            label: '比赛名称',
        },
        {
            prop: 'auditStatus',
            label: '审核状态',
        }
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Score) => {
    await deleteScore(row);
    getData();
}
</script>

<style scoped>
</style>