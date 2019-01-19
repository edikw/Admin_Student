<template>
	<div class="student-all">
		<div class="profile">
			<div class="header">
				<h3>ADD PROFILE</h3>
			</div>

			<div class="flex-container">
				<div class="profile-desc">
					<div class="edit-bio">


						<form>
							<div class="pic-profile">
								<div class="ava-container">
									<img v-bind:src="student.pic" @click="openUpload">
								</div>
								<input type="file" name="file" id="profileIMG" class="inputfile" @change="onFilePicked">
								<button @click="openUpload">Choose file</button>
							</div>
							<div class="field">
								<p v-show="nullName">Name field must be filled</p>
								<p><img src="../assets/logo/name.png" style="margin-right:10px">Name</p>
								<input v-model="student.name" type="text">
							</div>
							<div class="field">
								<p v-show="nullGender">Gender field must be filled</p>
								<p><img src="../assets/logo/gender.png" style="margin-right:10px">Gender</p>
								<div class="gender">
									<label class="checkbox-container">
										<input type="radio" name="gender" v-model="student.gender" value="Male">
										<span class="checkmark"></span>
										Male
									</label>
									<label class="checkbox-container">
										<input type="radio" name="gender" v-model="student.gender" value="Female">
										<span class="checkmark"></span>
										Female
									</label>
									<label class="checkbox-container">
										<input type="radio" name="gender" v-model="student.gender" value="Shemale">
										<span class="checkmark"></span>
										Shemale
									</label>
								</div>
							</div>
							<div class="field">
								<p v-show="nullbirthday">Birthday field must be filled</p>
								<p><img src="../assets/logo/birthday.png" style="margin-right:10px">Birthday</p>
								<input v-model="student.birthday" type="date">
							</div>
							<div class="field">
								<p v-show="nullAddress">Address field must be filled</p>
								<p><img src="../assets/logo/address.png" style="margin-right:10px">Address</p>
								<input v-model="student.address" type="text">
							</div>
							<div class="field">
								<p v-show="nullEmail">Email field must be filled</p>
								<p><img src="../assets/logo/email.png" style="margin-right:10px">Email</p>
								<input type="email" v-model="student.email">
							</div>
							<div class="field">
								<p v-show="nullStatus">Status field must be filled</p>
								<p><img src="../assets/logo/status.png" style="margin-right:10px">Status</p>
								<select id="status" class="status" v-model="student.status">
									<option>Studying</option>
									<option>Graduated</option>
								</select>
							</div>
							<div class="major-gen-container">
								<div class="major-wrapper">
									<p><img src="../assets/logo/major.png" style="margin-right:10px">Major</p>
									<select id="major" class="major" v-model="selectedMajor">
										<option>Animator</option>
										<option>Modeler</option>
										<option>Compositor</option>
										<option>Programmer</option>
									</select>
								</div>
								<div class="generation-wrapper">
									<p v-show="nullGeneration">Generation field must be filled</p>
									<p>Generation</p>
									<select id="generation" class="generation" v-model="student.generations">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
							</div>
						</form>


					</div>
				</div>

				<div class="skill-desc">
					<div class="edit-skill">
						<div class="container">
							<span>SKILL</span>
							<!-- SKILL LOOPING -->
							<div class="skill-container" v-if="student.skills" v-for="(skill,key) in student.skills">
								<div class="skill">
									<ul>
										<li>
											<span></span> {{skill.name}}
										</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" :key="key" v-model="skill.score" placeholder="0">
								</div>
							</div>

							<div class="skill-container" v-if="student.skills && student.skills.length==0">
								<div class="skill">
									<ul>
										<li>
											<span></span> <i>No skills.</i>
										</li>
									</ul>
								</div>
							</div>

							<span>CHARACTER</span>
							<!-- CHARACTER LOOPING -->
							<div class="skill-container" v-if="student.characters" v-for="char in student.characters">
								<div class="skill">
									<ul>
										<li><span></span>{{char.name}}</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" v-model="char.score" placeholder="0">
								</div>
							</div>

						</div>
					</div>
				</div>
				<!-- ///////////////////////////////////// -->
				<div class="skill-desc">
					<div class="edit-skill">
						<div class="container">
							<span>SKILL</span>
							<div class="skill-container" v-if="stud.skills" v-for="(skill,key) in stud.skills">
								<div class="skill">
									<ul>
										<li>
											<span></span> {{skill.name}}
										</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" :key="key" v-model="skill.score" placeholder="0">
								</div>
							</div>

							<div class="skill-container" v-if="stud.skills && stud.skills.length==0">
								<div class="skill">
									<ul>
										<li>
											<span></span> <i>No skills.</i>
										</li>
									</ul>
								</div>
							</div>

							<span>CHARACTER</span>
							<div class="skill-container" v-if="stud.characters" v-for="char in stud.characters">
								<div class="skill">
									<ul>
										<li><span></span>{{char.name}}</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" v-model="char.score" placeholder="0">
								</div>
							</div>

						</div>
					</div>
				</div>
				<!-- ////////////////////////////////////// -->
			</div>


			<div class="submit-button" v-show="!edit">
				<button v-on:click="saveStudent('new')">SUBMIT</button>
			</div>
			<div class="submit-button" v-show="edit">
				<button v-on:click="saveStudent('edit')">EDIT</button>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../router.js'
	import Vue from 'vue'
	import axios from 'axios'
	import VueAxios from 'vue-axios'
	import App from '../App'

	var _student = {
		created_at: null,
		name: null,
		pic: require('../assets/logo/foto_size.png'),
		gender: null,
		birthday: null,
		address: null,
		email: null,
		status: null,
		major: null,
		generations: null,
		skills: [],
		characters: []
	};

	var studentBaru = {
		created_at: null,
		name: null,
		pic: require('../assets/logo/foto_size.png'),
		gender: null,
		birthday: null,
		address: null,
		email: null,
		status: null,
		major: null,
		generation: null,
		skills: [],
		characters: []
	};

	export default {
		data() {
			return {
				url: App.data().url,

				student : JSON.parse(JSON.stringify(_student)),

				profilePic: require('../assets/logo/foto_size.png'),
				edit: false,

				storedChar: null,
				storedSkill: null,
				selectedMajor: null,
				selectedMajorId: 0,

				nullName: false,
				nullGender: false,
				nullbirthday: false,
				nullAddress: false,
				nullEmail: false,
				nullStatus: false,
				nullMajor: false,
				nullGeneration: false,

				isSelectDisabled: false,

				stud: JSON.parse(JSON.stringify(studentBaru)),
			}
		},
		mounted() {
			var self = this;

			this.$root.$on('show-edit', function(data) {
				console.log('EDIT THIS: ', data);
				self.student.skills = []
				self.student.characters = []
				setTimeout(function(){
					self.student = data;
					if (self.student.major == 1) {
						self.selectedMajor = 'Animator';
					} else if (self.student.major == 2) {
						self.selectedMajor = 'Modeler';
					} else if (self.student.major == 3) {
						self.selectedMajor = 'Compositor';
					} else if (self.student.major == 4) {
						self.selectedMajor = 'Programmer';
					} else {
						self.selectedMajor = data.major;
					}
					self.edit = true;
				}, 500)
			});

			// GET DATA DARI EDIT BARU 
			this.$root.$on('show-edit-baru', function(data) {
				console.log('STUD DATA BARU: ', data)
				self.stud.address = data.address;
				self.stud.birthday = data.birthday;
				self.stud.email = data.email;
				self.stud.gender = data.gender;
				self.stud.generation = data.generation;
				self.stud.id = data.id;
				self.stud.major = data.major;
				self.stud.name = data.name;
				self.stud.status = data.status;
				self.stud.skills = data.skills;
				self.stud.characters = data.character
			})

			// BACKEND DATA 
			// =====================================================
			
			// GET SKILLS
			// this.storedSkill = router.app.skill;
			// this.storedChar = router.app.character;

			// HANDLE ASYNC HERE

			window.onload = (function(){
				getDataSkill();
			})();
			// GET DATA ABOUT FROM BACKEND 
			function getDataSkill() {
				Vue.axios.get(self.url.skill).then((response) => {
				  self.storedSkill = response.data;
				  console.log('DATA SKILL a: ', self.storedSkill)
				});
				getDataChar();
			};
			// GET CHARS
			// char.name ada 
			function getDataChar() {
				Vue.axios.get(self.url.character).then((response) => {
				  self.storedChar = response.data;
				  console.log('DATA CHAR a: ', self.storedChar)
				});

				setTimeout(function addCharSet() {
					for (var i = 0; i < self.storedChar.length; i++) {
						console.log('karakter di sortir')
						var char = self.storedChar[i];
						self.student.characters.push({
							id: char.id,
							name: char.name,
							score: 0
						});
					}
					// self.storedSkill = self.skillName(self.storedSkill);
					// self.storedChar = self.charName(self.storedChar);
					console.log('Hasil sortir karakter: ', self.student.characters)
				}, 300);

				setTimeout(function setSkill() {
					this.storedSkill = self.skillName(this.storedSkill)
				}, 500);

				setTimeout(function setChar() {
					this.storedChar = self.charName(this.storedChar);
				}, 500);
			};

			// ADD CHARACTERS TO STUDENT
			// this.addCharSet();

			// select disabled detector 
			console.log('disabled button before: ', this.isSelectDisabled)
			this.$root.$on('select-disabled', function(data) {
				this.isSelectDisabled = data;
				console.log('disabled button after: ', this.isSelectDisabled)
				if (this.isSelectDisabled == true) {
					// failed to get element 
					var selectBtn = document.querySelector('#major');
					console.log('JANCOKKKwe: ', this.isSelectDisabled, selectBtn)
					selectBtn.disabled = !selectBtn.disabled;
				}
			});
		},
		methods: {
			saveStudent(type){
				if(type == 'new'){
					// Make uppercase first char 
					const name = this.student.name[0].toUpperCase()+this.student.name.slice(1);
					const gender = this.student.gender[0].toUpperCase()+this.student.gender.slice(1);
					const address = this.student.address[0].toUpperCase()+this.student.address.slice(1);

					this.student.name = name;
					this.student.gender = gender;
					this.student.address = address;
					// POST STUDENT HERE
					this.student.created_at = new Date();
					this.student.major = this.selectedMajorId

					// di backend format datanya skill, bukan skills
					this.student.skill = this.student.skills
					this.student.character = this.student.characters

					console.log('POST THIS: ', this.student)
					this.$root.$emit('add-student', {
						url: this.url.student + '/create', 
						data: this.student
					});

					this.reset();
				}
				else if(type == 'edit'){
					// Make uppercase first char 
					const name = this.student.name[0].toUpperCase()+this.student.name.slice(1);
					const gender = this.student.gender[0].toUpperCase()+this.student.gender.slice(1);
					const address = this.student.address[0].toUpperCase()+this.student.address.slice(1);
					// PUT STUDENT HERE 
					var data = {
						name: name,
						gender: gender,
						birthday: this.student.birthday,
						address: address,
						email: this.student.email,
						status: this.student.status,
						major: this.student.major,
						generations: this.student.generations,
						skill: [],
						character: this.student.characters
					}



					// if data skill backend.length != skill student.length maka update tambahan 



					// di backend format datanya skill, bukan skills
					// console.log('Berapa skill: ', this.student.skills)
					for (var i = 0; i < this.student.skills.length; i++) {
						var skill = this.student.skills[i]
						data.skill.push({
							id: skill.id,
							name: skill.name,
							score: parseInt(skill.score)
						})
						console.log('edit nama')
					}

					console.log('EDIT THIS: ', this.student)
					this.$root.$emit('edit-student', {
						url: this.url.student + '/update/' + this.student.id, 
						data: data
					});

					// ngembalikin disabled 
					var selectBtn = document.querySelector('#major');
					console.log('JANCOKK2: ', this.isSelectDisabled, selectBtn)
					selectBtn.disabled = !selectBtn.disabled;

					this.reset();

				}else{
					alert('Error: Save Student type is not defined');
				}
			},
			// addCharSet() {
			// 	for (var i = 0; i < this.storedChar.length; i++) {
			// 		var char = this.storedChar[i];
			// 		this.student.characters.push({
			// 			id: char.id,
			// 			name: char.name,
			// 			score: 0
			// 		});
			// 	}
			// },
			skillName(val){
				for (var i = 0; i < this.storedSkill.length; i++) {
					var skill = this.storedSkill[i]
					if(val == skill.id){
						return skill.name
					}
				}
				console.log('Skill Namaeeeeee')
			},
			charName(val){
				for (var i = 0; i < this.storedChar.length; i++) {
					var char = this.storedChar[i]
					if(val == char.id){
						return char.name
					}
				}
				console.log('Char nameeeeee')
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
			},
			reset(){
				// RESET
				this.selectedMajor = null;
				this.selectedMajorId = 0;
				this.student = JSON.parse(JSON.stringify(_student));
				this.addCharSet();
				this.edit = false;
				this.isSelectDisabled = false;
			}
		},
		watch: {
			selectedMajor(val) {
				var self = this;

				// get major & major id
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
				this.selectedMajorId = major_id;

				// SEARCH SKILL 
				if(!this.student.created_at){
					this.student.skills = []
					console.log('masukk selected major suuu')
					for (var i=0; i<this.storedSkill.length; i++) {
						console.log('masuk selected major di for')
						var skill = this.storedSkill[i]
						if (major_id == skill.major_id) {
							this.student.skills.push({
								id: skill.id,
								name: skill.name,
								score: 0
							});
						}
					}
				}
				
				console.log('AFTER SELECTING MAJOR:', this.student)
			},
			isSelectDisabled(val) {
				if (val === true) {
					var selectBtn = document.querySelector(".major-wrapper select");
					console.log('JANCOKKK: ', this.isSelectDisabled)
					// selectBtn.disabled;
				}
			}
		},
		// filters: {
		// 	skillName(val){
		// 		for (var i = 0; i < this.storedSkill.length; i++) {
		// 			var skill = this.storedSkill[i]
		// 			if(val == skill.id){
		// 				return skill.name
		// 			}
		// 		}
		// 	},
		// 	charName(val){
		// 		for (var i = 0; i < this.storedChar.length; i++) {
		// 			var char = this.storedChar[i]
		// 			if(val == char.id){
		// 				return char.name
		// 			}
		// 		}
		// 	}
		// }
	};
