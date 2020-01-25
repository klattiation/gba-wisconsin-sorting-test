import { Scene, GameObjects } from "phaser"
import { ATLAS, COLOR } from "../constants"
import Product from "./product"
import CriteriaItem from "./criteria-item"
import { ResolvedCriteriaAssignment } from "../state/game/game.props"
import { getCriteriaOrder, getCurrentCard } from "../state/game/game.selectors"
import { GameEvent } from "../state/game-manager"
import { GlobalState } from "../state/create-store"
import { getGameManager } from "../utils"

const PRODUCT_POSITION = Object.freeze({ x: 0, y: -340 })

const { Sprite } = GameObjects

interface StandProps {
  scene: Scene
  x: number
  y: number
}

class Stand extends GameObjects.Container {
  private product: Product
  private criteriaItems: Map<string, CriteriaItem> = new Map()

  constructor(props: StandProps) {
    super(props.scene, props.x, props.y)

    const { scene } = props
    const stand = new Sprite(scene, 0, 0, ATLAS.LEVEL, "stand.png")
    stand.setScale(0.9)
    this.add(stand)

    const gameManager = getGameManager(scene)
    const card = getCurrentCard(gameManager.state)
    if (card) {
      this.createItems(card)
      this.orderItems()
    }

    this.product = new Product({ ...PRODUCT_POSITION, scene })
    this.product.setVisible(false)
    this.add(this.product)

    gameManager.on(GameEvent.STORE_UPDATE, this.handleStoreUpdate)
  }

  resetProductPosition() {
    const { x, y } = PRODUCT_POSITION
    this.product.setPosition(x, y)
  }

  activateDnd() {
    this.product.activateDnd()
    return this.product.pulse(true)
  }

  showProduct() {
    const showTween = this.product.show()
    this.criteriaItems.forEach(item => item.setVisible(true))
    const itemTweens = this.order.map((criterion, idx) => {
      const item = this.criteriaItems.get(criterion)
      return item ? item.fadeIn(idx * 64) : Promise.resolve()
    })
    return Promise.all([showTween, ...itemTweens])
  }

  private handleStoreUpdate = (state: GlobalState) => {
    const card = getCurrentCard(state)
    if (card) {
      this.updateItems(card)
      this.orderItems()
    }
  }

  private updateItems(data: ResolvedCriteriaAssignment) {
    this.order.forEach((criterion, idx) => {
      const item = this.criteriaItems.get(criterion)
      if (item) {
        item.fadeOut(idx * 64).then(() => {
          item.setCriterion(criterion)
          item.setLabel(data[criterion].label)
          item.fadeIn(400)
        })
      }
    })
  }

  private createItems(data: ResolvedCriteriaAssignment) {
    this.order.forEach(criterion => {
      const item = new CriteriaItem({
        scene: this.scene,
        label: data[criterion].label,
        criterion,
        x: -100,
        y: 0,
        color: COLOR.WHITE,
      })
      item.setVisible(false)
      this.criteriaItems.set(criterion, item)
    })
    this.criteriaItems.forEach(item => this.add(item))
  }

  private orderItems() {
    this.order.forEach((criterion, idx) => {
      this.criteriaItems.get(criterion)?.setY(-215 + idx * 40)
    })
  }

  private get order() {
    const { state } = getGameManager(this.scene)
    const order = getCriteriaOrder(state)
    return order || []
  }
}

export default Stand
