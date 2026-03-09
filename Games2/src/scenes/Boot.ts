import {Scene} from 'phaser';

/**
 * The initial scene of the game. We use it for loading assets.
 */
export class Boot extends Scene {

    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('preloader', 'assets/preloader.png');
    }

    create() {

        this.registry.set('highscore', 0); // A global value for storing the high-score 


        this.input.once('pointerdown', () => {
            this.scene.start('Preloader');
        });
    }
}
