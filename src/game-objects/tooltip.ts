import { GameObjects, Scene } from "phaser"
import { ResolvedCriteriaAssignment } from "../state/game/game.props"
import { getCriteriaOrder } from "../state/game/game.selectors"
import CriteriaItem from "./criteria-item"
import { COLOR } from "../constants"
import { getGameManager, stopTween } from "../utils"

interface TooltipProps {
  scene: Scene
  data: ResolvedCriteriaAssignment
  x: number
  y: number
}

const ALPHA_OUT = 0.8
const SCALE_IN = 1.1

class Tooltip extends GameObjects.Container {
  private criteriaItems: Map<string, CriteriaItem> = new Map()
  private props: TooltipProps
  private tween: Phaser.Tweens.Tween | undefined

  constructor(props: TooltipProps) {
    super(props.scene, props.x, props.y)
    this.props = props
    this.createBg()
    this.createItems(props.data)
    this.orderItems()
  }

  highlight(flag: boolean) {
    stopTween(this.tween)

    const active = {
      targets: this,
      props: {
        scale: { value: SCALE_IN },
        y: { value: this.props.y - 20 },
      },
      duration: 300,
      ease: "Back.easeOut",
    }
    const inactive = {
      targets: this,
      props: {
        scale: { value: 1 },
        y: { value: this.props.y },
      },
      duration: 100,
      ease: "Sine.easeOut",
    }

    this.tween = this.scene.tweens.add(flag ? active : inactive)
  }

  show(delay = 0) {
    stopTween(this.tween)
    this.setVisible(true)
    this.setAlpha(0)
    this.setY(this.props.y + 50)
    return new Promise(resolve => {
      this.tween = this.scene.tweens.add({
        targets: this,
        props: {
          alpha: 1,
          y: this.props.y,
        },
        delay,
        duration: 300,
        ease: "Back.easeOut",
        onComplete: resolve,
      })
    })
  }

  private createBg() {
    const height = 230
    const width = 200

    const rect = new GameObjects.Graphics(this.scene)
    rect.fillStyle(0xffffff)
    rect.fillRoundedRect(-width / 2, -15, width, height, 32)
    rect.setAlpha(ALPHA_OUT)
    this.add(rect)

    const triangle = new GameObjects.Triangle(
      this.scene,
      0,
      height - 10,
      0,
      0,
      20,
      0,
      10,
      10,
      0xffffff
    )
    triangle.setAlpha(ALPHA_OUT)
    this.add(triangle)
  }

  private createItems(data: ResolvedCriteriaAssignment) {
    this.order.forEach((criterion, idx) =>
      this.criteriaItems.set(
        criterion,
        new CriteriaItem({
          scene: this.scene,
          label: data[criterion].label,
          criterion,
          x: -75,
          y: 20 + idx * 40,
          color: COLOR.PETROL,
        })
      )
    )
    this.criteriaItems.forEach(item => this.add(item))
  }

  private orderItems() {
    this.order.forEach((criterion, idx) => {
      this.criteriaItems.get(criterion)?.setY(20 + idx * 40)
    })
  }

  private get order() {
    const { state } = getGameManager(this.scene)
    const order = getCriteriaOrder(state)
    return order || []
  }
}

export default Tooltip
