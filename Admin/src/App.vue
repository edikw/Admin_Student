<template>
  <div id="app" class="main">
    <div class="logout" v-if="$route.name!='Login'"
    >
      <router-link to="/" v-on:click.native="logout()" replace><img src="./assets/logo/logout.png"></router-link>
    </div>

    <div class="nav" v-if="$route.name!='Login'">
      <img src="./assets/logo/menu.png" id="doesLogo">
      <ul id="menu">
        <router-link to="/dashboard"><li><img src="./assets/logo/dashboard_grey.png" id="dashboard-img"><span>Dashboard</span></li></router-link>
        <router-link to="/edit"><li><img src="./assets/logo/student_grey_1.png" id="student-img"><span>Students</span></li></router-link>
        <router-link to="/ourworks"><li><img src="./assets/logo/ourwork_grey_1.png" id="work-img"><span>Our Works</span></li></router-link>
      </ul>
    </div>

    <div class="view">
      <router-view/>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import router from './router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

// const baseurl = 'http://192.168.2.231:8088/'
// const baseurl = 'http://192.168.2.231:8181/'
const basebox = 'https://student-does.herokuapp.com/v1/studentbox'
const baseurl = 'https://student-does.herokuapp.com/'

  export default {
    name: 'App',
    data() {
      return {
        url: {

          base: baseurl,

          post_file: basebox,

          about_get: baseurl + 'v1/about',
          about_update_Img: baseurl + 'v1/about/updatefile/1',
          about_update: baseurl + 'v1/about/update/',
          about_post_img: basebox,
          
          founder_get: baseurl + 'v1/founder',
          founder_post_Img: baseurl + 'v1/founder/updatefile/1',
          founder_update: baseurl + 'v1/founder/update/',

          skill_get: baseurl + 'v1/skill',
          skill_post: baseurl + 'v1/skill/create',
          skill_update: baseurl + 'v1/skill/update/',
          skill_delete: baseurl + 'v1/skill/delete/',
          skill_get_id: baseurl + 'v1/skill/',

          character_get: baseurl + 'v1/character',
          character_post: baseurl + 'v1/character/create',
          character_update: baseurl + 'v1/character/update/',
          character_delete: baseurl + 'v1/character/delete/',
          character_get_id: baseurl + 'v1/character/',

          student_get: baseurl + 'v1/student',
          student_get_id: baseurl + 'v1/student/',
          student_post: baseurl + 'v1/student/create',
          student_post_img: baseurl + 'v1/student/postfile',
          student_update_img: baseurl + 'v1/student/updatefile/',
          student_update: baseurl + 'v1/student/update/',
          student_delete: baseurl + 'v1/student/delete/',
          
          ourwork_get: baseurl + 'v1/ourwork',
          ourwork_post_img: baseurl + 'v1/ourwork/postfile',
          ourwork_post_all: baseurl + 'v1/ourwork/create',
          ourwork_update_img: baseurl + 'v1/ourwork/updatefile/',
          ourwork_update_all: baseurl + 'v1/ourwork/update/',
          ourwork_delete: baseurl + 'v1/ourwork/delete/',

          major_get: baseurl + 'v1/major',
          major_get_id: baseurl + 'v1/major/skill/',
          major_post: baseurl + 'v1/major/create',
          major_update: baseurl + 'v1/major/update/',
          major_delete: baseurl + 'v1/major/delete/',


          login: baseurl + 'v1/login'
        },
        authenticated: false,
        mockAccount: {
          name: "admin",
          password: "tanyaadmin"
        },

        token: null,
      }
    },
    mounted() {
      this.checkAuth();
      // DATA
      // console.log('APP: ', router.app);

      this.token = JSON.stringify(localStorage.getItem('api_token'));
    },
    methods: {
      // lagi tak utek2 
      checkAuth(){
        var data = {
          about: null,
          founder: null,
          skill: null,
          character: null,
          students: null,
          ourwork: null,
          login: null
        };

        const params = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCredentials': true,
            'Access-Control-Allow-Origin': '*',
            'api_token': this.token
          }
        };

        var current = this.$router.history.current.name;
        console.log("CURERENT PAGE", current);

        if(!localStorage.getItem('api_token')){
          this.authenticated = false;
          this.$router.replace({name: "Login"});
        }else{
          if(current != 'Login'){
            this.authenticated = true;
          }else{

            this.authenticated = true;
            this.$router.replace({name: "Dashboard"});
          }
        }
      },
      setAuthenticated(status) {
        this.authenticated = status;
      },
      logout() {
        this.authenticated = false;
        localStorage.removeItem('api_token');
      },
      getData(url, callback){
        // RENDER
        Vue.axios.get(url).then((response) => {
          callback(response.data)
        });
      },
      postData(url, data){
        const params = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCredentials': true,
            'Access-Control-Allow-Origin': '*',
          },
        };

        axios.post(url, data, params).then(response => {
          if (response.status === 200) {
            console.log('Response: ', response.data);
          } else {
            throw new Error("Error");
            response.status = 200;
          }
        }).catch(e => {
          console.log('error: ', e.response);
          if(e.status!=200){
          }
        });
      },
      putData(url, data){
        const params = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCredentials': true,
            'Access-Control-Allow-Origin': '*',
          },
        };

        axios.put(url, data, params).then(response => {
          if (response.status === 200) {
            console.log('Response: ', response.data);
          } else {
            throw new Error("Error");
            response.status = 200;
          }
        }).catch(e => {
          console.log('error: ', e.response);
        });
      },
      deleteData(url){
        const params = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCredentials': true,
            'Access-Control-Allow-Origin': '*',
          },
        };

        axios.delete(url, params).then(response => {
          if (response.status === 200) {
            console.log('Response: ', response.data);
            // window.location.reload();
          } else {
            throw new Error("Error");
            response.status = 200;
          }
        }).catch(e => {
          console.log('error: ', e.response);
        });
      }
    },
    watch: {
      '$route' (to, from) {
        // console.log(to, from);
        // console.log(from.name);
        if(from.name == 'Login'){
          this.checkAuth();
        }
      }
    }
  }
