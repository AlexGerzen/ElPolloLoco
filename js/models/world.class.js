class World {

    character = new Character();
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
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this; // Erlaubt von Character Class auf World Class zuzugreifen
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit()
                }
            })
        }, 1000)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canavas wird gecleart

        this.ctx.translate(this.camera_x, 0); // Sorgt dafür das die Kamera sich mitbewegt

        this.addObjectsToMap(this.level.backgroundObjects); // Hintergrund wird dargestellt
        this.addObjectsToMap(this.level.clouds); // Wolken werden dargestellt
        this.addObjectsToMap(this.level.enemies); // Hühner werden dargestellt
        this.addToMap(this.character); // Character wird dargestellt

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