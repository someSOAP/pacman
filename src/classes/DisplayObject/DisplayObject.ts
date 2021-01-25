export interface DisplayObjectProps {
    visible: boolean,
    x: number,
    y: number,
    width: number,
    height: number
}

class DisplayObject implements DisplayObjectProps {

    visible: boolean
    x: number
    y: number
    width: number
    height: number

    constructor(props: DisplayObjectProps) {
        this.visible = props.visible ?? true
        this.x = props.x ?? 0
        this.y = props.y ?? 0

        this.width = props.width ?? 0
        this.height = props.height ?? 0
    }

    update(deltaTime: number) {

    }

}

export default DisplayObject