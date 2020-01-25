import { GameObjects, Scene } from "phaser"
import { FONT } from "../constants"

interface ScoreProps {
  scene: Scene
  x: number
  y: number
  score: number
}

const style = {
  fontFamily: FONT.BALOO,
  fontSize: "72px",
}

class CheerScore extends GameObjects.Text {
  public score: number
  constructor(props: ScoreProps) {
    super(props.scene, props.x, props.y, "", style)

    this.score = props.score
    const isCorrect = this.score >= 0

    const sign = isCorrect ? "+" : ""
    const value = props.score.toLocaleString()
    this.setText(`${sign}${value}`)
    this.setColor(isCorrect ? "#0A0" : "#A00")
    this.setOrigin(0.5)
    this.setScale(isCorrect ? 0.8 : 1)

    this.scene.tweens.add({
      targets: this,
      props: {
        alpha: { value: 0, duration: 250, delay: 500 },
        scale: { value: isCorrect ? 1.5 : 0.75, duration: 1500 },
        y: { value: isCorrect ? "-=300" : "+=100", duration: 1500 },
      },
      ease: "Sine.easeOut",
      onComplete: () => {
        this.destroy()
      },
    })
  }
}

export default CheerScore
