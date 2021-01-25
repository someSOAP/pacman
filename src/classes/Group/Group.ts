import DisplayObject from "@/classes/DisplayObject";

class Group extends DisplayObject {
    private container: Set<any> = new Set

    constructor() {
        super({visible: true, height: 0, width: 0, x: 0, y: 0});
    }

    get items() {
        return Array.from(this.container)
    }

    add(...dos) {
        for (const displayObject of dos) {
            this.container.add(displayObject)
        }
    }

    remove(...dos) {
        for (const displayObject of dos) {
            this.container.delete(displayObject)
        }
    }

    update() {

    }

    draw(context: CanvasRenderingContext2D) {
        this.items.forEach(item => item.draw(context))

    }

}

export default Group