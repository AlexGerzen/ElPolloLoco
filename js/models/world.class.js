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
    mute = true;
    endBossDead = false;
    endBossSpawned = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard; //Verbindung zur Keyboard Class
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; // Erlaubt von Character Class auf World Class zuzugreifen
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => { // Kollision mit Gegner

            if (this.character.isColliding(enemy) && !this.character.jumping && !enemy.chickenDead) {
                this.character.hit()
                this.statusBarLife.setPercentage(this.character.energy, this.statusBarLife.IMAGES_LIFE);
            } else if (this.character.isColliding(enemy) && this.character.jumping && this.character.speedY < 0 && !enemy.chickenDead) {
                enemy.chickenDead = true;
                if (!this.mute) {
                    this.chicken_dead_sound.play();
                }
            }

            if (this.throwableObject.isColliding(enemy) && !enemy.chickenDead) {
                this.throwableObject.hit = true;
                enemy.chickenDead = true;
                if (!this.mute) {
                    this.chicken_dead_sound.play();
                }
            }
        })
        this.level.coins.forEach((coin) => { // Kollision mit Coin
            if (this.character.isColliding(coin)) {
                coin.itemCollected = true;
                coin.addItem(this.statusBarCoins, this.mute);
                this.statusBarCoins.setPercentage(this.statusBarCoins.item, this.statusBarCoins.IMAGES_COINS);
            }
        })
        this.level.bottles.forEach((bottle) => { // Einsammeln von Flasche auf dem Boden
            if (this.character.isColliding(bottle)) {
                bottle.itemCollected = true;
                bottle.addItem(this.statusBarBottles, this.mute);
                this.statusBarBottles.setPercentage(this.statusBarBottles.item, this.statusBarBottles.IMAGES_BOTTLES);
            }
        })

        this.level.endBoss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.character.hit()
                this.statusBarLife.setPercentage(this.character.energy, this.statusBarLife.IMAGES_LIFE);
            }

            if (this.throwableObject.isColliding(boss)) {
                this.throwableObject.hit = true;
                this.addDamage(boss);
                if(boss.bossDead) {
                    this.endBossDead = true;
                }
            }
            if(this.endBossSpawned) {
                boss.bossSpawned = true;
            }
        })
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.statusBarBottles.item > 0 && this.throwableObject.timePassed()) {
            let bottle;
            if (!this.throwableObject.otherDirection) {
                bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.throwableObject.otherDirection); // Flasche nach rechts schmeißen
            } else {
                bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.throwableObject.otherDirection); // Flasche nach links schmeißen
            }
            this.throwableObject = bottle;
            this.statusBarBottles.item--; // Eine Flasche aus dem Inventar entfernen
            if (!this.mute) {
                this.throwableObject.mute = false;
                this.bottle_throw_sound.play();
            } else {
                this.throwableObject.mute = true;
            }
            this.statusBarBottles.setPercentage(this.statusBarBottles.item, this.statusBarBottles.IMAGES_BOTTLES) // Statusbar Bottle wird aktualisiert
            this.character.resetTimer('reset');// Long Idle animation wird zurückgesetzt
            this.throwableObject.lastHit = new Date().getTime();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canavas wird gecleart

        this.ctx.translate(this.camera_x, 0); // Sorgt dafür das die Kamera sich mitbewegt

        this.addObjectsToMap(this.level.backgroundObjects); // Hintergrund wird dargestellt
        this.addObjectsToMap(this.level.clouds); // Wolken werden dargestellt
        this.addObjectsToMap(this.level.enemies); // Hühner werden dargestellt
        this.addObjectsToMap(this.level.coins) // Coins werden dargestellt
        this.addObjectsToMap(this.level.bottles) // Flaschen werden dargestellt
        this.addToMap(this.character); // Character wird dargestellt
        this.addToMap(this.throwableObject); // Wurfflasche wird dargestellt
        if (this.character.x > 3300 || this.endBossSpawned) { // Angabe ab wann der Boss spawnen soll
            this.addObjectsToMap(this.level.endBoss);
            this.endBossSpawned = true;
        }


        this.ctx.translate(-this.camera_x, 0); // Kamera wird neu ausgerichtet damit die Statusbar immer zu sehen ist
        this.addToMap(this.statusBarLife); // Statusbar wird dargestellt
        this.addToMap(this.statusBarCoins); // Statusbar wird dargestellt
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        if (this.gameOverObject.gameOver || this.endBossDead) {
            this.addToMap(this.gameOverObject)
            setTimeout(() => {
                this.clearAllIntervals()
                this.gameOverObject.askRestartGame()
            }, 500)
        }

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) { // Spiegeld das Bild
            this.flipImage(mo);
        }

        if (mo.itemCollected) { //  Wenn die Münze eingesammelt wurde wird sie nicht dargestellt
            return;
        }

        mo.draw(this.ctx);


        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) { // Setzt das spiegeln wieder zurück
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save(); // Speichert vor dem Spiegeln
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

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