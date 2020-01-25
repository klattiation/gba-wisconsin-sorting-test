import { GameObjects, Scene } from "phaser"
import { FONT, COLOR } from "../constants"
import Button, { BUTTON_EVENT } from "./controls/button"

interface SpeechBubbleProps {
  scene: Scene
  x: number
  y: number
  width?: number
  height?: number
}

const BG_ALPHA = 0.8
const FONT_STYLE = {
  fontFamily: FONT.SNIGLET,
  fontSize: "32px",
  color: COLOR.PETROL,
}

class SpeechBubble extends GameObjects.Container {
  private textField: GameObjects.Text
  private btnNext: Button
  private btnPrev: Button

  constructor(props: SpeechBubbleProps) {
    super(props.scene, props.x, props.y)

    const { height = 230, width = 500 } = props
    this.createBg(width, height)
    this.createTriangle(width, height)
    this.textField = this.createTextField(props.scene, width, height, 32)

    const btnY = height / 2 - 50
    this.btnPrev = this.createButtonPrev(btnY)
    this.btnNext = this.createButtonNext(btnY)
    this.enablePrevBtn(false)

    this.add(this.btnPrev)
    this.add(this.btnNext)
  }

  setText(text: string) {
    this.textField.setText(text)
  }

  enablePrevBtn(flag: boolean) {
    this.btnPrev.enable(flag)
  }

  private createTextField(
    scene: Scene,
    width: number,
    height: number,
    padding: number
  ) {
    const textField = new GameObjects.Text(scene, 0, 0, "", FONT_STYLE)
    textField.x = padding - width / 2
    textField.y = padding - height / 2
    textField.setWordWrapWidth(width - 2 * padding)
    this.add(textField)
    return textField
  }

  private createBg(width: number, height: number) {
    const rect = new GameObjects.Graphics(this.scene)
    rect.fillStyle(0xffffff)
    rect.fillRoundedRect(-width / 2, -height / 2, width, height, 32)
    rect.setAlpha(BG_ALPHA)
    this.add(rect)
  }

  private createTriangle(width: number, height: number, size = 40) {
    const triangle = new GameObjects.Triangle(
      this.scene,
      -width / 2 - size / 4,
      -size / 2,
      0,
      0,
      size,
      0,
      size / 2,
      size / 2,
      0xffffff
    )
    triangle.setRotation(Math.PI / 2)
    triangle.setAlpha(BG_ALPHA)
    this.add(triangle)
  }

  private createButtonNext(y: number) {
    return new Button({
      scene: this.scene,
      text: "Weiter",
      x: 60,
      y,
      onClick: () => {
        this.emit("next")
      },
    })
  }

  private createButtonPrev(y: number) {
    return new Button({
      scene: this.scene,
      text: "Zurück",
      x: -60,
      y,
      onClick: () => {
        this.emit("prev")
      },
    })
  }
}

export default SpeechBubble
