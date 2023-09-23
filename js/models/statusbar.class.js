class Statusbar extends DrawableObject {
    item = 0;

    constructor() {
        super();
    }

    /**
     * Thhis function will set the percentage of the statusbar
     * 
     * @param {number} percentage This will tell the current percentage of the statusbar
     * @param {Array} images These are the different images of the statusbar
     */
    setPercentage(percentage, images) {
        this.percentage = percentage;
        if(this instanceof StatusbarCoins || this instanceof StatusbarBottles) {
            this.percentage = percentage * 20
        }
        let imagePath = images[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * This function will resolve the index of the image which is needed
     * 
     * @returns It returns the index of the image which is needed
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }


}