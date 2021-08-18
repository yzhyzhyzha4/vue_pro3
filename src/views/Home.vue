<template>
    <div class="wrap">
        <header>
            <div class="header-left">
                <img src="../assets/img/header.jpg" alt="">
                <span class="header-showtime">{{time}}</span>
                <span class="header-title">后台管理系统</span>
            </div>
            <el-button class="header-button" type="success" @click="tuichu">退出登录</el-button>
        </header>
        <div class="body">
            <div class="body-left">
                <left></left>
            </div>
            <div class="body-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import left from '../compoments/leftmenue.vue'
    import bo from './user.vue'
    export default {
        components: {
            left,
            bo
        },
        data() {
            return {
                time: null
            }
        },
        mounted() {
            var t = null;
            let that = this;
            let dt;
            t = setTimeout(time, 1000); //開始运行
            function time() {
                clearTimeout(t); //清除定时器
                dt = new Date();
                var y = dt.getFullYear();
                var mt = dt.getMonth() + 1;
                var day = dt.getDate();
                var h = dt.getHours(); //获取时
                var m = dt.getMinutes(); //获取分
                var s = dt.getSeconds(); //获取秒
                that.time = "当前时间：" +
                    y +
                    "年" +
                    mt +
                    "月" +
                    day +
                    "-" +
                    h +
                    "时" +
                    m +
                    "分" +
                    s +
                    "秒";
                t = setTimeout(time, 1000); //设定定时器，循环运行
            }
        },
        methods: {
            tuichu() {
                window.sessionStorage.removeItem('token')
                this.$router.push('/login')
            }
        },
    }
</script>
<style lang="less" scoped>
    .wrap {
        width: 100%;
        height: 100%;
    }

    header {
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #3366FF;
        align-items: center;

        .header-left {
            display: flex;
            align-items: center;
            height: 100%;
            width: 60%;
            justify-content: space-around;

            img {
                height: 70px;
                width: 70px;
                border-radius: 50%;
            }

            .header-title {
                font-size: 30px;
                color: white;
            }

            .header-showtime {
                font-size: 20px;
            }
        }

        .header-button {
            height: 60%;
        }
    }

    .body {
        width: 100%;
        height: 700px;
        display: flex;

        .body-left {
            // flex: 1.5;
            width: 15%;
            height: 700px;
            position: relative;
        }

        .body-main {
            // flex: 8.5;
            height: 700px;
            position: relative;
            width: 85%;
        }
    }
</style>