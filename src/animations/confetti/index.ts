import { useState, useRef, useLayoutEffect } from "react"
import times from "lodash/times"
import Vector2 from "../utils/Vector2"
import { randomRange } from "../utils/random"
import Particle from "./Particle"
import Animation from "./Animation"
import { UseConfettiHook } from "./types"

const isBrowser = () => typeof window !== `undefined`

const useConfetti: UseConfettiHook = () => {
  const [isSpawning, setIsSpawning] = useState(false)
  const [spawnPoint, setSpawnPoint] = useState(Vector2.Zero())
  const canvasRef = useRef(null)
  const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"]
  const particleCount = 30

  useLayoutEffect(() => {
    if (!isSpawning || !canvasRef || !canvasRef.current || !isBrowser) {
      return
    }

    const canvas: any = canvasRef.current
    const animation = new Animation(canvas.getContext("2d"))
    animation.gravity.y = randomRange(1, 3)
    animation.entities = times(particleCount, idx =>
      makeRandomParticle(idx, colors, spawnPoint)
    )

    animation.start()

    setTimeout(() => animation.stop(), 2000)

    setIsSpawning(false)
  }, [colors, isSpawning, spawnPoint])

  return {
    canvasRef,
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
  particle.rotation = randomRange(0, Math.PI * 2)
  particle.mass = 1
  particle.size = new Vector2(randomRange(5, 30), randomRange(5, 30))
  particle.acceleration = new Vector2(
    randomRange(-30, 30),
    randomRange(-30, 30)
  )
  particle.velocity = particle.acceleration.clone().scale(0.2)
  return particle
}

export default useConfetti
