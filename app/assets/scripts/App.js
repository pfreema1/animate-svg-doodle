let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max-min)) + min;
}

const moveXWithinBounds = (x, size) => {
  if(x < size) {
    // element is overflowing off-screen to the left 
    return size / 2;
  } else if(x > WINDOW_HEIGHT - size) {
    // element is overflowing off-screen to the right
    return WINDOW_HEIGHT - size;
  }
  else {
    return x;
  }
}

const moveYWithinBounds = (y, size) => {
  if(y < size) {
    // element is overflowing off-screen to the left 
    return size / 2;
  } else if(y > WINDOW_WIDTH - size) {
    // element is overflowing off-screen to the right
    return WINDOW_WIDTH - size;
  }
  else {
    return y;
  }
}

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
  
  let size = getRandomInt(1, 200);
  let x = getRandomInt(0, WINDOW_WIDTH);
  let x = moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), size);
  let y = moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), size);

  c.arc(x, y, size, 0, 2 * Math.PI, false);
  c.stroke();
}