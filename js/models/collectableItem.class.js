class CollectableItem extends MovableObject {
    blocked = false;
    itemCollected = false;

    addItem(statusbar) { // Funktion damit auch nur ein Item eingesammelt wird pro Item
        if (!this.blocked) {
            this.blocked = true;
            statusbar.item++;

            setTimeout(function () {
                this.blocked = false;
            }, 2000);
        }
    }

}