import {Scene} from "phaser";
import {Player} from "../gameobjects/Player.js";
import {BlueEnemy} from "../gameobjects/BlueEnemy.js";
import type {Bullet} from "../gameobjects/Bullet.js";
import type {HudScene} from "./HudScene.js";

export class MainScene extends Scene {
    player!: Player;
    enemy_blue!: BlueEnemy;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    points: number = 0;
    game_over_timeout: number = 20;

    constructor() {
        super("MainScene");
    }

    init() {
        this.cameras.main.fadeIn(1_000, 0, 0, 0);
        this.scene.launch("MenuScene");

        // Reset points
        this.points = 0;
        this.game_over_timeout = 20;
    }

    create() {
        this.add.image(0, 0, "background").setOrigin(0, 0);
        this.add.image(0, this.scale.height, "floor").setOrigin(0, 1);

        // Player
        this.player = new Player({scene: this});

        // Enemy
        this.enemy_blue = new BlueEnemy(this);

        // Cursor keys 
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.cursors.space.on("down", () => {
            this.player.fire();
        });
        this.input.on("pointerdown", (pointer) => {
            this.player.fire(pointer.x, pointer.y);
        });

        // Overlap enemy with bullets
        this.physics.add.overlap(this.player.bullets as any, this.enemy_blue as any, (enemy: any, bullet: any) => {
            (<Bullet>bullet).destroyBullet();
            (<BlueEnemy>enemy).damage(this.player.x, this.player.y);
            this.points += 10;
            (this.scene.get("HudScene") as HudScene).update_points(this.points);
        });

        // Overlap player with enemy bullets
        this.physics.add.overlap(this.enemy_blue.bullets as any, this.player as any, (_: any, bullet: any) => {
            (<Bullet>bullet).destroyBullet();
            this.cameras.main.shake(100, 0.01);
            // Flash the color white for 300ms
            this.cameras.main.flash(300, 255, 255, 255, false);
            this.points -= 10;
            (this.scene.get("HudScene") as HudScene).update_points(this.points);
        });

        // This event comes from MenuScene
        this.game.events.on("start-game", () => {
            this.scene.stop("MenuScene");
            this.scene.launch("HudScene", {remaining_time: this.game_over_timeout});
            this.player.start();
            this.enemy_blue.start();

            // Game Over timeout
            this.time.addEvent({
                delay: 1000,
                loop: true,
                callback: () => {
                    if (this.game_over_timeout === 0) {
                        // You need remove the event listener to avoid duplicate events.
                        this.game.events.removeListener("start-game");
                        // It is necessary to stop the scenes launched in parallel.
                        this.scene.stop("HudScene");
                        this.scene.start("GameOverScene", {points: this.points});
                    } else {
                        this.game_over_timeout--;
                        (this.scene.get("HudScene") as any).update_timeout(this.game_over_timeout);
                    }
                }
            });
        });
    }

    update() {
        this.player.update();
        this.enemy_blue.update();

        // Player movement entries
        if (this.cursors.up.isDown) this.player.move("up");
        if (this.cursors.down.isDown) this.player.move("down");
    }
}