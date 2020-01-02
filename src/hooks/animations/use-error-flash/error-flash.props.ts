interface ErrorFlashHookProps {
  canvasRef: React.MutableRefObject<any>
  color?: string
  duration?: number
}

export type ErrorFlashHook = (
  props: ErrorFlashHookProps
) => {
  play: () => void
}
