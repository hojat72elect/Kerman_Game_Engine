import {Boot} from './scenes/Boot.js';
import {ClickerGame} from './scenes/ClickerGame.js';
import {Game} from 'phaser';
import {GameOver} from './scenes/GameOver.js';
import {MainMenu} from './scenes/MainMenu.js';
import {Preloader} from './scenes/Preloader.js';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 400}
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        ClickerGame,
        GameOver
    ]
};

new Game(config);
