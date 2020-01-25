import { GameObjects, Scene } from "phaser"
import { ATLAS } from "../../constants"

interface BushFrontProps {
  scene: Scene
  scrollFactor: number
}

const assetFrame = "bush-front.png"
const positions = [
  [-1600, 600],
  [200, 600],
  [1600, 600],
  [3200, 600],
]

class BushFront extends GameObjects.Container {
  constructor(props: BushFrontProps) {
    super(props.scene)

    const { scene } = props
    this.setScrollFactor(props.scrollFactor)

    positions.forEach(([x, y]) => {
      this.add(new GameObjects.Image(scene, x, y, ATLAS.LEVEL, assetFrame))
    })
  }
}

export default BushFront
