import {Scene} from "phaser";

/**
 * The HUD scene is the scene that shows the points and the remaining time.
 * This scene is shown alongside the main scene of the game.
 */
export class HudScene extends Scene {

    remaining_time: number = 0;
    remaining_time_text!: Phaser.GameObjects.BitmapText;
    points_text!: Phaser.GameObjects.BitmapText;

    constructor() {
        super("HudScene");
    }

    create() {
        this.points_text = this.add.bitmapText(10, 10, "pixelfont", "POINTS:0000", 24);
        this.remaining_time_text = this.add.bitmapText(this.scale.width - 10, 10, "pixelfont", `REMAINING:${this.remaining_time}s`, 24)
            .setOrigin(1, 0);
    }

    update_points(points: number) {
        this.points_text.setText(`POINTS:${points.toString().padStart(4, "0")}`);
    }

    update_timeout(timeout: number) {
        this.remaining_time_text.setText(`REMAINING:${timeout.toString().padStart(2, "0")}s`);
    }
}