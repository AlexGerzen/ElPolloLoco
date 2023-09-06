class World {

    character = new Character();
    statusBarLife = new StatusbarLife();
    statusBarCoins = new StatusbarCoins();
    statusBarBottles = new StatusbarBottles();
    throwableObject = new ThrowableObject();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0; //Kamera position

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

            // this.statusBarBottles.setPercentage(this.statusBarBottles.bottles, this.statusBarBottles.IMAGES_BOTTLES)
        }, 200)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => { // Kollision mit Gegner
            if (this.character.isColliding(enemy)) {
                this.character.hit()
                this.statusBarLife.setPercentage(this.character.energy, this.statusBarLife.IMAGES_LIFE);
            }
        })
        this.level.coins.forEach((coin) => { // Kollision mit Coin
            if (this.character.isColliding(coin)) {
                coin.itemCollected = true;
                coin.addItem(this.statusBarCoins);
                this.statusBarCoins.setPercentage(this.statusBarCoins.item, this.statusBarCoins.IMAGES_COINS);
            }
        })
        this.level.bottles.forEach((bottle) => { // Kollision mit Flasche
            if (this.character.isColliding(bottle)) {
                bottle.itemCollected = true;
                bottle.addItem(this.statusBarBottles);
                this.statusBarBottles.setPercentage(this.statusBarBottles.item, this.statusBarBottles.IMAGES_BOTTLES);
            }
        })
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject = bottle;
            this.character.resetTimer('reset');   
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
        this.addToMap(this.throwableObject);


        this.ctx.translate(-this.camera_x, 0); // Kamera wird neu ausgerichtet damit die Statusbar immer zu sehen ist
        this.addToMap(this.statusBarLife); // Statusbar wird dargestellt
        this.addToMap(this.statusBarCoins); // Statusbar wird dargestellt
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);



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

        if(mo.itemCollected) { //  Wenn die Münze eingesammelt wurde wird sie nicht dargestellt
            return;
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

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
}