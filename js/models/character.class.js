class Character extends MovableObject {
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
        ''
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30,
    }
    height = 200;
    currentImage = 0;
    world;
    speed = 10;
    walking_sound = new Audio('audio/footsteps.wav');
    jump_sound = new Audio('audio/jump.wav');
    hurt_sound = new Audio('audio/hurt.ogg');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.setVolume();
    }

    /**
     * This function will lower the s volume of the sounds
     */
    setVolume() {
        this.walking_sound.volume = 0.4;
        this.jump_sound.volume = 0.1;
        this.hurt_sound.volume = 0.2;
    }

    /**
     * This function will animate the Character
     */
    animate() {
        this.characterMoving();
        this.characterAnimations();
    }

    /**
     * This function lets the character jump
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * This functin will let the character move left and right or lets him jump. It also adjusts the camera to the character
     */
    characterMoving() {
        setInterval(() => {
            this.walking_sound.pause(); // Pausiert den Sound da dieser sonst immer bis zum ende durchlaudfen würde

            if (this.canCharacterMoveRight()) { 
                this.characterMovingRight();
            }

            if (this.canCharacterMoveLeft()) { 
                this.characterMovingLeft();
            }

            if (this.canCharacterJump()) { 
                this.characterJumping();
            }

            this.world.camera_x = -this.x + 100; // Gibt die position für die Kamera an
        }, 1000 / 60)
    }

    /**
     * This function will play the animation that is currently needed
     */
    characterAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.characterDead();
            } else if (this.timePassed()) {
                this.characterHurt();
            } else if (this.isAboveGround()) { 
                this.characterJumpingAnimation();
            } else if (this.ischaracterWalking()) { 
                this.characterWalkingAnitmation();
            } else if (this.resetTimer() > 5) {
                this.characterLongIdleAnimation();
            } else {
                this.characterIdleAnimation();
            }
        }, 1000 / 20);
    }

    /**
     * This function returns if the character is walking
     * 
     * @returns It returns "true" if the character is walking
     */
    ischaracterWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * This function will tell if the charcter is allowed to move right
     * 
     * @returns It returns "true" if the character is allowed to move right 
     */
    canCharacterMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * This function will tell if the charcter is allowed to move left
     * 
     * @returns It returns "true" if the character is allowed to move left
     */
    canCharacterMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * This function will tell if the charcter is allowed to jump
     * 
     * @returns It returns "true" if the character is allowed to move jump
     */
    canCharacterJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }

    /**
     * This function makes the character move right
     */
    characterMovingRight() {
        this.moveRight();
        this.otherDirection = false;
        this.world.throwableObject.otherDirection = false;
        if (!this.world.mute) {
            this.walking_sound.play();
        }
    }

    /**
     * This function makes the character move left
     */
    characterMovingLeft() {
        this.moveLeft();
        this.otherDirection = true; // Character turn other direction
        this.world.throwableObject.otherDirection = true;
        if (!this.world.mute) {
            this.walking_sound.play(); 
        }
    }

    /**
     * This function makes the character jump
     */
    characterJumping() {
        this.jump();
        if (!this.world.mute) {
            this.jump_sound.play();
        }
    }

    /**
     * This function will animate the character dying and ends the game
     */
    characterDead() {
        this.playAnimationOnce(this.IMAGES_DEAD);
        this.resetTimer('reset');
        this.world.gameOverObject.gameOver = true;
    }

    /**
     * This function will animate the character when he gets hurt
     */
    characterHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.resetTimer('reset');
        if (!this.world.mute) {
            this.hurt_sound.play();
        }
    }

    /**
     * This function will animate the character when he jumps
     */
    characterJumpingAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.resetTimer('reset');
    }

    /**
     * This function will animate the character when he walks
     */
    characterWalkingAnitmation() {
        this.playAnimation(this.IMAGES_WALKING)
        this.resetTimer('reset');
    }

    /**
     * This function will animate the character when he is doing nothing
     */
    characterIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE)
        this.startTimer();
    }

    /**
     * This function will animate the character when he is doing nothing for 5 seconds
     */
    characterLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE)
    }
}