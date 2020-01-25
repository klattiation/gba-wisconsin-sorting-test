import { GameObjects, Scene, Tweens } from "phaser"
import { ATLAS, FONT } from "../constants"
import { CriteriaName } from "../state/game/game.props"
import { stopTween } from "../utils"

interface TooltipProps {
  scene: Scene
  label: string
  criterion: CriteriaName
  x: number
  y: number
  color: string
}

const defaultFontStyle = {
  fontFamily: FONT.SNIGLET,
  fontSize: "18px",
  color: "#000",
}

const TWEEN_X = 20

class CriteriaItem extends GameObjects.Container {
  private label: GameObjects.Text
  private icon: GameObjects.Image
  private tween: Tweens.Tween | undefined
  private props: TooltipProps

  constructor(props: TooltipProps) {
    super(props.scene, props.x, props.y)
    this.props = props
    const { criterion, label, scene } = props
    const frame = getFrameName(criterion)

    const color = Phaser.Display.Color.HexStringToColor(props.color)

    this.icon = new GameObjects.Image(scene, 0, 0, ATLAS.UI, frame)
    this.icon.setTint(color.color)
    this.icon.setScale(0.5)
    this.add(this.icon)

    const fontStyle = { ...defaultFontStyle, color: props.color }
    this.label = new GameObjects.Text(scene, 25, -12, label, fontStyle)
    this.add(this.label)
  }

  setLabel(value: string) {
    this.label.setText(value)
  }

  setCriterion(value: CriteriaName) {
    this.icon.setFrame(getFrameName(value))
  }

  fadeIn(delay = 0) {
    stopTween(this.tween)
    this.setAlpha(0)
    this.setX(this.props.x - TWEEN_X)
    this.setVisible(true)
    return new Promise(resolve => {
      this.tween = this.scene.tweens.add({
        targets: this,
        props: {
          alpha: 1,
          x: this.props.x,
        },
        delay,
        duration: 300,
        ease: "Back.easeOut",
        onComplete: resolve,
      })
    })
  }

  fadeOut(delay = 0) {
    stopTween(this.tween)
    return new Promise(resolve => {
      this.tween = this.scene.tweens.add({
        targets: this,
        props: {
          alpha: 0,
          x: this.props.x - TWEEN_X,
        },
        delay,
        duration: 300,
        ease: "Sine.easeOut",
        onComplete: resolve,
      })
    })
  }
}

const getFrameName = (criterion: CriteriaName) =>
  `icon-criteria-${criterion}.png`

export default CriteriaItem
