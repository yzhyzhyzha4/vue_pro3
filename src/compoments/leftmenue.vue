<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" unique-opened :collapse="iscollapse" :collapse-transition="false" router
                :default-active="activerouter">
                <div class="menue-header" @click="change">|||</div>
                <el-submenu :index="item.id+''" v-for="(item) in menus" :key="item.id">
                    <template slot="title">
                        <i :class="font[item.id]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="'/'+item1.path"
                        @click="savepath('/'+item1.path)">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>

</template>
<script>
    export default {
        data() {
            return {
                menus: [],
                font: {
                    '125': 'iconfont icon-user',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-3702mima',
                    '102': 'iconfont icon-baobiao',
                    '145': 'iconfont icon-lock_fill'
                },
                iscollapse: false,
                activerouter: '/user'
            }
        },
        created() {
            this.getmenus()
            this.activerouter = window.sessionStorage.getItem('path')
        },
        methods: {
            async getmenus() {
                const {
                    data: ret
                } = await this.$http.get('menus')
                // console.log(ret);
                if (ret.meta.status != 200) {
                    return this.$message({
                        type: 'error',
                        message: '获取菜单失败'
                    })
                }
                this.menus = ret.data;
            },
            change() {
                this.iscollapse = !this.iscollapse
            },
            savepath(path) {
                window.sessionStorage.setItem('path', path)
            }
        },

    }
</script>
<style lang="less" scoped>
    .tac {
        width: 100%;
    }

    .menue-header {
        letter-spacing: .0625rem;
        text-align: center;
        height: 40px;
        line-height: 40px;
        color: white;
        font-size: 20px;
        font-weight: 900;
        margin-top: 0;
        cursor: pointer;
    }

    .el-menu {
        border-right: none;
        overflow: hidden;
        height: 700px;
    }

    .iconfont {
        margin-right: 10px;
    }
</style>