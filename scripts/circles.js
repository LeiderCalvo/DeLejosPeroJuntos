var fondo, bn, count = 0, canvas;
//let bg;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketchHolder');
    canvas.style('position', 'absolute');
    canvas.style('z-index', '-2');
    fondo = loadImage("imgs/sky.svg");
    bn = loadImage("imgs/buildings.png");
    bn.resize(windowWidth, 0);

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

    groups = [];
    emotions.forEach(e => groups.push( particulas.filter(p => p.emotion === e) ) );

    groups.forEach( g => {
        if(g.length > 1){
            let sum = 0, val = 0;
            g.forEach( p => {
                sum += p5.Vector.sub(p.pos, g[0].pos).mag();
                val += p.val;
            } );
            
            if(sum < 20 ){
                let pg = new Particle(g[0].pos, val, g[0].color, g[0].emotion, 'x');
                pg.pintar();
                g.forEach( (p, i) => {
                    if(i > 0) p.pos = g[0].pos.copy();
                    p.mover();
                    p.limits();
                })
            }else{
                g.forEach(p => {
                    p.pintar();
                    p.perseguir(g[0]);
                    p.limits();
                })
            }

        }else if(g.length > 0){
            g[0].pintar();
            g[0].mover();
            g[0].limits();
        }
    })

    /*
    for (let i = 0; i < particulas.length; i++) {
        particulas[i].pintar();
        particulas[i].mover();
        
        for (let j = 0; j < particulas.length; j++) {
            if(i !== j && particulas[i].emotion === particulas[j].emotion){
                particulas[i].perseguir(particulas[j]);
                break;
            }
        }
    }
       */
}

// Clase particula
var Particle = function (pos, val, color, emotion, win) {
    this.acel = createVector(random(-0.05, 0.05), -0.05);
    this.vel = createVector(0, -1);
    this.pos = pos.copy();
    this.bouncing = false;
    this.val = val;
    this.color = color;
    this.emotion = emotion;
    this.win = win;
};

Particle.prototype.mover = function () {
    this.vel.add(this.acel);
    this.pos.add(this.vel);
};

Particle.prototype.limits = function () {
    let px = bn.get( this.pos.x + this.vel.x, (this.pos.y + this.vel.y) - (height - bn.height) );
    if(this.bouncing){
        if(this.pos.x + this.vel.x <= 0 || this.pos.y + this.vel.y <= 0 || this.pos.x + this.vel.x >= windowWidth || px.toString() === '0,0,0,255' ){
            this.vel.mult(-1);
            this.vel.normalize();
            this.acel.mult(-1);
        }
        this.acel = createVector(random(-0.07, 0.07), random(-0.07, 0.07));
    }
    if(this.pos.y < height - bn.height) this.bouncing = true;
};

    Particle.prototype.die = function () {
        p.val-=0.0000002;
        if(this.val <= 0) particulas = particulas.filter( p => p !== this)
    };

Particle.prototype.perseguir = function (p) {
    let dir = p5.Vector.sub(p.pos, this.pos);
    dir.normalize();
    dir.mult(0.04);
    this.vel.add(dir);
    this.pos.add(this.vel);
};

Particle.prototype.pintar = function () {
    fill(this.color);
    let s = this.val * 5;
    ellipse(this.pos.x, this.pos.y, s, s);
};

function mousePressed() {
//    console.log(p5.Vector.sub( particulas[0].pos, particulas[2].pos).mag() )
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    count = 0;
}