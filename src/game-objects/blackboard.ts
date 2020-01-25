import { GameObjects, Scene } from "phaser"
import { ATLAS, FONT, COLOR } from "../constants"
import LineChart from "./chart/line-chart"

interface BlackboardProps {
  scene: Scene
  x: number
  y: number
}

class Blackboard extends GameObjects.Container {
  private chart: LineChart
  private labelBudgetScore: GameObjects.Text
  private labelProfit: GameObjects.Text
  private labelProfitScore: GameObjects.Text

  constructor(props: BlackboardProps) {
    super(props.scene, props.x, props.y)

    const { scene } = props
    this.add(createBg(scene))
    this.add(createTitle(scene))
    this.add(createLabelBudget(scene))

    this.chart = createChart(scene)
    this.add(this.chart)

    this.labelProfit = createLabelProfit(scene)
    this.add(this.labelProfit)

    this.labelBudgetScore = createLabelBudgetScore(scene)
    this.add(this.labelBudgetScore)
    this.setBudget(0, 0)

    this.labelProfitScore = createLabelProfitScore(scene)
    this.add(this.labelProfitScore)
    this.setProfit(0, 0)
  }

  setBudget(score: number, duration = 1000, delay = 0) {
    const from = 0
    const to = score
    const tweenTarget = { score: from }
    return new Promise(resolve => {
      this.scene.tweens.add({
        targets: tweenTarget,
        props: { score: to },
        duration,
        delay,
        onUpdate: () => {
          const score = Math.round(tweenTarget.score)
          const text = `${score.toLocaleString()} €`
          this.labelBudgetScore.setText(text)
        },
        onComplete: resolve,
      })
    })
  }

  setProfit(score: number, duration = 1000, delay = 0) {
    const from = 0
    const to = score
    const sign = to > 0 ? "+" : ""
    const tweenTarget = { score: from }
    this.labelProfit.setText(to >= 0 ? "Gewinn" : "Verlust")
    return new Promise(resolve => {
      this.scene.tweens.add({
        targets: tweenTarget,
        props: { score: to },
        duration,
        delay,
        onUpdate: () => {
          const score = Math.round(tweenTarget.score)
          const text = `${sign}${score.toLocaleString()} €`
          this.labelProfitScore.setText(text)
        },
        onComplete: resolve,
      })
    })
  }
}

const createBg = (scene: Scene) =>
  new GameObjects.Image(scene, 0, 0, ATLAS.LEVEL, "blackboard.png")

const createTitle = (scene: Scene) => {
  const title = new GameObjects.Text(
    scene,
    0,
    -470,
    "Vielen Dank für's Mitmachen!",
    fontStyleTitle
  )
  title.setOrigin(0.5, 0)
  return title
}

const createChart = (scene: Scene) =>
  new LineChart({
    scene,
    x: -180,
    y: -410,
    width: 360,
    height: 138,
  })

const createLabelBudget = (scene: Scene) => {
  const l = new GameObjects.Text(scene, -180, -185, "Budget", fontStyleLabel)
  l.setOrigin(0, 1)
  return l
}

const createLabelBudgetScore = (scene: Scene) => {
  const l = new GameObjects.Text(scene, 180, -178, "0 €", fontStyleScore)
  l.setOrigin(1, 1)
  return l
}

const createLabelProfit = (scene: Scene) => {
  const l = new GameObjects.Text(scene, -180, -135, "Gewinn", fontStyleLabel)
  l.setOrigin(0, 1)
  return l
}

const createLabelProfitScore = (scene: Scene) => {
  const l = new GameObjects.Text(scene, 180, -128, "0 €", fontStyleScore)
  l.setOrigin(1, 1)
  return l
}

const fontStyleBase = {
  color: COLOR.WHITE,
  fontFamily: FONT.SNIGLET,
}

const fontStyleTitle = { ...fontStyleBase, fontSize: "30px" }
const fontStyleLabel = { ...fontStyleBase, fontSize: "24px" }
const fontStyleScore = { ...fontStyleBase, fontSize: "48px" }

export default Blackboard
