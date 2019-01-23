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

  export default {
    name: 'App',
    data() {
      return {
        url: {
          root: 'http://192.168.2.231:8000/',
          base: 'http://192.168.2.231:8000/v1/',
          about: 'http://192.168.2.231:8000/v1/about',
          aboutImg: 'http://192.168.2.231:8000/v1/about/updatefile/1',
          founder: 'http://192.168.2.231:8000/v1/founder',
          founderImg: 'http://192.168.2.231:8000/v1/founder/updatefile/1',
          skill: 'http://192.168.2.231:8000/v1/skill',
          skill_post: 'http://192.168.2.231:8000/v1/skill/create',
          skill_update: 'http://192.168.2.231:8000/v1/skill/update/',
          character: 'http://192.168.2.231:8000/v1/character',
          student: 'http://192.168.2.231:8000/v1/student',
          ourwork: 'http://192.168.2.231:8000/v1/ourwork'

        },
        url_student: {
          get_student: 'http://192.168.2.231:8000/v1/student',
          post_student: 'http://192.168.2.231:8000/v1/student/create',
          put_student: 'http://192.168.2.231:8000/v1/student/update/', //+id
          delete_student: 'http://192.168.2.231:8000/v1/student/delete/',//+id
          profile_student: 'http://192.168.2.231:8000/v1/student/postfile',
          profile_student_update: 'http://192.168.2.231:8000/v1/student/updatefile/'
        },
        url_major: {
          get_major: 'http://192.168.2.231:8000/v1/major',
          post_major: 'http://192.168.2.231:8000/v1/major/create',
          put_major: 'http://192.168.2.231:8000/v1/major/update/', //+id
          delete_major: 'http://192.168.2.231:8000/v1/major/delete/'//+id
        },
        url_ourwork: {
          post_file: 'http://192.168.2.231:8000/v1/ourwork/postfile',
          update_file: 'http://192.168.2.231:8000/v1/ourwork/updatefile/',
          update_text: 'http://192.168.2.231:8000/v1/ourwork/update/',
          get_ourwork: 'http://192.168.2.231:8000/v1/ourwork',
          delete_ourwork: 'http://192.168.2.231:8000/v1/ourwork/delete/',
          post_text: 'http://192.168.2.231:8000/v1/ourwork/create'
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
