let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const moveXWithinBounds = (x, size) => {
  if (x < size) {
    // element is overflowing off-screen to the left
    return size;
  } else if (x > WINDOW_WIDTH - size) {
    // element is overflowing off-screen to the right
    return WINDOW_WIDTH - size;
  } else {
    return x;
  }
};

const moveXAwayFromMousePos = (x, size) => {
  if (Math.abs(x - mouse.x) < size) {
    // too close to mouse position - move x
    return x + size;
  } else {
    // x is not anywhere near mouse
    return x;
  }
};

const moveYAwayFromMousePos = (y, size) => {
  if (Math.abs(y - mouse.y) < size) {
    // too close to mouse position - move x
    return y + size;
  } else {
    // x is not anywhere near mouse
    return y;
  }
};

const moveYWithinBounds = (y, size) => {
  if (y < size) {
    // element is overflowing off-screen to the left
    return size;
  } else if (y > WINDOW_HEIGHT - size) {
    // element is overflowing off-screen to the right
    return WINDOW_HEIGHT - size;
  } else {
    return y;
  }
};

const drawBoundedRandomPosCircles = (amountCircles, sizeMin, sizeMax) => {
  for (let i = 0; i < amountCircles; i++) {
    c.beginPath();

    let size = getRandomInt(sizeMin, sizeMax);
    let x = moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), size);
    let y = moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), size);

    c.arc(x, y, size, 0, 2 * Math.PI, false);
    c.stroke();
  }
};

const drawBoundedRandomPosSquares = (amountSquares, sizeMin, sizeMax) => {
  for (let i = 0; i < amountSquares; i++) {
    c.beginPath();

    let size = getRandomInt(sizeMin, sizeMax);
    let x = moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), size);
    let y = moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), size);

    c.fillRect(x, y, size, size);
    c.stroke();
  }
};

const drawBoundedRandomBezierCurves = (
  numPoints,
  drawPoints = false,
  connected = false
) => {
  let lastEndPoint;
  for (let i = 0; i < numPoints; i++) {
    c.beginPath();

    let startPoint = lastEndPoint || {
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

    lastEndPoint = endPoint;

    //draw curve
    c.moveTo(startPoint.x, startPoint.y);
    c.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      endPoint.x,
      endPoint.y
    );

    if (drawPoints) {
      c.fillStyle = "blue";
      // start point
      c.fillRect(startPoint.x, startPoint.y, 10, 10);
      // end point
      c.fillRect(endPoint.x, endPoint.y, 10, 10);

      c.fillStyle = "red";
      // control points
      c.fillRect(controlPoint1.x, controlPoint1.y, 10, 10);
      c.fillRect(controlPoint2.x, controlPoint2.y, 10, 10);
    }

    c.stroke();
  }
};

/*****************************
 **		input listeners
 ******************************/

let bulletTime = 1;

const mousedown = e => {
  if (mousedownId == -1) mousedownId = setInterval(whilemousedown, 100);
};

const mouseup = e => {
  // check if we are running an interval
  if (mousedownId !== -1) {
    clearInterval(mousedownId);
    mousedownId = -1;
  }
  bulletTime = 1;
};

const whilemousedown = () => {
  console.log("mousing down breh!");
  bulletTime = 0.5;
};

let mouse = {
  x: undefined,
  y: undefined
};
document.addEventListener("mousemove", e => {
  // console.log(e);
  mouse.x = e.x;
  mouse.y = e.y;
});
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
document.addEventListener("mouseout", mouseup);

let mousedownId = -1; //Global Id of mouse down interval

/*****************************/

function Marker(x, y, dx, dy, radius, opacity, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.origRadius = radius;
  this.opacity = opacity;
  this.color = color;

  this.draw = function() {
    // c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };

  this.update = function() {
    this.x = mouse.x;
    this.y = mouse.y;

    this.draw();
  };
}

function Circle(x, y, dx, dy, radius, opacity, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.origRadius = radius;
  this.opacity = opacity;
  this.color = color;

  this.draw = function() {
    // c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };

  this.update = function() {
    //check if circle is within range of mouse
    let xMin = this.x - 20;
    let xMax = this.x + 20;
    let yMin = this.y - 20;
    let yMax = this.y + 20;

    if (mouse.x > xMin && mouse.x < xMax && mouse.y > yMin && mouse.y < yMax) {
      // we've hit a circle
      //restart game
      console.log("hit!");
      arrayOfCircles = [];
      initGame(arrayOfCircles);
    }

    if (this.x + this.radius > WINDOW_WIDTH || this.x < this.radius) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > WINDOW_HEIGHT || this.y < this.radius) {
      this.dy = -this.dy;
    }

    this.x += this.dx * bulletTime;
    this.y += this.dy * bulletTime;

    let xDistanceElToMouse = Math.abs(this.x - mouse.x);

    if (xDistanceElToMouse < 50) {
      // distance from this element to mouse is < 50
      if (this.radius < this.origRadius + 35) {
        this.radius += 0.5;
      }
    } else if (this.radius > this.origRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

const createArrayOfCircles = numCircles => {
  let arrayOfCircles = [];

  for (let i = 0; i < numCircles; i++) {
    let radius = getRandomInt(5, 30);
    let x = moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), radius);
    let y = moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), radius);
    let dx = getRandomInt(1, 3);
    let dy = getRandomInt(1, 3);
    let opacity = Math.random();
    arrayOfCircles.push(new Circle(x, y, dx, dy, radius, opacity, "purple"));
  }

  return arrayOfCircles;
};

let setIntervalRef;

const initGame = arrayOfCircles => {
  console.log("initGame running");
  clearInterval(setIntervalRef);
  setIntervalRef = setInterval(() => {
    let radius = getRandomInt(5, 30);
    let x = moveXAwayFromMousePos(
      moveXWithinBounds(getRandomInt(0, WINDOW_WIDTH), radius),
      100
    );
    let y = moveYAwayFromMousePos(
      moveYWithinBounds(getRandomInt(0, WINDOW_HEIGHT), radius),
      100
    );
    let dx = getRandomInt(1, 3);
    let dy = getRandomInt(1, 3);
    let opacity = Math.random();
    arrayOfCircles.push(new Circle(x, y, dx, dy, radius, opacity, "purple"));
  }, 200);
};

let arrayOfCircles;

// start
(function() {
  arrayOfCircles = []; //createArrayOfCircles(500);
  let marker = new Marker(50, 50, 0, 0, 20, 1, "black");

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    for (let i = 0; i < arrayOfCircles.length; i++) {
      arrayOfCircles[i].update();
    }

    marker.update();
  }

  initGame(arrayOfCircles);

  animate();
})();
