import React, { FC } from "react"
import cn from "classnames"
import styles from "./blackboard.module.css"
import { useSelector } from "react-redux"
import { getScore, getInitialScore } from "../../state/game/game.selectors"
import LineChart from "../charts/line"

interface BlackboardProps {
  className: string
}

const Blackboard: FC<BlackboardProps> = ({ className }) => {
  const score = useSelector(getScore)
  const initialScore = useSelector(getInitialScore)
  const diff = score - initialScore
  const sign = diff > 0 ? "+" : ""
  return (
    <div className={cn(styles.component, className)}>
      <h2 className={styles.title}>{"Vielen Dank für's Mitmachen!"}</h2>
      <div className={styles.chart}>
        <LineChart />
      </div>
      <div className={styles.result}>
        <span>{"Resultat:"}</span>
        <span>{`${score.toLocaleString()} €`}</span>
      </div>
      <div className={styles.result}>
        <span>{"Steigerung:"}</span>
        <span>{`${sign}${diff.toLocaleString()} €`}</span>
      </div>
    </div>
  )
}

export default Blackboard
