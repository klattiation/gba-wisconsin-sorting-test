import React, { FC } from "react"
import cn from "classnames"
import styles from "./hudbar.module.css"
import Link, { LinkAppearance } from "../buttons/link"
import { Route } from "../../constants/routes"
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
        <Link appearance={LinkAppearance.ButtonPrimary} to={Route.Result}>
          Auswertung
        </Link>
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
