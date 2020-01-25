import { GameObjects, Scene } from "phaser"
import { ATLAS, GAME_CENTER } from "../constants"

interface ConfettiControllerProps {
  scene: Scene
}

const defaultConfig = {
  on: false,
  x: GAME_CENTER.x,
  y: GAME_CENTER.y,
  speedX: { min: -300, max: 300 },
  speedY: { min: -900, max: -300 },
  lifespan: 2000,
  gravityY: 2000,
  tint: [0xffff00, 0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0x00ffff],
  radial: true,
  angle: { max: 360, min: 0 },
  scaleX: 0.3,
  scaleY: 0.2,
  rotate: { start: 0, end: 360 },
}

/**
 * See more at
 * - https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/
 * - https://phaser.io/examples/v3/category/game-objects/particle-emitter
 */
class ConfettiController {
  private emitter1: GameObjects.Particles.ParticleEmitter
  private emitter2: GameObjects.Particles.ParticleEmitter

  constructor(props: ConfettiControllerProps) {
    const { scene } = props

    const particles = scene.add.particles(ATLAS.UI)

    this.emitter1 = particles.createEmitter({
      ...defaultConfig,
      frame: "particle-confetti.png",
      scaleX: 0.3,
      scaleY: 0.2,
    })
    this.emitter2 = particles.createEmitter({
      ...defaultConfig,
      frame: "particle-confetti.png",
      rotate: { start: 360, end: 180 },
      scaleX: 0.3,
      scaleY: 0.5,
    })
  }

  explode(count: number, x: number, y: number) {
    const n1 = Math.floor(count / 2)
    const n2 = count - n1
    this.emitter1.explode(n1, x, y)
    this.emitter2.explode(n2, x, y)
  }
}

export default ConfettiController
