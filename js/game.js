let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let gamePanelOpen = false;
let muteStatus = 'unmute';
let gameStarted = false;

/**
 * This function is used to initialize what is needed
 */
function init() {
    canvas = document.getElementById('canvas');
    addEventListenersToPanel();
    setMuteStatus();
}

/**
 * This function is used to start the game
 */
function startGame() {
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    gameStarted = true;
    if(muteStatus == 'unmute') {
        world.mute = true;
    } else {
        world.mute = false;
    }
}

/**
 * This function is used to restart the game
 */
function restartGame() {
    location.reload();
}

/**
 * This function is used to close the options
 * 
 * @param {string} id This is the id of what will be closed
 */
function closeOption(id) {
    document.getElementById(id).classList.add('d-none');
}

/**
 * This function is used to open the options
 * 
 * @param {string} id This is the id of what will be opened
 */
function openOption(id) {
    document.getElementById(id).classList.remove('d-none');
}

/**
 * This function is used to mute or unmute the sound
 * 
 * @param {string} status This is the current status. It is either "mute" or "unmute"
 */
function muteSound(status) {
    if (status == 'unmute') {
        document.getElementById('unmute').classList.add('d-none');
        document.getElementById('mute').classList.remove('d-none');
        if(gameStarted) {world.mute = true;}
        localStorage.setItem('muteStatus', 'unmute');
    } else if(status == 'mute') {
        document.getElementById('mute').classList.add('d-none');
        document.getElementById('unmute').classList.remove('d-none');
        if(gameStarted) {world.mute = false;}
        localStorage.setItem('muteStatus', 'mute');
    }
}

/**
 * This function will get the mute status from the localstorage
 */
function setMuteStatus() {
    muteStatus =  localStorage.getItem('muteStatus');
    muteSound(muteStatus);
}

/**
 * This function will set the game to fullscreen or remove the fullscreen
 */
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

/**
 * This function is used to set the game to fullscreen
 * 
 * @param {string} fullscreenElement This is the element which will be shown in fullscreen
 */
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

/**
 * This function is used to exit the fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    canvas.classList.remove('fullscreen');
    fullscreen = false;
}

/**
 * This function will show or hide the gamepanels
 */
function openGamePanels() {
    let gamePanels = document.getElementById('gamePanels');
    if (!gamePanelOpen) {
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

/**
 * This function will add the eventlisteners to the gamepanels
 */
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

