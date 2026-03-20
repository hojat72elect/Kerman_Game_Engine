import { AUTO, Game, Scale,Types } from 'phaser';
import {Boot} from "./scenes/Boot.ts";
import Preloader from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";
import MainGame from "./scenes/Game";

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
