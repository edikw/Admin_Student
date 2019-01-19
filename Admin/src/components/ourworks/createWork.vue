<template>
	<div class="projects">
		<img src="../../assets/logo/plus.png" v-on:click="openForm" v-show="!isCreating">
		<div class="project" v-show="isCreating">
			<input type="file" name="upload" id="workIMG" @change="onFilePicked">
			<img v-bind:src="addWork" @click="openUpload"> <!-- add gambar -->
			<div class="work-wrapper-edit">
				<div class="input-work">
					<label>Categori:</label>
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
					<button class="create-work" v-on:click="sendForm()">Add</button>
					<button class="cancel-work" v-on:click="closeForm">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import sweetalert from 'sweetalert';
	import Vue from 'vue'
	import axios from 'axios'
	import VueAxios from 'vue-axios'
	import App from '../../App'

	export default {
		data() {
			return {
				addWork: require('../../assets/work/our.png'),
				categoriText: '',
				titleText: '',
				websiteText: '',
				isCreating: false,
				key: 0,
				url: App.data().url,
			}
		},
		mounted() {
			var self = this;
			console.log('create: ', self.isCreating);
		},
		methods: {
			openForm() {
				this.isCreating = true;
				// window.scrollTo(0, document.querySelector(".projects").scrollHeight);
				// window.scrollTo(0, document.body.scrollHeight);
				window.scrollTo(0, window.screen.height + 100);
			},
			closeForm() {
				this.isCreating = false;
			},
			sendForm() {
				if (this.titleText.length > 0 && this.categoriText.length > 0) {
					this.key = this.key + 1;
					const num = this.key;

					const title = this.titleText;
					const categori = this.categoriText;
					const website = this.websiteText;

					// SAVE data ke localstorage
					var ourworks = [];
					var ourwork = {
						title: title,
						categori: categori,
						website: website,
						num: num
					}

					var stored;
					stored = JSON.parse(localStorage.getItem('dataOurworks'));

					// stored.push(ourwork);

					localStorage.setItem('dataOurworks', JSON.stringify(stored));
					console.log('ourwork dikirim ke local: ', stored);

					this.$root.$emit('add-work', stored);


					// SAVE DATA BACKEND 
					// const title = this.titleText;
					const category = this.categoriText;
					const url_website = this.websiteText;
					const file = '';

					var ourwork = {
						title: title,
						category: category,
						url_website: url_website,
						file: file
					}
					this.$root.$emit('adding-work', {
						url: this.url.ourwork + '/create',
						data: ourwork
					});

					this.reset();

				} else {
					alert('Field must be filled!');
				}
			},
			reset() {
				this.titleText = null;
				this.categoriText = null;
				this.websiteText = null;
				this.isCreating = false;
			},
			openUpload() {
				document.getElementById("workIMG").click()
			},
			onFilePicked(event) {
				const files = event.target.files;
				const fileReader = new FileReader()
				fileReader.onload = (e) => {
					this.addWork = e.target.result
				}
				fileReader.readAsDataURL(files[0])
				this.image = files[0]

				console.log(event.target.result)
			}
		}
	}
</script>

<style>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	.projects {
		width: 100%;
	}
	.projects input[type=file] {
		display: none;
	}
	.projects .project {
		width: 100%;
		display: inline-block;
		text-align: left;
	}
	.projects .project img {
		width: 55%;
		border-radius: 15px;
	}
	.projects .project .work-wrapper-edit {
		text-align: left;
		display: inline-block;
		width: 35%;
		vertical-align: top;
		padding: 0 10px;
	}
	/*.projects .project .work-wrapper-edit .input-work {
		margin: 10px 0;
	}*/
	.projects .project .work-wrapper-edit .input-work input {
		padding: 5px;
		margin-bottom: 5px;
		border-radius: 10px;
		border: 1px solid #ccc;
	}
	.projects .project .work-wrapper-edit .button-add button {
		margin: 0 5px;
		padding: 5px;
		border-radius: 10px;
		border: 1px solid #ccc;
		background-color: #c41e30;
		color: #fff;
	}
</style>