import React, { FC } from "react"
import cn from "classnames"
import styles from "./blackboard.module.css"
import { useSelector } from "react-redux"
import { getScore } from "../../state/game/game.selectors"
import LineChart from "../charts/line"

interface BlackboardProps {
  isBig?: boolean
}

const Blackboard: FC<BlackboardProps> = ({ isBig }) => {
  const score = useSelector(getScore)
  return (
    <div className={cn(styles.component, isBig && styles.big)}>
      <div className={styles.chart}>
        <LineChart />
      </div>
      <span className={styles.score}>{`${score.toLocaleString()} €`}</span>
    </div>
  )
}

export default Blackboard
