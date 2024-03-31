

document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("game-container");
  const snake = document.getElementById("snake");
  const food = document.getElementById("food");
  const gameOverMessage = document.getElementById("game-over");

  let snakeX = 0;
  let snakeY = 0;
  let foodX;
  let foodY;
  let dx = 20;
  let dy = 0;
  let snakeLength = 1;
  let gameEnded = false;

  function generateFood() {
    foodX = Math.floor(Math.random() * 20) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
  }

  function moveSnake() {
    if (gameEnded) return;
    
    snakeX += dx;
    snakeY += dy;

    if (snakeX >= 400 || snakeX < 0 || snakeY >= 400 || snakeY < 0 || checkCollision(snakeX, snakeY)) {
      endGame();
      return;
    }

    snake.style.left = snakeX + "px";
    snake.style.top = snakeY + "px";

    if (snakeX === foodX && snakeY === foodY) {
      snakeLength++;
      generateFood();
    }

  }

  function checkCollision(x, y) {
    const parts = document.querySelectorAll('#snake > div');
    for (let part of parts) {
      if (parseInt(part.style.left) === x && parseInt(part.style.top) === y) {
        return true;
      }
    }
    return false;
  }

  function updateSnake() {
    const snakeBody = document.querySelectorAll("#snake .snake-body");
    snakeBody.forEach(segment => segment.remove());

    snakeSegments.forEach(segment => {
      const bodyPart = document.createElement("div");
      bodyPart.classList.add("snake-body");
      bodyPart.style.left = segment.x + "px";
      bodyPart.style.top = segment.y + "px";
      snake.appendChild(bodyPart);
    });
  }

  function endGame() {
    gameEnded = true;
    gameOverMessage.style.display = "block";
  }

  function gameLoop() {
    moveSnake();
    setTimeout(gameLoop, 200);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && dx !== 20) {
      dx = -20;
      dy = 0;
    } else if (e.key === "ArrowRight" && dx !== -20) {
      dx = 20;
      dy = 0;
    } else if (e.key === "ArrowUp" && dy !== 20) {
      dx = 0;
      dy = -20;
    } else if (e.key === "ArrowDown" && dy !== -20) {
      dx = 0;
      dy = 20;
    }
  });

  generateFood();
  gameLoop();
});
