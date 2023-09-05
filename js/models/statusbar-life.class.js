class StatusbarLife extends Statusbar {
    IMAGES_LIFE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFE);
        this.x = 30;
        this.y = 0;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.percentage, this.IMAGES_LIFE);
    }
}