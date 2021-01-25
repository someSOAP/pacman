import Group from "@/classes/Group";

interface GameProps {
    width: number,
    height: number,
    background: string,
}

class Game implements GameProps {
    width: number
    height: number
    background: string
    stage: Group = new Group()

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, props: GameProps) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')

        this.width = props.width ?? 50
        this.height = props.height ?? 50
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.background = props.background ?? "black"

        requestAnimationFrame( x => this.render(x))
    }

    clearCanvas () {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    drawBackground() {
        this.context.beginPath()
        this.context.rect(0, 0, this.width, this.height)
        this.context.fillStyle = this.background
        this.context.fill()

    }

    render (timestamp) {
        // console.log(timestamp)
        requestAnimationFrame(timestamp => this.render(timestamp))
        this.clearCanvas()
        this.drawBackground()

        this.stage.draw(this.context)
    }

}

export default Game