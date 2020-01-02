import noop from "lodash/noop"
import Vector2 from "./Vector2"
import { PhysicsEntity } from "./props"

class Particle implements PhysicsEntity {
  alpha = 1
  color = "#f00"
  mass = 1
  size = new Vector2(10, 30)
  rotation = 0
  location: Vector2 = Vector2.Zero()
  velocity: Vector2 = Vector2.Zero()
  acceleration: Vector2 = Vector2.Zero()
  preUpdate: (dt: number) => void = noop
  draw: (ctx: CanvasRenderingContext2D) => void = noop
  postUpdate: (dt: number) => void = noop

  age = 0

  update(dt: number) {
    this.preUpdate.call(this, dt)
    const timedAcc = Vector2.Scale(this.acceleration, dt)
    this.velocity.add(timedAcc)
    this.location.add(this.velocity)
    this.age += dt
    this.postUpdate.call(this, dt)
  }

  applyForce(force: Vector2) {
    this.acceleration.add(force.clone().scale(this.mass))
  }

  render(ctx: CanvasRenderingContext2D) {
    const { x, y } = this.location
    const width = this.size.x
    const height = this.size.y
    const pivotX = x - width / 2
    const pivotY = y - height / 2

    ctx.save()
    ctx.translate(pivotX, pivotY)
    ctx.rotate(this.rotation)
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.alpha
    this.draw.call(this, ctx)
    ctx.translate(-pivotX, -pivotY)
    ctx.restore()
  }
}

export default Particle
