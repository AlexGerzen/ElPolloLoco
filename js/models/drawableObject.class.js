class DrawableObject {
    imageCache = [];
    img;
    currentImage = 0;
    x = 120;
    y = 220;
    height = 150;
    width = 100;
    

    /**
     * This function will load the image
     * 
     * @param {string} path This is the path for the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function will put the images in the image cache
     * 
     * @param {array} arr This is the array with the images
     */
    loadImages(arr) { //Images werden in ein Array gepackt
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    /**
     * This function will draw the images on the canvas
     * 
     * @param {context} ctx This will give the context for the canvas
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height) // Bild wird dargestellt
        }
        catch (error) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }

    /**
     * This function will draw the Hitboxes
     * 
     * @param {context} ctx This will give the context for the canvas
     */
    // drawFrame(ctx) {
    //     // Hitbox zeichnen
    //     if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }
}