import { GameObjects, Scene } from "phaser"
import { ATLAS } from "../../constants"

interface SkyscrapersBackProps {
  scene: Scene
  scrollFactor: number
}

const assetFrame = "skyscraper-back.png"
const positions = [
  [300, 590],
  [600, 500],
  [850, 610],
  [1050, 590],
]

class SkyscrapersBack extends GameObjects.Container {
  constructor(props: SkyscrapersBackProps) {
    super(props.scene)

    const { scene } = props
    this.setScrollFactor(props.scrollFactor)

    positions.forEach(([x, y]) => {
      this.add(new GameObjects.Image(scene, x, y, ATLAS.LEVEL, assetFrame))
    })
  }
}

export default SkyscrapersBack
