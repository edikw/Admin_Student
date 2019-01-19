<template>
	<div class="student">
		<div class="title">
			<h1>STUDENTS</h1>
			<hr>
		</div>

		<create-student></create-student>

		<student-list></student-list>

	</div>
</template>

<script>
	import StudentList from '../components/StudentList';
	import CreateStudent from '../components/NewStudent';

	export default {
		components: {
			StudentList,
			CreateStudent
		},
		mounted(){
			
		},
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	.student {
		padding-top: 2rem;
		text-align: center;
	}
	.student span {
		width: 100%;
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder;
		text-align: left;
		display: inline-block; 
	}
	.student .title h1 {
		color: #c41e30;
		font-family: monospace, sans-serif;
		margin: 0;
	}
	.student .title hr {
		width: 50%;
	}

</style>