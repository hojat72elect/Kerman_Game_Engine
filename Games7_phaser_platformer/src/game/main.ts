import {AUTO, Game, Types} from 'phaser';
import {Example} from "./part10";

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
    scene: [
        Example
    ]
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
