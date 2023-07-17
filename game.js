const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

class Ball {
    constructor() {
        this.color = "green";
        this.radius = 20;
        this.speedX = 5;
        this.speedY = 3;
        this.posX = 20;
        this.posY = 20;
    }
}

class Plank {
    constructor() {
        this.color="grey";
        this.height = 10;
        this.width = 75;
        this.speedY = 3;
        this.posX =  30;
    }
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown",(e) => keyDownHandler (e),false);
document.addEventListener("keyup",(e) => keyUpHandler(e),false);

/**
 * Обработчик нажатия клавиш
 * @param {Event} e 
 */
const keyDownHandler = (e) =>{
    switch (e.keyCode){
        case (39):
            rightPressed = true;
            break;
        case(37):
            leftPressed = true;
            break;
        default: break;
    }
}

/**
 * Обработчик отпускания клавиш
 * @param {Event} e 
 */
const keyUpHandler = (e) =>{
    switch (e.keyCode){
        case (39):
            rightPressed = false;
            break;
        case(37):
            leftPressed = false;
            break;
        default: break;
    }
}

/**
 * Отрисовка доски
 * @param {Plank} plank 
 */
const drawPlank = (plank) =>{
    if (rightPressed && plank.posX < canvas.width - plank.width){
        plank.posX += 7;
    } else if (leftPressed && plank.posX > 0)
        plank.posX -= 7

    ctx.beginPath();
    ctx.rect(plank.posX, canvas.height -  plank.height,  plank.width,  plank.height);
    ctx.fillStyle =  plank.color;
    ctx.fill();
    ctx.closePath();
}

/**
 * Отрисовка шарика
* @param {Ball} ball 
 */
const drawBall = (ball) =>{
    checkDirection(ball)
    ctx.beginPath();
    ctx.arc(ball.posX,ball.posY,ball.radius,0, Math.PI*2,false);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

/**
 * Перерисовка всего canvas
 */
const draw = () =>{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBall(ball);
    drawPlank(plank);
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;
}

/**
 * Проверка на выход за границы
 * @param {Item} item 
 */
const checkDirection = (item) =>{
    let width = item.radius || item.width;
    let height = item.radius || item.height;
    if (item.posY){
        if (item.posY + item.speedY + height > canvas.height){
            item.speedY *= -1;
        }
        if (item.posY + item.speedY - height < 0){
            item.speedY *= -1;
        }
    }
    if (item.posX + item.speedX + width > canvas.width){
        item.speedX *= -1;
    }
    if (item.posX + item.speedX - width < 0){
        item.speedX *= -1;
    }
}

let ball = new Ball();
let plank = new Plank();
setInterval(draw,1000/30)           //Около 30 кадров в секунду