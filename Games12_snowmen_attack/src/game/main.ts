import {Game, Scale, Types, WEBGL} from 'phaser';
import {create, preload, update} from "./part7.js";

const config: Types.Core.GameConfig = {
    type: WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#bfcc00',
    parent: 'game-container',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
