import { Scene, GameObjects } from "phaser"
import {
  COLOR,
  SCENE,
  GAME_CENTER,
  GAME_HEIGHT,
  GAME_WIDTH,
  EVENTS,
} from "../constants"
import ScoreDisplay from "../game-objects/score-display"
import LineChart from "../game-objects/chart/line-chart"
import { SectionName } from "./main-scene"
import { FONT } from "../constants"
import Button from "../game-objects/controls/button"
import { InstructionController } from "../controllers/instruction-ctrl"

const PADDING = 16
const HUD_X = 0
const HUD_Y = GAME_HEIGHT - 200
const HUD_XP = HUD_X + PADDING
const HUD_YP = HUD_Y + PADDING

class HUDScene extends Scene {
  private instructionCtrl: InstructionController
  private score: ScoreDisplay | undefined
  private instructionLabel: GameObjects.Text | undefined
  private instructionBtn: Button | undefined
  private chart: LineChart | undefined

  constructor() {
    super({ key: SCENE.HUD, active: true })
    this.instructionCtrl = new InstructionController(this)
  }

  preload() {}

  create() {
    const height = 200
    const colorBg = Phaser.Display.Color.HexStringToColor(COLOR.DARK_BLUE)
    this.add.rectangle(
      GAME_CENTER.x,
      GAME_HEIGHT - height / 2,
      GAME_WIDTH,
      height,
      colorBg.color
    )

    this.score = new ScoreDisplay({
      x: GAME_WIDTH - 16,
      y: GAME_HEIGHT - 16,
      scene: this,
    })
    this.score.setOrigin(1, 1)
    this.score.setAlpha(0)
    this.add.existing(this.score)

    this.instructionLabel = this.add.text(
      HUD_XP,
      HUD_YP,
      this.instruction.text,
      instructionFont
    )
    this.instructionLabel.setVisible(false)
    this.instructionLabel.setWordWrapWidth(1000)

    this.instructionBtn = new Button({
      scene: this,
      text: this.instruction.buttonText,
      x: 0,
      y: HUD_YP + 140,
      onClick: this.handleButtonClick,
    })
    this.positionButton()
    this.instructionBtn.setVisible(false)
    this.add.existing(this.instructionBtn)

    this.chart = new LineChart({
      scene: this,
      x: GAME_WIDTH - 416,
      y: HUD_YP + 16,
      width: 400,
      height: 200 - 120,
    })
    this.add.existing(this.chart)

    this.on(EVENTS.SHOW_SECTION, this.handleSceneChange)
    this.on(EVENTS.EXPLAIN_SCORE, this.handleExplainScore)
  }

  private on(eventName: string, fn: Function, ctx?: any) {
    this.scene.get(SCENE.MAIN).events.on(eventName, fn, ctx)
    this.scene.get(SCENE.HUD).events.on(eventName, fn, ctx)
  }

  private get instruction() {
    return this.instructionCtrl.instruction
  }

  private handleButtonClick = (btn: Button) => {
    const { text, buttonText } = this.instructionCtrl.next()
    this.instructionLabel?.setText(text)

    if (buttonText) {
      btn.setVisible(true)
      btn.setText(buttonText)
      this.positionButton()
    } else {
      btn.setVisible(false)
    }
  }

  private positionButton() {
    this.instructionBtn?.setX(HUD_XP + this.instructionBtn.getWidth() / 2 + 16)
  }

  private handleSceneChange = (section: SectionName) => {
    if (section === SectionName.GAME) {
      this.instructionBtn?.setVisible(true)
      this.instructionLabel?.setVisible(true)
    }
    if (section === SectionName.RESULT) {
      this.instructionLabel?.setVisible(false)
      this.score?.fadeOut()
      this.chart?.setVisible(false)
    }
  }

  private handleExplainScore = () => {
    this.score?.fadeIn()
  }
}

const instructionFont = {
  color: COLOR.WHITE,
  fontFamily: FONT.SNIGLET,
  fontSize: "24px",
}

export default HUDScene
