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
        <el-button type="primary" @click="onSubmit">保存角色</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, reactive, onMounted } from 'vue';
import { ElTree } from 'element-plus';
import { fetchRoles } from '@/api/roleAPI';
import { saveUserRole } from '@/api/userAPI';
import EventBus from '@/eventBus';

const props = defineProps({
    roleOptions: {
        type: Object,
        required: true,
    },
});

const query = reactive({
    
});

const data = ref([]);

let userId;

// 初始化 checkedKeys
const checkedKeys = ref<string[]>([]);

// 监听权限数据变化，并手动设置选中节点
watch(() => props.roleOptions.role, (newVal) => {
    console.log(props.roleOptions.role);
    
    userId = props.roleOptions.id;
    
    checkedKeys.value = newVal.map(item => item.id);
    nextTick(() => {
        tree.value?.setCheckedKeys(checkedKeys.value);
    });
}, { immediate: true });

// 获取权限数据并更新树形结构
const getData = async () => {
    try {
        const res = await fetchRoles(1, 0, query); // 获取数据

        // 合并菜单数据与获取的权限数据
        const treeData = res.data.data.list.map(perm => ({
            id: perm.id,
            label: perm.roleName, 
        }));

        data.value = treeData; // 更新树形数据
    } catch (error) {
        console.error('Failed to fetch roles:', error);
    }
};

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = async () => {
    const keys = [...tree.value!.getCheckedKeys(false), ...tree.value!.getHalfCheckedKeys()] as number[];
    console.log(keys);
    
    await saveUserRole(userId, keys);
    EventBus.emit('close-modal');
};

// 在组件挂载时获取数据
onMounted(() => {
    getData();
});

</script>

<style scoped></style>
