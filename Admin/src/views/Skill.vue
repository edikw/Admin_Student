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
					<select id="major" class="major" v-model="selectedMajor">
						<option value="Animator">Animator</option>
						<option value="Modeler">Modeler</option>
						<option value="Compositor">Compositor</option>
						<option value="Programmer">Programmer</option>
					</select>
				</div>
				
				<div class="skills">
					<table>
						<thead>
							<tr v-show="selectedList.length>0">
								<td>No</td>
								<td>Name</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(skill, key) in selectedList">
								<td>{{key+1}}</td>
								<td>{{skill.name}}</td>
								<td>
									<img src="../assets/logo/edit.png" v-on:click="editSkill(skill, key)" style="margin-right: .5rem">
									<img src="../assets/logo/delete.png" v-on:click="deleteSkill(skill, key)">
								</td>
							</tr>
							<tr>
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
				url: App.data().url,
				selectedMajor: '',
				selectedMajorId: 0,
				selectedList: [],
				majors: [],
				skills: [],
				skillSet: [],
				newSkill: null
			}
		},
		mounted() {
			var self = this;

			window.onload = (function(){
				getData();
			})();

			// GET SKILLSET
			this.skills = router.app.skill;
			function getData() {
				Vue.axios.get(self.url.skill).then((response) => {
				  self.skills = response.data;
				  console.log('DATA SKILL: ', self.skills)
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
			}

			// this.getSkillset();

			// ADD NEW SKILL
			this.$root.$on('add-skill', function(dataSkill) {
				self.newSkill = dataSkill;
			});

			// EDIT SKILL
			this.$root.$on('edited-skill', function(dataSkill) {
				// console.log('EDITED: ', dataSkill);
				self.putAndRender(dataSkill);
			});
		}, 
		watch: {
			newSkill(val){
				if(val){
					// console.log('NEW SKILL: ', val);
					
					for (var i = 0; i < this.skillSet.length; i++) {
						if(this.selectedMajor == this.skillSet[i].major){
							this.skillSet[i].list.push(val);
						}
					}

					this.setAndRender(this.skillSet, 'dataSkills');
				}
			},
			selectedMajor(val) {
				// console.log('SELECTED MAJOR: ', val)
				for (var i = 0; i < this.skillSet.length; i++) {
					if(val == this.skillSet[i].major){
						this.selectedList = this.skillSet[i].list;
						this.selectedMajorId = i+1;
					}
				}
				// console.log('SELECTED SKILL: ', this.selectedList);
				this.$root.$emit('major-change', val);
			}
		},
		methods: {
			// getSkillset(){
			// 	this.majors = this.sortByMajor(this.skills);

			// 	if(this.skills.length>0){
			// 		this.skillSet = this.getSkillsetFromBackend();
			// 	}else{
			// 		// BACKUP
			// 		self.skillSet = [{
			// 			major: 'Animator',
			// 			list: ['Animate', 'Rigging', 'Blender', 'Maya', 'Drawing']
			// 		}];
			// 	}
			// },
			getSkillsetFromBackend(){
				var res = [];
				for (var i = 0; i < this.majors.length; i++) {
					var major;

					if(this.majors[i] == 1){
						major = 'Animator'
					}
					else if(this.majors[i] == 2){
						major = 'Modeler'
					}
					else if(this.majors[i] == 3){
						major = 'Compositor'
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
					major_id: this.selectedMajorId,
					major: this.selectedMajor, 
					skill: skill, 
					key: key
				}
				// console.log(data)
				this.$root.$emit('edit-skill', data);
			},
			deleteSkill(skill, key) {
				var self = this;

				// console.log('DELETE THIS: ', skill, this.selectedList);

				var url = this.url.skill + '/delete/' + skill.id;
				App.methods.deleteData(url);

				this.render();
			},
			putAndRender(data){
				// PUT 
				var id = data.skill.id;
				var url = this.url.skill + '/update/' + id;
				var data = {
					name: data.skill.name,
					description: '',
					major_id: data.major_id
				};

				App.methods.putData(url, data);

				this.render();
			},
			setAndRender(data, name, key){
				// POST TO BACKEND
				var url = this.url.skill+'/create';
				var backend_data = {
					major_id: this.selectedMajorId,
					name: this.newSkill,
					description: 'no description.',
					category: 0
				};
				// console.log(backend_data)
				App.methods.postData(url, backend_data);

				this.render();
			},
			render(){
				var self = this;
				setTimeout(function(){
					// RENDER
					Vue.axios.get(self.url.skill).then((response) => {
					  	self.skills = response.data;
					  	self.getSkillset();
						for (var i = 0; i < self.skillSet.length; i++) {
							var set = self.skillSet[i];
							if(self.selectedMajor == set.major){
								self.selectedList = set.list;
							}
						}
					});
				}, 500);
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
		/*background-color: coral;*/
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