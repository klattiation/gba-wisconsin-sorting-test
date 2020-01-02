import Vector2 from "../utils/Vector2"
import { PhysicsEntity } from "./types"

class Particle implements PhysicsEntity {
  color = "#f00"
  mass = 1
  size = new Vector2(10, 30)
  rotation = 0
  location: Vector2 = Vector2.Zero()
  velocity: Vector2 = new Vector2(0, 0)
  acceleration: Vector2 = Vector2.Zero()

  update(dt: number) {
    const timedAcc = Vector2.Scale(this.acceleration, dt)
    this.velocity.add(timedAcc)
    this.location.add(this.velocity)
  }

  applyForce(force: Vector2) {
    this.acceleration.add(force.clone().scale(1 / this.mass))
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
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fill()
    ctx.translate(-pivotX, -pivotY)
    ctx.restore()
  }
}

export default Particle
