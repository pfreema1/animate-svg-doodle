const canvas = document.querySelector('canvas');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max-min)) + min;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// rectangles
// c.fillStyle = 'red';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'blue'
// c.fillRect(30, 100, 100, 100);
// c.fillRect(400, 100, 30, 50);


// line
// c.beginPath();
// c.moveTo(50, 400);
// c.lineTo(50, 50);
// c.lineTo(300, 50);
// c.lineTo(300, 200);
// c.lineTo(150, 200);
// c.lineTo(150, 400);
// c.strokeStyle = 'yellow';
// c.stroke();

// arc
// c.beginPath();
// c.arc(450, 490, 30, 0, 2 * Math.PI, false);
// c.strokeStyle = 'blue';
// c.stroke();


c.strokeStyle = 'blue';
for(let i = 0; i < 200; i++) {
  c.beginPath();
  
  let x = getRandomInt(0, window.innerWidth);
  let y = getRandomInt(0, window.innerHeight);
  let size = getRandomInt(1, 200);

  c.arc(x, y, size, 0, 2 * Math.PI, false);
  c.stroke();
}