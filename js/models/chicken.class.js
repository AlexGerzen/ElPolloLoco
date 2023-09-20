class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        ''
    ];
    chickenDead = false;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 1700;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.chickenDead) {
                this.moveLeft();
            }
        }, 1000 / 60) // 60 FPS

        setInterval(() => {
            if (!this.chickenDead) {
                this.playAnimation(this.IMAGES_WALKING)
            } else {
                this.playAnimationOnce(this.IMAGES_DEAD)
            }
        }, 100);
    }
}