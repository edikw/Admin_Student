<template>
	<div class="skill">
		<div class="title">
			<h1>SKILL</h1>
			<hr/>
		</div>
		<div class="content">
			<div class="main-container">
				<h4><img src="../assets/logo/major.png" style="margin-right:10px">Select Major</h4>

				<div class="select">
					<select id="major" class="major" v-model="selectedMajor" v-on:change="majorklik(selectedMajor)">
						<option v-for="(major, i) in majorData" >{{major.name}}</option>
						<!-- <option value="Modeler">Modeler</option> -->
						<!-- <option value="Compositor">Compositor</option> -->
						<!-- <option value="Programmer">Programmer</option> -->
					</select>
				</div>
				
				<div class="skills">
					<table>
						<thead>
							<tr v-show="selectedList.length >= 0">
								<td>No</td>
								<td>Name</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(skill, key) in skillData">
								<td>{{key+1}}</td>
								<td>{{skill.name}}</td>
								<td>
									<img src="../assets/logo/edit.png" v-on:click="editSkill(skill, key)" style="margin-right: .5rem">
									<img src="../assets/logo/delete.png" v-on:click="deleteSkill(skill, key)">
								</td>
							</tr>
							<tr v-show="selectedList.length >= 0">
								<td colspan="3">
									<add-item></add-item>
								</td>
							</tr>
						</tbody>
					</table>
				</div> <!-- .skills end -->
			</div>
		</div><!-- .content end -->
	</div>
</template>

