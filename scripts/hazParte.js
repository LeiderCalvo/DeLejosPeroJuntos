const id = Math.random().toString(36).substr(2, 9);
var response = {file: undefined},
    step = 0;

document.querySelector('.inp_loader').onchange = e => {
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
function create() {
    step++;
    dash.innerHTML = `<img src="imgs/number${step}.svg" alt="number">
    <h1>Ahora, unámonos a través de las emociones.</h1>
    <p>Marca la(s) emoción(es) que más has experimentado en estos tiempos de aislamiento.</p>
    <div class="file--loader">
        <input type="file" class="inp_loader">
        <img src="imgs/sound.svg" alt="sound">
        <p id="inp_text">Arrastra tu audio aquí<br/>o búscalo en tu pc</p>
    </div>
    <button id="btn_next"><img src="imgs/arrow.svg" alt="arrow"></button>`;
}

btn_next.addEventListener( e => {
    switch (step) {
        case 0:
            response.file && create();
            break;
    
        default:
            break;
    }
});