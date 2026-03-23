import {Grid} from "./Grid.js";
import {Scene} from "phaser";

export class MineSweeperScene extends Scene {

    width: any;
    height: any;
    bombs: any;
    grid: Grid;

    constructor() {
        super('MineSweeper');
    }

    init(data: any) {
        this.width = data.width;
        this.height = data.height;
        this.bombs = data.bombs;
    }

    create() {
        this.add.image(0, 0, 'win95').setOrigin(0);

        this.grid = new Grid(this, this.width, this.height, this.bombs);
    }
}
