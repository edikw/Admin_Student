
<template>
	<div class="work-list">
		<!-- <work v-on:delete-work="deleteWork" v-for="work in works" :work.sync="work"></work> -->
		<!-- Pindahan dari work -->
		<template>
			<p>from dummies data</p>
			<div class="work" v-bind="work" v-for="(work, key) in works">
				<div class="work-show" v-if="work" v-show="!isEditing">
					<img v-bind:src= "work.workPic">
					<div class="works-wrapper">
						<h3>{{ work.title }}</h3>
						<p>{{ work.categori }}</p>
						<a v-bind:href="work.website">{{ work.website }}</a>
						<div class="option-work">
							<img src="../../assets/logo/edit.png" v-on:click="showForm(work, key)">
							<img src="../../assets/logo/delete.png" v-on:click="deleteWork(work, key)">
<!-- 							<button class="edit-work" v-on:click="showForm(work, key)">Edit</button>
							<button class="delete-work" v-on:click="deleteWork(work, key)">Delete</button> -->
						</div>
					</div>
				</div>
				<div class="work-show-edit" v-show="isEditing">
					<img src="../../assets/work/our.png"> <!-- ini edit gambar -->
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
		<!-- Pindahan dari work -->

		<!-- DATA DARI LOCALSTORAGE -->

		<!-- DATA DARI LOCALSTORAGE -->

		<template>
			<p>From Backend</p>
			<div class="work" v-bind="work" v-for="(work, key) in storedOurworkDB">
				<div class="work-show" v-show="!isEditing">
					<img v-bind:src= "work.file">
					<div class="works-wrapper">
						<h3>{{ work.title }}</h3>
						<p>{{ work.category }}</p>
						<a v-bind:href="work.url_website">{{ work.url_website }}</a>
						<div class="option-work">
							<img src="../../assets/logo/edit.png" v-on:click="editWorkDB(work, key)">
							<img src="../../assets/logo/delete.png" v-on:click="removeWorkDB(work, key)">
						</div>
					</div>
				</div>
				<div class="work-show-edit" v-show="isEditing">
					<img src="../../assets/work/our.png">
					<div class="work-wrapper">
						<div class="input-work">
							<label>Category:</label>
							<input type="text" v-model="work.category">
						</div>
						<div class="input-work">
							<label>Title:</label>
							<input type="text" v-model="work.title">
						</div>
						<div class="input-work">
							<label>Website:</label>
							<input type="text" v-model="work.url_website">
						</div>
						<div class="button-add">
							<button class="edit-work" v-on:click="hideForm">Close</button>
						</div>
					</div>
				</div>
			</div>
		</template>
		<create-work></create-work>
		<edit-work></edit-work>
	</div>
</template>

