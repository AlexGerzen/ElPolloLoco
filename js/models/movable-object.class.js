class MovableObject {
    x = 120;
    y = 220;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) { //Images werden in ein Array gepackt
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60) // 60 FPS
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() { // Fallgeschwindigkeit wird berechnet
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0)
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        },1000 / 30)
    }

    isAboveGround() {
        return this.y < 220;
    }

    isOnGround() {
        return this.y == 220;
    }
}