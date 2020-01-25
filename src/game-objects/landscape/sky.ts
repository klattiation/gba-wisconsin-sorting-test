import { GameObjects, Scene } from "phaser"
import { ATLAS, GAME_CENTER, GAME_WIDTH, GAME_HEIGHT } from "../../constants"

interface SkyProps {
  scene: Scene
}

const assetFrame = "sky.png"

class Sky extends GameObjects.Container {
  constructor(props: SkyProps) {
    super(props.scene)

    const { scene } = props
    this.setScrollFactor(0)

    this.add(
      new GameObjects.TileSprite(
        scene,
        GAME_CENTER.x,
        GAME_CENTER.y,
        GAME_WIDTH,
        GAME_HEIGHT,
        ATLAS.LEVEL,
        assetFrame
      )
    )
  }
}

export default Sky
