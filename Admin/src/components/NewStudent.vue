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
							<div class="pic-profile" v-if="!edit">
								<div class="ava-container">
									<img v-bind:src="student.profile_picture" @click="openUpload">
								</div>
								<input type="file" name="file" id="profileIMG" class="inputfile" @change="onFilePicked">
								<button @click="openUpload" v-if="!proses">Choose file</button>
								<button v-if="proses">Please wait...</button>
							</div>

							<div class="pic-profile" v-if="edit">
								<div class="ava-container">
									<img v-bind:src="student.profile_picture" @click="openUpload">
								</div>
								<input type="file" name="file" id="profileIMG" class="inputfile" @change="onFilePickedEdit">
								<button v-if="!proses" @click="openUpload">Choose file</button>
								<button v-if="proses">Please wait...</button>
							</div>

							<div class="field">
								<p><img src="../assets/logo/name.png" style="margin-right:10px">Name</p>
								<input v-model="student.name" type="text">
								<p class="warning" v-show="nullName">* Name field must be filled</p>
							</div>
							<div class="field">
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
								<p class="warning" v-show="nullGender">* Gender field must be filled</p>
							</div>
							<div class="field">
								<p><img src="../assets/logo/birthday.png" style="margin-right:10px">Birthday</p>
								<input v-model="student.birthday" type="date">
								<p class="warning" v-show="nullbirthday">* Birthday field must be filled</p>
							</div>
							<div class="field">
								<p><img src="../assets/logo/address.png" style="margin-right:10px">Address</p>
								<input v-model="student.address" type="text">
								<p class="warning" v-show="nullAddress">* Address field must be filled</p>
							</div>
							<div class="field">
								<p><img src="../assets/logo/email.png" style="margin-right:10px">Email</p>
								<input type="email" v-model="student.email">
								<p class="warning" v-show="nullEmail">* Email field must be filled</p>
							</div>
							<div class="field">
								<p><img src="../assets/logo/status.png" style="margin-right:10px">Status</p>
								<select id="status" class="status" v-model="student.status">
									<option>Studying</option>
									<option>Graduated</option>
								</select>
								<p class="warning" v-show="nullStatus">* Status field must be filled</p>
							</div>
							<div class="major-gen-container">
								<div class="major-wrapper" >
									<p><img src="../assets/logo/major.png" style="margin-right:10px">Major</p>
									<select id="major" class="major" v-model="selectedMajor">
										<option>3D Animator</option>
										<option>3D Modeller</option>
										<option>Compossitor</option>
										<option>Programmer</option>
									</select>
									<p class="warning" v-show="nullMajor">* Major field must be filled</p>
								</div>
								<div class="generation-wrapper">
									<p>Generation</p>
									<select id="generation" class="generation" v-model="student.generations">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
									<p class="warning" v-show="nullGeneration">* Generation field must be filled</p>
								</div>
							</div>
						</form>
					</div>
				</div>

				<div class="skill-desc" v-if="!edit">
					<div class="edit-skill">
						<div class="container">
							<span>SKILL</span>
							<!-- SKILL LOOPING -->
							<p class="charValue" v-if="student.skills.length > 0">* Value max 10</p>
							<div class="skill-container" v-for="(skill,i) in student.skills" :key="i">
								<div class="skill">
									<ul>
										<li>
											<span></span> {{skill.name}}
										</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" max="10" min="0" :key="key" v-model="skill.score" placeholder="0">
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
							<p class="charValue" v-if="student.characters.length > 0">* Value max 10</p>
							<div class="skill-container" v-if="student" v-for="(char, j) in student.characters" :key="j">
								<div class="skill">
									<ul>
										<li><span></span>{{char.name}}</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" max="10" min="0" v-model="char.score" placeholder="0">
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- ///////////////////////////////////// -->
				<div class="skill-desc" v-if="edit">
					<div class="edit-skill">
						<div class="container">
							<span>SKILL</span>

							<div class="skill-container" v-for="(skill,key) in student.skills" :key="skill.name">
								<div class="skill">
									<ul>
										<li>
											<span></span> {{skill.name}}
										</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" max="10" min="0" :key="key" v-model="skill.score" placeholder="0">
								</div>
							</div>
							<div class="skill-container" v-if="stud.skills.length < 0">
								<div class="skill">
									<ul>
										<li>
											<span></span> <i>No skills.</i>
										</li>
									</ul>
								</div>
							</div>

							<span>CHARACTER</span>
							<p class="charValue" v-if="student.characters.length > 0">* Value max 10</p>
							<div class="skill-container" v-for="(char, i) in student.characters" :key="i">
								<div class="skill">
									<ul>
										<li><span></span>{{char.name}}</li>
									</ul>
								</div>
								<div class="edit">
									<input type="number" min="0" max="10" placeholder="0" v-model="char.score">
								</div>
							</div>

						</div>
					</div>
				</div>
				<!-- ////////////////////////////////////// -->
			</div>
			<div class="submit-button" v-show="!edit">
				<button v-on:click="saveStudent">SUBMIT</button>
			</div>
			<div class="submit-button" v-show="edit">
				<button v-on:click="editStudent">EDIT</button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import App from '../App'

	var _student = {
		created_at: null,
		name: null,
		profile_picture: require('../assets/logo/foto_size.png'),
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
		profile_picture: null,
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
				skillGet: App.data().url.skill_get,
				characterGet: App.data().url.character_get,
				studentUpdate: App.data().url.student_update,
				studentPost: App.data().url.student_post,
				studentPostFile: App.data().url.post_file,
				studentUpdateFile: App.data().url.student_update_img,

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
				catchEmit: false,
				proses: false
			}
		},
		mounted() {
			var self = this;

			this.$root.$on('show-edit', function(data) {
				if(self.catchEmit === false){
					self.catchEmit = true;
					self.student.skills = []
					self.student.characters = []
					setTimeout(function(){
						self.student = data;
						if (self.student.major == 1) {
							self.selectedMajor = '3D Modeller';
						} else if (self.student.major == 2) {
							self.selectedMajor = '3D Animator';
						} else if (self.student.major == 3) {
							self.selectedMajor = 'Compossitor';
						} else if (self.student.major == 4) {
							self.selectedMajor = 'Programmer';
						} else {
							self.selectedMajor = data.major;
						}
						self.edit = true;
					}, 500)
				}
			});

			// GET DATA DARI EDIT BARU 
			this.$root.$on('show-edit-baru', function(data) {
				self.student.address = data.data.address;
				self.student.birthday = data.data.birthday;
				self.student.email = data.data.email;
				self.student.gender = data.data.gender;
				self.student.generations = data.data.generations;
				self.student.id = data.data.id;
				self.student.major = data.data.major;
				self.student.name = data.data.name;
				self.student.status = data.data.status;
				self.student.skills = data.data.skills;
				self.student.characters = data.data.characters;
				self.student.profile_picture = data.data.profile_picture;
				self.edit = true;
			});

			this.$root.$on('select-disabled', function(data) {
				self.isSelectDisabled = data;
				if (self.isSelectDisabled == true) {
					var selectBtn = document.querySelector('#major');
					selectBtn.disabled = !selectBtn.disabled;
				}
			});

			getDataSkill();

			// GET DATA ABOUT FROM BACKEND 
			function getDataSkill() {
				axios.get(self.skillGet).then((response) => {
					self.storedSkill = response.data;
				});
				getDataChar();
			}
			// GET CHARS
			function getDataChar() {
				axios.get(self.characterGet).then((response) => {
					self.storedChar = response.data;
					if(self.storedChar.length > 0){
						for (var i = 0; i < self.storedChar.length; i++) {
							var char = self.storedChar[i];
							self.student.characters.push({
								id: char.id,
								name: char.name,
								score: 0
							});
						}

					}
				});

				if(self.stored.length > 0){
					self.storedSkill = self.skillName(self.storedSkill)
				}
				if(self.storedChar.length > 0){
					self.storedChar = self.charName(self.storedChar);
				}
			}
		},
		methods: {
			editStudent(){

				// const name = this.student.name[0].toUpperCase()+this.student.name.slice(1);
				// const gender = this.student.gender[0].toUpperCase()+this.student.gender.slice(1);
				// const address = this.student.address[0].toUpperCase()+this.student.address.slice(1);
				
				this.$root.$emit('edit-student', this.student);

				// ngembalikin disabled 
					var selectBtn = document.querySelector('#major');
					selectBtn.disabled = !selectBtn.disabled;

				this.reset();
			},

			saveStudent(){

				if(this.student.name == null){
					this.nullName = true;
				} else if(this.student.gender == null ){
					this.nullGender = true;
				} else if(this.student.birthday == null){
					this.nullbirthday = true;
				} else if(this.student.address == null){
					this.nullAddress = true;
				} else if(this.student.email == null){
					this.nullEmail = true;
				} else if(this.student.status == null){
					this.nullStatus = true;
				} else if(this.selectedMajor == null){
					this.nullMajor = true;
				} else if(this.student.generations == null){
					this.nullGeneration = true;
				} else {
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
					this.student.skills = this.student.skills
					this.student.characters = this.student.characters
					this.student.profile_picture = this.student.profile_picture
					this.student.status = this.student.status
					this.student.birthday = this.student.birthday
					this.$root.$emit('add-student', this.student);

					this.reset();
					this.nullName = false; 
					this.nullGender = false; 
					this.nullbirthday = false; 
					this.nullAddress = false; 
					this.nullEmail = false; 
					this.nullStatus = false; 
					this.nullMajor = false; 
					this.nullGeneration = false; 

				}

			},
			skillName(val){
				for (var i = 0; i < this.storedSkill.length; i++) {
					var skill = this.storedSkill[i]
					if(val == skill.id){
						return skill.name
					}
				}
			},
			charName(val){
				for (var i = 0; i < this.storedChar.length; i++) {
					var char = this.storedChar[i]
					if(val == char.id){
						return char.name
					}
				}
			},
			openUpload() {
				document.getElementById("profileIMG").click()
			},
			onFilePicked(event) {
				this.proses = true;
				var self = this

				const image = event.target.files[0];

				let data = new FormData();
				data.append('images', image);

				let request = new XMLHttpRequest();
				request.open('POST', this.studentPostFile);
				request.send(data);
				request.onreadystatechange = function () {
					if(request.readyState === 4 && request.status === 200) {
						var res = JSON.parse(request.responseText);
						res.uploaded_image.map(data => {
							self.student.profile_picture = data.size.small;
						})
						self.proses = false;
					}
				}

			},
			onFilePickedEdit(event){
				this.proses = true;
				var self = this

				const image = event.target.files[0];

				let data = new FormData();
				data.append('profile_picture', image);

				let request = new XMLHttpRequest();
				request.open('POST', this.studentUpdateFile + this.student.id);
				request.send(data);
				request.onreadystatechange = function () {
					if(request.readyState === 4 && request.status === 200) {
						var res = JSON.parse(request.responseText);
						res.uploaded_image.map(data => {
							self.student.profile_picture = data.size.small; 
						})
						self.proses = false;
					}
				}
			},
			reset(){
				// RESET
				this.selectedMajor = null;
				this.selectedMajorId = 0;
				this.student = JSON.parse(JSON.stringify(_student));
				// this.addCharSet();
				this.edit = false;
				this.isSelectDisabled = false;
			}
		},
		watch: {
			selectedMajor(val) {
				// get major & major id
				var major_id = null;
				if (val == '3D Modeller') {
					major_id = 1;
				} else if (val == '3D Animator') {
					major_id = 2;
				} else if (val == 'Compossitor') {
					major_id = 3;
				} else if (val == 'Programmer') {
					major_id = 4;
				} else {
					major_id = 0;
				}
				this.selectedMajorId = major_id;

				// SEARCH SKILL 
				if(!this.student.created_at){
					this.student.skills = []
					for (var i=0; i < this.storedSkill.length; i++) {
						var skill = this.storedSkill[i]
						if (major_id == skill.major_id) {
							this.student.skills.push({
								id: skill.id,
								description: '',
								major_id: this.selectedMajorId,
								name: skill.name,
								skill_id: skill.id,
								student_id: this.student.id,
								score: 0
							});
						}
					}
				}
			},
			isSelectDisabled(val) {
				if (val === true) {
					var selectBtn = document.querySelector(".major-wrapper select");
					selectBtn.disabled;
				}
			}
		}
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
	.warning{
		margin-top: 0;
		color: red;
		padding: 0;
		font-size: 12px;
	}
	.charValue {
		margin-bottom: 0;
		font-size: 12px;
		padding: 0;
	}
</style>