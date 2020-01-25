import { GameObjects, Scene } from "phaser"
import { ATLAS } from "../../constants"

interface SkyscrapersFrontProps {
  scene: Scene
  scrollFactor: number
}

const assetFrame = "skyscraper-front.png"
const positions = [
  [450, 470],
  [700, 440],
  [900, 520],
]

class SkyscrapersFront extends GameObjects.Container {
  constructor(props: SkyscrapersFrontProps) {
    super(props.scene)

    const { scene } = props
    this.setScrollFactor(props.scrollFactor)

    positions.forEach(([x, y]) => {
      this.add(new GameObjects.Image(scene, x, y, ATLAS.LEVEL, assetFrame))
    })
  }
}

export default SkyscrapersFront
