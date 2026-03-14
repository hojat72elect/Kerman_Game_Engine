import Phaser from 'phaser';
import Preloader from './Preloader.js';
import MainMenu from './MainMenu.js';
import MainGame from './Game.js';
import Boot from "./Boot.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [Boot, Preloader, MainMenu, MainGame],
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    }
};

new Phaser.Game(config);
