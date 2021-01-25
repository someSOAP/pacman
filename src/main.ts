import Game from "@/classes/Game";
import { loadImage, loadJSON } from "@/utils/loader";
import Sprite from "@/classes/Sprite";

async function main (canvas: HTMLCanvasElement) {

    const context = canvas.getContext('2d')
    const game = new Game(
        canvas,
        {
            background: 'black',
            height: 500,
            width: 500
        });
    console.log(game)

    try {
        const [image, atlas] = await Promise.all([
            loadImage('/src/sets/spritesheet.png'),
            loadJSON('/src/sets/atlas.json')
        ])

        const maze = new Sprite({
            context,
            image,
            x: 0,
            y: 0,
            width: 224,
            height: 255,
            frame: {
                x: 0,
                y: 0,
                width: 224,
                height: 255,
            },
            visible: true
        })

        game.stage.add(maze)
    } catch (err) {
        console.error(err)
    }


}

export default main;