class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    startTime = 0;
    isTimerRunning = false;
    


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

    isAboveGround() { // Abfrage ob der Character über dem Boden ist
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
        }
    }


    isColliding(obj) { // Kollision wird berechnet
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && // Abfrage ob die Kollidieren oder ob das Objekt schon zu weit ist
            (this.y + this.height) >= obj.y &&
            (this.y + 150) <= (obj.y + obj.height)
    }

    hit() {
        this.energy -= 5; // Angabe wie viel Leben pro Hit abgezogen wird
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
        return timepassed < 1; //Abfrage ob man in den letzten 1sek getroffen wurde
    }

    startTimer() {
        if (!this.isTimerRunning) {
            this.startTime = Date.now(); // Startzeitpunkt festlegen
            this.isTimerRunning = true; // Timer starten
        }
    }

    resetTimer(reset) {
        if (this.isTimerRunning) {
            if (reset == 'reset') { // Abfrage ob der Timer resetet werden soll
                this.isTimerRunning = false;
                return;
            }
            let endTime = Date.now()
            let elapsedSeconds = (endTime - this.startTime) / 1000;

            return elapsedSeconds; // Vergangene Zeit seit dem der Timer gestartet wurde
        }
    }

    
}