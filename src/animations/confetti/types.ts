import Vector2 from "../utils/Vector2"

export interface PhysicsEntity {
  update: (dt: number) => void
  render: (ctx: CanvasRenderingContext2D) => void
  applyForce: (force: Vector2) => void
}

interface UseConfettiProps {}
export type UseConfettiHook = () => {
  canvasRef: React.MutableRefObject<any>
  spawn: (spawnPoint: Vector2) => void
}
