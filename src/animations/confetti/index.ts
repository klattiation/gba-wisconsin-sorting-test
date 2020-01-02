import { useState, useLayoutEffect } from "react"
import times from "lodash/times"
import Vector2 from "../core/Vector2"
import { randomRange } from "../utils/random"
import Particle from "../core/Particle"
import Animation from "../core/Animation"
import { UseConfettiHook } from "./confetti.props"
import { TWO_PI } from "../utils/constants"
import { AnimationEventType } from "../core/props"
import { isBrowser } from "../utils/misc"

const { AnimationComplete } = AnimationEventType

const useConfetti: UseConfettiHook = ({
  canvasRef,
  colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"],
  duration = 2000,
}) => {
  const [isSpawning, setIsSpawning] = useState(false)
  const [spawnPoint, setSpawnPoint] = useState(Vector2.Zero())
  const particleCount = 30

  useLayoutEffect(() => {
    if (!isSpawning || !canvasRef || !canvasRef.current || !isBrowser()) {
      return
    }

    const canvas: any = canvasRef.current
    const gravity = new Vector2(0, randomRange(1, 3))
    const animation = new Animation(canvas.getContext("2d"), duration)
    animation.forces.push(gravity)
    animation.entities = times(particleCount, idx =>
      makeRandomParticle(idx, colors, spawnPoint)
    )
    animation.on(AnimationComplete, () => animation.stop())
    animation.start()

    setIsSpawning(false)
  }, [canvasRef, colors, duration, isSpawning, spawnPoint])

  return {
    spawn: (spawnPoint: Vector2) => {
      setSpawnPoint(spawnPoint)
      setIsSpawning(true)
    },
  }
}

const makeRandomParticle = (
  idx: number,
  colors: string[],
  location: Vector2
) => {
  const particle = new Particle()
  particle.location = location.clone()
  particle.color = colors[idx % colors.length]
  particle.rotation = randomRange(0, TWO_PI)
  particle.size = new Vector2(randomRange(5, 30), randomRange(5, 30))
  particle.acceleration = new Vector2(
    randomRange(-30, 30),
    randomRange(-30, 30)
  )
  particle.velocity = particle.acceleration.clone().scale(0.2)
  particle.draw = function(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.rect(0, 0, this.size.x, this.size.y)
    ctx.fill()
  }
  return particle
}

export default useConfetti
