import {Scene} from 'phaser';

export class MainMenu extends Scene {

    music = false;

    constructor() {
        super('MainMenu');
    }

    create() {
        let background: Phaser.GameObjects.Image = this.add.image(400, 300, 'background');

        this.tweens.add({
            targets: background,
            alpha: {from: 0, to: 1},
            duration: 1_000
        });

        const fontStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            fontStyle: 'bold',
            padding: {x: 16, y: 16},
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 4
            }
        };

        this.add.text(20, 20, 'High Score: ' + this.registry.get('highscore'), fontStyle);

        let logo = this.add.image(400, -200, 'logo');

        if (!this.music) {
            this.music = this.sound.play('music', {loop: true});
        }

        this.tweens.add({
            targets: logo,
            y: 300,
            ease: 'bounce.out',
            duration: 1200
        });

        this.input.once('pointerdown', () => {

            this.scene.start('MainGame');

        });
    }
}
