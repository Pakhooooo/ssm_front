<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">

            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :changePage="changePage" :editFunc="handleEdit" :currentPage="page.index">
                <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template>
                <template #status="{ rows }">
                    <el-tag type="success" v-if="rows.status">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
                <template #permissions="{ rows }">
                    <el-button type="primary" size="small" plain @click="handlePermission(rows)">管理</el-button>
                </template>
            </TableCustom>
        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
        </el-dialog>
        <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="viewData">
                <template #status="{ rows }">
                    <el-tag type="success" v-if="rows.status">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
            </TableDetail>
        </el-dialog>
        <el-dialog title="权限管理" v-model="visible2" width="500px" destroy-on-close>
            <RolePermission :permiss-options="permissOptions" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-role">
import { ref, reactive } from 'vue';
import { Role } from '@/types/role';
import { fetchPermissions, addPermission, deletePermission } from '@/api/permissionAPI';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import RolePermission from './role-permission.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import { Permission } from '@/types/permission';

// 查询相关
const query = reactive({
    permissionName: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '权限名称：', prop: 'permissionName' }
])
const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'permissionName', label: '权限名称' },
    { prop: 'permissionKey', label: '权限标识' },
    { prop: 'permissionType', label: '权限类型' },
    { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
    index: 1,
    size: 10,
    total: 0,
})
const tableData = ref<Permission[]>([]);
const getData = async () => {
    const res = await fetchPermissions(page.index, page.size, query)
    tableData.value = res.data.data.list;
    page.total = res.data.data.total;
};
getData();
const changePage = (val: number) => {
    page.index = val;
    getData();
};

// 新增/编辑弹窗相关
const options = ref<FormOption>({
    labelWidth: '100px',
    span: 24,
    list: [
        { type: 'input', label: '权限名称', prop: 'permissionName', required: true },
        { type: 'input', label: '权限标识', prop: 'permissionKey', required: true },
        // { type: 'number', label: '父权限ID', prop: 'parentId' },
        {
            type: 'select',
            label: '权限类型',
            prop: 'permissionType',
            required: true,
            opts: [
                { label: 'MENU', value: 'MENU' },
                { label: 'BUTTON', value: 'BUTTON' },
                { label: 'API', value: 'API' },
            ]
        },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Permission) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = async (row: Permission) => {
    await addPermission(row);
    closeDialog();
    getData();
};
const closeDialog = () => {
    visible.value = false;
    isEdit.value = false;
    rowData.value = {};
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: [],
    column: 1
});
const handleView = (row: Permission) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: '权限ID',
        },
        {
            prop: 'permissionName',
            label: '权限名称',
        },
        {
            prop: 'permissionKey',
            label: '权限标识',
        },
        {
            prop: 'permissionType',
            label: '权限类型',
        },
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Permission) => {
    await deletePermission(row);
    getData();
}


// 权限管理弹窗相关
const visible2 = ref(false);
const permissOptions = ref({})
const handlePermission = (row: Role) => {
    visible2.value = true;
    permissOptions.value = {
        id: row.id,
        permiss: row.permiss
    };
}
</script>

<style scoped></style>