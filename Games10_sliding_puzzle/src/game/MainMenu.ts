import {Scene} from 'phaser';
import {WipePostFX} from "./WipePostFX.ts";
import {ShinePostFX} from "./ShinePostFX.ts";
import WebGLRenderer = Phaser.Renderer.WebGL.WebGLRenderer;

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu');
    }

    create() {
        // Register custom pipelines with the renderer
        (this.renderer as WebGLRenderer).pipelines.addPostPipeline('ShinePostFX', ShinePostFX);
        (this.renderer as WebGLRenderer).pipelines.addPostPipeline('WipePostFX', WipePostFX);

        this.add.image(512, 384, 'background');

        const box = this.add.image(512, 384, 'box');

        const logo = this.add.image(512, -384, 'logo');

        box.setPostPipeline('WipePostFX');
        logo.setPostPipeline('ShinePostFX');

        const pipeline = box.getPostPipeline('WipePostFX') as WipePostFX;

        pipeline.setTopToBottom();
        pipeline.setRevealEffect();

        this.tweens.add({
            targets: pipeline,
            progress: 1,
            duration: 3000
        });

        this.tweens.add({
            targets: logo,
            y: 384,
            delay: 1500,
            duration: 2000,
            ease: 'sine.out',
            onComplete: () => {

                this.input.once('pointerdown', () => {

                    pipeline.setWipeEffect();
                    pipeline.setTexture('box-inside');

                    this.tweens.add({
                        targets: logo,
                        alpha: 0,
                        duration: 1000,
                        ease: 'sine.out'
                    });

                    this.tweens.add({
                        targets: pipeline,
                        progress: 1,
                        duration: 2500,
                        onComplete: () => {
                            this.scene.start('Game');
                        }
                    });
                });

            }
        });
    }
}
