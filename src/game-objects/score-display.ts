import { GameObjects, Scene, Tweens } from "phaser"
import { getScore } from "../state/game/game.selectors"
import { GameEvent } from "../state/game-manager"
import { FONT } from "../constants"
import { getGameManager, stopTween } from "../utils"

interface ScoreDisplayProps {
  scene: Scene
  x: number
  y: number
}

const style = {
  fontFamily: FONT.SNIGLET,
  fontSize: "48px",
}

class ScoreDisplay extends GameObjects.Text {
  score: number = 0
  private tween: Tweens.Tween | undefined

  constructor(props: ScoreDisplayProps) {
    super(props.scene, props.x, props.y, "", style)
    this.updateScore()
    this.setScale(0)
    this.setAlpha(0)

    getGameManager(props.scene).on(
      GameEvent.STORE_UPDATE,
      this.handleStoreUpdate
    )
  }

  fadeIn() {
    stopTween(this.tween)
    this.tween = this.scene.add.tween({
      targets: this,
      props: {
        alpha: 1,
        scale: 1,
      },
      duration: 300,
      ease: "Back.easeOut",
    })
  }

  fadeOut() {
    stopTween(this.tween)
    this.tween = this.scene.add.tween({
      targets: this,
      props: { alpha: 0 },
      duration: 300,
      ease: "Sine.easeOut",
    })
  }

  private handleStoreUpdate = () => {
    this.updateScore()
  }

  private updateScore = () => {
    const score = getScore(getGameManager(this.scene).state)
    this.animateScore(score)
  }

  private animateScore(score: number) {
    stopTween(this.tween)
    this.tween = this.scene.tweens.add({
      targets: this,
      props: { score },
      duration: 300,
      onUpdate: () => {
        this.setText(`${Math.round(this.score).toLocaleString()} €`)
      },
    })
  }
}

export default ScoreDisplay
