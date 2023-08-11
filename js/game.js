let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById('canvas');
    character.src = '../img/2_character_pepe/2_walk/W-21.png';
    ctx = canvas.getContext('2d');
}