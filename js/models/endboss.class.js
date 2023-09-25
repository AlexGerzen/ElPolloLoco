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
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    height = 400;
    width = 300;
    y = 45;
    offset = {
        top: 20,
        left: 30,
        right: 0,
        bottom: 0,
    };
    bossDead = false;
    bossSpawned = false;
    mode = 'walking';
    playHurtAnimation = false;


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 3800;
        this.speed = 0.5;
        this.hit = 0;
        this.animate();
    }

    /**
     * This function will animate the boss
     */
    animate() {
        this.bossModes();
        this.bossAnimations();
    }

    /**
     * This function will declare the mode of the boss
     */
    bossModes() {
        setInterval(() => {
            if (this.canBossWalk()) {
                this.bossWalking()
            } else if (this.canBossAlert()) {
                this.mode = 'alert';
            } else if (this.isBossAlert()) {
                this.bossAlertMode();
            } else if (this.mode == 'attack') {
                this.setBossSpeed();
                this.moveLeft();
            }

        }, 1000 / 60) // 60 FPS
    }

    /**
     * This function will play the animation of the boss which is currently needed
     */
    bossAnimations() {
        setInterval(() => {
            if (this.hit >= 3) {
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.bossDead = true;
            } else if (this.playHurtAnimation) {
                this.playAnimation(this.IMAGES_HURT)
            } else {
                if (this.mode == 'walking') {
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (this.mode == 'alert') {
                    this.playAnimation(this.IMAGES_ALERT);
                } else if (this.canBossAttack()) {
                    this.playAnimation(this.IMAGES_ATTACK);
                }
            }
        }, 100);
    }

    setBossSpeed() {
        if(this.hit == 0) {
            this.speed = 1;
        } else if(this.hit == 1) {
            this.speed = 2;
        } else if(this.hit == 2) {
            this.speed = 4;
        }
    }

    /**
     * This function will tell if the boss is allowed to walk
     * 
     * @returns It returns "true" if the boss is allowed to walk
     */
    canBossWalk() {
        return this.bossSpawned && this.x > 3600 && this.mode == 'walking';
    }

    /**
     * This function will let the boss walk
     */
    bossWalking() {
        this.speed = 1.5;
        this.moveLeft();
    }

    /**
     * This function will tell if the boss is allowed to go in "alert" mode
     * 
     * @returns It returns "true" if the boss is allowed to go in "alert" mode 
     */
    canBossAlert() {
        return this.bossSpawned && this.x <= 3600 && this.mode == 'walking';
    }

    /**
     * This function will tell if the boss is in "alert" mode
     * 
     * @returns It returns "true" if the boss is in "alert" mode 
     */
    isBossAlert() {
        return this.mode == 'alert';
    }

    /**
     * This function make the boss alert
     */
    bossAlertMode() {
        this.speed = 0;
        setTimeout(() => {
            this.mode = 'attack';
        }, 1000);
    }

    /**
     * This function will tell if the boss is in "attack" mode
     * 
     * @returns It returns "true" if the boss is in "attack" mode 
     */
    canBossAttack() {
        return this.mode == 'attack';
    }

}