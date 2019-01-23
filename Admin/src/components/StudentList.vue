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
	import Vue from 'vue';
	import axios from 'axios';
	import VueAxios from 'vue-axios';

	export default {
		data() {
			return {
				url: App.data().url,
				urlStudent: App.data().url_student.put_student,
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
				console.log("DTAA EMIT", data)
				App.methods.postData(data.url, data.data)

				sweetalert('Added!', 'Student has been added', 'success');
				self.render()
					
			})

			this.$root.$on('edit-student', function(data){
				console.log("DATA EMIITT EDIT ", data)

				App.methods.putData(data.urlStudent, data.data);
				sweetalert('Updated!', 'Student has been updated', 'success');
				self.render()
			})

			// DATA DARI BACKEND 
			// this.students = router.app.students;
			// this.storedChar = router.app.character;
			// this.storedSkill = router.app.skill;

			window.onload = (function(){
				getDataStudent();
			})();
			// GET DATA FROM BACKEND 
			function getDataStudent() {
				Vue.axios.get(self.url.student).then((response) => {
				  self.students = response.data;
				  console.log('[DATA STUDENT]: ', self.students)
				});
				getDataSkill();
			};
			function getDataSkill() {
				Vue.axios.get(self.url.skill).then((response) => {
				  self.storedSkill = response.data;
				  console.log('[DATA SKILL]: ', self.storedSkill)
				});
				getDataChar();
			};
			function getDataChar() {
				Vue.axios.get(self.url.character).then((response) => {
				  self.storedChar = response.data;
				  console.log('[DATA CHAR]: ', self.storedChar)
				});
			};
		},
		methods: {
			showStudent(student){
				// ini buat apa ?

				var self = this;
				console.log('ditampilkan')
				this.selectedStudent = student;
				// GET SKILLSET
				App.methods.getData(this.url.student + '/skill/' + student.id, function(res){
					self.selectedSkillset = res;
				})
				// GET CHARSET
				App.methods.getData(this.url.student + '/character/' + student.id, function(res){
					self.selectedCharset = res;
				})
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
				App.methods.getData(this.url.student + '/' + student.id, function(res){
					self.studNew = res;
					self.$root.$emit('show-edit-baru', self.studNew);
				});

				// GET STUDENT SKILLSET
				App.methods.getData(this.url.student + '/skill/' + student.id, function(res){
					self.skillOld = res;
				});
				App.methods.getData(this.url.base + 'major/skill/' + student.major, function(res){
					self.skillNow = res;
				}); 

				setTimeout(function compareSkill() {
					// var self = this;
					if (self.skillNow.length > self.skillOld.skills.length) {
						student.skills = []
						var num = 0;
						for (var i = 0; i < self.skillOld.skills.length; i++) {
							num = num + 1;
							// student.skills.push({
							// 	id: self.skillOld[i].skill_id,
							// 	name: self.skillOld[i].name,
							// 	score: self.skillOld[i].score
							// })
						}
						console.log('num: ', num)
						for (var j = 0; j < self.skillNow.length; j++) {
							if (j > num) {
								student.skills.push({
									id: self.skillNow[j].id,
									name: self.skillNow[j].name,
									major_id: self.skillNow[j].major_id,
									score: 0
								})
							}
						}
					} else {
						student.skills = []
						for (var i = 0; i < self.skillOld.skills.length; i++) {
							student.skills.push({
								id: self.skillOld.skills[i].skill_id,
								name: self.skillOld.skills[i].name,
								score: self.skillOld.skills[i].score
							})
						}
					}
				}, 300);



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
				App.methods.getData(this.url.student + '/character/' + student.id, function(res){
					// student.characters = []
					// for (var i = 0; i < res.length; i++) {
					// 	student.characters.push({
					// 		id: res[i].char_id,
					// 		name: res[i].name,
					// 		score: res[i].score
					// 	})
					// }
				})

				App.methods.getData(this.url.student + '/skill/' + student.id, function(res){
					
					// student.skill = []
					// for (var i = 0; i < res.length; i++) {
					// 	student.skill.push({
					// 		id: res[i].skill_id,
					// 		name: res[i].name,
					// 		score: res[i].score
					// 	})
					// }
				})

				// KIRIM DATA KE FORM 
				// this.$root.$emit('show-edit', student);

				// Make select major disabled 
				var isDisabled = true;
				// this.$root.$emit('select-disabled', isDisabled);

				//scrolling page
				window.scrollTo(0, 100);
			},
			deleteStudent(student, key) {
				var url = this.url.student + '/delete/' + student.id;
				App.methods.deleteData(url);

				this.render();
				sweetalert('Deleted!', 'Student has been deleted', 'success');
			},
			render(){
				var self = this;
				self.students = [];
				setTimeout(function(){
					App.methods.getData(self.url.student, function(res){
						self.students = res;
					});
				}, 500);
			}
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