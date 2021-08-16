<template>
    <div class="wrap">
        <img src="../assets/img/back.jpg" alt="">
        <div class="form">
            <img src="../assets/img/touxiang.jpg" alt="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="username" label="用户名" class="form-item">
                    <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username" class="inp"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" class="form-item">
                    <el-input prefix-icon="el-icon-s-tools" type="password" v-model="ruleForm.password" class="inp">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 12,
                            message: '长度在 3 到 12 个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const {
                            data: ret
                        } = await this.$http.post('login', this.ruleForm)
                        if (ret.meta.status == 400) {
                            this.$message({
                                type: 'error',
                                message: '用户不存在'
                            })
                        } else {
                            this.$message({
                                type: 'success',
                                message: '登录成功'
                            })
                            window.sessionStorage.setItem('token',ret.data.token)
                            this.$router.push('/home')
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>
<style lang="less" scoped>
    .wrap {
        width: 100%;
        height: 600px;
        overflow: hidden;

        img {
            width: 100%;
            height: 90%;
            position: absolute;
        }

        .form {
            z-index: 5;
            position: relative;
            left: 50%;
            top: 50%;
            width: 600px;
            height: 400px;
            transform: translate(-50%, -50%);
            background: beige;

            img {
                display: block;
                width: 100px;
                height: 100px;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translate(-50%, -50%);
                border-radius: 50%;
            }

            .el-form {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 100%;
                height: 70%;
                transform: translate(-50%, -50%);

                .form-item {
                    margin-top: 40px;
                }

                .inp {
                    height: 40px;
                    margin: 10px;
                    width: 80%;
                }
            }
        }
    }
</style>