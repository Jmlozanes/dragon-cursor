const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;


// =====================
// MOUSE
// =====================

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};


window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});



// =====================
// DRAGON OBJECT
// =====================

let dragon = {

    x: innerWidth/2,
    y: innerHeight/2,

    angle:0,

    wingTime:0

};



// =====================
// FIRE TRAIL
// =====================

let flames=[];


function createFire(){

    flames.push({

        x: dragon.x - Math.cos(dragon.angle)*35,

        y: dragon.y - Math.sin(dragon.angle)*35,

        size: Math.random()*15+8,

        life:40

    });

}



function drawFire(){

    flames.forEach((f,index)=>{


        ctx.save();


        ctx.globalAlpha=f.life/40;


        ctx.shadowBlur=20;

        ctx.shadowColor="orange";


        ctx.fillStyle="orange";


        ctx.beginPath();

        ctx.arc(

            f.x,

            f.y,

            f.size,

            0,

            Math.PI*2

        );

        ctx.fill();



        ctx.fillStyle="yellow";

        ctx.beginPath();

        ctx.arc(

            f.x,

            f.y,

            f.size/2,

            0,

            Math.PI*2

        );

        ctx.fill();



        ctx.restore();



        f.x -= Math.cos(dragon.angle)*2;

        f.y -= Math.sin(dragon.angle)*2;


        f.life--;



        if(f.life<=0){

            flames.splice(index,1);

        }


    });

}



// =====================
// DRAW DRAGON
// =====================

function drawDragon(){


ctx.save();


ctx.translate(

dragon.x,

dragon.y

);


ctx.rotate(dragon.angle);




// GLOW

ctx.shadowBlur=25;

ctx.shadowColor="#ff4500";




// =====================
// TAIL
// =====================

ctx.strokeStyle="#8b3a20";

ctx.lineWidth=12;


ctx.beginPath();

ctx.moveTo(-20,0);

ctx.quadraticCurveTo(

-70,

20,

-120,

0

);

ctx.stroke();



// =====================
// BODY
// =====================

ctx.fillStyle="#7b2d1f";


ctx.beginPath();

ctx.ellipse(

0,

0,

45,

25,

0,

0,

Math.PI*2

);

ctx.fill();




// SCALE LINE

ctx.strokeStyle="#ffb347";

ctx.lineWidth=2;


for(let i=-30;i<30;i+=15){

ctx.beginPath();

ctx.arc(

i,

0,

10,

0,

Math.PI

);

ctx.stroke();

}



// =====================
// WINGS
// =====================

let flap =
Math.sin(Date.now()/120)*15;



ctx.fillStyle="#5a1010";


// upper wing

ctx.beginPath();

ctx.moveTo(

0,

-10

);


ctx.lineTo(

-25,

-70-flap

);


ctx.lineTo(

30,

-25

);


ctx.fill();



// lower wing

ctx.beginPath();

ctx.moveTo(

0,

10

);


ctx.lineTo(

-25,

70+flap

);


ctx.lineTo(

30,

25

);


ctx.fill();




// =====================
// HEAD
// =====================


ctx.fillStyle="#9b3b20";


ctx.beginPath();


ctx.moveTo(

30,

-25

);


ctx.lineTo(

70,

0

);


ctx.lineTo(

30,

25

);


ctx.closePath();


ctx.fill();




// SNOUT

ctx.fillStyle="#d2691e";


ctx.beginPath();

ctx.moveTo(

65,

-8

);

ctx.lineTo(

95,

0

);

ctx.lineTo(

65,

8

);

ctx.fill();




// HORNS

ctx.strokeStyle="#eee";

ctx.lineWidth=4;


ctx.beginPath();

ctx.moveTo(

35,

-20

);

ctx.lineTo(

45,

-45

);

ctx.stroke();



ctx.beginPath();

ctx.moveTo(

35,

20

);

ctx.lineTo(

45,

45

);

ctx.stroke();




// EYE

ctx.shadowBlur=15;

ctx.shadowColor="yellow";


ctx.fillStyle="yellow";


ctx.beginPath();

ctx.arc(

55,

-10,

5,

0,

Math.PI*2

);

ctx.fill();



ctx.restore();


}



// =====================
// UPDATE
// =====================

function update(){


let dx =
mouse.x-dragon.x;


let dy =
mouse.y-dragon.y;



dragon.angle =
Math.atan2(dy,dx);



dragon.x += dx*0.08;

dragon.y += dy*0.08;



createFire();


}



// =====================
// LOOP
// =====================

function animate(){


ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);



update();


drawFire();


drawDragon();



requestAnimationFrame(animate);


}


animate();



// =====================
// RESIZE
// =====================

window.addEventListener("resize",()=>{

canvas.width=innerWidth;

canvas.height=innerHeight;

});
