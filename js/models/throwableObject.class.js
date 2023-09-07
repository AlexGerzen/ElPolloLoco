class ThrowableObject extends MovableObject {
    BOTTLE_ROTATE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
    

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.BOTTLE_ROTATE_IMAGES);
        this.throw(otherDirection);
    }

    throw(otherDirection) {
        this.speedY = 30;
        this.applyGravity();

        setInterval( () => {
            if(!otherDirection) {
                this.x += 10;
            } else {
                this.x -= 10;
            }
            
            this.playAnimation(this.BOTTLE_ROTATE_IMAGES);
        }, 25)
    }
}