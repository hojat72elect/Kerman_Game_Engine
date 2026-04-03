import {AUTO, Game, Scale, Types} from 'phaser';
import {MainMenu} from "./MainMenu";
import {ShinePostFX} from "./ShinePostFX.ts";
import {WipePostFX} from "./WipePostFX";
import {Preloader} from "./Preloader.ts";
import {PuzzleGame} from "./Game";

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#002157',
    parent: 'game-container',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Preloader, MainMenu, PuzzleGame
    ],
    pipeline: { ShinePostFX, WipePostFX }
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;
