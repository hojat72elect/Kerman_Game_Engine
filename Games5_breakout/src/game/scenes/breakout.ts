export class Breakout extends Phaser.Scene {

    bricks!: Phaser.Physics.Arcade.StaticGroup;
    ball!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    paddle!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    constructor() {
        super({key: 'breakout'});
    }

    preload() {
        this.load.setBaseURL('assets');
        this.load.atlas('breakout', 'breakout.png', 'breakout.json');
    }

    create() {
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'breakout', frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
            frameQuantity: 10,
            gridAlign: {width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100}
        });

        this.ball = this.physics.add.image(400, 500, 'breakout', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 550, 'breakout', 'paddle1').setImmovable();

        //  Our colliders
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, undefined, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, undefined, this);

        //  Input events
        this.input.on('pointermove', function (pointer: any) {

            //  Keep the paddle within the game
            //@ts-ignore
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
            //@ts-ignore
            if (this.ball.getData('onPaddle')) {
                //@ts-ignore
                this.ball.x = this.paddle.x;
            }


        }, this);

        this.input.on('pointerup', function (_: any) {
            //@ts-ignore
            if (this.ball.getData('onPaddle')) {
                //@ts-ignore
                this.ball.setVelocity(-75, -300);
                //@ts-ignore
                this.ball.setData('onPaddle', false);
            }

        }, this);
    }

    hitBrick(_: any, brick: any) {
        brick.disableBody(true, true);

        if (this.bricks.countActive() === 0) {
            this.resetLevel();
        }
    }

    resetBall() {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onPaddle', true);
    }

    resetLevel() {
        this.resetBall();

        this.bricks.children.each((brick: any) => {

            (brick as any).enableBody(false, 0, 0, true, true);
            return null;

        });
    }

    hitPaddle(ball: any, paddle: any) {
        let diff = 0;

        if (ball.x < paddle.x) {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        } else if (ball.x > paddle.x) {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        } else {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    update() {
        if (this.ball.y > 600) {
            this.resetBall();
        }
    }
}