</script>

<style scoped>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}


	/*dari login*/
	.profile select {
		padding: 10px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 25vw;
		box-sizing: border-box;
	}


	/*asli file ini*/

	.profile {
		display: inline-block;
		width: 80%;
		background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		padding: 20px;
	}

	.profile .header h3 {
		text-align: left;
		font-family: monospace !important;
	}

	.profile .flex-container {
		display: flex;
		justify-content: space-around;
	}

	.profile .submit-button button {
		margin: 20px 0 5px;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid #ccc;
		background-color: #c41e30;
		color: #fff;
	}

	.profile .profile-desc {
		width: 50%;
		border-right: 1px solid #ccc;
		margin-top: 20px;
		text-align: center;
		display: inline-block;
	}

	.profile .profile-desc .edit-bio {
		width: 80%;
		display: inline-block;
		text-align: left;
	}

	.profile .profile-desc .edit-bio .pic-profile {
		text-align: center;
	}

	.profile .profile-desc .edit-bio .pic-profile .ava-container {
		width: 100%;
	}

	.profile .profile-desc .edit-bio .pic-profile img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: inline-block;
	}

	.profile .profile-desc .edit-bio .pic-profile input {
		display: none;
	}

	.profile .profile-desc .edit-bio .pic-profile button {
		display: inline-block;
		border: 1px solid #ccc;
		background-color: transparent;
		padding: 10px 20px;
	}

	.profile .profile-desc .edit-bio form {
		width: 100%;
	}

	.profile .profile-desc .edit-bio p {
		margin: 10px 0;
	}

	.profile .profile-desc .edit-bio input[type=text],input[type=email],input[type=date] {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.profile .profile-desc .edit-bio label {
		margin: 10px 0;
	}

	.profile .profile-desc .edit-bio select {
		background-color: #fff;
		margin: 0;
		color: #b2b2b2;
	}

	.profile .profile-desc .edit-bio .gender {
		display: flex;
		align-items: center;
		color: #b2b2b2;
	}

	.profile .profile-desc .edit-bio .gender input[type=radio] {
		width: 25px;
		height: 25px;
		position: absolute;
		margin: 0;
	    opacity: 0;
	    cursor: pointer;
	}

	.profile .profile-desc .edit-bio .gender .checkbox-container {
		display: flex;
		align-items: center;
	}

	.profile .profile-desc .edit-bio .gender label {
		padding-right: 20px;
	}

	.profile .profile-desc .edit-bio .gender .checkbox-container .checkmark {
		justify-content: center;
		align-items: center;
		display: flex;
		width: 25px;
		height: 25px;
		margin-right: 5px;
		border: 1px solid #ccc;
		border-radius: 50%;
	}

	.profile .profile-desc .edit-bio .gender .checkbox-container input:checked ~ .checkmark:after {
		display: block;
	}

	.profile .profile-desc .edit-bio .gender .checkmark:after {
		content: '';
		display: none;
	}

	.profile .profile-desc .edit-bio .gender .checkbox-container .checkmark:after {
		width: 17px;
		height: 17px;
		border-radius: 50%;
		background-color: #000;
	}

	.profile .profile-desc .edit-bio .major-wrapper {
		width: 50%;
		display: inline-block;
	}

	.profile .profile-desc .edit-bio .major-wrapper select:disabled{

		display: inline-block;
		background: #ccc;
	}

	.profile .profile-desc .edit-bio .generation-wrapper {
		width: 50%;
		display: inline-block;
	}

	.profile .profile-desc .edit-bio .major {
		width: 90%;
	}

	.profile .profile-desc .edit-bio .generation {
		width: 40%;
	}

	/*right content*/
	.profile .skill-desc .edit-skill {
		width: 80%;
		display: inline-block;
		text-align: right;
		margin: 10px 0;
	}

	.profile .skill-desc .edit-skill .skill-list {
		width: 100%;
		margin-top: 20px;
	}

	.profile .skill-desc .edit-skill .skill {
		width: 100%;
		display: inline-block;
		text-align: left;
	}

	.profile .skill-desc .edit-skill .edit {
		text-align: left;
		display: inline-flex;
		align-items: center;
	}
	.profile .skill-desc .edit-skill .edit img {
		margin: 0 10px;
		display: inline-block;
	}

	.profile .skill-desc .edit-skill .edit input[type=number] {
		width: 55px;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		padding: 5px;
	}

	/*css dari skill-desc*/
	.student .profile .skill-desc {
		width: 50%;
		vertical-align: top;
		text-align: center;
		display: inline-block;
		margin-top: 20px;
	}

	.student .profile .skill-desc .edit-skill span {
		width: 100%;
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder;
		text-align: left;
		display: inline-block;
	}

	.student .profile .skill-desc .edit-skill .skill-container {
		width: 100%;
		display: inline-flex;
		align-items: center;
		margin: .25rem 0;
	}

	.student .profile .skill-desc .edit-skill .skill ul {
		padding: 0;
		margin: 0;
	}

	.student .profile .skill-desc .edit-skill .skill ul li {
		list-style: none;
		display: inline-flex;
		align-items: center;
	}

	.student .profile .skill-desc .edit-skill .skill ul li span {
		width: 20px;
		height: 20px;
		background-color: #8d8d8d;
		border-radius: 50%;
		margin-right: 20px;
	}

	/* studentlist buatan baru */
	.student-all .profile #myInput{
		background-image: url('../assets/logo/edit.png');
		background-position: 95% 10px;
		background-repeat: no-repeat;
		width: 25%;
		font-size: 16px;
		padding: 10px 20px 10px 10px;
		border: 1px solid #ddd;
		border-radius: 10px;
		margin-bottom: 12px;
		transform: translate(145%);
	}
	.student-all .profile .table-result table {
		width: 100%;
		border: 1px solid #8e8e8e;
		border-collapse: collapse;
	}
	.student-all .profile .table-result td {
		border-right: 1px solid #8e8e8e;
		font-size: 10pt;		
	}
	.student-all .profile .table-result th {
		border: 1px solid #8e8e8e;
		color: white;
		font-size: 15px;
	}
	.student-all .profile .table-result thead {
		background-color: #c41e30;
	}
	.student-all .profile .table-result th, tr, td {
		padding: 10px;
	}
</style>