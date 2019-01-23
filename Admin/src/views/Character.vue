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
					<tbody>

						<tr v-for="(char, key) in stored">
							<td>{{key+1}}</td>
							<td class="title">{{char.name}}</td>
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
	import router from '../router';
	import App from '../App';
	import Vue from 'vue';
	import axios from 'axios';
	import VueAxios from 'vue-axios';

	export default {
		components: {
			AddCharacter,
		},
		data() {
			return {
				url: App.data().url,
				stored: null
			}
		},
		mounted() {
			var self = this;

			window.onload = (function(){
				getData();
			})();

			function getData() {
				Vue.axios.get(self.url.character).then((response) => {
				  self.stored = response.data;
				  console.log('DATA CHAR: ', self.stored)
				});

				setTimeout(function renderData() {
					if(self.stored.length>0){
						console.log('DATA CHAR ONO', self.stored)
					}else{
						// backup
						console.log('DATA CHAR RAONO')
						self.stored = ['Responsibility', 'Communicative', 'Creative', 'Inovative'];
					}
				}, 300);
			}

			// INITIAL RENDER

			// MOUNTED CHAR
			this.$root.$emit('char-mounted', {isAdding: false, selectedItem: true});

			// ADD CHAR
			this.$root.$on('add-character', function(dataCharacter) {
				self.setGetRender(dataCharacter, 'dataCharacters');
			});

			// EDIT CHAR
			this.$root.$on('edited-char', function(dataChar) {
				console.log('EDITED in Char: ', dataChar);
				// console.log('stored: ', self.stored);

				// PUT 
				var id = dataChar.id;
				var url = self.url.character + '/update/' + id;
				var data = {
					id: id,
					name: dataChar.name,
					description: dataChar.description
				};

				// App.methods.putData(url, data);
				axios.put(url).then(res => {
					if(res.status == 200) {
						self.render();
					}
				}).catch(e => {
					alert('Data Yang Masukkan Sudah Tersedia');
					self.render()
				})

			});
		},
		methods: {
			setGetRender(data, name) {
				var self = this;
				// SET
				var url = this.url.character + '/create';
				var backend_data = {
					name: data,
					description: 'no description.'
				};
				// console.log(backend_data)
				// App.methods.postData(url, backend_data);
				axios.post(App.data().url.character, backend_data).then(res => {
					if(res.status == 200){
						this.render();

					}
				}).catch(e => {
					alert('Data yang anda masukkan sudah tersedia');
					this.render();
				})

			},
			editChar(char, key) {
				var data = {char: char, key: key}
				this.$root.$emit('edit-char', data);
			},
			deleteChar(char, key) {
				var self = this;

				// console.log('DELETE THIS: ', char, key);

				var url = this.url.character + '/delete/' + char.id;
				// App.methods.deleteData(url);
				axios.delete(url).then(res => {
					if(res.status == 200){
						this.render();
					}
				}).catch( e => {
					alert('Gagal Menghapus. Silahkan Coba Lagi');
					this.render();
				})

			},
			render(){
				var self = this;
				// RENDER
				setTimeout(function(){
					// RENDER
					Vue.axios.get(self.url.character).then((response) => {
					  	self.stored = [];
					  	self.stored = response.data;
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