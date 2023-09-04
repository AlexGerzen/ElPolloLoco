class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    moveRight() {
        this.x += this.speed // World moving right
    }

    moveLeft() {
        this.x -= this.speed // World moving left
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() { // Fallgeschwindigkeit wird berechnet
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 30)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 220;
        }
    }


    isColliding(obj) { // Kollision wird berechnet
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && // Abfrage ob die Kollidieren oder ob das Objekt schon zu weit ist
            (this.y + this.height) >= obj.y &&
            (this.y) <= (obj.y + obj.height)
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in 1000;
        return timepassed < 1.5; //Abfrage ob man in den letzten 5sek getroffen wurde
    }


}