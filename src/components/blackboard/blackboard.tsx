import React, { FC } from "react"
import styles from "./blackboard.module.css"
import { useSelector } from "react-redux"
import { getScore } from "../../state/game/game.selectors"
import LineChart from "../charts/line"

const Blackboard: FC = () => {
  const score = useSelector(getScore)
  return (
    <div className={styles.component}>
      <div className={styles.chart}>
        <LineChart />
      </div>
      <span className={styles.score}>{`${score.toLocaleString()} €`}</span>
    </div>
  )
}

export default Blackboard