<script>
	import sweetalert from 'sweetalert';
	// import Work from './work';
	import CreateWork from './createWork';
	import EditWork from './editWork';
	import router from '../../router.js'
	import Vue from 'vue'
	// import axios from 'axios'
	// import VueAxios from 'vue-axios'
	import App from '../../App'

	export default {
		props: ['works'],
		components: {
			// Work,
			CreateWork,
			EditWork
		},
		data() {
			return {
				stored: null,
				isEditing: false,
				key: '',

				storedOurworkDB: null,
				url: App.data().url,
			}
		},
		mounted() {
			var self = this;
			self.stored = JSON.parse(localStorage.getItem('dataOurworks'));

			this.$root.$on('add-work', function(addWork) {
				self.stored = addWork;
			});

			// get data ADD WORK BACKEND 
			this.$root.$on('adding-work', function(work) {
				App.methods.postData(work.url, work.data);
				sweetalert('Added!', 'Work has been added', 'success');
				// RENDER 
				self.render();
			})

			this.$root.$on('work-remove', function(workDelete) {
				self.stored = workDelete;
			});

			this.$root.$on('edited-list', function(editOurwork) {
				self.stored = editOurwork;
			});

			// GET DATA FROM BACKEND 
			window.onload = (function(){
				getDataOurwork();
			})();
			function getDataOurwork() {
				Vue.axios.get(self.url.ourwork).then((response) => {
				  self.storedOurworkDB = response.data;
				  console.log('DATA OURWORKS: ', self.storedOurworkDB)
				});
			};

			this.$root.$on('edited-work', function(editOurwork) {
				self.storedOurworkDB = editOurwork;
			});
			// console.log('Ourwork localStorage: ', self.stored);
			// console.log('Ourwork Backend: ', this.storedOurworkDB);
		},
		
		methods: {
			// DATA DUMMIES
			deleteWork(work, key) {
				const workIndex = this.works.indexOf(work);
				this.works.splice(workIndex, 1);
				sweetalert('Deleted!', 'Project has been deleted.', 'success');
			},
			createWork(newWork) {
				this.works.push(newWork);
				// console.log('tambah:', this.works);
			},
			showForm(work, key) {
				this.isEditing = true;
			},
			hideForm() {
				this.isEditing = false;
			},
			// DATA LOCALSTORAGE
			removeWork(work, key) {
				console.log('Masuk ke remove work!');
				var stored;
				stored = JSON.parse(localStorage.getItem('dataOurworks'));

				stored.map((proc, i) => {
					if (i == key) {
						stored.splice(i, 1);
						console.log('data yg dihapus:', proc);
					}
				});

				localStorage.setItem('dataOurworks', JSON.stringify(stored));
				this.$root.$emit('work-remove', stored);

				sweetalert('Deleted!', 'Project has been deleted.', 'success');
			},

			editWork(work, key) {
				var stored;
				stored = JSON.parse(localStorage.getItem('dataOurworks'));

				const title = work.title;
				const categori = work.categori;
				const website = work.website;
				const edit = true;
				const num = key;

				var workEdit = {
					title: title,
					categori: categori,
					website: website,
					edit: edit,
					num: num
				}

				this.$root.$emit('work-edit-kirim', workEdit);
				console.log('Data dari edit:', workEdit);

			},
			editWorkDB(work, key) {
				var stored;
				stored = JSON.parse(localStorage.getItem('dataOurworks'));

				const id = work.id;
				const title = work.title;
				const category = work.category;
				const url_website = work.url_website;
				const edit = true;
				const num = key;

				var workEdit = {
					id: id,
					file: '',
					title: title,
					category: category,
					url_website: url_website,
					edit: edit
				}

				this.$root.$emit('work-edit-kirimDB', workEdit);
				console.log('Data dari editDB:', workEdit);

			},
			removeWorkDB(work, key) {
				console.log('Masuk ke remove work!');

				var url = App.data().url.ourwork + '/delete/' + work.id;
				App.methods.deleteData(url);

				this.render();

				sweetalert('Deleted!', 'Project has been deleted.', 'success');
			},
			render() {
				var self = this;
				self.storedOurworkDB = [];
				setTimeout(function() {
					App.methods.getData(App.data().url.ourwork, function(res) {
						self.storedOurworkDB = res;
						console.log('title: ', self.storedOurworkDB.title);
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
	.ourworks-desc span {
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder;
		text-align: left;
	}
	.ourworks-desc {
		margin: 20px 0;
		display: inline-block;
		width: 80%;
		height: 73vh;
		/*overflow-y: scroll;*/
		background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		padding: 20px;
		text-align: left;
	}
	.ourworks-desc .ourworks-container {
		width: 100%;
		text-align: left;
		display: inline-block;
	}

	.ourworks-desc .ourworks-container .add-button button {
		margin: 0 5px;
		padding: 5px;
		border-radius: 10px;
		border: 1px solid #ccc;
		background-color: #c41e30;
		color: #fff;
	}


	/*Pindahan dari Work*/

	.work {
		width: 45%;
		margin: 15px;
		display: inline-block;
		text-align: left;
	}
	.work img {
		width: 60%;
		border-radius: 15px;
	}
	.work h2 {
		color: #000;
		font-size: 15px;
		margin: 0;
	}

	.work h3 {
		margin: 0;
	}

	.work p {
		font-size: 15px;
		margin: 0;
	}
	.work a {
		text-decoration: none;
	}

	.work .work-wrapper {
		text-align: left;
		display: inline-block;
		width: 40%;
		vertical-align: top;
		padding: 0 10px;
	}
	.work .work-wrapper input {
		padding: 5px;
		margin-bottom: 5px;
		border-radius: 10px;
		border: 1px solid #ccc;
	}

	.work .work-wrapper button {
		padding: 5px;
		border-radius: 10px;
		border: 1px solid #ccc;
		background-color: #c41e30;
		color: #fff;
	}

	.option-work img {
		width: auto;
		border: none;
		border-radius: 0;
		cursor: pointer;
		margin-top: 5px;
		margin-right: 5px;
	}

</style>