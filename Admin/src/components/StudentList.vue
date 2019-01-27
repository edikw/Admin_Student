<template>
	<div class="student-page">
		<div class="header">
			<h3 class="title">STUDENT LIST</h3>
			<input type="text" id="myInput" v-model="keyword" placeholder="Search..." title="Type in a name">
		</div>
		<div class="list">
			<table id="myTable">
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

				<tbody>
					<template v-for="(student, key) in students">
						<tr v-if="student">
							<td>{{key+1}}</td>
							<td>{{student.name}}</td>
							<td>{{student.gender}}</td>
							<td>{{student.address}}</td>
							<td>{{student.birthday}}</td>
							<td>{{student.major | major}} / {{student.generations}}</td>
							<td><img src="../assets/logo/edit.png" v-on:click="editStudent(student, key)"></td>
							<td><img src="../assets/logo/delete.png" v-on:click="deleteStudent(student, key)"></td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>

		<!-- STUDENT PREVIEW -->
		<!-- <div class="preview" v-if="selectedStudent">
			<hr>
			{{selectedStudent}}
			<hr>
			<h3>Skill</h3>
			<ul>
				<li v-for="skill in selectedSkillset">{{skill.skill_id | skill}} | {{skill.score}}</li>
			</ul>
			<hr>
			<h3>Character</h3>
			<ul>
				<li v-for="char in selectedCharset">{{char.char_id | char}} | {{char.score}}</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
	import sweetalert from 'sweetalert';
	import router from '../router';
	import App from '../App';
	import axios from 'axios';

	export default {
		data() {
			return {
				skillGet: App.data().url.skill_get,

				characterGet: App.data().url.character_get,
				
				studentUpdate: App.data().url.student_update,
				
				studentPost: App.data().url.student_post,
				
				studentPostFile: App.data().url.student_post_img,
				
				studentUpdateFile: App.data().url.student_update_img,
				
				skillgetId: App.data().url.skill_get_id,
				
				charactergetId: App.data().url.character_get_id,
				
				studentGetId: App.data().url.student_get_id,
				
				studentDelete: App.data().url.student_delete,

				studentGet: App.data().url.student_get,

				majorGetId: App.data().url.major_get_id,
				
				edit: false,

				stored: [],
				key: '',

				keyword: '',

				// TAMBAHAN BACKEND 
				students: [],
				storedChar: [],
				storedSkill: [],
				major_name: [],

				selectedStudent: null,
				selectedSkillset: null,
				selectedCharset: null,

				skillOld: null,
				skillNow: null,

				studNew: null,
			}
		},
		mounted() {
			var self = this;

			console.log('[StudentList.vue MOUNTED]')

			this.$root.$on('add-student', function(data){
				self.postDataStudent(data);
			})

			this.$root.$on('edit-student', function(data){
				self.editDataStudent(data);
			})

			window.onload = (function(){
				self.getDataStudent();
				self.getDataSkill();
				self.getDataChar();
			})();
		},
		methods: {
			getDataStudent() {
				axios.get(this.studentGet).then((response) => {
				  this.students = response.data;

				});
			},
			getDataSkill(){
				axios.get(this.skillGet).then((response) => {
				  this.storedSkill = response.data;
				});
			},
			getDataChar(){
				axios.get(this.characterGet).then((response) => {
				  this.storedChar = response.data;
				});
			},
			postDataStudent(data){
				console.log('DATA DI TERIMA DAN DI KIRIM', data)
				axios.post(this.studentPost, data.data).then(res => {
					if(res.status == 200){
						sweetalert('Sukses Menambahkan Student', 'success');
						// this.render();
						this.getDataStudent();
					}else {
						sweetalert('Gagal Menambahkan Student. Silahkan Coba Lagi');
					}
				}).catch(e => {
					sweetalert('Gagal Menambahkan Student. Silahkan Coba Lagi');
				})
			},
			editDataStudent(data) {
				console.log('DTAA YANG MAU NDI EDIT di fungsi edit student', data)
				axios.put(this.studentUpdate + data.id, data).then(res => {
					if(res.status == 200){
						sweetalert('Sukses Edit Student', 'success');
						// this.render();
						this.getDataStudent();
					}else {
						sweetalert('Gagal Edit Student. Silahkan Coba Lagi');
					}
				}).catch(e => {
					sweetalert('Gagal Edit Student. Silahkan Coba Lagi');
				})	
			},
			showStudent(student){
				this.selectedStudent = student;
				// GET SKILLSET
				axios.get(this.skillgetId + student.id ).then(res => {
					this.selectedSkillset = res
				});
				// App.methods.getData(this.url.student + '/skill/' + student.id, function(res){
				// 	self.selectedSkillset = res;
				// })

				// GET CHARSET
				axios.get(this.charactergetId + student.id ).then(res => {
					this.selectedCharset = res
				});

				// App.methods.getData(this.url.student + '/character/' + student.id, function(res){
				// 	self.selectedCharset = res;
				// });
			},
			editStudent(student, key) {
				var self = this;

				this.isEditing = true;
				console.clear();
				console.log('[SELECTED STUDENT]: ', student)

				// var skillOld;
				// var skillNow;
				// var loop;

				// GET STUDENT DATA BARU
				axios.get(this.studentGetId + student.id).then(res => {
					this.studNew = res;
					console.log("RESPONE GET STUD EDIT", res)
					this.$root.$emit('show-edit-baru', this.studNew);
					
				})

				// App.methods.getData(this.url.student + '/' + student.id, function(res){
				// });

				// GET STUDENT SKILLSET
				// axios.get(this.skillgetId + student.id).then(res => {
				// 	self.skillOld = res;
					
				// });

				// // App.methods.getData(this.url.student + '/skill/' + student.id, function(res){
				// // });

				// // axios.get(this.)
				// App.methods.getData(this.majorGetId + 'major/skill/' + student.major, function(res){
				// 	self.skillNow = res;
				// }); 

				// setTimeout(function compareSkill() {
				// 	// var self = this;
				// 	if (self.skillNow.length > self.skillOld.skills.length) {
				// 		student.skills = []
				// 		var num = 0;
				// 		for (var i = 0; i < self.skillOld.skills.length; i++) {
				// 			num = num + 1;
				// 			// student.skills.push({
				// 			// 	id: self.skillOld[i].skill_id,
				// 			// 	name: self.skillOld[i].name,
				// 			// 	score: self.skillOld[i].score
				// 			// })
				// 		}
				// 		console.log('num: ', num)
				// 		for (var j = 0; j < self.skillNow.length; j++) {
				// 			if (j > num) {
				// 				student.skills.push({
				// 					id: self.skillNow[j].id,
				// 					name: self.skillNow[j].name,
				// 					major_id: self.skillNow[j].major_id,
				// 					score: 0
				// 				})
				// 			}
				// 		}
				// 	} else {
				// 		student.skills = []
				// 		for (var i = 0; i < self.skillOld.skills.length; i++) {
				// 			student.skills.push({
				// 				id: self.skillOld.skills[i].skill_id,
				// 				name: self.skillOld.skills[i].name,
				// 				score: self.skillOld.skills[i].score
				// 			})
				// 		}
				// 	}
				// }, 300);



				// ADDING SKILL SET 
				// console.log('SKILL BERDASAR MAJOR after: ', this.skillNow)
				// if (self.skillNow.skill.length > self.skillOld.length) {
				// 	student.skills = []
				// 	for (var i = 0; i < self.skillOld.length; i++) {
				// 		student.skills.push({
				// 			id: self.skillOld[i].skill_id,
				// 			score: self.skillOld[i].score
				// 		})
				// 	}
				// 	for (var j = 0; j < self.skillNow.skill.length; j++) {
				// 		student.skills.push({
				// 			id: self.skillNow.skill[j].id,
				// 			score: 0
				// 		})
				// 	}
				// } else {
				// 	student.skills = []
				// 	for (var i = 0; i < self.skillOld.length; i++) {
				// 		student.skills.push({
				// 			id: self.skillOld[i].skill_id,
				// 			score: self.skillOld[i].score
				// 		})
				// 	}
				// }

				// student.skills = []
				// for (var i = 0; i < res.length; i++) {
				// 	student.skills.push({
				// 		id: res[i].skill_id,
				// 		score: res[i].score
				// 	})
				// }


				// disini get data student char, tidak get dari characters
				// GET STUDENT CHARSET
				// App.methods.getData(this.url.student + '/character/' + student.id, function(res){
					// student.characters = []
					// for (var i = 0; i < res.length; i++) {
					// 	student.characters.push({
					// 		id: res[i].char_id,
					// 		name: res[i].name,
					// 		score: res[i].score
					// 	})
					// }
				// })

				// App.methods.getData(this.url.student + '/skill/' + student.id, function(res){
					
					// student.skill = []
					// for (var i = 0; i < res.length; i++) {
					// 	student.skill.push({
					// 		id: res[i].skill_id,
					// 		name: res[i].name,
					// 		score: res[i].score
					// 	})
					// }
				// })

				// KIRIM DATA KE FORM 
				// this.$root.$emit('show-edit', student);

				// Make select major disabled 
				var isDisabled = true;
				// this.$root.$emit('select-disabled', isDisabled);

				//scrolling page
				window.scrollTo(0, 100);
			},
			deleteStudent(student, key) {
				// var url = this.url.student + '/delete/' + student.id;
				axios.delete(this.studentDelete + student.id).then(res => {
					if (res.status == 200){
						sweetalert('Deleted!', 'Student has been deleted', 'success');
						// this.render();
						this.getDataStudent();

					}
				})

			},
			// render(){
			// 	// self.students = [];
			// 	setTimeout(function(){

			// 		App.methods.getData(self.url.student, function(res){
			// 			self.students = res;
			// 		});
			// 	}, 500);
			// }
		},
		filters: {
			major(val) {
				var res
				if (val == 1) {
					res = 'Animator';
				} else if (val == 2) {
					res = 'Modeler';
				} else if (val == 3) {
					res = 'Compositor';
				} else if (val == 4) {
					res = 'Programmer';
				} else {
					
				}
				return res;
			},
			skill(val) {
				console.log('translate skill ', val)
				for (var i = 0; i < router.app.skill.length; i++) {
					var s = router.app.skill[i]
					if(s.id == val){
						return s.name
					}
				}
			},
			char(val) {
				console.log('translate characters ', val)
				for (var i = 0; i < router.app.character.length; i++) {
					var c = router.app.character[i]
					if(c.id == val){
						return c.name
					}
				}
			}
		},
		watch: {
			keyword(val){
				var self = this;
				if(val){
					var result = [];
						console.log(val, self.students)
						for (var i = 0; i < self.students.length; i++) {
							var name = self.students[i].name.toLowerCase();
							if(name.indexOf(val) > -1){
								console.log(name)
								result.push(self.students[i])
							}
						}
						self.students = result;
				} else {
					self.students = router.app.students
				}
			}
		}
	};
</script>

<style scoped>
	td img {
		cursor: pointer;
	}
	.student-page{
		margin: 0 0 20px 0;
		display: inline-block;
		width: 80%;
		background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		padding: 20px;
		text-align: center;
	}
	.student-page .header {
		position: relative;
		padding: 1rem 0;
	}
	.student-page .header .title {
		margin: 0;
	}
	.student-page .header #myInput{
		position: absolute;
		right: 0;
		top: 0;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: .5rem 1rem;
	}
	.student-page table{
		width: 100%;
		border: 1px solid #ccc;
		border-collapse: collapse;
		margin-top: 0 !important;
	}
	.student-page td{
		border-right: 1px solid #ccc;
	}
	.student-page th {
		border: 1px solid #ccc;
		color: white;
		font-size: 15px;
	}
	.student-page thead {
		background-color: #c41e30;
	}
	.student-page th, tr, td {
		padding: 10px;
	}
	.student-page td {
		font-size: 10pt;
		text-transform: capitalize;
	}
	.student-page .list {
		margin-top: 20px;
	}
	.student-page tbody tr:hover {
		background-color: #ececec;
	}
</style>