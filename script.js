const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");


const box = 20;

let snake = [
    {
        x: 200,
        y: 200
    }
];


let food = {
    x: 300,
    y: 300
};


let direction = "RIGHT";

let score = 0;


document.addEventListener("keydown", changeDirection);


function changeDirection(event){

    if(event.key === "ArrowUp" && direction !== "DOWN"){
        direction = "UP";
    }

    else if(event.key === "ArrowDown" && direction !== "UP"){
        direction = "DOWN";
    }

    else if(event.key === "ArrowLeft" && direction !== "RIGHT"){
        direction = "LEFT";
    }

    else if(event.key === "ArrowRight" && direction !== "LEFT"){
        direction = "RIGHT";
    }

}



function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draw snake

    snake.forEach((part)=>{

        ctx.fillStyle = "lime";

        ctx.fillRect(
            part.x,
            part.y,
            box,
            box
        );

    });


    // Draw food

    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );


    moveSnake();


    setTimeout(draw, 100);

}



function moveSnake(){

    let head = {
        x: snake[0].x,
        y: snake[0].y
    };


    if(direction === "UP"){
        head.y -= box;
    }

    if(direction === "DOWN"){
        head.y += box;
    }

    if(direction === "LEFT"){
        head.x -= box;
    }

    if(direction === "RIGHT"){
        head.x += box;
    }



    // Eat food

    if(
        head.x === food.x &&
        head.y === food.y
    ){

        score++;

        scoreText.innerHTML = score;


        food = {
            x:
            Math.floor(
                Math.random() *
                (canvas.width / box)
            ) * box,

            y:
            Math.floor(
                Math.random() *
                (canvas.height / box)
            ) * box
        };

    }

    else{

        snake.pop();

    }



    // Game over

    if(
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
    ){

        alert(
            "Game Over! Score: " + score
        );

        location.reload();

    }


    snake.unshift(head);

}



draw();
