// =====================================
// CANVAS SETUP
// =====================================

const canvas = document.getElementById("centipedeCanvas");

const ctx = canvas.getContext("2d");


// fullscreen canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// =====================================
// MOUSE TRACKING
// =====================================

let mouse = {

    x: canvas.width / 2,
    y: canvas.height / 2

};



window.addEventListener("mousemove",(event)=>{


    mouse.x = event.clientX;

    mouse.y = event.clientY;


});




// =====================================
// RESIZE HANDLER
// =====================================

window.addEventListener("resize",()=>{


    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;


});




// =====================================
// EXO CENTIPEDE DATA
// =====================================


let centipede = {


    segments: [],


    totalSegments: 25,


    spacing: 18


};



// create body segments

for(let i = 0; i < centipede.totalSegments; i++){


    centipede.segments.push({


        x: canvas.width/2 - i * centipede.spacing,

        y: canvas.height/2


    });


}




// =====================================
// ANIMATION LOOP
// =====================================


function animate(){


    // clear screen

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    requestAnimationFrame(animate);


}



animate();
