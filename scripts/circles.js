const colors = ['#06A894', '#FD8701', '#7638FF', '#FFD400', '#333333', '#FFE66E', '#FFB2B2', '#FA5456', '#004D96', '#FF0003', '#49C12B', '#138400', '#88CAFF', '#A60BBF'];

var fondo, bn, count = 0, canvas, particulas = [];;
//let bg;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketchHolder');
    canvas.style('position', 'absolute');
    canvas.style('z-index', '-2');
    fondo = loadImage("imgs/sky.svg");
    bn = loadImage("imgs/buildings.png");
    bn.resize(windowWidth, 0);
    for (let i = 0; i < emotions.length; i++) {
        particulas.push(new Particle(createVector(random(width), random( 100 )), i));
    }

    /*
    bg = createGraphics(windowWidth, windowHeight);
	bg.background(fondo,20);
    bg.noStroke();
    let trans = color(255,0,0);
    //trans.setAlpha(0);
    for (let i = 0; i < 300000; i++) {
        let x = random(width);
        let y = random(height);
        //let s = noise(x*0.01, y*0.01)*2;
        //bg.fill(fondo.get(x, y));
        //bg.rect(x, y, s, s);
        
        fondo.set(x, y, trans);
    }
      */
}

function draw() {
    if(count<10){
        bn.resize(windowWidth, 0);
        count++;
    }
    //image(bn, 0, height - bn.height);
    image(fondo, 0, 0);
    noStroke();
    for (let i = 0; i < emotions.length; i++) {
        if (emotions_vals[i] > 0) {
            particulas[i].mover();
            particulas[i].pintar();
        }
    }
}

// Clase particula
var Particle = function (pos, index) {
    this.acel = createVector(0, random(-0.07, 0.07));
    this.vel = createVector(random(-1, 1), random(-1, 0));
    this.pos = pos.copy();
    this.index = index
};

Particle.prototype.mover = function () {
    this.vel.add(this.acel);
    this.pos.add(this.vel);
    let px = bn.get( this.pos.x + this.vel.x, (this.pos.y + this.vel.y) - (height - bn.height) );
    if(this.pos.x + this.vel.x <= 0 || this.pos.y + this.vel.y <= 0 || this.pos.x + this.vel.x >= windowWidth || px.toString() === '0,0,0,255' ){
        this.vel.mult(-1);
        this.vel.normalize();
        this.acel.mult(-1);
    }
    this.acel = createVector(random(-0.07, 0.07), random(-0.07, 0.07));
};

Particle.prototype.pintar = function () {
    fill(colors[this.index]);
    let s = emotions_vals[this.index] * 5;
    ellipse(this.pos.x, this.pos.y, s, s);
};

function mousePressed() {
    
    //console.log(c.toString())
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    count = 0;
}