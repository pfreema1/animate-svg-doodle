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
    return size;
  } else if(x > WINDOW_WIDTH - size) {
  // element is overflowing off-screen to the right
    return WINDOW_WIDTH - size;
  }
  else {
    return x;
  }
}

const moveYWithinBounds = (y, size) => {
  if(y < size) {
    // element is overflowing off-screen to the left 
    return size;
  } else if(y > WINDOW_HEIGHT - size) {
    // element is overflowing off-screen to the right
    return WINDOW_HEIGHT - size;
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


// c.strokeStyle = 'blue';
// for(let i = 0; i < 200; i++) {
//   c.beginPath();
  
//   let size = getRandomInt(1, 50);
//   let x = moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), size);
//   let y = moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), size);

//   c.arc(x, y, size, 0, 2 * Math.PI, false);
//   c.stroke();
// }

const drawBoundedRandomPosCircles = (amountCircles, sizeMin, sizeMax) => {
  for(let i = 0; i < amountCircles; i++) {
    c.beginPath();

    let size = getRandomInt(sizeMin, sizeMax);
    let x = moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), size);
    let y = moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), size);

    c.arc(x, y, size, 0, 2 * Math.PI, false);
    c.stroke();
  }
}

const drawBoundedRandomPosSquares = (amountSquares, sizeMin, sizeMax) => {
  for(let i = 0; i < amountSquares; i++) {
    c.beginPath();

    let size = getRandomInt(sizeMin, sizeMax);
    let x = moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), size);
    let y = moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), size);

    c.fillRect(x, y, size, size);
    c.stroke();
  }
}

const drawBoundedRandomBezierCurves = (numPoints, drawPoints = false, connected = false) => {
  for(let i = 0; i < numPoints; i++) {
    c.beginPath();

    let startPoint = {
      x: moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), 10),
      y: moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), 10)
    };
    let controlPoint1 = {
      x: moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), 10),
      y: moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), 10)
    };
    let controlPoint2 = {
      x: moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), 10),
      y: moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), 10)
    };
    let endPoint = {
      x: moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), 10),
      y: moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), 10)
    };
    c.moveTo(startPoint.x, startPoint.y);
    c.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      endPoint.x,
      endPoint.y
    );

    if(drawPoints) {
      c.fillStyle = 'blue';
      // start point
      c.fillRect(startPoint.x, startPoint.y, 10, 10);
      // end point
      c.fillRect(endPoint.x, endPoint.y, 10, 10);

      c.fillStyle = 'red';
      // control points
      c.fillRect(controlPoint1.x, controlPoint1.y, 10, 10);
      c.fillRect(controlPoint2.x, controlPoint2.y, 10, 10);
      

    }
    
    c.stroke();
  }
}

// start
(function() {
  c.strokeStyle = 'purple';

  // drawBoundedRandomPosCircles(50, 2, 10);
  // drawBoundedRandomPosSquares(100, 2, 60);
  drawBoundedRandomBezierCurves(1, true, false);
})();