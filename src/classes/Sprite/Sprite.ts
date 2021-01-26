import DisplayObject, { DisplayObjectProps } from "@/classes/DisplayObject";

export type SpriteDirections = 'up' | 'right' | 'down' | 'left'


export interface SpriteProps extends DisplayObjectProps {
    image: HTMLImageElement,
    frame: any,
    speedX?: number,
    speedY?: number,
    nextDirection?: SpriteDirections
}

class Sprite extends DisplayObject implements SpriteProps {

    debug: boolean
    image: HTMLImageElement
    frame: any
    speedX: number
    speedY: number
    nextDirection?: SpriteDirections

    constructor(props: SpriteProps) {
        super(props);

        this.image = props.image ?? null
        this.frame = props.frame ?? null
        this.debug = props.debug ?? false
        this.speedX = props.speedX ?? 0
        this.speedY = props.speedY ?? 0
        this.nextDirection = props.nextDirection
    }

    update(deltaTime: number) {
        this.x += this.speedX
        this.y += this.speedY
    }

    getNextPosition(): DisplayObject {
        const { x, y, width, height, speedX, speedY, debug, visible } = this;
        return new DisplayObject({
            x: x + speedX,
            y: y + speedY,
            width: width,
            height: height,
            visible,
            debug,
        })
    }

    draw(context: CanvasRenderingContext2D) {
        if(this.frame){
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
        }
        super.draw(context)
    }
}

export default Sprite