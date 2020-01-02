import Vector2 from "./Vector2"

export interface PhysicsEntity {
  update: (dt: number) => void
  render: (ctx: CanvasRenderingContext2D) => void
  applyForce: (force: Vector2) => void
}

export enum AnimationEventType {
  AnimationComplete = "onAnimationComplete",
}
