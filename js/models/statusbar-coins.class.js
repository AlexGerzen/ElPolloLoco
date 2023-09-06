class StatusbarCoins extends Statusbar {
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 30;
        this.y = 50;
        this.height = 60;
        this.width = 200;
        this.setPercentage(this.item, this.IMAGES_COINS);
    }
}