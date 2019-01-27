<template>
	<div class="about">
		<div class="edit">
			<img @click="focusField('about')" v-show="!showField('about')" v-bind:src="image">
		</div>
		<span>ABOUT</span>
		<div class="pic-about">
			<img v-bind:src="user.urlImage" @click="openUpload">
			<input type="file" name="file" id="aboutIMG" class="inputfile" @change="onFilePicked">
			<button @click="openUpload" v-show="showField('about')" v-if="!proses">Choose file</button>
			<button v-show="showField('about')" v-if="proses">Please wait...</button>
		</div>
		<div class="text-about" v-if="dataAbout">
			<textarea 
				name="text" 
				id="text" 
				cols="55" 
				rows="10" 
				wrap="soft" 
				v-model="dataAbout.description" 
				v-show="showField('about')" 
				type="text" 
				class="field-value form-control" 
				@focus="focusField('about')" 
				>		
			</textarea>
			<p class="field-value" v-show="!showField('about')" @click="focusField('about')">{{ dataAbout.description }}</p>
			<button class="btn" v-show="showField('about')" v-on:click="postAbout()">Save Change</button>
			<button class="btn" v-show="showField('about')" @click="blurField">cancel</button>
		</div>
	</div>
</template>

<script>
// import Vue from 'vue'
import App from '../App.vue'
import router from '../router.js'
import axios from 'axios'
import sweetalert from 'sweetalert';

// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios);

	export default {
		// name: 'About',
		data() {
			return {
				aboutGet: App.data().url.about_get,
				aboutUpdateImg: App.data().url.about_update_Img,
		        aboutUpdate: App.data().url.about_update,
		        aboutPostImg: App.data().url.post_file,

				ID: 1,
				user: {
					about: 'Does University adalah sekolah bakat yang hanya mengajarkan apa yang para siswanya suka. Sistem pembelajaran pun dilakukan dengan metode karantina agar mimpi mereka tetap terjaga.Berdiri sejak 15 Desember 2016 dengan jumlah 10 siswa. Kini Does University telah menerima 5 generasi siswa yang terdiri dari jurusan Animasi 3D, 3D Modelling, Video Compositing, dan Programming. Dengan total lebih dari 110 siswa yang berasal dari hampir seluruh daerah di Indonesia.',
					urlImage: ''
				},
				editField: '',
				description: 'Does University adalah sekolah bakat yang hanya mengajarkan apa yang para siswanya suka. Sistem pembelajaran pun dilakukan dengan metode karantina agar mimpi mereka tetap terjaga.Berdiri sejak 15 Desember 2016 dengan jumlah 10 siswa. Kini Does University telah menerima 5 generasi siswa yang terdiri dari jurusan Animasi 3D, 3D Modelling, Video Compositing, dan Programming. Dengan total lebih dari 110 siswa yang berasal dari hampir seluruh daerah di Indonesia.',
				textAbout: '',

				dataAbout: null,
				image : require('../assets/logo/edit.png'),
				proses: false
			}
		},
		mounted(){
			var self = this;

			this.getData();
			// GET DATA ABOUT FROM BACKEND 
			
				// HANDLE ASYNC BACKUP
			// setTimeout(function getBackup() {
			// 	if (!self.dataAbout) {
			// 		self.textAbout = self.description;
			// 	} else {
			// 		if(self.dataAbout[0]){
			// 			self.textAbout = self.dataAbout[0].description;
			// 			console.log('ABOUT ONO!!', self.textAbout)
			// 		}else{
			// 			console.log('ABOUT RAONO!!')
			// 			self.textAbout = self.description;
			// 			}
			// 		}
			// 	}, 200);

			// GET LOCAL STORAGE
			// if(localStorage.getItem('dataAbout')){
			// 	this.user.about = localStorage.getItem('dataAbout');
			// };
		},
		methods: {
			getData() {
				axios.get(this.aboutGet).then((response) => {
					response.data.map(data => {
						this.dataAbout = data;
						this.user.urlImage = data.file;
						
					})
				});
			},

			focusField(about) {
				this.editField = about;
			},
			blurField(about) {
				this.editField = '';
			},
			showField(about) {
				return (this.user[about] == '' || this.editField == about);
			},
			openUpload() {
				document.getElementById("aboutIMG").click()
			},
			onFilePicked(event) {
				this.proses = true;
 				var self = this;

				const image = event.target.files[0];

				let data = new FormData();
				data.append('images', image);

				console.log("DATA YANG DIKIRM", data)

				let request = new XMLHttpRequest();
				request.open('POST', this.aboutPostImg);
				request.send(data);
				request.onreadystatechange = function () {
					if(request.readyState === 4 && request.status === 200) {
						var res = JSON.parse(request.responseText);
						console.log(res)
						res.uploaded_image.map(data  => {
							self.user.urlImage = data.size.medium
							console.log('dataimage', self.user.urlImage);
							
						})
						self.proses = false;

					}
				}
			
			},
			postAbout(){
				
				var id = this.ID;
				var data = {
					file: this.user.urlImage,
					description: this.dataAbout.description
				}

				console.log('Yang Dikirim', data)

				axios.put(this.aboutUpdate + id, data).then(res => {
					if(res.status == 200){
						this.getData();
						sweetalert('Success Edit About', 'success');
					}else{
						sweetalert('Gagal Edit About. Silahkan coba Lagi');
					}
				}).catch(e => {
					sweetalert('Gagal Edit About. Silahkakn coba Lagi');
				})

				this.blurField();
			}
		}
	}
</script>

<style scoped>
	.about{
		background-color: white;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
		padding: 20px;
		position: relative;
	}
	.about span {
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder; 
	}
	.about p {
		font-size: 14px;
		margin-top: 10px;
	}
	.about img {
		display: inline-block;
	}
	.about input {
		margin-left: 10px;
	}
	.about input[type=file] {
		border: none;
	}
	.about .text-about p {
		white-space: pre-wrap;
	}
	.about .text-about {
		margin-top: 10px;
	}
	.about .text-about input[type=text]{
		width: 90%;
		height: 10vh;
		display: inline-block;
		border: none;
		word-wrap: break-word;
		word-break: break-all;
	}

	.about .edit {
		display: inline-block;
		position: absolute;
		right: 0;
		margin: 0 20px;
	}
	.about .edit img {
		margin: 0 5px;
	}
	.pic-about {
		display: flex;
		align-items: center;
	}
	.pic-about img {
		width: 150px;
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