const userID = Math.random().toString(36).substr(2, 9);
var response = {file: undefined, emotions: [], values: []},
    step = 0;

 const loader = e => {
    let acceptedFiles = e.target.files;
    var reader = new FileReader();

    if(acceptedFiles[0].type !== 'audio/mpeg') {
        alert('Sólo archivos de audio');
        return;
    }

    inp_text.innerHTML = `${acceptedFiles[0].name}<br/>cargando..`;
    inp_text.classList.add('loading');
    
    reader.onload = e => {
        response.file = acceptedFiles[0];
        inp_text.innerHTML = `${acceptedFiles[0].name}<br/>Listo¡`;
        inp_text.classList.remove('loading');
        succes.style.display = 'block';
    }

    reader.readAsDataURL(acceptedFiles[0]);
}

function firstStep(){
    response.file = undefined;
    step=0;
    dash.className = '';
    dash.classList.add('zero');
    dash.innerHTML = `<img src="imgs/number0.svg" alt="number">
    <h1>Ayúdanos a unirnos a través del sonido de<br/>nuestra ciudad, aunque estemos lejos.</h1>
    <p>Graba desde tu ventana un audio de 20 segundos con tu celular.</p>
    <p id='succes'>¡Cargado exitosamente!</p>
    <div class="file--loader">
        <input type="file" class="inp_loader" accept="audio/*">
        <img src="imgs/sound.svg" alt="sound"> 
        <p id="inp_text">Arrastra tu audio aquí<br/>o búscalo en tu pc</p>
    </div>
    <button class='btn_next' id="btn_next"><img src="imgs/arrow.svg" alt="arrow"></button>`;
    document.querySelector('.inp_loader').onchange = loader;
    btn_next.addEventListener( 'click', next);
}


const emotions = ['Motivación', 'Felicidad', 'Humor', 'Ira', 'Amor', 'Alegría', 'Frustración', 'Esperanza', 'Resignación', 'Tristeza', 'Miedo', 'Gratitud', 'Desesperanza', 'Odio'];
const colors = ['#FFE66E', '#FFD400', '#FD8701', '#FF0003', '#FA5456', '#FFB2B2', '#A60BBF', '#7638FF', '#004D96', '#88CAFF', '#06A894', '#49C12B', '#138400', '#333333'];
function secondStep() {
    response.emotions = [];
    step = 1;
    dash.className = '';
    dash.classList.add('one');
    dash.innerHTML = `<img src="imgs/number1.svg" alt="number">
    <h1>Ahora, unámonos a través de las emociones.</h1>
    <p>Marca la(s) emoción(es) que más has experimentado en estos<br/>tiempos de aislamiento. Máximo 5</p>
    <div class='wrap' id='wrap'></div>
    <button class='btn_back' id="btn_back2"><img src="imgs/arrow.svg" alt="arrow"></button>
    <button class='btn_next' id="btn_next2"><img src="imgs/arrow.svg" alt="arrow"></button>`;
    emotions.forEach( (e, i) => {
        let emotion = document.createElement('section');
        emotion.innerText = e;
        emotion.addEventListener('click', e => saveEmotion(emotion, i));
        wrap.appendChild(emotion);
    });
    btn_back2.addEventListener('click', back);
    btn_next2.addEventListener( 'click', next);
}

function saveEmotion(e, i) {
    if(e.classList.contains('selected')){
        response.emotions = response.emotions.filter( a => a !== e.innerText);
        e.classList.remove('selected');
        e.style.background = 'none';
    }else if(response.emotions.length < 5){
        e.classList.add('selected');
        response.emotions.push(e.innerText);
        e.style.background = colors[i];
    }
}

function thirdStep() {
    response.values = new Array(response.emotions.length);
    for (let i = 0; i < response.values.length; i++) {
        response.values[i] = 5;
    }
    step = 2;
    dash.className = '';
    dash.classList.add('second');
    dash.innerHTML = `<img src="imgs/number2.svg" alt="number">
    <h1>¿En qué medida te sientes así?</h1>
    <p>Puntúa esas emociones dependiendo de su frecuencia.</p>
    <div class='row'>
        <div class='tits'>
            <div class='tit f'>De 1 a 2<br/>veces</div>
            <div class='tit g'>De 3 a 4<br/>veces</div>
            <div class='tit h'>De 5 a 6<br/>veces</div>
            <div class='tit i'>De 7 a 8<br/>veces</div>
            <div class='tit j'>Más de 9<br/>veces</div>
        </div>
    </div>
    <div id='sliders'></div>
    <button class='btn_back' id="btn_back3"><img src="imgs/arrow.svg" alt="arrow"></button>
    <button class='btn_next' id="btn_next3">Finalizar<img src="imgs/arrow.svg" alt="arrow"></button>`;
    response.emotions.forEach( (e, i) => {
        let slider = document.createElement('div'),
            id = Math.random().toString(36).substr(2, 9);
        slider.classList.add('slider');

        col_i = emotions.findIndex(emo => emo === e);

        slider.innerHTML = `<p>${e}</p>
        <input id='inpt_${id}' type="range" min='1' max='5' step='1' value='1' data-value='${1}' data-col='${colors[col_i]}'/>
        <div class='mark a'></div><div class='mark b'></div><div class='mark c'></div><div class='mark d'></div><div class='mark e'></div>`;
        sliders.appendChild(slider);
        let current_inp = document.querySelector('#inpt_'+id);
        current_inp.addEventListener('change', e => {
            current_inp.dataset.value = e.target.value;
            response.values[i] = parseInt(e.target.value);
        });
    });
    btn_back3.addEventListener('click', back);
    btn_next3.addEventListener( 'click', next);
}

function fourthStep() {
    response = {file: undefined, emotions: [], values: []};
    step = 0;

    body.classList.add('hands');

    dash.className = '';
    dash.classList.add('thrid');
    dash.innerHTML = `<h1>¡Genial! Ahora haces parte de esta<br/>comunidad virtual.</h1>
    <p>Ahora habitas una ventanita en nuestra ciudad, podrás visitar otras ventanas y acercarte a los demás interactuando con sus emociones y descubriendo cómo suena Cali desde sus ventanas.</p>`;
}

function next () {
    switch (step) {
        case 0:
            response.file && secondStep();
            break;

        case 1:
            response.emotions.length > 0 && thirdStep();
            break;

        case 2:
            btn_next3.innerHTML = 'cargando ...';
            btn_next3.style.opacity = 0.5;
            uploadInfo();
            break;
    
        default:
            break;
    }
};

function uploadInfo() {
    let file = response.file;
    uploadFile('users/us'+userID, file.name, file, { contentType: file.type+'' }, url => {
        response.file = url;
        writeData('users/us'+userID, response, e => {
            e?  fourthStep(): this.alert('fallo cargando los archivos, porfavor reintente');
        });
    });
}

function back (){
    switch (step) {
        case 1:
            firstStep();
            break;
        
        case 2:
            secondStep();
            break;
    
        default:
            break;
    }
};

(e => firstStep())();