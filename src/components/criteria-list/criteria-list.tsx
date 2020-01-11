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
  filled?: boolean
  hidden?: boolean
  noTopRadius?: boolean
  order: CriteriaName[]
  transparent?: boolean
  withTransition?: boolean
}

const CriteriaList: FC<CriteriaListProps> = ({
  className,
  data,
  filled,
  hidden,
  noTopRadius,
  order,
  transparent,
  withTransition,
}) => (
  <ul
    className={cn(
      styles.component,
      filled ? styles.filled : styles.light,
      hidden && styles.hidden,
      withTransition && styles.withTransition,
      transparent && styles.transparent,
      noTopRadius && styles.noTopRadius,
      className
    )}
  >
    {order.map(criterion => (
      <li key={data[criterion].label} className={styles.criterion}>
        <CriteriaIcon light={filled} criterion={criterion} />
        <span className={styles.criterionLabel}>{data[criterion].label}</span>
      </li>
    ))}
  </ul>
)

export default CriteriaList
