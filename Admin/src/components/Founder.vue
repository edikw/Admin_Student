<template>
	<div class="founder">
		<div class="edit">
<!-- 			<img src="../assets/logo/add_botton.png"> -->
			<img @click="focusField('founder')" v-show="!showField('founder')" src="../assets/logo/edit.png">
		</div>
		<span>FOUNDER</span>
		<div class="pic-founder">
			<img v-bind:src="user.urlImage">
			<input type="file" name="file" id="founderIMG" class="inputfile" @change="onFilePicked">
			<button @click="openUpload" v-show="showField('founder')" v-if="!proses">Choose file</button>
			<button v-show="showField('founder')" v-if="proses">please wait...</button>
		</div>
		<div class="text-founder" v-if=" dataFounder">
			<textarea 
				name="text" 
				id="text" 
				cols="55" 
				rows="10" 
				wrap="soft" 
				v-model="dataFounder.description" 
				v-show="showField('founder')" 
				type="text" 
				class="field-value form-control" @focus="focusField('founder')"></textarea>
			<p class="field-value" v-show="!showField('founder')" @click="focusField('founder')">{{ dataFounder.description }}</p>
			<button class="btn" v-show="showField('founder')" @click="postFounder()">Save Change</button>
			<button class="btn" v-show="showField('founder')" @click="blurField">cancel</button>
		</div>
	</div>
</template>

<script>
import App from '../App.vue'
import router from '../router.js'
import axios from 'axios'
import sweetalert from 'sweetalert';

	export default {
		name: 'founder',
		data() {
			return {
				url: App.data().url,
				founderGet: App.data().url.founder_get,
				founderPostImg: App.data().url.post_file,
				founderUpdate: App.data().url.founder_update,

				ID: 1,
				user: {
					founder: 'Does University adalah sekolah bakat yang hanya mengajarkan apa yang para siswanya suka. Sistem pembelajaran pun dilakukan dengan metode karantina agar mimpi mereka tetap terjaga.Berdiri sejak 15 Desember 2016 dengan jumlah 10 siswa. Kini Does University telah menerima 5 generasi siswa yang terdiri dari jurusan Animasi 3D, 3D Modelling, Video Compositing, dan Programming. Dengan total lebih dari 110 siswa yang berasal dari hampir seluruh daerah di Indonesia.',
					urlImage:'',
					image: null
				},
				editField: '',
				description: 'Does University adalah sekolah bakat yang hanya mengajarkan apa yang para siswanya suka. Sistem pembelajaran pun dilakukan dengan metode karantina agar mimpi mereka tetap terjaga.Berdiri sejak 15 Desember 2016 dengan jumlah 10 siswa. Kini Does University telah menerima 5 generasi siswa yang terdiri dari jurusan Animasi 3D, 3D Modelling, Video Compositing, dan Programming. Dengan total lebih dari 110 siswa yang berasal dari hampir seluruh daerah di Indonesia.',
				textFounder: '',

				dataFounder: null,
				proses: false
			}
		},
		mounted(){
			var self = this;

			this.getData();
			// GET DATA ABOUT FROM BACKEND 
			// function getData() {
			// 	axios.get(self.founderGet).then((response) => {
			// 		response.data.map(data => {
			// 			self.dataFounder = data;
			// 			console.log('DATA FOUNDER: ', self.dataFounder)
			// 		});
			// 	});
				// HANDLE ASYNC BACKUP
			// 	setTimeout(function getBackup() {
			// 		if (!self.dataFounder) {
			// 			self.textFounder = self.description;
			// 			console.log('FOUNDER RAONO! ', self.textFounder)
			// 		} else {
			// 			if (self.dataFounder[0]) {
			// 				self.textFounder = self.dataFounder[0].description;
			// 				console.log('FOUNDER ONO! ', self.textFounder)
			// 			} else {
			// 				self.textFounder = self.description;
			// 			}
			// 		}
			// 	}, 200);
			// };

			// INITIAL LOCALSTORAGE
		// 	if(localStorage.getItem('dataFounder')){
		// 		this.user.founder = localStorage.getItem('dataFounder');
		// 	}
		},
		methods: {
			getData(){
				axios.get(this.founderGet).then((response) => {
					response.data.map(data => {
						this.dataFounder = data;
						this.user.urlImage = data.file;
					});
				});
			},
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
				this.proses = true;
				var self = this

				const image = event.target.files[0];

				console.log('iamge', image)

				let data = new FormData();
				data.append('images', image);

				console.log('YAng dikirim', data)
				const headers = {
					'Content-Type': 'multipart/form-data'
				}

				let request = new XMLHttpRequest();
				request.open('POST', this.founderPostImg);
				request.send(data);
				request.onreadystatechange = function () {
					if(request.readyState === 4 && request.status === 200) {
						var res = JSON.parse(request.responseText);
						console.log(res)
						res.uploaded_image.map(e => {
							self.user.urlImage = e.size.medium
							console.log('data image', self.user.urlImage);
							self.proses = false;
						})
						// self.user.urlImage = res.url
					}
				}

				// fetch(this.founderPostImg,{
				// 	method: 'POST',
				// 	data: data,
				// 	headers: new Headers({
				// 		'Content-Type': 'application/json'
				// 	})
				// }).then(res => {
				// 	console.log(res)
				// })
			},
			postFounder(){ 
				var id = this.ID;
				var data = {
					file: this.user.urlImage,
					description: this.dataFounder.description
				}
				console.log('DTA yang dikirm', data);

				axios.put(this.founderUpdate + id, data).then(res => {
					if(res.status == 200){
						this.getData();
						sweetalert('Update!', 'Founder has been Update', 'success');
					}
				}).catch(err => {
					sweetalert('Failed!', 'error');
				})

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
		margin-top: 10px;
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
	.founder .text-founder {
		margin-top: 10px;
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
		/*padding: 10px;*/
	}
	.pic-founder img {
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