import Phaser from 'phaser';

// Direction consts
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

// Global variables
let snake: Snake;
let food: Food;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

interface GridPosition {
    x: number;
    y: number;
}

class Food extends Phaser.GameObjects.Image {
    public total: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x * 16, y * 16, 'food');

        this.setOrigin(0);
        this.total = 0;

        scene.children.add(this);
    }

    public eat(): void {
        this.total++;
    }
}

class Snake {
    public headPosition: Phaser.Geom.Point;
    public body: Phaser.GameObjects.Group;
    public head: Phaser.GameObjects.Image;
    public alive: boolean;
    public speed: number;
    public moveTime: number;
    public tail: Phaser.Geom.Point;
    public heading: number;
    public direction: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.body.create(x * 16, y * 16, 'body') as Phaser.GameObjects.Image;
        this.head.setOrigin(0);

        this.alive = true;
        this.speed = 100;
        this.moveTime = 0;
        this.tail = new Phaser.Geom.Point(x, y);
        this.heading = RIGHT;
        this.direction = RIGHT;
    }

    public update(time: number): boolean | void {
        if (time >= this.moveTime) {
            return this.move(time);
        }
    }

    public faceLeft(): void {
        if (this.direction === UP || this.direction === DOWN) {
            this.heading = LEFT;
        }
    }

    public faceRight(): void {
        if (this.direction === UP || this.direction === DOWN) {
            this.heading = RIGHT;
        }
    }

    public faceUp(): void {
        if (this.direction === LEFT || this.direction === RIGHT) {
            this.heading = UP;
        }
    }

    public faceDown(): void {
        if (this.direction === LEFT || this.direction === RIGHT) {
            this.heading = DOWN;
        }
    }

    public move(time: number): boolean {
        /**
         * Based on the heading property (which is the direction the pgroup pressed)
         * we update the headPosition value accordingly.
         *
         * The Math.wrap call allow the snake to wrap around the screen, so when
         * it goes off any of the sides it re-appears on the other.
         */
        switch (this.heading) {
            case LEFT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                break;

            case RIGHT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                break;

            case UP:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                break;

            case DOWN:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                break;
        }

        this.direction = this.heading;

        //  Update the body segments and place the last coordinate into this.tail
        Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, new Phaser.Math.Vector2(this.tail.x, this.tail.y));

        //  Check to see if any of the body pieces have the same x/y as the head
        //  If they do, the head ran into the body

        const hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), {x: this.head.x, y: this.head.y}, 1);

        if (hitBody) {
            console.log('dead');

            this.alive = false;

            return false;
        } else {
            //  Update the timer ready for the next movement
            this.moveTime = time + this.speed;

            return true;
        }
    }

    public grow(): void {
        const newPart = this.body.create(this.tail.x, this.tail.y, 'body') as Phaser.GameObjects.Image;
        newPart.setOrigin(0);
    }

    public collideWithFood(food: Food): boolean {
        if (this.head.x === food.x && this.head.y === food.y) {
            this.grow();

            food.eat();

            //  For every 5 items of food eaten we'll increase the snake speed a little
            if (this.speed > 20 && food.total % 5 === 0) {
                this.speed -= 5;
            }

            return true;
        } else {
            return false;
        }
    }

    public updateGrid(grid: boolean[][]): boolean[][] {
        //  Remove all body pieces from valid positions list
        this.body.children.each(function (segment: Phaser.GameObjects.GameObject): boolean {
            const imageSegment = segment as Phaser.GameObjects.Image;
            const bx = Math.floor(imageSegment.x / 16);
            const by = Math.floor(imageSegment.y / 16);

            // Ensure indices are within grid bounds
            if (by >= 0 && by < grid.length && bx >= 0 && bx < grid[by].length) {
                grid[by][bx] = false;
            }
            return true;
        });

        return grid;
    }
}

export function preload(this: Phaser.Scene): void {
    this.load.image('food', 'assets/food.png');
    this.load.image('body', 'assets/body.png');
}

export function create(this: Phaser.Scene): void {
    food = new Food(this, 3, 4);
    snake = new Snake(this, 8, 8);

    //  Create our keyboard controls
    cursors = this.input.keyboard?.createCursorKeys() || {} as Phaser.Types.Input.Keyboard.CursorKeys;
}

export function update(this: Phaser.Scene, time: number, _delta: number): void {
    if (!snake.alive) {
        return;
    }

    /**
     * Check which key is pressed, and then change the direction the snake
     * is heading based on that. The checks ensure you don't double-back
     * on yourself, for example if you're moving to the right and you press
     * the LEFT cursor, it ignores it, because the only valid directions you
     * can move in at that time is up and down.
     */
    if (cursors.left.isDown) {
        snake.faceLeft();
    } else if (cursors.right.isDown) {
        snake.faceRight();
    } else if (cursors.up.isDown) {
        snake.faceUp();
    } else if (cursors.down?.isDown) {
        snake.faceDown();
    }

    if (snake.update(time)) {
        //  If the snake updated, we need to check for collision against food

        if (snake.collideWithFood(food)) {
            repositionFood();
        }
    }
}

/**
 * We can place the food anywhere in our 40x30 grid
 * *except* on-top of the snake, so we need
 * to filter those out of the possible food locations.
 * If there aren't any locations left, they've won!
 *
 * @method repositionFood
 * @return {boolean} true if the food was placed, otherwise false
 */
function repositionFood(): boolean {
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    const testGrid: boolean[][] = [];

    for (let y = 0; y < 30; y++) {
        testGrid[y] = [];

        for (let x = 0; x < 40; x++) {
            testGrid[y][x] = true;
        }
    }

    snake.updateGrid(testGrid);

    //  Purge out false positions
    const validLocations: GridPosition[] = [];

    for (let y = 0; y < 30; y++) {
        for (let x = 0; x < 40; x++) {
            if (testGrid[y][x] === true) {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({x, y});
            }
        }
    }

    if (validLocations.length > 0) {
        //  Use the RNG to pick a random food position
        const pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    } else {
        return false;
    }
}
