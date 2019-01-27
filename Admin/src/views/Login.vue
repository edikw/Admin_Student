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
					<input v-model="username" type="text" placeholder="Name" autocomplete="off"><br>
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
	import router from '../router.js'
	import axios from 'axios'
	import App from '../App.vue'
	import sweetalert from 'sweetalert';

	export default {
		data() {
			return {
				username: null,
				password: null,
				url_login: App.data().url.login,
			}
		},
		mounted() {
			console.log('di login: ',router.app)
		},
		methods: {
			login() {
		        const dataLogin = {
		        	username: this.username,
		        	password: this.password
		        };
				
				const params = {
		          headers: {
		            'Content-Type': 'application/json',
		            'Accept': 'application/json',
		            'withCredentials': true,
		            'Access-Control-Allow-Origin': '*',
		          },
		        };


		        console.log("data yang dikirim", dataLogin)

				axios.post(this.url_login, dataLogin, params).then((response) => {

				  if (response.status === 200) {
					  const token = response.data.api_token;
					  localStorage.setItem('api_token', token);
					  sweetalert('Login Success', 'success');
					  if(localStorage.getItem('api_token')){
						  this.$router.push('/dashboard');
					  }
				  } else {
				  	throw new Error('Error!');
				  }
				}).catch(e => {
				  	sweetalert('Nama atau Password yang anda masukkan salah. Silahkan coba lagi');
				});

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