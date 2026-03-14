import {WEBGL, Game, Scale, Types} from 'phaser';
import {Flood} from "./flood-fill";

const config: Types.Core.GameConfig = {
    type: WEBGL,
    width: 800,
    height: 600,
    pixelArt: true,
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
        Flood
    ]
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
