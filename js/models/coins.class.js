class Coins extends CollectableItem {
    IMAGE_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGE_COINS);
        this.x = 200 + Math.random() * 2000;
        this.y = 70 + Math.random() * 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_COINS)
        }, 700);
    }

    
}
