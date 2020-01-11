import React, { FC } from "react"
import cn from "classnames"
import styles from "./hudbar.module.css"
import Link, { LinkAppearance } from "../buttons/link"
import { Route } from "../../constants/routes"

interface HudbarProps {
  className?: string
}

const Hudbar: FC<HudbarProps> = ({ className }) => (
  <div className={cn(styles.component, className)}>
    <div className={styles.task}>
      <span>{"Aufgabe"}</span>
      <span>{"Ordne die Produkte der richtigen Zielgruppe zu."}</span>
      <Link appearance={LinkAppearance.ButtonPrimary} to={Route.Result}>
        Auswertung
      </Link>
    </div>
  </div>
)

export default Hudbar
