class Character extends MovableObject {

    height = 200;
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
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    currentImage = 0;
    world;
    speed = 10;
    walking_sound = new Audio('audio/footsteps.wav');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause(); // Pausiert den Sound da dieser sonst immer bis zum ende durchlaudfen würde

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { // Character läuft nach rechts
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play(); //Spielt denn walking sound ab
            }

            if (this.world.keyboard.LEFT && this.x > 0) { //Character läfut nach links
                this.moveLeft();
                this.otherDirection = true; // Character turn other direction
                this.walking_sound.play(); //Spielt denn walking sound ab
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) { // Character springt
                this.jump()
            }

            this.world.camera_x = -this.x + 100; // Gibt die position für die Kamera an
        }, 1000 / 60)

        setInterval(() => {
            if (this.isDead()) { // Deathanimation wenn der Chracter stirbt
                this.playAnimation(this.IMAGES_DEAD)
            } else if (this.isHurt()) { // Hurt animation wenn der Character verletzt wird
                this.playAnimation(this.IMAGES_HURT)
            } else if (this.isAboveGround()) { // Jump animation wenn der Character springt
                this.playAnimation(this.IMAGES_JUMPING)
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // Walk animation nur wenn der Character läuft
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
        }, 1000 / 20);

    }


    jump() {
        this.speedY = 30;
    }

}