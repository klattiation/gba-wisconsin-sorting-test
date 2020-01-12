import React, { FC, useRef } from "react"
import cn from "classnames"
import TargetAvatar from "../avatars/target"
import styles from "./game-stage.module.css"
import { AUDIENCE } from "../../state/game/game.state"
import useConfetti from "../../hooks/animations/use-confetti"
import useErrorFlash from "../../hooks/animations/use-error-flash"
import Vector2 from "../../physics/Vector2"
import Stand from "../stand"

interface GameStageProps {
  className: string
}
const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 900

const GameStage: FC<GameStageProps> = ({ className }) => {
  const canvasRef = useRef(null)
  const { spawn } = useConfetti({ canvasRef })
  const { play } = useErrorFlash({ canvasRef })
  const audience = useAudience()

  const handleCorrectDrop = () => {
    spawn(new Vector2(CANVAS_WIDTH * (1 / 3), 50))
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
            style={{ left: `${idx * 13}vw` }}
            imageUrl={avatarImgUrl(idx)}
            imageUrlActive={avatarImgUrlActive(idx)}
            data={entry}
            onCorrectDrop={handleCorrectDrop}
            onWrongDrop={handleWrongDrop}
          />
        ))}
        <Stand />
      </div>
      <canvas
        className={styles.animationCanvas}
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </div>
  )
}

const avatarImgUrl = (idx: number) =>
  `images/avatars/avatar_0${idx}-pose_00.svg`

const avatarImgUrlActive = (idx: number) =>
  `images/avatars/avatar_0${idx}-pose_01.svg`

const useAudience = () => AUDIENCE

export default GameStage
