import {AUTO, Game, Scale, Types} from 'phaser';
import {PhaserPlatformerGame} from "./PhaserPlatformerGame";

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 300},
            debug: false
        }
    },
    parent: 'game-container',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        PhaserPlatformerGame
    ]
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
