
<template>
	<div class="work-list">
		<template>
			<div class="work" v-for="(work, key) in dataListOurwork">
				<div class="work-show">
					<img v-bind:src= "work.file">
					<div class="works-wrapper">
						<h3>{{ work.title }}</h3>
						<p>{{ work.category }}</p>
						<a v-bind:href="work.url_website">{{ work.url_website }}</a>
						<div class="option-work">
							<img src="../../assets/logo/edit.png" v-on:click="modalEditWork(work, key)">
							<img src="../../assets/logo/delete.png" v-on:click="deleteWork(work, key)">
						</div>
					</div>
				</div>
			</div>
		</template>
		<template>
		  <div class="modal-backdrop" v-show="modal">
		    <div class="modal">
		      <header class="modal-header">
		        <slot name="header">

		          <button
		            type="button"
		            class="btn-close"
		            @click="close"
		          >
		            x
		          </button>
		        </slot>
		      </header>
		      <section class="modal-body">
		        <slot name="body">
		        	<div class="project">
					<input type="file" name="upload" id="idImg" @change="sendFile">
					<img v-bind:src="file_picture" @click="openUpload"> <!-- add gambar -->
					<div class="work-wrapper-edit">
						<div class="input-work">
							<label>Categori:</label>
							<input type="text" v-model="category">
						</div>
						<div class="input-work">
							<label>Title:</label>
							<input type="text" v-model="title">
						</div>
						<div class="input-work">
							<label>Website:</label>
							<input type="text" v-model="website">
						</div>
					</div>
				</div>
		        </slot>
		       </section>
		       <footer class="modal-footer">
		          <slot name="footer" v-if="!proses">

		            <button
		              type="button"
		              class="btn-green"
		              @click="close"
		            >
		              Cancel
		          </button>
		          <button
		              type="button"
		              class="btn-green"
		              v-on:click= "editOurwork()"
		            >
		              Edit
		          </button>
		        </slot>
		        <div class="footer-proses" v-if="proses">

		            <button
		              type="button"
		              class="btn-green"
		            >
		              Please wait...
		          </button>
		        </div>
		      </footer>
		    </div>
		  </div>
		</template>
	</div>
</template>

<script>
	import sweetalert from 'sweetalert';
	import router from '../../router.js'
	import Vue from 'vue'
	import axios from 'axios'
	import App from '../../App'

	export default {
		data() {
			return {
				stored: null,
				isEditing: false,
				key: '',

				storedOurworkDB: null,
				dataListOurwork: [],
				// url: App.data().url_ourwork,
				ourworkGet: App.data().url.ourwork_get,
				ourworkUpdate: App.data().url.ourwork_update_all,
				ourworkDelete: App.data().url.ourwork_delete,
				ourworkUpdateFile: App.data().url.post_file,
				modal: false,
				category: '',
				title: '',
				website:'',
				idWork: null,
				file_picture: null,
				proses: false
			}
		},
		mounted() {
				this.getOurwork();
		},
		
		methods: {
			close(){
				this.$emit('close')
				this.modal = false;
			},
			getOurwork(){
				axios.get(this.ourworkGet).then(res => {
					console.log('res get ourwork', res)
					this.dataListOurwork = res.data

				})
			},
			createWork(newWork) {
				this.works.push(newWork);
				// console.log('tambah:', this.works);
			},
			editOurwork(){
				const dataEdit ={
					title: this.title,
					category: this.category,
					url_website: this.website,
					file: this.file_picture,
				}
				console.log("DATA YANG DIKIRIM EDIT", dataEdit)

				axios.put(this.ourworkUpdate + this.idWork, dataEdit).then(res => {
					console.log('RESPONE EDIT', res);
					if(res.status == 200){
						this.getOurwork()
						this.reset()
						this.modal = false;
					}
				})
			},
			modalEditWork(work, key) {
				this.modal = true;
				this.idWork = work.id;
				this.file_picture = work.file;

			},
			deleteWork(work, key) {
				console.log('Masuk ke remove work!');

				axios.delete(this.ourworkDelete + work.id).then(res => {
					console.log(res)

					sweetalert('Deleted!', 'Project has been deleted.', 'success');
					this.getOurwork();
				})

			},
			openUpload() {
				document.getElementById("idImg").click()
			},
			sendFile(event) {
				this.proses = true

				var self = this

				const image = event.target.files[0];

				let data = new FormData();
				data.append('images', image);

				let request = new XMLHttpRequest();
				request.open('POST', this.ourworkUpdateFile);
				request.send(data);
				request.onreadystatechange = function () {
					if(request.readyState === 4 && request.status === 200) {
						var res = JSON.parse(request.responseText);
						res.uploaded_image.map(data => {
							self.file_picture = data.size.medium;
							console.log('RES POST IgdfklmhtMAGE', res);
							console.log("SUDAHNDAPAT", self.file_picture);
							
						})
						self.proses = false
					}
				}
			},
			reset() {
				this.title = '';
				this.category = '';
				this.website = '';
			},
		}
	}
</script>

<style scoped>
	* {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	 }
	 .work-list{
	 	padding-top: 10px;
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

	.work {
		width: 45%;
		margin: 15px;
		display: inline-block;
		text-align: center;
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
	.modal-backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal {
		background: #FFFFFF;
		box-shadow: 2px 2px 20px 1px;
		overflow-x: auto;
		display: flex;
		flex-direction: column;
	}

	.modal-header,
	.modal-footer {
		padding: 15px;
		display: flex;
	}

	.modal-header {
		border-bottom: 1px solid #eeeeee;
		color: #4AAE9B;
		justify-content: flex-end;
	}

	.modal-footer {
		border-top: 1px solid #eeeeee;
		justify-content: flex-end;
	}
	.modal-footer .footer-proses button {
		width: 100%;
	}

	.modal-body {
		position: relative;
		padding: 20px 10px;
	}

	.btn-close {
		border: none;
		font-size: 20px;
		padding: 5px;
		cursor: pointer;
		font-weight: bold;
		color: #8c171c;
		background: transparent;
	}

	.btn-green {
		color: white;
		height: 30px;
		width: 65px;
		background: #8c171c;
		border: 1px solid #8c171c;
		border-radius: 2px;
		margin-right: 5px;
	}
	.project input[type=file] {
		display: none;
	}
	.project {
		width: 100%;
		display: inline-block;
		text-align: left;
	}
	.project img {
		max-width: 55%;
		border-radius: 15px;
	}
	.project .work-wrapper-edit {
		text-align: left;
		display: inline-block;
		width: 35%;
		vertical-align: top;
		padding: 0 10px;
	}
	.project .work-wrapper-edit .input-work input {
		padding: 5px;
		margin-bottom: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

</style>