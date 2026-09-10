const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// =============================
// MOUSE TRACKING
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
// LOAD DRAGON ASSETS
// =============================


function loadImage(src){

    let img = new Image();
    img.src = src;

    return img;

}


const dragonHead = loadImage(
    "assets/dragon/head/head_idle.png"
);


const dragonBody = loadImage(
    "assets/dragon/body/body_segment.png"
);


const dragonTail = loadImage(
    "assets/dragon/tail/tail_segment.png"
);


const fire = loadImage(
    "assets/dragon/effects/fire.png"
);



const wingFrames = [

    loadImage(
        "assets/dragon/wings/wing_1.png"
    ),

    loadImage(
        "assets/dragon/wings/wing_2.png"
    ),

    loadImage(
        "assets/dragon/wings/wing_3.png"
    )

];



let imagesLoaded = false;



let allImages = [

dragonHead,
dragonBody,
dragonTail,
fire,
...wingFrames

];



function checkImages(){


    imagesLoaded = allImages.every(
        img => img.complete
    );


}


setInterval(checkImages,100);



// =============================
// DRAGON DATA
// =============================


let dragon = {

    x: canvas.width/2,

    y: canvas.height/2,

    angle:0,

    speed:0.08

};



// body chain

let bodyParts=[];


for(let i=0;i<10;i++){

    bodyParts.push({

        x:dragon.x - i*40,

        y:dragon.y

    });

}



// tail chain

let tailParts=[];


for(let i=0;i<6;i++){

    tailParts.push({

        x:dragon.x-300-(i*35),

        y:dragon.y

    });

}




// wing animation

let currentWing=0;


setInterval(()=>{

    currentWing++;

    if(currentWing>=3){

        currentWing=0;

    }

},150);




// fire particles

let fireParticles=[];



// =============================
// UPDATE
// =============================


function updateDragon(){


    let dx = mouse.x-dragon.x;

    let dy = mouse.y-dragon.y;



    dragon.angle = Math.atan2(
        dy,
        dx
    );



    dragon.x += dx * dragon.speed;

    dragon.y += dy * dragon.speed;




    let previous={

        x:dragon.x,

        y:dragon.y

    };



    bodyParts.forEach(part=>{


        let old={

            x:part.x,

            y:part.y

        };


        part.x += 
        (previous.x-part.x)*0.2;


        part.y +=
        (previous.y-part.y)*0.2;


        previous=old;


    });



    tailParts.forEach(part=>{


        part.x +=
        (dragon.x-part.x)*0.05;


        part.y +=
        (dragon.y-part.y)*0.05;



    });



    createFire();


}



// =============================
// FIRE EFFECT
// =============================


function createFire(){


fireParticles.push({

    x:dragon.x - Math.cos(dragon.angle)*80,

    y:dragon.y - Math.sin(dragon.angle)*80,

    size:80,

    life:40

});


}



function drawFire(){


fireParticles.forEach((p,index)=>{


ctx.globalAlpha = p.life/40;


ctx.drawImage(

fire,

p.x-p.size/2,

p.y-p.size/2,

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



// tail

tailParts.forEach((part)=>{


ctx.save();


ctx.translate(
    part.x,
    part.y
);


ctx.rotate(
    dragon.angle
);



ctx.drawImage(

dragonTail,

-60,

-60,

120,

120

);


ctx.restore();



});





// body

bodyParts.forEach((part)=>{


ctx.save();


ctx.translate(

part.x,

part.y

);



ctx.rotate(

dragon.angle

);



ctx.drawImage(

dragonBody,

-55,

-55,

110,

110

);



ctx.restore();



});





// wings


ctx.save();


ctx.translate(

dragon.x,

dragon.y

);



ctx.rotate(

dragon.angle

);



ctx.drawImage(

wingFrames[currentWing],

-170,

-170,

340,

340

);



ctx.restore();







// head


ctx.save();


ctx.translate(

dragon.x,

dragon.y

);



ctx.rotate(

dragon.angle

);



ctx.drawImage(

dragonHead,

-90,

-90,

180,

180

);



ctx.restore();



}



// =============================
// MAIN LOOP
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


window.addEventListener(
"resize",
()=>{

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;


});
