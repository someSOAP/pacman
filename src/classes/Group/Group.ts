import DisplayObject from "@/classes/DisplayObject";
import Sprite from "@/classes/Sprite";

class Group extends DisplayObject {
    private container: Set<Sprite> = new Set

    constructor() {
        super({visible: true, height: 0, width: 0, x: 0, y: 0});
    }

    get items(): Sprite[] {
        return Array.from(this.container)
    }

    add(...dos: Sprite[]) {
        for (const displayObject of dos) {
            this.container.add(displayObject)
        }
    }

    remove(...dos) {
        for (const displayObject of dos) {
            this.container.delete(displayObject)
        }
    }

    update(deltaTime: number) {
        this.items.forEach(item => item.update(deltaTime))
    }

    draw(context: CanvasRenderingContext2D) {
        this.items.forEach(item => item.draw(context))
    }

}

export default Group