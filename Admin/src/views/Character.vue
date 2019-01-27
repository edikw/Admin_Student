<template>
	<div class="character">
		<div class="title">
			<h1>CHARACTER</h1>
			<hr/>
		</div>
		<div class="content">
			<div class="container">
				<table>
					<thead>
						<tr>
							<td>No</td>
							<td>Name</td>
							<td>Actions</td>
						</tr>
						</thead>
					<tbody v-if="stored">

						<tr v-for="(char, key) in stored">
							<td>{{key+1}}</td>
							<td class="title">{{char.name}} | {{char.id}}</td>
							<td><img src="../assets/logo/edit.png" v-on:click="editChar(char, key)"><img src="../assets/logo/delete.png" v-on:click="deleteChar(char, key)"></td>
						</tr>
						<tr>
							<td colspan="3">
								<add-character></add-character>		
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>
	</div>
</template>

<script>
	import AddCharacter from '../components/AddItem';
	import sweetalert from 'sweetalert';
	import router from '../router';
	import App from '../App';
	import axios from 'axios';

	export default {
		components: {
			AddCharacter,
		},
		data() {
			return {
				characterGet: App.data().url.character_get,
				characterUpdate: App.data().url.character_update,
				characterPost: App.data().url.character_post,
				characterDelete: App.data().url.character_delete,
				stored: []
			}
		},
		mounted() {
			var self = this;

			this.getData();

			// function getData() {
			// 	Vue.axios.get(self.characterGet).then((response) => {
			// 	  self.stored = response.data;
			// 	  console.log('DATA CHAR: ', self.stored)
			// 	});

			// 	setTimeout(function renderData() {
			// 		if(self.stored.length>0){
			// 			console.log('DATA CHAR ONO', self.stored)
			// 		}else{
			// 			// backup
			// 			console.log('DATA CHAR RAONO')
			// 			self.stored = ['Responsibility', 'Communicative', 'Creative', 'Inovative'];
			// 		}
			// 	}, 300);
			// }

			// INITIAL RENDER

			// MOUNTED CHAR
			this.$root.$emit('char-mounted', {isAdding: false, selectedItem: true});

			// ADD CHAR
			this.$root.$on('add-character', function(dataCharacter) {
				self.setGetRender(dataCharacter, 'dataCharacters');
			});

			// EDIT CHAR
			this.$root.$on('edited-char', function(dataChar) {
				self.updateChar(dataChar);
				// console.log('EDITED in Char: ', dataChar);
				// var id = dataChar.id;
				// var data = {
				// 	id: id,
				// 	name: dataChar.name,
				// 	description: dataChar.description
				// };
				// console.log(self.characterUpdate + id)
				// axios.put(self.characterUpdate + id, data).then(res => {
				// 	if(res.status == 200) {
				// 		this.render();
				// 		sweetalert('Berhasil Edit Karakter', 'success')
				// 	}
				// }).catch(e => {
				// 	alert('Data Yang Masukkan Sudah Tersedia');
				// 	self.render()
				// })

			});
		},
		methods: {
			updateChar(data) {
				console.log('data cart', data)

				var sendData = {
					id: data.id,
					name: data.name,
					description: data.description
				};

				console.log('yang mau dikitm', sendData);

				axios.put(this.characterUpdate + data.id, sendData).then(res => {
					if(res.status == 200) {
						this.getData()
						sweetalert('Berhasil Edit Karakter', 'success')
					}
				}).catch(e => {
					alert('Data Yang Masukkan Sudah Tersedia');
					this.getData()
				})
			},
			getData() {
				this.stored = []
				axios.get(this.characterGet).then((response) => {
				  response.data.map(e => {
				  	this.stored.push(e)
				  })
				  console.log('DATA CHAR: ', this.stored)
				});
			},
			setGetRender(data, name) {
				// var url = this.url.character + '/create';
				var backend_data = {
					name: data,
					description: 'no description.'
				};
				axios.post(this.characterPost, backend_data).then(res => {
					if(res.status == 200){
						sweetalert('Sukses Menambahkan Karakter', 'success');
						this.getData();
					}else {
						sweetalert('Gagal Menambahkan Karakter. Silahkan coba lagi');
					}
				}).catch(e => {
					sweetalert('Data yang anda masukkan sudah tersedia');
					this.getData();
				})

			},
			editChar(char) {
				var data= {
					char: char
					// key:key
				}
				console.log('data di emit edit-char', data)
				this.$root.$emit('edit-char', data);
			},
			deleteChar(char, key) {
				console.log("CHAR", char)
				axios.delete(this.characterDelete + char.id).then(res => {
					if(res.status == 200){
						sweetalert('Berhasil Menghapus Karakter', 'success');
						this.getData();
					}else {
						sweetalert('Gagal Menghapus Karakter. Silahkan Coba Lagi');
					}
				}).catch( e => {
					sweetalert('Gagal Menghapus Karakter. Silahkan Coba Lagi');
					this.getData();
				})

			},
			// render(){
			// 	axios.get(this.characterGet).then((response) => {
			// 	  	// this.stored = [];
			// 	  	this.stored = response.data;
			// 	});
			// }
		}
	}
</script>

<style scoped>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	.character {
		padding-top: 2rem;
	}
	.character .container {
		width: 40%;
		display: inline-block;
		/*background-color: coral;*/
	}
	.character .content {
		margin: auto;
		width: 80%;
		background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		padding: 20px;
		text-align: center;
	}
	.character .title h1 {
		text-align: center;
		color: #c41e30;
		font-family: monospace, sans-serif;
		margin: 0;
	}
	.character .title hr {
		width: 50%;
	}
	.content .container table tbody tr .title{
		text-align: left;
	}
</style>