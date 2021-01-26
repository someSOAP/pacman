import Group from "@/classes/Group";

interface GameProps {
    width: number,
    height: number,
    background: string,
    update?: () => void,
}

class Game implements GameProps {
    private pTimestamp: number = 0;
    private canvas: HTMLCanvasElement
    private readonly context: CanvasRenderingContext2D

    private _width: number
    private _height: number

    background: string
    stage: Group = new Group()
    update: () => void

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
        this.context.clearRect(0, 0, this._width, this._height)
    }

    drawBackground() {
        const { context } = this
        context.beginPath()
        context.rect(0, 0, this.width, this.height)
        context.fillStyle = this.background
        context.fill()
    }

    render (timestamp) {
        requestAnimationFrame(timestamp => this.render(timestamp))
        const deltaTime = timestamp - this.pTimestamp
        this.pTimestamp = timestamp

        this.update();
        this.stage.update(deltaTime)

        this.clearCanvas()
        this.drawBackground()

        this.stage.draw(this.context)
    }


    get width(): number {
        return this._width
    }

    set width(value: number) {
        this._width = value;
        this.canvas.width = value;
    }

    get height(): number {
        return this._height
    }

    set height(value: number) {
        this._height = value;
        this.canvas.height = value
    }


}

export default Game