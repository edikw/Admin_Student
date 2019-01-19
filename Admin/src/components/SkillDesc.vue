<template>
	<div class="skill-desc">
		<div class="edit-skill">
			<span>SKL</span>
			<div class="skill-list">
				<div class="skill-container">
					<div class="skill">
						<ul>
							<li><span></span>Phooshop</li>
						</ul>
					</div>
					<div class="edit">
						<input type="text" placeholder="0">
					</div>
				</div>
				<div class="skill-container">
					<div class="skill">
						<ul>
							<li><span></span>Corel Draw</li>
						</ul>
					</div>
					<div class="edit">
						<input type="text" placeholder="0">
					</div>
				</div>
				<div class="skill-container">
					<div class="skill">
						<ul>
							<li><span></span>Illustrator</li>
						</ul>
					</div>
					<div class="edit">
						<input type="text" placeholder="0">
					</div>
				</div>
				<div class="skill-container">
					<div class="skill">
						<ul>
							<li><span></span>Blender</li>
						</ul>
					</div>
					<div class="edit">
						<input type="text" placeholder="0">
					</div>
				</div>
				<div class="skill-container">
					<div class="skill">
						<ul>
							<li><span></span>Cinema 4D</li>
						</ul>
					</div>
					<div class="edit">
						<input type="text" placeholder="0">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	.student .profile .skill-desc {
		width: 50%;
		vertical-align: top;
		text-align: center;
		display: inline-block;
		margin-top: 20px;
	}

	.student .profile .skill-desc .edit-skill {
		width: 80%;
		display: inline-block;
		text-align: right;
	}

	.student .profile .skill-desc .edit-skill .skill-list {
		width: 100%;
		margin-top: 20px;
	}

	.student .profile .skill-desc .edit-skill span {
		width: 100%;
		font-size: 20px;
		font-family: monospace, sans-serif;
		font-weight: bolder;
		text-align: left;
		display: inline-block;
	}

	.student .profile .skill-desc .edit-skill .skill-container {
		width: 100%;
		display: inline-flex;
		align-items: center;
	}

	.student .profile .skill-desc .edit-skill .skill {
		width: 65%;
		display: inline-block;
		text-align: left;
	}

	.student .profile .skill-desc .edit-skill .skill ul {
		padding: 0;
		margin: 0;
	}

	.student .profile .skill-desc .edit-skill .skill ul li {
		list-style: none;
		display: inline-flex;
		align-items: center;
	}

	.student .profile .skill-desc .edit-skill .skill ul li span {
		width: 20px;
		height: 20px;
		background-color: #8d8d8d;
		border-radius: 50%;
		margin-right: 20px;
	}

	.student .profile .skill-desc .edit-skill .edit {
		width: 35%;
		text-align: left;
		display: inline-flex;
		align-items: center;
	}
	.student .profile .skill-desc .edit-skill .edit img {
		margin: 0 10px;
		display: inline-block;
	}

	.student .profile .skill-desc .edit-skill .edit input[type=text] {
		width: 40px;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

</style>