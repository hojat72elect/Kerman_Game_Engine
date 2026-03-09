import {Preloader} from './Preloader.js';
import {Play} from './Play.js';
import Phaser from 'phaser';

const config : Phaser.Types.Core.GameConfig = {
    title: 'Card Memory Game',
    type: Phaser.AUTO,
    width: 549,
    height: 480,
    parent: 'game-container',
    backgroundColor: '#192a56',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Play
    ]
};

new Phaser.Game(config);
