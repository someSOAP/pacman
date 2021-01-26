import DisplayObject, { DisplayObjectProps } from "@/classes/DisplayObject";

export interface SpriteProps extends DisplayObjectProps {
    image: HTMLImageElement,
    frame: any,
    speedX?: number,
    speedY?: number,
}

class Sprite extends DisplayObject implements SpriteProps {

    debug: boolean
    image: HTMLImageElement
    frame: any
    speedX: number
    speedY: number


    constructor(props: SpriteProps) {
        super(props);

        this.image = props.image ?? null
        this.frame = props.frame ?? null
        this.debug = props.debug ?? false
        this.speedX = props.speedX ?? 0
        this.speedY = props.speedY ?? 0
    }

    update(deltaTime: number) {
        this.x += this.speedX
        this.y += this.speedY
    }

    draw(context: CanvasRenderingContext2D) {
        const { x, y, width, height } = this;
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
        super.draw(context)
    }
}

export default Sprite