import React, { FC } from "react"
import cn from "classnames"
import TargetAvatar from "../avatars/target"
import styles from "./game-stage.module.css"
import Blackboard from "../blackboard"
import { AUDIENCE } from "../../state/game/game.state"

interface GameStageProps {
  className: string
}

const GameStage: FC<GameStageProps> = ({ className }) => {
  const audience = useAudience()
  return (
    <div className={cn(styles.component, className)}>
      <div className={styles.targetAudience}>
        {audience.map((entry, idx) => (
          <TargetAvatar
            key={idx}
            imageUrl={`images/avatar-${idx}.png`}
            data={entry}
          />
        ))}
      </div>
      <div className={styles.stats}>
        <Blackboard />
      </div>
    </div>
  )
}

const useAudience = () => {
  return AUDIENCE
}

export default GameStage
