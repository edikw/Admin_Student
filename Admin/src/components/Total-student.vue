<template>
	<div class="total-student">
		<div class="edit">
			<router-link to="/student">
				<img src="../assets/logo/edit.png">
			</router-link>
		</div>
		<span>TOTAL STUDENT</span>
		<div class="wrapper">
			<table>
				<tr>
					<th colspan="2">Student</th>
				</tr>
				<tr>
					<td>Graduated</td>
					<td><p style="text-align: right" class="field-value" >{{ graduateds }} Students</p></td>
				</tr>
				<tr>
					<td>Studying</td>
					<td><p style="text-align: right" class="field-value" >{{ studyings }} Students</p></td>
				</tr>
				<tr>
					<td colspan="2"><hr></td>
				</tr>
				<tr>
					<td>Total</td>
					<td style="text-align: right"><p style="text-align: right" class="field-value"id="total">{{ total }} Students</p></td>
				</tr>
			</table>
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
		name: 'totalStudent',
		data() {
			return {
				graduateds: 0,
				studyings: 0,
				total: 0,
				dataStudents: [],
				url: App.data().url,
			}
		},
		mounted() {
			var self = this;

			window.onload = (function(){
				getData();
			})();

			function getData() {
				Vue.axios.get(self.url.student).then((response) => {
				  self.dataStudents = response.data;
				});

				setTimeout(function countStudent() {
					self.dataStudents.map(std => {
						if (std) {
							if (std.status == 'Graduated') {
								self.graduateds++;
							}
							if (std.status == 'Studying' || std.status == 'Studied') {
								self.studyings++;
							}
						}
					});
				self.total = self.dataStudents.length;
				}, 300);
			};

		}
	}
</script>

<style scoped>
	.total-student {
		margin-top: 20px;
		width: 100%;
		background-color: white;
		display: inline-block;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
		padding: 20px;
		position: relative;
	}
	.total-student span {
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder; 
	}
	.total-student table{
		margin-top: 10px;
		border: 1px solid #8e8e8e;
		border-collapse: collapse;
	}
	.total-student table hr {
		margin: 0;
		border: 1px solid #8e8e8e;
	}
	.total-student table th {
		font-size: 15px;
	}
	.total-student th {
		background-color: #c41e30;
		text-align: left;
		color: white;
	}
	.total-student th, tr, td {
		padding: 10px;
	}
	.total-student td {
		font-size: 10pt;
	}
	.total-student .wrapper table{
		width: 100%;
		margin-top: 10px;
	}
	.total-student .edit {
		display: inline-block;
		position: absolute;
		right: 0;
		margin: 0 20px;
	}
	.total-student .edit img {
		margin: 0 5px;
	}
	.wrapper p {
		margin: 0;
	}
</style>