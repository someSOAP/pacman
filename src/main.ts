import Game from "@/classes/Game";
import { loadImage, loadJSON } from "@/utils/loader";
import Sprite from "@/classes/Sprite";
import Cinematic from "@/classes/Cinematic";
import DisplayObject from "@/classes/DisplayObject";

async function main (canvas: HTMLCanvasElement) {
    const debug: boolean = false
    const scale: number = 3
    const spritesWidthHeight: number = 14;

    const [image, atlas] = await Promise.all([
        loadImage('/src/sets/spritesheet.png'),
        loadJSON('/src/sets/atlas.json')
    ])

    const pacman = new Cinematic({
        image,
        x: atlas.position.pacman.x * scale,
        y: atlas.position.pacman.y * scale,
        width: spritesWidthHeight * scale,
        height: spritesWidthHeight * scale,
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
                width: spritesWidthHeight * scale,
                height: spritesWidthHeight * scale,
                frame: null,
                debug,
            })

            const ghostNextDirection = atlas.position[color].direction;

            ghost.start(ghostNextDirection)
            ghost.nextDirection = ghostNextDirection

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

        changeDirection(pacman)
        // ghosts.forEach(changeDirection)

        const collidedWall = getWallCollision(pacman.getNextPosition());
        if(collidedWall){
            console.log(collidedWall)
            pacman.speedX = 0
            pacman.speedY = 0
            pacman.start(`wait${pacman.animation.name}`)
        }
    }
    game.width = maze.width
    game.height = maze.height
    game.stage.add(maze, pacman, ...foods, ...ghosts, ...walls)

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case "ArrowLeft":
                pacman.nextDirection = 'left'
                break
            case "ArrowRight":
                pacman.nextDirection = 'right'
                break
            case "ArrowUp":
                pacman.nextDirection = 'up'
                break
            case "ArrowDown":
                pacman.nextDirection = 'down'
                break
        }
    })


    function getWallCollision (obj: DisplayObject) {
        for (const wall of walls) {
            if(wall.hasCollision(obj)){
                return wall
            }
        }
        return null;
    }

    function changeDirection(obj: Cinematic) {
        if(obj.nextDirection === 'up') {
            obj.y -=10
            if(!getWallCollision(obj)){
                obj.start('up')
                obj.speedX = 0;
                obj.speedY = -1;
            }
            obj.y += 10
        }
        if(obj.nextDirection === 'right') {
            pacman.x += 10
            if(!getWallCollision(obj)){
                obj.start("right")
                obj.speedX = 1
                obj.speedY = 0
            }
            pacman.x -= 10
        }
        if(obj.nextDirection === 'down') {
            obj.y +=10
            if(!getWallCollision(pacman)){
                obj.start('down')
                obj.speedX = 0
                obj.speedY = 1
            }
            obj.y -= 10
        }
        if(obj.nextDirection === 'left') {
            obj.x -=10
            if(!getWallCollision(obj)){
                obj.start('left')
                obj.speedX = -1
                obj.speedY = 0
            }
            obj.x += 10
        }
    }
}

export default main;