import DisplayObject, { DisplayObjectProps } from "@/classes/DisplayObject";

interface SpriteProps extends DisplayObjectProps {
    image: HTMLImageElement,
    frame: any,
    context: CanvasRenderingContext2D
}

class Sprite extends DisplayObject implements SpriteProps {

    image: HTMLImageElement
    frame: any
    context: CanvasRenderingContext2D

    constructor(props: SpriteProps) {
        super(props);

        this.image = props.image ?? null
        this.frame = props.frame ?? null
        this.context = props.context
    }

    draw() {
        const { x, y, width, height } = this;
        this.context.drawImage(
            this.image,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            x,
            y,
            width,
            height
        )

    }
}

export default Sprite