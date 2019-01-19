			// Add New Student
			sendForm() {
				console.log('ADD THIS:', this.student);
				this.saveStudent('new');
			},
			showEdit() {
				this.edit = false;
				console.log('EDIT SEND: ', this.student);
				this.saveStudent('edit');
			},
			saveStudent(type){
				var students;
				if(localStorage.getItem('dataStudents')){
					students = JSON.parse(localStorage.getItem('dataStudents'));
				}else{
					students = [];
				}

				// BACKEND 
				var students2
				students2 = this.storedStudentDB;

				if(type == 'new'){
					// PUSH AND STORE
					this.student.created_at = new Date();
					this.student.major = this.selectedMajor;
					console.log('MAJOR: ', this.selectedMajor);
					students.push(this.student);
					students2.push(this.student);
					localStorage.setItem('dataStudents', JSON.stringify(students));

					// POST STUDENT HERE

					this.$root.$emit('kirim-add', students);
					sweetalert('Added!', 'Student has been added', 'success');

				}else if(type == 'edit'){
					var index;
					for (var i = 0; i < students.length; i++) {
						var s = students[i];
						var ts = this.student;
						if(s.created_at == ts.created_at && s.email == ts.email){
							index = i;
						}
					}

					students[index] = this.student;
					if (this.selectedMajor == 'Animator') {
						this.selectedMajor = 1;
					} else if (this.selectedMajor = 'Modeler') {
						this.selectedMajor = 2;
					} else if (this.selectedMajor = 'Compositor') {
						this.selectedMajor = 3;
					} else if (this.selectedMajor = 'Programmer') {
						this.selectedMajor = 4;
					} else {
						this.selectedMajor = 1;
					}
					students[index].major = this.selectedMajor;

					// PUT STUDENT HERE 

					localStorage.setItem('dataStudents', JSON.stringify(students));

					this.$root.$emit('kirim-edit', students);
					this.$root.$emit('kirim-edit-disini', this.student.characters);
					console.log('STUDENT AFTER EDIT: ', this.student);
					console.log('CHAR AFTER EDIT: ', this.student.characters);
					console.log('CHAR AFTER EDIT: ', this.storedChar);
					// this.student.characters = this.storedChar;
					sweetalert('Updated!', 'Student has been updated', 'success');

				}else{
					alert('Error: Save Student type is not defined');
				}

				// RESET
				this.student = _student;
			},
			addingChar() {
				console.log('ADD CHARACTER');
				this.addChar = true;
			},
			addCharSet() {
				// var self = this;
				for (var i = 0; i < this.storedCharDB.length; i++) {
					var char = this.storedCharDB[i].name;
					// console.log('KARRRR: ', this.storedCharDB[i].name)
					this.student.characters.push({
						name: char,
						value: 0
					});
				}
				console.log('data student backend char: ', this.student);
			},
			setAndRender(data, name, key) {
				// this stuff undone yet!!!
				// POST DATA 
				var url = this.url.student+ 'create';

			},
			openUpload() {
				document.getElementById("profileIMG").click()
			},
			onFilePicked(event) {
				const files = event.target.files;
				const fileReader = new FileReader()
				fileReader.onload = (e) => {
					this.profilePic = e.target.result
				};
				fileReader.readAsDataURL(files[0])
				this.image = files[0]

				console.log(event.target.result)
			}










			selectedMajor(val) {
				var self = this;

				// BACKEND DATA 
				var major_id = null;
				if (val == 'Animator' || val == 'animator') {
					major_id = 1;
					console.log('Major ID: ', major_id);
				} else if (val == 'Modeler' || val == 'modeler') {
					major_id = 2;
				} else if (val == 'Compositor' || val == 'compositor') {
					major_id = 3;
				} else if (val == 'Programmer' || val == 'programmer') {
					major_id = 4;
				} else {
					major_id = 0;
				}

				// SEACH SKILL 
				for (var i=0; i<this.storedSkillDB.length; i++) {
					if (major_id == this.storedSkillDB[i].major_id) {
						this.selectedListDB = this.storedSkillDB[i];
					}
				}
				console.log('List skill by Major: ', this.selectedListDB);
				// ADD SKILL 
				if (this.selectedListDB.length > 1) {
					this.studentDB.skills = null;
					this.studentDB.skills = [];
					for (var i=0; i<this.selectedListDB.length; i++) {
						var skill = this.selectedListDB[i].name;
						console.log('Skill nya: ', skill);
						this.studentDB.skills.push({
							id: skill.id,
							name: skill.name,
							value: 0
						});
					}
					console.log('Skill Student 1: ', this.studentDB.skills);
				} else {
					this.studentDB.skills = [{name: this.selectedListDB.name, value: 0}];
					console.log('Skill Student 2: ', this.studentDB.skills);
				}
				
				// LOCALSTORAGE
				// SEARCH SKILLSET
				for (var i=0; i<this.storedSkill.length; i++) {
					console.log('Cari Major: ', this.storedSkill[i].major)
					if (val == this.storedSkill[i].major) {
						console.log('Skill dan major ketemu!!!', val);
						console.log('Skill dan major ketemu!!!', this.storedSkill);
						this.selectedList = this.storedSkill[i].list;
					}
				}

				// ADD SKILLSET
				// check created at
				if(!this.student.created_at){
					this.student.skills = [];
					for (var i = 0; i < this.selectedList.length; i++) {
						var skill = this.selectedList[i];
						// console.log('PRINT SKILL: ', skill)
						this.student.skills.push({
							id: skill.id,
							name: skill.name,
							value: 0
						});
					}
				} else {
					this.student.skills = [];
					for (var i = 0; i < this.selectedList.length; i++) {
						var skill = this.selectedList[i];
						// console.log('PRINT SKILL: ', skill)
						this.student.skills.push({
							id: skill.id,
							name: skill.name,
							value: 0
						});
					}
				}
				console.log('SKILL IF MAJOR CHANGE: ', val);

				// console.log(this.student)
			},
			inputValueSkill(val) {
				console.log(val)
			}






			// from worklist.vue ----- localStorage

				<template>
			<p>From localStorage</p>
			<div class="work" v-bind="work" v-for="(work, key) in stored">
				<div class="work-show" v-if="work" v-show="!isEditing">
					<!-- <img v-bind:src= "work.workPic"> -->
					<div class="works-wrapper">
						<h3>{{ work.title }}</h3>
						<p>{{ work.categori }}</p>
						<a v-bind:href="work.website">{{ work.website }}</a>
						<div class="option-work">
							<img src="../../assets/logo/edit.png" v-on:click="editWork(work, key)">
							<img src="../../assets/logo/delete.png" v-on:click="removeWork(work, key)">
						</div>
					</div>
				</div>
				<div class="work-show-edit" v-show="isEditing">
					<img src="../../assets/work/our.png">
					<div class="work-wrapper">
						<div class="input-work">
							<label>Category:</label>
							<input type="text" v-model="work.categori">
						</div>
						<div class="input-work">
							<label>Title:</label>
							<input type="text" v-model="work.title">
						</div>
						<div class="input-work">
							<label>Website:</label>
							<input type="text" v-model="work.website">
						</div>
						<div class="button-add">
							<button class="edit-work" v-on:click="hideForm">Close</button>
						</div>
					</div>
				</div>
			</div>
		</template>




