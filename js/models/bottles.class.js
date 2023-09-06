class Bottles extends CollectableItem {
    IMAGE_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGE_BOTTLES);
        this.x = 200 + Math.random() * 2000;
        this.y = 350;
        this.height = 70;
        this.width = 50;
    }
}