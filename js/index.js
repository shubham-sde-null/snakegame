//whenever we make some game then the most important part is to paint the screen again and agian, we can use the setInterval which can do this job for us but requestAnimationFrame is higly recommeded over here
// Game Constants & Variables
//here I have made the direction of snake as 0 0 , because I don't my snake to move when game start it must only move when user clicked some key
let inputDir = { x: 0, y: 0 };
//here I will bring all the sounds
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
//here I am using the speed variable in order to stop repainting the screen very fast, so what was happeing with the help of requestAnimationFrame my screen is painting very fast so I am going to make a condition if the time is greater then a particluar calculated time then only print the screen
let speed = 5;
let score = 0;
//here I am using the lastPiantTime as 0 initlally to run on first screen paint after that I will keep on skipping the screen paint and when the difference betweem the ctime which is continiously provided by the requestAnimationFrame and lastPaintTime is greater then the condtion time then our scren is going to paint again
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
//here all buttons were selectes
let leftKey = document.getElementById("left");
let rightKey = document.getElementById("right");
let topKey = document.getElementById("top");
let bottomKey = document.getElementById("bottom");

food = { x: 6, y: 7 };

// Game Functions
//
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
//here requestAnimation takes a function and returns the time i.e after how much time screen is painting again, here the main function will fire only once but we want to fire our main function again and again so for that what I will do I will fire the main function one time form here and then inside main function I will call requestAnimationFrame again and again such that we will get the loop where our game will run, it is working same as setInterval but requestAnimationFrame is good.
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
leftKey.addEventListener("click", () => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  console.log("Go Left");
  inputDir.x = -1;
  inputDir.y = 0;
});
rightKey.addEventListener("click", () => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  console.log("Go Right");
  inputDir.x = 1;
  inputDir.y = 0;
});
topKey.addEventListener("click", () => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  console.log("Go Up");
  inputDir.x = 0;
  inputDir.y = -1;
});
bottomKey.addEventListener("click", () => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  console.log("Go Down");
  inputDir.x = 0;
  inputDir.y = 1;
});
