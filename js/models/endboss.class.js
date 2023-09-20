class Endboss extends MovableObject {
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
        ''
    ];
    height = 400;
    width = 300;
    y = 45;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    bossDead = false;
    blocked = false;


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 3800;
        this.speed = 0.5;
        this.hit = 0;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60) // 60 FPS

        setInterval(() => {
            if(this.hit >= 3) {
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.bossDead = true;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    addDamage() {
        if (!this.blocked) {
            this.blocked = true;
            this.hit++;            
            console.log(this.hit);
            setTimeout(function () {
                this.blocked = false;
            }, 1000);
        }
    }
}