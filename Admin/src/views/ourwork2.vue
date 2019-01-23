<template>
	<div class="ourworks">
		<h1>OUR WORKS</h1>
		<hr>
		<div class="ourworks-desc">
			<div class="ourworks-container">
				<CreateWork2/>
				<div class="ourworks-title">
					<span>LIST PROJECT</span>
				</div>
				<WorkList2 />
			</div>
		</div>
		<!-- <create-work v-on:create-work="createWork"></create-work> -->
	</div>
</template>

<script>
	import WorkList2 from '../components/ourwork2/workList.vue';
	import CreateWork2 from '../components/ourwork2/createWork.vue';
	import router from '../router.js'

	export default {
		name: 'ourwork2',
		components: {
			WorkList2,
			CreateWork2
		}

	}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.ourworks {
	padding-top: 2rem;
}
.ourworks-title{
	border-bottom: 2px solid #cccccc;
	padding-bottom: 20px;
	width: 75%;
	margin: auto;
}
.ourworks .ourworks-desc span {
	font-size: 20px;
	font-family: monospace, sans-serif;
	font-weight: bolder;
}
.ourworks hr {
	width: 50%;
}
.ourworks h1 {
	text-align: center;
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
}
.ourworks .ourworks-desc {
	width: 80%;
	margin: auto;
	background-color: #fff;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
	padding: 20px;
}
.ourworks .ourworks-desc .ourworks-container {
	width: 100%;
	text-align: center;
	display: inline-block;
}

.ourworks .ourworks-desc .ourworks-container .work-list .work-show button {
	margin: 0 5px;
	padding: 5px;
	border-radius: 10px;
	border: 1px solid #ccc;
	background-color: #c41e30;
	color: #fff;
}

</style>