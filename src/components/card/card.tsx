import React, { FC } from "react"
import cn from "classnames"
import styles from "./card.module.css"
import { ResolvedCard, CriteriaName } from "../../state/game/game.props"
import CriteriaIcon from "../icons/criteria"

interface CardProps {
  className?: string
  data: ResolvedCard
}

const Card: FC<CardProps> = ({ data, className }) => (
  <div className={cn(styles.component, className)}>
    <div className={styles.image}>{data.image}</div>
    <ul className={styles.criteria}>
      <li className={styles.criterion}>
        <CriteriaIcon criteria={CriteriaName.Category} />
        <span className={styles.criterionLabel}>{data.category.label}</span>
      </li>
      <li className={styles.criterion}>
        <CriteriaIcon criteria={CriteriaName.Channel} />
        <span className={styles.criterionLabel}>{data.channel.label}</span>
      </li>
      <li className={styles.criterion}>
        <CriteriaIcon criteria={CriteriaName.Design} />
        <span className={styles.criterionLabel}>{data.channel.label}</span>
      </li>
      <li className={styles.criterion}>
        <CriteriaIcon criteria={CriteriaName.Price} />
        <span className={styles.criterionLabel}>{data.price.label}</span>
      </li>
      <li className={styles.criterion}>
        <CriteriaIcon criteria={CriteriaName.Value} />
        <span className={styles.criterionLabel}>{data.value.label}</span>
      </li>
    </ul>
  </div>
)

export default Card
