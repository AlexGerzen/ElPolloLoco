class StatusbarBottles extends Statusbar {
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 30;
        this.y = 100;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.item, this.IMAGES_BOTTLES);
    }
}