import Game from "@/classes/Game";
import { loadImage, loadJSON } from "@/utils/loader";
import Sprite from "@/classes/Sprite";
import Cinematic from "@/classes/Cinematic";
import DisplayObject from "@/classes/DisplayObject";

async function main (canvas: HTMLCanvasElement) {
    const debug = true
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
        speedX: 1,
        speedY: 1,
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


    const walls = atlas.maze.walls.map(wall => new DisplayObject({
        visible: true,
        width: wall.width * scale,
        height: wall.height * scale,
        x: wall.x * scale,
        y: wall.y * scale,
        debug
    }))
    console.log(walls)

    let foods = atlas.maze.foods.map(food => {
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

    const game = new Game(
        canvas,
        {
            background: 'black',
            height: 500,
            width: 500
        }
    );

    game.update = () => {
        const eaten: Sprite[] = [];
        for(const food of foods) {
            if(pacman.hasCollision(food)){
                eaten.push(food)

            }
        }
        game.stage.remove(...eaten)
        foods = foods.filter(food => !eaten.includes(food))
    }
    game.width = maze.width
    game.height = maze.height
    game.stage.add(maze, pacman, ...foods, ...ghosts, ...walls)

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case "ArrowLeft":
                pacman.start("left")
                pacman.speedX = -1
                pacman.speedY = 0
                break
            case "ArrowRight":
                pacman.start("right")
                pacman.speedX = 1
                pacman.speedY = 0
                break
            case "ArrowUp":
                pacman.start("up")
                pacman.speedX = 0
                pacman.speedY = -1
                break
            case "ArrowDown":
                pacman.start("down")
                pacman.speedX = 0
                pacman.speedY = 1
                break
        }
    })

}

export default main;