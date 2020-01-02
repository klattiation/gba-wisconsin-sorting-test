import Vector2 from "../core/Vector2"

interface UseConfettiProps {
  canvasRef: React.MutableRefObject<any>
  colors?: string[]
  duration?: number
}
export type UseConfettiHook = (
  props: UseConfettiProps
) => {
  spawn: (spawnPoint: Vector2) => void
}
