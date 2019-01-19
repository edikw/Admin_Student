<template>
	<div class="dashboard">
		<div class="title">
			<h1>DASHBOARD</h1>
			<hr>
		</div>
		<div class="content">
			<div class="wrapper-left">
				<Majors />
				<TotalStudent />
			</div>
			<div class="wrapper-right">
				<About />
				<Founder />
			</div>
		</div>
	</div>
</template>

<script>
import App from '../App.vue'
import Founder from '../components/Founder'
import About from '../components/About'
import Majors from '../components/Majors'
import TotalStudent from '../components/Total-student'

export default {
	name: 'Dashboard',
	components: {
		Founder,
		About,
		Majors,
		TotalStudent
	},
	mounted(){
		this.checkAuth();
	},
	methods: {
		checkAuth(){
			if(!localStorage.getItem('isAuthed')){
		        this.$router.replace({name: "Login"});
		    }else{
		    	App.data().authenticated = true;
		        console.log('AUTH: ',App.data().authenticated)
		    }
		}
	},
	data() {
	  return {}
	}
}
</script>

<style scoped>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	.dashboard {
		padding-top: 2rem;
	}
	.dashboard .title h1 {
		text-align: center;
		color: #c41e30;
		font-family: monospace, sans-serif;
		margin: 0;
	}
	.dashboard .title hr {
		width: 50%;
	}

	.dashboard .content {
		display: flex;
		justify-content: center;
	}
	.logout {
		margin-top: 15px;
		left: 90%;
		right: 0%;
		top: 2%;
		position: absolute;
		display: inline-block;
		/*transform: translate(45%);*/
	}
	.logout img {
		width: 20%;
	}
	.logout span {
		display: block;
		color: #8e8e8e;
		font-size: 12px;
	}
	.dashboard .content .wrapper-left {
		width: 30%;
		margin-right: 20px;
		text-align: left;
		display: inline-block;
	}
	.dashboard .content .wrapper-right {
		text-align: left;
		width: 35%;
		display: inline-block;
	}
</style>