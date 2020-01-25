import { GameObjects, Scene } from "phaser"
import { ATLAS, GAME_CENTER, GAME_WIDTH, GAME_HEIGHT } from "../../constants"

interface FloorProps {
  scene: Scene
}

const assetFrame = "floor.png"

class Floor extends GameObjects.Container {
  constructor(props: FloorProps) {
    super(props.scene)

    const { scene } = props
    this.setScrollFactor(0)

    this.add(
      new GameObjects.TileSprite(
        scene,
        GAME_CENTER.x,
        632,
        GAME_WIDTH,
        136,
        ATLAS.LEVEL,
        assetFrame
      )
    )
  }
}

export default Floor
