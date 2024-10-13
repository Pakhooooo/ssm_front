<template>
    <div>
        <el-tree
            class="mgb10"
            ref="tree"
            :data="data"
            node-key="id"
            default-expand-all
            show-checkbox
            check-strictly
        />
        <el-button type="primary" @click="onSubmit">保存权限</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, reactive, onMounted } from 'vue';
import { ElTree } from 'element-plus';
import { menuData } from '@/components/menu';
import { fetchPermissions } from '@/api/permissionAPI';
import { saveRolePermission } from '@/api/roleAPI';
import EventBus from '@/eventBus';

const props = defineProps({
    permissOptions: {
        type: Object,
        required: true,
    },
});

const query = reactive({
    permissionType: 'API',
});

const data = ref([]);
const menuObj = ref({});

// 构建树数据
const getTreeData = (data) => {
    return data.map((item) => {
        const obj: any = {
            id: item.id,
            label: item.title,
        };
        if (item.children) {
            menuObj.value[item.id] = item.children.map((sub) => sub.id);
            obj.children = getTreeData(item.children);
        }
        return obj;
    });
};

let roleId;

// 初始化 checkedKeys
const checkedKeys = ref<string[]>([]);

// 监听权限数据变化，并手动设置选中节点
watch(() => props.permissOptions.permiss, (newVal) => {
    roleId = props.permissOptions.id;
    checkedKeys.value = newVal.map(item => item.id);
    nextTick(() => {
        tree.value?.setCheckedKeys(checkedKeys.value);
    });
}, { immediate: true });

// 获取权限数据并更新树形结构
const getData = async () => {
    try {
        const res = await fetchPermissions(1, 0, query); // 获取数据
        const fetchedPermissions = res.data.data.list;

        const formattedPermissions = fetchedPermissions.map(perm => ({
            id: perm.id,
            permission: perm.permissionName
        }));

        // 合并菜单数据与获取的权限数据
        const treeData = [...getTreeData(menuData), ...formattedPermissions.map(perm => ({
            id: perm.id,
            label: perm.permission, // 权限数据格式化
        }))];
        
        data.value = treeData; // 更新树形数据
    } catch (error) {
        console.error('Failed to fetch permissions:', error);
    }
};

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = async () => {
    const keys = [...tree.value!.getCheckedKeys(false), ...tree.value!.getHalfCheckedKeys()] as number[];
    console.log(keys); // 保存权限时获取选中的 keys
    
    await saveRolePermission(roleId, keys);
    EventBus.emit('close-modal');
};

// 在组件挂载时获取数据
onMounted(() => {
    getData();
});

</script>

<style scoped></style>
