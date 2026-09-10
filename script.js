const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;


// ==========================
// MOUSE
// ==========================

let mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};


window.addEventListener("mousemove", e=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});



// ==========================
// DRAGON
// ==========================

let dragon = {

    x: innerWidth/2,
    y: innerHeight/2,

    angle:0

};



// ==========================
// BODY TRAIL
// ==========================

let segments=[];


for(let i=0;i<18;i++){

    segments.push({

        x:dragon.x,
        y:dragon.y,

        size:30-i

    });

}



// ==========================
// FIRE PARTICLES
// ==========================

let fire=[];



function createFire(x,y){

    for(let i=0;i<3;i++){

        fire.push({

            x:x,
            y:y,

            size:Math.random()*12+5,

            life:40

        });

    }

}



function drawFire(){

    fire.forEach((p,index)=>{


        ctx.beginPath();


        ctx.fillStyle=
        `rgba(255,${80+Math.random()*150},0,${p.life/40})`;


        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI*2
        );


        ctx.fill();


        p.y+=Math.random()*2-1;

        p.life--;


        if(p.life<=0){

            fire.splice(index,1);

        }


    });

}



// ==========================
// DRAW DRAGON
// ==========================

function drawDragon(){


    ctx.save();


    ctx.translate(
        dragon.x,
        dragon.y
    );


    ctx.rotate(dragon.angle);



    // body glow

    segments.forEach((s,i)=>{


        ctx.beginPath();


        ctx.fillStyle =
        `rgba(255,130,20,${1-i/25})`;


        ctx.shadowBlur=20;

        ctx.shadowColor="orange";


        ctx.arc(

            s.x-dragon.x,

            s.y-dragon.y,

            s.size/2,

            0,

            Math.PI*2

        );


        ctx.fill();


    });





    // HEAD

    ctx.shadowBlur=30;

    ctx.shadowColor="orange";


    ctx.fillStyle="#ff7b20";


    ctx.beginPath();

    ctx.arc(

        0,

        0,

        28,

        0,

        Math.PI*2

    );

    ctx.fill();



    // EYE

    ctx.fillStyle="yellow";


    ctx.beginPath();

    ctx.arc(

        10,

        -8,

        5,

        0,

        Math.PI*2

    );

    ctx.fill();




    // HORN

    ctx.strokeStyle="white";

    ctx.lineWidth=3;


    ctx.beginPath();

    ctx.moveTo(20,-20);

    ctx.lineTo(35,-35);

    ctx.stroke();



    ctx.restore();

}



// ==========================
// UPDATE
// ==========================

function update(){


    let dx=
    mouse.x-dragon.x;


    let dy=
    mouse.y-dragon.y;



    dragon.angle=
    Math.atan2(dy,dx);



    dragon.x += dx*0.08;

    dragon.y += dy*0.08;



    // move body

    let previous={

        x:dragon.x,

        y:dragon.y

    };


    segments.forEach(s=>{


        let temp={

            x:s.x,

            y:s.y

        };


        s.x +=
        (previous.x-s.x)*0.25;


        s.y +=
        (previous.y-s.y)*0.25;


        previous=temp;


    });



    createFire(

        segments[segments.length-1].x,

        segments[segments.length-1].y

    );


}



// ==========================
// LOOP
// ==========================

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



// ==========================
// RESIZE
// ==========================

window.addEventListener("resize",()=>{

    canvas.width=innerWidth;

    canvas.height=innerHeight;

});
