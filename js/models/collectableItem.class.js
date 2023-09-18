class CollectableItem extends MovableObject {
    blocked = false;
    itemCollected = false;
    coin_sound = new Audio('audio/coin.wav');
    bottle_collect_sound = new Audio('audio/bottle_collect.wav');

    addItem(statusbar, mute) { // Funktion damit auch nur ein Item eingesammelt wird pro Item
        if (!this.blocked) {
            this.blocked = true;
            statusbar.item++;

            if(!mute) {
                if(this instanceof Bottles) {
                    this.bottle_collect_sound.play();
                } else {
                    this.coin_sound.play();
                }
            }
            

            setTimeout(function () {
                this.blocked = false;
            }, 2000);
        }
    }

}