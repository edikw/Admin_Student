<template>
	<div class="edit-work">
		<!-- <div class="edit-img" v-show="!isEdited">
			<img src="../../assets/logo/edit.png" v-on:click="editWork()">
		</div> -->
		<div class="work-show-edit" v-show="edit">
			<span>Edit Form</span><br>
			<img src="../../assets/work/our.png">
			<div class="work-wrapper">
				<div class="input-work">
					<label>Category:</label>
					<input type="text" v-model="categoriText">
				</div>
				<div class="input-work">
					<label>Title:</label>
					<input type="text" v-model="titleText">
				</div>
				<div class="input-work">
					<label>Website:</label>
					<input type="text" v-model="websiteText">
				</div>
				<div class="button-add">
					<button class="edit-work" v-on:click="hideFormDB">Close</button>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router.js'
	import Vue from 'vue'
	import axios from 'axios'
	import VueAxios from 'vue-axios'
	import App from '../../App'
	export default {
		data() {
			return {
				addWork: require('../../assets/work/our.png'),
				isEdited: false,
				categoriText: '',
				titleText: '',
				websiteText: '',
				edit: false,
				file: null,
				key: '',
				id: null,
				storedOurworkDB: null,
				url: App.data().url,
			}
		},
		mounted() {
			var self = this;

			this.$root.$on('work-edit-kirim', function(data) {
				console.log('from edit:', data);
				self.categoriText = data.categori;
				self.titleText = data.title;
				self.websiteText = data.website;
				self.edit = data.edit;
				self.key = data.num;
			});

			this.$root.$on('work-edit-kirimDB', function(data) {
				console.log('from edit:', data);
				self.categoriText = data.category;
				self.titleText = data.title;
				self.websiteText = data.url_website;
				self.file = '';
				self.edit = data.edit;
				self.key = data.num;
				self.id = data.id;
			})

			window.onload = (function(){
				getDataOurwork();
			})();
			// GET DATA FROM BACKEND 
			function getDataOurwork() {
				Vue.axios.get(self.url.ourwork).then((response) => {
				  self.storedOurworkDB = response.data;
				  console.log('DATA OURWORKS: ', self.storedOurworkDB)
				});
			};
		},
		methods: {
			// editWork() {
			// 	this.isEdited = true;
			// },
			hideForm() {
				this.edit = false;

				const title = this.titleText;
				const categori = this.categoriText;
				const website = this.websiteText;
				const edit = this.edit;
				const num = this.key;
				// const id = this.id

				var workEdit = {
					title: title,
					categori: categori,
					website: website,
					edit: edit,
					num: num
				}

				var stored = JSON.parse(localStorage.getItem('dataOurworks'));

				stored.map((work, i) => {
					if (i == num) {
						console.log('ini i:', i);
						stored[i] = workEdit;
					}
				});

				localStorage.setItem('dataOurworks', JSON.stringify(stored));

				this.$root.$emit('edited-list', stored);
			},
			hideFormDB() {
				this.edit = false;

				const title = this.titleText;
				const category = this.categoriText;
				const url_website = this.websiteText;
				const edit = this.edit;
				const num = this.key;
				const file = this.file;
				const id = this.id;

				var workEdit = {
					id: id,
					file: file,
					title: title,
					category: category,
					url_website: url_website,
					edit: edit
					}

				// this.storedOurworkDB = router.app.ourwork;
				// console.log('sebelum di render!!!!', this.storedOurworkDB);
				
				// PUT INTO BACKEND 
				App.methods.putData(App.data().url.ourwork+ '/update/' + id, workEdit);

				// RENDER 
				this.render();

			},
			render() {
				var self = this;
				self.storedOurworkDB = [];
				setTimeout(function() {
					App.methods.getData(App.data().url.ourwork, function(res) {
						// console.log('after di render!!!!', self.storedOurworkDB);
						self.storedOurworkDB = res;
						self.$root.$emit('edited-work', self.storedOurworkDB);
					});
				}, 400);
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
</style>