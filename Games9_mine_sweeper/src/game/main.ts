import {AUTO, Game, Scale, Types} from 'phaser';
import {MineSweeperScene} from "./MineSweeperScene.ts";
import {IntroScene} from "./IntroScene.ts";


const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x2d2d2d,
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
        IntroScene, MineSweeperScene
    ]
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
