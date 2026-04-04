import {Game, Scale, Types, AUTO} from 'phaser';
import {Boot} from "./Boot.ts";
import {Preloader} from "./Preloader";
import {MainMenu} from "./MainMenu";
import {MainGame} from "./Game";

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#3366b2',
    parent: 'game-container',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [ Boot, Preloader, MainMenu, MainGame ],
    physics:{
        default: 'arcade',
        arcade: { debug: false }
    }
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
