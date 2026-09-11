// ======================================================
// EXO CENTIPEDE TITAN-01
// CLEAN BOSS ENGINE v4.1
// ======================================================


// ==============================
// CANVAS
// ==============================

const canvas = document.getElementById("bossCanvas");

const ctx = canvas.getContext("2d");


function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resize();


window.addEventListener("resize",resize);




// ==============================
// MOUSE
// ==============================

const mouse = {

    x: canvas.width/2,
    y: canvas.height/2

};


window.addEventListener("mousemove",(e)=>{


    mouse.x=e.clientX;

    mouse.y=e.clientY;


});




// ==============================
// BOSS DATA
// ==============================


const boss = {

    segments:[],

    amount:80,

    spacing:16,

    speed:0.08

};




// create segments

for(let i=0;i<boss.amount;i++){


    boss.segments.push({

        x:canvas.width/2-i*boss.spacing,

        y:canvas.height/2,

        angle:0


    });


}







// ==============================
// MOVEMENT ENGINE
// ==============================


function updateMovement(){



    let head=boss.segments[0];



    head.x += (mouse.x-head.x)*boss.speed;

    head.y += (mouse.y-head.y)*boss.speed;



    for(let i=1;i<boss.segments.length;i++){


        let current=boss.segments[i];

        let previous=boss.segments[i-1];



        let dx=previous.x-current.x;

        let dy=previous.y-current.y;



        let distance=Math.sqrt(dx*dx+dy*dy);



        if(distance>boss.spacing){


            current.x +=

            dx/distance*

            (distance-boss.spacing);



            current.y +=

            dy/distance*

            (distance-boss.spacing);


        }



        current.angle=Math.atan2(dy,dx);


    }


}






// ==============================
// PARTICLES
// ==============================


let particles=[];



function createParticle(x,y,type){


    particles.push({

        x:x,

        y:y,

        vx:(Math.random()-0.5)*4,

        vy:(Math.random()-0.5)*4,

        life:50,

        size:Math.random()*4+2,

        type:type

    });


}



function updateParticles(){


    for(let i=particles.length-1;i>=0;i--){


        let p=particles[i];


        p.x+=p.vx;

        p.y+=p.vy;


        p.life--;



        if(p.life<=0){

            particles.splice(i,1);

        }


    }


}



function drawParticles(){


    particles.forEach(p=>{


        ctx.beginPath();


        if(p.type==="fire"){

            ctx.fillStyle="#ff5500";

        }

        else{

            ctx.fillStyle="#00ffff";

        }



        ctx.shadowBlur=20;

        ctx.shadowColor=ctx.fillStyle;



        ctx.arc(

            p.x,

            p.y,

            p.size,

            0,

            Math.PI*2

        );


        ctx.fill();



        ctx.shadowBlur=0;



    });


}







// ==============================
// LEGS
// ==============================


function drawLegs(segment,index){



    let wave=Math.sin(Date.now()*0.015+index);



    let side=index%2===0?1:-1;



    ctx.strokeStyle="#00ffff";

    ctx.lineWidth=2;



    ctx.beginPath();


    ctx.moveTo(

        segment.x,

        segment.y

    );


    ctx.lineTo(

        segment.x+

        Math.cos(segment.angle+side*1.2)

        *

        (25+wave*5),



        segment.y+

        Math.sin(segment.angle+side*1.2)

        *

        (25+wave*5)


    );


    ctx.stroke();



}







// ==============================
// BODY
// ==============================


function drawBody(){


    let body=boss.segments;



    ctx.beginPath();


    ctx.strokeStyle="#00ffff";

    ctx.lineWidth=3;



    for(let i=0;i<body.length-1;i++){


        ctx.moveTo(

            body[i].x,

            body[i].y

        );


        ctx.lineTo(

            body[i+1].x,

            body[i+1].y

        );


    }



    ctx.stroke();





    body.forEach((segment,index)=>{


        drawLegs(segment,index);



        ctx.beginPath();



        let radius=index===0?25:13;



        ctx.fillStyle=

        index===0

        ?

        "#ff003c"

        :

        "#182027";



        ctx.strokeStyle="#00ffff";

        ctx.lineWidth=2;



        ctx.arc(

            segment.x,

            segment.y,

            radius,

            0,

            Math.PI*2

        );



        ctx.fill();

        ctx.stroke();



    });



}








// ==============================
// HEAD
// ==============================


function drawHead(){



    let h=boss.segments[0];



    ctx.fillStyle="white";



    ctx.beginPath();



    ctx.arc(

        h.x-8,

        h.y-8,

        5,

        0,

        Math.PI*2

    );



    ctx.arc(

        h.x+8,

        h.y-8,

        5,

        0,

        Math.PI*2

    );



    ctx.fill();



}






// ==============================
// LASER
// ==============================


let laser=false;



canvas.addEventListener("mousedown",(e)=>{


    if(e.button===0){

        laser=true;

    }


});



canvas.addEventListener("mouseup",(e)=>{


    if(e.button===0){

        laser=false;

    }


});





function drawLaser(){


    if(!laser)return;



    let h=boss.segments[0];



    ctx.beginPath();


    ctx.strokeStyle="#ff003c";

    ctx.lineWidth=5;



    ctx.moveTo(

        h.x,

        h.y

    );


    ctx.lineTo(

        mouse.x,

        mouse.y

    );


    ctx.stroke();



    createParticle(

        mouse.x,

        mouse.y,

        "energy"

    );


}







// ==============================
// SHOCKWAVE
// ==============================


let waves=[];



canvas.addEventListener("click",()=>{


    waves.push({

        x:mouse.x,

        y:mouse.y,

        r:0

    });


});



function drawShockwave(){


    waves.forEach((w,i)=>{


        w.r+=8;



        ctx.beginPath();


        ctx.strokeStyle="#00ffff";

        ctx.arc(

            w.x,

            w.y,

            w.r,

            0,

            Math.PI*2

        );


        ctx.stroke();



        if(w.r>300){

            waves.splice(i,1);

        }


    });


}






// ==============================
// BOOST
// ==============================


window.addEventListener("keydown",(e)=>{


    if(e.code==="ShiftLeft" || e.code==="ShiftRight"){


        boss.speed=0.18;


    }


});



window.addEventListener("keyup",(e)=>{


    if(e.code==="ShiftLeft" || e.code==="ShiftRight"){


        boss.speed=0.08;


    }


});






// ==============================
// EFFECTS
// ==============================


function plasma(){


    for(let i=20;i<boss.segments.length;i+=4){


        let s=boss.segments[i];


        createParticle(

            s.x,

            s.y,

            "fire"

        );


    }


}




function grid(){


    ctx.strokeStyle="rgba(0,255,255,0.08)";


    for(let x=0;x<canvas.width;x+=80){


        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(x,canvas.height);

        ctx.stroke();


    }


}







// ==============================
// GAME LOOP
// ==============================


function animate(){



    ctx.fillStyle="rgba(0,0,0,0.35)";

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    grid();



    updateMovement();


    plasma();


    updateParticles();


    drawParticles();



    drawBody();


    drawHead();


    drawLaser();


    drawShockwave();



    requestAnimationFrame(animate);


}



animate();
