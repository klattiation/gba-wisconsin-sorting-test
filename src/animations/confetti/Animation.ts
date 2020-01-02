import { PhysicsEntity } from "./types"
import Vector2 from "../utils/Vector2"

class Animation {
  entities: PhysicsEntity[] = []
  gravity = Vector2.Zero()

  private time = -1
  private isRunning = false
  private raf = -1

  constructor(private ctx: CanvasRenderingContext2D) {
    this.step = this.step.bind(this)
  }

  start() {
    this.time = Date.now()
    this.isRunning = true
    this.loop()
  }

  stop() {
    this.isRunning = false
    this.cancel()
  }

  size() {
    const { width, height } = this.ctx.canvas
    return new Vector2(width, height)
  }

  center() {
    return Vector2.Scale(this.size(), 0.5)
  }

  private loop() {
    this.raf = requestAnimationFrame(this.step)
  }

  private cancel() {
    cancelAnimationFrame(this.raf)
  }

  private step() {
    if (!this.isRunning) {
      return
    }
    const now = Date.now()
    this.update((now - this.time) / 1000)
    this.render()
    this.time = now
    this.loop()
  }

  private update(dt: number) {
    this.entities.forEach(entity => {
      entity.update(dt)
      entity.applyForce(this.gravity)
    })
  }

  private render() {
    const { ctx } = this
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.entities.forEach(entity => entity.render(ctx))
  }
}

export default Animation
