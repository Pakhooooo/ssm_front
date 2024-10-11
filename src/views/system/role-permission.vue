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
import { ref, onMounted, nextTick, watch } from 'vue';
import { ElTree } from 'element-plus';
import { menuData } from '@/components/menu';

const props = defineProps({
    permissOptions: {
        type: Object,
        required: true,
    },
});

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

// 初始化树数据
const data = getTreeData(menuData);

// 初始化 checkedKeys
const checkedKeys = ref<string[]>([]);

// 监听权限数据变化，并手动设置选中节点
watch(() => props.permissOptions.permiss, (newVal) => {
    checkedKeys.value = newVal.map(item => item.id);
    nextTick(() => {
        tree.value?.setCheckedKeys(checkedKeys.value);
    });
}, { immediate: true });

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = () => {
    const keys = [...tree.value!.getCheckedKeys(false), ...tree.value!.getHalfCheckedKeys()] as number[];
    console.log(keys); // 保存权限时获取选中的 keys
};
</script>

<style scoped></style>
