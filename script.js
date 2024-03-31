document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const snake = document.getElementById("snake");
    const food = document.getElementById("food");
    
    let snakeX = 0;
    let snakeY = 0;
    let foodX;
    let foodY;
    let dx = 20;
    let dy = 0;
    let snakeLength = 1;
    
    function generateFood() {
      foodX = Math.floor(Math.random() * 20) * 20;
      foodY = Math.floor(Math.random() * 20) * 20;
      food.style.left = foodX + "px";
      food.style.top = foodY + "px";
    }
    
    function moveSnake() {
      snakeX += dx;
      snakeY += dy;
      snake.style.left = snakeX + "px";
      snake.style.top = snakeY + "px";
      
      if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        generateFood();
      }
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
  