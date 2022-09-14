const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let rotate = true;
let coreRadius = 15;
let growRadius = 0.2;

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

const colors = ['#00bdff', '#4638ce', '#088eff']

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
	Particles.forEach(particle => {
		particle.centerX = canvas.width / 2;
		particle.centerY = canvas.width / 2;
	});
	init();
});

function getRandomIntFromRange(min, max) {
	return (Math.random() * (max - min)) + min + 1;
}

function getRandomColor(min, max) {
	return Math.floor((Math.random() * (colors.length)) + 1);
}

function getDistance(x, y) {
	let mx = mouse === undefined || mouse.x === undefined ? 0 : mouse.x;
	let my = mouse === undefined || mouse.y === undefined ? 0 : mouse.y;
	let distance = ((x - mx) * (x - mx)) +
					((y - my) * (y - my));
	return distance;
}

// Objects
class Particle {
	constructor(x, y, radius, color, move) {
		this.x = x;
		this.y = y;
		this.centerX = canvas.width / 2;
		this.centerY =  canvas.width / 2;
		this.radius = radius;
		this.color = color;
		this.shouldRotate = false;
		this.dirX = 5;
		this.dirY = 5;
		this.move = move;
		
		// Radians is the starting angle
		// multiplying it by 2*pi, since pi represents semi-circle so 2*pi is the whole circle
		// the points will start randomly on the circle
		this.radians = Math.random() * Math.PI * 2;
		this.velocity = 0.05;
		// this.amplitude = getRandomIntFromRange(50, 120);
		this.distanceFromCenter = getRandomIntFromRange(25, 150); 
	}

	draw() {
		c.beginPath();
		c.strokeStyle = this.color;
		c.lineWidth = this.radius;
		c.moveTo(this.prevX, this.prevY);
		c.lineTo(this.x, this.y);
		c.stroke();
		c.closePath();
	}

	update() {
		this.prevX = this.x;
		this.prevY = this.y;
		
		if(this.shouldRotate === false) {
			let distance = getDistance(this.x, this.y);
			this.shouldRotate = distance <= (canvas.width / 6) * (canvas.height / 6);
		}
		
		if(rotate === true && this.shouldRotate && this.move === true) {
			this.centerX += (mouse.x - this.centerX) * 0.05;
			this.centerY += (mouse.y - this.centerY) * 0.05;
			this.radians += this.velocity;
			this.x = this.centerX + Math.cos(this.radians) * this.distanceFromCenter;
			this.y = this.centerY + Math.sin(this.radians) * this.distanceFromCenter;
			this.color = 'red';
			this.draw();
		}
		else if(this.move === true) {
			if (this.x < canvas.width - this.radius * 10) {
					this.dirX *= -1;
				}
				if (this.x > this.radius * 10) {
					this.dirX *= -1;
				}
				if (this.y < canvas.height - this.radius * 10) {
					this.dirY *= -1;
				}
				if (this.y > this.radius * 10) {
					this.dirY *= -1;
				}
			
			this.x += this.dirX * Math.random() * -1;
			this.y += this.dirY * Math.random() * -1;
			this.color = 'blue';
			this.draw();
		}
		else {
			this.draw();
		}
	}
}

// Implementation
let Particles;

function init() {
	Particles = []
	
	for (let i = 0; i < 500; i++) {
		let radius = Math.random() * 4 + 1;
		let currColor = colors[getRandomColor()];
		Particles.push(new Particle( (Math.random() * canvas.width), (Math.random() * canvas.height), radius, currColor, true));
	}
}

function drawCore() {
	c.arc(canvas.width/2, canvas.height/2, coreRadius, 0, 2 * Math.PI, false);
	if(coreRadius <= 4) {
		growRadius = 0.2;
	}
	else if(coreRadius >= 10) {
		growRadius = -0.2;
	}
	
	coreRadius += growRadius;
    c.fillStyle = 'red';
    c.fill();
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate)
	c.fillStyle = 'rgb(255,255,255,0.1)';
	c.fillRect(0, 0, canvas.width, canvas.height);
	
	drawCore();
	Particles.forEach(particle => {
		particle.update();
	});
}

init()
animate()