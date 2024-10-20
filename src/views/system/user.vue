<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :changePage="changePage" :editFunc="handleEdit" :currentPage="page.index">
                <!-- <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template> -->
                <template #roles="{ rows }">
                    <el-button type="primary" size="small" plain @click="handleRole(rows)">管理</el-button>
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
        <el-dialog title="角色管理" v-model="visible2" width="500px" destroy-on-close>
            <UserRole :role-options="roleOptions" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive } from 'vue';
import { User } from '@/types/user';
import { fetchUsers, updateUser, deleteUser } from '@/api/userAPI';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import UserRole from './user-role.vue'
import EventBus from '@/eventBus';

// 查询相关
const query = reactive({
    username: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '用户名：', prop: 'username' }
])
const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'username', label: '用户名' },
    { prop: 'phone', label: '手机号' },
    { prop: 'realName', label: '真实姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'sex', label: '性别' },
    { prop: 'roles', label: '角色管理' },
    { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
    index: 1,
    size: 10,
    total: 0,
})
const tableData = ref<User[]>([]);
const getData = async () => {
    const res = await fetchUsers(page.index, page.size, query);
    
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
    labelWidth: '100px',
    span: 12,
    list: [
        { type: 'input', disabled: true, label: '用户名', prop: 'username'},
        { type: 'input', label: '手机号', prop: 'phone', required: true },
        { type: 'input', label: '真实姓名', prop: 'realName', required: true },
        { type: 'number', label: '年龄', prop: 'age', required: true },
        {
            type: 'select',
            label: '性别',
            prop: 'sex',
            required: true,
            opts: [
                { label: '男', value: '男' },
                { label: '女', value: '女' },
            ]
        },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: User) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = async (row: User) => {
    await updateUser(row);
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
const handleView = (row: User) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'userId',
            label: '用户ID',
        },
        {
            prop: 'username',
            label: '用户名',
        },
        {
            prop: 'realName',
            label: '真实姓名',
        },
        {
            prop: 'age',
            label: '年龄',
        },
        {
            prop: 'sex',
            label: '性别',
        }
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = async (row: User) => {
    await deleteUser(row);
    getData();
}

const visible2 = ref(false);
const roleOptions = ref({})
const handleRole = (row: User) => {
    visible2.value = true;
    roleOptions.value = {
        id: row.userId,
        role: row.roles
    };
}

EventBus.on('close-modal', async () => {
    const res = await fetchUsers(page.index, page.size, query);
    tableData.value = res.data.data.list;
    visible2.value = false;
});

</script>

<style scoped></style>