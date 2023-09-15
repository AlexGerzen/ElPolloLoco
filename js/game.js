let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas'); 
    world = new World(canvas, keyboard);

}

function closeGamerule(id) {
    document.getElementById(id).classList.add('d-none');
}

function openGamerule(id) {
    document.getElementById(id).classList.remove('d-none');
}

function muteSound(status) {
    if(status == 'unmute') {
        document.getElementById('unmute').classList.add('d-none');
        document.getElementById('mute').classList.remove('d-none');
        world.mute = true;
    } else {
        document.getElementById('mute').classList.add('d-none');
        document.getElementById('unmute').classList.remove('d-none');
        world.mute = false;
    }
}

window.addEventListener("keydown", (e) => { // Wenn die Taste gedrückt wird, wird sie auf TRUE gesetzte
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
})

window.addEventListener("keyup", (e) => { // Wenn die Taste losgelassen wird, wird sie auf FLASE gesetzt
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
})