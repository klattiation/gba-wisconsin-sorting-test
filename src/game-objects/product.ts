import { GameObjects, Scene, Tweens } from "phaser"
import { ATLAS } from "../constants"
import { getCurrentCard } from "../state/game/game.selectors"
import { GameEvent } from "../state/game-manager"
import { ResolvedCard } from "../state/game/game.props"
import { getGameManager, stopTween } from "../utils"

interface ProductProps {
  scene: Scene
  x: number
  y: number
}

enum ProductDataKey {
  Card = "card",
}

const DEFAULT_SCALE = 1

class Product extends GameObjects.Sprite {
  private tween: Tweens.Tween | undefined

  constructor(props: ProductProps) {
    super(props.scene, props.x, props.y, ATLAS.PRODUCTS)

    const { scene } = props
    getGameManager(scene).on(GameEvent.STORE_UPDATE, this.handleStoreUpdate)

    this.setScale(DEFAULT_SCALE)
    this.updateProduct(false)
  }

  activateDnd() {
    this.setInteractive({ useHandCursor: true })
    this.scene.input.setDraggable(this)
    this.scene.input.on("dragstart", this.handleDragStart)
    this.scene.input.on("drag", this.handleDrag)
  }

  get cardData() {
    return this.getData(ProductDataKey.Card) as ResolvedCard
  }

  pulse(flag: boolean) {
    stopTween(this.tween)
    this.setVisible(true)
    this.setAlpha(1)
    this.setScale(DEFAULT_SCALE)
    if (flag) {
      this.tween = this.scene.tweens.add({
        targets: this,
        props: {
          scale: DEFAULT_SCALE * 0.95,
        },
        duration: 500,
        ease: "Sine.easeIn",
        yoyo: true,
        loop: -1,
      })
    }
  }

  show(delay = 0) {
    stopTween(this.tween)
    this.setAlpha(0)
    this.setScale(0)
    this.setVisible(true)
    return new Promise(resolve => {
      this.tween = this.scene.tweens.add({
        targets: this,
        props: {
          alpha: 1,
          scale: DEFAULT_SCALE,
        },
        delay,
        duration: 300,
        ease: "Back.easeOut",
        onComplete: resolve,
      })
    })
  }

  private handleStoreUpdate = () => {
    this.updateProduct(true)
  }

  private updateProduct(pulse: boolean) {
    const card = getCurrentCard(getGameManager(this.scene).state)
    this.setData(ProductDataKey.Card, card)
    this.updateImage(card, pulse)
  }

  private updateImage(card?: ResolvedCard, pulse?: boolean) {
    if (card) {
      this.setAlpha(0)
      this.setVisible(true)
      this.setFrame(card.image)
      this.show(300).then(() => pulse && this.pulse(true))
      return true
    } else {
      this.setVisible(false)
      return false
    }
  }

  private handleDragStart = (pointer: any, gameObject: GameObjects.Sprite) => {
    this.scene.children.bringToTop(gameObject)
    this.pulse(false)
  }

  private handleDrag = (
    pointer: any,
    gameObject: GameObjects.Sprite,
    dragX: number,
    dragY: number
  ) => {
    gameObject.x = dragX
    gameObject.y = dragY
  }
}

export default Product
