/*William Warner*/
/*willrwarner.com*/
/*snake.js*/

const CANVAS_HEIGHT = 200;
const MAX_CANVAS_WIDTH = 600;
const MAX_FPS = 20;

//Initialization
var lastFrameTimeMs = 0;
var timestep = 1000 / MAX_FPS;
var delta = 0;
var framesThisSecond = 0;
var lastFpsUpdate = 0;
var running = false;
var started = false;
var frameID = 0;
var isScrollingEnabled = true;
var canvasWidth = 0;

var keyMap = {
  17: "ctrl",
  39: "right",
  37: "left",
  38: "up",
  40: "down"
};

var snake = {
  body: [[canvasWidth / 2, CANVAS_HEIGHT / 2]],
  dirX: 0,
  dirY: 0
};

var food = {
  x: 0,
  y: 0
};

var pressedKeys = {
  left: false,
  right: false,
  up: false,
  down: false,
  ctrl: false
};

var canvas = document.getElementById("js-snake__canvas");
var ctx = canvas.getContext("2d");

setCanvasDimensions();
drawStartText();

//Event Listeners
window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
window.addEventListener("resize", windowResize);

//Game Loop Function
function gameLoop(timestamp) {
  if (timestamp < lastFrameTimeMs + 1000 / MAX_FPS) {
    frameId = window.requestAnimationFrame(gameLoop);
  } else {
    lastFrameTimeMs = timestamp;

    updateSnake(snake, food);

    if (checkCollision(snake)) {
      stop();
      ctx.textAlign = "center";
      ctx.font = "30px Arial";
      ctx.fillText("GAME OVER", canvasWidth / 2, CANVAS_HEIGHT / 2);
      ctx.textAlign = "center";
      ctx.font = "12px Arial";
      ctx.fillText(
        "PRESS CTRL TO START NEW GAME",
        canvasWidth / 2,
        CANVAS_HEIGHT / 2 + 20
      );
    } else {
      ctx.clearRect(0, 0, canvasWidth, CANVAS_HEIGHT);
      drawSnake(snake);
      drawFood(food);
      drawScore(snake);
      frameId = window.requestAnimationFrame(gameLoop);
    }
  }
}

//Functions
function start() {
  if (!started) {
    started = true;

    window.addEventListener("keydown", arrowKeyScrollingDisabled, false);

    snake = {
      body: [[canvasWidth / 2, CANVAS_HEIGHT / 2]],
      dirX: 0,
      dirY: 0
    };

    frameID = requestAnimationFrame(function(timestamp) {
      createFood(food);
      drawSnake(snake);
      drawFood(food);
      running = true;
      lastFrameTimeMs = timestamp;
      lastFpsUpdate = timestamp;
      framesThisSecond = 0;
      frameID = requestAnimationFrame(gameLoop);
    });
  }
}

function stop() {
  window.removeEventListener("keydown", arrowKeyScrollingDisabled, false);

  running = false;
  started = false;
  cancelAnimationFrame(frameID);
}

function drawScore(snake) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.font = "10px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Food Eaten = " + (snake.body.length - 1), 5, 10);
}

function drawFood(food) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(food.x, food.y, 10, 10);
}

function createFood(food) {
  food.x = Math.round((Math.random() * (canvasWidth - 10)) / 10) * 10;
  food.y = Math.round((Math.random() * (CANVAS_HEIGHT - 10)) / 10) * 10;
}

function drawSnake(snake) {
  for (var i = 0; i < snake.body.length; i++) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(snake.body[i][0], snake.body[i][1], 10, 10);
  }
}

function updateSnake(snake, food) {
  if (
    (pressedKeys.left && snake.dirX !== 1) ||
    (pressedKeys.left && snake.body.length === 1)
  ) {
    snake.dirX = -1;
    snake.dirY = 0;
  }
  if (
    (pressedKeys.right && snake.dirX !== -1) ||
    (pressedKeys.right && snake.body.length === 1)
  ) {
    snake.dirX = 1;
    snake.dirY = 0;
  }
  if (
    (pressedKeys.up && snake.dirY !== 1) ||
    (pressedKeys.up && snake.body.length === 1)
  ) {
    snake.dirY = -1;
    snake.dirX = 0;
  }
  if (
    (pressedKeys.down && snake.dirY !== -1) ||
    (pressedKeys.down && snake.body.length === 1)
  ) {
    snake.dirY = 1;
    snake.dirX = 0;
  }

  //Set the snake head location
  var headX = snake.body[0][0] + 10 * snake.dirX; //10px jumps are required to align to grid
  var headY = snake.body[0][1] + 10 * snake.dirY;

  //Move the snake forward
  snake.body.unshift([headX, headY]);

  //Check if snake has eaten the food
  if (!(snake.body[0][0] === food.x && snake.body[0][1] === food.y)) {
    snake.body.pop();
  } else {
    createFood(food);
  }
}

function checkCollision(snake) {
  var isCollision = false;

  if (snake.body[0][0] === canvasWidth || snake.body[0][0] < 0) {
    isCollision = true;
  } else if (snake.body[0][1] === CANVAS_HEIGHT || snake.body[0][1] < 0) {
    isCollision = true;
  }

  for (var i = 1; i < snake.body.length; i++) {
    if (
      snake.body[0][0] === snake.body[i][0] &&
      snake.body[0][1] === snake.body[i][1]
    ) {
      isCollision = true;
    }
  }
  return isCollision;
}

function keydown(event) {
  var key = keyMap[event.keyCode];
  pressedKeys[key] = true;

  if (pressedKeys.ctrl === true && running === false) {
    event.preventDefault(); //Prevent page from scrolling to bottom
    start();
  }
}

function keyup(event) {
  var key = keyMap[event.keyCode];
  pressedKeys[key] = false;
}

function arrowKeyScrollingDisabled(e) {
  switch (e.keyCode) {
    case 37:
    case 39:
    case 38:
    case 40:
      e.preventDefault();
      break; // Arrow keys
    default:
      break; // do not block other keys
  }
}

function drawStartText() {
  ctx.clearRect(0, 0, canvasWidth, CANVAS_HEIGHT);
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFF";
  ctx.font = "24px Arial";
  ctx.fillText("LET'S PLAY SNAKE!!", canvasWidth / 2, CANVAS_HEIGHT / 2);
  ctx.font = "12px Arial";
  ctx.fillText(
    "PRESS CTRL TO START GAME",
    canvasWidth / 2,
    CANVAS_HEIGHT / 2 + 40
  );
  ctx.fillText(
    "USE THE ARROW KEYS TO MOVE THE SNAKE",
    canvasWidth / 2,
    CANVAS_HEIGHT / 2 + 60
  );
}

function setCanvasDimensions() {
  canvasWidth =
    Math.round(
      (document.getElementById("js-snake__container").offsetWidth - 40) / 20
    ) * 20;

  if (canvasWidth > MAX_CANVAS_WIDTH) {
    canvasWidth = MAX_CANVAS_WIDTH;
  }
  canvas.width = canvasWidth;
  canvas.height = CANVAS_HEIGHT;
}

function windowResize() {
  setCanvasDimensions();
  drawStartText();
}
