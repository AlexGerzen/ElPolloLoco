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
    currentImage = 0;
    world;
    speed = 10;
    walking_sound = new Audio('audio/footsteps.wav');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING)

        this.animate();
    }

    animate() {

        setInterval( () => {
            this.walking_sound.pause(); // Pausiert den Sound da dieser sonst immer bis zum ende durchlaudfen würde
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { 
                this.x += this.speed // World moving right
                this.otherDirection = false;
                this.walking_sound.play(); //Spielt denn walking sound ab
            }

            if (this.world.keyboard.LEFT && this.x > 0) { 
                this.x -= this.speed // World moving left
                this.otherDirection = true; // Character turn other direction
                this.walking_sound.play(); //Spielt denn walking sound ab
            }

            this.world.camera_x = -this.x + 100; // Gibt die position für die Kamera an
        },1000 / 60)

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 1000 / 20);

    }


    jump() {

    }


}