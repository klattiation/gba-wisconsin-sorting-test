import React, { FC } from "react"
import cn from "classnames"
import TargetAvatar from "../avatars/target"
import styles from "./game-stage.module.css"
import Blackboard from "../blackboard"

interface GameStageProps {
  className: string
}

const GameStage: FC<GameStageProps> = ({ className }) => (
  <div className={cn(styles.component, className)}>
    <div className={styles.targetAudience}>
      <TargetAvatar imageUrl={"images/avatar-0.png"} />
      <TargetAvatar imageUrl={"images/avatar-1.png"} />
      <TargetAvatar imageUrl={"images/avatar-2.png"} />
      <TargetAvatar imageUrl={"images/avatar-3.png"} />
      <TargetAvatar imageUrl={"images/avatar-4.png"} />
    </div>
    <div className={styles.stats}>
      <Blackboard />
    </div>
  </div>
)

export default GameStage
