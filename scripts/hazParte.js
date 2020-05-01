const id = Math.random().toString(36).substr(2, 9);
var response = {file: undefined, emotions: []},
    step = 0;

 const loader = e => {
    let acceptedFiles = e.target.files;
    var reader = new FileReader();

    inp_text.innerHTML = `${acceptedFiles[0].name}<br/>cargando..`;
    inp_text.classList.add('loading');
    
    reader.onload = e => {
        response.file = acceptedFiles[0];
        inp_text.innerHTML = `${acceptedFiles[0].name}<br/>Listo¡`;
        inp_text.classList.remove('loading');
    }

    reader.readAsDataURL(acceptedFiles[0]);
}

function firstStep(){
    step=0;
    dash.classList.add('zero');
    dash.classList.remove('one');
    dash.innerHTML = `<img src="imgs/number0.svg" alt="number">
    <h1>Ayúdanos a unirnos a través del sonido de<br/>nuestra ciudad, aunque estemos lejos.</h1>
    <p>Graba desde tu ventana un audio corto con tu celular. ¿Cómo suena la ciudad en este momento?</p>
    <div class="file--loader">
        <input type="file" class="inp_loader">
        <img src="imgs/sound.svg" alt="sound">
        <p id="inp_text">Arrastra tu audio aquí<br/>o búscalo en tu pc</p>
    </div>
    <button id="btn_next"><img src="imgs/arrow.svg" alt="arrow"></button>`;
    document.querySelector('.inp_loader').onchange = loader;
    btn_next.addEventListener( 'click', next);
}


const emotions = ['Alegre', 'Enojado', 'Angustiado', 'Triste', 'Agradecido', 'Inspirado', 'Divertido', 'Estresado', 'Indignado', 'Aburrido', 'Esperanza', 'Motivado']
function secondStep() {
    step = 1;
    dash.classList.add('one');
    dash.classList.remove('zero');
    dash.innerHTML = `<img src="imgs/number1.svg" alt="number">
    <h1>Ahora, unámonos a través de las emociones.</h1>
    <p>Marca la(s) emoción(es) que más has experimentado en estos tiempos de aislamiento.</p>
    <div class='wrap' id='wrap'></div>
    <button id="btn_back"><img src="imgs/arrow.svg" alt="arrow"></button>
    <button id="btn_next"><img src="imgs/arrow.svg" alt="arrow"></button>`;
    emotions.forEach( e => {
        let emotion = document.createElement('section');
        emotion.innerText = e;
        emotion.addEventListener('click', e => saveEmotion(emotion));
        wrap.appendChild(emotion);
    });
    btn_back.addEventListener('click', back);
    btn_next.addEventListener( 'click', next);
}

function saveEmotion(e) {
    if(e.classList.contains('selected')){
        response.emotions = response.emotions.filter( a => a !== e.innerText);
        e.classList.remove('selected');
    }else if(response.emotions.length < 5){
        e.classList.add('selected');
        response.emotions.push(e.innerText);
    }
}

function thirdStep() {
    step = 2;
    dash.classList.add('second');
    dash.classList.remove('one');
    dash.innerHTML = `<img src="imgs/number2.svg" alt="number">
    <h1>¿En qué medida te sientes así?</h1>
    <p>Puntúa esas emociones dependiendo de su frecuencia.</p>
    <div id='sliders'></div>
    <button id="btn_back"><img src="imgs/arrow.svg" alt="arrow"></button>
    <button id="btn_next">Finalizar<img src="imgs/arrow.svg" alt="arrow"></button>`;
    response.emotions.forEach( e => {
        let slider = document.createElement('div');
        slider.classList.add('slider');
        slider.dataset.value = 1;
        slider.innerHTML = `<input type="range" min='1' max='10' step='1'/> `;
        //emotion.addEventListener('click', e => saveEmotion(emotion));
        sliders.appendChild(slider);
    });
    btn_back.addEventListener('click', back);
}

function next () {
    console.log(response.emotions.length)
    console.log(step)
    switch (step) {
        case 0:
            response.file && secondStep();
            break;

        case 1:
            response.emotions.length > 0 && thirdStep();
            break;
    
        default:
            break;
    }
};

function back (){
    switch (step) {
        case 1:
            firstStep();
            break;
    
        default:
            break;
    }
};



(e => firstStep())();