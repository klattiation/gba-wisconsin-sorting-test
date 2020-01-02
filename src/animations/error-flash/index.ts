import { useState, useLayoutEffect } from "react"
import Particle from "../core/Particle"
import Animation from "../core/Animation"
import { ErrorFlashHook } from "./error-flash.props"
import { scaleLinear } from "../utils/scales"
import { AnimationEventType } from "../core/props"
import { isBrowser } from "../utils/misc"

const { AnimationComplete } = AnimationEventType

const useErrorFlash: ErrorFlashHook = ({
  canvasRef,
  color = "#f00",
  duration = 300,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  useLayoutEffect(() => {
    if (!isPlaying || !canvasRef || !canvasRef.current || !isBrowser()) {
      return
    }

    const canvas: any = canvasRef.current

    const shape = new Particle()
    shape.color = color
    shape.size.x = canvas.width
    shape.size.y = canvas.height
    shape.postUpdate = function(dt) {
      const dtMs = dt * 1000
      const pct = Math.min((this.age * 1000) / (duration - 3 * dtMs), 1)
      this.alpha = Math.sin(scaleLinear(pct, 0, 1, 0, Math.PI)) * 0.3
    }
    shape.draw = function(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.rect(this.size.x / 2, this.size.y / 2, this.size.x, this.size.y)
      ctx.fill()
    }

    const animation = new Animation(canvas.getContext("2d"), duration)
    animation.entities.push(shape)
    animation.start()
    animation.on(AnimationComplete, () => animation.stop())

    setIsPlaying(false)
  }, [canvasRef, color, duration, isPlaying])

  return {
    play: () => {
      setIsPlaying(true)
    },
  }
}

export default useErrorFlash
