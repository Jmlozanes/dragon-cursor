const canvas = document.getElementById("centipedeCanvas");

const ctx = canvas.getContext("2d");



// ===============================
// CANVAS SIZE
// ===============================

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



window.addEventListener("resize",()=>{

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

});



// ===============================
// MOUSE
// ===============================

let mouse={

x:canvas.width/2,
y:canvas.height/2

};


window.addEventListener("mousemove",(e)=>{

mouse.x=e.clientX;
mouse.y=e.clientY;

});




// ===============================
// CENTIPEDE SETTINGS
// ===============================


const centipede={

segments:[],
amount:35,
spacing:18

};



// create body


for(let i=0;i<centipede.amount;i++){


centipede.segments.push({

x:canvas.width/2 - i*18,

y:canvas.height/2,

angle:0

});


}





// ===============================
// MOVEMENT
// ===============================


function moveCentipede(){


let head = centipede.segments[0];


// head follows mouse


head.x += (mouse.x-head.x)*0.08;

head.y += (mouse.y-head.y)*0.08;



// body follows previous segment


for(let i=1;i<centipede.segments.length;i++){


let current = centipede.segments[i];

let previous = centipede.segments[i-1];



let dx = previous.x-current.x;

let dy = previous.y-current.y;



let distance=Math.sqrt(dx*dx+dy*dy);



if(distance>centipede.spacing){


current.x += dx/distance*(distance-centipede.spacing);

current.y += dy/distance*(distance-centipede.spacing);


}



current.angle=Math.atan2(dy,dx);



}


}




// ===============================
// DRAW LEGS
// ===============================


function drawLegs(segment,index){



let angle=segment.angle;


let side=index%2===0?1:-1;



for(let i=0;i<2;i++){


ctx.beginPath();


ctx.strokeStyle="#00ffff";

ctx.lineWidth=2;



let offset=(i+1)*8;



ctx.moveTo(

segment.x,
segment.y

);



ctx.lineTo(

segment.x + Math.cos(angle+side*1.2)*25,

segment.y + Math.sin(angle+side*1.2)*25

);



ctx.stroke();



}



}



// ===============================
// DRAW CENTIPEDE
// ===============================


function drawCentipede(){



let body=centipede.segments;



// spine


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





// segments


body.forEach((segment,index)=>{


drawLegs(segment,index);



ctx.beginPath();



let size=index===0?20:12;



// armor


ctx.fillStyle=index===0

?"#ff003c"

:"#1b2026";



ctx.strokeStyle="#00ffff";

ctx.lineWidth=2;



ctx.arc(

segment.x,

segment.y,

size,

0,

Math.PI*2

);



ctx.fill();

ctx.stroke();





// armor lines


if(index!==0){


ctx.beginPath();

ctx.strokeStyle="#444";

ctx.moveTo(

segment.x-8,

segment.y

);


ctx.lineTo(

segment.x+8,

segment.y

);


ctx.stroke();


}




});




// ===============================
// HEAD DETAILS
// ===============================


let head=body[0];



ctx.shadowBlur=20;

ctx.shadowColor="#ff003c";



ctx.fillStyle="#fff";



ctx.beginPath();


ctx.arc(

head.x-7,

head.y-5,

4,

0,

Math.PI*2

);


ctx.arc(

head.x+7,

head.y-5,

4,

0,

Math.PI*2

);


ctx.fill();


ctx.shadowBlur=0;



}





// ===============================
// ANIMATION LOOP
// ===============================


function animate(){



// background


ctx.fillStyle="rgba(2,4,6,0.35)";


ctx.fillRect(

0,
0,
canvas.width,
canvas.height

);



moveCentipede();


drawCentipede();



requestAnimationFrame(animate);



}



animate();
