<template>
	<div class="container">
		<img v-show="!isAdding && selectedItem" src="../assets/logo/plus.png" v-on:click="addingItem()">
		<div class="add-skill" v-show="isAdding">
			<!-- input -->
			<input type="text" v-model="inputedItem">

			<!-- add btn -->
			<button v-if="page != 'editItem'" v-on:click="appendingItem()">Add Item</button>

			<!-- edit btn -->
			<button v-if="page == 'editItem'" v-on:click="editingItem()">Edit Item</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				inputedItem: null,
				isAdding: false,

				storage: [],
				selectedMajor: null,
				selectedMajorId: 0,
				selectedItem: null,
				selectedKey: null,
				page: null,
				pageDetail: null
			}
		},
		mounted() {
			var self = this;

			this.$root.$on('major-change', function(major) {
				self.page = 'skill';
				self.isAdding = false;
				self.selectedItem = major;
			});

			this.$root.$on('char-mounted', function(data) {
				self.page = 'char';
				self.isAdding = data.isAdding;
				self.selectedItem = data.selectedItem;
			});

			this.$root.$on('edit-skill', function(data) {
				console.log('EDIT SKILL: ',data)
				self.page = 'editItem';
				self.pageDetail = 'skill';
				self.isAdding = true;
				self.selectedMajor = data.major;
				self.selectedMajorId = data.major_id;
				self.selectedItem = data.skill;
				self.selectedKey = data.key;

				self.inputedItem = self.selectedItem.name;
			});

			// Edit Char ----------------------------
			this.$root.$on('edit-char', function(data) {
				console.log('EDIT CHAR: ',data)
				self.page = 'editItem';
				self.pageDetail = 'char';
				self.isAdding = true;
				// self.selectedMajor = data.major;
				self.selectedItem = data.char;
				// self.selectedKey = data.key;

				self.inputedItem = self.selectedItem.name;
			});
		},
		methods: {
			addingItem() {
				// console.log('ADDING NEW ITEM...');
				this.isAdding = true;
				this.inputedItem = null;
			},
			appendingItem() {
				this.isAdding = false;
				var target;

				// check lagi di halaman apa
				if(this.page == 'char'){
					target = 'add-character';

				}else if(this.page == 'skill'){
					target = 'add-skill';
				}

				this.$root.$emit(target, this.inputedItem);
				this.inputedItem = null;
			},
			editingItem() {
				var target;

				if (this.page == 'editItem' && this.pageDetail == 'skill') {
					var data = {
						major: this.selectedMajor,
						major_id: this.selectedMajorId,
						skill: {
							id: this.selectedItem.id,
							name: this.inputedItem, 
						},
						key: this.selectedKey
					}
					target = 'edited-skill';
					this.selectedItem = this.selectedMajor;
					this.page = 'skill';
				} else if (this.page == 'editItem' && this.pageDetail == 'char') {

					var data = {
						id: this.selectedItem.id,
						name: this.inputedItem, 
						description: '',
					}
					console.log('KIRIMAN EMIT DARI PAGE ITEM', data);
					target = 'edited-char';
					this.selectedItem = true;
					this.page = 'char';
				}

				this.$root.$emit(target, data);
				this.isAdding = false;
			}
		}
	}
</script>

<style scoped>
	.add-skill input[type="text"] {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	.add-skill button {
		font-size: 0.9em;
		border-radius: 3px;
		border: 1px solid #c41e30;
		background-color: #c41e30;
		padding: 5px 10px;
		margin: auto;
		color: #fff;
		margin-top: .5rem;
		/*width: 30%;*/
	}
</style>