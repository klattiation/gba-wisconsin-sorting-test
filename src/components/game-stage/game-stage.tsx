import React, { FC, useRef } from "react"
import cn from "classnames"
import TargetAvatar from "../avatars/target"
import styles from "./game-stage.module.css"
import Blackboard from "../blackboard"
import { AUDIENCE } from "../../state/game/game.state"
import useConfetti from "../../hooks/animations/use-confetti"
import useErrorFlash from "../../hooks/animations/use-error-flash"
import Vector2 from "../../physics/Vector2"

interface GameStageProps {
  className: string
}
const canvasSize = new Vector2(1200, 900)

const GameStage: FC<GameStageProps> = ({ className }) => {
  const canvasRef = useRef(null)
  const { spawn } = useConfetti({ canvasRef })
  const { play } = useErrorFlash({ canvasRef })
  const audience = useAudience()

  const handleCorrectDrop = () => {
    spawn(new Vector2(canvasSize.x * (1 / 3), 50))
  }
  const handleWrongDrop = () => {
    play()
  }

  return (
    <div className={cn(styles.component, className)}>
      <div className={styles.targetAudience}>
        {audience.map((entry, idx) => (
          <TargetAvatar
            key={idx}
            idx={idx}
            imageUrl={`images/avatar-${idx}.png`}
            data={entry}
            onCorrectDrop={handleCorrectDrop}
            onWrongDrop={handleWrongDrop}
          />
        ))}
      </div>
      <div className={styles.stats}>
        <Blackboard />
      </div>
      <canvas
        className={styles.animationCanvas}
        ref={canvasRef}
        width={canvasSize.x}
        height={canvasSize.y}
      />
    </div>
  )
}

const useAudience = () => {
  return AUDIENCE
}

export default GameStage