</script>

<style>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  body {
    margin: 0 auto;
    background-color: #f4f4f4;
  }
  table {
    width: 100%;
    text-align: center;
    margin-top: 2rem;
  }

  table thead td {
    background-color: #eee;
  }

  table td {
    padding: .5rem;
    border: 1px solid #eee;
  }

  table td img {
    margin: 0 .5rem;
  }
  #app {
    height: 100vh;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
  }
  #doesLogo {
    margin-top: 30px;
  }

  .main {
    display: flex;
  }

  .view {
    width: 100%;
    padding-left: 110px;
  }

  .nav {
    position: fixed;
    background-color: #fff;
    height: 100vh;
    width: 110px;
    text-align: center;
    z-index: 1;
  }
  .nav ul {
    padding: 0;
    margin: 0;
  }
  .nav ul li {
    list-style: none;
    padding: 0px 10px;
    margin: 40px 0;
    border: 5px solid rgba(0, 0, 0, 0);
  }
  .nav ul li span {
    display: block;
  }
  .nav ul a{
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
  }
  .nav ul a li:hover {
    color: #c41e30;
    border-right: 5px solid #c41e30;
  }
  .nav ul a li:hover #dashboard-img{
    content: url("./assets/logo/dashboard_red.png");
  }
  .nav ul a li:hover #student-img{
    content: url("./assets/logo/student_red_1.png");
  }
  .nav ul a li:hover #work-img{
    content: url("./assets/logo/ourwork_red_1.png");
  }

  .logout {
    right: 30px;
    top: 20px;
    position: absolute;
  }
  .logout img {
    width: 100%;
  }
</style>
