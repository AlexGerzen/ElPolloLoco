class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    endBoss;
    level_end_x = 3600;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, endBoss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endBoss = endBoss;
    }
}