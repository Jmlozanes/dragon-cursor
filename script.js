const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// =============================
// MOUSE
// =============================

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};


window.addEventListener("mousemove", (e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});


// =============================
// IMAGE LOADER
// =============================

function loadImage(src){

    let img = new Image();

    img.src = src;

    return img;

}


// =============================
// DRAGON ASSETS
// =============================


const headPath = "assets/dragon/assets/dragon/head/";

const bodyPath = "assets/dragon/assets/dragon/body/";

const tailPath = "assets/dragon/tail/";

const wingPath = "assets/dragon/wings/";

const effectPath = "assets/dragon/effects/";


const dragonHead = loadImage(
    headPath + "head_idle.png"
);


const dragonBody = loadImage(
    bodyPath + "body_segment.png"
);


const dragonTail = loadImage(
    tailPath + "tail_segment.png"
);


const fire = loadImage(
    effectPath + "fire.png"
);


const wingFrames = [

    loadImage(
        wingPath + "wing_1.png"
    ),

    loadImage(
        wingPath + "wing_2.png"
    ),

    loadImage(
        wingPath + "wing_3.png"
    )

];

// =============================
// DRAGON
// =============================


let dragon = {

    x: canvas.width / 2,

    y: canvas.height / 2,

    angle:0,

    speed:0.08

};



// BODY

let bodyParts=[];


for(let i=0;i<10;i++){

    bodyParts.push({

        x:dragon.x-(i*45),

        y:dragon.y

    });

}


// TAIL

let tailParts=[];


for(let i=0;i<5;i++){

    tailParts.push({

        x:dragon.x-(400+i*40),

        y:dragon.y

    });

}



// WING ANIMATION

let currentWing = 0;


setInterval(()=>{

    currentWing++;

    if(currentWing >= wingFrames.length){

        currentWing = 0;

    }

},200);



// FIRE PARTICLES

let fireParticles=[];



// =============================
// UPDATE
// =============================


function updateDragon(){


    let dx = mouse.x - dragon.x;

    let dy = mouse.y - dragon.y;


    dragon.angle = Math.atan2(dy,dx);



    dragon.x += dx * dragon.speed;

    dragon.y += dy * dragon.speed;



    let previous = {

        x:dragon.x,

        y:dragon.y

    };



    bodyParts.forEach(part=>{


        let old = {

            x:part.x,

            y:part.y

        };


        part.x += (previous.x-part.x)*0.2;

        part.y += (previous.y-part.y)*0.2;


        previous = old;


    });



    tailParts.forEach(part=>{


        part.x += (dragon.x-part.x)*0.03;

        part.y += (dragon.y-part.y)*0.03;


    });



    createFire();


}



// =============================
// FIRE
// =============================


function createFire(){


    fireParticles.push({

        x: dragon.x - Math.cos(dragon.angle)*80,

        y: dragon.y - Math.sin(dragon.angle)*80,

        size:70,

        life:30

    });


}




function drawFire(){


    fireParticles.forEach((p,index)=>{


        ctx.globalAlpha = p.life / 30;



        ctx.drawImage(

            fire,

            p.x-50,

            p.y-50,

            p.size,

            p.size

        );


        p.life--;



        if(p.life<=0){

            fireParticles.splice(index,1);

        }


    });



    ctx.globalAlpha=1;


}



// =============================
// DRAW DRAGON
// =============================


function drawDragon(){


// TAIL

tailParts.forEach(part=>{


ctx.save();


ctx.translate(
    part.x,
    part.y
);


ctx.rotate(dragon.angle);


ctx.drawImage(

    dragonTail,

    -70,

    -70,

    140,

    140

);


ctx.restore();


});




// BODY

bodyParts.forEach(part=>{


ctx.save();


ctx.translate(

    part.x,

    part.y

);



ctx.rotate(dragon.angle);



ctx.drawImage(

    dragonBody,

    -60,

    -60,

    120,

    120

);



ctx.restore();



});




// WINGS

ctx.save();


ctx.translate(

dragon.x,

dragon.y

);


ctx.rotate(dragon.angle);



ctx.drawImage(

wingFrames[currentWing],

-180,

-180,

360,

360

);


ctx.restore();




// HEAD

ctx.save();


ctx.translate(

dragon.x,

dragon.y

);



ctx.rotate(dragon.angle);



ctx.drawImage(

dragonHead,

-100,

-100,

200,

200

);



ctx.restore();



}



// =============================
// LOOP
// =============================


function animate(){


ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);



updateDragon();


drawFire();


drawDragon();



requestAnimationFrame(animate);


}



animate();




// =============================
// RESIZE
// =============================


window.addEventListener("resize",()=>{


canvas.width = window.innerWidth;

canvas.height = window.innerHeight;


});
