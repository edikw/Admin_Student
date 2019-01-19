<template>
	<div>
		<button v-on:click="sendForm()">SUBMIT</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				nameText: '',
				genderText: '',
				birthdayText: '',
				addressText: '',
				emailText: '',
				statusText: '',
				majorText: '',
				generationtext: '',
			}
		},
		method: {
			sendForm() {
				if (this.nameText.length > 0 && this.addressText.length > 0) {
					const name = this.nameText;
					const gender = this.genderText;
					const birthday = this.birthdayText;
					const address = this.addressText;
					const email = this.emailText;
					const status = this.statusText;
					const major = this.majorText;
					const generation = this.generationText;
					this.$emit('create-stud', {
						name,
						gender,
						birthday,
						address,
						email,
						status,
						major,
						generation,
						lulus: false
					});
					this.nameText = '';
					this.genderText = '',
					this.birthday = '',
					this.addressText = '';
					this.emailText = '';
					this.statusText = '';
					this.majorText = '';
					this.generationText = '';
					this.isCreating = false;
				} else {
					alert('failed send data');
				}
			}
		}
	}
</script>