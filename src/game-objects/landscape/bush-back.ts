import { GameObjects, Scene } from "phaser"
import { ATLAS, GAME_CENTER, GAME_WIDTH } from "../../constants"

interface BushBackProps {
  scene: Scene
  scrollFactor: number
}

const assetFrame = "bush-back.png"

const positions = [
  [GAME_CENTER.x - GAME_WIDTH + 215, 640],
  [GAME_CENTER.x, 640],
  [GAME_CENTER.x + GAME_WIDTH - 250, 640],
]

class BushBack extends GameObjects.Container {
  constructor(props: BushBackProps) {
    super(props.scene)

    const { scene } = props
    this.setScrollFactor(props.scrollFactor)

    positions.forEach(([x, y]) =>
      this.add(new GameObjects.Image(scene, x, y, ATLAS.LEVEL, assetFrame))
    )
  }
}

export default BushBack
