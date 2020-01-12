import React, { FC } from "react"
import cn from "classnames"
import styles from "./hudbar.module.css"
import LineChart from "../charts/line"
import { getScore } from "../../state/game/game.selectors"
import { useSelector } from "react-redux"

interface HudbarProps {
  className?: string
}

const Hudbar: FC<HudbarProps> = ({ className }) => {
  const score = useSelector(getScore)
  return (
    <div className={cn(styles.component, className)}>
      <div className={styles.task}>
        <span>{"Aufgabe"}</span>
        <span>{"Ordne die Produkte der richtigen Zielgruppe zu."}</span>
      </div>
      <div className={styles.stats}>
        <div className={styles.chart}>
          <LineChart />
        </div>
        <p className={styles.score}>{`${score.toLocaleString()} €`}</p>
      </div>
    </div>
  )
}

export default Hudbar
