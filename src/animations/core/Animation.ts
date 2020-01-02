import { AnimationEventType, PhysicsEntity } from "./props"
import Vector2 from "./Vector2"

class Animation {
  entities: PhysicsEntity[] = []
  forces: Vector2[] = []

  private handlers = new Map<AnimationEventType, Set<() => void>>()
  private age = 0
  private time = -1
  private isRunning = false
  private raf = -1

  constructor(
    private ctx: CanvasRenderingContext2D,
    private duration: number = Infinity
  ) {
    this.step = this.step.bind(this)
  }

  on(type: AnimationEventType, handler: () => void) {
    const typeHandlers = this.handlers.get(type)
    typeHandlers?.add(handler)
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
    this.age += dt
    this.entities.forEach(entity => {
      entity.update(dt)
      this.forces.forEach(force => entity.applyForce(force))
    })
    if (this.age >= this.duration) {
      this.handlers
        .get(AnimationEventType.AnimationComplete)
        ?.forEach(handler => handler.call(this))
    }
  }

  private render() {
    const { ctx } = this
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.entities.forEach(entity => entity.render(ctx))
  }
}

export default Animation
