export default class Germ extends Phaser.Physics.Arcade.Sprite {

    speed: any;
    alpha = 0;
    c = 0;
    isChasing = false;
    target!: Phaser.Math.Vector2;
    lifespan = 0;


    constructor(scene: any, x: any, y: any, animation: any, speed: any) {
        super(scene, x, y, 'assets');

        this.play(animation)

        this.setScale(Phaser.Math.FloatBetween(1, 2));

        this.speed = speed;

        this.alpha = 0;
        this.c = 0;
        this.isChasing = false;

        this.target = new Phaser.Math.Vector2();
    }

    start(chaseDelay: any) {
        this.setCircle(14, 6, 2);

        if (!chaseDelay) {
            chaseDelay = Phaser.Math.RND.between(3000, 8000);

            this.scene.sound.play('appear');
        }

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 2000,
            ease: 'Linear',
            hold: chaseDelay,
            onComplete: () => {
                if ((this.scene as any).player.isAlive) {
                    this.lifespan = Phaser.Math.RND.between(6000, 12000);
                    this.isChasing = true;
                }
            }
        });

        return this;
    }

    restart(x: any, y: any) {
        this.body!.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        this.setAlpha(0);
        //@ts-ignore
        return this.start();
    }

    preUpdate(time: any, delta: any) {
        super.preUpdate(time, delta);

        if (this.isChasing) {
            this.lifespan -= delta;

            if (this.lifespan <= 0) {
                this.isChasing = false;

                this.body!.stop();

                this.scene.tweens.add({
                    targets: this,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        this.setActive(false);
                        this.setVisible(false);
                    }
                });
            } else {
                (this.scene as any).getPlayer(this.target);

                //  Add 90 degrees because the sprite is drawn facing up
                this.rotation = this.scene.physics.moveToObject(this, this.target, this.speed) + 1.5707963267948966;
            }
        }
    }

    //@ts-ignore
    stop() {
        this.isChasing = false;

        this.body!.stop();
    }
}
