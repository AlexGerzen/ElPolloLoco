class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    startTime = 0;
    isTimerRunning = false;
    onceCounter = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    animationOver = false;
    jumping = false;



    moveRight() {
        this.x += this.speed // World moving right
    }

    moveLeft() {
        this.x -= this.speed // World moving left
    }

    playAnimation(images) { // Animation soll immer wiederholt werden
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) { // Animation soll nur einmal durchgeführt werden
        if (this.onceCounter < images.length) {
            let path = images[this.onceCounter];
            this.img = this.imageCache[path];
            this.onceCounter++;
        } else {
            this.animationOver = true;
        }
    }

    applyGravity() { // Fallgeschwindigkeit wird berechnet
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.jumping = true;
            } else {
                this.jumping = false;
            }
                
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
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) && // Abfrage ob die Kollidieren oder ob das Objekt schon zu weit ist
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
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

    timePassed() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in 1000;
        if (this instanceof ThrowableObject) {
            return timepassed > 1; // Sicherstellen das man nur eine Flasche pro sekunde werden kann
        } else {
            return timepassed < 0.5; //Abfrage ob man in den letzten 0.5sek getroffen wurde
        }
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