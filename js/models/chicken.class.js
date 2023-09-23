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
        this.x = 500 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * This function will animate the chicken
     */
    animate() {
        this.chickenMovingLeft();
        this.chickenAnimations();
    }

    /**
     * This function will make the chicken move left
     */
    chickenMovingLeft() {
        setInterval(() => {
            if (!this.chickenDead) {
                this.moveLeft();
            }
        }, 1000 / 60) // 60 FPS
    }

    /**
     * This function will play the animation that is currently needed
     */
    chickenAnimations() {
        setInterval(() => {
            if (!this.chickenDead) {
                this.chickenWalkingAnimation();
            } else {
                this.chickenDeadAnimations(); 
            }
        }, 100);
    }

    /**
     * This function will animate the chicken when it is walking
     */
    chickenWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING)
    }

    /**
     * This function will animate the chicken when it is dying
     */
    chickenDeadAnimations() {
        this.playAnimationOnce(this.IMAGES_DEAD)
    }
}