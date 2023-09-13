class GameOver extends DrawableObject {
    GAMEOVER_IMAGE = 'img/9_intro_outro_screens/game_over/game over.png';
    gameOver = false;
    height = 480;
    width = 720;
    x = 0;
    y = 0;

    constructor() {
        super();
        this.loadImage(this.GAMEOVER_IMAGE)
    }
}