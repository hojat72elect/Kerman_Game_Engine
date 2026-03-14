import { WEBGL, Game, Scale,Types } from 'phaser';
import {Breakout} from "./scenes/breakout.js";

const config: Types.Core.GameConfig = {
    type: WEBGL,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Breakout
    ],
    physics:{
        default: 'arcade'
    }
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
