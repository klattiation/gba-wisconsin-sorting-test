import React, { FC } from "react"
import cn from "classnames"
import styles from "./card.module.css"
import { ResolvedCard } from "../../state/game/game.props"
import CriteriaList from "../criteria-list"

interface CardProps {
  className?: string
  data: ResolvedCard
}

const Card: FC<CardProps> = ({ data, className }) => (
  <div className={cn(styles.component, className)}>
    <div className={styles.image}>{data.image}</div>
    <CriteriaList data={data} />
  </div>
)

export default Card