<script>
	import AddItem from '../components/AddItem';
	import sweetalert from 'sweetalert';
	import Vue from 'vue'
	import axios from 'axios'
	import VueAxios from 'vue-axios'
	import App from '../App'
	import router from '../router'

	Vue.use(VueAxios, axios);

	export default {
		components: {
			AddItem,
		},
		data() {
			return {
				skillGet: App.data().url.skill_get,
				skillDelete: App.data().url.skill_delete,
				skillUpdate: App.data().url.skill_update,
				skillPost: App.data().url.skill_post,
				majorGet: App.data().url.major_get,
				majorGetId: App.data().url.major_get_id,
				selectedMajor: '',
				selectedMajorId: 0,
				selectedList: [],
				majors: [],

				skills: [],
				skillSet: [],
				newSkill: null,

				majorData: [],
				skillData: [],
				majorID: [],
			}
		},
		mounted() {
			var self = this;

			// this.getData();
			this.getMajor();

			this.$root.$on('add-skill', function(dataSkill) {
				console.log("INI ADDD SKILLLL", dataSkill)
				// self.newSkill = dataSkill;
				self.setAndRender(dataSkill)
				// console.log('emit add skill', self.newSkill)
			});

			// EDIT SKILL
			this.$root.$on('edited-skill', function(dataSkill) {
				self.putAndRender(dataSkill);
			});
		},
		watch: {
			newSkill(val){
				// if(val){
					
				// 	for (var i = 0; i < this.skillSet.length; i++) {
				// 		if(this.selectedMajor == this.skillSet[i].major){
				// 			console.log("INI selected major", this.selectedMajor);
				// 			console.log('INI skill set[i', this.skill[i].major);
				// 			this.skillSet[i].list.push(val);
				// 		}
				// 	}

				// 	this.setAndRender(this.skillSet, 'dataSkills');
				// }
			},
			selectedMajor(val) {
				console.log('val', val)

				for (var i = 0; i < this.skillSet.length; i++) {
					console.log('WWWWW', this.skillSet[i])
					if(val == this.skillSet[i].major){
						this.selectedList = this.skillSet[i].list;
						this.selectedMajorId = i+1;
						console.log(this.selectedMajorId)
					}
				}
				this.$root.$emit('major-change', val);
			}
		},
		methods: {
			majorklik(e){
				this.skillData = [];
				this.majorID = [];
				this.majorData.map( data => {
					if (e == data.name){
						axios.get(this.majorGetId + data.id).then(res => {
							res.data.skill.map(data => {
								this.skillData.push(data)
								this.majorID.push(data.major_id)
							})
						})
					}
				})

			},
			getMajor() {
				axios.get(this.majorGet).then(res => {
					console.log(res);
					res.data.map(data => {
						this.majorData.push(data)
					})
				})
			},
			getData() {
				var self = this
				axios.get(this.skillGet).then((response) => {
				  if(response.status == 200){
					  console.log(response)
				  }
				  else{
				  	console.log("GAGAL BOSKU")
				  }
				});
				setTimeout(function getSkillSet() {
					self.majors = self.sortByMajor(self.skills);

					if(self.skills.length>0){
						self.skillSet = self.getSkillsetFromBackend();
					}else{
						// BACKUP
						self.skillSet = [{
							major: 'Animator',
							list: ['Animate', 'Rigging', 'Blender', 'Maya', 'Drawing']
						}];
					}
				}, 300);
			},
			getSkillsetFromBackend(){
				var res = [];
				for (var i = 0; i < this.majors.length; i++) {
					var major;

					if(this.majors[i] == 1){
						major = '3D Animator'
					}
					else if(this.majors[i] == 2){
						major = '3D Modeller'
					}
					else if(this.majors[i] == 3){
						major = 'Compossitor'
					}
					else if(this.majors[i] == 4){
						major = 'Programmer'
					}else{
						major = 'Pemancing'
					}

					var list = [];

					for (var j = 0; j < this.skills.length; j++) {
						var s = this.skills[j];
						if(s.major_id == this.majors[i]){
							list.push({
								id: s.id,
								name: s.name,
							});
						}
					}

					res.push({
						major: major,
						list: list
					});
				}

				return res.sort();
			},
			sortByMajor(arr){
				var majors = [];
				for (var i = 0; i < arr.length; i++) {
					var skill = arr[i];
					if(i==0){
						majors.push(skill.major_id)
					}else{
						var ada = false;
						for (var j = 0; j < majors.length; j++) {
							var major = majors[j];
							if(skill.major_id == major){
								ada = true;
							}
						}
						if(!ada){
							majors.push(skill.major_id);
						}
					}
				}
				return majors.sort();
			},
			editSkill(skill, key) {
				var data = {
					major_id: skill.major_id,
					major: this.selectedMajor, 
					skill: skill, 
				}
				this.$root.$emit('edit-skill', data);
			},
			deleteSkill(skill, key) {

				axios.delete(this.skillDelete + skill.id).then(res => {
					if(res.status == 200){
						sweetalert('Sukses Menghapus Skill', 'success')
						// this.render();
						this.majorklik();
					}
				}).catch(e => {
					sweetalert('Gagal Menghapus Skill. Silahkan coba lagi');
					// this.render();
				})
			},
			putAndRender(data){
				// PUT 
				var id = data.skill.id;
				// var url = this.url.skill + '/update/' + id;
				var data = {
					name: data.skill.name,
					description: '',
					major_id: data.major_id
				};

				axios.put(this.skillUpdate + id, data).then(res => {
					if(res.status == 200){
						sweetalert('Sukses Update Skill', 'success');
						// this.render();
						this.majorklik();
					}
				}).catch(e => {
					sweetalert('Gagal Update Skill. Silahkan coba lagi');
				});
			},
			setAndRender(data){

				var backend_data = {
					major_id: this.majorID[0],
					name: data,
					description: 'no description.'
				};
				console.log("yang dikirim", backend_data)

				axios.post(this.skillPost, backend_data).then(res =>{
					if(res.status == 200){
						sweetalert('Sukses Menambahkan Skill', 'success')
						// this.render();
						this.majorklik();
					}
				}).catch(e => {
					sweetalert('Gagal Menambahkan Skill')
					// this.render()
					
				})

			},
			render(){
				axios.get(this.skillGet).then((response) => {
				  	this.skills = response.data;
					for (var i = 0; i < this.skillSet.length; i++) {
						var set = this.skillSet[i];
						if(this.selectedMajor == set.major){
							this.selectedList = set.list;
							console.log("YES", this.selectedList)
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	.skill {
		padding-top: 2rem;
	}
	.skill .main-container {
		width: 40%;
		display: inline-block;
	}
	.skill .content {
		margin: auto;
		width: 80%;
		background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		padding: 20px;
		text-align: center;
	}
	.skill .content select {
		width: 150px;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background: transparent;
	}
	.skill .title h1 {
		text-align: center;
		color: #c41e30;
		font-family: monospace, sans-serif;
		margin: 0;
	}
	.skill .title hr {
		width: 50%;
	}
</style>