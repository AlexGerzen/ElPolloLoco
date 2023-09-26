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
    splash_sound = new Audio('audio/splash.wav');
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
        this.setVolume();
    }

    /**
     * This function will lower the s volume of the sounds
     */
    setVolume() {
        this.splash_sound.volume = 0.2;
    }

    /**
     * This function will throw the bottle
     * 
     * @param {boolean} otherDirection This is "true" if the character is facing the other direction
     */
    throw(otherDirection) {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            if (this.canSplash()) {
                this.makeBottleSplash();
            } else {
                this.bottleMoving(otherDirection);
            }
        }, 25)
    }

    /**
     * This function will tell if the bottle can splash
     * 
     * @returns It returns "true" if the bottle can splash 
     */
    canSplash() {
        return this.hit || this.y > 350;
    }

    /**
     * This function will make the bottle splash
     */
    makeBottleSplash() {
        this.speedY = 0;
        this.playAnimationOnce(this.BOTTLE_SPLASH_IMAGES);
        if (this.canPlaySound()) {
            this.playSound();
        }
        if (this.animationOver) { // Flasche wurde nicht mehr dargestellt konnte aber immer noch Chicken killen
            this.x = 0;
            this.y = 500;
        }
    }

    /**
     * This function will tell if the sound can be played
     * 
     * @returns It returns "true" if the sound can be played
     */
    canPlaySound() {
        return this.sound && !this.mute;
    }

    /**
     * This function will play the sound
     */
    playSound() {
        this.splash_sound.play();
        this.sound = false;
    }

    /**
     * This function will make the bottle move in a direction
     * 
     * @param {boolean} otherDirection 
     */
    bottleMoving(otherDirection) {
        if (!otherDirection) {
            this.x += 10;
        } else {
            this.x -= 10;
        }
        this.playAnimation(this.BOTTLE_ROTATE_IMAGES);
    }
}