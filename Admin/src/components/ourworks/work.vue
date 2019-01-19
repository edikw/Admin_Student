<template>
<div class="work">
	<div class="work-show" v-show="!isEditing">
		<img v-bind:src= "work.workPic"> <!-- ini gambar -->
		<div class="work-wrapper">
			<h3>{{ work.title }}</h3>
			<p>{{ work.categori }}</p>
			<a v-bind:href= "work.website">{{ work.website }}</a>
			<div class="option-work">
				<button class="edit-work" v-on:click="showForm">Edit</button>
				<button class="delete-work" v-on:click="deleteWork(work)">Delte</button>
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

<script>
	export default {
		props: ['work'],
		data() {
			return {
				isEditing: false
			}
		},
		methods: {
			deleteWork(work) {
				this.$emit('delete-work', work);
			},
			showForm() {
				this.isEditing = true;
			},
			hideForm() {
				this.isEditing = false;
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
</style>