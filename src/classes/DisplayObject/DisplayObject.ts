export interface DisplayObjectProps {
    visible: boolean,
    x: number,
    y: number,
    width: number,
    height: number,
    debug?: boolean
}

class DisplayObject implements DisplayObjectProps {

    visible: boolean
    x: number
    y: number
    width: number
    height: number
    debug: boolean

    constructor(props: DisplayObjectProps) {
        this.visible = props.visible ?? true
        this.x = props.x ?? 0
        this.y = props.y ?? 0

        this.width = props.width ?? 0
        this.height = props.height ?? 0
        this.debug = props.debug ?? false
    }

    update(deltaTime: number) {

    }

    hasCollision(obj: DisplayObject) {
        const aPoints = [
            { x: this.x, y: this.y },
            { x: this.x + this.width, y: this.y },
            { x: this.x, y: this.y + this.height },
            { x: this.x + this.width, y: this.y + this.height },
        ]

        for (const {x, y} of aPoints) {
            if(obj.x < x && x< obj.x + obj.width && obj.y < y && y < obj.y + obj.height){
                return true
            }
        }

        const bPoints = [
            { x: obj.x, y: obj.y },
            { x: obj.x + obj.width, y: obj.y },
            { x: obj.x, y: obj.y + obj.height },
            { x: obj.x + obj.width, y: obj.y + obj.height },
        ]

        for (const {x, y} of bPoints) {
            if(this.x < x && x < this.x + this.width && this.y < y && y < this.y + this.height){
                return true
            }
        }

        return false
    }

    draw(context: CanvasRenderingContext2D) {
        const { x, y, width, height, debug } = this
        if(debug){
            context.beginPath()
            context.rect(x, y, width, height)
            context.fillStyle = 'rgba(0,0,0, 0.3)'
            context.fill()

            context.beginPath()
            context.rect(x, y, width, height)
            context.strokeStyle = 'red'
            context.lineWidth = 3
            context.stroke()

            context.beginPath()
            context.moveTo(x, y)
            context.lineTo(x + width, y + height)
            context.stroke()
        }
    }
}

export default DisplayObject