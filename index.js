const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024 
canvas.height = 576



const gravity = 0.9;

const background = new Sprite({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: './img/background.jpg'
})


const player = new Fighter({
	position: {
		x: 400,
		y: 0
	},
	velocity: {
		x: 0,
		y: 0
	},
	color: 'red',
	offset: {
		x: 0,
		y: 0
	},
	imageSrc: './img/GraveRobber/Idle.png',
	framesMax: 4,
	scale: 2,
	offset: {
		x: 0,
		y: -60
	},
	sprites: {
		idle: {
			imageSrc: './img/GraveRobber/Idle.png',
			framesMax: 4
		},
		run: {
			imageSrc: './img/GraveRobber/Run.png',
			framesMax: 6
		},
		jump: {
			imageSrc: './img/GraveRobber/Jump.png',
			framesMax: 6
		},
		fall: {
			imageSrc: './img/GraveRobber/Jump.png',
			framesMax: 6
		},
		attack1: {
			imageSrc: './img/GraveRobber/Attack1.png',
			framesMax: 6
		},
		takeHit: {
			imageSrc: './img/GraveRobber/Hurt.png',
			framesMax: 3
		},
		death: {
			imageSrc: './img/GraveRobber/Death.png',
			framesMax: 6
		}
	}
})

player.draw();


const keys = {	
	ArrowRight: {
		pressed: false
	},
	ArrowLeft: {
		pressed: false
	}
}


function animate() {
	window.requestAnimationFrame(animate)
	background.update();

	player.update();


	 player.velocity.x = 0;
	 
	if (keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft') {
		player.velocity.x = -5;
		player.switchSprite('run');
	} else if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight') {
		player.velocity.x = 5;
		player.switchSprite('run');
	} else {
		player.switchSprite('idle');
	}

	if (player.velocity.y < 0) {
		player.switchSprite('jump'); 
	} else if (player.velocity.y > 0) { 
		player.switchSprite('fall');
	}
	 
}

animate()

window.addEventListener('keydown', (event) => {
	
	if (!player.dead) {
		switch (event.key) {
			case 'ArrowRight':
				keys.ArrowRight.pressed = true; 
				player.lastKey = 'ArrowRight';
				break;
			case 'ArrowLeft':
				keys.ArrowLeft.pressed = true; 
				player.lastKey = 'ArrowLeft';
				break;
			case 'ArrowUp':
				player.velocity.y = -20;
				break;
			case 'ArrowDown':
				player.attack();
				break;
		}
	}
})

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'ArrowRight':
			keys.ArrowRight.pressed = false; 
			break;
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false; 
			break;
	}
})