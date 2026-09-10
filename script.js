const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// =============================
// MOUSE
// =============================

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};


window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});



// =============================
// DRAGON
// =============================

let dragon = {

    x: mouse.x,
    y: mouse.y,

    angle:0,

    wing:0

};



// =============================
// FIRE PARTICLES
// =============================

let fireParticles = [];



function createFire(){

    fireParticles.push({

        x: dragon.x - Math.cos(dragon.angle)*25,

        y: dragon.y - Math.sin(dragon.angle)*25,

        size: Math.random()*12+5,

        life:40

    });

}



function drawFire(){


    fireParticles.forEach((p,index)=>{


        ctx.beginPath();

        ctx.fillStyle = 
        `rgba(255, ${100+Math.random()*100}, 0, ${p.life/40})`;

        ctx.arc(

            p.x,

            p.y,

            p.size,

            0,

            Math.PI*2

        );

        ctx.fill();



        p.x -= Math.cos(dragon.angle)*2;

        p.y -= Math.sin(dragon.angle)*2;


        p.life--;



        if(p.life<=0){

            fireParticles.splice(index,1);

        }


    });


}



// =============================
// DRAW DRAGON
// =============================


function drawDragon(){


ctx.save();


ctx.translate(

dragon.x,

dragon.y

);



ctx.rotate(dragon.angle);




// BODY

ctx.fillStyle="#222";

ctx.beginPath();

ctx.ellipse(

0,

0,

25,

15,

0,

0,

Math.PI*2

);

ctx.fill();




// HEAD

ctx.fillStyle="#333";


ctx.beginPath();

ctx.arc(

25,

0,

18,

0,

Math.PI*2

);

ctx.fill();




// EYES

ctx.fillStyle="orange";


ctx.beginPath();

ctx.arc(

32,

-6,

4,

0,

Math.PI*2

);

ctx.fill();



ctx.beginPath();

ctx.arc(

32,

6,

4,

0,

Math.PI*2

);

ctx.fill();




// HORNS

ctx.strokeStyle="#aaa";

ctx.lineWidth=3;


ctx.beginPath();

ctx.moveTo(

35,

-12

);

ctx.lineTo(

45,

-22

);

ctx.stroke();



ctx.beginPath();

ctx.moveTo(

35,

12

);

ctx.lineTo(

45,

22

);

ctx.stroke();




// WINGS

let flap = Math.sin(Date.now()/100)*8;


ctx.fillStyle="#8b0000";


ctx.beginPath();

ctx.moveTo(

0,

-10

);


ctx.lineTo(

-20,

-35-flap

);


ctx.lineTo(

10,

-15

);


ctx.fill();



ctx.beginPath();

ctx.moveTo(

0,

10

);


ctx.lineTo(

-20,

35+flap

);


ctx.lineTo(

10,

15

);


ctx.fill();





// TAIL

ctx.strokeStyle="#333";

ctx.lineWidth=8;


ctx.beginPath();


ctx.moveTo(

-20,

0

);


ctx.quadraticCurveTo(

-50,

10,

-70,

0

);


ctx.stroke();




// FIRE BREATH

ctx.fillStyle="orange";


ctx.beginPath();

ctx.arc(

55,

0,

8,

0,

Math.PI*2

);


ctx.fill();



ctx.restore();


}



// =============================
// UPDATE
// =============================


function update(){


let dx = mouse.x - dragon.x;

let dy = mouse.y - dragon.y;



dragon.angle = Math.atan2(

dy,

dx

);



dragon.x += dx*0.08;

dragon.y += dy*0.08;



createFire();


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



update();


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
