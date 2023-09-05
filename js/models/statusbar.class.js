class Statusbar extends DrawableObject {

    constructor() {
        super();
    }

    setPercentage(percentage, images, transform) {
        this.percentage = percentage;
        if(this instanceof StatusbarCoins || this instanceof StatusbarBottles) {
            this.percentage = percentage * 20
        }
        let imagePath = images[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

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