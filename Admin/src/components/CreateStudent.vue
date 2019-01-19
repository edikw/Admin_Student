<template>
	<div class="student-all">
		<div class="profile">
			<span>ADD PROFILE</span>
			<div class="profile-desc">
				<div class="edit-bio">
					<form>
						<div class="pic-profile">
							<div class="ava-container">
								<img v-bind:src="profilePic" @click="openUpload">
							</div>
							<input type="file" name="file" id="profileIMG" class="inputfile" @change="onFilePicked">
							<button @click="openUpload">Choose file</button>
						</div>
						<div class="field">
							<p v-show="nullName">Name field must be filled</p>
							<p><img src="../assets/logo/name.png" style="margin-right:10px">Name</p>
							<input v-model="nameText" type="text">
						</div>
						<div class="field">
							<p v-show="nullGender">Gender field must be filled</p>
							<p><img src="../assets/logo/gender.png" style="margin-right:10px">Gender</p>
							<div class="gender">
								<label class="checkbox-container">
									<input type="radio" name="gender" v-model="genderText" value="Male">
									<span class="checkmark"></span>
									Male
								</label>
								<label class="checkbox-container">
									<input type="radio" name="gender" v-model="genderText" value="Female">
									<span class="checkmark"></span>
									Female
								</label>
								<label class="checkbox-container">
									<input type="radio" name="gender" v-model="genderText" value="Shemale">
									<span class="checkmark"></span>
									Shemale
								</label>
							</div>
						</div>
						<div class="field">
							<p v-show="nullbirthday">Birthday field must be filled</p>
							<p><img src="../assets/logo/birthday.png" style="margin-right:10px">Birthday</p>
							<input v-model="birthdayText" type="date">
						</div>
						<div class="field">
							<p v-show="nullAddress">Address field must be filled</p>
							<p><img src="../assets/logo/address.png" style="margin-right:10px">Address</p>
							<input v-model="addressText" type="text">
						</div>
						<div class="field">
							<p v-show="nullEmail">Email field must be filled</p>
							<p><img src="../assets/logo/email.png" style="margin-right:10px">Email</p>
							<input type="email" v-model="emailText">
						</div>
						<div class="field">
							<p v-show="nullStatus">Status field must be filled</p>
							<p><img src="../assets/logo/status.png" style="margin-right:10px">Status</p>
							<select id="status" class="status" v-model="statusText">
								<option>Studying</option>
								<option>Graduated</option>
							</select>
						</div>
						<div class="major-gen-container">
							<div class="major-wrapper">
								<p><img src="../assets/logo/major.png" style="margin-right:10px">Major</p>
								<select id="major" class="major" v-model="majorText">
									<option>Animator</option>
									<option>Modeler</option>
									<option>Compositor</option>
									<option>Programmer</option>
								</select>
							</div>
							<div class="generation-wrapper">
								<p v-show="nullGeneration">Generation field must be filled</p>
								<p>Generation</p>
								<select id="generation" class="generation" v-model="generationText">
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
						<div class="skill-container" v-for="(skill,key) in selectedList">
								<div class="skill">
									<ul>
										<li><span></span>{{skill}}</li>
									</ul>
								</div>
								<div class="edit">
									<input type="text" :key="key" v-model="inputValueSkill" placeholder="0">
								</div>
							
						</div>

						<!-- CHARACTER MANUAL				 -->
						<span>CHARACTER</span>
						
						<!-- CHARACTER LOOPING -->
						<div class="skill-container" v-for="char in storedChar">
							<div class="skill">
								<ul>
									<li><span></span>{{char}}</li>
								</ul>
							</div>
							<div class="edit">
								<input type="text" v-model="inputValueChar" placeholder="0">
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="submit-button" v-show="!edit">
				<button v-on:click="sendForm()">SUBMIT</button>
			</div>
			<div class="submit-button" v-show="edit">
				<button v-on:click="showEdit()">EDIT</button>
			</div>
		</div>
	</div>
</template>

