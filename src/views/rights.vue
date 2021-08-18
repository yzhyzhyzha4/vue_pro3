<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
        </el-card>
        <div class="wrap">
            <el-table v-if="rightslist.length>0" :data="rightslist" style="width: 100%">
                <el-table-column type='index' align='center' width="60">
                </el-table-column>
                <!-- <el-table-column label="权限名称" prop="authName">
                </el-table-column>
                <el-table-column label="路径" prop="path">
                </el-table-column>
                <el-table-column label="权限等级" prop="level">
                </el-table-column> -->
                <el-table-column align='center' prop="path" label="创建时间" width="250">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.path }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                rightslist: []
            }
        },
        mounted() {
            this.getdata()
        },
        methods: {
            async getdata() {
                const {
                    data: ret
                } = await this.$http.get('rights/list')
                console.log(ret);
                if (ret.meta.status != 200) {
                    this.$message({
                        type: 'error',
                        message: '获取权限列表失败'
                    })
                }
                this.rightslist = ret.data
            }
        },
    }
</script>
<style lang="less" scoped>
    .wrap {
        position: absolute;
        right: 0;
        width: 100%;
        height: 43%;
        top: 70px;
        background-size: 100% 100%;
        overflow: scroll;
    }
</style>