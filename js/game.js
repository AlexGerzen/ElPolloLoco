let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let gamePanelOpen = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    addEventListenersToPanel();

}

function closeOption(id) {
    document.getElementById(id).classList.add('d-none');
}

function openOption(id) {
    document.getElementById(id).classList.remove('d-none');
}

function muteSound(status) {
    if (status == 'unmute') {
        document.getElementById('unmute').classList.add('d-none');
        document.getElementById('mute').classList.remove('d-none');
        world.mute = true;
    } else {
        document.getElementById('mute').classList.add('d-none');
        document.getElementById('unmute').classList.remove('d-none');
        world.mute = false;
    }
}

function setFullscreen() {
    if (!fullscreen) {
        let element = document.getElementById('fullscreen');
        document.getElementById('fullscreenEnter').classList.add('d-none');
        document.getElementById('fullscreenExit').classList.remove('d-none');
        enterFullscreen(element);
    } else {
        document.getElementById('fullscreenEnter').classList.remove('d-none');
        document.getElementById('fullscreenExit').classList.add('d-none');
        exitFullscreen()
    }
}

function enterFullscreen(fullscreenElement) {
    if (fullscreenElement.requestFullscreen) {
        fullscreenElement.requestFullscreen();
    } else if (fullscreenElement.mozRequestFullScreen) {
        fullscreenElement.mozRequestFullScreen();
    } else if (fullscreenElement.webkitRequestFullscreen) {
        fullscreenElement.webkitRequestFullscreen();
    } else if (fullscreenElement.msRequestFullscreen) {
        fullscreenElement.msRequestFullscreen();
    }
    canvas.classList.add('fullscreen');
    document.getElementById('main-container').classList.add('fullscreen');
    fullscreen = true;
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    canvas.classList.remove('fullscreen');
    fullscreen = false;
}

function openGamePanels() {
    let gamePanels = document.getElementById('gamePanels');
    if(!gamePanelOpen) {
        gamePanels.style = "display: flex;"
        gamePanelOpen = true;
    } else {
        gamePanels.style = "display: none;"
        gamePanelOpen = false;
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

function addEventListenersToPanel() {
    const buttonThrow = document.getElementById("buttonThrow");
    const jump = document.getElementById("buttonJump");
    const left = document.getElementById("buttonLeft");
    const right = document.getElementById("buttonRight");

    left.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    left.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    right.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    right.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    jump.addEventListener("touchstart", () => {
        keyboard.UP = true;
    });

    jump.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    buttonThrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    buttonThrow.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

