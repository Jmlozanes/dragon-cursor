const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;


let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};


let dragon = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 40
};


document.addEventListener("mousemove", (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});



function updateDragon(){

    // smooth follow movement

    dragon.x += (mouse.x - dragon.x) * 0.05;
    dragon.y += (mouse.y - dragon.y) * 0.05;

}



function drawDragon(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // dragon glow

    ctx.shadowColor = "orange";
    ctx.shadowBlur = 25;


    // dragon body

    ctx.fillStyle = "#8b4513";

    ctx.beginPath();

    ctx.arc(
        dragon.x,
        dragon.y,
        dragon.size,
        0,
        Math.PI * 2
    );

    ctx.fill();



    // dragon head

    ctx.fillStyle = "#d2691e";

    ctx.beginPath();

    ctx.arc(
        dragon.x + 35,
        dragon.y - 10,
        25,
        0,
        Math.PI * 2
    );

    ctx.fill();



    // eye

    ctx.fillStyle = "yellow";

    ctx.beginPath();

    ctx.arc(
        dragon.x + 45,
        dragon.y - 18,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();


}



function animate(){

    updateDragon();

    drawDragon();

    requestAnimationFrame(animate);

}


animate();
