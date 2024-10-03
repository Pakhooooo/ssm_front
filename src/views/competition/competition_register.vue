<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :page-change="changePage" :editFunc="handleEdit">
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
import { ref, reactive } from 'vue';
import { Register } from '@/types/register';
import { fetchRegisters, addRegister, deleteRegister } from '@/api/competitionRegisterAPI';
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
    { prop: 'auditStatus', label: '审核状态' },
    { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
    index: 1,
    size: 10,
    total: 0,
})
const tableData = ref<Register[]>([]);
const getData = async () => {
    const res = await fetchRegisters(page.index, page.size, query);
    
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
            opts: [
                { label: '比赛 A', value: 'competitionA' },
                { label: '比赛 B', value: 'competitionB' },
                { label: '比赛 C', value: 'competitionC' }
            ]
        },
        { type: 'input', disabled: true, label: '审核状态', prop: 'auditStatus' },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Register) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = async (row: Register) => {
    await addRegister(row);
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
const handleView = (row: Register) => {
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
const handleDelete = async (row: Register) => {
    await deleteRegister(row);
    getData();
}
</script>

<style scoped>
</style>