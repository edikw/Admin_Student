<template>
	<div class="founder">
		<div class="edit">
<!-- 			<img src="../assets/logo/add_botton.png"> -->
			<img @click="focusField('founder')" v-show="!showField('founder')" src="../assets/logo/edit.png">
		</div>
		<span>FOUNDER</span>
		<div class="pic-founder">
			<img v-bind:src="user.urlImage" @click="openUpload">
			<input type="file" name="file" id="founderIMG" class="inputfile" @change="onFilePicked">
			<button @click="openUpload">Choose file</button>
		</div>
		<div class="text-founder">
			<textarea name="text" id="text" cols="55" rows="10" wrap="soft" v-model="user.founder" v-show="showField('founder')" type="text" class="field-value form-control" @focus="focusField('founder')"></textarea>
			<p class="field-value" v-show="!showField('founder')" @click="focusField('founder')">{{ user.founder }}</p>
			<button class="btn" v-show="showField('founder')" @click="postFounder()">submit</button>
			<button class="btn" v-show="showField('founder')" @click="blurField">cancel</button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import App from '../App.vue'
import router from '../router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
	export default {
		name: 'founder',
		data() {
			return {
				url: App.data().url,
				ID: 1,
				user: {
					founder: 'Does University adalah sekolah bakat yang hanya mengajarkan apa yang para siswanya suka. Sistem pembelajaran pun dilakukan dengan metode karantina agar mimpi mereka tetap terjaga.Berdiri sejak 15 Desember 2016 dengan jumlah 10 siswa. Kini Does University telah menerima 5 generasi siswa yang terdiri dari jurusan Animasi 3D, 3D Modelling, Video Compositing, dan Programming. Dengan total lebih dari 110 siswa yang berasal dari hampir seluruh daerah di Indonesia.',
					urlImage: require('../assets/logo/gallery_grey.png'),
					image: null
				},
				editField: '',
				description: 'Does University adalah sekolah bakat yang hanya mengajarkan apa yang para siswanya suka. Sistem pembelajaran pun dilakukan dengan metode karantina agar mimpi mereka tetap terjaga.Berdiri sejak 15 Desember 2016 dengan jumlah 10 siswa. Kini Does University telah menerima 5 generasi siswa yang terdiri dari jurusan Animasi 3D, 3D Modelling, Video Compositing, dan Programming. Dengan total lebih dari 110 siswa yang berasal dari hampir seluruh daerah di Indonesia.',
				textFounder: '',

				dataFounder: null,
			}
		},
		mounted(){
			var self = this;

			window.onload = (function(){
				getData();
			})();
			// GET DATA ABOUT FROM BACKEND 
			function getData() {
				Vue.axios.get(self.url.founder).then((response) => {
				  self.dataFounder = response.data;
				  console.log('DATA FOUNDER: ', self.dataFounder)
				});
				// HANDLE ASYNC BACKUP
				setTimeout(function getBackup() {
					if (!self.dataFounder) {
						self.textFounder = self.description;
						console.log('FOUNDER RAONO! ', self.textFounder)
					} else {
						if (self.dataFounder[0]) {
							self.textFounder = self.dataFounder[0].description;
							console.log('FOUNDER ONO! ', self.textFounder)
						} else {
							self.textFounder = self.description;
						}
					}
				}, 200);
			};

			// INITIAL LOCALSTORAGE
			if(localStorage.getItem('dataFounder')){
				this.user.founder = localStorage.getItem('dataFounder');
			}
		},
		methods: {
			focusField(founder) {
				this.editField = founder;
				// this.user[founder] = ''
			},
			blurField(founder) {
				this.editField = '';
			},
			showField(founder) {
				return (this.user[founder] == '' || this.editField == founder)
			},
			openUpload() {
				document.getElementById("founderIMG").click()
			},
			onFilePicked(event) {
				const files = event.target.files;
				const fileReader = new FileReader()
				fileReader.onload = (e) => {
					this.user.urlImage = e.target.result
				}
				fileReader.readAsDataURL(files[0])
				this.image = files[0]

				console.log(event.target.result)
			},
			postFounder(){
				// LOCALSTORAGE
				localStorage.setItem('dataFounder', this.user.founder);

				// PUT 
				var id = this.ID;
				var url = this.url.founder + '/update/' + id;
				var data = {
					file: '',
					description: this.textFounder
				}

				App.methods.putData(url, data);

				this.blurField();
			}
		}
	}
</script>

<style scoped>
	.founder{
		margin-top: 20px;
		background-color: white;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
		padding: 20px;
		position: relative;
	}
	.founder span {
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder; 
	}
	.founder p {
		font-size: 14px;
	}
	.founder img {
		display: inline-block;
	}
	.founder input {
		margin-left: 10px;
	}
	.founder input[type=file] {
		border: none;
	}
	.founder .text-founder p {
		white-space: pre-wrap;
	}
	.founder .text-founder input[type=text]{
		width: 90%;
		height: 10vh;
		display: inline-block;
		border: none;
		word-wrap: break-word;
		word-break: break-all;
	}

	.founder .edit {
		display: inline-block;
		position: absolute;
		right: 0;
		margin: 0 20px;
	}
	.founder .edit img {
		margin: 0 5px;
	}
	.pic-founder {
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.pic-founder img {
		width: 50px;
	}
	.inputfile {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
	}
	.inputfile + button, .btn {
		border: 1px solid #ccc;
		padding: 5px 50px;
		margin-left: 15px;
		font-size: 1.00em;
		font-weight: 700;
		color: #000;
		font-weight: normal;
		background-color: transparent;
		display: inline-block;
		border-radius: 5px;
	}
	.inputfile:focus + button, .inputfile + button:hover {
		background-color: #c41e30;
		color: #fff;
	}
	.btn {
		margin-left: 0;
	}
</style>