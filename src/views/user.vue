<template>
    <div class="wrap">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="always">
            <el-row>
                <el-input clearable @clear="getuserdata()" v-model="userdata.query" placeholder="请输入内容"
                    class="input-with-select">
                    <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button style="margin-left:30px;" type="primary" @click="dialogVisible=true">添加用户</el-button>
            </el-row>
            <el-table stripe v-if="userlist.length>0" :data="userlist" style="width: 100%">
                <el-table-column type='index' align='center' width="60"></el-table-column>
                <el-table-column align='center' prop="username" label="用户姓名" width="200"></el-table-column>
                <el-table-column align='center' prop="mobile" label="电话号码" width="200"></el-table-column>
                <el-table-column align='center' prop="email" label="邮箱" width="200"></el-table-column>
                <el-table-column align='center' prop="role_name" label="角色" width="200"></el-table-column>
                <el-table-column align='center' prop="mg_state" label="状态" width="200">
                    <template v-slot="scope">
                        <!-- {{scope.row}} -->
                        <el-switch @change="changestate(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column align='center' label="操作" width="300">
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-end" :enterable='false'>
                            <el-button @click="getedituser(scope.row.id)" type="primary" icon="el-icon-edit">
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top-end" :enterable='false'>
                            <el-button type="info" icon="el-icon-message" circle></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-end" :enterable='false'>
                            <el-button @click="deleteuser(scope.row.id)" type="danger" icon="el-icon-delete">
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.userdata.pagenum" :page-sizes="[2, 4, 6, 10]" :page-size="this.userdata.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </el-card>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户信息" :visible.sync="dialogVisible" width="50%">
            <el-form class="adduser" :model="adduser" status-icon :rules="rules" ref="adduser" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input type="" v-model="adduser.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="adduser.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="adduser.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model.number="adduser.mobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('adduser')">提交</el-button>
                    <el-button @click="resetForm('adduser')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑用户对话框 -->
        <el-dialog title="编辑用户信息" :visible.sync="editdialogVisible" width="30%" center>
            <el-form :model="edituser" status-icon :rules="edituserrules" ref="edituser" label-width="100px">
                <el-form-item label="用户名">
                    <el-input disabled type="" v-model="edituser.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="edituser.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model.number="edituser.mobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editsubmitForm('edituser')">提交</el-button>
                    <el-button @click="editresetForm('edituser')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            // 自定义校验规则
            var validatePass = (rule, value, cb) => {
                let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (reg.test(value)) {
                    cb()
                } else {
                    cb(new Error('手机号码格式不正确'))
                }
            };
            return {
                //获取用户数据时发起的请求参数
                userdata: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                //获取的用户数据
                userlist: [],
                // 页面总数
                total: 0,
                // 添加用户对话框是否可见
                dialogVisible: false,
                //编辑用户对话框是否可见
                editdialogVisible: false,
                //添加的用户数据
                adduser: {
                    username: 'aaa',
                    password: '',
                    email: '',
                    mobile: ''
                },
                //编辑用户的数据
                edituser: {},
                //添加用户数据校验规则
                rules: {
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 10,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 13,
                            message: '长度在 3 到 13 个字符',
                            trigger: 'blur'
                        }
                    ],
                    email: [{
                        type: 'email',
                        required: true,
                        message: '邮箱格式不对',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }]
                },
                //编辑用户数据校验规则
                edituserrules: {
                    email: [{
                        type: 'email',
                        required: true,
                        message: '邮箱格式不对',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }]
                },
            }
        },
        created() {
            this.getuserdata();
        },
        mounted() {
            this.getuserdata();
        },
        methods: {
            // 获取用户数据
            async getuserdata() {
                const {
                    data: ret
                } = await this.$http.get('users', {
                    params: this.userdata
                })
                if (ret.meta.status !== 200) {
                    return this.$message({
                        type: 'error',
                        message: '获取用户数据失败'
                    })
                }
                this.userlist = ret.data.users
                this.total = ret.data.total
            },
            handleSizeChange(pagesize) {
                this.userdata.pagesize = pagesize;
                this.getuserdata()
            },
            handleCurrentChange(pagenum) {
                this.userdata.pagenum = pagenum
                this.getuserdata()
            },
            //改变用户状态
            async changestate(user) {
                const ret = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
                if (ret.status != 200) {
                    this.$message.error('更新状态失败')
                    return user.mg_state = !user.mg_state
                }
                this.$message({
                    message: '状态更新成功',
                    type: 'success'
                });
            },
            //添加用户数据
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const {
                            data: ret
                        } = await this.$http.post('users', this.adduser)
                        // console.log(ret);
                        this.dialogVisible = false
                        if (ret.meta.status != 201) {
                            return this.$message.error('用户添加失败')
                        }
                        this.getuserdata()
                        this.$refs['adduser'].resetFields();
                        return this.$message({
                            type: 'success',
                            message: '用户添加成功'
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            search() {
                this.getuserdata()
            },
            //根据id获取用户数据
            async getedituser(id) {
                this.editdialogVisible = true
                const {
                    data: ret
                } = await this.$http.get('users/' + id)
                console.log(ret);
                if (ret.meta.status !== 200) {
                    return this.$message.erro('获取编辑的用户数据失败')
                }
                this.edituser = ret.data
                return this.$message({
                    type: 'success',
                    message: '获取编辑的用户数据成功'
                })
            },
            //提交修改后的用户信息
            editsubmitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const {
                            data: ret
                        } = await this.$http.put('users/' + this.edituser.id, this.edituser)
                        // console.log(ret);
                        this.editdialogVisible = false
                        if (ret.meta.status != 200) {
                            return this.$message.error('编辑用户数据失败')
                        }
                        return this.$message({
                            type: 'success',
                            message: '编辑数据成功'
                        })
                    } else {
                        return false;
                    }
                });
            },
            editresetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //删除用户
            async deleteuser(id) {
                const me=await this.$confirm('此操作将永久删除改用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                if(me=='confirm'){
                    const {data:ret}=await this.$http.delete('users/'+id)
                    if(ret.meta.status!=200){
                        return this.$message.error('删除失败')
                    }
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.getuserdata()
                }
            }
        },
    }
</script>
<style lang="less" scoped>
    .el-breadcrumb {
        font-size: 30px !important;
    }

    .el-input {
        width: 50%;
    }

    .el-card {
        margin-top: 30px;
    }

    .hidden-columns {
        display: block;
        position: relative;
        z-index: 3 !important;
    }

    .el-pagination {
        margin-top: 20px;
    }

    .adduser {
        .el-form-item {
            margin-top: 40px;
        }

        .el-input {
            width: 400px;
        }
    }
</style>