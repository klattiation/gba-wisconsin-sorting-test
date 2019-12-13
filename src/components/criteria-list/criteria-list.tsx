import React, { FC } from "react"
import cn from "classnames"
import CriteriaIcon from "../icons/criteria"
import styles from "./criteria-list.module.css"
import {
  CriteriaName,
  ResolvedCriteriaAssignment,
} from "../../state/game/game.props"

interface CriteriaListProps {
  className?: string
  data: ResolvedCriteriaAssignment
}

const CriteriaList: FC<CriteriaListProps> = ({ className, data }) => (
  <ul className={cn(styles.component, className)}>
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
)

export default CriteriaList
