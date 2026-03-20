import { AUTO, Game, Scale,Types } from 'phaser';
import {Boot} from "./scenes/Boot.ts";
import {Preloader} from "./scenes/Preloader.ts";
import {MainMenu} from "./scenes/MainMenu.ts";
import {MainGame} from "./scenes/MainGame.ts";

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#008eb0',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Boot, Preloader, MainMenu, MainGame
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
