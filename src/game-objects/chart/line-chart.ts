import { Curves, GameObjects, Math, Scene } from "phaser"
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"
import { Game } from "../.."
import { getScoreHistory } from "../../state/game/game.selectors"
import { GameEvent } from "../../state/game-manager"
import { GlobalState } from "../../state/create-store"
import { getGameManager } from "../../utils"

interface LineChartProps {
  scene: Scene
  x: number
  y: number
  width: number
  height: number
}

class LineChart extends GameObjects.Container {
  constructor(private props: LineChartProps) {
    super(props.scene, props.x, props.y)

    getGameManager(props.scene).on(
      GameEvent.STORE_UPDATE,
      this.handleStoreUpdate
    )
  }

  private handleStoreUpdate = (state: GlobalState) => {
    const scores = getScoreHistory(state)
    this.renderScores(scores)
  }

  private renderScores(scores: number[]) {
    if (scores.length < 2) {
      return
    }

    const scaleX = scaleLinear()
      .domain([0, scores.length - 1])
      .range([0, this.props.width])

    const scaleY = scaleLinear()
      .domain(extent(scores) as number[])
      .range([this.props.height, 0])

    this.removeAll()

    const path = scores.reduce((curPath, score, idx, src) => {
      if (idx <= 0) {
        return curPath
      }
      const prevIdx = idx - 1
      const prevScore = src[prevIdx]
      const p0 = new Math.Vector2(scaleX(prevIdx), scaleY(prevScore))
      const p1 = new Math.Vector2(scaleX(idx), scaleY(score))
      const line = new Curves.Line(p0, p1)
      curPath.add(line)
      return curPath
    }, new Curves.Path())

    const gfx = new GameObjects.Graphics(this.scene)
    gfx.clear()
    gfx.lineStyle(2, 0xffffff, 1)
    this.add(gfx)

    path.draw(gfx)
  }
}

export default LineChart
