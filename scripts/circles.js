const colors = ['#06A894', '#FD8701', '#7638FF', '#FFD400', '#333333', '#FFE66E', '#FFB2B2', '#FA5456', '#004D96', '#FF0003', '#49C12B', '#138400', '#88CAFF', '#A60BBF'];

var fondo, canvas;
//let bg;

function setup () {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('sketchHolder');
    canvas.style('position', 'absolute');
    canvas.style('z-index', '-2');
    fondo = loadImage("imgs/sky.svg");
    /*bg = createGraphics(width, height);
	bg.background(255,20);
    bg.noStroke();
    for (let i = 0; i < 300000; i++) {
        let x = random(width);
        let y = random(height);
        let s = noise(x*0.01, y*0.01)*2;
        bg.fill(240, 50);
        bg.rect(x, y, s, s);
    }*/
}

function draw () {
    image(fondo,0,0);
    randomSeed(0);
    noStroke();
    for(let i = 0; i < emotions.length; i++){
        if(emotions_vals[i]>0){
            fill( colors[i] );
            //let s = random(20,40)* (random(1,2)+(sin(frameCount/100+random(100))+1)*0.5);
            let s = emotions_vals[i]*5;
            let x = (random(width)+frameCount*random(1,2))%(width+s)-s;
            let y = (random(height)+sin(frameCount/100)*height*random(0.2,0.5) + height)%(height+s)-s;
            ellipse(x,y, s, s);
        }
    }
    //image(bg,0,0);
}
