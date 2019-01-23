<template>
	<div class="majors">
		<span>MAJORS</span>
		<!-- <Chartist /> -->
		<canvas id="densityChart" height="150"></canvas>
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
		name: 'Majors',
		data() {
			return {
				dataStudents: null,
				dataJmlGen: [],
				url: App.data().url,
			}
		},
		mounted(){
			var self = this;

			window.onload = (function(){
				getData();
			})();

			function getData() {
				Vue.axios.get(self.url.student).then((response) => {
				  self.dataStudents = response.data;
				});

				setTimeout(function diagram() {
					self.dataJmlGen = self.filterGeneration();

					self.makeDiagram();
				}, 300);
			}


			// console.log('data major: ', router.app.students);
		},
		methods: {
			makeDiagram() {
				var densityCanvas = document.getElementById("densityChart");

				Chart.defaults.global.defaultFontFamily = "Lato";
				Chart.defaults.global.defaultFontSize = 12;

				var densityData = {
				  label: 'Diagram Siswa Does University',
				  data: this.dataJmlGen,
				  // data: [20, 10, 1, 40, 15],
				  backgroundColor: [
				  // 'transparent'
				  'rgba(196, 30, 48, 0.2)',
				  'rgba(196, 30, 48, 0.2)',
				  'rgba(196, 30, 48, 0.2)',
				  'rgba(196, 30, 48, 0.2)',
				  'rgba(196, 30, 48, 0.2)'
				  ],
				   borderColor: [
			    	'rgba(196, 30, 48, 1)'
			      ],
				};

				var options = {
					responsive: true,
					lineTension: 10,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
								padding: 0,
							}
						}]
					},
					title: {
							

					}
				};

				var barChart = new Chart(densityCanvas, {
				  type: 'line',
				  data: {
				    labels: ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5"],
				    datasets: [densityData]
				  },
				  options: options
				});

			},
			filterGeneration() {
				var self = this;
				var jmlGen1 = 0;
				var jmlGen2 = 0;
				var jmlGen3 = 0;
				var jmlGen4 = 0;
				var jmlGen5 = 0;

				if(this.dataStudents){

					this.dataStudents.map(stud => {
						// console.log(stud)
						if (stud.generations == 1 || stud.generations == '1') {
							jmlGen1 = jmlGen1+1;
						} else if (stud.generations == 2 || stud.generations == '2') {
							jmlGen2 = jmlGen2+1;
						} else if (stud.generations == 3 || stud.generations == '3') {
							jmlGen3 = jmlGen3+1;
						} else if (stud.generations == 4 || stud.generations == '4') {
							jmlGen4 = jmlGen4+1;
						} else if (stud.generations == 5 || stud.generations == '5') {
							jmlGen5 = jmlGen5+1;
						} else {
							jmlGen1 = 0;
							jmlGen2 = 0;
							jmlGen3 = 0;
							jmlGen4 = 0;
							jmlGen5 = 0;
						}
					});
				}


				var dataGen = [jmlGen1, jmlGen2, jmlGen3, jmlGen4, jmlGen5];

				return dataGen;
			},

		}

	}
</script>

<style scoped>
	.majors {
		background-color: white;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
		padding: 20px;
	}
	.majors span {
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder; 
	}
</style>