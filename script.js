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

const assetPath = "assets/";


const dragonHead = loadImage(
    assetPath + "head_idle.png"
);


const dragonBody = loadImage(
    assetPath + "body_segment.png"
);


const dragonTail = loadImage(
    assetPath + "tail_segment.png"
);


const fire = loadImage(
    assetPath + "fire.png"
);


const wingFrames = [

    loadImage(assetPath + "wing_1.png"),

    loadImage(assetPath + "wing_2.png"),

    loadImage(assetPath + "wing_3.png")

];

let imagesLoaded = false;


function checkImages(){


    imagesLoaded = [

        dragonHead,
        dragonBody,
        dragonTail,
        fire,
        ...wingFrames

    ].every(img => img.complete && img.naturalWidth > 0);


}


setInterval(checkImages,100);



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

        x: dragon.x - (i*45),

        y: dragon.y

    });

}



// TAIL

let tailParts=[];


for(let i=0;i<5;i++){

    tailParts.push({

        x: dragon.x - (400+i*40),

        y: dragon.y

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



// FIRE

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



        part.x += (previous.x - part.x) * 0.2;

        part.y += (previous.y - part.y) * 0.2;


        previous = old;


    });



    tailParts.forEach(part=>{


        part.x += (dragon.x - part.x) * 0.03;

        part.y += (dragon.y - part.y) * 0.03;


    });



    createFire();


}



// =============================
// FIRE EFFECT
// =============================


function createFire(){


    fireParticles.push({

        x: dragon.x - Math.cos(dragon.angle)*100,

        y: dragon.y - Math.sin(dragon.angle)*100,

        life:30,

        size:70

    });


}



function drawFire(){


    fireParticles.forEach((p,index)=>{


        ctx.globalAlpha = p.life / 30;



        if(fire.complete){

            ctx.drawImage(

                fire,

                p.x - p.size/2,

                p.y - p.size/2,

                p.size,

                p.size

            );

        }



        p.life--;



        if(p.life <= 0){

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



if(dragonTail.complete){

ctx.drawImage(

dragonTail,

-70,

-70,

140,

140

);

}



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



if(dragonBody.complete){

ctx.drawImage(

dragonBody,

-60,

-60,

120,

120

);

}



ctx.restore();


});





// WINGS

ctx.save();


ctx.translate(

dragon.x,

dragon.y

);



ctx.rotate(dragon.angle);



if(wingFrames[currentWing].complete){

ctx.drawImage(

wingFrames[currentWing],

-180,

-180,

360,

360

);

}



ctx.restore();





// HEAD

ctx.save();


ctx.translate(

dragon.x,

dragon.y

);



ctx.rotate(dragon.angle);



if(dragonHead.complete){

ctx.drawImage(

dragonHead,

-100,

-100,

200,

200

);

}



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



if(imagesLoaded){

    updateDragon();

    drawFire();

    drawDragon();

}


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
