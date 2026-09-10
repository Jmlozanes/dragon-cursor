const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// =======================
// MOUSE
// =======================

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};


window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});


// =======================
// LOAD ASSETS
// =======================

const headImg = new Image();
headImg.src = "assets/dragon/head/head_idle.png";


const bodyImg = new Image();
bodyImg.src = "assets/dragon/body/body_segment.png";


const tailImg = new Image();
tailImg.src = "assets/dragon/tail/tail_segment.png";


const fireImg = new Image();
fireImg.src = "assets/dragon/effects/fire.png";


const wings = [

"assets/dragon/wings/wing_1.png",

"assets/dragon/wings/wing_2.png",

"assets/dragon/wings/wing_3.png"

];


let wingImages = [];

wings.forEach(src=>{

    let img = new Image();

    img.src = src;

    wingImages.push(img);

});


let wingFrame = 0;


setInterval(()=>{

    wingFrame++;

    if(wingFrame >= wingImages.length){

        wingFrame = 0;

    }

},180);



// =======================
// DRAGON
// =======================


const dragon = {

    x: canvas.width/2,

    y: canvas.height/2,

    angle:0,

    speed:0.08

};



let bodySegments=[];



for(let i=0;i<12;i++){

    bodySegments.push({

        x:dragon.x-(i*30),

        y:dragon.y

    });

}



// Fire particles

let fireParticles=[];



// =======================
// UPDATE
// =======================


function update(){


    let dx = mouse.x-dragon.x;

    let dy = mouse.y-dragon.y;


    dragon.angle=Math.atan2(dy,dx);



    dragon.x += dx*dragon.speed;

    dragon.y += dy*dragon.speed;



    let previous={

        x:dragon.x,

        y:dragon.y

    };



    bodySegments.forEach(segment=>{


        let old={

            x:segment.x,

            y:segment.y

        };


        segment.x += (previous.x-segment.x)*0.25;

        segment.y += (previous.y-segment.y)*0.25;



        previous=old;


    });



    createFire();


}



// =======================
// FIRE
// =======================


function createFire(){


    fireParticles.push({

        x:dragon.x,

        y:dragon.y,


        size:Math.random()*15+5,


        life:40

    });


}



// =======================
// DRAW
// =======================


function draw(){


ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);



ctx.save();



// Fire

fireParticles.forEach((p,index)=>{


    ctx.globalAlpha=p.life/40;


    ctx.drawImage(

        fireImg,

        p.x-50,

        p.y-20,

        100,

        40

    );


    p.life--;


    if(p.life<=0){

        fireParticles.splice(index,1);

    }


});


ctx.globalAlpha=1;



// Body


bodySegments.forEach((seg,index)=>{


    ctx.drawImage(

        bodyImg,

        seg.x-30,

        seg.y-30,

        60,

        60

    );


});



// Wings


ctx.save();


ctx.translate(

dragon.x,

dragon.y

);


ctx.rotate(dragon.angle);


ctx.drawImage(

wingImages[wingFrame],

-80,

-120,

160,

160

);


ctx.restore();




// Head


ctx.translate(

dragon.x,

dragon.y

);


ctx.rotate(dragon.angle);



ctx.drawImage(

headImg,

-50,

-50,

100,

100

);



ctx.restore();



}



// =======================
// LOOP
// =======================


function animate(){

    update();

    draw();

    requestAnimationFrame(animate);

}


animate();



// =======================
// RESIZE
// =======================


window.addEventListener("resize",()=>{


canvas.width=window.innerWidth;

canvas.height=window.innerHeight;


});
