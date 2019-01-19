<template>
	<div class="student-list">
		<span>STUDENT LIST</span>
		<div class="list">
			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Gender</th>
						<th>Address</th>
						<th>Birthday</th>
						<th>Major / Generation</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
<!-- 				<student v-on:delete-student="deleteStudent" v-on:complete-student="completeStudent" v-for="student in students" :student.sync="student"></student> -->
			</table>
		</div>
	</div>
</template>

// <script>
	
// 	import Student from '../components/Student12';

// 	export default {
// 		props: ['students'],
// 		components: {
// 			Student
// 		},
// 		method: {
// 			completeStudent(student) {
// 				const studentIndex = this.students.indexOf(student);
// 				this.students[studentIndex].lulus = true;
// 				sweetalert('Success!', 'Completed!', 'success');
// 			}
// 		}
// 	}

// </script>

<style scoped>
	.student .student-list {
		margin: 20px 0;
		display: inline-block;
		width: 80%;
		background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		padding: 20px;
		text-align: center;
	}
	.student-list table{
		width: 100%;
		border: 1px solid #8e8e8e;
		border-collapse: collapse;
	}
	.student-list td{
		border-right: 1px solid #8e8e8e;
	}
	.student-list th {
		border: 1px solid #8e8e8e;
		color: white;
		font-size: 15px;
	}
	.student-list thead {
		background-color: #c41e30;
	}
	.student-list th, tr, td {
		padding: 10px;
	}
	.student-list td {
		font-size: 10pt;
	}
	.student-list .list {
		margin-top: 20px;
	}
</style>