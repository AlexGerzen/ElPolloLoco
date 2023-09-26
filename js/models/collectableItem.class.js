class CollectableItem extends MovableObject {
    blocked = false;
    itemCollected = false;
    coin_sound = new Audio('audio/coin.wav');
    bottle_collect_sound = new Audio('audio/bottle_collect.wav');

    constructor() {
        super();
        this.setVolume();
    }

    /**
     * This function will lower the s volume of the sounds
     */
    setVolume() {
        this.coin_sound.volume = 0.1;
        this.bottle_collect_sound.volume = 0.1;
    }

    /**
     * This function will make sure that one item is also collected as one item
     * 
     * @param {string} statusbar This is the statusbar which will be adjusted
     * @param {boolean} mute This tells if the musik is mute
     */
    addItem(statusbar, mute) { 
        if (!this.blocked) {
            this.blocked = true;
            statusbar.item++;

            this.playSound(mute);
            
            setTimeout(function () {
                this.blocked = false;
            }, 2000);
        }
    }

    /**
     * This function will play the sound if an item is collected
     * 
     * @param {boolean} mute This tells if the musik is mute
     */
    playSound(mute) {
        if(!mute) {
            if(this instanceof Bottles) {
                this.bottle_collect_sound.play();
            } else {
                this.coin_sound.play();
            }
        }
    }
}