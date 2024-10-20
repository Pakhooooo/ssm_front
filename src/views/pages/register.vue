<template>
    <div class="login-bg">
        <div class="login-container">
            <div class="login-header">
                <img class="logo mr10" src="../../assets/img/logo.svg" alt="" />
                <div class="login-title">校运会信息管理系统</div>
            </div>
            <el-form :model="param" :rules="rules" ref="register" size="large">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model.number="param.phone" placeholder="手机号码">
                        <template #prepend>
                            <el-icon>
                                <Cellphone />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="realName">
                    <el-input v-model="param.realName" placeholder="真实姓名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="age">
                    <el-input v-model.number="param.age" placeholder="年龄">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="sex">
                    <el-radio-group v-model="param.sex">
                        <el-radio value="男">男</el-radio>
                        <el-radio value="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter="submitForm(register)"
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button class="login-btn" type="primary" size="large" @click="submitForm(register)">注册</el-button>
                <p class="login-text">
                    已有账号，<el-link type="primary" @click="$router.push('/login')">立即登录</el-link>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { Register } from '@/types/user';
import api from '@/api/api';

const router = useRouter();
const param = reactive<Register>({
    username: '',
    password: '',
    phone: '',
    realName: '',
    sex: '男',
    age: ''
});

const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
        {
            pattern: /^[a-z0-9]+$/, message: '用户名只能包含小写英文字母和数字', trigger: 'blur'
        },
        { min: 3, max: 20, message: '用户名长度必须在3到20个字符之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]+$/, message: '密码只能包含字母、数字和特殊符号', trigger: 'blur' }, // 密码规则
        { min: 6, message: '密码至少为6个字符', trigger: 'blur' },
        { max: 20, message: '密码最多为20个字符', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
    ],
    realName: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' },
        { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '真实姓名只能包含中文或英文字母', trigger: 'blur' }
    ],
    age: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入年龄'));
                } else if (!Number.isInteger(value)) {
                    callback(new Error('年龄必须是整数'));
                } else if (value < 16 || value > 99) {
                    callback(new Error('年龄必须在16岁到99岁之间'));
                } else {
                    callback(); // 验证通过
                }
            },
            trigger: 'blur'
        }
    ],
};
const register = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            try {
                // 调用后端登录接口
                const response = await api.post('/auth/user/register', {
                    username: param.username,
                    password: param.password,
                    realName: param.realName,
                    phone: param.phone,
                    sex: param.sex,
                    age: param.age
                });
                
                ElMessage.success(response.data.message);

                // 跳转到主页
                await router.push('/login');
            } catch (error) {
                ElMessage.error(error.response.data.message);
            }
        } else {
            ElMessage.error('注册失败');
        }
    });
};
</script>

<style scoped>
.login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(../../assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.logo {
    width: 35px;
}

.login-title {
    font-size: 22px;
    color: #333;
    font-weight: bold;
}

.login-container {
    width: 450px;
    border-radius: 5px;
    background: #fff;
    padding: 40px 50px 50px;
    box-sizing: border-box;
}

.login-btn {
    display: block;
    width: 100%;
}

.login-text {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
}
</style>