<script>

	import sweetalert from 'sweetalert';
	// import AddSkill from './AddSkill';
	// import AddCharacter from './AddCharacter';
	// import SkillDesc from '../components/SkillDesc';

	export default {
		props: ['student'],
		components: {
			// SkillDesc,
			// AddSkill,
			// AddCharacter
		},
		data() {
			return {
				listNum: 1,
				profilePic: require('../assets/logo/foto_size.png'),
				nameText: '',
				genderText: '',
				birthdayText: '',
				addressText: '',
				emailText: '',
				statusText: '',
				majorText: '',
				generationText: '',
				edit: false,

				photoshopText: '',
				coreldrawText: '',
				illustratorText: '',
				blenderText: '',
				cinema4dText: '',

				responsibilityText: '',
				communicativeText: '',
				creativeText: '',
				inovativeText: '',

				stored: [],
				key: '',
				// TAMBAHAN BARU
				storedChar: null,
				storedSkill: null,
				selectedMajor: '',
				selectedList: [],
				inputValueSkill: null,
				inputValueChar: null,

				nullName: false,
				nullGender: false,
				nullbirthday: false,
				nullAddress: false,
				nullEmail: false,
				nullStatus: false,
				nullMajor: false,
				nullGeneration: false,

				addSkill: false,
				addChar: false,
				skills: [],
				keySkillText: '',
				valueSkillText: '',
				keyCharacterText: '',
				valueCharacterText: '',

			}
		},
		mounted() {
			var self = this;

			// GET CHARS
			this.storedChar = JSON.parse(localStorage.getItem("dataCharacters"));
			console.log('DATA CHAR: ', this.storedChar);

			// GET SKILLS
			this.storedSkill = JSON.parse(localStorage.getItem("dataSkills"));
			console.log('DATA SKILL: ', this.storedSkill);

			this.$root.$on('show-edit', function(data) {
				console.log('from show edit: ', data);
				self.profilePic = data.student.pic;
				self.nameText = data.student.name;
				self.nameText = data.student.name;
				self.genderText = data.student.gender,
				self.birthdayText = data.student.birthday,
				self.addressText = data.student.address;
				self.emailText = data.student.email;
				self.statusText = data.student.status;
				self.majorText = data.student.major;
				self.generationText = data.student.generation;
				self.edit = true;

				self.photoshopText = data.student.photoshop;
				self.coreldrawText = data.student.coreldraw;
				self.illustratorText = data.student.illustrator;
				self.blenderText = data.student.blender;
				self.cinema4dText = data.student.cinema4d;

				self.responsibilityText = data.student.responsibility;
				self.communicativeText = data.student.communicative;
				self.creativeText = data.student.creative;
				self.inovativeText = data.student.inovative;

				// console.log('key: ', data.key)

				self.key = data.key;
			});

			//Tambahan Skill
			// this.$root.$on('add-skill', function(dataSkill) {
			// 	self.keySkillText = dataSkill.keySkill;
			// 	self.valueSkillText = dataSkill.valueSkill;
			// });
			// //Tambahan Character
			// this.$root.$on('add-character', function(dataCharacter) {
			// 	self.keyCharacterText = dataCharacter.keyCharacter;
			// 	self.valueCharacterText = dataCharacter.valueCharacter;
			// });
		},
		methods: {
			sendForm() {
				this.nullName = false;
				this.nullGender = false;
				this.nullbirthday = false;
				this.nullAddress = false;
				this.nullEmail = false;
				this.nullStatus = false;
				this.nullMajor = false;
				this.nullGeneration = false;

				if (this.nameText.length != null && this.genderText.length != null && this.birthdayText.length !=null && this.addressText.length != null && this.emailText.length != null && this.statusText.length != null && this.majorText != null && this.generationText.length != null) {
					this.listNum = this.listNum + 1;

					console.log('Semua field terisi!!');
					console.log('VALUE SKILL: ', this.inputValueSkill);
					console.log('VALUE CHAR: ', this.inputValueChar);

					const num = this.listNum;
					const pic = this.profilePic;
					const name = this.nameText[0].toUpperCase() + this.nameText.slice(1);
					const gender = this.genderText;
					const birthday = this.birthdayText;
					const address = this.addressText[0].toUpperCase() + this.addressText.slice(1);
					const email = this.emailText;
					const status = this.statusText;
					const major = this.majorText;
					const generation = this.generationText;

					// const photoshop = this.photoshopText;
					// const coreldraw = this.coreldrawText;
					// const illustrator = this.illustratorText;
					// const blender = this.blenderText;
					// const cinema4d = this.cinema4dText;

					// const responsibility = this.responsibilityText;
					// const communicative = this.communicativeText;
					// const creative = this.creativeText;
					// const inovative = this.inovativeText;

					// save to local storage
					var dataStudents
					var students = [];
					var student = {
						pic: pic,
						num: num,
						name: name,
						gender: gender,
						birthday: birthday,
						address: address,
						email: email,
						status: status,
						major: major,
						generation: generation,

						// photoshop: photoshop,
						// coreldraw: coreldraw,
						// illustrator: illustrator,
						// blender: blender,
						// cinema4d: cinema4d,

						// responsibility: responsibility,
						// communicative: communicative,
						// creative: creative,
						// inovative: inovative,

						edit: false
					}

					var stored;
					stored = JSON.parse(localStorage.getItem('dataStudents'));

					stored.push(student);

					localStorage.setItem('dataStudents', JSON.stringify(stored));

					this.$root.$emit('kirim-add', stored);

					//NGOSONGIN FIELD
					this.profilePic = require('../assets/logo/foto_size.png');
					this.nameText = '';
					this.genderText = '';
					this.birthdayText = '';
					this.addressText = '';
					this.emailText = '';
					this.statusText = '';
					this.majorText = '';
					this.generationText = '';

					// this.photoshopText = '';
					// this.coreldrawText = '';
					// this.illustratorText = '';
					// this.blenderText = '';
					// this.cinema4dText = '';

					// this.responsibilityText = '';
					// this.communicativeText = '';
					// this.creativeText = '';
					// this.inovativeText = '';

					sweetalert('Added!', 'Student has been added', 'success');
				} else {
					// If there is empty field
					if (this.nameText <= 0) {
						var self = this;
						this.nullName = true;
						sweetalert({
							title: 'Warning!',
							text: 'Name isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullName = false;
						});
					} else if (this.genderText <= 0) {
						var self = this;
						this.nullGender = true;
						sweetalert({
							title: 'Warning!',
							text: 'Gender isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullGender = false;
						});
					} else if (this.birthdayText <= 0) {
						var self = this;
						this.nullBirthday = true;
						sweetalert({
							title: 'Warning!',
							text: 'Birthday isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullGender = false;
						});
					} else if (this.addressText <= 0) {
						var self = this;
						this.nullAddress = true;
						sweetalert({
							title: 'Warning!',
							text: 'Address isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullGender = false;
						});
					} else if (this.emailText <= 0) {
						var self = this;
						this.nullEmail = true;
						sweetalert({
							title: 'Warning!',
							text: 'Email isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullGender = false;
						});
					} else if (this.statusText <= 0) {
						var self = this;
						this.nullStatus = true;
						sweetalert({
							title: 'Warning!',
							text: 'Status isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullGender = false;
						});
					} else if (this.majorText <= 0) {
						var self = this;
						this.nullMajor = true;
						sweetalert({
							title: 'Warning!',
							text: 'Major isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullGender = false;
						});
					} else if (this.generationText <= 0) {
						var self = this;
						this.nullGeneration = true;
						sweetalert({
							title: 'Warning!',
							text: 'Generation isnt filled',
							type: 'error',
							icon: 'error'
						}).then(function() {
							// self.nullGender = false;
						});
					}
				}
			},
			showEdit() {

				this.edit = false;

				const num = this.listNum;
				const name = this.nameText[0].toUpperCase() + this.nameText.slice(1);
				const gender = this.genderText;
				const birthday = this.birthdayText;
				const address = this.addressText[0].toUpperCase() + this.addressText.slice(1);
				const email = this.emailText;
				const status = this.statusText;
				const major = this.majorText;
				const generation = this.generationText;

				const photoshop = this.photoshopText;
				const coreldraw = this.coreldrawText;
				const illustrator = this.illustratorText;
				const blender = this.blenderText;
				const cinema4d = this.cinema4dText;

				const responsibility = this.responsibilityText;
				const communicative = this.communicativeText;
				const creative = this.creativeText;
				const inovative = this.inovativeText;

				const key = this.key;

				console.log('masuk edit: ', this.key);

				// Bentuk JSON Data Student
				var students = []
				var student = {
					num: num,
					name: name,
					gender: gender,
					birthday: birthday,
					address: address,
					email: email,
					status: status,
					major: major,
					generation: generation,

					photoshop: photoshop,
					coreldraw: coreldraw,
					illustrator: illustrator,
					blender: blender,
					cinema4d: cinema4d,

					responsibility: responsibility,
					communicative: communicative,
					creative: creative,
					inovative: inovative, 

					key,
				}


				//PUSHHHH
				var stored;
				stored = JSON.parse(localStorage.getItem('dataStudents'));

				stored.map((siswa, i) => {
					if (i == key) {
						console.log('ini i:', i);
						stored[i] = student;
					}
				});

				console.log('data dikirim:', stored)
				localStorage.setItem('dataStudents', JSON.stringify(stored));

				this.$root.$emit('kirim-edit', stored);

				//NGOSONGIN FIELD
				this.profilePic = require('../assets/logo/foto_size.png');
				this.nameText = '';
				this.genderText = '';
				this.birthdayText = '';
				this.addressText = '';
				this.emailText = '';
				this.statusText = '';
				this.majorText = '';
				this.generationText = '';

				this.photoshopText = '';
				this.coreldrawText = '';
				this.illustratorText = '';
				this.blenderText = '';
				this.cinema4dText = '';

				this.responsibilityText = '';
				this.communicativeText = '';
				this.creativeText = '';
				this.inovativeText = '';

				sweetalert('Updated!', 'Student has been updated', 'success');

			},
			// addingSkill() {
			// 	console.log('ADD SKILL');
			// 	this.addSkill = true;
			// 	const constSkill = this.addSkill;
			// 	this.$root.$emit('buka-skill', constSkill);
			// },
			addingChar() {
				console.log('ADD CHARACTER');
				this.addChar = true;
			},
			openUpload() {
				document.getElementById("profileIMG").click()
			},
			onFilePicked(event) {
				const files = event.target.files;
				const fileReader = new FileReader()
				fileReader.onload = (e) => {
					this.profilePic = e.target.result
				}
				fileReader.readAsDataURL(files[0])
				this.image = files[0]

				console.log(event.target.result)
			}
		},
		watch: {
			majorText(val) {
				console.log('select major: ', val);
				for (var i=0; i<this.storedSkill.length; i++) {
					if (val == this.storedSkill[i].major) {
						this.selectedList = this.storedSkill[i].list;
						console.log('SKILLnya: ', this.selectedList);
					}
				}
				//
			},
			inputValueSkill(val) {
				console.log(val)
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

	/*css dari student*/
	.student {
		width: 100%;
		top: 5%;
		text-align: center;
		display: inline-block;
		position: absolute;
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


	/*dari login*/
	.login .input .content input[type=text], select {
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
		margin: 20px 0;
		display: inline-block;
		width: 80%;
		background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		padding: 20px;
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

	.profile .profile-desc .edit-bio .birthday {
		width: 20%;
		margin-right: 28px;
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

	.profile .profile-desc .edit-bio .major-gen-container {
		width: 100%;
	}

	.profile .profile-desc .edit-bio .major-wrapper {
		width: 50%;
		display: inline-block;
	}

	.profile .profile-desc .edit-bio .generation-wrapper {
		width: 50%;
		display: inline-block;
	}

	.profile .profile-desc .edit-bio .major {
		width: 90%;
		margin-right: 0px;
	}

	.profile .profile-desc .edit-bio .generation {
		width: 40%;
		margin-right: 20px;
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

	.profile .skill-desc .edit-skill .edit input[type=text] {
		width: 40px;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	/*ngaruh di studentlispan*/

	/*.student-list {
		margin: 20px, 0, 0, 0;
		display: block;
		width: 80%;
		border-top: 1px solid #8e8e8e;
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
	}*/



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