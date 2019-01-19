<template>
	<div class="about">
		<div class="back">
			<router-link to="/"><img src="../assets/logo/back.png"></router-link>
		</div>
		<h1>ABOUT</h1>
		<hr>
		<img src="../assets/logo_does.png">
		<div class="wrapper">
			<div class="about-desc">
				<p>Does University adalah sekolah bakat yang hanya mengajarkan apa yang <br> para siswanya suka. Sistem pembelajaran pun dilakukan dengan metode <br> karantina agar mimpi mereka tetap terjaga.<br><br>
				Berdiri sejak 15 Desember 2016 dengan jumlah 10 siswa. Kini, DOES <br> University telah menerima 5 generasi siswa yang terdiri dari jurusan Animasi <br> 3D, 3D Modelling, Video Compositing, dan Programming. Dengan total lebih <br> dari 110 siswa yang berasal dari hampir seluruh daerah di Indonesia</p>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.about {
	top: 5%;
	text-align: center;
	display: inline-block;
	position: absolute;
}
.about h1 {
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
}

.about img {
	width: 20%;
}
.about hr {
	width: 50%;
}

.about-desc{
	background: #fff;
	padding: 20px;
	width: 60%;
	text-align: center;
	font-size: 20px;
	display: inline-block;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
}
.back {
	display: inline-block;
	right: 30px;
	top: 20px;
	position: absolute;
}
.back img {
	width: 100%;
}
</style>