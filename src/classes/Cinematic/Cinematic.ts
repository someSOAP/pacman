import Sprite, {SpriteProps} from "@/classes/Sprite";

interface CinematicProps extends SpriteProps {
    animations: any
}

class Cinematic extends Sprite implements CinematicProps {
    animations: any
    animation: any = null
    cooldown: number = 0
    timer: number = 0
    frameNumber: number = 0
    frame: any

    constructor(props: CinematicProps) {
        super(props);
        this.animations = props.animations
    }

    start(name: string) {
        const animation = this.animations.find(anim => anim.name === name)

        if (animation && this.animation !== animation) {
            this.animation = animation
            this.cooldown = this.animation.duration / this.animations.length
            this.timer = 0
            this.frameNumber = 0
            this.frame = this.animation.frames[0]
        }
    }

    update(deltaTime: number) {
        this.timer += deltaTime

        if(this.timer >= this.cooldown) {
            this.frameNumber = (this.frameNumber + 1) % this.animation.frames.length
            this.frame = this.animation.frames[this.frameNumber]
            this.timer = 0
        }
    }

}

export default Cinematic