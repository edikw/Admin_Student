<template>
	<div class="login">
		<div class="title">
			<h1>LOGIN</h1>
			<hr>
		</div>
		<div class="input">
			<div class="content">
				<p id="tes" style="color:#c51b2f; font-weight: bold; text-align: center"></p>
				<div class="label">
					<label><img src="../assets/logo/name.png">
					Name</label><br>
					<input v-model="name" type="text" placeholder="Name" autocomplete="off"><br>
				</div>
				<div class="label">
					<label><img src="../assets/logo/password.png">
					Password</label><br>
					<input v-model="password" type="password" placeholder="Password" autocomplete="off"><br>
				</div>
				<div class="btn">
					<button type="button" v-on:click="login">Login</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import router from '../router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
	baseUrl: 'http://192.168.2.231:8000',
	providers: {
		github: {
			clientId: '',
			redirectUri: 'http://192.168.2.225:8080'
		}
	}
});

new Vue({
	methods: {
		login: function() {
			this.$auth.login({username, password}).then(function () {
				
			})
		}
	}
})

import main from '../main.js'
	export default {
		name: 'Login',
		data() {
			return {
				name: '',
				password: '',
				url_login: 'http://192.168.2.231:8000/login',
				dataLogin: null
			}
		},
		mounted() {
			console.log('di login: ',router.app)
		},
		methods: {
			login() {
				// parsing login 
				const params = {
		          headers: {
		            'Content-Type': 'application/json',
		            'Accept': 'application/json',
		            'withCredentials': true,
		            'Access-Control-Allow-Origin': '*',
		          },
		        };

		        this.dataLogin = {
		        	username: this.name,
		        	password: this.password
		        }

		        console.log("data yang dikirim", this.dataLogin)

				Vue.axios.post(this.url_login, this.dataLogin, params).then((response) => {

				  if (response.status === 200) {
					  console.log('response login: ', response.data)
					  
					  var token = response.data.api_token;

					  localStorage.setItem('api_token', token);
					  console.log(localStorage.getItem('api_token'));

					  if(localStorage.getItem('api_token')){
						  this.$router.push('/dashboard');
					  }
				  } else {
				  	throw new Error('Error!');
				  }
				}).catch(e => {
				  	alert('Nama atau Password Anda Salah. Silahkan Coba Lagi');
					console.log('Error: ', e.response);
				});

				// LOGIN APUS2 
				// if(this.input.name != "" && this.input.password != "") {
				// 	if(this.input.name == this.$parent.mockAccount.name && this.input.password == this.$parent.mockAccount.password) {
				// 		// LOGIN SUCCESS

				// 		// set local auth
				// 		this.$emit("authenticated", true);
				// 		localStorage.setItem('isAuthed', true);
				// 		console.log(localStorage.getItem('isAuthed'));

				// 		// redirect to dashboard
				// 		this.$router.replace({name: "Dashboard"});
				// 	} else {
				// 		document.getElementById("tes").innerHTML = "username or password is incorrect!"
				// 		console.log("username or password is incorrect!")
				// 	}
				// } else {
				// 	document.getElementById("tes").innerHTML = "the fields cannot be empty!"
				// 	console.log("the fields fields cannot be empty!")
				// }

				// LOGIN  
				// if(this.input.name != "" && this.input.password != "") {
				// 	if(this.input.name == this.dataLogin.username && this.input.password == this.dataLogin.password) {
				// 		// LOGIN SUCCESS

				// 		// set local auth
				// 		this.$emit("authenticated", true);
				// 		localStorage.setItem('isAuthed', true);
				// 		console.log(localStorage.getItem('isAuthed'));

				// 		// redirect to dashboard
				// 		this.$router.replace({name: "Dashboard"});
				// 	} else {
				// 		document.getElementById("tes").innerHTML = "username or password is incorrect!"
				// 		console.log("username or password is incorrect!")
				// 	}
				// } else {
				// 	document.getElementById("tes").innerHTML = "the fields cannot be empty!"
				// 	console.log("the fields fields cannot be empty!")
				// }
			}
		}
	}
</script>

<style scoped>
.login {
	width: 93%;
	display: inline-block;
	position: absolute;
	text-align: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.login .title h1 {
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
}
.login .title hr {
	width: 50%;
}

.login .input {
	width: 30vw;
	display: inline-block;
	margin-top: 20px;
	background-color: #fff;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

}

.login .input .content {
	display: inline-block;
	text-align: left;
	margin: 35px 0;
}
.login .input .content input[type=text], select {
	padding: 10px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 25vw;
	box-sizing: border-box;
}
.login .input .content .label {
	margin: 10px 0; 
}

.login .input .content input[type=password], select {
	padding: 10px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	width: 25vw;
}
.login .input .content button[type=button] {
	width: 100px;
	background-color: #bc162f;
	color: white;
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 10px;
	cursor: pointer;
}
.login .input .content button[type=button]:hover {
  background-color: #a80a21;
}
.login .input .content label {
	display: inline-block;
}
.btn {
	text-align: center;
}
</style>