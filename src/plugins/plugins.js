import Vue from 'vue'
import ele from 'element-ui'
import axios from 'axios'
import '../assets/fonts/demo.css'
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
Vue.prototype.$http = axios;
Vue.use(ele)