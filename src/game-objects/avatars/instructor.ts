import { GameObjects, Scene, Tweens } from "phaser"
import { ATLAS } from "../../constants"
import SpeechBubble from "../speech-bubble"
import { stopTween } from "../../utils"

const { Sprite } = GameObjects

interface InstructorProps {
  scene: Scene
  x: number
  y: number
}

class Instructor extends GameObjects.Container {
  private sprite: GameObjects.Sprite
  private bubble: SpeechBubble
  private bubbleTween: Tweens.Tween | undefined

  constructor(props: InstructorProps) {
    super(props.scene, props.x, props.y)

    const { scene } = props

    this.sprite = new Sprite(scene, 0, 0, ATLAS.AVATARS, regularFrame())
    this.sprite.setInteractive()
    this.sprite.setScale(0.9)
    this.add(this.sprite)

    let dialogIdx = 0

    this.bubble = new SpeechBubble({
      scene,
      x: 500,
      y: -300,
      width: 800,
      height: 400,
    })
    this.bubble.on("prev", () => {
      dialogIdx = Math.max(0, dialogIdx - 1)
      this.bubble.enablePrevBtn(dialogIdx > 0)
      this.bubble.setText(dialogs[dialogIdx])
    })
    this.bubble.on("next", async () => {
      dialogIdx++
      const dialog = dialogs[dialogIdx]
      this.bubble.enablePrevBtn(dialogIdx > 0)
      if (dialog) {
        this.bubble.setText(dialog)
      } else {
        await this.showBubble(false)
        this.emit("done")
      }
    })
    this.bubble.setAlpha(0)
    this.bubble.setScale(0.5)
    this.bubble.setText(dialogs[dialogIdx])
    this.add(this.bubble)
  }

  showBubble(flag: boolean, duration = 300) {
    return new Promise(resolve => {
      stopTween(this.bubbleTween)
      const base = {
        targets: this.bubble,
        duration,
        completeDelay: 300,
        onComplete: resolve,
      }
      const inactive = {
        ...base,
        props: {
          scale: { value: 0.5 },
          alpha: { value: 0 },
        },
        ease: "Back.easeIn",
      }
      const active = {
        ...base,
        props: {
          scale: { value: 1 },
          alpha: { value: 1 },
        },
        ease: "Back.easeOut",
      }
      this.bubbleTween = this.scene.tweens.add(flag ? active : inactive)
    })
  }

  gotoPointingPose() {
    this.sprite.setFrame(pointingFrame())
  }
}

const avatarId = "instructor"
const regularFrame = () => `${avatarId}/00.png`
const pointingFrame = () => `${avatarId}/01.png`

const dialogs = [
  `Herzlichen Glückwunsch zu deiner neuen Stelle als Marketing Director!`,
  `  Ich freue mich, dich in unserem Team willkommen zu heißen. Ich hoffe, du bist voller neuer Ideen und Enthusiasmus und hast Lust, direkt loszulegen.`,
  `Wie du weißt, ist es das oberste Ziel unserer Agentur, die Produkte unserer Auftraggeber so erfolgreich wie möglich zu vermarkten.  Aktuell sind wir dabei, eine neue Marketingstrategie auszuprobieren und sind dabei auf deine Hilfe angewiesen.`,
  `Bist du bereit, gleich deine erste Aufgabe zu übernehmen?`,
]

export default Instructor
