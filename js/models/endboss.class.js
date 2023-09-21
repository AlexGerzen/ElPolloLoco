class Endboss extends MovableObject {
    IMAGES_ALERT = [
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
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
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
    bossSpawned = false;
    mode = 'walking';


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 3800;
        this.speed = 0.5;
        this.hit = 0;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.bossSpawned && this.x > 3600 && this.mode == 'walking') {
                this.speed = 1.5;
                this.moveLeft();
            } else if(this.bossSpawned && this.x <= 3600 && this.mode == 'walking') {
                this.mode = 'alert';
            } else if (this.mode == 'alert') {
                this.speed = 0;
                setTimeout(() => {
                    this.mode = 'attack';
                }, 1000);
            } else if( this.mode == 'attack') {
                this.speed = 0.5;
                this.moveLeft();
            }
            
        }, 1000 / 60) // 60 FPS

        setInterval(() => {
            if(this.hit >= 3) {
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.bossDead = true;
            } else if(this.mode == 'walking') {
                this.playAnimation(this.IMAGES_WALKING);
            } else if(this.mode == 'alert') {
                this.playAnimation(this.IMAGES_ALERT);
            } else if(this.mode == 'attack') {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 100);
    }
}