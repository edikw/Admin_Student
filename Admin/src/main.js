import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Chartist from './Chartist'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Chart from 'chart.js'

// var url = App.data().url;
// var data = {
// 	about: null,
// 	founder: null,
// 	skill: null,
// 	character: null,
// 	students: null,
// 	ourwork: null,
// 	login: null
// };

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

// IIFE
// window.onload = (function(){
// 	getData();
// })();

// // GET DATA ALL
// function getData(){
// 	getAbout();
// }

// function getAbout(){
// 	Vue.axios.get(url.about).then((response) => {
// 	  data.about = response.data;
// 	  getFounder();
// 	});
// }

// function getFounder(){
// 	Vue.axios.get(url.founder).then((response) => {
// 	  data.founder = response.data;
// 	  getOurwork();
// 	});
// }

// function getOurwork(){
// 	Vue.axios.get(url.ourwork).then((response) => {
// 	  data.ourwork = response.data;
// 	  getSkill();
// 	});
// }

// function getSkill(){
// 	Vue.axios.get(url.skill).then((response) => {
// 	  data.skill = response.data;
// 	  getCharacter();
// 	});
// }

// function getCharacter(){
// 	Vue.axios.get(url.character).then((response) => {
// 	  data.character = response.data;
// 	  getStudent();
// 	});
// }

// function getStudent(){
// 	Vue.axios.get(url.student).then((response) => {
// 	  data.students = response.data;
// 	  renderApp();
// 	});
// }

renderApp();
function renderApp(){
	var app = new Vue({
	  router,
	  // data: function(){
	  // 	return data;
	  // },
	  mounted(){
		// console.clear();
	  	// console.log('INITIAL DATA: ', this.$data);
	  },
	  render: h => h(App)
	}).$mount('#app')
}