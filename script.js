const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};


let dragon = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0.05
};


// Dragon body segments

let body = [];

const bodyLength = 12;

for (let i = 0; i < bodyLength; i++) {

    body.push({
        x: dragon.x - (i * 20),
        y: dragon.y
    });

}


// Particle system

let particles = [];


// Mouse tracking

document.addEventListener("mousemove", (event)=>{

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


// Create fire particles

function createFire(){

    particles.push({

        x: dragon.x - Math.cos(dragon.angle) * 30,
        y: dragon.y - Math.sin(dragon.angle) * 30,

        size: Math.random() * 8 + 3,

        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,

        life: 50

    });

}



// Update dragon movement

function updateDragon(){


    let dx = mouse.x - dragon.x;
    let dy = mouse.y - dragon.y;


    dragon.angle = Math.atan2(dy, dx);


    dragon.x += dx * dragon.speed;
    dragon.y += dy * dragon.speed;



    let previous = {

        x: dragon.x,
        y: dragon.y

    };



    body.forEach(segment=>{


        let oldX = segment.x;
        let oldY = segment.y;


        segment.x += (previous.x - segment.x) * 0.2;
        segment.y += (previous.y - segment.y) * 0.2;


        previous.x = oldX;
        previous.y = oldY;


    });



    createFire();



}



// Draw dragon

function drawDragon(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    // Fire particles

    particles.forEach((particle,index)=>{


        ctx.fillStyle = "orange";

        ctx.shadowColor = "red";
        ctx.shadowBlur = 20;


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();



        particle.x += particle.speedX;
        particle.y += particle.speedY;

        particle.life--;



        if(particle.life <= 0){

            particles.splice(index,1);

        }


    });



    ctx.shadowColor = "orange";
    ctx.shadowBlur = 30;



    // Tail / body

    body.forEach((segment,index)=>{


        ctx.fillStyle = index === 0
        ? "#b87333"
        : "#6b3e1e";



        ctx.beginPath();

        ctx.arc(

            segment.x,
            segment.y,

            25 - index,

            0,

            Math.PI * 2

        );


        ctx.fill();


    });



    // Dragon head

    ctx.save();


    ctx.translate(
        dragon.x,
        dragon.y
    );


    ctx.rotate(dragon.angle);



    // Head

    ctx.fillStyle = "#d2691e";


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        35,
        0,
        Math.PI * 2
    );


    ctx.fill();



    // Eye

    ctx.fillStyle = "yellow";


    ctx.beginPath();

    ctx.arc(
        15,
        -12,
        7,
        0,
        Math.PI * 2
    );


    ctx.fill();



    // Horns

    ctx.fillStyle = "#eee";


    ctx.beginPath();

    ctx.moveTo(
        -10,
        -25
    );

    ctx.lineTo(
        -25,
        -50
    );

    ctx.lineTo(
        0,
        -25
    );

    ctx.fill();



    ctx.restore();



}




function animate(){

    updateDragon();

    drawDragon();

    requestAnimationFrame(animate);

}



animate();



// Resize support

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
