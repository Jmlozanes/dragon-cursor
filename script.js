// ======================================================
// EXO CENTIPEDE TITAN-01
// CORE ENGINE
// ======================================================


// ==============================
// CANVAS SETUP
// ==============================

const canvas = document.getElementById("bossCanvas");

const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});




// ==============================
// MOUSE TRACKING
// ==============================


const mouse = {

    x: canvas.width/2,

    y: canvas.height/2

};



window.addEventListener("mousemove",(e)=>{


    mouse.x = e.clientX;

    mouse.y = e.clientY;


});





// ==============================
// CENTIPEDE CONFIGURATION
// ==============================


const boss = {


    segments:[],


    amount:80,


    spacing:16,


    speed:0.08,


    scale:1


};





// ==============================
// CREATE BODY
// ==============================


for(let i=0;i<boss.amount;i++){


    boss.segments.push({

        x:canvas.width/2 - i*boss.spacing,

        y:canvas.height/2,


        angle:0,


        offset:Math.random()*Math.PI*2


    });


}







// ==============================
// MOVEMENT AI
// ==============================


function updateMovement(){



    let head=boss.segments[0];



    // head follows cursor


    head.x += (mouse.x-head.x)*boss.speed;


    head.y += (mouse.y-head.y)*boss.speed;





    // body follows previous segment


    for(let i=1;i<boss.segments.length;i++){


        let current=boss.segments[i];

        let previous=boss.segments[i-1];



        let dx=previous.x-current.x;

        let dy=previous.y-current.y;



        let distance=Math.sqrt(dx*dx+dy*dy);




        if(distance>boss.spacing){


            current.x +=

            (dx/distance)

            *

            (distance-boss.spacing);



            current.y +=

            (dy/distance)

            *

            (distance-boss.spacing);



        }



        current.angle=Math.atan2(dy,dx);



    }


}






// ==============================
// DRAW LEGS
// ==============================


function drawLegs(segment,index){



    let wave=Math.sin(Date.now()*0.01+index);


    let side=index%2===0?1:-1;



    ctx.strokeStyle="#00ffff";

    ctx.lineWidth=2;



    ctx.beginPath();


    ctx.moveTo(

        segment.x,

        segment.y

    );



    ctx.lineTo(

        segment.x +

        Math.cos(segment.angle+side*1.3)

        *

        (25+wave*5),



        segment.y +

        Math.sin(segment.angle+side*1.3)

        *

        (25+wave*5)


    );



    ctx.stroke();



}







// ==============================
// DRAW ARMOR SEGMENTS
// ==============================


function drawBody(){



    const body=boss.segments;



    // reactor spine


    ctx.beginPath();


    ctx.strokeStyle="#00ffff";


    ctx.shadowBlur=15;

    ctx.shadowColor="#00ffff";


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


    ctx.shadowBlur=0;





    // armor plates


    body.forEach((segment,index)=>{


        drawLegs(segment,index);



        ctx.beginPath();



        let radius=index===0?25:13;



        // head

        if(index===0){


            ctx.fillStyle="#ff003c";


        }

        else{


            ctx.fillStyle=

            index%3===0

            ?

            "#303841"

            :

            "#111820";


        }




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




        // armor ring


        if(index!==0){


            ctx.beginPath();


            ctx.strokeStyle="#566";


            ctx.arc(

                segment.x,

                segment.y,

                radius-5,

                0,

                Math.PI*2

            );


            ctx.stroke();



        }



    });



}









// ==============================
// HEAD SYSTEM
// ==============================


function drawHead(){



    let head=boss.segments[0];



    ctx.shadowBlur=25;

    ctx.shadowColor="#ff003c";



    ctx.fillStyle="#ffffff";



    ctx.beginPath();



    ctx.arc(

        head.x-9,

        head.y-8,

        5,

        0,

        Math.PI*2

    );



    ctx.arc(

        head.x+9,

        head.y-8,

        5,

        0,

        Math.PI*2

    );



    ctx.fill();



    ctx.shadowBlur=0;



}







// ==============================
// CYBER BACKGROUND
// ==============================


function drawBackground(){



    ctx.fillStyle="rgba(2,3,4,0.35)";


    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



}







// ==============================
// MAIN ENGINE LOOP
// ==============================


function animate(){



    drawBackground();



    updateMovement();



    drawBody();



    drawHead();




    requestAnimationFrame(animate);


}




animate();