// main.js all code 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Chartist from './Chartist'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Chart from 'chart.js'

var url = App.data().url;
var data = {
	about: null,
	founder: null,
	skill: null,
	character: null,
	students: null,
	ourwork: null,
	login: null
};

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

// IIFE
window.onload = (function(){
	getData();
})();

// GET DATA ALL
function getData(){
	getAbout();
}

function getAbout(){
	Vue.axios.get(url.about).then((response) => {
	  data.about = response.data;
	  getFounder();
	});
}

function getFounder(){
	Vue.axios.get(url.founder).then((response) => {
	  data.founder = response.data;
	  getOurwork();
	});
}

function getOurwork(){
	Vue.axios.get(url.ourwork).then((response) => {
	  data.ourwork = response.data;
	  getSkill();
	});
}

function getSkill(){
	Vue.axios.get(url.skill).then((response) => {
	  data.skill = response.data;
	  getCharacter();
	});
}

function getCharacter(){
	Vue.axios.get(url.character).then((response) => {
	  data.character = response.data;
	  getStudent();
	});
}

function getStudent(){
	Vue.axios.get(url.student).then((response) => {
	  data.students = response.data;
	  renderApp();
	});
}

// renderApp();
function renderApp(){
	var app = new Vue({
	  router,
	  data: function(){
	  	return data;
	  },
	  mounted(){
		// console.clear();
	  	// console.log('INITIAL DATA: ', this.$data);
	  },
	  render: h => h(App)
	}).$mount('#app')
}