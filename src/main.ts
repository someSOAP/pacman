import Game from "@/classes/Game";
import { loadImage, loadJSON } from "@/utils/loader";
import Sprite from "@/classes/Sprite";
import Cinematic from "@/classes/Cinematic";

async function main (canvas: HTMLCanvasElement) {
    const debug = false
    const scale = 3

    const [image, atlas] = await Promise.all([
        loadImage('/src/sets/spritesheet.png'),
        loadJSON('/src/sets/atlas.json')
    ])

    const pacman = new Cinematic({
        image,
        x: atlas.position.pacman.x * scale,
        y: atlas.position.pacman.y * scale,
        width: 13 * scale,
        height: 13 * scale,
        animations: atlas.pacman,
        visible: true,
        frame: null,
        debug,
    })
    pacman.start("left")


    const maze = new Sprite({
        image,
        x: 0,
        y: 0,
        width: atlas.maze.width * scale,
        height: atlas.maze.height * scale,
        frame: atlas.maze,
        visible: true
    })

    const ghosts = ['red', 'pink', 'turquoise', 'banana']
        .map((color) => {
            const ghost = new Cinematic({
                image,
                x: atlas.position[color].x * scale,
                y: atlas.position[color].y * scale,
                animations: atlas[`${color}Ghost`],
                visible: true,
                width: 13 * scale,
                height: 13 * scale,
                frame: null,
                debug,
            })

            ghost.start(atlas.position[color].direction)

            return ghost;
        })


    const game = new Game(
        canvas,
        {
            background: 'black',
            height: 500,
            width: 500
        }
    );

    const foods = atlas.maze.foods.map(food => {
        return new Sprite({
            image,
            visible: true,
            frame: atlas.food,
            x: food.x * scale,
            y: food.y * scale,
            width: food.width * scale,
            height: food.height * scale,
            debug: false
        })
    })

    game.width = maze.width
    game.height = maze.height
    game.stage.add(maze, pacman, ...foods, ...ghosts)

}

export default main;