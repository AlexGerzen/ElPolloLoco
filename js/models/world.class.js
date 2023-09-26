class World {
    character = new Character();
    statusBarLife = new StatusbarLife();
    statusBarCoins = new StatusbarCoins();
    statusBarBottles = new StatusbarBottles();
    gameOverObject = new GameOver();
    throwableObject = new ThrowableObject();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0; //Kamera position
    bottle_throw_sound = new Audio('audio/bottle_throw.wav');
    chicken_dead_sound = new Audio('audio/chicken_dead.wav');
    game_over_sound = new Audio('audio/gameOver.wav');
    boss_hurt_sound = new Audio('audio/bossHurt.wav');
    mute = true;
    endBossDead = false;
    endBossSpawned = false;
    blocked2 = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.setVolume();
    }
    
    /**
     * This function will lower the s volume of the sounds
     */
    setVolume() {
        this.bottle_throw_sound.volume = 0.2;
        this.chicken_dead_sound.volume = 0.1;
        this.game_over_sound.volume = 0.1;
        this.boss_hurt_sound.volume = 0.2;
    }

    /**
     * This function will give acces to world from the class character
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * This function will repeatly check the collisions and if an object is thrown
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50)
    }

    /**
     * This function is used to check the collisions
     */
    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsCoins();
        this.checkCollisionsBottle();
        this.checkCollisionsEndboss();
    }

    /**
     * This function is used to check the collisions with the endboss
     */
    checkCollisionsEndboss() {
        this.level.endBoss.forEach((boss) => {
            this.characterCollidingBoss(boss);
            this.throwableCollidingBoss(boss);
            this.endbossIsSpawned(boss);
        })
    }

    /**
     * This function is used to check the collisions between the endboss and the throwable object
     * @param {object} boss This is the boss it will be checked with
     */
    throwableCollidingBoss(boss) {
        if (this.throwableObject.isColliding(boss) && boss.mode == "attack") {
            this.throwableObject.hit = true;
            this.addDamage(boss);
            this.isEndbossDead(boss)
            boss.playHurtAnimation = true;
            if (!this.mute) {
                this.boss_hurt_sound.play();
            }
            setTimeout(() => {
                boss.playHurtAnimation = false;
            }, 700)
        }
    }

    /**
     * This function will tell if the endboss is dead
     * 
     * @param {object} boss This is the endboss object
     */
    isEndbossDead(boss) {
        if (boss.bossDead) {
            this.endBossDead = true;
        }
    }

    /**
     * This function is used to set the direction of the boss
     * 
     * @param {object} boss This is the endboss object
     */
    setBossDirection(boss) {
        if(this.character.x > boss.x) {
            boss.otherDirection = true;
        } else {
            boss.otherDirection = false;
        }
    }

    /**
     * This function will tell if the endboss is spawned
     * 
     * @param {object} boss This is the endboss object
     */
    endbossIsSpawned(boss) {
        if (this.endBossSpawned) {
            boss.bossSpawned = true;
            this.setBossDirection(boss);
        }
    }

    /**
     * This function is used to check the collisions between the character and the endboss
     * 
     * @param {object} boss This is the endboss object
     */
    characterCollidingBoss(boss) {
        if (this.character.isColliding(boss)) {
            this.character.hit()
            this.statusBarLife.setPercentage(this.character.energy, this.statusBarLife.IMAGES_LIFE);
        }
    }

    /**
     * This function is used to check the collisions between the character and the collectable bottle
     */
    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.itemCollected = true;
                bottle.addItem(this.statusBarBottles, this.mute);
                this.statusBarBottles.setPercentage(this.statusBarBottles.item, this.statusBarBottles.IMAGES_BOTTLES);
            }
        })
    }

    /**
     * This function is used to check the collisions between the character and the collectable coin
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.itemCollected = true;
                coin.addItem(this.statusBarCoins, this.mute);
                this.statusBarCoins.setPercentage(this.statusBarCoins.item, this.statusBarCoins.IMAGES_COINS);
            }
        })
    }

    /**
     * This function will check the collisions with the enemy
     */
    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.characterCollisionEnemy(enemy)
            this.bottleCollisionEnemy(enemy)
        })
    }

    /**
     * This function is used to check the collision between the throwable bottle and the enemy
     * 
     * @param {object} enemy This is the enemy to check the collision with
     */
    bottleCollisionEnemy(enemy) {
        if (this.isBottleCollidingChicken(enemy)) {
            this.bottleKillsChicken(enemy)
        }
    }

    /**
     * This function is used to check the collisions between the character and the enemy
     * 
     * @param {object} enemy This is the enemy to check the collision with
     */
    characterCollisionEnemy(enemy) {
        if (this.characterGetsHit(enemy)) {
            this.characterLoseEnergy();
        } else if (this.characterKillsChicken(enemy)) {
            enemy.chickenDead = true;
            if (!this.mute) {
                this.chicken_dead_sound.play();
            }
        }
    }

    /**
     * This function is used to kill the chicken
     * 
     * @param {object} enemy This is the enemy that will be killed
     */
    bottleKillsChicken(enemy) {
        this.throwableObject.hit = true;
        enemy.chickenDead = true;
        if (!this.mute) {
            this.chicken_dead_sound.play();
        }
    }

    /**
     * This function will tell if the throwable object is colliding with the enemy
     * 
     * @param {object} enemy This is the enemy to check the collision with
     * @returns It return "true" if they´re colliding
     */
    isBottleCollidingChicken(enemy) {
        return this.throwableObject.isColliding(enemy) && !enemy.chickenDead;
    }

    /**
     * This function will tell if the character killed the enemy
     * 
     * @param {object} enemy This is the enemy to check the collision with
     * @returns It returns "true" if the character killed the enemy
     */
    characterKillsChicken(enemy) {
        return this.character.isColliding(enemy) && this.character.jumping && this.character.speedY < 0 && !enemy.chickenDead;
    }

    /**
     * This function is used to check if the character got hit
     * 
     * @param {object} enemy This is the enemy to check the collision with
     * @returns It returns "true" if the character got hit
     */
    characterGetsHit(enemy) {
        return this.character.isColliding(enemy) && !this.character.jumping && !enemy.chickenDead;
    }

    /**
     * This function will make the character lose energy
     */
    characterLoseEnergy() {
        this.character.hit()
        this.statusBarLife.setPercentage(this.character.energy, this.statusBarLife.IMAGES_LIFE);
    }

    /**
     * This function will throw the bottle
     */
    checkThrowObjects() {
        if (this.canThrowObject()) {
            let bottle = this.throwDirection();
            this.throwableObject = bottle;
            this.statusBarBottles.item--; // Eine Flasche aus dem Inventar entfernen
            this.muteThrow();
            this.statusBarBottles.setPercentage(this.statusBarBottles.item, this.statusBarBottles.IMAGES_BOTTLES) // Statusbar Bottle will be updated
            this.character.resetTimer('reset');// Long Idle animation will be resetet
            this.throwableObject.lastHit = new Date().getTime();
        }
    }

    /**
     * This function will check if a bottle can be thrown
     * 
     * @returns It returns "true" if a bottle can be thrown
     */
    canThrowObject() {
        return this.keyboard.SPACE && this.statusBarBottles.item > 0 && this.throwableObject.timePassed();
    }

    /**
     * This function will mute the Bottlethrow
     */
    muteThrow() {
        if (!this.mute) {
            this.throwableObject.mute = false;
            this.bottle_throw_sound.play();
        } else {
            this.throwableObject.mute = true;
        }
    }

    /**
     * This function will check the direction the bottle will be thrown
     * 
     * @returns It returns the direction of the throw
     */
    throwDirection() {
        let bottle;
        if (!this.throwableObject.otherDirection) {
            bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.throwableObject.otherDirection); // Flasche nach rechts schmeißen
        } else {
            bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.throwableObject.otherDirection); // Flasche nach links schmeißen
        }

        return bottle
    }

    /**
     * This function will draws all the all the objects in the right order on the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.objectsToAdd()
        this.spawnEndboss();
        this.addStaticObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.gameIsOver();

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * This function will show the gameover screen
     */
    gameIsOver() {
        if (this.gameOverObject.gameOver || this.endBossDead) {
            this.addToMap(this.gameOverObject)
            if (!this.mute && !this.blocked2) {
                this.game_over_sound.play();
                this.character.walking_sound.pause();
                this.blocked2 = true; 
                setTimeout(() => {this.game_over_sound.pause();},2000)
            }
            setTimeout(() => {
                this.clearAllIntervals();
                this.gameOverObject.askRestartGame();
            }, 500)
        }
    }

    /**
     * This function will spawn the endboss
     */
    spawnEndboss() {
        if (this.character.x > 3300 || this.endBossSpawned) {
            this.addObjectsToMap(this.level.endBoss);
            this.endBossSpawned = true;
        }
    }

    /**
     * This function includes all the objects that will be drawn on the canvas
     */
    objectsToAdd() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addToMap(this.throwableObject);
    }

    /**
     * This function will add the static objects to the canvas
     */
    addStaticObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * This function will split the array into single objects
     * 
     * @param {object} objects Objects that will be added to the map
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * This function will draw the objects on the canvas
     * 
     * @param {object} mo This is the object that will be added to the map
     * @returns It returns if the item is collected so it will not be drawn 
     */
    addToMap(mo) {
        if (mo.otherDirection) { // Spiegeld das Bild
            this.flipImage(mo);
        }
        if (mo.itemCollected) {
            return;
        }

        mo.draw(this.ctx);

        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) { // Setzt das spiegeln wieder zurück
            this.flipImageBack(mo);
        }
    }

    /**
     * This function will flip the image
     * 
     * @param {object} mo This is the object that will be flipped
     */
    flipImage(mo) {
        this.ctx.save(); // Speichert vor dem Spiegeln
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function will flip the image back
     * 
     * @param {object} mo This is the object that will be flipped back
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function will clear all intervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * This function will add the damage to the Object
     * 
     * @param {object} mo This is the object where the damage will be added
     */
    addDamage(mo) {
        if (!mo.blocked) {
            mo.blocked = true;
            mo.hit++;
            setTimeout(function () {
                mo.blocked = false;
            }, 1000);
        }
    }
}