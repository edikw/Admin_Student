<template>
	<div class="ourworks">
		<h1>OUR WORKS</h1>
		<hr>
		<div class="ourworks-desc">
			<span>LIST PROJECT</span>
			<div class="ourworks-container">
				<work-list v-bind:works="works"></work-list>
			</div>
		</div>
		<!-- <create-work v-on:create-work="createWork"></create-work> -->
	</div>
</template>

<script>
	import WorkList from '../components/ourworks/workList';
	// import CreateWork from '../components/ourworks/createWork';
	import router from '../router.js'

	export default {
		name: 'ourworks',
		components: {
			WorkList
			// CreateWork
		},
		mounted() {
			console.log('DATA BACKEND: ', router.app);
			// this.works = router.app.ourworks;

			function storageAvailable(type) {
				try {
					var storage = window[type], x = '__storage_test__';
					storage.setItem(x, x);
					storage.removeItem(x);
					return true;
				} catch(e) {
					return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name == 'QuotaExceededError' || storage.length !== 0)
				}
			}
			
			if (storageAvailable('localStorage')) {
				console.log('Ourwork Storage: ', localStorage.dataOurworks);
			} else {
				console.log('Tidak ada localStorage!');
			}
		},
		data() {
			return {
				works: [
					{
						workPic: require('../assets/work/our_1.png'),
						title: 'Festival Animasi Indonesia',
						categori: 'Website & Web Apps',
						website: 'https://inamafest.com'
					},
					{
						workPic: require('../assets/work/our_2.png'),
						title: 'Euforia Store E-Commerce Website',
						categori: 'Website E-Commerce',
						website: 'https://euforiastore.com'
					},
					{
						workPic: require('../assets/work/our_3.png'),
						title: 'Audio Broadcasting Service(Streaming Radio)',
						categori: 'Website & Web Apps',
						website: 'https://radio.soekamti.com'
					},
					{
						workPic: require('../assets/work/our_4.png'),
						title: 'Erix Soekamti Personal Website',
						categori: 'Website',
						website: 'https://erixsoekamti.com'
					},
					{
						workPic: require('../assets/work/our_5.png'),
						title: 'Mobile E-Commerce Application',
						categori: 'Mobile Apps',
						website: 'https://belialbumfisik.com'
					},
					{
						workPic: require('../assets/work/our_6.png'),
						title: 'Blood For Life Indonesia',
						categori: 'Website & Web Apps',
						website: 'https://blood4life.id'
					},
					{
						workPic: require('../assets/work/our_7.png'),
						title: 'Javanas Beachwear Product Bali',
						categori: 'Website',
						website: 'https://javanas.com'
					},
					{
						workPic: require('../assets/work/our_8.png'),
						title: '#SaveLaguAnak Animation Music Video',
						categori: '3D Animation',
						website: 'https://soekamtijunior.com'
					},
					{
						workPic: require('../assets/work/our_9.png'),
						title: 'Endank Soekamti - Salam Indonesia Animation Music Video',
						categori: '3D Animation',
						website: 'https://youtube.com/user/soekamtiofficial'
					}
				]
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
.ourworks {
	padding-top: 2rem;
}
.ourworks .ourworks-desc span {
	font-size: 20px;
	font-family: monospace, sans-serif;
	font-weight: bolder;
	text-align: left;
}
.ourworks hr {
	width: 50%;
}
.ourworks h1 {
	text-align: center;
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
}
.ourworks .ourworks-desc {
	width: 80%;
	margin: auto;
	/*height: 73vh;*/
	/*overflow-y: scroll;*/
	background-color: #fff;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
	padding: 20px;
	text-align: left;
}
.ourworks .ourworks-desc .ourworks-container {
	width: 100%;
	text-align: left;
	display: inline-block;
}

.ourworks .ourworks-desc .ourworks-container .work-list .work-show button {
	margin: 0 5px;
	padding: 5px;
	border-radius: 10px;
	border: 1px solid #ccc;
	background-color: #c41e30;
	color: #fff;
}

/*.ourworks .ourworks-desc .work {
	width: 45%;
	margin: 15px;
	display: inline-block;
	text-align: left;
}
.ourworks .ourworks-desc .work img {
	width: 60%;
	border-radius: 15px;
}
.ourworks .ourworks-desc .work h2 {
	color: #000;
	font-size: 15px;
	margin: 0;
}

.ourworks .ourworks-desc .work p {
	font-size: 15px;
	margin: 0;
}
.ourworks .ourworks-desc .work a {
	text-decoration: none;
}

.ourworks .ourworks-desc .work .work-wrapper {
	text-align: left;
	display: inline-block;
	width: 40%;
	vertical-align: top;
	padding: 0 10px;
}
.ourworks .ourworks-desc .work .work-wrapper input {
	padding: 5px;
	margin-bottom: 5px;
	border-radius: 10px;
	border: 1px solid #ccc;
}

.ourworks .ourworks-desc .work .work-wrapper button {
	padding: 5px;
	border-radius: 10px;
	border: 1px solid #ccc;
	background-color: #c41e30;
	color: #fff;
}

.ourworks .ourworks-desc .work .work-wrapper .edit {
	margin: 10px 0;
}
.ourworks .ourworks-desc .work .work-wrapper .edit img {
	width: 15px;
	margin: 0 5px;
}*/

</style>