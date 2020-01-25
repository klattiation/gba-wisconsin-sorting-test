import { GameObjects, Scene, Tweens } from "phaser"
import { ATLAS } from "../../constants"
import { ResolvedCriteriaAssignment } from "../../state/game/game.props"
import Tooltip from "../tooltip"
import { stopTween } from "../../utils"

const { Sprite, Zone } = GameObjects

interface AvatarProps {
  avatarId: string
  data: ResolvedCriteriaAssignment
  scene: Scene
  x: number
  y: number
}

class Avatar extends GameObjects.Container {
  private sprite: GameObjects.Sprite
  private tooltip: Tooltip
  private zone: GameObjects.Zone
  private tween: Tweens.Tween | undefined

  constructor(private props: AvatarProps) {
    super(props.scene, props.x, props.y)

    const { data, scene, avatarId } = props
    this.setData(data)

    this.sprite = new Sprite(scene, 0, 0, ATLAS.AVATARS, regularFrame(avatarId))
    this.sprite.setInteractive()
    this.sprite.setScale(0.9)
    this.add(this.sprite)

    this.tooltip = new Tooltip({ data, scene, x: 0, y: -625 })
    this.tooltip.setVisible(false)
    this.add(this.tooltip)

    const bounds = this.sprite.getBounds()

    this.zone = new Zone(scene, 0, 0, bounds.width, bounds.height)
    this.zone.setOrigin(this.sprite.originX, this.sprite.originY)
    this.zone.setRectangleDropZone(bounds.width, bounds.height)
    this.add(this.zone)
  }

  animateDragOver() {
    this.sprite.setFrame(hoverFrame(this.props.avatarId))
    this.tooltip.highlight(true)
  }

  animateDragOut() {
    this.sprite.setFrame(regularFrame(this.props.avatarId))
    this.tooltip.highlight(false)
  }

  showTooltip(delay = 0) {
    this.tooltip.show(delay)
  }

  show(delay = 0) {
    stopTween(this.tween)
    this.setAlpha(0)
    this.setScale(0.5)
    this.setVisible(true)
    return new Promise(resolve => {
      this.tween = this.scene.tweens.add({
        targets: this,
        props: {
          alpha: 1,
          scale: 1,
        },
        delay,
        duration: 300,
        ease: "Back.easeOut",
        onComplete: resolve,
      })
    })
  }
}

const regularFrame = (id: string) => `${id}/00.png`
const hoverFrame = (id: string) => `${id}/01.png`

export default Avatar
