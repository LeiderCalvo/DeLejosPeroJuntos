const ws = ["2,2,3,2", "2,4,3,4", "2,6,3,6", "2,8,3,8", "2,10,3,10", "6,2,6,3", "8,2,8,3", "11,2", "11,4", "11,6", "11,8", "11,10", "11,12", "11,14", "13,2", "13,4", "13,6", "13,8", "13,10", "13,12", "13,14", "16,2,17,3", "16,5,17,6", "16,8,17,9", "16,11,17,12", "21,2,21,3", "21,5,21,6", "21,8,21,9", "21,11,21,12", "21,14,21,15", "21,17,21,18", "21,20,21,21", "23,2,23,3", "23,5,23,6", "23,8,23,9", "23,11,23,12", "23,14,23,15", "23,17,23,18", "23,20,23,21", "25,2,25,3", "25,5,25,6", "25,8,25,9", "25,11,25,12", "25,14,25,15", "25,17,25,18", "25,20,25,21", "28,2,31,2", "28,4,31,4", "29,6,31,6", "30,8,31,8", "30,10,31,10", "34,2,36,2", "34,4,36,4", "34,6,36,6", "34,8,36,8", "34,10,36,10", "34,12,36,12", "34,14,36,14", "39,2,40,3", "39,5,40,6", "43,2", "43,4", "43,6", "43,8", "43,10", "43,12", "43,14", "46,2,46,3", "49,2,50,2", "49,4,50,4", "49,6,50,6", "49,8,50,8", "49,10,50,10", "49,12,50,12", "49,14,50,14", "49,16,50,16", "49,18,50,18", "49,20,50,20", "49,22,50,22", "52,2", "52,4", "52,6", "52,8", "52,10", "52,12", "52,14", "52,16", "52,18", "52,20", "52,22", "54,2,55,2", "54,4,55,4", "54,6,55,6", "54,8,55,8", "54,10,55,10", "54,12,55,12", "54,14,55,14", "54,16,55,16", "54,18,55,18", "54,20,55,20", "54,22,55,22", "58,2,58,3", "58,5,58,6", "58,8,58,9", "60,2,60,3", "60,5,60,6", "60,8,60,9", "62,2,62,3", "62,5,62,6", "62,8,62,9", "66,2,67,3", "66,5,67,6", "66,8,67,9", "66,11,67,12", "66,14,67,15", "66,17,67,18", "66,20,67,21", "69,2,70,3", "69,5,70,6", "69,8,70,9", "69,11,70,12", "69,14,70,15", "69,17,70,18", "69,20,70,21", "73,2", "73,4", "76,2,78,2", "76,4,78,4", "76,6,78,6", "76,8,78,8", "76,10,78,10", "76,12,78,12", "76,14,78,14", "80,2,82,2", "80,4,82,4", "80,6,82,6", "80,8,82,8", "80,10,82,10", "80,12,82,12", "80,14,82,14", "80,16,82,16", "84,2,86,2", "84,4,86,4", "84,6,86,6", "84,8,86,8", "84,10,86,10", "84,12,86,12", "84,14,86,14", "89,2,91,2", "89,4,91,4", "89,6,90,6", "89,8,90,8", "94,2,94,3", "94,5,94,6", "94,8,94,9", "94,11,94,12", "94,14,94,15", "94,17,94,18", "96,2,96,3", "96,5,96,6", "96,8,96,9", "96,11,96,12", "96,14,96,15", "96,17,96,18", "96,20", "99,2", "99,4", "99,6", "99,8"];
const emotions = ['Miedo', 'Humor', 'Esperanza', 'Felicidad', 'Odio', 'Motivación', 'Alegría', 'Amor', 'Resignación', 'Ira', 'Gratitud', 'Desesperanza', 'Tristeza', 'Frustración'];
const colors = ['#06A894', '#FD8701', '#7638FF', '#FFD400', '#333333', '#FFE66E', '#FFB2B2', '#FA5456', '#004D96', '#FF0003', '#49C12B', '#138400', '#88CAFF', '#A60BBF'];
var w_arr, users, active_windows, users_clicked = [], emotions_vals = new Array(emotions.length);
var check_interval, current_audio = 0, sounding = [];

(e => getCollectionData('users/', e => {
    users = e.map((u, k) => {
        users_clicked[k] = false;
        return { ...u, file: new Audio(u.file) }
    });
    emotions.forEach((val, i) => { emotions_vals[i] = 0; });

    setWindows();
}))();

(e => {
    emotions.forEach((emot, i) => {
        let div = document.createElement('div');
        div.classList.add('emot_ley');
        div.innerHTML = `<div style='background-color: ${colors[i]};'></div>
        <p style='background: ${colors[i]};'>${emotions[i]}</p>`;
        
        leyenda.appendChild(div);
    })
})();

ws.forEach((w, i) => {
    var my_window = document.createElement('div');
    my_window.classList.add('window');
    canvas.appendChild(my_window);
    w_arr = document.querySelectorAll('.window');
    resizeWindows();
});

function resizeWindows() {
    var WINDOW_SIZE = window.innerWidth / 100;
    w_arr.forEach((my_window, i) => {
        let w = ws[i].split(',');
        my_window.style.width = w.length === 2 ? `${WINDOW_SIZE}px` : `${WINDOW_SIZE * (Math.abs(w[0] - w[2]) + 1)}px`;
        my_window.style.height = w.length === 2 ? `${WINDOW_SIZE}px` : `${WINDOW_SIZE * (Math.abs(w[3] - w[1]) + 1)}px`;
        my_window.style.bottom = `${(w[1] - 1) * WINDOW_SIZE}px`;
        my_window.style.left = `${(w[0] - 1) * WINDOW_SIZE}px`;
    });
}

function setWindows() {
    let shuffled = [...w_arr].sort(() => Math.random() - 0.5);
    active_windows = shuffled.slice(0, users.length);

    active_windows.forEach((e, i) => {
        e.classList.add('active');
        e.onclick = () => onClickWindow(i);
    });
}

function onClickWindow(i) {
    if (users_clicked[i]) {
        shutDowmWindow(i);
        return;
    }
    users_clicked[i] = true;
    sounding.push(users[i].file);
    if (!check_interval) users[i].file.play();

    active_windows[i].classList.remove('active');
    active_windows[i].classList.add('selected');

    if (!check_interval) check_interval = setInterval(check_sound, 8000);

    users[i].emotions.forEach((emo, j) => {
        index = emotions.findIndex(e => e === emo);
        emotions_vals[index] += users[i].values[j];
    })
}

function shutDowmWindow(i) {
    active_windows[i].classList.remove('selected');
    active_windows[i].classList.add('active');
    users_clicked[i] = false;

    users[i].emotions.forEach((emo, j) => {
        index = emotions.findIndex(e => e === emo);
        emotions_vals[index] -= users[i].values[j];
    })

    sounding = sounding.filter(e => {
        if (e === users[i].file) {
            e.pause();
            e.currentTime = 0;
        }
        return e !== users[i].file;
    });
    clearInterval(check_interval);
    check_interval = undefined;

    check_sound(true);
    if (sounding.length > 0) check_interval = setInterval(check_sound, 8000);
}

function check_sound(fromShutDown) {
    fromShutDown || sounding.forEach(e => {
        e.pause();
        e.currentTime = 0;
    });
    if (current_audio >= sounding.length) current_audio = 0;
    if (sounding.length > 0) sounding[current_audio].play();
    current_audio++;
}

window.onresize = () => resizeWindows();