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
				url: App.data().url_ourwork,
			}
		},
		mounted() {
			var self = this;
			console.log('create: ', self.isCreating);
		},
		methods: {
			openForm() {
				this.isCreating = true;
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
						category: categori,
						url_website: website,
						file: this.addWork
						// num: num
					}

					console.log("DATA YANG DI POST", ourwork)

					axios.post(this.url.post_text, ourwork).then(res => {
							if(res.status == 200){
								window.location.reload();
							}
					})

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

				var self = this

				const image = event.target.files[0];

				let data = new FormData();
				data.append('file', image);

				let request = new XMLHttpRequest();
				request.open('POST', this.url.post_file);
				request.send(data);
				request.onreadystatechange = function () {
					if(request.readyState === 4 && request.status === 200) {
						var res = JSON.parse(request.responseText);
						console.log('RES POST IMAGE', res);
						self.addWork = res.url
					}
				}
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
		/*padding-top: 20px;*/
		padding-bottom:20px;
		text-align: left;
	}
	.projects input[type=file] {
		display: none;
	}
	.projects .project {
		width: 100%;
		display: inline-block;
		text-align: center;
		padding-top: 25px;
		padding-bottom: 25px;
	}
	.projects .project img {
		width: 35%;
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
		border-radius: 5px;
		border: 1px solid #ccc;
		display: block;
		width: 100%;
	}
	.projects .project .work-wrapper-edit .button-add button {
		margin: 0;
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background-color: #c41e30;
		color: #fff;
		width: 25%;
	}
	.projects .project .work-wrapper-edit .input-work label {
		display: inline-block;
	}
</style>