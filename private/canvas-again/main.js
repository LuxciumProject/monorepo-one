console.log('loading...');

const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

const particles = [];

class Particle {
  constructor(x, y, z, vx, vy, vz, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
  }

  draw() {
    ctx.fillStyle = this.color;
    const size = 10 * (1 / (this.z + 10));
    const x = (this.x - this.y) * Math.cos((30 * Math.PI) / 180);
    const y = (this.x + this.y) * Math.sin((30 * Math.PI) / 180) - this.z;
    ctx.fillRect(x + canvas.width / 2, y + canvas.height / 2, size, size);
  }
}

const particleCount = 20;
for (let i = 0; i < particleCount; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const vx = Math.random() * 2 - 1;
  const vy = Math.random() * 2 - 1;
  const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  particles.push(new Particle(x, y, vx, vy, color));
}

let animateStarted = false;
function animate2() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, 10, 10);

    if (particle.x + 10 >= canvas.width || particle.x <= 0) {
      particle.vx = -particle.vx;
    }

    if (particle.y + 10 >= canvas.height || particle.y <= 0) {
      particle.vy = -particle.vy;
    }

    const particleA = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const particleB = particles[j];
      const dx = particleA.x - particleB.x;
      const dy = particleA.y - particleB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 10) {
        particleA.vx = -particleA.vx;
        particleA.vy = -particleA.vy;
        particleB.vx = -particleB.vx;
        particleB.vy = -particleB.vy;
      }
    }
  }

  if (!animateStarted) {
    animateStarted = true;
    console.log('animate started');
  }

  requestAnimationFrame(animate);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.update();
    particle.draw();
  }
  requestAnimationFrame(animate);
}

animate();

console.log('loaded');
