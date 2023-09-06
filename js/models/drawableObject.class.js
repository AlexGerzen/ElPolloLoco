class DrawableObject {
    imageCache = [];
    img;
    currentImage = 0;
    x = 120;
    y = 220;
    height = 150;
    width = 100;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height) // Bild wird dargestellt
    }

    drawFrame(ctx) {
        // Hitbox zeichnen
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y + 80, this.width, this.height - 90);
            ctx.stroke();
        }
    }
}