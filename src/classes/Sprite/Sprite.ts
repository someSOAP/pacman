import DisplayObject, { DisplayObjectProps } from "@/classes/DisplayObject";

export interface SpriteProps extends DisplayObjectProps {
    image: HTMLImageElement,
    frame: any,
    debug?: boolean
}

class Sprite extends DisplayObject implements SpriteProps {

    debug: boolean
    image: HTMLImageElement
    frame: any


    constructor(props: SpriteProps) {
        super(props);

        this.image = props.image ?? null
        this.frame = props.frame ?? null
        this.debug = props.debug ?? false
    }

    draw(context) {
        const { x, y, width, height, debug } = this;
        context.drawImage(
            this.image,
            this.frame?.x ?? 0,
            this.frame?.y ?? 0,
            this.frame?.width ?? 16,
            this.frame?.height ?? 16,
            x,
            y,
            width,
            height
        )

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

export default Sprite