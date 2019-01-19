<template>
	<div class="nav-student">
		<div class="title">
			<h1>EDIT STUDENT</h1>
			<hr/>
		</div>
		<div class="links">
			<router-link to="/skill">
			<div class="link">
				<img src="../assets/logo/student_grey_1.png" id="student-img">
				<p>Skill</p>
			</div>
			</router-link>
			<router-link to="/character">
			<div class="link">
				<img src="../assets/logo/student_grey_1.png" id="student-img">
				<p>Character</p>
			</div>
			</router-link>
			<router-link to="/student">
			<div class="link">
				<img src="../assets/logo/student_grey_1.png" id="student-img">
				<p>Student</p>
			</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	.nav-student {
		padding-top: 2rem;
		width: 100%;
	}
	.nav-student .title h1 {
		text-align: center;
		color: #c41e30;
		font-family: monospace, sans-serif;
		margin: 0;
	}
	.nav-student .title hr {
		width: 50%;
	}
	.nav-student .links {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.nav-student .link {
		text-align: center;
		padding: 1rem;
		margin: .5rem 0;
		border: 1px solid #ddd;
		width: 200px;
		color: #aaa;
		transition: .2s;
	}
	.nav-student .link:hover {
		border: 1px solid #000;
		color: #000;

	}
</style>