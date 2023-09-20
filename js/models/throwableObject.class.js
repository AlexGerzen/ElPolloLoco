class ThrowableObject extends MovableObject {
    BOTTLE_ROTATE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    BOTTLE_SPLASH_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        ''
    ];
    world;
    hit = false;
    lastHit = 2;
    splash_sound = new Audio ('audio/splash.wav');
    sound = true;
    mute = true;
    



    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.BOTTLE_ROTATE_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);
        this.throw(otherDirection);
    }

    throw(otherDirection) {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            if (this.hit || this.y > 350) {
                this.speedY = 0;
                this.playAnimationOnce(this.BOTTLE_SPLASH_IMAGES);
                if(this.sound && !this.mute) {
                    this.splash_sound.play();
                    this.sound = false;
                }
                if(this.animationOver) { // Flasche wurde nicht mehr dargestellt konnte aber immer noch Chicken killen
                    this.x = 0;
                    this.y = 500;
                }
            } else {
                if (!otherDirection) {
                    this.x += 10;
                } else {
                    this.x -= 10;
                }

                this.playAnimation(this.BOTTLE_ROTATE_IMAGES);
            }
        }, 25)
    }
}