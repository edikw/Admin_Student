<template>
	<div>
		<h1>jembut</h1>
		<tbody v-if="!isEditing">
			<tr style="background-color: #000">
				<td>{{ student.num }}</td>
				<td>{{ student.name }}</td>
				<td>{{ student.gender }}</td>
				<td>{{ student.address }}</td>
				<td>{{ student.birthday }}</td>
				<td>{{ student.major }} / {{ student.generation }}</td>	
				<td>
					<span class="right floated edit icon" v-on:click="showForm(student)">
					<i class="edit icon"></i>
					</span>
				</td>
				<td>
					<span class="right floated trash icon" v-on:click="deleteStudent(student)">
						<i class="trash icon"></i>
					</span>
				</td>
			</tr>
		</tbody>
		<tbody v-else="!this.edit">
			<tr>
				<td>{{ listNum }}</td>
				<td>{{ nameText }}</td>
				<td>{{ genderText }}</td>
				<td>{{ addressText }}</td>
				<td>{{ birthdayText }}</td>
				<td>{{ majorText }} / {{ generationText }}</td>	
				<td>
					<span class="right floated edit icon" v-on:click="showForm(student)">
					<i class="edit icon"></i>
					</span>
				</td>
				<td>
					<span class="right floated trash icon" v-on:click="deleteStudent(student)">
						<i class="trash icon"></i>
					</span>
				</td>
			</tr>
		</tbody>
	</div>
</template>

<!-- edit button belum -->

<script>
	export default {
		props: ['student'],
		data() {
			return {
				isEditing: this.edit,

				listNum: 1,
				nameText: '',
				genderText: '',
				birthdayText: '',
				addressText: '',
				emailText: '',
				statusText: '',
				majorText: '',
				generationText: '',

				photoshopText: '',
				coreldrawText: '',
				illustratorText: '',
				blenderText: '',
				cinema4dText: '',
				edit: false,

				responsibilityText: '',
				communicativeText: '',
				creativeText: '',
				inovativeText: '',
			}
		},
		mounted() {
			var self = this;

			this.$root.$on('edit-stud', function(data) {
				console.log('edit stud: ', data);

				self.listNum = data.num;
				self.nameText = data.name;
				self.nameText = data.name;
				self.genderText = data.gender,
				self.birthdayText = data.birthday,
				self.addressText = data.address;
				self.emailText = data.email;
				self.statusText = data.status;
				self.majorText = data.major;
				self.generationText = data.generation;
				self.edit = true;

				self.photoshopText = data.photoshop;
				self.coreldrawText = data.coreldraw;
				self.illustratorText = data.illustrator;
				self.blenderText = data.blender;
				self.cinema4dText = data.cinema4d;

				self.responsibilityText = data.responsibility;
				self.communicativeText = data.communicative;
				self.creativeText = data.creative;
				self.inovativeText = data.inovative;
			});
		},
		methods: {
			completeStudent(student) {
				this.$emit('complete-student', student);
			},
			deleteStudent(student) {
				this.$emit('delete-student', student);
			},
			showForm(student) {
				this.isEditing = true;

				console.log('edit clicked', student);
				// Kirim data ke form
				this.$root.$emit('show-edit', student);

				// console.log(student);

				// this.listNum = student.num;
				// this.nameText = student.name;
				// this.genderText = student.gender,
				// this.birthday = student.birthday,
				// this.addressText = student.address;
				// this.emailText = student.email;
				// this.statusText = student.status;
				// this.majorText = student.major;
				// this.generationText = student.generation;
			},
			hideForm() {
				this.isEditing = false;
			}
		}
	}
</script>

<style scoped>
	.student-list {
		display: inline-block;
		width: 80%;
		/*background-color: #fff;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);*/
		/*padding: 20px;*/
		text-align: center;
	}
	.student-list table{
		width: 100%;
		border: 1px solid #8e8e8e;
		border-collapse: collapse;
	}
	.student-list td{
		border-right: 1px solid #8e8e8e;
		text-transform: capitalize;
	}
	.student-list th {
		border: 1px solid #8e8e8e;
		color: white;
		font-size: 15px;
	}
	.student-list thead {
		background-color: #c41e30;
	}
	.student-list th, tr, td {
		padding: 10px;
	}
	.student-list td {
		font-size: 10pt;
	}
	.student-list .list {
		margin-top: 20px;
	}
	.student-list tbody tr{
		background-color: red;
	}
</style>