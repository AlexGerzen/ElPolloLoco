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


    /**
     * This function will make the Object move right
     */
    moveRight() {
        this.x += this.speed
    }

    /**
     * This function will make the Object move left
     */
    moveLeft() {
        this.x -= this.speed
    }

    /**
     * This function will make an animation out of the images
     * 
     * @param {Array} images These are the Images which will be animated
     */
    playAnimation(images) { // Animation soll immer wiederholt werden
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function will animate the images once
     * 
     * @param {Array} images These are the Images which will be animated
     */
    playAnimationOnce(images) { // Animation soll nur einmal durchgeführt werden
        if (this.onceCounter < images.length) {
            let path = images[this.onceCounter];
            this.img = this.imageCache[path];
            this.onceCounter++;
        } else {
            this.animationOver = true;
        }
    }

    /**
     * This function will apply gravity to the object
     */
    applyGravity() { // Fallgeschwindigkeit wird berechnet
        setInterval(() => {
            if (this.canApplyGravity()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.jumping = true;
            } else {
                this.jumping = false;
            }
                
        }, 1000 / 30)
    }

    /**
     * This function will tell if gravity can be applied
     * 
     * @returns It return "true" if the gravity can be applied 
     */
    canApplyGravity() {
        return this.isAboveGround() || this.speedY > 0;
    }

    /**
     * This function will tell if the object is above ground
     * 
     * @returns It returns "true" if the object is above ground
     */
    isAboveGround() { // Abfrage ob der Character über dem Boden ist
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
        }
    }

    /**
     * This function will tell if two obejcts are colliding
     * 
     * @param {class} obj The object which its colliding with
     * @returns It return "true" if the objects are colliding
     */
    isColliding(obj) { 
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) && 
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
    }

    /**
     * This function decrease the energy of the character after a hit
     */
    hit() {
        this.energy -= 5; // The amount of damage per hit
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function will tell if the character is dead
     * 
     * @returns It returns "true" if the character is dead 
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function will calculate the time after the last hit
     * 
     * @returns It returns "true" if enough time has passed
     */
    timePassed() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in 1000;
        if (this instanceof ThrowableObject) {
            return timepassed > 1; // Sicherstellen das man nur eine Flasche pro sekunde werden kann
        } else {
            return timepassed < 0.5; //Abfrage ob man in den letzten 0.5sek getroffen wurde
        }
    }

    /**
     * This function will start a timer
     */
    startTimer() {
        if (!this.isTimerRunning) {
            this.startTime = Date.now(); // Startzeitpunkt festlegen
            this.isTimerRunning = true; // Timer starten
        }
    }

    /**
     * This function will reset the time and tell how much time has passed
     * 
     * @param {string} reset This will tell if the timer should be reseted 
     * @returns It returns the amount of time since the timer has started
     */
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